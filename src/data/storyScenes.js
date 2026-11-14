// The pinned horizontal scroll sequence on the homepage. On the Arabic site
// each scene takes its title from the translated service list.
import { arabic } from "../lib/i18n.js";
import { arabicServices } from "./services.js";
export const storyScenes = [
  {
    title: "Engineering & CAD drafting",
    link: "Explore Engineering & CAD drafting",
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
    title: "Authority submission drawings",
    link: "Explore authority submission drawings",
    copy: "Authority submission drawings for permits and regulatory reviews across the UAE.",
    image: "/services/authority-approval-drawings.png",
    href: "/services/authority-approval-drawings",
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
