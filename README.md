# Project Page

Static project page for **PROJECT TITLE**, ready to host on GitHub Pages.

## Structure

```
.
├── index.html        # page content — edit the sections marked "EDIT"
├── styles/main.css   # all styling; tweak the :root tokens to rebrand
├── scripts/main.js   # small JS (BibTeX copy button)
├── assets/           # images and media (teaser, figures, favicon, og-preview)
└── .nojekyll         # tells GitHub Pages to serve files as-is (no Jekyll)
```

## Edit the content

Open `index.html` and look for the `EDIT` comments. Fill in:

- Page metadata + social preview (`<head>`)
- Title, subtitle, authors, affiliations, venue
- Action buttons (paper / arXiv / code / video / dataset links)
- Teaser, abstract, video, method, results sections
- BibTeX block

Drop your images into `assets/` (filenames are listed in `assets/.gitkeep`).

## Preview locally

Any static server works. For example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a repo and push these files:

   ```bash
   git init
   git add .
   git commit -m "Add project page"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)** → Save

3. The site appears at `https://<you>.github.io/<repo>/` in a minute or two.

> Tip: for a personal landing page, name the repo `<you>.github.io` and it
> will be served at the root domain `https://<you>.github.io/`.
