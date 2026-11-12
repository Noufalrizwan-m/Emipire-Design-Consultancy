import React, { useRef, useState } from "react";
import ResponsiveImage from "./ResponsiveImage";

export default function ScrollHero({ arabic = false }) {
  const [showAll, setShowAll] = useState(
    () => window.matchMedia("(max-width: 700px), (hover: none)").matches,
  );
  const [active, setActive] = useState(false);
  const hero = useRef(null);
  const move = (e) => {
    if (e.pointerType !== "mouse" || showAll) return;
    const rect = hero.current.getBoundingClientRect();
    hero.current.style.setProperty("--lens-x", `${e.clientX - rect.left}px`);
    hero.current.style.setProperty("--lens-y", `${e.clientY - rect.top}px`);
    setActive(true);
  };
  return (
    <section
      ref={hero}
      onPointerMove={move}
      onPointerLeave={() => setActive(false)}
      className={
        "still-hero reveal-hero" +
        (showAll ? " show-systems" : "") +
        (active ? " lens-active" : "")
      }
      aria-label={
        arabic
          ? "استكشف تصور المبنى وأنظمته"
          : "Explore an illustrative building and its technical systems"
      }
    >
      <ResponsiveImage
        className="hero-finished"
        src="/empire-completed-ivory.png"
        alt={arabic ? "تصور المبنى بعد اكتماله" : "Completed building concept"}
        fetchPriority="high"
      />
      <ResponsiveImage
        className="hero-technical"
        src="/empire-systems-ivory.png"
        alt=""
        aria-hidden="true"
      />
      <div className="hero-clouds" aria-hidden="true" />
      <div className="hero-message">
        <h1>
          {arabic ? "أفكار نصممها" : "Ideas made"}
          <br />
          <em>{arabic ? "لتصبح واقعاً." : "buildable."}</em>
        </h1>
        <p>
          {arabic
            ? "اكتشف كيف تتبلور الفكرة قبل بدء البناء."
            : "Explore how an idea can take shape before construction begins."}
        </p>
      </div>
      <a
        className="scroll-cue"
        href="#who-we-are"
        aria-label={
          arabic ? "انتقل إلى المحتوى التالي" : "Scroll to the next section"
        }
      >
        <span />
      </a>
      <button
        type="button"
        className="reveal-toggle"
        aria-pressed={showAll}
        onPointerMove={(e) => e.stopPropagation()}
        onClick={() => {
          setShowAll(!showAll);
          setActive(false);
        }}
      >
        {arabic
          ? showAll
            ? "عرض المبنى النهائي"
            : "استكشف أنظمة المبنى"
          : showAll
            ? "Show completed view"
            : "Reveal building systems"}{" "}
        <span aria-hidden="true">{showAll ? "−" : "+"}</span>
      </button>
    </section>
  );
}
