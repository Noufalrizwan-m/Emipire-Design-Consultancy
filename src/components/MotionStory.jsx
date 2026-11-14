import React from "react";
import { ArrowUpRight } from "lucide-react";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import { services } from "../data/services.js";
import { storyScenes } from "../data/storyScenes.js";
import { arabic, t } from "../lib/i18n.js";

export default function MotionStory() {
  return (
    <section
      id="motion-story"
      className="motion-story"
      aria-label={t("From design to delivery")}
    >
      <div className="motion-story-heading">
        <div className="container">
          <h2>
            {arabic ? (
              <>
                خدمات<em>نا.</em>
              </>
            ) : (
              <>
                Our <em>{t("services.")}</em>
              </>
            )}
          </h2>
          <p>
            {arabic
              ? "اكتشف كيف ندعم مشروعك."
              : "Explore how we support your project."}
          </p>
        </div>
      </div>
      <div className="motion-story-viewport">
        <div className="motion-story-track">
          {storyScenes.map((scene, i) => (
            <a
              className="motion-scene"
              href={scene.href}
              key={scene.href}
              aria-label={scene.link}
            >
              <ResponsiveImage src={scene.image} alt="" loading="lazy" />
              <div className="motion-scene-shade" />
              <div className="motion-scene-content">
                <h2>
                  {scene.title}
                  <span>.</span>
                </h2>
                <p>{scene.copy}</p>
                <span className="motion-scene-link">
                  {scene.link} <ArrowUpRight size={17} />
                </span>
              </div>
            </a>
          ))}
        </div>
        <p className="motion-swipe-hint" aria-hidden="true">
          {arabic ? "اسحب للاستكشاف" : "Swipe to explore"}
        </p>
      </div>
    </section>
  );
}
