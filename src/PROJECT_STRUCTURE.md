# Databricks Research Hub - Project Structure

## 📁 Active Files (In Use)

### Core Application
- **`/App.tsx`** - Main entry point, handles routing between Landing and Research pages
- **`/styles/globals.css`** - Global styles and Tailwind CSS configuration

### Components (Active)
- **`/components/LandingPage.tsx`** - Landing page with features overview
- **`/components/ResearchPage.tsx`** - Main research hub interface
- **`/components/HexagonButton.tsx`** - Central hexagonal "Research" button
- **`/components/ResearchPanel.tsx`** - Panel with 4 research tool sections
- **`/components/LoadFilesSection.tsx`** - Upload files to Databricks
- **`/components/SynthesizeSection.tsx`** - AI research synthesis
- **`/components/SaveResultsSection.tsx`** - Save results locally
- **`/components/CreateFileSection.tsx`** - Generate files with AI prompts

### Protected System Components
- **`/components/figma/ImageWithFallback.tsx`** - Protected image component

### API Routes (Serverless Functions)
- **`/api/test.js`** - API health check endpoint
- **`/api/upload-to-databricks.js`** - File upload to Databricks handler

### Configuration
- **`/package.json`** - Dependencies and build scripts
- **`/vercel.json`** - Vercel deployment configuration

### Documentation
- **`/FIX_404_API.md`** - Troubleshooting guide for API route deployment
- **`/Attributions.md`** - (Protected) Attributions file
- **`/guidelines/Guidelines.md`** - (Protected) Development guidelines

---

## 🗑️ Removed Files (Not Used)

### Deleted Components
- ✅ `/components/LoginModal.tsx` - Login removed, no longer needed

### Deleted Documentation
- ✅ `/DEPLOYMENT_CHECKLIST.md` - Redundant
- ✅ `/VERCEL_DEPLOYMENT.md` - Consolidated into FIX_404_API.md
- ✅ `/VERCEL_SETUP.md` - Redundant
- ✅ `/VITE_VERCEL_DEPLOY.md` - Redundant
- ✅ `/package-vercel.json` - Not needed

---

## 📦 Unused UI Components (Protected, Cannot Delete)

The following shadcn/ui components are in the project but NOT being used:

All files in `/components/ui/`:
- accordion, alert-dialog, alert, aspect-ratio, avatar
- badge, breadcrumb, button, calendar, card, carousel, chart
- checkbox, collapsible, command, context-menu, dialog, drawer
- dropdown-menu, form, hover-card, input-otp, input, label
- menubar, navigation-menu, pagination, popover, progress
- radio-group, resizable, scroll-area, select, separator
- sheet, sidebar, skeleton, slider, sonner, switch, table
- tabs, textarea, toggle-group, toggle, tooltip
- use-mobile.ts, utils.ts

**Note:** These are protected system files and cannot be deleted, but they don't affect the app since they're not imported anywhere.

---

## 🔄 Component Dependency Tree

```
App.tsx
├── LandingPage.tsx
│   └── LoadFilesSection.tsx
└── ResearchPage.tsx
    ├── HexagonButton.tsx
    └── ResearchPanel.tsx
        ├── LoadFilesSection.tsx
        ├── SynthesizeSection.tsx
        ├── SaveResultsSection.tsx
        └── CreateFileSection.tsx
```

---

## 🚀 Deployment Files

### Required for Vercel
- `/vercel.json` - Configures serverless functions
- `/api/test.js` - Test endpoint
- `/api/upload-to-databricks.js` - File upload endpoint
- `/package.json` - Dependencies

### Build Output
- `/dist/` - Vite build output (generated, not in repo)

---

## 📊 Project Stats

**Total Components:** 9 active + 1 protected  
**API Routes:** 2  
**UI Components:** 48 (unused, protected)  
**Documentation:** 3 files  

---

## ✅ Clean Project Status

The project is now cleaned up with only essential files in use. All unused user-created files have been removed. Protected system files (UI components, Attributions, Guidelines) remain but don't affect the application.
