const PHONE_NUMBER = "917042857001";

function sendWhatsApp(button) {
  const form = button.closest("[data-form]");
  if (!form) return;

  // ✅ TRIGGER HTML5 REQUIRED VALIDATION
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formName = form.getAttribute("data-form");
  let message = `New ${formName.toUpperCase()} Enquiry 🚀\n\n`;

  form.querySelectorAll("[data-field]").forEach(el => {
    const label = el.dataset.field;
    const value = el.value.trim();
    message += `${label}: ${value}\n`;
  });

  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
