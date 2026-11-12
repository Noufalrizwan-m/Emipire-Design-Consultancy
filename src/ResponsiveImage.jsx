import React, { useSyncExternalStore } from "react";
import optimizedImages from "./optimizedImages.json";
const optimized = new Set(optimizedImages);
// Optimised artwork ships as WebP (converted from the PNG masters in
// design-assets/, so there is no double compression). The .jpg files stay on
// disk as a fallback. Kept as a plain <img> rather than <picture> because the
// stylesheet has direct-child selectors such as `.visual-hero > img`.
const imageUrl = (path) =>
  optimized.has(path) ? path.replace(/\.png$/, ".webp") : path;

// Mobile variants are generated from the same source artwork to preserve the design.
const imageWidths = {
  "/engineering-disciplines.png": [960, 1672],
  "/empire-completed.png": [960, 1672],
  "/hero-reference.png": [960, 1672],
  "/kitchen-sketch-clean.png": [960, 1672],
  "/navy-blueprint.png": [960, 1774],
  "/about-studio-men.png": [960, 1774],
  "/architectural-sketch-bg.png": [640, 1024],
  "/process-studio.png": [960, 1672],
  "/empire-systems-ivory.png": [960, 1672],
  "/nav-bim.png": [877, 1199],
  "/design-to-detail.png": [960, 1672],
  "/empire-systems-red.png": [960, 1672],
  "/visualisation-hero.png": [960, 1774],
  "/services-overview.png": [960, 1672],
  "/contact-handshake.png": [960, 1672],
  "/nav-services.png": [960, 1672],
  "/who-we-are.png": [960, 1672],
  "/bim-illustration.png": [960, 1672],
  "/kitchen-sketch.png": [960, 1672],
  "/kitchen-finished-clean.png": [960, 1672],
  "/empire-building.png": [800, 1145],
  "/services-hand-sketch.png": [960, 1774],
  "/empire-completed-ivory.png": [960, 1672],
  "/services/cad-drafting.png": [960, 1672],
  "/services/authority-approval-drawings.png": [960, 1672],
  "/services/bim-coordination.png": [960, 1672],
  "/services/3d-visualisation.png": [960, 1672],
  "/services/estimating-takeoff.png": [960, 1672],
  "/services/shop-drawings.png": [960, 1672],
};

// Portrait compositions are selected by viewport rather than image resolution.
const portraitImages = {
  "/services/cad-drafting.png": "/mobile/portrait/cad-drafting.png",
  "/services/authority-approval-drawings.png":
    "/mobile/portrait/authority-approval-drawings.png",
  "/services/bim-coordination.png": "/mobile/portrait/bim-coordination.png",
  "/services/shop-drawings.png": "/mobile/portrait/shop-drawings.png",
  "/services/3d-visualisation.png": "/mobile/portrait/3d-visualisation.png",
  "/services/estimating-takeoff.png": "/mobile/portrait/estimating-takeoff.png",
  "/services-overview.png": "/mobile/portrait/services-overview.png",
  "/contact-handshake.png": "/mobile/portrait/contact-handshake.png",
  "/visualisation-hero.png": "/mobile/portrait/visualisation-hero.png",
  "/process-studio.png": "/mobile/portrait/process-studio.png",
  "/who-we-are.png": "/mobile/portrait/who-we-are.png",
};
const mobileQuery = window.matchMedia("(max-width: 700px)");
const subscribeMobile = (notify) => {
  mobileQuery.addEventListener("change", notify);
  return () => mobileQuery.removeEventListener("change", notify);
};
const isMobile = () => mobileQuery.matches;

export default function ResponsiveImage({ src, sizes, ...props }) {
  const mobile = useSyncExternalStore(subscribeMobile, isMobile, () => false);
  const portrait = mobile && portraitImages[src];
  const widths = imageWidths[src];
  const srcSet =
    !portrait && widths
      ? `${imageUrl(`/mobile${src}`)} ${widths[0]}w, ${imageUrl(src)} ${widths[1]}w`
      : undefined;

  return (
    <img
      decoding="async"
      src={imageUrl(portrait || src)}
      srcSet={srcSet}
      sizes={
        srcSet
          ? sizes ||
            (props.className?.includes("service-card-image")
              ? "(max-width: 700px) 85vw, 33vw"
              : "100vw")
          : undefined
      }
      {...props}
    />
  );
}
