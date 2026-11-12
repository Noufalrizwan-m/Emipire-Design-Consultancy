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
  "/services/authority-approval-drawings": [
    "Authority Submission Drawings | Dubai",
    "Fit-out and modification drawing packages prepared in Dubai Municipality, DDA, DMCC and Trakhees submission formats, for your registered consultant or contractor to submit.",
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
  "/services/authority-approval-drawings": [
    "رسومات تقديم الجهات المختصة في دبي",
    "حزم رسومات التجهيز الداخلي والتعديلات بصيغ بلدية دبي وسلطة دبي للتطوير وDMCC وتراخيص، ليقدمها الاستشاري أو المقاول المسجل لديكم.",
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
      ["What we can help with", "Architectural, structural and interior drawings. Mechanical, electrical and plumbing layouts. Civil and infrastructure drawings. PDF, DWG, image and paper to CAD conversion. As-built records and redline updates."],
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
    lead: "Fit-out and modification drawing packages prepared in the formats Dubai authority submissions call for, so your registered consultant or contractor can submit without redrawing anything. Empire Design Consultancy is a licensed Dubai company based at Burjuman Business Tower, Mankhool.",
    sections: [
      ["What we prepare", "Existing and proposed layouts for fit-out submissions. Ceiling, partition and MEP layouts covering HVAC, electrical, plumbing and fire fighting. Demolition and construction plans. Authority-format sheets in AutoCAD DWG and PDF at the sheet sizes each authority expects. Drawing revisions after authority comments."],
      ["Which authority your unit falls under", "Dubai mainland units are handled by Dubai Municipality through the Build in Dubai platform. TECOM communities such as Dubai Internet City, Dubai Media City, Dubai Knowledge Park and Dubai Design District fall under the Dubai Development Authority, whose drawings follow DDA Circular 400 format. JLT units fall under DMCC, Jebel Ali and Palm Jumeirah under Trakhees, and DIFC under its own authority. Each route has its own portal, drawing format and sheet size."],
      ["How we work with your submission", "We prepare the drawings; the submission itself is made by the registered consultant or contractor your authority requires as the requester. We work to their mark-ups and to the authority's format, and turn around revisions when comments come back, so the package does not have to be rebuilt between review rounds."],
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
