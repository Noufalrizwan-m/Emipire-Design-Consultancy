import re,sys,os
root=os.path.expanduser('~/mnt/empire-site')
p=root+'/src/main.jsx'
s=open(p,encoding='utf-8').read()
s=s.replace('import Lenis from "lenis";','import Lenis from "lenis";\nimport {\n  catalogueIntro,\n  catalogueServices,\n  catalogueWhy,\n  catalogueWorkflow,\n  catalogueQuote,\n} from "./servicesCatalogue.js";',1)
comp='''function ServicesCatalogue() {
  const L = arabic ? 1 : 0;
  return (
    <>
      <section id="services" className="svc-cat">
        <div className="container">
          <header className="svc-cat-head">
            <p className="about-label">{catalogueIntro.title[L]}</p>
            <h2>{catalogueIntro.subtitle[L]}</h2>
            <div>
              {catalogueIntro.paragraphs.map((text) => (
                <p key={text[0]}>{text[L]}</p>
              ))}
            </div>
          </header>
          {catalogueServices.map((service, i) => (
            <article className="svc-cat-item" key={service.title[0]}>
              <div className="svc-cat-title">
                <span>{numberText(String(i + 1).padStart(2, "0"))}</span>
                <h3>{service.title[L]}</h3>
                <p>{service.intro[L]}</p>
              </div>
              <div className="svc-cat-body">
                <p className="svc-cat-label">{catalogueIntro.includeLabel[L]}</p>
                {service.groups.map((group, g) => (
                  <div className="svc-cat-group" key={g}>
                    {group.label && <h4>{group.label[L]}</h4>}
                    <ul>
                      {group.items.map((item) => (
                        <li key={item[0]}>{item[L]}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="svc-cat-focus">
                  <strong>{catalogueIntro.focusLabel[L]}</strong>{" "}
                  {service.focus[L]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="svc-cat-why">
        <div className="container svc-cat-why-grid">
          <div>
            <h2>{catalogueWhy.title[L]}</h2>
            <ul>
              {catalogueWhy.items.map((item) => (
                <li key={item[0]}>{item[L]}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{catalogueWorkflow.title[L]}</h2>
            <ol>
              {catalogueWorkflow.steps.map((step) => (
                <li key={step[0]}>
                  <strong>{step[L]}:</strong> {step[L + 2]}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="svc-cat-quote">
        <div className="container">
          <h2>{catalogueQuote.title[L]}</h2>
          <p>{catalogueQuote.text[L]}</p>
          <p>{catalogueQuote.text2[L]}</p>
          <p className="svc-cat-label">{catalogueQuote.listLabel[L]}</p>
          <ul>
            {catalogueQuote.list.map((item) => (
              <li key={item[0]}>{item[L]}</li>
            ))}
          </ul>
          <a className="svc-cat-cta" href="/contact">
            {arabic ? "أرسل تفاصيل مشروعك" : "Send your brief"}{" "}
            <ArrowUpRight size={17} />
          </a>
          <p className="svc-cat-tagline">{catalogueQuote.tagline[L]}</p>
        </div>
      </section>
    </>
  );
}

function App() {'''
assert 'function App() {' in s
s=s.replace('function App() {',comp,1)
start=s.index('          <section id="services" className="services section-pad">')
end=s.index('          {page === "services" && (\n            <section className="discipline-overview">')
old=s[start:end]
s=s[:start]+'          {page === "services" ? (\n            <ServicesCatalogue />\n          ) : (\n'+old+'          )}\n'+s[end:]
open(p,'w',encoding='utf-8').write(s)
open(root+'/src/index.css','a',encoding='utf-8').write('''
/* Services catalogue: content laid out point by point. */
.svc-cat {
  background: #faeadb;
  color: #14243a;
  padding: clamp(60px, 8vw, 120px) 0;
}
.svc-cat-head {
  max-width: 820px;
  margin-bottom: clamp(40px, 6vw, 80px);
}
.svc-cat-head h2 {
  font-size: clamp(30px, 4vw, 54px);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin: 14px 0 22px;
}
.svc-cat-head p:not(.about-label) {
  line-height: 1.75;
  margin-top: 14px;
  max-width: 720px;
}
.svc-cat-item {
  display: grid;
  grid-template-columns: minmax(240px, 0.8fr) 1.6fr;
  gap: clamp(24px, 5vw, 80px);
  padding: clamp(32px, 4vw, 56px) 0;
  border-top: 1px solid rgba(20, 36, 58, 0.18);
}
.svc-cat-title {
  align-self: start;
  position: sticky;
  top: 110px;
}
.svc-cat-title > span {
  color: #b78352;
  font-weight: 700;
  letter-spacing: 0.1em;
  font-size: 13px;
}
.svc-cat-title h3 {
  font-size: clamp(26px, 2.6vw, 38px);
  line-height: 1.12;
  letter-spacing: -0.03em;
  margin: 10px 0 16px;
}
.svc-cat-title p {
  line-height: 1.7;
}
.svc-cat-label {
  font-weight: 700;
  margin-bottom: 14px;
}
.svc-cat-group + .svc-cat-group {
  margin-top: 26px;
}
.svc-cat-group h4 {
  font-size: 17px;
  margin: 0 0 12px;
  color: #b78352;
}
.svc-cat-group ul,
.svc-cat-quote ul,
.svc-cat-why ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.svc-cat-group ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 28px;
}
.svc-cat-group li,
.svc-cat-quote li,
.svc-cat-why ul li {
  position: relative;
  padding: 11px 0 11px 22px;
  border-bottom: 1px solid rgba(20, 36, 58, 0.12);
  line-height: 1.45;
}
html[dir="rtl"] .svc-cat-group li,
html[dir="rtl"] .svc-cat-quote li,
html[dir="rtl"] .svc-cat-why ul li {
  padding: 11px 22px 11px 0;
}
.svc-cat-group li::before,
.svc-cat-quote li::before,
.svc-cat-why ul li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 19px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #b78352;
}
html[dir="rtl"] .svc-cat-group li::before,
html[dir="rtl"] .svc-cat-quote li::before,
html[dir="rtl"] .svc-cat-why ul li::before {
  left: auto;
  right: 0;
}
.svc-cat-focus {
  margin-top: 28px;
  padding: 18px 22px;
  border-radius: 14px;
  background: #14243a;
  color: #f4f1eb;
  line-height: 1.6;
}
.svc-cat-focus strong {
  color: #e3b587;
}
.svc-cat-why {
  background: #14243a;
  color: #f4f1eb;
  padding: clamp(56px, 7vw, 100px) 0;
}
.svc-cat-why-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 6vw, 90px);
}
.svc-cat-why h2,
.svc-cat-quote h2 {
  font-size: clamp(26px, 3vw, 42px);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
}
.svc-cat-why ul li {
  border-color: rgba(255, 255, 255, 0.18);
}
.svc-cat-why ol {
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
}
.svc-cat-why ol li {
  counter-increment: step;
  position: relative;
  padding: 14px 0 14px 46px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  line-height: 1.55;
}
html[dir="rtl"] .svc-cat-why ol li {
  padding: 14px 46px 14px 0;
}
.svc-cat-why ol li::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 13px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #b78352;
  color: #14243a;
  font-weight: 700;
  font-size: 13px;
}
html[dir="rtl"] .svc-cat-why ol li::before {
  left: auto;
  right: 0;
}
.svc-cat-why ol strong {
  color: #e3b587;
}
.svc-cat-quote {
  background: #faeadb;
  color: #14243a;
  padding: clamp(56px, 7vw, 100px) 0;
}
.svc-cat-quote .container > p {
  max-width: 760px;
  line-height: 1.7;
  margin-bottom: 14px;
}
.svc-cat-quote ul {
  max-width: 560px;
  margin-bottom: 28px;
}
.svc-cat-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 15px 26px;
  border-radius: 50px;
  background: #b78352;
  color: #14243a;
  font-weight: 700;
}
.svc-cat-tagline {
  margin-top: 36px;
  font-weight: 700;
  letter-spacing: 0.02em;
}
@media (max-width: 900px) {
  .svc-cat-item,
  .svc-cat-why-grid {
    grid-template-columns: 1fr;
  }
  .svc-cat-title {
    position: static;
  }
}
@media (max-width: 600px) {
  .svc-cat-group ul {
    grid-template-columns: 1fr;
  }
}
''')
print("patched")
