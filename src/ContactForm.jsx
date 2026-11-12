import React, { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js/max";

const serviceOptions = [
  "Architectural design & drafting",
  "Structural design & drafting",
  "MEP design & drafting",
  "Civil & infrastructure drawings",
  "Interior design & fit-out",
  "Construction shop drawings",
  "BIM & coordination",
  "3D visualisation",
  "Estimating & takeoff",
  "CAD conversion",
  "Other",
];
const arOptions = [
  "التصميم والرسم المعماري",
  "التصميم والرسم الإنشائي",
  "تصميم ورسم الأنظمة الميكانيكية والكهربائية والصحية",
  "الرسومات المدنية والبنية التحتية",
  "التصميم الداخلي والتجهيزات",
  "الرسومات التنفيذية للبناء",
  "نمذجة معلومات المباني والتنسيق",
  "التصور ثلاثي الأبعاد",
  "تقدير التكاليف وحصر الكميات",
  "التحويل إلى CAD",
  "أخرى",
];
const arErrors = {
  firstName: "يرجى إدخال الاسم الأول باستخدام الحروف.",
  lastName: "يرجى إدخال اسم العائلة باستخدام الحروف.",
  email: "يرجى إدخال بريد إلكتروني صحيح.",
  phone: "يرجى إدخال رقم هاتف صحيح للبلد المحدد.",
};
const arabicCountryNames = new Intl.DisplayNames(["ar"], { type: "region" });
const emptyValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};
const names = new Intl.DisplayNames(["en"], { type: "region" });
const countries = getCountries()
  .map((code) => ({
    code,
    name: names.of(code) || code,
    callingCode: getCountryCallingCode(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

function validName(value) {
  const name = value.trim();
  return (
    name.length >= 2 &&
    name.length <= 80 &&
    /\p{L}/u.test(name) &&
    /^[\p{L}\p{M}]+(?:[\s'.’\-][\p{L}\p{M}]+)*$/u.test(name)
  );
}

function validate(values, country) {
  const errors = {};
  if (!validName(values.firstName))
    errors.firstName = "Enter your first name using letters.";
  if (!validName(values.lastName))
    errors.lastName = "Enter your last name using letters.";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) ||
    values.email.includes("..") ||
    values.email.length > 254
  )
    errors.email = "Enter a valid email address.";
  const raw = values.phone.trim();
  const phone = parsePhoneNumberFromString(raw, country);
  if (!raw || !phone?.isValid() || (phone.country && phone.country !== country))
    errors.phone = "Enter a valid phone number for the selected country.";
  return { errors, phone };
}

export default function ContactForm({ arabic = false }) {
  const [values, setValues] = useState(emptyValues);
  const [country, setCountry] = useState("AE");
  const [errors, setErrors] = useState({});
  const [serviceOpen, setServiceOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const matchingCountries = countries.filter((item) =>
    `${item.name} ${arabicCountryNames.of(item.code)} ${item.code} +${item.callingCode}`
      .toLowerCase()
      .includes(countrySearch.trim().toLowerCase()),
  );
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const callingCode = useMemo(() => getCountryCallingCode(country), [country]);
  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
    setSendError(false);
  };
  const submit = async (event) => {
    event.preventDefault();
    const result = validate(values, country);
    setErrors(result.errors);
    const firstError = Object.keys(result.errors)[0];
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }
    if (sending) return;
    setSending(true);
    setSendError(false);
    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...values,
          phone: result.phone.number,
          country,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok)
        throw new Error("Enquiry could not be sent");
      setValues(emptyValues);
      setSubmitted(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };
  const fieldProps = (key) => ({
    id: `contact-${key}`,
    name: key,
    value: values[key],
    required: true,
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
    onChange: (event) => setField(key, event.target.value),
  });
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="contact-form-heading">
        <div>
          <span>{arabic ? "استفسار عن مشروع" : "PROJECT ENQUIRY"}</span>
          <h3>
            {arabic ? "أرسل تفاصيل مشروعك" : "Send your brief"}
            <span>.</span>
          </h3>
          <p>
            {arabic
              ? "أخبرنا كيف نتواصل معك وسنناقش التفاصيل معاً."
              : "Tell us how to reach you. We’ll discuss the details together."}
          </p>
        </div>
        <span className="contact-required-key">
          {arabic ? "* مطلوب" : "* Required"}
        </span>
      </div>
      <div className="contact-form-grid">
        <div className="contact-field">
          <label htmlFor="contact-firstName">
            {arabic ? "الاسم الأول" : "First name"} <b>*</b>
          </label>
          <input
            {...fieldProps("firstName")}
            autoComplete="given-name"
            placeholder={arabic ? "اسمك الأول" : "Your first name"}
          />
          {errors.firstName && (
            <p className="contact-error" id="contact-firstName-error">
              {arabic ? arErrors.firstName : errors.firstName}
            </p>
          )}
        </div>
        <div className="contact-field">
          <label htmlFor="contact-lastName">
            {arabic ? "اسم العائلة" : "Last name"} <b>*</b>
          </label>
          <input
            {...fieldProps("lastName")}
            autoComplete="family-name"
            placeholder={arabic ? "اسم العائلة" : "Your last name"}
          />
          {errors.lastName && (
            <p className="contact-error" id="contact-lastName-error">
              {arabic ? arErrors.lastName : errors.lastName}
            </p>
          )}
        </div>
        <div className="contact-field contact-field-wide">
          <label htmlFor="contact-email">
            {arabic ? "البريد الإلكتروني" : "Email address"} <b>*</b>
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
          />
          {errors.email && (
            <p className="contact-error" id="contact-email-error">
              {arabic ? arErrors.email : errors.email}
            </p>
          )}
        </div>
        <div className="contact-field contact-field-wide country-field">
          <label htmlFor="contact-phone">
            {arabic ? "الهاتف / واتساب" : "Phone / WhatsApp"} <b>*</b>
          </label>
          <div className="contact-phone">
            <button
              id="contact-country"
              className="country-trigger phone-country-trigger"
              aria-label={
                arabic ? "اختر البلد أو المنطقة" : "Choose country or region"
              }
              type="button"
              aria-expanded={countryOpen}
              aria-controls="country-options"
              onClick={() => {
                setCountryOpen((open) => !open);
                setCountrySearch("");
              }}
            >
              <bdi dir="ltr">+{callingCode}</bdi>
              <span aria-hidden="true">{countryOpen ? "▴" : "▾"}</span>
            </button>
            <input
              {...fieldProps("phone")}
              type="tel"
              dir="ltr"
              autoComplete="tel-national"
              inputMode="tel"
              placeholder={arabic ? "رقم هاتفك" : "Your phone number"}
              onChange={(event) => {
                const raw = event.target.value;
                setField(
                  "phone",
                  raw.startsWith("+") ? raw : new AsYouType(country).input(raw),
                );
              }}
            />
          </div>
          {countryOpen && (
            <div
              className="country-panel"
              id="country-options"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setCountryOpen(false);
                  document.getElementById("contact-country")?.focus();
                }
              }}
            >
              <input
                autoFocus
                type="search"
                aria-label={arabic ? "البحث عن البلدان" : "Search countries"}
                placeholder={
                  arabic ? "ابحث عن البلد أو الرمز" : "Search country or code"
                }
                value={countrySearch}
                onChange={(event) => setCountrySearch(event.target.value)}
              />
              <div
                className="country-list"
                aria-label={arabic ? "البلدان" : "Countries"}
              >
                {matchingCountries.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    aria-pressed={item.code === country}
                    onClick={() => {
                      if (item.code !== country) {
                        setCountry(item.code);
                        setField("phone", "");
                      }
                      setCountryOpen(false);
                      document.getElementById("contact-country")?.focus();
                    }}
                  >
                    {arabic ? arabicCountryNames.of(item.code) : item.name}{" "}
                    <bdi dir="ltr">(+{item.callingCode})</bdi>
                  </button>
                ))}
                {matchingCountries.length === 0 && (
                  <p>
                    {arabic
                      ? "لم يتم العثور على بلدان."
                      : "No countries found."}
                  </p>
                )}
              </div>
            </div>
          )}
          {errors.phone && (
            <p className="contact-error" id="contact-phone-error">
              {arabic ? arErrors.phone : errors.phone}
            </p>
          )}
        </div>
      </div>
      <div className="contact-service">
        <div className="contact-service-heading">
          <span>
            {arabic ? "الخدمة المطلوبة" : "Service needed"}{" "}
            <small>{arabic ? "(اختياري)" : "(optional)"}</small>
          </span>
          <button
            type="button"
            aria-expanded={serviceOpen}
            aria-controls="contact-service-options"
            onClick={() => setServiceOpen((open) => !open)}
          >
            {values.service
              ? arabic
                ? arOptions[serviceOptions.indexOf(values.service)]
                : values.service
              : arabic
                ? "اختر خدمة"
                : "Choose a service"}{" "}
            <span aria-hidden="true">{serviceOpen ? "−" : "+"}</span>
          </button>
        </div>
        {serviceOpen && (
          <fieldset id="contact-service-options">
            <legend className="contact-sr-only">
              {arabic ? "اختر خدمة" : "Choose a service"}
            </legend>
            {serviceOptions.map((option, i) => (
              <label className="contact-service-option" key={option}>
                <input
                  type="radio"
                  name="service"
                  value={option}
                  checked={values.service === option}
                  onChange={() => {
                    setField("service", option);
                    setServiceOpen(false);
                  }}
                />
                <span>{arabic ? arOptions[i] : option}</span>
              </label>
            ))}
          </fieldset>
        )}
      </div>
      <div className="contact-field contact-message">
        <label htmlFor="contact-message">
          {arabic ? "تفاصيل المشروع" : "Project details"}{" "}
          <small>{arabic ? "(اختياري)" : "(optional)"}</small>
        </label>
        <textarea
          id="contact-message"
          value={values.message}
          onChange={(event) => setField("message", event.target.value)}
          rows="4"
          placeholder={
            arabic
              ? "أخبرنا عن مشروعك أو نطاق العمل أو الجدول الزمني."
              : "Share your project, scope or timeline."
          }
        />
      </div>
      <button className="contact-submit" type="submit" disabled={sending}>
        {sending
          ? arabic
            ? "جارٍ الإرسال…"
            : "Sending…"
          : arabic
            ? "إرسال الاستفسار"
            : "Send enquiry"}{" "}
        <ArrowUpRight size={18} />
      </button>
      <p className="contact-form-note" role="status">
        {sendError
          ? arabic
            ? "تعذر إرسال الاستفسار. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرةً على support@empiredesignae.com."
            : "We could not send your enquiry. Please try again or email support@empiredesignae.com directly."
          : submitted
            ? arabic
              ? "تم إرسال استفسارك. شكراً لتواصلك معنا."
              : "Your enquiry has been sent. Thank you for contacting us."
            : arabic
              ? "سنرسل استفسارك مباشرةً إلى فريقنا."
              : "Your enquiry will be sent directly to our team."}
      </p>
    </form>
  );
}
