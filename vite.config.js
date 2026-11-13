import { defineConfig } from "vite";
import reactTailwind from "@tailwindcss/vite";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import optimizedImages from "./src/optimizedImages.json" with { type: "json" };
import { join } from "node:path";
import {
  pages,
  metadata,
  arabicPages,
  siteUrl,
  pageContent,
  arabicPageContent,
} from "./seo.mjs";

const escapeHtml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

// Full page copy for crawlers and no-JS visitors. React replaces this on mount.
const SECTORS_HEADING = {
  en: "Sectors we support",
  ar: "القطاعات التي نخدمها",
};

function crawlableBody(path, isArabic) {
  const entry = (isArabic ? arabicPageContent : pageContent)[path];
  if (!entry) return "";
  const block = ([heading, body]) =>
    `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(body)}</p></section>`;
  const sections = entry.sections.map(block).join("");
  const sectors = entry.sectors
    ? block([SECTORS_HEADING[isArabic ? "ar" : "en"], entry.sectors])
    : "";
  const extra = (entry.extra || []).map(block).join("");
  return `<p>${escapeHtml(entry.lead)}</p>${sections}${sectors}${extra}`;
}

function pageMetadata() {
  return {
    name: "page-metadata",
    apply: "build",
    async closeBundle() {
      // Ship JPG only: drop PNG originals the app never requests, and the PHP mailer (replaced by /api/contact).
      for (const png of optimizedImages) await rm(join("dist", png), { force: true });
      await rm("dist/contact.php", { force: true });
      const template = await readFile("dist/index.html", "utf8");
      for (const path of Object.keys(pages)) {
        for (const isArabic of [false, true]) {
          const route = isArabic ? "/ar" + (path === "/" ? "/" : path) : path;
          const entry = isArabic ? arabicPages[path] : pages[path];
          const title = isArabic
            ? `إمباير للتصميم | ${entry[0]}`
            : metadata(path).title;
          const description = entry[1];
          const url = `${siteUrl}${route}`;
          const links = Object.entries(isArabic ? arabicPages : pages)
            .filter(([p]) => p !== path)
            .map(
              ([p, data]) =>
                `<li><a href="${isArabic ? "/ar" + (p === "/" ? "/" : p) : p}">${data[0]}</a></li>`,
            )
            .join("");
          const content = `<main><h1>${entry[0]}</h1><p>${description}</p>${crawlableBody(path, isArabic)}<p>Dubai, UAE · <a href="tel:+971544348797">+971 54 434 8797</a> · <a href="mailto:support@empiredesignae.com">support@empiredesignae.com</a></p><nav aria-label="${isArabic ? "الخدمات والصفحات" : "Services and pages"}"><ul>${links}</ul></nav></main>`;
          const enUrl = `${siteUrl}${path}`;
          const arUrl = `${siteUrl}/ar${path}`;
          const preload =
            path === "/"
              ? '<link rel="preload" as="image" href="/empire-completed-ivory.webp" imagesrcset="/mobile/empire-completed-ivory.webp 960w, /empire-completed-ivory.webp 1672w" imagesizes="100vw" fetchpriority="high"/>'
              : "";
          const html = template
            .replace(
              '<html lang="en">',
              isArabic
                ? '<html lang="ar" dir="rtl">'
                : '<html lang="en" dir="ltr">',
            )
            .replace("<!--SEO_CONTENT-->", content)
            .replace(
              'aria-label="Loading website"',
              isArabic
                ? 'aria-label="جارٍ تحميل الموقع"'
                : 'aria-label="Loading website"',
            )
            .replace(
              /<title>.*?<\/title>/,
              `<title>${title.replaceAll("&", "&amp;")}</title>`,
            )
            .replace(
              /<meta name="description" content="[^"]*"\s*\/?\s*>/,
              `<meta name="description" content="${description}"/>`,
            )
            .replace(
              "</head>",
              `${preload}<link rel="canonical" href="${url}"/><link rel="alternate" hreflang="en" href="${enUrl}"/><link rel="alternate" hreflang="ar" href="${arUrl}"/><link rel="alternate" hreflang="x-default" href="${enUrl}"/><meta property="og:title" content="${title.replaceAll("&", "&amp;")}"/><meta property="og:description" content="${description}"/><meta property="og:url" content="${url}"/><meta property="og:type" content="website"/><meta property="og:site_name" content="Empire Design Consultancy"/><meta property="og:locale" content="${isArabic ? "ar_AE" : "en_US"}"/><meta property="og:image" content="https://empiredesignae.com/empire-completed-ivory.jpg"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${title.replaceAll("&", "&amp;")}"/><meta name="twitter:description" content="${description}"/><meta name="twitter:image" content="https://empiredesignae.com/empire-completed-ivory.jpg"/></head>`,
            );
          const directory =
            route === "/" ? "dist" : join("dist", route.slice(1));
          await mkdir(directory, { recursive: true });
          await writeFile(join(directory, "index.html"), html);
        }
      }

      // Vercel serves dist/404.html for any unmatched path, with a real 404
      // status. Build it from the same template as every other route so the
      // app boots normally: React sees a path it does not know and renders
      // the .not-found branch inside the usual header and footer, rather
      // than the visitor landing on Vercel's own error page.
      const notFoundTitle = "Page not found | Empire Design Consultancy";
      const notFoundDescription =
        "This page could not be found. Explore Empire Design Consultancy's CAD drafting, BIM coordination, shop drawing and estimating services in Dubai.";
      const notFound = template
        .replace('<html lang="en">', '<html lang="en" dir="ltr">')
        .replace(
          "<!--SEO_CONTENT-->",
          `<main><h1>Page not found</h1><p>${notFoundDescription}</p><nav aria-label="Services and pages"><ul>${Object.entries(
            pages,
          )
            .map(([p, data]) => `<li><a href="${p}">${data[0]}</a></li>`)
            .join("")}</ul></nav></main>`,
        )
        .replace(/<title>.*?<\/title>/, `<title>${notFoundTitle}</title>`)
        .replace(
          /<meta name="description" content="[^"]*"\s*\/?\s*>/,
          `<meta name="description" content="${notFoundDescription}"/>`,
        )
        .replace("</head>", '<meta name="robots" content="noindex, follow"/></head>');
      await writeFile(join("dist", "404.html"), notFound);
    },
  };
}
export default defineConfig({ plugins: [reactTailwind(), pageMetadata()] });
