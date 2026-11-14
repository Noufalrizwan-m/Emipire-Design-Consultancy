import React from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import { processStages } from "../data/processStages.js";
import { arabic, t, numberText } from "../lib/i18n.js";
import { page } from "../lib/routing.js";
import { openContactDialog } from "../lib/contactDialog.js";

export default function ProcessPage() {
  return (
    <main className="process-page service-detail">
      <section className="process-cover">
        <ResponsiveImage
          src="/process-studio.png"
          alt={t("Architectural model and project drawings in a design studio")}
        />
        <div className="process-cover-shade" />
        <div className="process-cover-copy">
          <p className="process-kicker">
            {t("OUR PROCESS")}
            <span> / </span>
            {t("FROM BRIEF TO DELIVERY")}
          </p>
          <h1>
            {t("Good work starts")}
            {" "}
            <br />
            <em>{t("with clarity.")}</em>
          </h1>
          <p>
            {t(
              "A practical route from the information you have today to the files your team needs next.",
            )}
          </p>
          <a href="#our-process">
            {t("Explore our process")}
            <ArrowDown size={18} />
          </a>
        </div>
      </section>
      <section id="our-process" className="process-journey">
        <div className="container">
          <div className="journey-heading">
            <div>
              <p className="process-kicker">{t("HOW WE WORK")}</p>
              <h2>
                {t("Four steps.")}
                {" "}
                <br />
                <em>{t("One clear direction.")}</em>
              </h2>
            </div>
            <p>
              {t(
                "The starting point can be a sketch, an existing model or a marked-up drawing. We agree the level of detail and review points for your project.",
              )}
            </p>
          </div>
          <div className="journey-list">
            {processStages.map(([number, title, copy, detail]) => (
              <article className="journey-step" key={number}>
                <span className="journey-number">{numberText(number)}</span>
                <div>
                  <h3>{t(title)}</h3>
                  <p>{t(copy)}</p>
                </div>
                <div className="journey-detail">
                  <span>{t("WHAT TO EXPECT")}</span>
                  <p>{t(detail)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="process-collaboration">
        <div className="container collaboration-grid">
          <div>
            <p className="process-kicker">{t("WORKING TOGETHER")}</p>
            <h2>
              {t("Your project.")}
              {" "}
              <br />
              <em>{t("Our shared focus.")}</em>
            </h2>
          </div>
          <div>
            <p>
              {t(
                "Project teams can engage us for a defined package or bring in dedicated drafting, modelling and estimating support as workloads change.",
              )}
            </p>
            <div className="collaboration-points">
              <span>{t("Clear scope")}</span>
              <span>{t("Agreed reviews")}</span>
              <span>{t("Organised handover")}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="process-contact">
        <div className="container process-contact-inner">
          <div>
            <p className="process-kicker">{t("READY WHEN YOU ARE")}</p>
            <h2>
              {t("Let’s make the")}
              {" "}
              <br />
              <em>{t("next step clear.")}</em>
            </h2>
          </div>
          <div>
            <p>
              {t(
                "Tell us the project stage, the work required and any files available for review.",
              )}
            </p>
            <a href="/contact" onClick={openContactDialog}>
              {arabic ? "أرسل تفاصيل مشروعك" : "Send your brief"}{" "}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
