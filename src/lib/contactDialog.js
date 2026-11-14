// Every "send your brief" button opens the same modal.
import { page } from "./routing.js";

export const CONTACT_EVENT = "empire:open-contact";
export const openContactDialog = (event) => {
  if (
    event &&
    (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
  )
    return;
  event?.preventDefault();
  if (page === "contact") {
    document
      .getElementById("enquiry")
      ?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  window.dispatchEvent(new CustomEvent(CONTACT_EVENT));
};
