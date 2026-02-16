# Scrap Metal ERP & POS (Web App Prototype)

This repository now contains a lightweight web application prototype for a Scrap Metal ERP & POS workflow.

## Features
- Dark-themed dashboard
- Multi-branch selector
- Scrap purchase entry (material, weight, unit price)
- Customer debt tracking
- Activity timeline
- Local persistence via browser `localStorage` (offline-friendly in-browser state)

## Run locally
No build step is required.

```bash
python3 -m http.server 4173
```

Then open:

- `http://localhost:4173`

## Files
- `index.html` — UI structure
- `styles.css` — dark theme and layout styling
- `app.js` — app logic and local storage handling
