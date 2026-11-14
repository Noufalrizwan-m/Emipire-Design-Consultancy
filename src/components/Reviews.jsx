import React, { useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { t, numberText } from "../lib/i18n.js";
import { reviews, reviewSummary } from "../data/reviews.js";

function Stars({ rating }) {
  return (
    <span className="review-stars" role="img" aria-label={`${rating} ${t("out of 5")}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={15} aria-hidden="true" fill={i < rating ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

export default function Reviews() {
  const track = useRef(null);
  const paused = useRef(false);
  const slide = (direction) => {
    const container = track.current;
    if (!container) return;
    const card = container.querySelector(".review-card");
    const distance = card ? card.getBoundingClientRect().width + 16 : container.clientWidth;
    const rtl = document.documentElement.dir === "rtl";
    const atEnd = direction > 0 && container.scrollLeft + container.clientWidth >= container.scrollWidth - 8;
    const atStart = direction < 0 && container.scrollLeft <= 8;
    if (atEnd) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (atStart && direction < 0) {
      container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      return;
    }
    container.scrollBy({ left: direction * distance * (rtl ? -1 : 1), behavior: "smooth" });
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!paused.current) slide(1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="reviews-container"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onFocusCapture={() => { paused.current = true; }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) paused.current = false;
      }}
    >
      <div className="reviews-toolbar">
        <div className="reviews-summary">
          <p className="reviews-score">
            <strong>{numberText(reviewSummary.rating)}</strong>
            <Stars rating={Math.round(reviewSummary.rating)} />
          </p>
          <p className="reviews-count">
            {t("Based on")} {numberText(reviewSummary.count)} {t("Google reviews")}
          </p>
        </div>
        <div className="reviews-controls" aria-label="Review slider controls">
          <button type="button" onClick={() => slide(-1)} aria-label="Previous reviews"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => slide(1)} aria-label="Next reviews"><ChevronRight size={18} /></button>
        </div>
      </div>

      <ul className="reviews-grid" ref={track} aria-label="Client reviews">
        {reviews.map((review) => (
          <li key={review.name} className="review-card">
            <Stars rating={review.rating} />
            {/* dir="auto" lets each review pick its own direction from its
                first letter. Without it an English review inside the Arabic
                RTL page renders its full stops at the start of the line. */}
            <blockquote dir="auto">{review.text}</blockquote>
            <footer>
              <cite dir="auto">{review.name}</cite>
              <span>{t(review.when)}</span>
            </footer>
          </li>
        ))}
      </ul>

      <a className="reviews-fallback" href={reviewSummary.url} target="_blank" rel="noopener noreferrer">
        {t("View our reviews on Google Maps")} ↗
      </a>
    </div>
  );
}
