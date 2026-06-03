# Lui Villa — Vacation Rental Website

Angular 17 vacation rental website for **Lui Villa**, a luxury 3-bedroom private villa.

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, features, gallery preview, CTA |
| `/property` | Property Details — amenities, bedrooms, location, house rules |
| `/gallery` | Photo Gallery — filterable grid with lightbox |
| `/pricing` | Pricing — seasonal rates, what's included, add-ons, policies |
| `/contact` | Contact — inquiry form, Line/Facebook/Phone direct buttons |

## Tech Stack

- **Angular 17** — standalone components, new `@for`/`@if` control flow
- **TypeScript** strict mode
- **Signals** for reactive state
- **Lazy-loaded routes** for fast page loads
- **Google Fonts** — Playfair Display + Poppins
- **Font Awesome 6** icons

## Setup

### Prerequisites

Install [Node.js 18+](https://nodejs.org) and the Angular CLI:

```bash
npm install -g @angular/cli
```

### Install & Run

```bash
npm install
npm start
# Opens at http://localhost:4200
```

### Build for Production

```bash
npm run build
# Output in dist/lui888/
```

## Customisation

### Update Contact Details

Search for `YOUR_LINE_ID` and `YOUR_PAGE` across the codebase and replace with your real Line ID and Facebook page handle.

Update the phone number `+66 80 000 0000` with your real number in:
- `src/app/pages/home/home.component.ts`
- `src/app/pages/contact/contact.component.ts`
- `src/app/shared/components/footer/footer.component.ts`

### Update Property Images

Replace the `images.unsplash.com` URLs with your own property photos in:
- `home.component.ts` — hero & gallery preview
- `gallery.component.ts` — full gallery
- `property-details.component.ts` — bedroom images

Host your images in `src/assets/images/` and reference them as `/assets/images/your-photo.jpg`.

### Update Pricing

Edit the `seasons` array in `src/app/pages/pricing/pricing.component.ts`.

### Update Property Details

Edit the data arrays in `src/app/pages/property-details/property-details.component.ts`:
- `keyStats` — bedrooms, bathrooms, guests, area
- `amenityCategories` — all amenity lists
- `bedrooms` — bedroom descriptions
- `locationPoints` — nearby distances
- `houseRules` — policies

## Project Structure

```
src/
├── app/
│   ├── app.component.ts        # Root shell (header + router-outlet + footer)
│   ├── app.config.ts           # Angular providers
│   ├── app.routes.ts           # Lazy-loaded routes
│   ├── shared/
│   │   └── components/
│   │       ├── header/         # Sticky nav with mobile hamburger
│   │       └── footer/         # Links, social, copyright
│   └── pages/
│       ├── home/
│       ├── property-details/
│       ├── gallery/
│       ├── pricing/
│       └── contact/
├── index.html                  # App shell (SEO meta tags, CDN fonts/icons)
├── main.ts                     # Bootstrap
└── styles.scss                 # Global CSS variables & resets
```
