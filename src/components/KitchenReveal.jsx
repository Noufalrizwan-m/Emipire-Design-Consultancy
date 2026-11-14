import React, { useState } from "react";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import { t } from "../lib/i18n.js";

export default function KitchenReveal() {
  const [amount, setAmount] = useState(50);
  return (
    <figure
      className="design-story-visual kitchen-reveal"
      style={{ "--reveal": `${amount}%` }}
    >
      <div className="kitchen-images">
        <ResponsiveImage
          className="kitchen-sketch"
          src="/kitchen-sketch-clean.png"
          alt={t("Architectural sketch of an illustrative kitchen")}
          loading="lazy"
        />
        <ResponsiveImage
          className="kitchen-finished"
          src="/kitchen-finished-clean.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>
      <div className="kitchen-handle" aria-hidden="true">
        <span>
          ‹ <b>›</b>
        </span>
      </div>
      <input
        className="kitchen-slider"
        type="range"
        min="0"
        max="100"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        aria-label={t("Reveal the finished kitchen design")}
        aria-valuetext={`${amount}% of finished design revealed`}
      />
    </figure>
  );
}
