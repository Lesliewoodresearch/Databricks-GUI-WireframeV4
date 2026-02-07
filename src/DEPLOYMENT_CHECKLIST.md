# Vercel Deployment Checklist

> 🎯 **This is a Vite React App** - See [VITE_VERCEL_DEPLOY.md](./VITE_VERCEL_DEPLOY.md) for complete Vite-specific deployment guide.

## 📋 Quick Pre-Deployment Check

Before deploying to Vercel, ensure these files are in your repository:

- [ ] `/api/upload-to-databricks.js` - Main upload handler
- [ ] `/api/test.js` - Test endpoint to verify API routes work
- [ ] `/vercel.json` - Vercel configuration
- [ ] `/package.json` - Dependencies including `formidable`

## 🚀 Deployment Steps

### Step 1: Verify Local Files

Check that your project has this structure:
```
your-project/
├── api/
│   ├── test.js
│   └── upload-to-databricks.js
├── components/
│   ├── LoadFilesSection.tsx
│   └── ... (other components)
├── styles/
│   └── globals.css
├── App.tsx
├── package.json
└── vercel.json
```

### Step 2: Deploy to Vercel

Choose one method:

#### Option A: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Option B: GitHub Integration
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy

### Step 3: Verify API Routes Are Working

After deployment, open browser DevTools Console and visit your deployed app.

You should see one of these messages when the page loads:

✅ **Success:** 
```
✓ API routes are available: {success: true, message: "API routes are working!", ...}
```

❌ **Failed (Mock Mode):**
```
✗ API routes not available (running in mock mode): Failed to fetch
```

### Step 4: Test File Upload

1. Navigate to Research Hub → Load Files section
2. Enter your Databricks credentials
3. Select a file
4. Click "Upload to Databricks"

**Expected Results:**

If API routes are working:
- Upload progress shown
- Success message: `✓ File uploaded successfully to /Volumes/...`
- NO "[MOCK]" prefix

If still in mock mode:
- Success message: `✓ [MOCK] File "..." would be uploaded to ...`
- Means API route isn't accessible

## 🔍 Troubleshooting

### Issue: Still showing [MOCK] messages after deployment

**Check 1: Verify API endpoint exists**
Visit: `https://your-app.vercel.app/api/test`

Expected response:
```json
{
  "success": true,
  "message": "API routes are working!",
  "timestamp": "2026-02-07T..."
}
```

**Check 2: Review Vercel Function Logs**
1. Go to Vercel Dashboard
2. Select your project
3. Go to "Functions" tab
4. Check if `api/upload-to-databricks.js` is listed
5. Click on it to see logs

**Check 3: Verify vercel.json is deployed**
The `vercel.json` file must be in your repository root with:
```json
{
  "outputDirectory": "dist",
  "functions": {
    "api/upload-to-databricks.js": {
      "runtime": "nodejs20.x",
      "maxDuration": 30
    }
  }
}
```

**Check 4: Inspect Network Tab**
1. Open DevTools → Network tab
2. Try uploading a file
3. Look for request to `/api/upload-to-databricks`
4. Check the response status:
   - **404**: API route not found → Check deployment files
   - **500**: Server error → Check function logs in Vercel
   - **405**: Wrong method → Should not happen with current code
   - **200**: Success! → Should work

### Issue: API route returns 500 error

**Possible causes:**

1. **Missing formidable dependency**
   - Check `package.json` includes: `"formidable": "^3.5.1"`
   - Redeploy after adding it

2. **Databricks API error**
   - Check Vercel function logs for detailed error
   - Verify workspace URL (no trailing slash)
   - Verify token hasn't expired
   - Ensure Volume exists in Databricks

3. **File parsing error**
   - Check file size limits
   - Try with a smaller file first

### Issue: CORS errors

If you see CORS errors:
- The API route handler should set CORS headers
- Check if `/api/upload-to-databricks` is being called
- If not, the frontend is trying to call Databricks directly (will fail)

## 🎯 Success Criteria

✅ Your deployment is successful when:

1. Opening the app shows in console:
   ```
   ✓ API routes are available: {...}
   ```

2. Uploading a file shows:
   ```
   ✓ File uploaded successfully to /Volumes/catalog/schema/default/filename.ext
   ```
   (NO "[MOCK]" prefix!)

3. The file appears in your Databricks Volume at the specified path

## 🛠 Manual Verification

### Test the API directly:

```bash
# Test the test endpoint
curl https://your-app.vercel.app/api/test

# Test upload (replace with your values)
curl -X POST https://your-app.vercel.app/api/upload-to-databricks \
  -F "file=@test.txt" \
  -F "workspace_url=https://your-workspace.cloud.databricks.com" \
  -F "databricks_token=dapi1234567890" \
  -F "catalog_path=maincatalog/myapp"
```

## 📚 Additional Resources

- [Vercel Functions Documentation](https://vercel.com/docs/functions)
- [Databricks Files API](https://docs.databricks.com/api/workspace/files)
- Project setup: `VERCEL_SETUP.md`

## 🆘 Still Having Issues?

1. Check browser console for error messages
2. Check Vercel function logs
3. Try the manual curl commands above
4. Verify all files are in your repository
5. Make sure you committed and pushed vercel.json