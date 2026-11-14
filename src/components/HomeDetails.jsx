import React, { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import Reviews from "../components/Reviews.jsx";
import { clients } from "../data/clients.js";
import { arabic, t, numberText } from "../lib/i18n.js";

export default function HomeDetails() {
  const sectors = useRef(null);
  useEffect(() => {
    const track = sectors.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let paused = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.3 },
    );
    observer.observe(track);
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };
    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", resume);
    const timer = window.setInterval(() => {
      if (!visible || paused || reduced.matches || window.innerWidth > 700)
        return;
      const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      track.scrollTo({
        left: end ? 0 : track.scrollLeft + track.clientWidth,
        behavior: "smooth",
      });
    }, 6000);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
      track.removeEventListener("focusin", pause);
      track.removeEventListener("focusout", resume);
    };
  }, []);
  const moveSector = (direction) =>
    sectors.current?.scrollBy({
      left: direction * sectors.current.clientWidth,
      behavior: "smooth",
    });
  return (
    <>
      <section className="home-industries">
        <div className="container">
          <div className="detail-heading">
            <div>
              <p className="about-label">
                {arabic ? "القطاعات التي ندعمها" : "SECTORS WE SUPPORT"}
              </p>
              <h2>
                {arabic ? "مساحات متنوعة." : "Different spaces."}
                {" "}
                <br />
                <em>{arabic ? "طموح مشترك." : "Shared ambition."}</em>
              </h2>
            </div>
            <p>
              {arabic
                ? "دعم فني للفرق التي تنفذ مشاريع المباني والبنية التحتية في قطاعات متنوعة."
                : "Technical support for the teams delivering buildings and infrastructure across a range of sectors."}
            </p>
          </div>
          <div className="sector-controls">
            <button
              type="button"
              onClick={() => moveSector(-1)}
              aria-label={arabic ? "القطاعات السابقة" : "Previous sectors"}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => moveSector(1)}
              aria-label={arabic ? "القطاعات التالية" : "Next sectors"}
            >
              →
            </button>
          </div>
          <div
            className="industry-grid"
            ref={sectors}
            tabIndex={0}
            aria-label={arabic ? "القطاعات التي ندعمها" : "Sectors we support"}
          >
            {(arabic
              ? [
                  ["التجاري", "المكاتب والأبراج والمشاريع متعددة الاستخدامات"],
                  ["السكني", "الفلل والمجمعات والأبراج السكنية"],
                  ["الرعاية الصحية", "المستشفيات ومراكز التشخيص والمختبرات"],
                  ["الصناعي", "المستودعات والمصانع ومراكز التوزيع"],
                  ["الضيافة", "الفنادق والمنتجعات والمطاعم"],
                  ["التعليم", "المدارس والحرم الجامعية والجامعات"],
                  ["التجزئة", "مراكز التسوق ومساحات البيع بالتجزئة"],
                  ["المطارات", "المحطات ومرافق الطيران"],
                  ["البنية التحتية", "الطرق والجسور والمرافق"],
                  ["السكك الحديدية", "المحطات وشبكات النقل والمستودعات"],
                ]
              : [
                  ["Commercial", "Offices, towers and mixed-use developments"],
                  ["Residential", "Villas, communities and residential towers"],
                  [
                    "Healthcare",
                    "Hospitals, diagnostic centres and laboratories",
                  ],
                  [
                    "Industrial",
                    "Warehouses, plants and distribution facilities",
                  ],
                  ["Hospitality", "Hotels, resorts and dining spaces"],
                  ["Education", "Schools, campuses and universities"],
                  ["Retail", "Shopping centres and retail spaces"],
                  ["Airports", "Terminals and aviation facilities"],
                  ["Infrastructure", "Roads, bridges and utilities"],
                  ["Rail", "Stations, transit networks and depots"],
                ]
            ).map(([title, copy]) => (
              <article key={t(title)}>
                <h3>{t(title)}</h3>
                <p>{t(copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="home-deliverables">
        <div className="container detail-split">
          <div className="detail-sticky">
            <p className="about-label">
              {arabic ? "المخرجات المعتادة" : "TYPICAL DELIVERABLES"}
            </p>
            <h2>
              {arabic ? "التفاصيل تكتمل" : "The detail lives"}
              {" "}
              <br />
              <em>{arabic ? "عند التسليم." : "in the handover."}</em>
            </h2>
            <p>
              {t(
                "Agreed outputs for review, coordination and the next stage of your project.",
              )}
            </p>
          </div>
          <div className="deliverable-items">
            {[
              "PDF to CAD conversion",
              "Permit and submission drawings",
              "Shop and construction drawings",
              "Civil and infrastructure drawings",
              "As-built documentation",
              "2D floor plans and layouts",
              "Drawing set updates",
            ].map((x, i) => (
              <div className="reveal" key={t(x)}>
                <span>{numberText(String(i + 1).padStart(2, "0"))}</span>
                <strong>{t(x)}</strong>
                <Check size={20} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="home-testimonials">
        <div className="container">
          <div className="detail-heading">
            <div>
              <p className="about-label">
                {arabic ? "آراء العملاء" : "CLIENT FEEDBACK"}
              </p>
              <h2>
                {arabic ? "كلمات من" : "Words from"}
                {" "}
                <br />
                <em>{arabic ? "عملائنا." : "our clients."}</em>
              </h2>
            </div>
          </div>
          <Reviews />
        </div>
      </section>
    </>
  );
}
