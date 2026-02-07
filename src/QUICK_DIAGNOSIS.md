# Quick API Route Diagnosis

## 🔍 Step-by-Step Diagnosis

Your API routes are returning 404. Follow these steps to find out why:

---

## Step 1: Check Repository Structure

Open your Git repository (GitHub/GitLab/etc) in your browser and verify:

**✅ Check 1: Is `/api` at the root?**

Your repo should look like this when you browse it:
```
databricks-gui-wireframe-v4/    ← Repository root
├── api/                         ← Should be HERE
│   ├── test.js
│   └── upload-to-databricks.js
├── components/
├── App.tsx
├── package.json
├── vercel.json
└── ...
```

**Go to your repo on GitHub/GitLab and check:**
- Can you see an `api` folder at the root level?
- Click into `api` - do you see `test.js` and `upload-to-databricks.js`?

❌ **If NO:** The `/api` folder is not in your repository root. You need to move it there.

✅ **If YES:** Continue to Step 2.

---

## Step 2: Check Vercel Deployment Logs

1. Go to https://vercel.com/dashboard
2. Click on your project: `databricks-gui-wireframe-v4`
3. Click on the latest deployment (top of the list)
4. Click the **"Building"** tab

**Look for one of these:**

### ✅ Success Pattern:
```
Creating Serverless Functions...
✓ api/test.js (42 B)
✓ api/upload-to-databricks.js (1.2 KB)
```

### ❌ Problem Pattern 1 (No Functions Detected):
```
Build completed
Output directory: dist
(No mention of "Serverless Functions")
```
**→ This means Vercel didn't detect your `/api` folder**

### ❌ Problem Pattern 2 (Module Error):
```
Error: Cannot find module 'formidable'
```
**→ This means `formidable` is not in your `package.json` dependencies**

### ❌ Problem Pattern 3 (Syntax Error):
```
Error: Unexpected token 'export'
```
**→ This means your API files are using ES modules instead of CommonJS**

---

## Step 3: Check Vercel Functions Tab

Still in Vercel Dashboard:

1. Click on your project name (top left) to go back to project overview
2. Click **"Functions"** tab in the left sidebar

**What do you see?**

### ✅ Success:
```
Serverless Functions
Name                        Region    Age
api/test.js                 iad1      5m ago
api/upload-to-databricks.js iad1      5m ago
```

### ❌ Problem:
```
No serverless functions found
```
**→ API routes are NOT deployed**

---

## Step 4: Check package.json

In your repository, open `package.json`:

**✅ Check for `formidable` dependency:**
```json
{
  "dependencies": {
    "formidable": "^3.5.1"   ← Should be here
  }
}
```

❌ **If missing:** Run this in your local project:
```bash
npm install formidable
git add package.json package-lock.json
git commit -m "Add formidable dependency"
git push
```

---

## Step 5: Check vercel.json

In your repository, check if `vercel.json` exists at the root:

**✅ Should contain:**
```json
{
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs20.x"
    }
  }
}
```

❌ **If missing or different:** Create/update it with the above content.

---

## 🎯 Common Fixes Based on Diagnosis

### Fix A: API folder is not in root
```bash
# In your local project
mv src/api ./api        # If api is in src/
git add api/
git commit -m "Move API to root"
git push
```

### Fix B: Files not committed to Git
```bash
git add api/
git add vercel.json
git commit -m "Add API routes"
git push
```

### Fix C: Missing formidable dependency
```bash
npm install formidable
git add package.json package-lock.json
git commit -m "Add formidable dependency"
git push
```

### Fix D: Wrong API file format
Your API files should use CommonJS syntax:

**✅ CORRECT (`api/test.js`):**
```javascript
module.exports = async function handler(req, res) {
  // ... code
}
```

**❌ WRONG:**
```javascript
export default async function handler(req, res) {
  // ... code
}
```

---

## 🔄 After Making Changes

**Always do this after fixing:**

1. Push changes to Git
2. Wait for Vercel auto-deploy (1-2 minutes)
3. OR manually redeploy: Vercel Dashboard → Deployments → ••• → Redeploy
4. Test: `https://databricks-gui-wireframe-v4.vercel.app/api/test`

**Expected success response:**
```json
{
  "success": true,
  "message": "API routes are working!",
  "timestamp": "2026-02-07T..."
}
```

---

## 🆘 Quick Help Matrix

| Symptom | Cause | Fix |
|---------|-------|-----|
| No "Functions" in build logs | `/api` not at root | Move `/api` to repository root |
| "Cannot find module 'formidable'" | Missing dependency | `npm install formidable` |
| "No serverless functions found" | Not committed to Git | `git add api/ && git commit && git push` |
| "Unexpected token 'export'" | Wrong syntax | Change `export` to `module.exports` |
| Functions show in logs but 404 | Caching issue | Hard refresh or wait 5 minutes |

---

## ✅ When It's Working

You'll know the API routes are deployed when:

1. ✅ `https://databricks-gui-wireframe-v4.vercel.app/api/test` returns JSON (not 404)
2. ✅ File uploads show **no "[MOCK]" prefix**
3. ✅ Console shows: `"✓ API routes are available"`
4. ✅ Vercel Dashboard shows functions under "Functions" tab

---

**Start with Step 1 and work your way through. Report back which step reveals the problem!**
