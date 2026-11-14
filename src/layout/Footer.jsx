import React from "react";
import ResponsiveImage from "../components/ResponsiveImage";
import { ArrowUpRight } from "lucide-react";
import { arabic, t, navLabel } from "../lib/i18n.js";
import { openContactDialog } from "../lib/contactDialog.js";
import { services } from "../data/services.js";

// Site footer. Entirely static apart from the translated copy, so it takes no
// props and renders the same on every page.
export default function Footer() {
  return (
      <footer className="site-footer">
        <div className="container">
          <div className="footer-logo">
            <a className="brand footer-brand" href="/">
              <ResponsiveImage src="/logo.png" alt="" />
              <span>
                <strong>{t("Empire")}</strong>
                <small>{t("Design Consultancy")}</small>
              </span>
            </a>
          </div>
          <div className="footer-lead">
            <div>
              <h2>
                {t("Ideas made")}
                {" "}
                <em>{t("buildable.")}</em>
              </h2>
              <p>
                {t(
                  "Practical design and technical support for projects across the UAE, GCC and India.",
                )}
              </p>
            </div>
            <div className="footer-actions">
              <button type="button" onClick={() => openContactDialog()}>
                {arabic ? "أرسل تفاصيل مشروعك" : "Send your brief"}{" "}
                <ArrowUpRight size={17} />
              </button>
              <a
                href="https://wa.me/971544348797"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("WhatsApp")}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="footer-columns">
            <div>
              <h3>{arabic ? "استكشف" : "Explore"}</h3>
              <a href="/">{navLabel("Home")}</a>
              <a href="/services">{navLabel("Services")}</a>
              <a href="/visualisation">{navLabel("3D & BIM")}</a>
              <a href="/process">{navLabel("Process")}</a>
              <a href="/about">{navLabel("About")}</a>
            </div>
            <div>
              <h3>{t("Services")}</h3>
              <a href="/services/cad-drafting">
                {t("Engineering & CAD drafting")}
              </a>
              <a href="/services/shop-drawings">{t("Shop drawings")}</a>
              <a href="/services/bim-coordination">{t("BIM & coordination")}</a>
              <a href="/services/3d-visualisation">{t("3D visualisation")}</a>
              <a href="/services/estimating-takeoff">
                {t("Estimating & takeoff")}
              </a>
            </div>
            <div>
              <h3>{navLabel("Contact")}</h3>
              <a href="tel:+971544348797">
                <bdi dir="ltr">+971 54 434 8797</bdi>
              </a>
              <a href="mailto:support@empiredesignae.com">
                support@<wbr />empiredesignae.com
              </a>
              <p>
                {t("Burjuman Business Tower")}
                <br />
                {t("Mankhool, Dubai, UAE")}
              </p>
              <a href="/contact">{t("Send your brief")}</a>
            </div>
            <div>
              <h3>{arabic ? "تابعنا" : "Follow"}</h3>
              <a
                href="https://www.linkedin.com/company/empire-design-consultancy-llc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("LinkedIn ↗")}
              </a>
              <a
                href="https://www.instagram.com/empire_design_consultancy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("Instagram ↗")}
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <small>
              © {new Date().getFullYear()}{" "}
              {arabic
                ? "إمباير للاستشارات التصميمية ذ.م.م"
                : "Empire Design Consultancy LLC"}
            </small>
            <span>
              {arabic
                ? "دبي، الإمارات العربية المتحدة"
                : "Dubai, United Arab Emirates"}
            </span>
          </div>
        </div>
      </footer>
  );
}
