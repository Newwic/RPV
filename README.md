# RPV

RPV industrial supply website.

## Deploy Paths

- `server.js` + `views/` + `public/` = Node / Render version
- root `index.html`, `about.html`, `contact.html`, `gallery.html`, `products/index.html` = GitHub Pages static version

## Run Local

```powershell
npm install
npm start
```

## GitHub Pages

Open the root `index.html` directly for local testing, or publish the repository root to GitHub Pages.

## Render Deploy Checklist

1. Push changes to `main`.
2. Open Render dashboard.
3. Select the `RPV` service.
4. Click `Manual Deploy`.
5. Choose `Deploy latest commit`.
6. Wait for build to finish.
7. Open the Render URL and hard refresh once.

## GitHub Pages Checklist

1. Push the static root pages to `main`.
2. Open the GitHub repo.
3. Go to `Settings`.
4. Open `Pages`.
5. Choose `Deploy from a branch`.
6. Select `main` and `/ (root)`.
7. Save and wait for the Pages URL.
