import React, { useEffect, useRef } from "react";

// Gallery photos are cached for 30 days, and re-watermarking them does not
// change their filenames — so without this, anyone who visited before the
// change would keep the unwatermarked copies until the cache expired.
// Bump this whenever the files in public/project-gallery/ are regenerated.
const GALLERY_VERSION = 2;

// Auto-drift made the gallery cut images at the edges and glitch while scrolling the page.
// Manual drag, swipe, wheel and arrow navigation stay on.
const AUTO_SCROLL = false;

export default function ProjectGallery({ arabic = false }) {
  const gallery = useRef(null);
  const pausedUntil = useRef(0);
  useEffect(() => {
    const track = gallery.current;
    if (!track) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dir = arabic ? -1 : 1; // RTL scrollLeft runs negative
    const SPEED = 0.045; // px per ms (~45px/s)
    let visible = false;
    let hovering = false;
    let dragging = false;
    let touching = false;
    let loopWidth = 0;
    let pos = 0; // float position, scrollLeft can only hold rounded values
    let lastSet = 0;
    let lastTime = 0;
    let raf = 0;

    const measure = () => {
      const figures = track.querySelectorAll("figure");
      const half = figures.length / 2;
      if (half < 1) return;
      loopWidth = Math.abs(
        figures[half].getBoundingClientRect().left -
          figures[0].getBoundingClientRect().left,
      );
    };
    const current = () => Math.abs(track.scrollLeft);
    const write = (value) => {
      if (loopWidth > 0) value = ((value % loopWidth) + loopWidth) % loopWidth;
      pos = value;
      track.scrollLeft = dir * value;
      lastSet = current();
    };
    const pause = (ms = 2500) => {
      pausedUntil.current = Math.max(pausedUntil.current, Date.now() + ms);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    observer.observe(track);

    const tick = (time) => {
      const dt = Math.min(time - (lastTime || time), 64);
      lastTime = time;
      const idle =
        AUTO_SCROLL &&
        visible &&
        !document.hidden &&
        !reducedMotion.matches &&
        !hovering &&
        !dragging &&
        !touching &&
        Date.now() >= pausedUntil.current &&
        !track.contains(document.activeElement);
      // Someone scrolled it (touch, wheel, keys, arrows): adopt that position.
      if (Math.abs(current() - lastSet) > 1.5) {
        pos = current();
        lastSet = pos;
      }
      if (idle && loopWidth > 0) write(pos + SPEED * dt);
      else if (loopWidth > 0 && (pos >= loopWidth || current() >= loopWidth))
        write(current());
      raf = requestAnimationFrame(tick);
    };

    // Mouse drag (touch uses native swipe).
    let lastX = 0;
    const onPointerDown = (event) => {
      pause(2500);
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      dragging = true;
      lastX = event.clientX;
      track.classList.add("is-dragging");
      track.setPointerCapture?.(event.pointerId);
    };
    const onPointerMove = (event) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      lastX = event.clientX;
      write(current() - dx * dir);
    };
    const endDrag = (event) => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("is-dragging");
      track.releasePointerCapture?.(event.pointerId);
      pause(1500);
    };
    const onTouchStart = () => {
      touching = true;
    };
    const onTouchEnd = () => {
      touching = false;
      pause(2000);
    };
    const onEnter = (event) => {
      if (event.pointerType === "mouse") hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };
    const onWheel = () => pause(2500);
    const onKey = () => pause(6000);
    const onResize = () => measure();

    measure();
    window.addEventListener("resize", onResize);
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("touchcancel", onTouchEnd, { passive: true });
    track.addEventListener("wheel", onWheel, { passive: true });
    track.addEventListener("keydown", onKey);
    // Figure widths change as images/fonts load, so re-measure shortly after mount.
    const remeasure = window.setTimeout(measure, 800);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(remeasure);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("keydown", onKey);
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
    pausedUntil.current = Date.now() + 4000;
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
          data-lenis-prevent-horizontal
          tabIndex={0}
          aria-label={arabic ? "معرض صور من المشاريع" : "Project image gallery"}
        >
          {[...photos, ...photos].map(([image, alt], index) => {
            const i = index % photos.length;
            const clone = index >= photos.length;
            return (
              <figure key={image + (clone ? "-clone" : "")} aria-hidden={clone || undefined}>
                <img
                  src={`/project-gallery/${image}.webp?v=${GALLERY_VERSION}`}
                  alt={clone ? "" : arabic ? arabicCaptions[i] : alt}
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
            );
          })}
        </div>
        <p className="project-gallery-hint">
          {arabic
            ? "اسحب أو استخدم الأسهم لتصفح الصور"
            : "Drag, swipe or use the arrows to explore"}{" "}
          <span>→</span>
        </p>
      </div>
    </section>
  );
}
