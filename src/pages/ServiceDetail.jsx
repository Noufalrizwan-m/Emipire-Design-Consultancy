import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import { services } from "../data/services.js";
import { slugs } from "../data/navigation.js";
import { scopeSections } from "../data/serviceDetails.js";
import { arabic, t, numberText } from "../lib/i18n.js";
import { serviceSlug, servicePage } from "../lib/routing.js";
import { openContactDialog } from "../lib/contactDialog.js";
import { serviceProjects, arabicProjectDescriptions, arabicProjectExtras } from "../serviceProjects";
import { catalogueIntro, catalogueServices } from "../servicesCatalogue.js";

export default function ServiceDetail() {
  const isVisualService = ["3d-visualisation", "bim-coordination"].includes(
    serviceSlug,
  );
  const [activeScope, setActiveScope] = useState(null);
  const dialogRef = useRef(null);
  const returnFocus = useRef(null);
  const galleryRef = useRef(null);
  const project =
    activeScope === null
      ? null
      : serviceProjects[`${serviceSlug}:${activeScope}`];
  const projectArabic =
    activeScope === null
      ? null
      : arabicProjectExtras[`${serviceSlug}:${activeScope}`];
  const projectCopy = arabic
    ? {
        description:
          projectArabic?.description ??
          arabicProjectDescriptions[serviceSlug]?.[activeScope] ??
          project?.description,
        blocks: projectArabic?.blocks ?? project?.blocks,
      }
    : {
        description: project?.description,
        blocks: project?.blocks,
      };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeScope !== null && !dialog.open) dialog.showModal();
    if (activeScope === null && dialog.open) dialog.close();
  }, [activeScope]);

  const openScope = (index, event) => {
    returnFocus.current = event.currentTarget;
    setActiveScope(index);
  };
  const closeScope = () => {
    setActiveScope(null);
    requestAnimationFrame(() => returnFocus.current?.focus());
  };
  const related = services
    .map(([, title, desc], i) => ({ title, desc, slug: slugs[i] }))
    .filter((item) => item.slug !== serviceSlug);
  return (
    <main className="service-detail service-redesign">
      <section className="service-cover">
        <ResponsiveImage
          className="service-cover-image"
          src={serviceSlug === "authority-approval-drawings"
            ? "/services/authority-approval-drawings.png"
            : "/services/" + serviceSlug + ".png"}
          alt=""
        />
        <div className="service-cover-shade" />
        <div className="service-cover-content">
          <a
            className="service-back"
            href={isVisualService ? "/visualisation" : "/services"}
          >
            {t(isVisualService ? "← 3D & BIM" : "← All services")}
          </a>
          <h1>
            {servicePage.title}
            <span>.</span>
          </h1>
          <p>{servicePage.intro}</p>
          <div className="service-cover-actions">
            <a
              href="/contact"
              className="service-action"
              onClick={openContactDialog}
            >
              {t("Discuss your project")}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section id="service-scope" className="service-scope">
        <div className="container">
          <div className="service-section-head reveal">
            <h2>
              {t("What we can")}
              {" "}
              <em>{t("help with.")}</em>
            </h2>
            <p>
              {t(
                "Support tailored to the information and requirements of your project.",
              )}
            </p>
          </div>
          <div className="service-scope-grid">
            {servicePage.scope.map((item, i) => (
              <button
                type="button"
                className="service-scope-card reveal"
                key={item}
                onClick={(event) => openScope(i, event)}
                aria-label={(arabic ? "استكشف " : "Explore ") + item}
              >
                <h3>{item}</h3>
                <ArrowUpRight size={20} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="service-output">
        <div className="container service-output-grid">
          <div className="reveal">
            <h2>
              {t("Made for your")}
              {" "}
              <em>{t("next step.")}</em>
            </h2>
            <p>{servicePage.outputs}</p>
          </div>
          <div className="service-output-note reveal">
            <strong>{t("Ready to get started?")}</strong>
            <p>
              {t("Share your existing files and tell us what your team needs.")}
            </p>
            <a href="/contact" onClick={openContactDialog}>
              {arabic ? "أرسل تفاصيل مشروعك" : "Send your brief"}{" "}
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <section className="service-working">
        <div className="container">
          <div className="service-section-head reveal">
            <h2>
              {t("Support that")}
              {" "}
              <em>{t("fits your team.")}</em>
            </h2>
            <p>
              {t("Choose the support that suits your project stage and team.")}
            </p>
          </div>
          <div className="service-working-grid">
            {[
              [
                "A defined package",
                "Commission the drawings, models or schedules needed for a particular project stage.",
              ],
              [
                "Additional capacity",
                "Bring in drafting, modelling or estimating support when your workload grows.",
              ],
              [
                "Review-ready information",
                "Organise the agreed output around your team’s review needs.",
              ],
              [
                "Flexible handover",
                "Agree file types and the information your team needs to continue the work.",
              ],
            ].map(([title, copy], i) => (
              <article className="reveal" key={t(title)}>
                <span>{numberText(String(i + 1).padStart(2, "0"))}</span>
                <h3>{t(title)}</h3>
                <p>{t(copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="service-related">
        <div className="container">
          <div className="service-section-head reveal">
            <h2>
              {t("Explore more")}
              {" "}
              <em>{t("services.")}</em>
            </h2>
          </div>
          <div className="service-related-grid">
            {related.map((item) => (
              <a
                href={"/services/" + item.slug}
                key={item.slug}
                className="service-related-card"
              >
                <ResponsiveImage
                  src={"/services/" + item.slug + ".png"}
                  alt=""
                  loading="lazy"
                />
                <div>
                  <h3>{t(item.title)}</h3>
                  <ArrowUpRight size={20} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <dialog
        ref={dialogRef}
        className="scope-dialog"
        data-lenis-prevent
        onClose={closeScope}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeScope();
        }}
        aria-labelledby="scope-dialog-title"
      >
        {activeScope !== null && (
          <div className="scope-dialog-inner">
            <button
              className="scope-close"
              type="button"
              aria-label={t("Close details")}
              onClick={closeScope}
            >
              <X size={22} />
            </button>
            <p className="scope-kicker">{servicePage.title}</p>
            <h2 id="scope-dialog-title">{servicePage.scope[activeScope]}</h2>
            {scopeSections[`${serviceSlug}:${activeScope}`] ? (
              <div className="scope-sections">
                {scopeSections[`${serviceSlug}:${activeScope}`].map((index) => {
                  const L = arabic ? 1 : 0;
                  const section = catalogueServices[index];
                  return (
                    <section key={section.title[0]}>
                      {index !==
                        scopeSections[`${serviceSlug}:${activeScope}`][0] && (
                        <h3>{section.title[L]}</h3>
                      )}
                      <p>{section.intro[L]}</p>
                      <p className="scope-sections-label">
                        {catalogueIntro.includeLabel[L]}
                      </p>
                      {section.groups.map((group, g) => (
                        <div key={g}>
                          {group.label && <h4>{group.label[L]}</h4>}
                          <ul>
                            {group.items.map((item) => (
                              <li key={item[0]}>{item[L]}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <p className="scope-sections-focus">
                        <strong>{catalogueIntro.focusLabel[L]}</strong>{" "}
                        {section.focus[L]}
                      </p>
                    </section>
                  );
                })}
              </div>
            ) : (
              (projectCopy.description || projectCopy.blocks) && (
                <>
                  {projectCopy.description && (
                    <p className="scope-description">
                      {projectCopy.description}
                    </p>
                  )}
                  {projectCopy.blocks?.map((block) => (
                    <div className="scope-points-block" key={block.title}>
                      <h3>{block.title}</h3>
                      <ul className="scope-points">
                        {block.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </>
              )
            )}
            {project?.images?.length > 0 && (
              <>
                <div className="scope-gallery-heading">
                  <div>
                    <span>{t("PROJECT GALLERY")}</span>
                    <h3>{t("Selected work.")}</h3>
                  </div>
                  {project?.images?.length > 1 && (
                    <div className="scope-gallery-controls">
                      <button
                        type="button"
                        aria-label={t("Previous image")}
                        onClick={() =>
                          galleryRef.current?.scrollBy({
                            left: -galleryRef.current.clientWidth * 0.8,
                            behavior: "smooth",
                          })
                        }
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        aria-label={t("Next image")}
                        onClick={() =>
                          galleryRef.current?.scrollBy({
                            left: galleryRef.current.clientWidth * 0.8,
                            behavior: "smooth",
                          })
                        }
                      >
                        →
                      </button>
                    </div>
                  )}
                </div>
                <div
                  ref={galleryRef}
                  className="scope-gallery"
                  tabIndex={0}
                  aria-label={t("Project images")}
                >
                  {project.images.map((image, i) => (
                    <figure key={image.src + i}>
                      <ResponsiveImage
                        src={image.src}
                        alt={image.alt || ""}
                        loading="lazy"
                      />
                      {image.caption && (
                        <figcaption>{t(image.caption)}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </>
            )}
            <a
              className="scope-contact"
              href="/contact"
              onClick={(event) => {
                dialogRef.current?.close();
                openContactDialog(event);
              }}
            >
              {t("Discuss your project")}
              <ArrowUpRight size={17} />
            </a>
          </div>
        )}
      </dialog>
    </main>
  );
}
