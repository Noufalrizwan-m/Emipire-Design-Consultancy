import React from "react";
import ResponsiveImage from "../components/ResponsiveImage";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { arabic, t, navLabel } from "../lib/i18n.js";
import { path, page } from "../lib/routing.js";
import { openContactDialog } from "../lib/contactDialog.js";
import { links } from "../data/navigation.js";
import { slugs } from "../data/navigation.js";
import { services } from "../data/services.js";

// The site header: brand, desktop nav with its service dropdowns, the language
// toggle and the mobile menu. Open/closed state lives in App because the scroll
// listener that adds the shrunken style sits there too.
export default function Header({ menu, setMenu, scrolled, dropdown, setDropdown, isCurrentNav }) {
  return (
      <header
        id="site-header"
        className={
          "site-header" +
          (menu ? " menu-open" : "") +
          (scrolled ? " is-scrolled" : "")
        }
      >
        <nav className="nav-shell" aria-label={t("Main navigation")}>
          <a className="brand" href="/">
            <ResponsiveImage src="/logo.png" alt="" />
            <span>
              <strong>{t("Empire")}</strong>
              <small>{t("Design Consultancy")}</small>
            </span>
          </a>
          <div
            className="nav-links"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setDropdown(null);
                e.currentTarget
                  .querySelector('[aria-expanded="true"]')
                  ?.focus();
              }
            }}
          >
            {links.map(([name, url]) =>
              name === "Services" || name === "3D & BIM" ? (
                <div
                  className="nav-dropdown"
                  key={name}
                  onMouseEnter={() => setDropdown(name)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <a
                    className="nav-overview-link"
                    href={url}
                    aria-current={isCurrentNav(name) ? "page" : undefined}
                  >
                    {navLabel(name)}
                  </a>
                  <button
                    className="nav-drop-trigger"
                    aria-label={
                      arabic
                        ? "عرض قائمة " + navLabel(name)
                        : "Show " + name + " menu"
                    }
                    type="button"
                    aria-expanded={dropdown === name}
                    aria-controls={
                      "nav-panel-" +
                      (name === "Services" ? "services" : "visual")
                    }
                    onClick={() => setDropdown(dropdown === name ? null : name)}
                  >
                    <ChevronDown size={14} />
                  </button>
                  <div
                    id={
                      "nav-panel-" +
                      (name === "Services" ? "services" : "visual")
                    }
                    className="nav-panel"
                    hidden={dropdown !== name}
                  >
                    <div className="nav-panel-links">
                      {(name === "Services"
                        ? services
                            .map(([, title, desc], i) => [
                              title,
                              "/services/" + slugs[i],
                              desc,
                            ])
                            .filter(
                              ([, href]) =>
                                ![
                                  "/services/bim-coordination",
                                  "/services/3d-visualisation",
                                ].includes(href),
                            )
                        : [
                            [
                              "3D visualisation",
                              "/services/3d-visualisation",
                              "Renders and walkthroughs for design reviews.",
                            ],
                            [
                              "BIM & coordination",
                              "/services/bim-coordination",
                              "Models for multidisciplinary coordination.",
                            ],
                          ]
                      ).map(([title, href, desc]) => (
                        <a href={href} key={href}>
                          <strong>{t(title)}</strong>
                          <span>{t(desc)}</span>
                        </a>
                      ))}
                    </div>
                    <div className="nav-panel-image">
                      <ResponsiveImage
                        src={
                          name === "Services"
                            ? "/nav-services.png"
                            : "/nav-bim.png"
                        }
                        alt=""
                        loading="lazy"
                      />
                      <div>
                        <strong>
                          {t(
                            name === "Services"
                              ? "From brief to build"
                              : "See the bigger picture",
                          )}
                        </strong>
                        <span>
                          {t(
                            name === "Services"
                              ? "Drawing and modelling support for your team."
                              : "Explore design and technical detail.",
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={name}
                  href={url}
                  aria-current={isCurrentNav(name) ? "page" : undefined}
                >
                  {navLabel(name)}
                </a>
              ),
            )}
          </div>
          <button
            type="button"
            className="language-switch"
            lang={arabic ? "en" : "ar"}
            onClick={() => {
              location.href =
                (arabic ? path : "/ar" + (path === "/" ? "/" : path)) +
                location.search +
                location.hash;
            }}
          >
            {arabic ? "English" : "العربية"}
          </button>
          <a
            className="nav-cta"
            href="/contact"
            aria-current={isCurrentNav("Contact") ? "page" : undefined}
            onClick={openContactDialog}
          >
            {arabic ? "أرسل تفاصيل مشروعك" : "Send your brief"}{" "}
            <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menu}
            aria-label={t(menu ? "Close menu" : "Open menu")}
            onClick={() => setMenu(!menu)}
          >
            <span className={"menu-icon" + (menu ? " is-open" : "")}>
              <Menu />
              <X />
            </span>
          </button>
        </nav>
        <div
          className={"mobile-menu" + (menu ? " is-open" : "")}
          aria-hidden={!menu}
          inert={!menu}
        >
          <div className="mobile-menu-links">
            {[...links, ["Contact", "/contact"]].map(([name, url], index) => (
              <a
                key={name}
                style={{ "--i": index }}
                onClick={() => setMenu(false)}
                href={url}
                aria-current={isCurrentNav(name) ? "page" : undefined}
              >
                {navLabel(name)}
              </a>
            ))}
            <a
              className="mobile-menu-cta"
              style={{ "--i": links.length + 1 }}
              href="/contact"
              onClick={(event) => {
                setMenu(false);
                openContactDialog(event);
              }}
            >
              {arabic ? "أرسل تفاصيل مشروعك" : "Send your brief"}{" "}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </header>
  );
}
