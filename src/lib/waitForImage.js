// Resolves once an image has loaded, or immediately if it already has.
// Errors resolve too: a missing image should not stall whatever is waiting.
export const waitForImage = (img) =>
  !img || img.complete
    ? Promise.resolve()
    : new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
