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

The current static build stores edits in browser `localStorage`. For production multi-device persistence, replace the data layer with an authenticated backend/API. The UI and data model are already separated for that upgrade.

## Site switcher
Both brands are accessible from the header switcher. White Labels links to `index.html`; Business Consultancy links to `business.html`.

## Current dynamic behavior
The admin dashboard uses `localStorage` as the working persistence layer. Changes to categories and contact/WhatsApp fields are picked up by the public pages in the same browser. This is suitable for prototyping and UI testing. For a real deployed admin system, the same admin controls should be connected to an authenticated API/database so changes persist across devices and users.
