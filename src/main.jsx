import { arabicTranslations } from "./translations";
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import { catalogueIntro, catalogueServices } from "./servicesCatalogue.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  ChevronDown,
  Menu,
  X,
  Layers3,
  Box,
  PenTool,
  Ruler,
  Calculator,
  FileCheck,
  Check,
  Mail,
  Phone,
} from "lucide-react";
import "./index.css";
import ResponsiveImage from "./components/ResponsiveImage";
import ScrollHero from "./components/ScrollHero";
import ProjectGallery from "./components/ProjectGallery";
const ContactForm = React.lazy(() => import("./components/ContactForm"));
import {
  serviceProjects,
  arabicProjectDescriptions,
  arabicProjectExtras,
} from "./serviceProjects";
import { metadata } from "../seo.mjs";
gsap.registerPlugin(ScrollTrigger);
// Reloads start at the top; section links keep their target.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const navigationEntry = performance.getEntriesByType("navigation")[0];
if (navigationEntry?.type === "reload" && !location.hash) {
  window.scrollTo(0, 0);
}

import { services } from "./data/services.js";
import { clients } from "./data/clients.js";
import { links, slugs } from "./data/navigation.js";
import {
  serviceDetails,
  scopeSections,
  arabicDetails,
} from "./data/serviceDetails.js";
import { storyScenes } from "./data/storyScenes.js";
import { pageIntros } from "./data/pageIntros.js";
import { processStages } from "./data/processStages.js";
import { arabic, t, navLabel, numberText } from "./lib/i18n.js";
import {
  path,
  serviceSlug,
  servicePage,
  knownPath,
  page,
} from "./lib/routing.js";
import { CONTACT_EVENT, openContactDialog } from "./lib/contactDialog.js";
import { waitForImage } from "./lib/waitForImage.js";
import "./lib/documentHead.js";
import MotionStory from "./components/MotionStory.jsx";
import KitchenReveal from "./components/KitchenReveal.jsx";
import PageIntro from "./components/PageIntro.jsx";
import PageExtras from "./components/PageExtras.jsx";
import Reviews from "./components/Reviews.jsx";
import HomeDetails from "./components/HomeDetails.jsx";
// Only one of these ever renders, and which one is known from the URL before
// React mounts. Loading them on demand keeps every other page's markup and
// data out of the homepage bundle.
const VisualisationPage = React.lazy(() => import("./pages/VisualisationPage.jsx"));
const ServiceDetail = React.lazy(() => import("./pages/ServiceDetail.jsx"));
const ProcessPage = React.lazy(() => import("./pages/ProcessPage.jsx"));
const AboutPage = React.lazy(() => import("./pages/AboutPage.jsx"));
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";
function App() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [dropdown, setDropdown] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const contactDialog = useRef(null);
  const serviceListRef = useRef(null);
  const [serviceSlides, setServiceSlides] = useState([0]);
  const [activeServiceSlide, setActiveServiceSlide] = useState(0);
  useEffect(() => {
    if (page !== "services") return;
    const list = serviceListRef.current;
    if (!list) return;
    let offsets = [0];
    const measure = () => {
      const max = Math.max(0, list.scrollWidth - list.clientWidth);
      const cards = [...list.children];
      const firstCardOffset = cards[0]?.offsetLeft ?? 0;
      offsets = cards
        .map((card) => card.offsetLeft - firstCardOffset)
        .filter((offset) => offset <= max + 2);
      if (!offsets.length) offsets = [0];
      setServiceSlides(offsets);
      const current = offsets.reduce((best, offset, index) =>
        Math.abs(offset - list.scrollLeft) < Math.abs(offsets[best] - list.scrollLeft) ? index : best, 0);
      setActiveServiceSlide(current);
    };
    const onScroll = () => {
      const current = offsets.reduce((best, offset, index) =>
        Math.abs(offset - list.scrollLeft) < Math.abs(offsets[best] - list.scrollLeft) ? index : best, 0);
      setActiveServiceSlide(current);
    };
    measure();
    list.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    [...list.children].forEach((card) => observer.observe(card));
    return () => {
      list.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [page]);
  useEffect(() => {
    if (contactOpen && contactDialog.current && !contactDialog.current.open)
      contactDialog.current.showModal();
  }, [contactOpen]);
  useEffect(() => {
    const open = () => setContactOpen(true);
    window.addEventListener(CONTACT_EVENT, open);
    return () => window.removeEventListener(CONTACT_EVENT, open);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menu]);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const carousels = [
      ...document.querySelectorAll(
        '.motion-story-viewport, body[data-page="services"] .service-list',
      ),
    ];
    const cleanups = carousels.map((el) => {
      let visible = false,
        pausedUntil = 0;
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0.35 },
      );
      observer.observe(el);
      const pause = () => {
        pausedUntil = Date.now() + 8000;
      };
      el.addEventListener("pointerdown", pause);
      el.addEventListener("focusin", pause);
      el.addEventListener("keydown", pause);
      const timer = window.setInterval(() => {
        if (
          !mobile.matches ||
          reduced.matches ||
          !visible ||
          document.hidden ||
          Date.now() < pausedUntil ||
          el.contains(document.activeElement)
        )
          return;
        const items = [
          ...el.querySelectorAll(
            el.classList.contains("motion-story-viewport")
              ? ".motion-scene"
              : ".service-row",
          ),
        ];
        if (items.length < 2) return;
        const positions = items.map(
          (item) =>
            item.getBoundingClientRect().left -
            el.getBoundingClientRect().left +
            el.scrollLeft,
        );
        const current = positions.reduce(
          (best, pos, i) =>
            Math.abs(pos - el.scrollLeft) <
            Math.abs(positions[best] - el.scrollLeft)
              ? i
              : best,
          0,
        );
        el.scrollTo({
          left: positions[(current + 1) % items.length],
          behavior: "smooth",
        });
      }, 5500);
      return () => {
        clearInterval(timer);
        observer.disconnect();
        el.removeEventListener("pointerdown", pause);
        el.removeEventListener("focusin", pause);
        el.removeEventListener("keydown", pause);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.09,
      anchors: true,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    if (!location.hash) lenis.scrollTo(0, { immediate: true, force: true });
    const settle = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", settle, { once: true });
    document.fonts?.ready.then(settle);
    // Warm lazy images (fetch + decode) just before they scroll into view,
    // so they never pop in or stall a frame mid-scroll.
    const warm = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const img = entry.target;
          warm.unobserve(img);
          img.loading = "eager";
          img.decode?.().catch(() => {});
        }),
      { rootMargin: "1800px 0px" },
    );
    const warmTimer = setTimeout(
      () => document.querySelectorAll("img[loading='lazy']").forEach((i) => warm.observe(i)),
      600,
    );
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray("main section h2, main section h3, main section p")
        .filter(
          (el) =>
            !el.closest(
              ".motion-scene, .still-hero, .service-cover, .process-cover, .about-cover",
            ) &&
            !el.classList.contains("about-label") &&
            !el.classList.contains("process-kicker"),
        )
        .forEach((el) =>
          gsap.fromTo(
            el,
            { y: 12, opacity: 0.8 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 118%", once: true },
            },
          ),
        );
      gsap.utils.toArray(".about-highlights-card strong").forEach((el) => {
        const original = el.textContent;
        const target = Number(
          original
            .replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit))
            .replace(/[^0-9]/g, ""),
        );
        if (!Number.isFinite(target)) return;
        const suffix = original.includes("%")
          ? "%"
          : original.includes("+")
            ? "+"
            : "";
        const counter = { value: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(counter, {
              value: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = numberText(
                  Math.round(counter.value).toLocaleString("en-US") + suffix,
                );
              },
              onComplete: () => {
                el.textContent = original;
              },
            }),
        });
      });
      gsap.utils
        .toArray(".reveal")
        .forEach((el) =>
          gsap.fromTo(
            el,
            { y: 36, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 115%", once: true },
            },
          ),
        );
      if (
        page === "home" &&
        matchMedia("(min-width:1025px)").matches &&
        document.querySelector(".motion-story-track")
      ) {
        const viewport = document.querySelector(".motion-story-viewport");
        const track = viewport.querySelector(".motion-story-track");
        gsap.to(track, {
          x: () =>
            (arabic ? 1 : -1) * (track.scrollWidth - viewport.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "top top",
            end: () => "+=" + (track.scrollWidth - viewport.clientWidth),
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
      if (servicePage && document.querySelector(".service-cover-image"))
        gsap.to(".service-cover-image", {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".service-cover",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      const processLayout = document.querySelector(".process-layout");
      if (processLayout) {
        const steps = Array.from(processLayout.querySelectorAll(".process-timeline li"));
        const line = processLayout.querySelector(".process-line-fill");
        ScrollTrigger.create({
          trigger: processLayout,
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
          onUpdate: ({ progress }) => {
            const active = Math.min(steps.length - 1, Math.floor(progress * steps.length));
            steps.forEach((step, index) => step.classList.toggle("is-active", index === active));
            if (line) line.style.transform = `scaleY(${progress})`;
          },
        });
        steps[0]?.classList.add("is-active");
      }
      if (page === "home" && document.querySelector(".home-intro-image")) {
        gsap.fromTo(
          ".home-intro-image img",
          { scale: 1.16 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".home-intro",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
        gsap.fromTo(
          ".home-intro-image",
          { clipPath: "inset(8% 8% 8% 8% round 18px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: {
              trigger: ".home-intro",
              start: "top 85%",
              end: "center 50%",
              scrub: 0.6,
            },
          },
        );
        gsap.fromTo(
          ".home-intro-copy",
          { y: 35, opacity: 0.7 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".home-intro",
              start: "top 85%",
              end: "center 55%",
              scrub: 0.5,
            },
          },
        );
      }
    });
    return () => {
      window.removeEventListener("load", settle);
      ctx.revert();
      lenis.destroy();
      clearTimeout(warmTimer);
      warm.disconnect();
      gsap.ticker.remove(tick);
    };
  }, []);
  const isVisualService = [
    "/services/3d-visualisation",
    "/services/bim-coordination",
  ].includes(location.pathname);
  const isCurrentNav = (name) =>
    name === "Services"
      ? location.pathname.startsWith("/services") && !isVisualService
      : name === "3D & BIM"
        ? location.pathname.startsWith("/visualisation") || isVisualService
        : name === "Home"
          ? location.pathname === "/"
          : location.pathname === "/" + name.toLowerCase();
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          const main = document.querySelector("main");
          if (main) {
            main.setAttribute("tabindex", "-1");
            main.focus({ preventScroll: false });
          }
        }}
      >
        {t("Skip to content")}
      </a>
        <Header
          menu={menu}
          setMenu={setMenu}
          scrolled={scrolled}
          dropdown={dropdown}
          setDropdown={setDropdown}
          isCurrentNav={isCurrentNav}
        />
      {!knownPath ? (
        <main className="not-found">
          <div className="container not-found-grid">
            <div className="not-found-copy">
              <p className="not-found-eyebrow">
                {arabic ? "خطأ 404" : "Error 404"}
              </p>
              <h1>
                {arabic ? (
                  <>
                    هذه الصفحة ليست
                    {" "}
                    <br />
                    <em>ضمن المجموعة.</em>
                  </>
                ) : (
                  <>
                    Not in the
                    {" "}
                    <br />
                    <em>drawing set.</em>
                  </>
                )}
              </h1>
              <p className="not-found-lead">
                {arabic
                  ? "الصفحة المطلوبة غير موجودة. ربما تم نقلها أو تغيير اسمها، أو أن الرابط غير مكتمل. بقية الصفحات في مكانها كما هي."
                  : "The page you asked for isn't here. It may have been moved or renamed, or the link may be incomplete. Everything else is still where you left it."}
              </p>
              <div className="not-found-actions">
                <a className="not-found-primary" href="/">
                  {arabic ? "العودة إلى الرئيسية" : "Back to home"}
                  <ArrowUpRight size={17} />
                </a>
                <a
                  className="not-found-secondary"
                  href="/contact"
                  onClick={openContactDialog}
                >
                  {arabic ? "أرسل تفاصيل مشروعك" : "Send your brief"}
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>

            <aside className="not-found-sheet" aria-labelledby="nf-links">
              <p className="not-found-code">
                4<span>0</span>4
              </p>
              <p className="not-found-stamp">
                {arabic ? "اللوحة غير موجودة" : "Sheet not found"}
              </p>
              <p className="not-found-links-title" id="nf-links">
                {arabic ? "جرب إحدى هذه الصفحات" : "Try one of these"}
              </p>
              <ul className="not-found-links">
                {[
                  ["/services", t("Engineering & CAD drafting")],
                  ["/visualisation", t("3D visualisation")],
                  ["/services/shop-drawings", t("Shop drawings")],
                  [
                    "/services/authority-approval-drawings",
                    t("Authority submission drawings"),
                  ],
                  ["/process", t("Process")],
                ].map(([url, label]) => (
                  <li key={url}>
                    <a href={url}>
                      {label}
                      <ArrowUpRight size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </main>
      ) : servicePage ? (
        <React.Suspense fallback={null}>
          <ServiceDetail />
        </React.Suspense>
      ) : page === "process" ? (
        <React.Suspense fallback={null}>
          <ProcessPage />
        </React.Suspense>
      ) : page === "visualisation" ? (
        <React.Suspense fallback={null}>
          <VisualisationPage />
        </React.Suspense>
      ) : page === "about" ? (
        <React.Suspense fallback={null}>
          <AboutPage />
        </React.Suspense>
      ) : (
        <main id="home">
          {page === "home" ? (
            <>
              <ScrollHero arabic={arabic} />
              <section id="who-we-are" className="home-intro">
                <div className="container home-intro-grid">
                  <div className="home-intro-copy">
                    <h2>
                      {arabic ? (
                        <>
                          من <em>نحن.</em>
                        </>
                      ) : (
                        <>
                          Who we <em>are.</em>
                        </>
                      )}
                    </h2>
                    <p>
                      {arabic
                        ? "تدعم إمباير للاستشارات التصميمية الفرق المسؤولة عن تحويل معلومات المشاريع إلى أعمال على أرض الواقع."
                        : "Empire Design Consultancy supports the people responsible for turning project information into built work."}
                    </p>
                    <p>
                      {arabic
                        ? "من مقرنا في دبي، ندعم فرق المشاريع في الإمارات ودول مجلس التعاون الخليجي والهند من خلال حزم عمل محددة ودعم فني إضافي."
                        : "Based in Dubai, we support project teams across the UAE, GCC and India with defined packages of work and additional technical capacity."}
                    </p>
                    <a href="/about">
                      {arabic ? "المزيد عن إمباير" : "More about Empire"}{" "}
                      <ArrowUpRight size={17} />
                    </a>
                  </div>
                  <figure className="home-intro-image">
                    <ResponsiveImage
                      src="/who-we-are.png"
                      alt={t(
                        "Illustration of design professionals reviewing plans and a building model",
                      )}
                      loading="lazy"
                    />
                  </figure>
                </div>
              </section>
            </>
          ) : (
            <PageIntro />
          )}
          {page === "home" && <ProjectGallery arabic={arabic} />}
          <section
            id="design-story"
            className="design-story"
            aria-labelledby="design-story-title"
          >
            <div className="design-story-heading">
              <h2 id="design-story-title">
                {arabic ? (
                  <>
                    رؤية في التصميم. <em>دقة في كل تفصيل.</em>
                  </>
                ) : (
                  <>
                    Vision in design. <em>Precision in every detail.</em>
                  </>
                )}
              </h2>
            </div>
            <KitchenReveal />
          </section>
          {page === "home" && <MotionStory />}
          <section id="about" className="about section-pad">
            <div className="container about-grid">
              <div className="reveal">
                <h2>
                  {t("More clarity")}
                  {" "}
                  <br />
                  <em>{t("in every detail.")}</em>
                </h2>
                <div className="about-copy">
                  <p>
                    {t(
                      "A technical partner for the teams behind the built environment.",
                    )}
                  </p>
                  <p>
                    {t(
                      "From our Dubai base, we work with contractors, consultants, architects and engineers across the UAE, GCC and India, across different disciplines and project stages. Our role is to add practical production support where a project team needs it.",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section id="services" className="services section-pad">
            <div className="container">
              <div className="section-heading reveal">
                <div>
                  <h2>
                    {page === "services" ? (
                      <>
                        {t("Our services")}
                        <span>.</span>
                      </>
                    ) : (
                      <>
                        {t("Technical expertise")}
                        {" "}
                        <br />
                        <em>{t("for every stage.")}</em>
                      </>
                    )}
                  </h2>
                </div>
                <p>
                  {arabic
                    ? "اعثر على الدعم الذي يحتاجه مشروعك."
                    : "Find the support your project needs."}
                </p>
              </div>
              {page === "services" && (
                <div className="service-slider-controls">
                  <span>
                    {arabic
                      ? "استكشف الخدمات الخمس"
                      : "Explore all five services"}
                  </span>
                  <div>
                    <button
                      type="button"
                      aria-label={t("Previous services")}
                      onClick={(e) =>
                        e.currentTarget
                          .closest(".container")
                          .querySelector(".service-list")
                          .scrollBy({ left: -e.currentTarget.closest(".container").querySelector(".service-list").clientWidth * 0.85, behavior: "smooth" })
                      }
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      aria-label={t("Next services")}
                      onClick={(e) =>
                        e.currentTarget
                          .closest(".container")
                          .querySelector(".service-list")
                          .scrollBy({ left: e.currentTarget.closest(".container").querySelector(".service-list").clientWidth * 0.85, behavior: "smooth" })
                      }
                    >
                      →
                    </button>
                  </div>
                </div>
              )}
              <div
                ref={page === "services" ? serviceListRef : undefined}
                className="service-list"
                tabIndex={page === "services" ? 0 : undefined}
                aria-label={
                  page === "services" ? t("Services carousel") : undefined
                }
              >
                {services.map(([n, title, desc, Icon], i) => (
                  <article className="service-row reveal" key={n}>
                    {(page === "home" || page === "services") && (
                      <ResponsiveImage
                        className="service-card-image"
                        src={slugs[i] === "authority-approval-drawings"
                          ? "/services/authority-approval-drawings.png"
                          : "/services/" + slugs[i] + ".png"}
                        alt=""
                        loading="lazy"
                      />
                    )}
                    <Icon
                      className="service-icon"
                      size={25}
                      strokeWidth={1.25}
                    />
                    <h3>
                      <a href={"/services/" + slugs[i]}>{t(title)}</a>
                    </h3>
                    <p>{t(desc)}</p>
                    <a
                      href={"/services/" + slugs[i]}
                      aria-label={(arabic ? "استكشف " : "Explore ") + t(title)}
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  </article>
                ))}
              </div>
              {page === "services" && serviceSlides.length > 1 && (
                <div className="service-pagination" role="group" aria-label={t("Services pages")}>
                  {serviceSlides.map((offset, index) => (
                    <button
                      key={offset}
                      type="button"
                      className={index === activeServiceSlide ? "is-active" : ""}
                      aria-label={`${t("Go to service page")} ${index + 1}`}
                      aria-current={index === activeServiceSlide ? "true" : undefined}
                      onClick={() => serviceListRef.current?.scrollTo({ left: offset, behavior: "smooth" })}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
          <section id="visualisation" className="visualisation">
            <div className="container visual-content">
              <div className="visual-top reveal">
                <h2>
                  {t("See the design.")}
                  {" "}
                  <br />
                  <em>{t("Understand the detail.")}</em>
                </h2>
              </div>
              <div className="visual-bottom">
                <p className="reveal">
                  {t(
                    "Explore proposed spaces, review building systems and identify coordination issues with 3D and BIM support.",
                  )}
                </p>
                <div className="visual-features reveal">
                  <div>
                    <strong>{t("Visualisation")}</strong>
                    <small>
                      {t("Exterior, interior and walkthrough renders")}
                    </small>
                  </div>
                  <div>
                    <strong>{t("Coordination")}</strong>
                    <small>{t("Model reviews and clash detection")}</small>
                  </div>
                  <div>
                    <strong>{t("Documentation")}</strong>
                    <small>{t("Drawing and model outputs for the team")}</small>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="deliverables section-pad">
            <div className="container deliverables-grid">
              <div className="reveal">
                <h2>
                  {t("Made for the")}
                  {" "}
                  <br />
                  <em>{t("next step.")}</em>
                </h2>
                <p className="section-description">
                  {t(
                    "Choose the drawings, models or schedules your team needs for its next milestone.",
                  )}
                </p>
                <a
                  href="/contact"
                  className="underline-link"
                  onClick={openContactDialog}
                >
                  {arabic ? "ناقش متطلباتك" : "Discuss your requirements"}{" "}
                  <ArrowUpRight size={17} />
                </a>
              </div>
              <div className="deliverables-list reveal">
                {[
                  "Architectural plans, elevations & sections",
                  "Shop and fabrication drawings",
                  "BIM models & coordination support",
                  "As-built drawings & redline updates",
                  "PDF / image to CAD conversion",
                  "Quantity takeoffs & BOQ documentation",
                ].map((x) => (
                  <div key={t(x)}>
                    <Check size={18} />
                    {t(x)}
                  </div>
                ))}
              </div>
            </div>
          </section>
          {page === "home" && <HomeDetails />}
          <section id="process" className="process section-pad">
            <div className="container process-layout">
              <div className="process-intro">
                <h2>
                  {arabic ? "مسار واضح" : "A clear path"}
                  {" "}
                  <br />
                  <em>
                    {arabic
                      ? "من الفكرة إلى التسليم."
                      : "from brief to delivery."}
                  </em>
                </h2>
                <p>
                  {arabic
                    ? "اكتشف كيف تتحول معلوماتك إلى حزمة عمل متفق عليها."
                    : "See how your information becomes an agreed package of work."}
                </p>
              </div>
              <div className="process-timeline-wrap">
                <span className="process-line-fill" aria-hidden="true" />
                <ol className="process-timeline">
                  {[
                    [
                      "01",
                      "Share your brief",
                      "Send your sketches, PDFs, mark-ups, existing drawings or reference files.",
                    ],
                    [
                      "02",
                      "Define the scope",
                      "Agree drawing types, standards, level of detail and deliverables.",
                    ],
                    [
                      "03",
                      "Develop & review",
                      "Prepare the package and check it against the available information and scope.",
                    ],
                    [
                      "04",
                      "Issue & hand over",
                      "Receive the agreed files, ready for the next stage of your workflow.",
                    ],
                  ].map(([n, stepTitle, d]) => (
                    <li className="reveal" key={n}>
                      <span className="process-number">{numberText(n)}</span>
                      <div>
                        <h3>{t(stepTitle)}</h3>
                        <p>{t(d)}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
          <section className="engagement section-pad">
            <div className="container">
              <h2 className="reveal">
                {t("The right expertise,")}
                {" "}
                <br />
                <em>{t("when you need it.")}</em>
              </h2>
              <div className="engagement-grid">
                <article className="reveal">
                  <h3>{t("A defined scope.")}</h3>
                  <p>
                    {t(
                      "Engage Empire for a specific drawing, modelling or estimating package with deliverables suited to your project.",
                    )}
                  </p>
                  <a href="/contact" onClick={openContactDialog}>
                    {t("Discuss a project")}
                    <ArrowUpRight size={16} />
                  </a>
                </article>
                <article className="reveal">
                  <h3>{t("Extend your team.")}</h3>
                  <p>
                    {t(
                      "Build additional capacity with dedicated CAD drafters, BIM modellers or construction estimators.",
                    )}
                  </p>
                  <a href="/contact" onClick={openContactDialog}>
                    {t("Explore dedicated support")}
                    <ArrowUpRight size={16} />
                  </a>
                </article>
              </div>
            </div>
          </section>
          <section className="sectors section-pad">
            <div className="container sectors-grid">
              <div className="reveal">
                <h2>
                  {t("Built for")}
                  {" "}
                  <br />
                  <em>{t("different ambitions.")}</em>
                </h2>
              </div>
              <div className="reveal">
                <p className="section-description">
                  {t(
                    "Our multidisciplinary offering supports a broad range of project environments.",
                  )}
                </p>
                <div className="sector-tags">
                  {[
                    "Residential",
                    "Commercial",
                    "Hospitality",
                    "Healthcare",
                    "Industrial",
                    "Retail",
                    "Education",
                    "Airports",
                    "Infrastructure",
                    "Rail",
                  ].map((x) => (
                    <span key={t(x)}>{t(x)}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {page === "services" && (
            <section className="discipline-overview">
              <div className="container discipline-overview-grid">
                <div className="discipline-overview-copy">
                  <p className="discipline-kicker">
                    {t("MULTIDISCIPLINARY SUPPORT")}
                  </p>
                  <h2>
                    {t("One team.")}
                    {" "}
                    <br />
                    <em>{t("Many disciplines.")}</em>
                  </h2>
                  <p>
                    {t(
                      "From early design information to coordinated drawings and models, we support architects, consultants, contractors and developers across residential, commercial, retail, hospitality and industrial projects.",
                    )}
                  </p>
                  <ul>
                    <li>{t("Architectural and structural documentation")}</li>
                    <li>{t("MEP, civil and infrastructure drawings")}</li>
                    <li>{t("Interior fit-out and joinery details")}</li>
                    <li>{t("BIM coordination and 3D visualisation")}</li>
                  </ul>
                  <a href="/contact" onClick={openContactDialog}>
                    {t("Discuss your scope")}
                    <ArrowUpRight size={18} />
                  </a>
                </div>
                <figure className="discipline-overview-image">
                  <ResponsiveImage
                    src="/engineering-disciplines.png"
                    alt={t(
                      "Illustration of architectural, structural and MEP drawings with a building model",
                    )}
                    loading="lazy"
                  />
                  <figcaption>
                    {t("Illustrative design and coordination workspace")}
                  </figcaption>
                </figure>
              </div>
            </section>
          )}
          <PageExtras />
          <section className="clients">
            <div className="container">
              <div className="clients-heading">
                <h2>{arabic ? "عملاؤنا" : "Our Clients"}</h2>
              </div>
            </div>
            <div
              className="marquee"
              aria-label={t(
                "Client names listed on Empire\u2019s current website",
              )}
            >
              <div className="marquee-track">
                {[0, 1].map((copy) => (
                  <div
                    className="marquee-group"
                    key={t(copy)}
                    aria-hidden={copy === 1}
                  >
                    {clients.map(([name, file, ext]) => (
                      <span className="client-logo" key={file}>
                        <ResponsiveImage
                          src={"/clients/logo_" + file + "." + (ext || "png")}
                          alt={name}
                          loading="lazy"
                        />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
          {page === "contact" && (
            <section id="enquiry" className="enquiry-section">
              <div className="container enquiry-layout">
                <div className="contact-intro">
                  <p className="about-label">{t("LET’S WORK TOGETHER")}</p>
                  <h2>
                    {t("Tell us what")}
                    {" "}
                    <br />
                    <em>{t("you have in mind.")}</em>
                  </h2>
                  <p>
                    {t(
                      "From an early sketch to a detailed package, share what you have and we’ll discuss the next step.",
                    )}
                  </p>
                  <div className="contact-steps">
                    <div>
                      <span>{numberText("01")}</span>
                      <p>
                        <strong>
                          {arabic ? "شارك تفاصيل مشروعك" : "Share your brief"}
                        </strong>
                        {t("Tell us what you need and how to contact you.")}
                      </p>
                    </div>
                    <div>
                      <span>{numberText("02")}</span>
                      <p>
                        <strong>{t("Discuss the scope")}</strong>
                        {t("We’ll review the work and agree the next steps.")}
                      </p>
                    </div>
                    <div>
                      <span>{numberText("03")}</span>
                      <p>
                        <strong>{t("Move forward")}</strong>
                        {t(
                          "Confirm the deliverables and project timeline together.",
                        )}
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/971544348797"
                    className="contact-whatsapp"
                  >
                    {t("Prefer WhatsApp?")}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                {!contactOpen && (
                  <React.Suspense
                    fallback={<p>{t("Loading enquiry form…")}</p>}
                  >
                    <ContactForm arabic={arabic} />
                  </React.Suspense>
                )}
              </div>
            </section>
          )}
          {page === "contact" && (
            <section className="location-section location-full">
              <div className="location-stage">
                <iframe
                  className="location-map"
                  title={t("Map of Burjuman Business Tower, Dubai")}
                  src={`https://maps.google.com/maps?q=Burjuman%20Business%20Tower%20Mankhool%20Dubai&z=16&hl=${arabic ? "ar" : "en"}&output=embed`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="location-card location-overlay">
                  <p className="about-label">{t("VISIT OUR STUDIO")}</p>
                  <h2>
                    {t("Find us")} <em>{t("in Dubai.")}</em>
                  </h2>
                  <p>
                    {t("Burjuman Business Tower")}
                    <br />
                    {t("Mankhool, Dubai, UAE")}
                  </p>
                  <div className="location-actions">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Burjuman+Business+Tower+Mankhool+Dubai"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("Get directions")}
                      <ArrowUpRight size={17} />
                    </a>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Burjuman+Business+Tower+Mankhool+Dubai"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("Open in Google Maps")}
                      <ArrowUpRight size={17} />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}
          <section id="contact" className="contact section-pad">
            <div className="container contact-grid">
              <div className="reveal">
                <h2>
                  {t("Have a project")}
                  {" "}
                  <br />
                  <em>{t("in mind?")}</em>
                </h2>
                <p>
                  {t(
                    "Have drawings to update, a model to coordinate or a package to prepare? Tell us your priorities and project stage.",
                  )}
                </p>
                <a
                  className="button-orange"
                  href="mailto:support@empiredesignae.com?subject=Project%20drawing%20brief"
                >
                  {t("Send a drawing brief")}
                  <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="contact-details reveal">
                <div>
                  <span>{arabic ? "البريد الإلكتروني" : "EMAIL"}</span>
                  <a href="mailto:support@empiredesignae.com">
                    <Mail size={18} /> support@<wbr />empiredesignae.com
                  </a>
                </div>
                <div>
                  <span>{arabic ? "الهاتف وواتساب" : "PHONE & WHATSAPP"}</span>
                  <a href="https://wa.me/971544348797">
                    <Phone size={18} /> <bdi dir="ltr">+971 54 434 8797</bdi>
                  </a>
                </div>
                <div>
                  <span>{arabic ? "المكتب" : "STUDIO"}</span>
                  <p>
                    {t("Burjuman Business Tower")}
                    <br />
                    {t("Mankhool, Dubai, UAE")}
                  </p>
                </div>
                <div>
                  <span>{arabic ? "ساعات العمل" : "WORKING HOURS"}</span>
                  <p>
                    {arabic ? "الاثنين – السبت" : "Monday – Saturday"}
                    <br />
                    {arabic
                      ? "من ٨:٠٠ صباحاً إلى ٦:٠٠ مساءً بتوقيت الخليج"
                      : "8:00 AM – 6:00 PM GST"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
      <dialog
        ref={contactDialog}
        className="contact-dialog"
        aria-labelledby="contact-dialog-title"
        onClose={() => setContactOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        data-lenis-prevent
      >
        {contactOpen && (
          <div className="contact-dialog-inner">
            <button
              type="button"
              className="contact-dialog-close"
              aria-label={t("Close contact form")}
              onClick={() => contactDialog.current?.close()}
            >
              <X size={22} />
            </button>
            <h2 id="contact-dialog-title">
              {arabic ? "تواصل معنا" : "Get in touch"}
              <span>.</span>
            </h2>
            <p>{t("Tell us how to reach you and share your project.")}</p>
            <React.Suspense fallback={<p>{t("Loading enquiry form…")}</p>}>
              <ContactForm arabic={arabic} />
            </React.Suspense>
          </div>
        )}
      </dialog>
      <aside className="quick-contact" aria-label={t("Quick contact")}>
        <a
          href="tel:+971544348797"
          aria-label={t("Call Empire Design Consultancy")}
        >
          <Phone size={22} />
          <span>{t("Call us")}</span>
        </a>
        <a
          href="https://wa.me/971544348797"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("Chat with Empire on WhatsApp")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M12.04 2a9.91 9.91 0 0 0-8.55 14.92L2 22l5.22-1.37A9.96 9.96 0 1 0 12.04 2Zm0 18.14a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.82.83-3.02-.2-.31a8.22 8.22 0 1 1 6.95 3.84Zm4.51-6.17c-.25-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.16.25-.64.8-.78.96-.14.17-.29.19-.54.07-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.44.13-.14.17-.24.25-.41.09-.16.05-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.08s.9 2.4 1.02 2.56c.12.17 1.76 2.69 4.27 3.77.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.17.2-.57.2-1.06.14-1.17-.06-.1-.23-.17-.48-.3Z" />
          </svg>
          <span>{t("WhatsApp")}</span>
        </a>
      </aside>
        <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
// Reveal the site only once fonts, hero artwork and the page itself are loaded.
requestAnimationFrame(() => {
  const heroImages = [
    ...document.querySelectorAll(".hero-finished, .hero-technical"),
  ];
  const pageLoaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) =>
          window.addEventListener("load", resolve, { once: true }),
        );
  Promise.race([
    Promise.all([
      document.fonts?.ready,
      pageLoaded,
      ...heroImages.map(waitForImage),
    ]),
    new Promise((resolve) => setTimeout(resolve, 5000)),
  ]).then(() => {
    ScrollTrigger.refresh();
    window.empireSiteReady?.();
  });
});
