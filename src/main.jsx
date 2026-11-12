import { arabicTranslations } from "./translations";
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
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
  Check,
  Mail,
  Phone,
} from "lucide-react";
import "./index.css";
import ResponsiveImage from "./ResponsiveImage";
import ScrollHero from "./ScrollHero";
import ProjectGallery from "./ProjectGallery";
const ContactForm = React.lazy(() => import("./ContactForm"));
import { serviceProjects, arabicProjectDescriptions } from "./serviceProjects";
import { metadata } from "../seo.mjs";
gsap.registerPlugin(ScrollTrigger);
// Reloads begin at the top; direct links to page sections continue to work.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const navigationEntry = performance.getEntriesByType("navigation")[0];
if (navigationEntry?.type === "reload" && !location.hash) {
  const resetScroll = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  };
  resetScroll();
  window.addEventListener(
    "load",
    () => {
      resetScroll();
      requestAnimationFrame(() => {
        resetScroll();
        requestAnimationFrame(resetScroll);
      });
    },
    { once: true },
  );
}

const services = [
  [
    "01",
    "Engineer design and CAD Draft",
    "Architectural, structural, interior, MEP and civil drawings, including redlines, as-builts and CAD conversion.",
    PenTool,
  ],
  [
    "02",
    "BIM & coordination",
    "Discipline models and coordination support for architectural, structural and MEP teams.",
    Layers3,
  ],
  [
    "03",
    "Shop drawings",
    "Detailed packages for fabrication and installation, from structural steel and glazing to millwork and HVAC.",
    Ruler,
  ],
  [
    "04",
    "3D visualisation",
    "Exterior and interior renders, floor plans and walkthroughs that help teams communicate design intent.",
    Box,
  ],
  [
    "05",
    "Estimating & takeoff",
    "Quantity takeoffs, material estimates, BOQs and cost analysis for planning and tender preparation.",
    Calculator,
  ],
];
const clients = [
  ["DAMAC", "damac"],
  ["ALEC Building Excellence", "alec"],
  ["EMAAR", "emaar"],
  ["CONMIX", "conmix"],
  ["Emirates", "emirates"],
  ["Dutco Construction", "dutco"],
  ["GULFDRUG", "gulfdrug"],
  ["RTA Roads & Transport Authority", "rta"],
];
const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["3D & BIM", "/visualisation"],
  ["Process", "/process"],
  ["About", "/about"],
];
const serviceDetails = {
  "cad-drafting": {
    title: "Engineer design and CAD Draft",
    tag: "01 / TECHNICAL DRAWINGS",
    intro:
      "Architectural, structural, MEP, interior and civil drawings developed from your project information for review, coordination and construction.",
    scope: [
      "Architectural, structural and interior drawings",
      "Mechanical, electrical and plumbing layouts",
      "Civil and infrastructure drawings",
      "PDF, image and paper to CAD conversion",
      "As-built records and redline updates",
    ],
    outputs:
      "Plans, elevations, sections, details and drawing updates in agreed formats.",
  },
  "bim-coordination": {
    title: "BIM & coordination",
    tag: "02 / BUILDING INFORMATION MODELLING",
    intro:
      "Architectural, structural and MEP models brought together to support coordination, clash review and project documentation.",
    scope: [
      "Architectural, structural and MEP modelling",
      "Model coordination and clash review",
      "CAD-to-BIM conversion",
      "As-built BIM information",
      "4D and 5D BIM support",
    ],
    outputs:
      "Coordinated models and documentation tailored to the agreed project requirements.",
  },
  "shop-drawings": {
    title: "Shop drawings",
    tag: "03 / FABRICATION & INSTALLATION",
    intro:
      "Detailed construction, fabrication and installation drawings developed from available design information and project specifications.",
    scope: [
      "Structural steel and steel fabrication",
      "Millwork and interior fit-out",
      "Glazing and façade details",
      "Rebar details",
      "HVAC and other building services",
    ],
    outputs:
      "Detailed shop and fabrication drawings for review and the next stage of delivery.",
  },
  "3d-visualisation": {
    title: "3D visualisation",
    tag: "04 / DESIGN COMMUNICATION",
    intro:
      "Architectural models and visualisations that help stakeholders understand a proposal before construction.",
    scope: [
      "Exterior and interior rendering",
      "3D floor plans and layouts",
      "Landscape visualisation",
      "Architectural walkthroughs",
      "3D CAD and modelling support",
    ],
    outputs:
      "Still renders, models or walkthroughs, according to the project brief.",
  },
  "estimating-takeoff": {
    title: "Estimating & takeoff",
    tag: "05 / QUANTITY & COST",
    intro: "Quantity and material takeoffs to support budgets and tenders.",
    scope: [
      "Quantity takeoffs",
      "Material takeoffs",
      "Bills of quantities",
      "Construction estimates",
      "Cost analysis and bid documentation",
    ],
    outputs: "Agreed quantity schedules, BOQs and supporting cost information.",
  },
};
const arabicServices = [
  [
    "التصميم الهندسي والرسم باستخدام CAD",
    "رسومات معمارية وإنشائية وداخلية وميكانيكية وكهربائية وصحية ومدنية، بما في ذلك التعديلات ورسومات التنفيذ الفعلي والتحويل إلى CAD.",
  ],
  [
    "نمذجة معلومات المباني والتنسيق",
    "نماذج تخصصية ودعم التنسيق للفرق المعمارية والإنشائية والميكانيكية والكهربائية والصحية.",
  ],
  [
    "الرسومات التنفيذية",
    "حزم تفصيلية للتصنيع والتركيب، من المنشآت الفولاذية والواجهات الزجاجية إلى أعمال النجارة والتكييف.",
  ],
  [
    "التصور ثلاثي الأبعاد",
    "صور خارجية وداخلية ومخططات وجولات تساعد الفرق على توضيح فكرة التصميم.",
  ],
  [
    "تقدير التكاليف وحصر الكميات",
    "حصر الكميات وتقدير المواد وجداول الكميات وتحليل التكاليف للتخطيط وإعداد المناقصات.",
  ],
];
const arabicDetails = {
  "cad-drafting": {
    title: arabicServices[0][0],
    tag: "01 / الرسومات الفنية",
    intro:
      "رسومات معمارية وإنشائية وميكانيكية وكهربائية وصحية وداخلية ومدنية تُعد من معلومات مشروعك للمراجعة والتنسيق والتنفيذ.",
    scope: [
      "الرسومات المعمارية والإنشائية والداخلية",
      "مخططات الميكانيكا والكهرباء والسباكة",
      "الرسومات المدنية والبنية التحتية",
      "تحويل ملفات PDF والصور والورق إلى CAD",
      "سجلات التنفيذ الفعلي وتحديثات الملاحظات",
    ],
    outputs:
      "مخططات وواجهات ومقاطع وتفاصيل وتحديثات للرسومات بالصيغ المتفق عليها.",
  },
  "bim-coordination": {
    title: arabicServices[1][0],
    tag: "02 / نمذجة معلومات المباني",
    intro:
      "نماذج معمارية وإنشائية وميكانيكية وكهربائية وصحية متكاملة لدعم التنسيق ومراجعة التعارضات وتوثيق المشروع.",
    scope: [
      "النمذجة المعمارية والإنشائية والميكانيكية والكهربائية والصحية",
      "تنسيق النماذج ومراجعة التعارضات",
      "التحويل من CAD إلى BIM",
      "معلومات نماذج التنفيذ الفعلي",
      "دعم نمذجة معلومات المباني رباعية وخماسية الأبعاد",
    ],
    outputs: "نماذج ووثائق منسقة وفق متطلبات المشروع المتفق عليها.",
  },
  "shop-drawings": {
    title: arabicServices[2][0],
    tag: "03 / التصنيع والتركيب",
    intro:
      "رسومات تفصيلية للبناء والتصنيع والتركيب تُعد استناداً إلى معلومات التصميم ومواصفات المشروع المتاحة.",
    scope: [
      "المنشآت الفولاذية وتصنيع الصلب",
      "أعمال النجارة والتجهيزات الداخلية",
      "تفاصيل الزجاج والواجهات",
      "تفاصيل حديد التسليح",
      "التكييف وخدمات المباني الأخرى",
    ],
    outputs:
      "رسومات تنفيذية وتصنيعية تفصيلية للمراجعة والمرحلة التالية من التنفيذ.",
  },
  "3d-visualisation": {
    title: arabicServices[3][0],
    tag: "04 / عرض التصميم",
    intro: "نماذج وتصورات معمارية تساعد المعنيين على فهم المقترح قبل البناء.",
    scope: [
      "التصورات الخارجية والداخلية",
      "المخططات والتوزيعات ثلاثية الأبعاد",
      "تصور تنسيق الحدائق",
      "الجولات المعمارية الافتراضية",
      "دعم الرسم والنمذجة ثلاثية الأبعاد",
    ],
    outputs: "صور أو نماذج أو جولات افتراضية وفق متطلبات المشروع.",
  },
  "estimating-takeoff": {
    title: arabicServices[4][0],
    tag: "05 / الكميات والتكاليف",
    intro: "حصر كميات الأعمال والمواد لدعم الميزانيات والمناقصات.",
    scope: [
      "حصر كميات الأعمال",
      "حصر كميات المواد",
      "جداول الكميات",
      "تقديرات تكاليف البناء",
      "تحليل التكاليف ووثائق العطاءات",
    ],
    outputs: "جداول الكميات ومعلومات التكاليف المساندة المتفق عليها.",
  },
};
const slugs = [
  "cad-drafting",
  "bim-coordination",
  "shop-drawings",
  "3d-visualisation",
  "estimating-takeoff",
];
const arabic = /^\/ar(?:\/|$)/.test(location.pathname);
document.documentElement.lang = arabic ? "ar" : "en";
document.documentElement.dir = arabic ? "rtl" : "ltr";
const t = (value) => (arabic ? arabicTranslations[value] || value : value);
const arLabels = {
  Home: "الرئيسية",
  Services: "الخدمات",
  "3D & BIM": "التصميم ثلاثي الأبعاد ونمذجة معلومات المباني",
  Process: "آلية العمل",
  About: "من نحن",
  Contact: "اتصل بنا",
};
const navLabel = (value) => (arabic ? arLabels[value] || value : value);
const numberText = (value) =>
  arabic
    ? String(value).replace(/[0-9]/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)])
    : value;
const originalPath = window.location.pathname;
const path =
  (arabic ? originalPath.replace(/^\/ar(?=\/|$)/, "") : originalPath).replace(
    /\/$/,
    "",
  ) || "/";
// Keep internal navigation in the selected language.
if (arabic)
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target ||
      link.hasAttribute("download")
    )
      return;
    const raw = link.getAttribute("href");
    if (
      !raw?.startsWith("/") ||
      raw.startsWith("//") ||
      /^\/ar(?:\/|$)/.test(raw)
    )
      return;
    event.preventDefault();
    location.href = "/ar" + raw;
  });
const serviceSlug = path.startsWith("/services/") ? path.split("/")[2] : null;
const servicePage = arabic
  ? arabicDetails[serviceSlug]
  : serviceDetails[serviceSlug];
const knownPath =
  path === "/" ||
  ["/services", "/visualisation", "/process", "/about", "/contact"].includes(
    path,
  ) ||
  (serviceSlug &&
    Object.hasOwn(serviceDetails, serviceSlug) &&
    path === "/services/" + serviceSlug);
const page =
  path === "/services"
    ? "services"
    : path === "/visualisation"
      ? "visualisation"
      : path === "/process"
        ? "process"
        : path === "/about"
          ? "about"
          : path === "/contact"
            ? "contact"
            : "home";
document.body.dataset.page = page;
const pageMetadata = metadata(path);
const arabicTitle =
  servicePage?.title ||
  {
    home: "الرئيسية",
    services: "الخدمات",
    visualisation: "التصور ثلاثي الأبعاد ونمذجة معلومات المباني",
    process: "آلية العمل",
    about: "من نحن",
    contact: "اتصل بنا",
  }[page];
document.title = !knownPath
  ? arabic
    ? "الصفحة غير موجودة | إمباير للاستشارات التصميمية"
    : "Page not found | Empire Design Consultancy"
  : arabic
    ? `${arabicTitle} | إمباير للاستشارات التصميمية`
    : pageMetadata.title;
document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    "content",
    arabic
      ? servicePage?.intro ||
          "إمباير للاستشارات التصميمية تقدم خدمات التصميم الهندسي والرسم ونمذجة معلومات المباني في دبي والإمارات ودول الخليج والهند."
      : pageMetadata.description,
  );
if (arabic)
  services.forEach((item, i) => {
    item[1] = arabicServices[i][0];
    item[2] = arabicServices[i][1];
  });
const storyScenes = [
  {
    title: "Engineer design and CAD Draft",
    link: "Explore Engineer design and CAD Draft",
    copy: "Turn project information into drawings teams can review and use.",
    image: "/services/cad-drafting.png",
    href: "/services/cad-drafting",
  },
  {
    title: "BIM & coordination",
    link: "Explore BIM coordination",
    copy: "See how disciplines fit together before the next review.",
    image: "/services/bim-coordination.png",
    href: "/services/bim-coordination",
  },
  {
    title: "Shop drawings",
    link: "Explore shop drawings",
    copy: "Translate design intent into details for the people carrying out the work.",
    image: "/services/shop-drawings.png",
    href: "/services/shop-drawings",
  },
  {
    title: "3D visualisation",
    link: "Explore 3D visualisation",
    copy: "Help stakeholders understand a space before it is built.",
    image: "/services/3d-visualisation.png",
    href: "/services/3d-visualisation",
  },
  {
    title: "Estimating & takeoff",
    link: "Explore estimating and takeoff",
    copy: "Give planning and tender teams a clearer view of quantities.",
    image: "/services/estimating-takeoff.png",
    href: "/services/estimating-takeoff",
  },
];
if (arabic) {
  const copies = [
    "حوّل معلومات المشروع إلى رسومات يمكن للفرق مراجعتها واستخدامها.",
    "راجع تكامل التخصصات قبل المرحلة التالية من المراجعة.",
    "حوّل فكرة التصميم إلى تفاصيل واضحة للفرق المنفذة.",
    "ساعد المعنيين على تصور المساحة قبل بنائها.",
    "امنح فرق التخطيط والمناقصات رؤية أوضح للكميات.",
  ];
  const labels = [
    "استكشف التصميم الهندسي والرسم باستخدام CAD",
    "استكشف نمذجة معلومات المباني والتنسيق",
    "استكشف الرسومات التنفيذية",
    "استكشف التصور ثلاثي الأبعاد",
    "استكشف تقدير التكاليف وحصر الكميات",
  ];
  storyScenes.forEach((scene, i) => {
    scene.title = arabicServices[i][0];
    scene.copy = copies[i];
    scene.link = labels[i];
  });
}
function MotionStory() {
  return (
    <section
      id="motion-story"
      className="motion-story"
      aria-label={t("From design to delivery")}
    >
      <div className="motion-story-heading">
        <div className="container">
          <h2>
            {arabic ? (
              <>
                خدمات<em>نا.</em>
              </>
            ) : (
              <>
                Our <em>{t("services.")}</em>
              </>
            )}
          </h2>
          <p>
            {arabic
              ? "اكتشف كيف ندعم مشروعك."
              : "Explore how we support your project."}
          </p>
        </div>
      </div>
      <div className="motion-story-viewport">
        <div className="motion-story-track">
          {storyScenes.map((scene, i) => (
            <a
              className="motion-scene"
              href={scene.href}
              key={scene.href}
              aria-label={scene.link}
            >
              <ResponsiveImage src={scene.image} alt="" loading="lazy" />
              <div className="motion-scene-shade" />
              <div className="motion-scene-content">
                <h2>
                  {scene.title}
                  <span>.</span>
                </h2>
                <p>{scene.copy}</p>
                <span className="motion-scene-link">
                  {scene.link} <ArrowUpRight size={17} />
                </span>
              </div>
            </a>
          ))}
        </div>
        <p className="motion-swipe-hint" aria-hidden="true">
          {arabic ? "اسحب للاستكشاف" : "Swipe to explore"}
        </p>
      </div>
    </section>
  );
}
function KitchenReveal() {
  const [amount, setAmount] = useState(50);
  return (
    <figure
      className="design-story-visual kitchen-reveal"
      style={{ "--reveal": `${amount}%` }}
    >
      <div className="kitchen-images">
        <ResponsiveImage
          className="kitchen-sketch"
          src="/kitchen-sketch-clean.png"
          alt={t("Architectural sketch of an illustrative kitchen")}
          loading="lazy"
        />
        <ResponsiveImage
          className="kitchen-finished"
          src="/kitchen-finished-clean.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>
      <div className="kitchen-handle" aria-hidden="true">
        <span>
          ‹ <b>›</b>
        </span>
      </div>
      <input
        className="kitchen-slider"
        type="range"
        min="0"
        max="100"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        aria-label={t("Reveal the finished kitchen design")}
        aria-valuetext={`${amount}% of finished design revealed`}
      />
    </figure>
  );
}
const pageIntros = {
  services: [
    "Expertise for",
    "every stage.",
    "CAD, BIM, shop drawings, visualisation and estimating support.",
  ],
  visualisation: [
    "See the design.",
    "Understand the detail.",
    "Explore spaces and bring building disciplines together.",
  ],
  process: [
    "From your brief",
    "to delivery.",
    "A practical workflow shaped around the work your project needs.",
  ],
  about: [
    "Technical expertise.",
    "Built around your team.",
    "A Dubai-based team supporting the people shaping the built environment.",
  ],
  contact: [
    "Let’s start",
    "a conversation.",
    "Share your project and tell us what you need.",
  ],
};
function PageIntro() {
  const content = pageIntros[page];
  if (!content) return null;
  return (
    <section className="page-intro">
      <div className="page-intro-content">
        <h1>
          {t(content[0])}
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
function PageExtras() {
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
function VisualisationPage() {
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
        <div className="container">
          <div className="visual-section-heading">
            <p>{t("DESIGN IN THREE DIMENSIONS")}</p>
            <h2>
              {t("See it clearly.")}
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
        <div className="container">
          <h2>
            {t("Make the next")}
            <br />
            <em>{t("decision clearer.")}</em>
          </h2>
          <p>
            {t(
              "Tell us about your project and the views or models your team needs.",
            )}
          </p>
          <a href="/contact">
            {t("Discuss your project")}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}

function ServiceDetail() {
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
          src={"/services/" + serviceSlug + ".png"}
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
            <a href="/contact" className="service-action">
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
              <em>{t("next step.")}</em>
            </h2>
            <p>{servicePage.outputs}</p>
          </div>
          <div className="service-output-note reveal">
            <strong>{t("Ready to get started?")}</strong>
            <p>
              {t("Share your existing files and tell us what your team needs.")}
            </p>
            <a href="/contact">
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
            {project?.description && (
              <p className="scope-description">
                {arabic
                  ? arabicProjectDescriptions[serviceSlug]?.[activeScope]
                  : project.description}
              </p>
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
            <a className="scope-contact" href="/contact">
              {t("Discuss your project")}
              <ArrowUpRight size={17} />
            </a>
          </div>
        )}
      </dialog>
    </main>
  );
}
const processStages = [
  [
    "01",
    "Share your brief",
    "Tell us what you are working on and send the information you already have.",
    "Sketches, PDFs, existing CAD, redlines, site information and reference drawings",
  ],
  [
    "02",
    "Define the scope",
    "Together we agree the work, project standards, deliverables and review points.",
    "Drawing types, level of detail, CAD standards, references and agreed deliverables",
  ],
  [
    "03",
    "Develop & review",
    "Our team develops the package and shares it for review at the agreed stages.",
    "Organised layers, annotations and dimensions, checked against the agreed scope",
  ],
  [
    "04",
    "Issue & hand over",
    "Once the agreed review is complete, we organise and issue the files for your next step.",
    "Agreed DWG, DXF, PDF and supporting files, as appropriate to the project",
  ],
];
function ProcessPage() {
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
            <a href="/contact">
              {arabic ? "أرسل تفاصيل مشروعك" : "Send your brief"}{" "}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
function Reviews({ arabic }) {
  const ref = useRef(null);
  useEffect(() => {
    if (arabic || !ref.current) return;
    let idle;
    const load = () => {
      if (document.querySelector("script[data-empire-reviews]")) return;
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      script.dataset.empireReviews = "true";
      document.body.appendChild(script);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: "1200px" },
    );
    observer.observe(ref.current);
    if ("requestIdleCallback" in window)
      idle = requestIdleCallback(load, { timeout: 6000 });
    else idle = setTimeout(load, 3000);
    return () => {
      observer.disconnect();
      if ("cancelIdleCallback" in window) cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, [arabic]);
  return (
    <div ref={ref} className="reviews-container">
      {!arabic && (
        <div
          className="elfsight-app-b30ccb4e-5d26-4107-bdbe-ed685b878e8a"
          data-elfsight-app-lazy
        />
      )}
      <a
        className="reviews-fallback"
        href="https://www.google.com/maps/search/?api=1&query=Empire+Design+Consultancy+Dubai"
        target="_blank"
        rel="noopener noreferrer"
      >
        {arabic
          ? "اطلع على تقييمات عملائنا على خرائط جوجل ↗"
          : "View our reviews on Google Maps ↗"}
      </a>
    </div>
  );
}
function HomeDetails() {
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
                <br />
                <em>{arabic ? "عملائنا." : "our clients."}</em>
              </h2>
            </div>
          </div>
          <Reviews arabic={arabic} />
        </div>
      </section>
    </>
  );
}
function AboutPage() {
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
            <br />
            <em>{t("experience.")}</em>
            <br />
            {t("Focused on")}
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
                "Drawing on years of experience, we help project teams develop, coordinate and communicate their work—from early design information through to the documents needed for the next stage.",
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
            <a href="/contact">
              {arabic ? "أرسل تفاصيل مشروعك" : "Send your brief"}{" "}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
function useNavigationContrast() {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const header = document.querySelector(".site-header");
      if (!header) return;
      const y = Math.min(
        window.innerHeight - 1,
        header.getBoundingClientRect().top + 35,
      );
      const element = document
        .elementsFromPoint(window.innerWidth / 2, Math.max(0, y))
        .find(
          (item) =>
            !header.contains(item) && item.closest("main section, footer"),
        );
      const section = element?.closest("main section, footer");
      if (!section) return;
      const photoCover =
        section.matches(
          ".service-cover, .process-cover, .about-cover, .visual-hero, .motion-story",
        ) ||
        (section.matches(".page-intro") &&
          ["services", "contact"].includes(document.body.dataset.page));
      const color = getComputedStyle(section)
        .backgroundColor.match(/[\d.]+/g)
        ?.map(Number);
      const dark =
        photoCover ||
        (color &&
          color.length >= 3 &&
          (color[3] === undefined || color[3] > 0.5) &&
          color[0] * 0.2126 + color[1] * 0.7152 + color[2] * 0.0722 < 140);
      header.classList.toggle("header-on-dark", Boolean(dark));
      // Sample behind each control: a light card may cover only part of a dark section.
      header
        .querySelectorAll(
          ".brand, .nav-links > a, .nav-overview-link, .nav-drop-trigger, .language-switch, .menu-toggle",
        )
        .forEach((control) => {
          const rect = control.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const x = Math.max(
            0,
            Math.min(window.innerWidth - 1, rect.left + rect.width / 2),
          );
          const cy = Math.max(
            0,
            Math.min(window.innerHeight - 1, rect.top + rect.height / 2),
          );
          const stack = document
            .elementsFromPoint(x, cy)
            .filter(
              (item) =>
                !header.contains(item) && item.closest("main section, footer"),
            );
          let tone = null;
          for (const item of stack) {
            const style = getComputedStyle(item);
            const rgba = style.backgroundColor.match(/[\d.]+/g)?.map(Number);
            if (rgba?.length >= 3 && (rgba[3] === undefined || rgba[3] > 0.8)) {
              tone =
                rgba[0] * 0.2126 + rgba[1] * 0.7152 + rgba[2] * 0.0722 < 140;
              break;
            }
            if (
              item.matches(
                ".service-cover, .process-cover, .about-cover, .visual-hero, .motion-story, .services-intro-image",
              )
            ) {
              tone = true;
              break;
            }
          }
          control.classList.toggle("nav-on-dark", tone ?? Boolean(dark));
          control.classList.toggle("nav-on-light", !(tone ?? Boolean(dark)));
        });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
}

function App() {
  useNavigationContrast();
  const [menu, setMenu] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const contactDialog = useRef(null);
  useEffect(() => {
    if (contactOpen && contactDialog.current && !contactDialog.current.open)
      contactDialog.current.showModal();
  }, [contactOpen]);
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
    const lenis = new Lenis({ lerp: 0.085, anchors: true });
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
            { y: 18, opacity: 0.65 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
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
              scrollTrigger: { trigger: el, start: "top 91%", once: true },
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
      if (document.querySelector(".process-line-fill"))
        gsap.fromTo(
          ".process-line-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".process-timeline",
              start: "top 80%",
              end: "bottom 50%",
              scrub: true,
            },
          },
        );
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
      ctx.revert();
      lenis.destroy();
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
      <header className={"site-header" + (menu ? " menu-open" : "")}>
        <nav className="nav-shell" aria-label={t("Main navigation")}>
          <a className="brand" href="/">
            <ResponsiveImage src="/logo.png" alt="" />
            <span>
              <strong>{t("Empire")}</strong>
              <small>{t("Design Consultancy")}</small>
            </span>
          </a>
          <div
            className="nav-links"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setDropdown(null);
                e.currentTarget
                  .querySelector('[aria-expanded="true"]')
                  ?.focus();
              }
            }}
          >
            {links.map(([name, url]) =>
              name === "Services" || name === "3D & BIM" ? (
                <div
                  className="nav-dropdown"
                  key={name}
                  onMouseEnter={() => setDropdown(name)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <a
                    className="nav-overview-link"
                    href={url}
                    aria-current={isCurrentNav(name) ? "page" : undefined}
                  >
                    {navLabel(name)}
                  </a>
                  <button
                    className="nav-drop-trigger"
                    aria-label={
                      arabic
                        ? "عرض قائمة " + navLabel(name)
                        : "Show " + name + " menu"
                    }
                    type="button"
                    aria-expanded={dropdown === name}
                    aria-controls={
                      "nav-panel-" +
                      (name === "Services" ? "services" : "visual")
                    }
                    onClick={() => setDropdown(dropdown === name ? null : name)}
                  >
                    <ChevronDown size={14} />
                  </button>
                  <div
                    id={
                      "nav-panel-" +
                      (name === "Services" ? "services" : "visual")
                    }
                    className="nav-panel"
                    hidden={dropdown !== name}
                  >
                    <div className="nav-panel-links">
                      {(name === "Services"
                        ? services
                            .map(([, title, desc], i) => [
                              title,
                              "/services/" + slugs[i],
                              desc,
                            ])
                            .filter(
                              ([, href]) =>
                                ![
                                  "/services/bim-coordination",
                                  "/services/3d-visualisation",
                                ].includes(href),
                            )
                        : [
                            [
                              "3D visualisation",
                              "/services/3d-visualisation",
                              "Renders and walkthroughs for design reviews.",
                            ],
                            [
                              "BIM & coordination",
                              "/services/bim-coordination",
                              "Models for multidisciplinary coordination.",
                            ],
                          ]
                      ).map(([title, href, desc]) => (
                        <a href={href} key={href}>
                          <strong>{t(title)}</strong>
                          <span>{t(desc)}</span>
                        </a>
                      ))}
                    </div>
                    <div className="nav-panel-image">
                      <ResponsiveImage
                        src={
                          name === "Services"
                            ? "/nav-services.png"
                            : "/nav-bim.png"
                        }
                        alt=""
                        loading="lazy"
                      />
                      <div>
                        <strong>
                          {t(
                            name === "Services"
                              ? "From brief to build"
                              : "See the bigger picture",
                          )}
                        </strong>
                        <span>
                          {t(
                            name === "Services"
                              ? "Drawing and modelling support for your team."
                              : "Explore design and technical detail.",
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={name}
                  href={url}
                  aria-current={isCurrentNav(name) ? "page" : undefined}
                >
                  {navLabel(name)}
                </a>
              ),
            )}
          </div>
          <button
            type="button"
            className="language-switch"
            lang={arabic ? "en" : "ar"}
            onClick={() => {
              location.href =
                (arabic ? path : "/ar" + (path === "/" ? "/" : path)) +
                location.search +
                location.hash;
            }}
          >
            {arabic ? "English" : "العربية"}
          </button>
          <a
            className="nav-cta"
            href="/contact"
            aria-current={isCurrentNav("Contact") ? "page" : undefined}
          >
            {arabic ? "أرسل تفاصيل مشروعك" : "Send your brief"}{" "}
            <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menu}
            aria-label={t(menu ? "Close menu" : "Open menu")}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </nav>
        {menu && (
          <div className="mobile-menu">
            <div className="mobile-menu-links">
              {[...links, ["Contact", "/contact"]].map(([name, url]) => (
                <a
                  key={name}
                  onClick={() => setMenu(false)}
                  href={url}
                  aria-current={isCurrentNav(name) ? "page" : undefined}
                >
                  {navLabel(name)}
                </a>
              ))}
              <a
                className="mobile-menu-cta"
                href="/contact"
                onClick={() => setMenu(false)}
              >
                {arabic ? "أرسل تفاصيل مشروعك" : "Send your brief"}{" "}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        )}
      </header>
      {!knownPath ? (
        <main className="not-found">
          <div className="container">
            <h1>{arabic ? "الصفحة غير موجودة" : "Page not found"}</h1>
            <p>
              {arabic
                ? "تعذر العثور على الصفحة المطلوبة."
                : "We could not find the page you requested."}
            </p>
            <a href="/">{arabic ? "العودة إلى الرئيسية" : "Return home"}</a>
          </div>
        </main>
      ) : servicePage ? (
        <ServiceDetail />
      ) : page === "process" ? (
        <ProcessPage />
      ) : page === "visualisation" ? (
        <VisualisationPage />
      ) : page === "about" ? (
        <AboutPage />
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
                          .scrollBy({ left: -380, behavior: "smooth" })
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
                          .scrollBy({ left: 380, behavior: "smooth" })
                      }
                    >
                      →
                    </button>
                  </div>
                </div>
              )}
              <div
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
                        src={"/services/" + slugs[i] + ".png"}
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
            </div>
          </section>
          <section id="visualisation" className="visualisation">
            <div className="container visual-content">
              <div className="visual-top reveal">
                <h2>
                  {t("See the design.")}
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
                  <br />
                  <em>{t("next step.")}</em>
                </h2>
                <p className="section-description">
                  {t(
                    "Choose the drawings, models or schedules your team needs for its next milestone.",
                  )}
                </p>
                <a href="/contact" className="underline-link">
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
                      <ArrowUpRight
                        className="process-arrow"
                        size={19}
                        aria-hidden="true"
                      />
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
                  <a href="/contact">
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
                  <a href="/contact">
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
                  <a href="/contact">
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
                    {clients.map(([name, file]) => (
                      <span className="client-logo" key={file}>
                        <ResponsiveImage
                          src={"/clients/logo_" + file + ".png"}
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
            <section className="location-section">
              <div className="container location-card">
                <div>
                  <p className="about-label">{t("VISIT OUR STUDIO")}</p>
                  <h2>
                    {t("Find us")}
                    <br />
                    <em>{t("in Dubai.")}</em>
                  </h2>
                  <p>
                    {t("Burjuman Business Tower")}
                    <br />
                    {t("Mankhool, Dubai, UAE")}
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Burjuman+Business+Tower+Mankhool+Dubai"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("Open in Google Maps")}
                    <ArrowUpRight size={17} />
                  </a>
                </div>
                <iframe
                  className="location-map"
                  title={t("Map of Burjuman Business Tower, Dubai")}
                  src="https://maps.google.com/maps?q=Burjuman%20Business%20Tower%20Mankhool%20Dubai&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
          )}
          <section id="contact" className="contact section-pad">
            <div className="container contact-grid">
              <div className="reveal">
                <h2>
                  {t("Have a project")}
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
                    <Mail size={18} /> support@empiredesignae.com
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
      <footer className="site-footer">
        <div className="container">
          <div className="footer-logo">
            <a className="brand footer-brand" href="/">
              <ResponsiveImage src="/logo.png" alt="" />
              <span>
                <strong>{t("Empire")}</strong>
                <small>{t("Design Consultancy")}</small>
              </span>
            </a>
          </div>
          <div className="footer-lead">
            <div>
              <h2>
                {t("Ideas made")}
                <em>{t("buildable.")}</em>
              </h2>
              <p>
                {t(
                  "Practical design and technical support for projects across the UAE, GCC and India.",
                )}
              </p>
            </div>
            <div className="footer-actions">
              <button
                type="button"
                onClick={() => {
                  if (page === "contact")
                    document
                      .getElementById("enquiry")
                      ?.scrollIntoView({ behavior: "smooth" });
                  else setContactOpen(true);
                }}
              >
                {arabic ? "تواصل معنا" : "Get in touch"}{" "}
                <ArrowUpRight size={17} />
              </button>
              <a
                href="https://wa.me/971544348797"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("WhatsApp")}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="footer-columns">
            <div>
              <h3>{arabic ? "استكشف" : "Explore"}</h3>
              <a href="/">{navLabel("Home")}</a>
              <a href="/services">{navLabel("Services")}</a>
              <a href="/visualisation">{navLabel("3D & BIM")}</a>
              <a href="/process">{navLabel("Process")}</a>
              <a href="/about">{navLabel("About")}</a>
            </div>
            <div>
              <h3>{t("Services")}</h3>
              <a href="/services/cad-drafting">
                {t("Engineering & CAD drafting")}
              </a>
              <a href="/services/shop-drawings">{t("Shop drawings")}</a>
              <a href="/services/bim-coordination">{t("BIM & coordination")}</a>
              <a href="/services/3d-visualisation">{t("3D visualisation")}</a>
              <a href="/services/estimating-takeoff">
                {t("Estimating & takeoff")}
              </a>
            </div>
            <div>
              <h3>{navLabel("Contact")}</h3>
              <a href="tel:+971544348797">
                <bdi dir="ltr">+971 54 434 8797</bdi>
              </a>
              <a href="mailto:support@empiredesignae.com">
                support@empiredesignae.com
              </a>
              <p>
                {t("Burjuman Business Tower")}
                <br />
                {t("Mankhool, Dubai, UAE")}
              </p>
              <a href="/contact">{t("Send your brief")}</a>
            </div>
            <div>
              <h3>{arabic ? "تابعنا" : "Follow"}</h3>
              <a
                href="https://www.linkedin.com/company/empire-design-consultancy-llc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("LinkedIn ↗")}
              </a>
              <a
                href="https://www.instagram.com/empire_design_consultancy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("Instagram ↗")}
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <small>
              © {new Date().getFullYear()}{" "}
              {arabic
                ? "إمباير للاستشارات التصميمية ذ.م.م"
                : "Empire Design Consultancy LLC"}
            </small>
            <span>
              {arabic
                ? "دبي، الإمارات العربية المتحدة"
                : "Dubai, United Arab Emirates"}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
requestAnimationFrame(() =>
  requestAnimationFrame(() => {
    const loader = document.getElementById("site-loader");
    if (loader) {
      loader.classList.add("is-ready");
      setTimeout(() => loader.remove(), 300);
    }
  }),
);
