import React from "react";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import { services } from "../data/services.js";
import { pageIntros } from "../data/pageIntros.js";
import { arabic, t } from "../lib/i18n.js";
import { page } from "../lib/routing.js";

export default function PageIntro() {
  const content = pageIntros[page];
  if (!content) return null;
  return (
    <section className="page-intro">
      <div className="page-intro-content">
        <h1>
          {t(content[0])}
          {" "}
          <br />
          <em>{t(content[1])}</em>
        </h1>
        <p>{t(content[2])}</p>
      </div>
      {page === "services" || page === "contact" ? (
        <div className="services-intro-image">
          <ResponsiveImage
            src={
              page === "contact"
                ? "/contact-handshake.png"
                : "/services-overview.png"
            }
            alt={
              page === "contact"
                ? arabic
                  ? "متخصصان في التصميم يتصافحان في مكتب بدبي"
                  : "Two design professionals shaking hands in a Dubai studio"
                : arabic
                  ? "رسومات ونماذج معمارية وأدوات تقدير"
                  : "Architectural drawings, models and estimating tools"
            }
          />
        </div>
      ) : (
        <div className="page-intro-art" aria-hidden="true" />
      )}
    </section>
  );
}
