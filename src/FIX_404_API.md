# Fix 404 API Routes on Vercel

## 🔴 Current Problem
Your API routes are returning 404 at `https://databricks-gui-wireframe-v4.vercel.app/api/test`

**Symptoms:**
- ✅ Static site works: https://databricks-gui-wireframe-v4.vercel.app/
- ❌ API test endpoint: https://databricks-gui-wireframe-v4.vercel.app/api/test → 404
- ❌ File uploads show "[MOCK]" prefix

This means Vercel is deploying the static site but NOT deploying the serverless functions.

---

## 🎯 Most Likely Cause

**Your repository structure might be incorrect.** The `/api` folder must be at the ROOT of your repository, not nested inside other folders.

### ✅ CORRECT Structure:
```
your-repo/               ← Root of your Git repository
├── api/                 ← Must be here!
│   ├── test.js
│   └── upload-to-databricks.js
├── components/
├── App.tsx
├── package.json
├── vercel.json
└── ...
```

### ❌ WRONG Structure (won't work):
```
your-repo/
├── src/
│   ├── api/            ← Too deep!
│   ├── components/
│   └── App.tsx
├── package.json
└── ...
```

---

## ✅ Solution

### Option 1: Quick Fix (Recommended)

**Step 1: Update your deployment repository**

Make sure these exact files are in your repository:

1. **`/api/test.js`** (already correct ✓)
2. **`/api/upload-to-databricks.js`** (already correct ✓)  
3. **`/vercel.json`** (just updated ✓)

**Step 2: Redeploy**

If you're using Git integration:
```bash
git add .
git commit -m "Fix API routes configuration"
git push
```

Vercel will auto-deploy.

**Step 3: Wait 1-2 minutes, then test again:**
```
https://databricks-gui-wireframe-v4.vercel.app/api/test
```

---

### Option 2: Vercel Dashboard Override

If Option 1 doesn't work, manually configure in Vercel Dashboard:

1. Go to: https://vercel.com/dashboard
2. Click on your project: `databricks-gui-wireframe-v4`
3. Go to **Settings** → **General**
4. Find **Build & Development Settings**
5. Set:
   - **Framework Preset**: `Other`
   - **Build Command**: `npm run build` (or leave blank)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Save**
7. Go to **Deployments** tab
8. Click **•••** on latest deployment → **Redeploy**

---

### Option 3: Check if Functions are Enabled

1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Functions**
3. Make sure serverless functions are enabled for your plan
4. Check region settings

---

## 🔍 Debug: Check Current Deployment

### In Vercel Dashboard:

1. Go to your project
2. Click **Deployments** 
3. Click on the latest deployment
4. Look for **"Functions"** section

**✅ If working, you'll see:**
```
Functions:
  api/test.js
  api/upload-to-databricks.js
```

**❌ If broken, you'll see:**
```
No serverless functions found
```

### Check Build Logs:

1. Click on latest deployment
2. Go to **Building** tab
3. Look for errors related to:
   - `formidable` package
   - API folder
   - Function creation

---

## 🐛 Common Issues & Fixes

### Issue 1: API folder in wrong location

**Check your repository structure:**

```
✅ Correct:
/
├── api/
│   ├── test.js
│   └── upload-to-databricks.js
├── dist/
├── components/
├── App.tsx
├── vercel.json
└── package.json

❌ Wrong:
/
├── src/
│   └── api/          ← TOO DEEP!
├── ...
```

**Fix:** Move `/src/api` to `/api`

### Issue 2: Missing formidable dependency

**Check your `package.json` includes:**
```json
{
  "dependencies": {
    "formidable": "^3.5.1"
  }
}
```

**If missing:**
```bash
npm install formidable
git add package.json package-lock.json
git commit -m "Add formidable dependency"
git push
```

### Issue 3: Wrong Node.js version

Vercel might be using an old Node.js version.

**Fix:** Add to `vercel.json`:
```json
{
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs20.x"
    }
  }
}
```

### Issue 4: .vercelignore blocking API folder

**Check if you have a `.vercelignore` file**

If it exists, make sure it's NOT ignoring the API folder:
```
# .vercelignore should NOT have:
api/          ❌
api/**/*.js   ❌
```

### Issue 5: Git not tracking API files

**Check if files are committed:**
```bash
git ls-files api/
```

**Should show:**
```
api/test.js
api/upload-to-databricks.js
```

**If empty:**
```bash
git add api/
git commit -m "Add API routes"
git push
```

---

## 🧪 Test Locally (Optional)

You can test the API routes locally using Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Run dev server
vercel dev

# Test API
curl http://localhost:3000/api/test
```

---

## 📊 Expected vs Actual

### What SHOULD happen:

1. Push code to Git
2. Vercel builds:
   - Static site → `dist/`
   - Serverless functions → `api/*.js`
3. Deployment includes both:
   - Static files at: `https://your-app.vercel.app/`
   - API functions at: `https://your-app.vercel.app/api/*`

### What's ACTUALLY happening:

1. ✅ Static site is working: `https://databricks-gui-wireframe-v4.vercel.app/`
2. ❌ API functions are NOT working: `https://databricks-gui-wireframe-v4.vercel.app/api/test` → 404

This means Vercel isn't detecting the `/api` folder as serverless functions.

---

## 🎯 Next Steps

**1. Check your repository on GitHub/GitLab:**
- Verify `/api/test.js` exists in the root
- Verify `/vercel.json` exists in the root

**2. Redeploy from Vercel Dashboard:**
- Deployments → ••• → Redeploy

**3. Check deployment logs:**
- Look for "Serverless Functions" section

**4. Test again:**
```
https://databricks-gui-wireframe-v4.vercel.app/api/test
```

**5. If still 404, check Vercel Dashboard → Functions tab:**
- Should list your API routes
- If empty, functions aren't being deployed

---

## 🆘 Still Not Working?

If the API routes still return 404 after trying everything:

**Alternative Solution: Move to Next.js API Routes**

Since your `package.json` already has Next.js, you could restructure as a Next.js app:

1. Move `/App.tsx` to `/pages/index.tsx`
2. Create `/pages/_app.tsx`
3. Keep `/api` folder (Next.js will auto-detect it)
4. Change `vercel.json` to use Next.js

But let's try the simpler fixes first!

---

## ✅ Success Checklist

- [ ] `/api` folder exists in repository root
- [ ] `vercel.json` exists and is committed
- [ ] `formidable` is in package.json dependencies
- [ ] Redeployed from Vercel
- [ ] Waited 2-3 minutes for deployment to complete
- [ ] Tested: `https://databricks-gui-wireframe-v4.vercel.app/api/test`
- [ ] Checked Vercel Dashboard → Functions tab

---

**Let me know what you see after redeploying!**