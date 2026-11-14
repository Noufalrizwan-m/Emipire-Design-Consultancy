import React from "react";
import { services } from "../data/services.js";
import { t, numberText } from "../lib/i18n.js";
import { page } from "../lib/routing.js";

export default function PageExtras() {
  if (page === "home" || page === "contact") return null;
  const content = {
    services: {
      tag: "WORKING TOGETHER",
      title: "Support that fits your project.",
      intro:
        "Engage us for a specific package or add specialist capacity to your team.",
      cards: [
        [
          "01 / PROJECT PACKAGES",
          "A clear scope",
          "From a drawing update to a coordinated model, define the work around your project stage and priorities.",
        ],
        [
          "02 / TEAM SUPPORT",
          "Additional capacity",
          "Add drafting, modelling or estimating support when your team needs more hands.",
        ],
        [
          "03 / HANDOVER",
          "Ready for review",
          "Receive organised files in the formats agreed with your project team.",
        ],
      ],
    },
    about: {
      tag: "HOW WE SUPPORT YOU",
      title: "A practical partner for project teams.",
      intro:
        "Choose a defined deliverable or add specialist capacity to an existing project team.",
      cards: [
        [
          "01 / UNDERSTAND",
          "Project packages",
          "Engage us for a specific drawing, modelling or estimating scope.",
        ],
        [
          "02 / COORDINATE",
          "Dedicated support",
          "Add CAD, BIM or estimating capacity alongside your existing team.",
        ],
        [
          "03 / DELIVER",
          "Across project stages",
          "Use technical support for design development, coordination, tendering or handover.",
        ],
      ],
    },
    process: {
      tag: "A COLLABORATIVE WORKFLOW",
      title: "Clarity at every stage.",
      intro:
        "Start with the files you have; we’ll agree the work, review stages and handover.",
      cards: [
        [
          "INPUTS",
          "Bring what you have",
          "Sketches, PDFs, existing CAD files, models, mark-ups and reference images can all help establish the starting point.",
        ],
        [
          "REVIEW",
          "Agree the checkpoints",
          "Set the deliverables, standards, responsibilities and review stages before development begins.",
        ],
        [
          "HANDOVER",
          "Move forward with confidence",
          "Receive the agreed drawings, models or schedules for the next stage of your project.",
        ],
      ],
    },
    visualisation: {
      tag: "FROM INFORMATION TO INSIGHT",
      title: "One project, many perspectives.",
      intro:
        "See spaces before construction and review how building disciplines come together.",
      cards: [
        [
          "01 / VISUALISE",
          "Make ideas visible",
          "Present a proposed space through exterior views, interior renders or walkthroughs.",
        ],
        [
          "02 / COORDINATE",
          "Bring disciplines together",
          "Review architectural, structural and MEP information as part of a coordinated model.",
        ],
        [
          "03 / DOCUMENT",
          "Connect to delivery",
          "Use agreed model and drawing outputs to support review and project communication.",
        ],
      ],
    },
  };
  const data = content[page];
  if (!data) return null;
  return (
    <section
      className={
        "page-extra section-pad " +
        (page === "services" ? "services-support" : "")
      }
    >
      <div className="container">
        <div className="extra-intro">
          <div>
            <h2>{t(data.title)}</h2>
          </div>
          <p>{t(data.intro)}</p>
        </div>
        <div className="extra-cards">
          {data.cards.map(([label, title, copy]) => (
            <article key={t(label)}>
              {page === "services" && (
                <span className="support-index">
                  {numberText(label.split(" ")[0])}
                </span>
              )}
              <h3>{t(title)}</h3>
              <p>{t(copy)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
