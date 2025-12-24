console.log("✅ main.js loaded");

// =============================
// Mobile Menu Toggle (SAFE)
// =============================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// =============================
// WhatsApp Message Sender
// =============================
function sendToWhatsApp() {
  const destination = document.getElementById("destination").value;
  const travelDate = document.getElementById("travelDate").value;
  const travelers = document.getElementById("travelers").value;
  const duration = document.getElementById("duration").value;
  const requests = document.getElementById("requests").value;

  const styleInput = document.querySelector('input[name="style"]:checked');
  const style = styleInput ? styleInput.value : "Not specified";

  const message = `New Trip Enquiry 🚀

Destination: ${destination}
Travel Date: ${travelDate}
Travelers: ${travelers}
Duration: ${duration}
Trip Style: ${style}

Additional Requests:
${requests}`;

  const phoneNumber = "917042857001";
  window.open(
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

// =============================
// Form Validation
// =============================
function isFormValid() {
  const destination = document.getElementById("destination");
  const travelDate = document.getElementById("travelDate");
  const travelers = document.getElementById("travelers");
  const duration = document.getElementById("duration");
  const error = document.getElementById("formError");

  if (
    !destination?.value.trim() ||
    !travelDate?.value ||
    !travelers?.value ||
    !duration?.value
  ) {
    error?.classList.remove("hidden");
    return false;
  }

  error?.classList.add("hidden");
  return true;
}

function validateAndSendWhatsApp() {
  if (!isFormValid()) return;
  sendToWhatsApp();
}

function validateAndCall() {
  if (!isFormValid()) return;
  window.location.href = "tel:+917042857001";
}

// =============================
// Expose to HTML
// =============================
window.validateAndSendWhatsApp = validateAndSendWhatsApp;
window.validateAndCall = validateAndCall;
