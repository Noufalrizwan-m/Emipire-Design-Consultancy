# Empire Design Consultancy website

A bilingual English and Arabic website for Empire Design Consultancy, built with React and Vite. It presents the company's services, projects, process, contact details and project enquiry form.

## Getting started

Requirements: Node.js and npm. PHP 8 or later and a configured mail service are also needed to run the enquiry endpoint.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Vite prints the local address for `dev` and `preview`. The production build is written to `dist/`. Vite does not execute PHP: use a PHP-enabled web server for end-to-end form testing.

## Project structure

- `src/main.jsx` — application entry point, page selection, navigation, page content, language handling and shared animations.
- `src/ContactForm.jsx` — enquiry fields, country and service selectors, client validation and submission states.
- `src/ScrollHero.jsx` — home-page building illustration and interactive reveal.
- `src/ProjectGallery.jsx` — home-page project gallery and carousel controls.
- `src/ResponsiveImage.jsx` and `src/optimizedImages.json` — responsive and optimized image selection. Keep the corresponding image variants together when replacing artwork.
- `src/serviceProjects.js` and `src/translations.js` — service descriptions and Arabic translations.
- `src/index.css` — shared styles, page layouts, responsive rules and animation-related styling.
- `public/` — images, SVGs, client logos, gallery assets, robots file, sitemap and PHP endpoint. Vite copies these files to the build.
- `seo.mjs` and `vite.config.js` — page metadata and generation of page-specific HTML files during the build.
- `public/contact.php` — server-side enquiry validation and mail submission.

## Pages, language and content

The main routes are `/`, `/services`, `/visualisation`, `/process`, `/about` and `/contact`, plus the five `/services/` detail pages listed in `seo.mjs`. Content and service configuration are largely in `src/main.jsx`; service detail descriptions are in `src/serviceProjects.js`. Update both English and Arabic content when making changes.

English pages use unprefixed URLs and Arabic pages use `/ar/` URLs (for example, `/ar/services`). The language button navigates to the corresponding page and reloads it. Arabic uses right-to-left layout. The build generates page-specific HTML and alternate-language links for both versions. The home hero is an illustrative image, not an interactive 3D model.

## Motion and interaction

GSAP and ScrollTrigger provide scroll-triggered fades, movement, counters and selected pinned or scaled sections in `src/main.jsx`. Lenis provides smooth scrolling. The hero reveal is implemented in `src/ScrollHero.jsx`; the kitchen comparison uses a range slider. Gallery and carousel timers pause in various interaction or visibility states. CSS also defines transitions and responsive behavior. Reduced-motion preferences disable the main GSAP/Lenis effect and automatic carousel motion where implemented. Check both languages, mobile and desktop, and reduced-motion mode when changing these effects.

The contact country and service menus overlay the fields below them. The country menu supports search and Escape to close; changing country clears the phone number. The form validates names, email and phone on the client and retains the entered values if sending fails.

## Enquiry delivery

The form posts JSON to `/contact.php`. The endpoint validates input and uses PHP `mail()` to send it to `support@empiredesignae.com`, with the visitor's address as Reply-To. A success response means the server accepted the message for delivery; it does not guarantee inbox delivery. The PHP code must run on the server, not be served as a static file.

Deploy the contents of `dist/` to a PHP 8+ host with outbound mail configured. Configure SPF and DKIM for the sending domain as appropriate for the mail provider, and test delivery to the support inbox after deployment. Configure server-level rate limiting and spam protection for the public endpoint. A static-only host cannot run this PHP endpoint without a separate backend.

## Vercel testing

Vercel can host the Vite frontend for testing. Use `npm run build` as the build command and `dist` as the output directory. The site does not add a preview-specific `noindex` rule. Canonical and social URLs point to `https://empiredesignae.com/`, so verify that domain before public launch.

Vercel does not execute the included `public/contact.php` as PHP. The enquiry form therefore needs a separate compatible backend or a PHP-enabled host before it can send enquiries; simply serving the file does not test email delivery.

## SEO and deployment checks

`seo.mjs` holds page titles, descriptions and the canonical domain. The build creates English and Arabic HTML for each listed route, with canonical and `hreflang` links. The initial HTML includes a concise summary; the interactive page is rendered by React. Update `public/sitemap.xml` and `public/robots.txt` when routes or the domain change. Confirm the hosting server serves the generated route directories and that unknown routes return an appropriate 404.

Before release, run the production build, check the main routes and responsive layouts in both languages, test navigation and motion preferences, and send a real test enquiry on the configured host. There is currently no automated test script in `package.json`.
