import React, { useEffect, useRef } from "react";

export default function ProjectGallery({ arabic = false }) {
  const gallery = useRef(null);
  const pausedUntil = useRef(0);
  useEffect(() => {
    const track = gallery.current;
    if (!track) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let hovering = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );
    observer.observe(track);
    const pause = () => {
      pausedUntil.current = Date.now() + 8000;
    };
    const enter = () => {
      hovering = true;
    };
    const leave = () => {
      hovering = false;
      pause();
    };
    track.addEventListener("pointerenter", enter);
    track.addEventListener("pointerleave", leave);
    track.addEventListener("pointerdown", pause);
    track.addEventListener("keydown", pause);
    const timer = window.setInterval(() => {
      if (
        !visible ||
        hovering ||
        document.hidden ||
        reducedMotion.matches ||
        Date.now() < pausedUntil.current ||
        track.contains(document.activeElement)
      )
        return;
      const step =
        track.querySelector("figure")?.getBoundingClientRect().width ||
        track.clientWidth;
      const max = track.scrollWidth - track.clientWidth;
      const position = Math.abs(track.scrollLeft);
      const next =
        position >= max - 2 ? 0 : Math.min(max, position + step + 16);
      track.scrollTo({ left: arabic ? -next : next, behavior: "smooth" });
    }, 5500);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      track.removeEventListener("pointerenter", enter);
      track.removeEventListener("pointerleave", leave);
      track.removeEventListener("pointerdown", pause);
      track.removeEventListener("keydown", pause);
    };
  }, [arabic]);
  const photos = [
    ["interior-dining", "Open-plan dining and kitchen interior"],
    ["interior-bedroom", "Bedroom with integrated lighting"],
    ["interior-kitchen", "Kitchen joinery and finishes"],
    ["interior-storage", "Fitted storage and lighting"],
    ["interior-bath", "Bathroom interior and finishes"],
    ["exterior-courtyard", "Residential courtyard"],
    ["exterior-garden", "Landscaped garden walkway"],
    ["exterior-pool", "Outdoor pool and landscaping"],
  ];
  const arabicCaptions = [
    "منطقة طعام ومطبخ بتصميم مفتوح",
    "غرفة نوم بإضاءة مدمجة",
    "تفاصيل نجارة وتشطيبات المطبخ",
    "خزائن مدمجة وإضاءة",
    "تصميم وتشطيبات الحمام",
    "فناء منزل",
    "ممر في حديقة منسقة",
    "مسبح خارجي وتنسيق حدائق",
  ];
  const move = (direction) => {
    pausedUntil.current = Date.now() + 8000;
    gallery.current?.scrollBy({
      left: direction * (arabic ? -1 : 1) * gallery.current.clientWidth * 0.75,
      behavior: "smooth",
    });
  };
  return (
    <section
      className="project-gallery-section"
      aria-labelledby="project-gallery-title"
    >
      <div className="container">
        <div className="project-gallery-heading">
          <div>
            <p>{arabic ? "صور من المشاريع" : "PROJECT IMAGES"}</p>
            <h2 id="project-gallery-title">
              {arabic ? (
                <>
                  مساحات <em>عن قرب.</em>
                </>
              ) : (
                <>
                  Spaces in <em>focus.</em>
                </>
              )}
            </h2>
          </div>
          <div className="project-gallery-navigation">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={arabic ? "صور سابقة" : "Previous project images"}
            >
              {arabic ? "→" : "←"}
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={arabic ? "صور تالية" : "Next project images"}
            >
              {arabic ? "←" : "→"}
            </button>
          </div>
        </div>
        <p className="project-gallery-intro">
          {arabic
            ? "اكتشف تفاصيل المساحات الداخلية والخارجية من خلال صور فريقنا."
            : "Explore interior and exterior details in the images shared by our team."}
        </p>
        <div
          className="project-gallery-track"
          ref={gallery}
          tabIndex={0}
          aria-label={arabic ? "معرض صور من المشاريع" : "Project image gallery"}
        >
          {photos.map(([image, alt], i) => (
            <figure key={image}>
              <img
                src={"/project-gallery/" + image + ".jpg"}
                alt={arabic ? arabicCaptions[i] : alt}
                loading="lazy"
                draggable="false"
              />
              <figcaption>
                <span>
                  {arabic
                    ? new Intl.NumberFormat("ar-EG", {
                        minimumIntegerDigits: 2,
                      }).format(i + 1)
                    : String(i + 1).padStart(2, "0")}
                </span>
                {arabic ? arabicCaptions[i] : alt}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="project-gallery-hint">
          {arabic
            ? "اسحب أو استخدم الأسهم لتصفح الصور"
            : "Swipe or use the arrows to explore"}{" "}
          <span>→</span>
        </p>
      </div>
    </section>
  );
}
