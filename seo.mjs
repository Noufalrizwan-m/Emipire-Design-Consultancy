export const siteUrl = "https://empiredesignae.com";
export const pages = {
  "/": [
    "CAD Drafting & BIM Services in Dubai",
    "Empire Design Consultancy provides CAD drafting, BIM coordination, shop drawings, 3D visualisation and estimating for projects across the UAE, GCC and India.",
  ],
  "/services": [
    "CAD & Engineering Design Services | UAE",
    "Explore architectural, structural, MEP and civil CAD drafting, shop drawings and estimating services for project teams across the UAE, GCC and India.",
  ],
  "/visualisation": [
    "3D Visualisation & BIM Services | UAE",
    "Explore architectural rendering, 3D visualisation and BIM coordination services for projects across the UAE, GCC and India.",
  ],
  "/about": [
    "About Our Dubai Design Consultancy",
    "Meet the Dubai-based design consultancy supporting architects, engineers and contractors on projects across the UAE, GCC and India.",
  ],
  "/process": [
    "Our Design & Drafting Process",
    "See how Empire Design Consultancy takes a project brief through scope, technical drawing production, review and handover.",
  ],
  "/contact": [
    "Contact Our Dubai Team",
    "Contact our Dubai team about CAD drafting, BIM coordination, shop drawings, 3D visualisation and estimating projects in the UAE, GCC and India.",
  ],
  "/services/cad-drafting": [
    "CAD Drafting & Engineering Design | UAE",
    "Architectural, structural, civil and MEP CAD drafting, drawing updates and CAD conversion for project teams in the UAE, GCC and India.",
  ],
  "/services/bim-coordination": [
    "BIM Modelling & Coordination | UAE",
    "Architectural, structural and MEP BIM modelling, model coordination and clash review for construction projects in the UAE, GCC and India.",
  ],
  "/services/shop-drawings": [
    "Construction Shop Drawings | Dubai & UAE",
    "Construction and fabrication shop drawings for steel, interiors, façades and building services for projects in the UAE, GCC and India.",
  ],
  "/services/3d-visualisation": [
    "3D Visualisation & Rendering | UAE",
    "Interior and exterior renders, 3D floor plans and architectural walkthroughs for design teams across the UAE, GCC and India.",
  ],
  "/services/estimating-takeoff": [
    "Estimating & Quantity Takeoff | UAE",
    "Quantity takeoffs, material estimates, bills of quantities and tender support for projects in the UAE, GCC and India.",
  ],
};
export function metadata(path) {
  const [heading, description] = pages[path] || pages["/"];
  const title = `Empire Design | ${heading}`;
  const url = `${siteUrl}${path === "/" ? "/" : path}`;
  return { title, description, url };
}

export const arabicPages = {
  "/": [
    "خدمات الرسم الهندسي وBIM في دبي",
    "تقدم إمباير للاستشارات التصميمية خدمات الرسم الهندسي وCAD ونمذجة معلومات المباني والرسومات التنفيذية والتصور ثلاثي الأبعاد وحصر الكميات في دبي والإمارات والخليج.",
  ],
  "/services": [
    "خدمات التصميم الهندسي والرسم في دبي",
    "خدمات الرسم المعماري والإنشائي والمدني والميكانيكي والكهربائي والرسومات التنفيذية في الإمارات ودول الخليج.",
  ],
  "/visualisation": [
    "التصور ثلاثي الأبعاد ونمذجة المباني في الإمارات",
    "تصورات معمارية داخلية وخارجية ونمذجة معلومات المباني وتنسيق التخصصات للمشاريع في الإمارات والخليج.",
  ],
  "/about": [
    "عن إمباير للاستشارات التصميمية في دبي",
    "فريق تصميم في دبي يدعم المهندسين والمقاولين والمعماريين في مشاريع الإمارات والخليج والهند.",
  ],
  "/process": [
    "آلية التصميم والرسم الهندسي",
    "تعرف على مراحل العمل من دراسة متطلبات المشروع إلى إعداد الرسومات والمراجعة والتسليم.",
  ],
  "/contact": [
    "اتصل بإمباير للاستشارات التصميمية في دبي",
    "تواصل مع فريق دبي بشأن الرسم الهندسي ونمذجة المباني والرسومات التنفيذية والتصور ثلاثي الأبعاد وحصر الكميات.",
  ],
  "/services/cad-drafting": [
    "الرسم الهندسي وخدمات CAD في دبي",
    "رسومات معمارية وإنشائية ومدنية وكهربائية وميكانيكية وتحويل الملفات وتحديث الرسومات في دبي والإمارات والخليج.",
  ],
  "/services/bim-coordination": [
    "نمذجة معلومات المباني والتنسيق في دبي",
    "نمذجة معمارية وإنشائية وميكانيكية وكهربائية وتنسيق النماذج ومراجعة التعارضات لمشاريع الإمارات والخليج.",
  ],
  "/services/shop-drawings": [
    "الرسومات التنفيذية والإنشائية في دبي",
    "رسومات تنفيذية وتصنيعية للمنشآت الفولاذية والواجهات والديكورات وخدمات المباني في الإمارات والخليج.",
  ],
  "/services/3d-visualisation": [
    "التصور المعماري ثلاثي الأبعاد في الإمارات",
    "تصورات داخلية وخارجية ومخططات ثلاثية الأبعاد وجولات معمارية افتراضية للمشاريع في الإمارات والخليج.",
  ],
  "/services/estimating-takeoff": [
    "حصر الكميات وتقدير تكاليف البناء في الإمارات",
    "حصر كميات الأعمال والمواد وجداول الكميات ودعم المناقصات لمشاريع الإمارات والخليج.",
  ],
};
