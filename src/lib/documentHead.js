// Title and meta description are set from the route at startup. The
// prerendered HTML already carries the right values for crawlers; this keeps
// them correct when the app takes over.
import { metadata } from "../../seo.mjs";
import { arabic } from "./i18n.js";
import { path, page, knownPath, servicePage } from "./routing.js";

export const pageMetadata = metadata(path);
export const arabicTitle =
  servicePage?.title ||
  {
    home: "الرئيسية",
    services: "الخدمات",
    visualisation: "التصور ثلاثي الأبعاد ونمذجة معلومات المباني",
    process: "آلية العمل",
    about: "من نحن",
    contact: "اتصل بنا",
  }[page];
document.title = !knownPath
  ? arabic
    ? "الصفحة غير موجودة | إمباير للاستشارات التصميمية"
    : "Page not found | Empire Design Consultancy"
  : arabic
    ? `إمباير للتصميم | ${arabicTitle}`
    : pageMetadata.title;
document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    "content",
    arabic
      ? servicePage?.intro ||
          "إمباير للاستشارات التصميمية تقدم خدمات التصميم الهندسي والرسم ونمذجة معلومات المباني في دبي والإمارات ودول الخليج والهند."
      : pageMetadata.description,
  );
