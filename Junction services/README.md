# Junction Group — Merged Website

## Public pages
- `index.html` — White Labels home
- `products.html` — White Labels product catalogue
- `business.html` — Junction Experts / Business Consultancy

## Structure
- `css/` — page and admin styles
- `js/` — page and admin JavaScript
- `photos/` — logos and future product imagery
- `data/site-data.json` — source-of-truth content for categories/products/contact settings
- `admin/index.html` — future-ready admin dashboard

## Admin
The admin dashboard controls:
- White Labels contact information
- Business Consultancy contact information
- WhatsApp numbers
- Contact headings/text
- Product categories
- Category expansion/default state
- Product names
- Pack sizes
- Product detail/target text
- Add/delete categories and products

Run `node server.js` and open `http://localhost:3000` to use the shared JSON API. The admin saves changes to `/api/site-data`, so both public pages read the same updated data. If the files are opened directly without the server, they fall back to the bundled JSON and browser `localStorage`.

## Site switcher
Both brands are accessible from the header switcher. White Labels links to `index.html`; Business Consultancy links to `business.html`.

## Current dynamic behavior
The admin dashboard keeps a local fallback for offline/static use, while the server API is the shared persistence layer for both public pages.
