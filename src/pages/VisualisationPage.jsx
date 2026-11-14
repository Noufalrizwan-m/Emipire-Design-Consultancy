import React from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import { services } from "../data/services.js";
import { clients } from "../data/clients.js";
import { arabic, t, numberText } from "../lib/i18n.js";
import { page } from "../lib/routing.js";
import { openContactDialog } from "../lib/contactDialog.js";

export default function VisualisationPage() {
  const visualServices = [
    {
      number: "01",
      title: "3D visualisation",
      description:
        "Show how a space will look and feel before construction. We create visuals that help clients, project teams and stakeholders understand the design.",
      features: [
        "Exterior and interior renders",
        "3D floor plans and walkthroughs",
        "Landscape visualisation",
      ],
      image: "/services/3d-visualisation.png",
      href: "/services/3d-visualisation",
    },
    {
      number: "02",
      title: "BIM & coordination",
      description:
        "Bring architectural, structural and building-services information together in a coordinated model to support review and project delivery.",
      features: [
        "Multidisciplinary modelling",
        "Model coordination and clash review",
        "CAD-to-BIM and as-built models",
      ],
      image: "/services/bim-coordination.png",
      href: "/services/bim-coordination",
    },
  ];

  return (
    <main className="visual-page">
      <section className="visual-hero">
        <ResponsiveImage
          src="/visualisation-hero.png"
          alt={t(
            "Architectural building visualisation with a digital BIM model",
          )}
        />
        <div className="visual-hero-shade" />
        <div className="container visual-hero-copy">
          <p>{t("3D VISUALISATION & BIM")}</p>
          <h1>
            {t("See the vision.")}
            {" "}
            <br />
            <em>{t("Understand the detail.")}</em>
          </h1>
          <p>
            {t(
              "From compelling visualisations to coordinated models, we make project information easier to explore.",
            )}
          </p>
          <a href="#visual-services">
            {t("Explore our services")}
            <ArrowDown size={18} />
          </a>
        </div>
      </section>
      <section id="visual-services" className="visual-approach">
        <div className="visual-artwork visual-artwork-light" aria-hidden="true" />
        <div className="container">
          <div className="visual-section-heading">
            <p>{t("DESIGN IN THREE DIMENSIONS")}</p>
            <h2>
              {t("See it clearly.")}
              {" "}
              <br />
              <em>{t("Plan it together.")}</em>
            </h2>
            <p>
              {t(
                "Whether you need to communicate a design or coordinate its details, choose the support that fits your project.",
              )}
            </p>
          </div>
          <div className="visual-service-grid">
            {visualServices.map((service) => (
              <article className="visual-service-card" key={service.href}>
                <a
                  className="visual-service-image"
                  href={service.href}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <ResponsiveImage src={service.image} alt="" loading="lazy" />
                </a>
                <div className="visual-service-body">
                  <span>
                    {numberText(service.number)} /{" "}
                    {arabic ? "خدماتنا" : "OUR SERVICES"}
                  </span>
                  <h3>{t(service.title)}</h3>
                  <p>{t(service.description)}</p>
                  <ul>
                    {service.features.map((feature) => (
                      <li key={t(feature)}>{t(feature)}</li>
                    ))}
                  </ul>
                  <a href={service.href}>
                    {arabic ? "استكشف " : "Explore "}
                    {t(service.title)} <ArrowUpRight size={18} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="visual-finish">
        <div className="visual-artwork visual-artwork-dark" aria-hidden="true" />
        <div className="container">
          <h2>
            {t("Make the next")}
            {" "}
            <br />
            <em>{t("decision clearer.")}</em>
          </h2>
          <p>
            {t(
              "Tell us about your project and the views or models your team needs.",
            )}
          </p>
          <a href="/contact" onClick={openContactDialog}>
            {t("Discuss your project")}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}

