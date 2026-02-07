# Databricks File Upload - Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI** (optional, for local testing):
   ```bash
   npm install -g vercel
   ```
3. **Databricks Requirements**:
   - Unity Catalog enabled workspace
   - A Volume created at `/Volumes/{catalog}/{schema}/default/`
   - Access token with write permissions

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your repository
   - Click "Deploy"

3. **Done!** Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Your app is live!** The CLI will show your deployment URL.

## File Upload API Endpoint

Once deployed, your upload API will be available at:
```
https://your-project.vercel.app/api/upload-to-databricks
```

The frontend automatically calls this endpoint when you upload files.

## Databricks Setup

### Creating a Volume (if not exists)

In your Databricks workspace, run this SQL:

```sql
-- Create catalog if not exists
CREATE CATALOG IF NOT EXISTS maincatalog;

-- Create schema if not exists
CREATE SCHEMA IF NOT EXISTS maincatalog.myapp;

-- Create volume for file storage
CREATE VOLUME IF NOT EXISTS maincatalog.myapp.default;
```

### Getting Your Access Token

1. Go to your Databricks workspace
2. Click on your profile icon (top right)
3. Select **User Settings**
4. Go to **Access Tokens** tab
5. Click **Generate New Token**
6. Copy the token (it starts with `dapi...`)

## Testing Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   ```
   http://localhost:3000
   ```

4. **Test the upload**:
   - Click "Load Files" button
   - Enter your Databricks credentials
   - Upload a file

## File Structure

```
/api/
  upload-to-databricks.ts    # Vercel serverless function
/components/
  LoadFilesSection.tsx       # Upload UI component
  LandingPage.tsx           # Main landing page
/lib/
  supabaseClient.ts         # Supabase client (for other features)
```

## How It Works

1. User clicks "Load Files" on landing page
2. Modal opens with upload form
3. User enters Databricks credentials (saved to localStorage)
4. User selects file and clicks "Upload"
5. File is sent to `/api/upload-to-databricks` (Vercel serverless function)
6. Vercel function uploads to Databricks Files API
7. Success/error message shown to user

## Environment Variables (Optional)

If you want to store Databricks credentials server-side instead of client-side:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables

2. Add these variables:
   ```
   DATABRICKS_WORKSPACE_URL=https://dbc-xxx.cloud.databricks.com
   DATABRICKS_TOKEN=dapi...
   ```

3. Update the API route to use `process.env.DATABRICKS_TOKEN`

## Troubleshooting

### Error: "Upload failed: 404"
- The volume path doesn't exist in Databricks
- Create the volume using the SQL commands above

### Error: "Upload failed: 403"
- Invalid or expired Databricks token
- Token doesn't have permissions to write to the volume
- Generate a new token with appropriate permissions

### Error: "Upload failed: 401"
- Incorrect Databricks token
- Check that your token is correct and starts with `dapi`

### Local development: API route not found
- Make sure you're running `npm run dev`
- API routes are only available when Next.js dev server is running

## Production Considerations

### Security
- **Never commit Databricks tokens to git**
- Consider using environment variables for sensitive credentials
- Add rate limiting to prevent abuse
- Validate file types and sizes

### File Size Limits
- Vercel has a 4.5MB limit for request body on Hobby plan
- Pro plan supports up to 100MB
- For larger files, consider:
  - Using direct client-to-Databricks uploads
  - Implementing chunked uploads
  - Using Vercel Blob storage as intermediary

### CORS
- The API route allows all origins (`*`)
- In production, restrict to your domain:
  ```typescript
  res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com');
  ```

## Next Steps

✅ Deploy to Vercel
✅ Create Databricks volume
✅ Get Databricks access token
✅ Test file upload
- Add authentication (optional)
- Add file type validation
- Implement file listing from Databricks
- Add progress indicators for large files
