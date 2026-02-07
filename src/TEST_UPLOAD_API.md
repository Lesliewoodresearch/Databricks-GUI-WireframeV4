# Testing API Upload Route

## ✅ Step 1: Confirm Test API Works

First, verify the test API is working:

**In your browser, open Developer Console (F12) and go to:**
```
https://databricks-gui-wireframe-v4.vercel.app/api/test
```

**Expected response:**
```json
{
  "success": true,
  "message": "API routes are working!",
  "timestamp": "2026-02-07T..."
}
```

✅ If you see this, your API infrastructure is working!

---

## 🔍 Step 2: Test Upload Endpoint Manually

Let's test if the upload endpoint exists and responds:

**Open Developer Console in your app**, then run this in the Console tab:

```javascript
fetch('https://databricks-gui-wireframe-v4.vercel.app/api/upload-to-databricks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
})
.then(res => res.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));
```

**What do you see?**

### ✅ Expected (good):
```json
{
  "success": false,
  "error": "Missing required fields: file, workspace_url, databricks_token, or catalog_path"
}
```
**→ This means the API route EXISTS and is working!**

### ❌ Problem 1:
```
404 Not Found
```
**→ The upload endpoint is not deployed**

### ❌ Problem 2:
```
500 Internal Server Error
{
  "error": "Cannot find module 'formidable'"
}
```
**→ Missing `formidable` dependency**

---

## 🧪 Step 3: Try Actual Upload in App

Now try uploading a file in your app with these steps:

1. **Open the app:** https://databricks-gui-wireframe-v4.vercel.app/
2. **Open Developer Console (F12)** → **Console tab**
3. Click "Enter Research Hub"
4. Click the "Research" hexagon
5. Click "Load Files" section
6. Enter a **fake** Databricks token (just type anything like `dapi123456`)
7. Select a small test file
8. Click "Upload to Databricks"

**Watch the Console output. You should see:**

### ✅ Good (API route working, Databricks auth fails):
```
Attempting upload via API route...
API URL: /api/upload-to-databricks
Workspace URL: https://dbc-968ce34c-e36d.cloud.databricks.com
Catalog Path: maincatalog/myapp
API Response status: 500
API Response ok: false
API Error JSON: {
  success: false,
  error: "Databricks upload failed: 401 - Unauthorized"
}
```
**→ This is GOOD! It means the API is working, just Databricks auth is failing (expected with fake token)**

### ❌ Problem (API route not found):
```
Attempting upload via API route...
API Response status: 404
API route not reachable, using mock mode
✓ [MOCK] File would be uploaded...
```
**→ API endpoint doesn't exist**

### ❌ Problem (formidable missing):
```
Attempting upload via API route...
API Response status: 500
API Error JSON: {
  error: "Cannot find module 'formidable'"
}
```
**→ Missing dependency**

---

## 🎯 Common Issues & Fixes

### Issue 1: Upload endpoint returns 404

**Check Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Click your project
3. Click **Functions** tab

**Do you see `api/upload-to-databricks.js`?**

- ✅ **YES** → Check build logs for errors
- ❌ **NO** → File not deployed

**Fix:**
```bash
# Make sure file exists in your repo
git add api/upload-to-databricks.js
git commit -m "Add upload API route"
git push
```

### Issue 2: formidable module not found

**Check package.json:**
```bash
npm install formidable
git add package.json package-lock.json
git commit -m "Add formidable dependency"
git push
```

### Issue 3: API works but shows [MOCK]

This means the API call is failing but showing mock instead of the real error.

**Updated code should now show the REAL error.** 

Try uploading again and check the console - you should see the actual error message now instead of falling back to mock mode.

---

## 📊 Expected Behavior After Fix

### Test with FAKE Databricks token:
**Result:** 
```
Upload failed: Databricks upload failed: 401 - Unauthorized
```
**Status:** ✅ This is GOOD! API is working, just auth is failing.

### Test with REAL Databricks token:
**Result:**
```
✓ File uploaded successfully to /Volumes/maincatalog/myapp/default/yourfile.jpg
```
**Status:** ✅ PERFECT! Everything works!

---

## 🆘 What to Report

After trying the upload, tell me:

1. **Step 2 result:** What did the manual fetch test return?
2. **Step 3 result:** What did the Console show during upload?
3. **Error messages:** Copy/paste any error messages from the console

This will tell me exactly what's wrong! 🎯
