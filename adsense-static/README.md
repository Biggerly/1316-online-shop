# Naija Insights (Static HTML/CSS/JS)

A lightweight, mobile‑first content site tailored for Google AdSense approval.

## What’s included
- Fast, responsive pages: `index.html`, `about.html`, `contact.html`, `privacy.html`, `terms.html`, `disclaimer.html`
- Articles directory with 4 long‑form samples
- Clean CSS with card layout, pleasant typography, and icons
- Cookie consent, mobile menu, and newsletter form (non‑submitting)
- SEO basics: `<title>`, meta descriptions, human‑readable URLs
- `robots.txt`, `sitemap.xml`, and `ads.txt` (replace publisher id)

## AdSense checklist
- Publish at least 15–20 original articles (800–1500 words each)
- Keep ads off until after approval. When approved, set `__ADSENSE_ENABLED=true` and replace `ADSENSE_CLIENT` in `index.html`
- Ensure a custom domain, About/Contact/Privacy/Terms/Disclaimer pages
- Avoid copied or AI‑only content; edit for clarity and usefulness

## Run locally (any static server)
```bash
# using Python
cd adsense-static
python3 -m http.server 8080
# visit http://localhost:8080
```

## Deploy
- GitHub Pages, Netlify, Vercel, Cloudflare Pages — just deploy the `adsense-static` folder

## Enable AdSense after approval
Edit the inline script in each HTML page (or extract to a shared partial):
```html
<script>
  window.__ADSENSE_ENABLED=true;
  window.ADSENSE_CLIENT='ca-pub-xxxxxxxxxxxxxxxx';
</script>
```
Add real `<ins class="adsbygoogle">` blocks where `.ad` placeholders are.
