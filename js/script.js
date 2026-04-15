// TYPING EFFECT (only on pages where typing-text exists)
const typing = document.getElementById("typing");
if (typing) {
  const words = [
    "Laptop, Computer & MacBook Repair at Home",
    "Windows & MS Office Genuine License",
    "Data Recovery, SSD/RAM Upgrade & Deep Cleaning",
    "Doorstep IT Service in Gurugram (HR)",
    "OS installation"
  ];
  let i = 0, j = 0, del = false;
  (function type() {
    typing.textContent = words[i].slice(0, j);
    if (!del) j++; else j--;
    if (j === words[i].length) del = true;
    if (j === 0 && del) { del = false; i = (i + 1) % words.length; }
    setTimeout(type, del ? 40 : 80);
  })();
}

// COMMON WHATSAPP NUMBER
const WA_NUMBER = "917836872230";

// QUICK WHATSAPP ENQUIRY FORM (HOME PAGE)
const waSendBtn = document.getElementById("wa-send");
if (waSendBtn) {
  waSendBtn.addEventListener("click", () => {
    const name = (document.getElementById("wa-name").value || "").trim();
    const loc = (document.getElementById("wa-location").value || "").trim();
    const service = document.getElementById("wa-service").value;
    const issue = (document.getElementById("wa-issue").value || "").trim();

    if (!name || !loc) {
      alert("Please enter your name and location.");
      return;
    }

    let msg = "New Service Enquiry - IT WORLD THE COMPUTER ITSOLUTION\n\n";
    msg += "Name: " + name + "\n";
    msg += "Location: " + loc + "\n";
    msg += "Service: " + service + "\n";
    if (issue) msg += "Issue: " + issue + "\n";

    const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
  });
}





// ------- WHATSAPP BOOKING BUTTONS (Service & Pricing page) ----------
const WA_BOOK_NUMBER = "917836872230"; // same WhatsApp number

function openWhatsAppBooking(service, price) {
  const msg =
    `Hi IT WORLD THE COMPUTER ITSOLUTION,\n` +
    `I want to book *${service}* service` +
    (price ? ` (starts from ${price})` : ``) +
    `. \nPlease share the final estimate and earliest home service slot.\n` +
    `Location: Gurugram`;

  const url = "https://wa.me/" + WA_BOOK_NUMBER + "?text=" + encodeURIComponent(msg);
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  const bookButtons = document.querySelectorAll(".wa-book-btn");
  if (!bookButtons.length) return;

  bookButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const service = this.dataset.service || "Service";
      const price   = this.dataset.price  || "";
      openWhatsAppBooking(service, price);
    });
  });
});





