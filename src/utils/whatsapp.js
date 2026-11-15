export const WHATSAPP_NUMBER = "919354962122";
export const PHONE_NUMBER = "+918851722264";
export const DISPLAY_PHONE_NUMBER = "+91 88517 22264";
export const SECONDARY_PHONE_NUMBER = "+919354962122";
export const SECONDARY_DISPLAY_PHONE_NUMBER = "+91 93549 62122";

export function openWhatsApp(message) {
  const text = typeof message === 'string' ? message : JSON.stringify(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

export function sendWhatsAppQuick() {
  const message = `Hello 👋\nI would like to enquire about your travel services.`;
  openWhatsApp(message);
}

export const openWhatsAppQuick = sendWhatsAppQuick;
export const sendQuickWhatsApp = sendWhatsAppQuick;

export function sendWhatsAppForm(formName, fields) {
  let message = `New ${formName.toUpperCase()} Enquiry 🚀\n\n`;
  for (const [key, val] of Object.entries(fields)) {
    if (val !== undefined && val !== null && val !== '') {
      message += `${key}: ${val}\n`;
    }
  }
  openWhatsApp(message);
}

export function sendTripEnquiry({ destination, travelDate, travelers, duration, style, requests }) {
  const message = `New Trip Enquiry 🚀

Destination: ${destination || 'Not specified'}
Travel Date: ${travelDate || 'Not specified'}
Travelers: ${travelers || 'Not specified'}
Duration: ${duration || 'Not specified'}
Trip Style: ${style || 'Not specified'}

Additional Requests:
${requests || 'None'}`;

  openWhatsApp(message);
}
