// Client reviews shown in the "Words from our clients" section.
//
// These are real Google reviews, copied verbatim. To add one: open your Google
// Business profile, copy the reviewer's name and the text exactly as written,
// and add an entry below. Keep `rating` honest — the summary figures are what
// Google shows, so update them here when they change.
//
// Nothing here is fetched at runtime, so there is no widget, no third-party
// script and no monthly view limit to run out of.

export const reviewSummary = {
  rating: 4.7,
  count: 23,
  // Your listing, for the "read them all" link.
  url: "https://www.google.com/maps/search/?api=1&query=Empire+Design+Consultancy+Dubai",
};

export const reviews = [
  {
    name: "Sakshi Bhardwaj",
    rating: 5,
    when: "a month ago",
    text: "Excellent interior fit-out Drawings service from Empire Design Consultancy. The team was professional, responsive, and attentive to every Design detail. The workmanship and finishing quality were impressive, and the project was handled smoothly from start to completion.",
  },
  {
    name: "aun raza",
    rating: 5,
    when: "a month ago",
    text: "Excellent MEP drafting and design team. Empire Design provides complete drafting solutions from IFC drawings to detailed shop drawings and site execution support. Very professional, responsive, and committed to quality delivery.",
  },
  {
    name: "Mohit Mangtani",
    rating: 5,
    when: "4 weeks ago",
    text: "Great experience with the team for MEP drawings, including electrical, HVAC, and plumbing layouts. They understand the project requirements and focus on coordination and drawing quality. Professional service.",
  },
  {
    name: "Saravanan",
    rating: 5,
    when: "4 months ago",
    text: "We approached Empire for BIM modeling and shop drawings for a residential project. Their technical knowledge, quick turnaround, and attention to detail were excellent. Definitely among the best BIM and MEP services in Dubai.",
  },
  {
    name: "Himalayan Kid",
    // Google's listing reported 4 stars for this one — worth confirming
    // against your Business profile before it goes live.
    rating: 4,
    when: "4 weeks ago",
    text: "Excellent CAD drafting and engineering design services! Professional team, high-quality drawings, and timely delivery. Highly recommended for CAD and BIM services in Dubai!",
  },
];
