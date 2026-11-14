// There is no router. The path is read once at startup and the whole app
// renders the page it names. `path` is the URL with the /ar prefix and any
// trailing slash stripped, so both languages share one set of route checks.
import { arabic } from "./i18n.js";
import { serviceDetails, arabicDetails } from "../data/serviceDetails.js";

export const originalPath = window.location.pathname;
export const path =
  (arabic ? originalPath.replace(/^\/ar(?=\/|$)/, "") : originalPath).replace(
    /\/$/,
    "",
  ) || "/";
// Keep internal navigation in the selected language.
if (arabic)
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target ||
      link.hasAttribute("download")
    )
      return;
    const raw = link.getAttribute("href");
    if (
      !raw?.startsWith("/") ||
      raw.startsWith("//") ||
      /^\/ar(?:\/|$)/.test(raw)
    )
      return;
    event.preventDefault();
    location.href = "/ar" + raw;
  });
export const serviceSlug = path.startsWith("/services/") ? path.split("/")[2] : null;
export const servicePage = arabic
  ? arabicDetails[serviceSlug]
  : serviceDetails[serviceSlug];
export const knownPath =
  path === "/" ||
  ["/services", "/visualisation", "/process", "/about", "/contact"].includes(
    path,
  ) ||
  (serviceSlug &&
    Object.hasOwn(serviceDetails, serviceSlug) &&
    path === "/services/" + serviceSlug);
export const page =
  path === "/services"
    ? "services"
    : path === "/visualisation"
      ? "visualisation"
      : path === "/process"
        ? "process"
        : path === "/about"
          ? "about"
          : path === "/contact"
            ? "contact"
            : "home";
// Unknown paths must not inherit the homepage styling: 68 rules key off
// body[data-page="home"], and `page` falls through to "home" above.
document.body.dataset.page = knownPath ? page : "not-found";

// Every contact CTA opens the one modal. Kept as real /contact links
// so they still work without JS, keep their styling, and honour middle- or
// cmd-click; the click handler just intercepts the plain left-click.
