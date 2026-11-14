// Copy for the six service detail pages, English and Arabic. The Arabic
// titles come straight from the service list so the two never drift apart.
import { arabicServices } from "./services.js";
export const serviceDetails = {
  "cad-drafting": {
    title: "Engineering & CAD drafting",
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
  "authority-approval-drawings": {
    title: "Authority submission drawings",
    tag: "06 / UAE AUTHORITY SUBMISSIONS",
    intro:
      "Architectural, structural, civil and MEP drawings prepared for building permits and authority review across the UAE.",
    scope: [
      "Municipality & Building Permit Drawings",
      "Civil Defence & Utility Authority Drawings",
      "DDA, Trakhees & Developer Approvals",
      "Architectural, Structural, MEP & Fit-Out Submissions",
      "Drawing Revisions After Authority Comments",
    ],
    outputs:
      "Coordinated, editable DWG and PDF sets formatted for the agreed review or submission stage, with revisions prepared from authority comments. Where a registered consultant or contractor must submit, they make the formal submission.",
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

export const scopeSections = {
  "cad-drafting:0": [0, 1, 3],
  "cad-drafting:1": [2],
  "cad-drafting:2": [6],
  "bim-coordination:0": [4],
  "3d-visualisation:0": [5],
};


export const arabicDetails = {
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
  "authority-approval-drawings": {
    title: arabicServices[5][0],
    tag: "06 / اعتمادات الجهات في الإمارات",
    intro:
      "رسومات معمارية وإنشائية ومدنية وMEP تُعد لتصاريح البناء ومراجعة الجهات المختصة في الإمارات.",
    scope: [
      "رسومات البلدية وتصاريح البناء",
      "رسومات الدفاع المدني والجهات المزودة للخدمات",
      "اعتمادات DDA وتراخيص والمطورين",
      "تقديمات معمارية وإنشائية وMEP وتجهيز داخلي",
      "تعديلات الرسومات بعد ملاحظات الجهات المختصة",
    ],
    outputs:
      "حزم رسومات DWG وPDF منسقة وقابلة للتحرير لمرحلة المراجعة أو التقديم المتفق عليها، مع إعداد التعديلات وفق ملاحظات الجهة المختصة وملاحظات المشروع.",
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
