// Loads the built app and reports the observable side effects the old single
// file produced in a fixed order. If the split changed evaluation order, these
// differ.
import { JSDOM } from "jsdom";
import fs from "fs";
process.on("unhandledRejection",()=>{}); process.on("uncaughtException",()=>{});
const route = process.argv[2];
const file = route === "/" ? "dist/index.html" : `dist${route}/index.html`;
const entry = fs.readdirSync("dist/assets").find(f => /^index-.*\.js$/.test(f));
const dom = new JSDOM(fs.readFileSync(file,"utf8"), { url:"http://localhost:3000"+route, pretendToBeVisual:true });
const w = dom.window;
w.matchMedia = q => ({matches:false,media:q,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}});
for (const k of ["window","document","location","history","HTMLElement","Element","Node","CustomEvent","Event","getComputedStyle","requestAnimationFrame","cancelAnimationFrame","IntersectionObserver","ResizeObserver","MutationObserver","Image","DOMParser","sessionStorage","matchMedia"])
  { try { if (w[k]!==undefined) Object.defineProperty(globalThis,k,{value:w[k],configurable:true,writable:true}); } catch {} }
if (!globalThis.performance.getEntriesByType) globalThis.performance.getEntriesByType = () => [];
Object.defineProperty(w,"performance",{value:globalThis.performance,configurable:true});
globalThis.requestIdleCallback = cb => setTimeout(cb,0); globalThis.cancelIdleCallback = id => clearTimeout(id);
globalThis.IntersectionObserver ||= class { observe(){} unobserve(){} disconnect(){} };
globalThis.ResizeObserver ||= class { observe(){} unobserve(){} disconnect(){} };
globalThis.scrollTo = w.scrollTo = () => {};
w.document.fonts = { ready: Promise.resolve() };
let err = "";
try { await import("./dist/assets/"+entry); } catch(e){ err = (e.stack||e.message).split("\n")[0]; }
await new Promise(r=>setTimeout(r,250));
const d = w.document;
console.log(JSON.stringify({
  route,
  error: err || null,
  title: d.title,
  dataPage: d.body.dataset.page,
  lang: d.documentElement.lang,
  dir: d.documentElement.dir,
  metaDesc: (d.querySelector('meta[name="description"]')||{}).content?.slice(0,60),
  rootTextLen: d.getElementById("root")?.textContent.trim().length,
  h1: d.querySelector("h1")?.textContent.trim().slice(0,40),
}));
process.exit(0);
