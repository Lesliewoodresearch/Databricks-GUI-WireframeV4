# Vercel Deployment Setup for Databricks Research Hub

## Overview

This app currently runs in **MOCK MODE** in development. To enable real Databricks file uploads, you need to deploy to Vercel with a serverless API route.

## Why You Need Vercel

Databricks API doesn't allow direct calls from browser applications due to CORS (Cross-Origin Resource Sharing) restrictions. You need a backend proxy to:
- Avoid CORS issues
- Keep your Databricks token secure (though it's still sent from the frontend)
- Handle file uploads properly

## Deployment Steps

### 1. Prepare Your Project

Create a new directory for your Vercel project:

```bash
mkdir databricks-research-hub
cd databricks-research-hub
```

### 2. Copy Files

Copy these files from Figma Make to your project:
- `/App.tsx` → `pages/index.tsx` (rename and adjust)
- `/components/*` → `components/*` (all component files)
- `/styles/globals.css` → `styles/globals.css`
- `/api/upload-to-databricks.js` → `api/upload-to-databricks.js`
- `package.json`

### 3. Update package.json

Make sure your `package.json` includes:

```json
{
  "name": "databricks-research-hub",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "formidable": "^3.5.1",
    "lucide-react": "latest",
    "motion": "latest",
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "latest"
  },
  "devDependencies": {
    "@types/formidable": "^3.4.5",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

### 4. Create Next.js Pages Structure

Convert `App.tsx` to a Next.js page:

**pages/index.tsx:**
```tsx
import App from '../App';

export default App;
```

**pages/_app.tsx:**
```tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### 5. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

#### Option B: Using GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

### 6. Verify Deployment

After deployment:
1. Visit your Vercel URL
2. Go to the Research Hub → Load Files
3. Try uploading a file - you should see real upload (not mock mode)

## Databricks Setup

Before uploading files, create a Volume in Databricks:

```sql
-- Run in Databricks SQL Editor
CREATE CATALOG IF NOT EXISTS maincatalog;
CREATE SCHEMA IF NOT EXISTS maincatalog.myapp;
CREATE VOLUME IF NOT EXISTS maincatalog.myapp.default;
```

## Get Your Databricks Token

1. Log in to your Databricks workspace
2. Click your profile icon → **User Settings**
3. Go to **Access Tokens** tab
4. Click **Generate New Token**
5. Give it a name (e.g., "Research Hub")
6. Set expiration (optional)
7. Click **Generate**
8. Copy the token immediately (you won't see it again!)

## Security Notes

⚠️ **Important:**
- The Databricks token is currently sent from the frontend, which means it's visible in browser network requests
- For production, consider implementing proper authentication and storing tokens server-side
- Don't commit tokens to Git
- Use environment variables for sensitive data when possible
- Consider implementing token rotation

## Troubleshooting

### "API route not available" error
- Make sure the `/api` folder exists in your project root
- Verify `formidable` is installed: `npm install formidable`
- Check Vercel deployment logs for errors

### Databricks upload fails
- Verify your workspace URL is correct (no trailing slash)
- Check your token hasn't expired
- Make sure the Volume exists (run the SQL commands above)
- Verify catalog path format: `catalog/schema` (e.g., `maincatalog/myapp`)

### CORS errors
- These should be handled by the API route
- If you still see CORS errors, the API route isn't being used
- Check browser console to see if the `/api/upload-to-databricks` endpoint returns 200

## Development vs Production

**Development (Figma Make):**
- Uses MOCK mode
- No real uploads
- Shows success message with "[MOCK]" prefix

**Production (Vercel):**
- Uses real API route
- Actual uploads to Databricks
- Shows real success/error messages

## Questions?

See the main README or check Vercel documentation:
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
