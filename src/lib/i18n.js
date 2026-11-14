// Language is decided by the URL: anything under /ar renders Arabic, RTL.
// `t` looks a string up in the Arabic table and falls back to the English
// original, so untranslated copy still renders rather than disappearing.
import { arabicTranslations } from "../translations";

export const arabic = /^\/ar(?:\/|$)/.test(location.pathname);
document.documentElement.lang = arabic ? "ar" : "en";
document.documentElement.dir = arabic ? "rtl" : "ltr";
export const t = (value) => (arabic ? arabicTranslations[value] || value : value);
export const arLabels = {
  Home: "الرئيسية",
  Services: "الخدمات",
  "3D & BIM": "التصميم ثلاثي الأبعاد ونمذجة معلومات المباني",
  Process: "آلية العمل",
  About: "من نحن",
  Contact: "اتصل بنا",
};
export const navLabel = (value) => (arabic ? arLabels[value] || value : value);
export const numberText = (value) =>
  arabic
    ? String(value).replace(/[0-9]/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)])
    : value;
