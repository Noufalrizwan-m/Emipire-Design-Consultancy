import { defineConfig } from "vite";
import reactTailwind from "@tailwindcss/vite";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import optimizedImages from "./src/optimizedImages.json" with { type: "json" };
import { join } from "node:path";
import { pages, metadata, arabicPages, siteUrl } from "./seo.mjs";

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
          const content = `<main><h1>${entry[0]}</h1><p>${description}</p><p>Dubai, UAE · <a href="tel:+971544348797">+971 54 434 8797</a> · <a href="mailto:support@empiredesignae.com">support@empiredesignae.com</a></p><nav aria-label="${isArabic ? "الخدمات والصفحات" : "Services and pages"}"><ul>${links}</ul></nav></main>`;
          const enUrl = `${siteUrl}${path}`;
          const arUrl = `${siteUrl}/ar${path}`;
          const preload =
            path === "/"
              ? '<link rel="preload" as="image" href="/empire-completed-ivory.jpg" imagesrcset="/mobile/empire-completed-ivory.jpg 960w, /empire-completed-ivory.jpg 1672w" imagesizes="100vw" fetchpriority="high"/>'
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
    },
  };
}
export default defineConfig({ plugins: [reactTailwind(), pageMetadata()] });
