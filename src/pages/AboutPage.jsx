import React from "react";
import { ArrowUpRight } from "lucide-react";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import { services } from "../data/services.js";
import { clients } from "../data/clients.js";
import { arabic, t, numberText } from "../lib/i18n.js";
import { page } from "../lib/routing.js";
import { openContactDialog } from "../lib/contactDialog.js";

export default function AboutPage() {
  return (
    <main className="about-page service-detail">
      <section className="about-cover">
        <div className="about-cover-image">
          <ResponsiveImage
            src="/about-studio-men.png"
            alt={t(
              "Two architects reviewing drawings and a building model in a Dubai studio",
            )}
          />
        </div>
        <div className="about-cover-inner">
          <p className="about-label">
            {t("EMPIRE DESIGN CONSULTANCY / DUBAI")}
          </p>
          <h1>
            {t("Built on")}
            {" "}
            <br />
            <em>{t("experience.")}</em>
            {" "}
            <br />
            {t("Focused on")}
            {" "}
            <br />
            {t("your next step")}
            <span>.</span>
          </h1>
          <p>
            {t(
              "Technical expertise and practical support for the people shaping the built environment.",
            )}
          </p>
        </div>
      </section>
      <section
        className="about-highlights"
        aria-label={t("Empire at a glance")}
      >
        <div className="container">
          <h2 className="about-highlights-title">{t("Empire at a glance")}</h2>
          <div className="about-highlights-card">
            {[
              ["16+", "Years group experience"],
              ["3,270+", "Projects completed"],
              ["98%", "Client retention"],
              ["7+", "Global delivery centres"],
            ].map(([value, label]) => (
              <div key={t(label)}>
                <strong>{numberText(value)}</strong>
                <span>{t(label)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="about-empire" className="about-story">
        <div className="container about-story-grid">
          <div>
            <p className="about-label">{t("WHO WE ARE")}</p>
            <h2>
              {t("Technical thinking.")}
              {" "}
              <br />
              <em>{t("Practical outcomes.")}</em>
            </h2>
          </div>
          <div className="about-story-copy">
            <p>
              {t(
                "Empire Design Consultancy is a Dubai-based multidisciplinary team working alongside architects, consultants, contractors and engineers.",
              )}
            </p>
            <p>
              {t(
                "Drawing on years of experience, we help project teams develop, coordinate and communicate their work from early design information through to the documents needed for the next stage.",
              )}
            </p>
            <p>
              {t(
                "Our support can be shaped around a defined package or the additional capacity your team needs.",
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="about-purpose">
        <div className="container">
          <p className="about-label">{t("OUR PURPOSE")}</p>
          <h2>
            {t("A clear vision.")}
            {" "}
            <br />
            <em>{t("A shared mission.")}</em>
          </h2>
          <div className="purpose-grid">
            <article className="reveal">
              <span>{t("01 / OUR VISION")}</span>
              <h3>{t("Design with a wider view.")}</h3>
              <p>
                {t(
                  "To be recognised for innovative, sustainable and precise engineering and design, guided by quality, integrity and client satisfaction.",
                )}
              </p>
            </article>
            <article className="reveal">
              <span>{t("02 / OUR MISSION")}</span>
              <h3>{t("Make expertise useful.")}</h3>
              <p>
                {t(
                  "To deliver reliable, thoughtful design and engineering support that helps clients move their projects forward.",
                )}
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="about-values">
        <div className="container">
          <div className="about-values-heading">
            <div>
              <p className="about-label">{t("OUR APPROACH")}</p>
              <h2>
                {t("Good work is")}
                {" "}
                <br />
                <em>{t("in the details.")}</em>
              </h2>
            </div>
            <p>
              {t(
                "We bring technical information together with the needs of the people who use it.",
              )}
            </p>
          </div>
          <div className="about-values-grid">
            {[
              [
                "01",
                "Understand the context",
                "We start with your project stage, available information and the people who will use the deliverables.",
              ],
              [
                "02",
                "Work across disciplines",
                "Architectural, structural and building-services information needs a coordinated view.",
              ],
              [
                "03",
                "Make the next step clearer",
                "We organise the agreed output so your team can take it forward for review, planning or delivery.",
              ],
              [
                "04",
                "Thoughtful design",
                "We consider sustainability and project context as part of the design conversation.",
              ],
              [
                "05",
                "Technology and detail",
                "CAD, BIM and visualisation tools help teams communicate and review information.",
              ],
              [
                "06",
                "Lasting relationships",
                "Clear communication and collaboration help us support teams throughout a project.",
              ],
            ].map(([n, stepTitle, d]) => (
              <article className="reveal" key={n}>
                <span>{numberText(n)}</span>
                <h3>{t(stepTitle)}</h3>
                <p>{t(d)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-reach">
        <div className="container about-reach-grid">
          <div>
            <p className="about-label">{t("WHERE WE WORK")}</p>
            <h2>
              {t("Local insight.")}
              {" "}
              <br />
              <em>{t("Broad perspective.")}</em>
            </h2>
          </div>
          <div>
            <p>
              {t(
                "From our Dubai base, we support project teams across the UAE, the GCC and India, working on a wide range of building and infrastructure projects.",
              )}
            </p>
            <div className="about-sectors">
              {[
                "Residential",
                "Commercial",
                "Hospitality",
                "Healthcare",
                "Industrial",
                "Retail",
                "Education",
                "Infrastructure",
              ].map((x) => (
                <span key={t(x)}>{t(x)}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="about-contact">
        <div className="container about-contact-grid">
          <div>
            <p className="about-label">{t("LET’S WORK TOGETHER")}</p>
            <h2>
              {t("Bring us into")}
              {" "}
              <br />
              <em>{t("the conversation.")}</em>
            </h2>
          </div>
          <div>
            <p>
              {t(
                "Tell us about your project, your team and where you need technical support.",
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
