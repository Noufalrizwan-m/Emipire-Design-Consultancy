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
    "Architectural, structural, civil and MEP CAD drafting, plus PDF to DWG, image and paper to CAD conversion in DWG and DXF for project teams in the UAE, GCC and India.",
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
  "/services/authority-approval-drawings": [
    "Authority Submission Drawing Services Across the UAE",
    "Architectural, structural, civil and MEP authority submission drawings for UAE building permits, municipality and Civil Defence approvals, utility authorities, DDA, Trakhees, developers, fit-outs and revisions after authority comments.",
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
    "رسومات معمارية وإنشائية ومدنية وكهربائية وميكانيكية، وتحويل ملفات PDF والصور والورق إلى CAD بصيغتي DWG وDXF في دبي والإمارات والخليج.",
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
  "/services/authority-approval-drawings": [
    "خدمات رسومات التقديم للجهات المختصة في الإمارات",
    "رسومات معمارية وإنشائية ومدنية وMEP لتصاريح البناء واعتمادات البلديات والدفاع المدني والجهات المزودة للخدمات وDDA وتراخيص والمطورين، مع تحديثات بعد ملاحظات الجهات المختصة.",
  ],
};

// Full crawlable page content.
// The build injects this into the #root stub, which React replaces on mount.
// Users with JS never see it; crawlers and no-JS visitors get the whole page
// instead of a 116-word placeholder. Keep it faithful to the visible copy.
export const pageContent = {
  "/": {
    lead: "Empire Design Consultancy is a Dubai-based CAD drafting and BIM consultancy working from Burjuman Business Tower, Mankhool. We support architects, MEP consultants, main contractors and fit-out companies across the UAE, GCC and India with AutoCAD and Revit production work, delivered as defined packages or as additional technical capacity for your own team.",
    sections: [
      ["Engineering & CAD drafting", "Architectural, structural, MEP, interior and civil drawings produced in AutoCAD from your sketches, markups or existing files. Includes PDF to CAD and PDF to DWG conversion, paper and image to CAD conversion, as-built records and redline updates."],
      ["BIM & coordination", "Architectural, structural and MEP modelling in Revit, with model coordination and clash detection in Navisworks. CAD to BIM and Scan to BIM conversion, as-built BIM information, and 4D and 5D BIM support at the LOD your project requires."],
      ["Shop drawings", "Construction, fabrication and installation drawings for structural steel, millwork and interior fit-out, glazing and façade details, rebar, and HVAC, plumbing, fire fighting and other building services — drawn so a contractor can install from them and a consultant can approve them."],
      ["3D visualisation", "Exterior and interior rendering, 3D floor plans and layouts, landscape visualisation and architectural walkthroughs that help stakeholders understand a proposal before construction begins."],
      ["Estimating & takeoff", "Quantity and material takeoffs, bills of quantities, construction estimates and cost analysis to support budgets, tenders and bid documentation."],
    ],
    sectors: "We work across commercial towers and mixed-use developments, residential villas and communities, healthcare, industrial and warehousing, hospitality, education, retail, airports, infrastructure and rail.",
    extra: [
      ["Typical deliverables", "Plans, elevations, sections and details. Coordinated Revit models and clash reports. Fabrication and installation shop drawings. Renders and walkthroughs. Quantity takeoffs and bills of quantities. Files are issued in the formats your team already works in, organised for review and the next project stage."],
      ["Working with a Dubai team", "We are based in Dubai, not offshore. That means working in your time zone, understanding UAE project requirements and authority submissions, and being able to meet your team in person when a drawing package needs talking through. Project teams engage us for a defined package of work, or bring in dedicated drafting, modelling and estimating support as workloads change."],
      ["How to start", "Send us the project stage, the work required and any files you have — sketches, PDFs, existing CAD or Revit models, redlines or site information. We agree the scope, the level of detail and the review points before anything starts."],
    ],
  },
  "/services": {
    lead: "CAD drafting, BIM coordination, shop drawings, 3D visualisation and estimating for project teams in Dubai and across the UAE. Engage us for a defined package of work, or bring in dedicated AutoCAD and Revit capacity as your workload changes.",
    sections: [
      ["A clear scope", "From a drawing update to a coordinated model, we define the work around your project stage and priorities before anything starts."],
      ["Additional capacity", "Drafting, modelling or estimating support when your team needs more hands, without adding headcount."],
      ["Ready for review", "Organised files in the formats agreed with your project team, issued so the next stage can begin."],
    ],
  },
  "/services/cad-drafting": {
    lead: "Architectural, structural, MEP, interior and civil CAD drafting in AutoCAD, developed from your project information for review, coordination and construction in Dubai and across the UAE.",
    sections: [
      ["What we can help with", "Architectural, structural and interior drawings. Mechanical, electrical and plumbing layouts. Civil and infrastructure drawings. PDF to DWG, image, scanned and paper to CAD conversion in DWG and DXF. As-built records and redline updates."],
      ["What you receive", "Plans, elevations, sections, details and drawing updates in the file formats your team works in."],
    ],
  },
  "/services/bim-coordination": {
    lead: "Architectural, structural and MEP BIM modelling in Revit, brought together to support coordination, clash detection and project documentation for construction projects in the UAE.",
    sections: [
      ["What we can help with", "Architectural, structural and MEP modelling. Model coordination and clash review in Navisworks. CAD to BIM and Scan to BIM conversion. As-built BIM information. 4D and 5D BIM support."],
      ["What you receive", "Coordinated Revit models and documentation at the LOD agreed for your project."],
    ],
  },
  "/services/shop-drawings": {
    lead: "Detailed construction, fabrication and installation shop drawings developed from available design information and project specifications, for contractors and fit-out companies in Dubai and the UAE.",
    sections: [
      ["What we can help with", "Structural steel and steel fabrication. Millwork and interior fit-out. Glazing and façade details. Rebar details. HVAC, plumbing, fire fighting and other MEP building services."],
      ["What you receive", "Detailed shop and fabrication drawings prepared for consultant review and approval."],
    ],
  },
  "/services/3d-visualisation": {
    lead: "Architectural models, renders and visualisations that help clients and stakeholders understand a proposal before it is built, for design teams across the UAE.",
    sections: [
      ["What we can help with", "Exterior and interior rendering. 3D floor plans and layouts. Landscape visualisation. Architectural walkthroughs. 3D CAD and modelling support."],
      ["What you receive", "Still renders, models or walkthroughs, according to the project brief."],
    ],
  },
  "/services/estimating-takeoff": {
    lead: "Quantity and material takeoffs to support budgets, tenders and bid documentation for projects in Dubai and across the UAE.",
    sections: [
      ["What we can help with", "Quantity takeoffs. Material takeoffs. Bills of quantities. Construction estimates. Cost analysis and bid documentation."],
      ["What you receive", "Measured quantities and supporting documentation your planning or tender team can work from."],
    ],
  },
  "/services/authority-approval-drawings": {
    lead: "Empire Design Consultancy LLC prepares coordinated architectural, structural, civil and MEP authority submission drawings for building permits and regulatory reviews across the UAE, to project specifications and the relevant authority’s stated requirements.",
    sections: [
      ["Our Authority Submission Drawing Services", "Municipality and building permit drawings; Civil Defence fire and life safety; DEWA, TAQA Distribution (formerly ADDC/AADC), SEWA and EtihadWE (formerly FEWA) utility drawings; DDA, Trakhees, developer and master community approvals; architectural, structural, civil and MEP submissions; HVAC, fire-fighting, electrical, plumbing, interior fit-out, restaurant and commercial shop drawings; and as-built submission drawings."],
      ["Drawing Revisions After Authority Comments in UAE", "We review authority comments and technical observations, then update architectural, structural, civil and MEP AutoCAD drawings with coordinated revisions, redline mark-ups, revision clouds, notes and updated drawing references for the resubmission package."],
      ["Our Revision Services Include", "Dubai Municipality and Civil Defence amendments; utility drawing updates; architectural and structural modifications; MEP, HVAC, electrical, plumbing and fire-fighting revisions; interior fit-out and shop drawing amendments; compliance updates based on comments; PDF and DWG updates; and resubmission package preparation."],
      ["Submission Coordination", "We prepare editable, coordinated drawing packages in the agreed formats. Where an authority requires a registered consultant or contractor to submit, that professional completes the formal filing; we coordinate the drawing set and revisions with their team."],
    ],
  },
  "/visualisation": {
    lead: "From compelling visualisations to coordinated Revit models, we make project information easier to explore — 3D visualisation and BIM coordination for teams in Dubai and the UAE.",
    sections: [
      ["3D visualisation", "Show how a space will look and feel before construction, with visuals that help clients, project teams and stakeholders understand the design."],
      ["BIM & coordination", "Bring architectural, structural and MEP information together in a coordinated model to support review, clash detection and project delivery."],
    ],
  },
  "/process": {
    lead: "A practical route from the information you have today to the files your team needs next. The starting point can be a sketch, an existing Revit model, a DWG or a marked-up PDF.",
    sections: [
      ["01 — Share your brief", "Tell us what you are working on and send what you already have: sketches, PDFs, existing CAD, redlines, site information and reference drawings."],
      ["02 — Define the scope", "Together we agree the work, the level of detail, the review points and the delivery dates for your project stage."],
      ["03 — Develop & review", "Our team develops the package and shares it at the agreed review points so your engineers and consultants can comment."],
      ["04 — Issue & hand over", "Once the agreed review is complete we issue organised files in the formats your team works in, ready for the next stage."],
    ],
  },
  "/about": {
    lead: "Empire Design Consultancy supports the people responsible for turning project information into built work. Based in Dubai at Burjuman Business Tower, Mankhool, we support project teams across the UAE, GCC and India with defined packages of work and additional technical capacity.",
    sections: [
      ["Our approach", "We start with your project stage, the information available and the people who will use the deliverables. Architectural, structural and building-services information needs a coordinated view, and we organise the agreed output so your team can take it forward for review, planning or delivery."],
      ["Vision and mission", "To be recognised for innovative, sustainable and precise engineering and design, guided by quality, integrity and client satisfaction — and to deliver reliable, thoughtful design and engineering support that helps clients move their projects forward."],
      ["Where we work", "From our Dubai base we support project teams across the UAE, the GCC and India, working on commercial, residential, healthcare, industrial, hospitality, education, retail, aviation, infrastructure and rail projects."],
    ],
  },
  "/contact": {
    lead: "Tell us the project stage, the work required and any files available for review. Empire Design Consultancy, Burjuman Business Tower, Mankhool, Dubai, UAE.",
    sections: [
      ["Share your brief", "Send sketches, PDFs, existing CAD or Revit files, redlines or site information and tell us what you need and by when."],
      ["What happens next", "We review the work, agree the scope and review points with you, and confirm the deliverables and timeline before anything starts."],
    ],
  },
};

// Arabic equivalent of pageContent, injected into the /ar route stubs.
// Technical terms kept in Latin script (AutoCAD, Revit, Navisworks, BIM, CAD,
// DWG, LOD, DDA, DMCC) as UAE industry writing does. Terminology follows the
// wording already used in arabicPages and arabicDetails.
export const arabicPageContent = {
  "/": {
    lead: "إمباير للاستشارات التصميمية شركة مقرها دبي في برج برجمان التجاري بمنطقة المنخول، متخصصة في الرسم الهندسي باستخدام CAD ونمذجة معلومات المباني BIM. ندعم المكاتب المعمارية واستشاريي الأعمال الميكانيكية والكهربائية والصحية والمقاولين الرئيسيين وشركات التجهيز الداخلي في الإمارات ودول الخليج والهند، بأعمال إنتاج الرسومات على AutoCAD وRevit، سواء كحزم عمل محددة أو كطاقة فنية إضافية لفريقكم.",
    sections: [
      ["التصميم الهندسي والرسم باستخدام CAD", "رسومات معمارية وإنشائية وميكانيكية وكهربائية وصحية وداخلية ومدنية تُنتج على AutoCAD من مخططاتكم أو ملاحظاتكم أو ملفاتكم الحالية، بما في ذلك تحويل ملفات PDF والصور والورق إلى CAD وDWG، وسجلات التنفيذ الفعلي وتحديثات الملاحظات."],
      ["نمذجة معلومات المباني والتنسيق", "نمذجة معمارية وإنشائية وميكانيكية وكهربائية وصحية على Revit، مع تنسيق النماذج وكشف التعارضات على Navisworks، وتحويل CAD إلى BIM والمسح الليزري إلى BIM، ومعلومات التنفيذ الفعلي، ودعم البعدين الرابع والخامس بمستوى التفصيل LOD الذي يتطلبه المشروع."],
      ["الرسومات التنفيذية", "رسومات التنفيذ والتصنيع والتركيب للمنشآت الفولاذية وأعمال النجارة والتجهيز الداخلي وتفاصيل الواجهات الزجاجية وحديد التسليح وأعمال التكييف والسباكة ومكافحة الحريق وخدمات المباني، مُعدة ليتمكن المقاول من التنفيذ منها والاستشاري من اعتمادها."],
      ["التصور ثلاثي الأبعاد", "تصورات داخلية وخارجية ومخططات أرضية ثلاثية الأبعاد وتصور للمناظر الطبيعية وجولات معمارية افتراضية تساعد أصحاب العلاقة على فهم التصميم قبل بدء التنفيذ."],
      ["حصر الكميات والتقدير", "حصر كميات الأعمال والمواد وجداول الكميات وتقديرات التكلفة وتحليلها لدعم الموازنات والمناقصات ووثائق العطاءات."],
    ],
    sectors: "نعمل في الأبراج التجارية والمشاريع متعددة الاستخدامات، والفلل والمجمعات السكنية، والمنشآت الصحية، والمستودعات والمنشآت الصناعية، والضيافة، والتعليم، والتجزئة، والمطارات، والبنية التحتية، والسكك الحديدية.",
    extra: [
      ["المخرجات المعتادة", "مخططات وواجهات ومقاطع وتفاصيل. نماذج Revit منسقة وتقارير التعارضات. رسومات تنفيذية وتصنيعية. تصورات وجولات افتراضية. حصر كميات وجداول كميات. تُسلَّم الملفات بالصيغ التي يعمل بها فريقكم، منظمة للمراجعة وللمرحلة التالية من المشروع."],
      ["العمل مع فريق في دبي", "نحن في دبي، لا خارجها. هذا يعني العمل ضمن توقيتكم، وفهم متطلبات المشاريع في الإمارات ومعاملات الجهات المختصة، وإمكانية لقاء فريقكم شخصيًا عند الحاجة لمناقشة حزمة رسومات. تتعاقد معنا فرق المشاريع على حزمة عمل محددة، أو تستعين بطاقة إضافية في الرسم والنمذجة وحصر الكميات مع تغير حجم الأعمال."],
      ["كيف تبدأ", "أرسل لنا مرحلة المشروع والأعمال المطلوبة وأي ملفات متوفرة: مخططات أولية أو ملفات PDF أو ملفات CAD أو نماذج Revit قائمة أو ملاحظات أو معلومات الموقع. نتفق على النطاق ومستوى التفصيل ونقاط المراجعة قبل بدء أي عمل."],
    ],
  },
  "/services": {
    lead: "خدمات الرسم الهندسي باستخدام CAD ونمذجة معلومات المباني والرسومات التنفيذية والتصور ثلاثي الأبعاد وحصر الكميات لفرق المشاريع في دبي وعموم الإمارات. تعاقد معنا على حزمة عمل محددة، أو استعن بطاقة مخصصة على AutoCAD وRevit مع تغير حجم أعمالك.",
    sections: [
      ["نطاق واضح", "من تحديث رسمة واحدة إلى نموذج منسق كامل، نحدد العمل حسب مرحلة مشروعكم وأولوياتكم قبل أن يبدأ أي شيء."],
      ["طاقة إضافية", "دعم في الرسم أو النمذجة أو حصر الكميات حين يحتاج فريقكم أيدٍ إضافية، دون زيادة في التوظيف."],
      ["جاهز للمراجعة", "ملفات منظمة بالصيغ المتفق عليها مع فريق مشروعكم، تُصدر بحيث تبدأ المرحلة التالية مباشرة."],
    ],
  },
  "/services/cad-drafting": {
    lead: "رسم هندسي معماري وإنشائي وميكانيكي وكهربائي وصحي وداخلي ومدني على AutoCAD، يُعد من معلومات مشروعكم للمراجعة والتنسيق والتنفيذ في دبي وعموم الإمارات.",
    sections: [
      ["ما يمكننا المساعدة فيه", "الرسومات المعمارية والإنشائية والداخلية. مخططات الميكانيكا والكهرباء والسباكة. الرسومات المدنية والبنية التحتية. تحويل ملفات PDF وDWG والصور والورق إلى CAD. سجلات التنفيذ الفعلي وتحديثات الملاحظات."],
      ["ما تستلمه", "مخططات وواجهات ومقاطع وتفاصيل وتحديثات للرسومات بصيغ الملفات التي يعمل بها فريقكم."],
    ],
  },
  "/services/bim-coordination": {
    lead: "نمذجة معمارية وإنشائية وميكانيكية وكهربائية وصحية على Revit، تُجمع لدعم التنسيق وكشف التعارضات وتوثيق المشروع لمشاريع البناء في الإمارات.",
    sections: [
      ["ما يمكننا المساعدة فيه", "النمذجة المعمارية والإنشائية والميكانيكية والكهربائية والصحية. تنسيق النماذج ومراجعة التعارضات على Navisworks. تحويل CAD إلى BIM والمسح الليزري إلى BIM. معلومات التنفيذ الفعلي. دعم البعدين الرابع والخامس."],
      ["ما تستلمه", "نماذج Revit منسقة وتوثيق بمستوى التفصيل LOD المتفق عليه لمشروعكم."],
    ],
  },
  "/services/shop-drawings": {
    lead: "رسومات تنفيذ وتصنيع وتركيب تفصيلية تُعد من معلومات التصميم المتاحة ومواصفات المشروع، للمقاولين وشركات التجهيز الداخلي في دبي والإمارات.",
    sections: [
      ["ما يمكننا المساعدة فيه", "المنشآت الفولاذية وأعمال التصنيع المعدني. أعمال النجارة والتجهيز الداخلي. تفاصيل الواجهات الزجاجية. تفاصيل حديد التسليح. أعمال التكييف والسباكة ومكافحة الحريق وخدمات المباني الأخرى."],
      ["ما تستلمه", "رسومات تنفيذية وتصنيعية تفصيلية مُعدة لمراجعة الاستشاري واعتماده."],
    ],
  },
  "/services/3d-visualisation": {
    lead: "نماذج وتصورات معمارية تساعد العملاء وأصحاب العلاقة على فهم المقترح قبل تنفيذه، لفرق التصميم في الإمارات.",
    sections: [
      ["ما يمكننا المساعدة فيه", "التصور الداخلي والخارجي. المخططات الأرضية والتوزيعات ثلاثية الأبعاد. تصور المناظر الطبيعية. الجولات المعمارية الافتراضية. دعم النمذجة والرسم ثلاثي الأبعاد."],
      ["ما تستلمه", "صور ثابتة أو نماذج أو جولات افتراضية، بحسب متطلبات المشروع."],
    ],
  },
  "/services/estimating-takeoff": {
    lead: "حصر كميات الأعمال والمواد لدعم الموازنات والمناقصات ووثائق العطاءات للمشاريع في دبي وعموم الإمارات.",
    sections: [
      ["ما يمكننا المساعدة فيه", "حصر كميات الأعمال. حصر كميات المواد. جداول الكميات. تقديرات تكاليف البناء. تحليل التكلفة ووثائق العطاءات."],
      ["ما تستلمه", "كميات محسوبة ووثائق داعمة يستطيع فريق التخطيط أو المناقصات العمل منها."],
    ],
  },
  "/services/authority-approval-drawings": {
    lead: "تُعد إمباير للاستشارات التصميمية رسومات معمارية وإنشائية ومدنية وMEP منسقة لمعاملات تصاريح البناء ومراجعات الجهات المختصة في الإمارات، وفق متطلبات المشروع وصيغة الجهة المعنية.",
    sections: [
      ["خدمات رسومات التقديم للجهات المختصة", "رسومات البلديات وتصاريح البناء؛ الدفاع المدني والسلامة من الحريق؛ رسومات DEWA وTAQA Distribution (سابقاً ADDC/AADC) وSEWA وEtihadWE (سابقاً FEWA)؛ اعتمادات DDA وتراخيص والمطورين والمجتمعات الرئيسية؛ التقديمات المعمارية والإنشائية والمدنية وMEP؛ ورسومات التكييف ومكافحة الحريق والكهرباء والسباكة والتجهيز الداخلي والمطاعم والمحلات التجارية ورسومات التنفيذ الفعلي للتقديم."],
      ["تعديلات الرسومات بعد ملاحظات الجهات المختصة في الإمارات", "نراجع ملاحظات الجهة المختصة والملاحظات الفنية، ثم نحدّث رسومات AutoCAD المعمارية والإنشائية والمدنية وMEP بتعديلات منسقة وملاحظات مؤشرة وسحب المراجعة والمراجع المحدّثة لدعم إعادة التقديم."],
      ["يشمل دعم التعديلات", "تعديلات بلدية دبي والدفاع المدني؛ تحديثات رسومات الجهات المزودة للخدمات؛ تعديلات معمارية وإنشائية؛ مراجعات MEP والتكييف والكهرباء والسباكة ومكافحة الحريق؛ تعديلات التجهيز الداخلي والمحلات؛ تحديثات المطابقة وفق الملاحظات؛ تحديث ملفات PDF وDWG وإعداد حزم إعادة التقديم."],
      ["تنسيق التقديم", "نجهز حزم رسومات قابلة للتحرير ومنسقة بالصيغ المتفق عليها. وعندما تشترط الجهة المختصة تقديم المعاملة عبر استشاري أو مقاول مسجل، يتولى المختص تقديمها رسمياً، ونتعاون معه في إعداد الرسومات وتحديثها."],
    ],
  },
  "/visualisation": {
    lead: "من التصورات المعبرة إلى نماذج Revit المنسقة، نجعل معلومات المشروع أسهل في الاستكشاف — خدمات التصور ثلاثي الأبعاد ونمذجة معلومات المباني للفرق في دبي والإمارات.",
    sections: [
      ["التصور ثلاثي الأبعاد", "أظهر كيف سيبدو المكان ويُحس به قبل التنفيذ، بتصورات تساعد العملاء وفرق المشروع وأصحاب العلاقة على فهم التصميم."],
      ["نمذجة معلومات المباني والتنسيق", "جمع المعلومات المعمارية والإنشائية والميكانيكية والكهربائية والصحية في نموذج منسق يدعم المراجعة وكشف التعارضات وتسليم المشروع."],
    ],
  },
  "/process": {
    lead: "مسار عملي من المعلومات المتوفرة لديكم اليوم إلى الملفات التي يحتاجها فريقكم تاليًا. قد تكون البداية مخططًا أوليًا أو نموذج Revit قائمًا أو ملف DWG أو ملف PDF عليه ملاحظات.",
    sections: [
      ["١ — شارك متطلباتك", "أخبرنا بما تعمل عليه وأرسل ما لديك: مخططات أولية، ملفات PDF، ملفات CAD قائمة، ملاحظات، معلومات الموقع ورسومات مرجعية."],
      ["٢ — تحديد النطاق", "نتفق معًا على الأعمال ومستوى التفصيل ونقاط المراجعة ومواعيد التسليم لمرحلة مشروعكم."],
      ["٣ — التنفيذ والمراجعة", "يطور فريقنا الحزمة ويشاركها عند نقاط المراجعة المتفق عليها ليبدي مهندسوكم واستشاريوكم ملاحظاتهم."],
      ["٤ — الإصدار والتسليم", "بعد اكتمال المراجعة المتفق عليها نصدر ملفات منظمة بالصيغ التي يعمل بها فريقكم، جاهزة للمرحلة التالية."],
    ],
  },
  "/about": {
    lead: "تدعم إمباير للاستشارات التصميمية المسؤولين عن تحويل معلومات المشروع إلى عمل منفذ. من مقرنا في دبي ببرج برجمان التجاري في المنخول، ندعم فرق المشاريع في الإمارات ودول الخليج والهند بحزم عمل محددة وبطاقة فنية إضافية.",
    sections: [
      ["منهجنا", "نبدأ من مرحلة مشروعكم والمعلومات المتاحة ومن سيستخدم المخرجات. المعلومات المعمارية والإنشائية وخدمات المباني تحتاج رؤية منسقة، ونحن ننظم المخرجات المتفق عليها ليتمكن فريقكم من المضي بها إلى المراجعة أو التخطيط أو التنفيذ."],
      ["الرؤية والرسالة", "أن نكون معروفين بالتصميم والهندسة المبتكرة والمستدامة والدقيقة، مدفوعين بالجودة والنزاهة ورضا العميل — وأن نقدم دعمًا تصميميًا وهندسيًا موثوقًا ومدروسًا يساعد العملاء على المضي بمشاريعهم قدمًا."],
      ["أين نعمل", "من قاعدتنا في دبي ندعم فرق المشاريع في الإمارات ودول الخليج والهند، في المشاريع التجارية والسكنية والصحية والصناعية والضيافة والتعليم والتجزئة والطيران والبنية التحتية والسكك الحديدية."],
    ],
  },
  "/contact": {
    lead: "أخبرنا بمرحلة المشروع والأعمال المطلوبة وأي ملفات متاحة للمراجعة. إمباير للاستشارات التصميمية، برج برجمان التجاري، المنخول، دبي، الإمارات.",
    sections: [
      ["شارك متطلباتك", "أرسل مخططات أولية أو ملفات PDF أو ملفات CAD أو Revit قائمة أو ملاحظات أو معلومات الموقع، وأخبرنا بما تحتاجه وبالموعد المطلوب."],
      ["ما يحدث بعد ذلك", "نراجع الأعمال، ونتفق معكم على النطاق ونقاط المراجعة، ونؤكد المخرجات والجدول الزمني قبل بدء أي عمل."],
    ],
  },
};
