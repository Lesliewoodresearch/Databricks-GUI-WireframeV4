# Deploying Vite React App with Vercel Serverless Functions

## 🎯 Important: This is a Vite Project

This app is built with **Vite**, not Next.js. When deploying to Vercel:
- Build output goes to `dist/` directory
- API routes in `/api` folder become serverless functions
- Static files are served from `dist/`

## 📁 Required Files for Deployment

Your repository must include:

```
your-repo/
├── api/
│   ├── test.js                      ← Serverless function (test endpoint)
│   └── upload-to-databricks.js      ← Serverless function (upload handler)
├── components/
│   └── ... (all your components)
├── styles/
│   └── globals.css
├── App.tsx
├── index.html                        ← Vite entry point
├── package.json                      
├── vercel.json                       ← CRITICAL: Vercel configuration
└── vite.config.ts (if you have one)
```

## ⚙️ Vercel Configuration

Your `vercel.json` should be:

```json
{
  "buildCommand": "npm run build || echo 'Using default build'",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": null,
  "functions": {
    "api/upload-to-databricks.js": {
      "runtime": "nodejs20.x",
      "maxDuration": 30
    },
    "api/test.js": {
      "runtime": "nodejs20.x",
      "maxDuration": 10
    }
  }
}
```

**Key settings:**
- `outputDirectory: "dist"` - Where Vite builds to
- `framework: null` - Tells Vercel NOT to auto-detect framework
- `functions` - Explicitly declare each API route as a serverless function

## 📦 Dependencies Required

Make sure `package.json` includes:

```json
{
  "dependencies": {
    "formidable": "^3.5.1"
  },
  "devDependencies": {
    "@types/formidable": "^3.4.5"
  }
}
```

The `formidable` package is needed by the upload API route.

## 🚀 Deployment Methods

### Method 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your Git repository
4. **Important Settings:**
   - **Framework Preset**: Other (or leave as detected)
   - **Build Command**: Leave blank (uses vercel.json)
   - **Output Directory**: dist
   - **Install Command**: npm install
5. Click "Deploy"

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Method 3: GitHub Integration

1. Push your code to GitHub
2. Go to Vercel Dashboard
3. Import the repository
4. Vercel will auto-deploy on every push to main branch

## ✅ Verify Deployment

After deploying, verify everything is working:

### Step 1: Check API Routes

Visit: `https://your-app.vercel.app/api/test`

**Expected Response:**
```json
{
  "success": true,
  "message": "API routes are working!",
  "timestamp": "2026-02-07T..."
}
```

**If you get 404:**
- API routes aren't being deployed as serverless functions
- Check that `vercel.json` is in your repository root
- Check Vercel Dashboard → Project Settings → Functions

### Step 2: Check Browser Console

Open your deployed app and check the browser console.

**Expected:**
```
✓ API routes are available: {success: true, message: "API routes are working!", ...}
```

**If you see:**
```
✗ API routes not available (running in mock mode): Failed to fetch
```
Then the API routes aren't working.

### Step 3: Test File Upload

1. Go to Research Hub → Load Files
2. Enter Databricks credentials
3. Upload a test file

**Success:**
```
✓ File uploaded successfully to /Volumes/catalog/schema/default/filename.ext
```

**Still Mock Mode:**
```
✓ [MOCK] File "..." would be uploaded to ...
```

## 🔧 Troubleshooting

### Issue: Getting "Function not found" errors

**Solution:** Make sure the `/api` folder is in your repository root, not inside `src/` or any other folder.

```
✅ Correct:  /api/upload-to-databricks.js
❌ Wrong:    /src/api/upload-to-databricks.js
```

### Issue: API routes return 404

**Check Vercel Dashboard:**
1. Go to your project in Vercel
2. Click "Functions" tab
3. You should see:
   - `api/test.js`
   - `api/upload-to-databricks.js`

**If functions are missing:**
- Verify `vercel.json` is committed and pushed
- Verify files are in `/api` folder (not `/src/api`)
- Try redeploying

### Issue: Build fails with "Module not found"

**Missing formidable:**
```bash
npm install formidable
npm install --save-dev @types/formidable
git add package.json package-lock.json
git commit -m "Add formidable dependency"
git push
```

### Issue: Still showing [MOCK] after deployment

**Debug steps:**

1. **Check if API endpoint exists:**
   ```bash
   curl https://your-app.vercel.app/api/test
   ```

2. **Check browser Network tab:**
   - Open DevTools → Network
   - Try uploading a file
   - Look for `/api/upload-to-databricks` request
   - Check status code (should be 200 or 500, NOT 404)

3. **Check Vercel Function Logs:**
   - Vercel Dashboard → Your Project → Deployments
   - Click latest deployment → Functions
   - Check for error messages

4. **Verify vercel.json is deployed:**
   - Go to your deployment on Vercel
   - Check "Source" tab
   - Verify `vercel.json` is present

## 🎯 Common Mistakes

1. ❌ **API folder in wrong location**
   - Must be `/api`, not `/src/api`

2. ❌ **Missing vercel.json**
   - Must be in repository root
   - Must be committed and pushed

3. ❌ **Wrong output directory**
   - Vite builds to `dist/`, not `build/`
   - vercel.json must have `"outputDirectory": "dist"`

4. ❌ **Missing formidable dependency**
   - Check package.json includes it
   - Run `npm install` to ensure it's in package-lock.json

5. ❌ **Using ES modules in API routes**
   - API routes must use CommonJS: `module.exports = ...`
   - NOT ES modules: `export default ...`

## 📊 Expected Build Output

When deploying, you should see:

```
Running "npm install"
...
Running build command: npm run build || echo 'Using default build'
...
vite v6.3.5 building for production...
✓ 1606 modules transformed.
dist/index.html
dist/assets/index-[hash].css
dist/assets/index-[hash].js
✓ built in 1.45s
...
Serverless Functions:
  api/test.js
  api/upload-to-databricks.js
...
Deployment completed
```

Look for "Serverless Functions" in the build log to confirm API routes are deployed.

## 🔐 Security Notes

⚠️ **Important:**
- Databricks token is sent from browser (visible in network requests)
- For production, implement proper backend authentication
- Consider using Vercel Environment Variables for tokens
- Don't commit tokens to Git

## 📚 Resources

- [Vercel Functions Documentation](https://vercel.com/docs/functions)
- [Vite Production Build](https://vitejs.dev/guide/build.html)
- [Databricks Files API](https://docs.databricks.com/api/workspace/files)

## ✅ Success Checklist

Your deployment is successful when:

- [ ] `/api/test` returns JSON (not 404)
- [ ] Browser console shows "✓ API routes are available"
- [ ] File upload shows success without [MOCK] prefix
- [ ] File appears in Databricks Volume
- [ ] Vercel Dashboard → Functions shows both API routes

---

**Need help?** Check the logs in:
1. Browser DevTools Console
2. Browser DevTools Network Tab
3. Vercel Dashboard → Deployments → Functions
