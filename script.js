// ================= SCROLL TO PAY =================
function scrollToPay() {
  document.getElementById("pay").scrollIntoView({ behavior: "smooth" });
}

// ================= EMAIL & PHONE VALIDATION =================
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidGhanaNumber(phone) {
  const ghanaRegex = /^(024|053|054|055|059|020|050|027|057|026|056)\d{7}$/;
  return ghanaRegex.test(phone);
}

// ================= DETECT NETWORK PROVIDER =================
function detectProvider(phone) {
  // MTN
  if (
    phone.startsWith("024") ||
    phone.startsWith("053") ||
    phone.startsWith("054") ||
    phone.startsWith("055") ||
    phone.startsWith("059")
  ) {
    return "mtn";
  }

  // Telecel (Vodafone)
  if (phone.startsWith("020") || phone.startsWith("050")) {
    return "vod";
  }

  // AirtelTigo
  if (
    phone.startsWith("027") ||
    phone.startsWith("057") ||
    phone.startsWith("026") ||
    phone.startsWith("056")
  ) {
    return "atl";
  }

  return null;
}

// ================= HANDLE PAYMENT =================
document.getElementById("entryForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!isValidEmail(email)) {
    alert("❌ Please enter a valid email address.");
    return;
  }

  if (!isValidGhanaNumber(phone)) {
    alert(
      "❌ Please enter a valid Ghana phone number.\n\n" +
      "MTN: 024, 053, 054, 055, 059\n" +
      "Telecel: 020, 050\n" +
      "AirtelTigo: 027, 057, 026, 056"
    );
    return;
  }

  const provider = detectProvider(phone);

  if (!provider) {
    alert("❌ Unable to detect mobile network.");
    return;
  }

  try {
    const response = await fetch(
      "https://stacked-giveaway-backend.onrender.com/initialize-payment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          amount: 7500, // GHS 75 (pesewas)
          phone: phone,
          provider: provider
        })
      }
    );

    const data = await response.json();

    if (data.status && data.data.authorization_url) {
      // ✅ Paystack hosted checkout (card, momo, bank, ussd)
      window.location.href = data.data.authorization_url;
    } else {
      alert("❌ Payment could not be started. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("❌ Network error. Please try again.");
  }
});

// ================= INSTAGRAM DEEP LINK =================
document.getElementById("instagram-link").addEventListener("click", function (e) {
  e.preventDefault();

  const appLink = "instagram://user?username=Stacked.giveaway";
  const webLink = "https://www.instagram.com/Stacked.giveaway";

  window.location = appLink;
  setTimeout(() => window.open(webLink, "_blank"), 1000);
});

// ================= HERO SLIDESHOW =================
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showNextSlide() {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[currentSlide].classList.add("active");
  currentSlide = (currentSlide + 1) % slides.length;
}

if (slides.length > 0) {
  slides[0].classList.add("active");
  setInterval(showNextSlide, 3000);
}
