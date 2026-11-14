// The six service cards on the homepage and services page.
// Each entry is [number, title, description, icon].
import { PenTool, Layers3, Ruler, Box, Calculator, FileCheck } from "lucide-react";
import { arabic } from "../lib/i18n.js";

export const services = [
  [
    "01",
    "Engineering & CAD drafting",
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
  [
    "06",
    "Authority submission drawings",
    "Drawing packages prepared in the formats Dubai Municipality, DDA, DMCC and Trakhees submissions call for.",
    FileCheck,
  ],
];

// Arabic title and description for each service, in the same order as above.
export const arabicServices = [
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
  [
    "رسومات تقديم الجهات المختصة",
    "حزم رسومات تُعد بالصيغ التي تتطلبها معاملات بلدية دبي وسلطة دبي للتطوير وDMCC وتراخيص.",
  ],
];
// Each popup heading shows the matching sections of the services copy, word for word.

// On the Arabic site the English strings are swapped in place, so every
// consumer of `services` sees the translated copy without needing to know
// which language it is rendering.
if (arabic)
  services.forEach((item, i) => {
    item[1] = arabicServices[i][0];
    item[2] = arabicServices[i][1];
  });
