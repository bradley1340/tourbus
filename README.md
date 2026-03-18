# tourbus — Vercel Deployment

## Files in this folder
- `index.html` — entry point with mobile viewport meta tags
- `src/main.jsx` — React entry
- `src/App.jsx` — full tourbus app
- `package.json` — dependencies
- `vite.config.js` — build config
- `vercel.json` — Vercel routing

## Deploy to Vercel (5 steps)

### Step 1 — Install Node.js
Download from nodejs.org if you don't have it.

### Step 2 — Create a GitHub repo
1. Go to github.com → New repository → name it "tourbus"
2. Upload all files in this folder to the repo

### Step 3 — Connect to Vercel
1. Go to vercel.com → Sign up free with GitHub
2. Click "Add New Project"
3. Import your "tourbus" GitHub repo
4. Leave all settings as default → click Deploy

### Step 4 — Get your URL
Vercel gives you a URL like `tourbus-abc123.vercel.app`
Open it on your iPhone in Safari — full mobile experience!

### Step 5 — Custom domain (optional)
In Vercel dashboard → Settings → Domains → add tourbus.live

## Local development
```
npm install
npm run dev
```
Then open http://localhost:5173
