function scrollToPay() {
  document.getElementById("pay").scrollIntoView({ behavior: "smooth" });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Ghana phone validation
function isValidGhanaNumber(phone) {
  const ghanaRegex = /^(024|054|055|059|020|050|027|057|026|056)\d{7}$/;
  return ghanaRegex.test(phone);
}

// Generate unique Paystack reference
function generateReference() {
  return "STACKED_" + Math.floor(Math.random() * 1000000000) + "_" + Date.now();
}

document.getElementById("entryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!isValidEmail(email)) {
    alert("❌ Please enter a valid email address.");
    return;
  }

  if (!isValidGhanaNumber(phone)) {
    alert(
      "❌ Please enter a valid Ghana WhatsApp number.\n\n" +
      "MTN: 024, 054, 055, 059\n" +
      "Telecel: 020, 050\n" +
      "AirtelTigo: 027, 057, 026, 056"
    );
    return;
  }

  let handler = PaystackPop.setup({
    key: "pk_live_8a7ac0a714d353356d6db58b4a3643bcf20f6aa4",
    email: email,
    amount: 7500,
    currency: "GHS",
    ref: generateReference(),
    channels: ["mobilemoney"],

    metadata: {
      custom_fields: [
        {
          display_name: "WhatsApp Number",
          variable_name: "whatsapp",
          value: phone
        }
      ]
    },

    callback: function (response) {
      fetch("https://stacked-giveaway-backend.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: response.reference })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            window.location.href =
              "success.html?email=" + encodeURIComponent(email);
          } else {
            alert("❌ Payment could not be verified.");
          }
        })
        .catch(() => {
          alert("❌ Verification error. Try again.");
        });
    },

    onClose: function () {
      alert("❌ Payment cancelled.");
    }
  });

  handler.openIframe();
});

// Instagram deep link
document.getElementById("instagram-link").addEventListener("click", function (e) {
  e.preventDefault();

  const appLink = "instagram://user?username=Stacked.giveaway";
  const webLink = "https://www.instagram.com/Stacked.giveaway";

  window.location = appLink;
  setTimeout(() => window.open(webLink, "_blank"), 1000);
});

function scrollToPay() {
  document.getElementById("pay").scrollIntoView({ behavior: "smooth" });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Ghana phone validation
function isValidGhanaNumber(phone) {
  const ghanaRegex = /^(024|054|055|059|020|050|027|057|026|056)\d{7}$/;
  return ghanaRegex.test(phone);
}

// Generate unique Paystack reference
function generateReference() {
  return "STACKED_" + Math.floor(Math.random() * 1000000000) + "_" + Date.now();
}

document.getElementById("entryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!isValidEmail(email)) {
    alert("❌ Please enter a valid email address.");
    return;
  }

  if (!isValidGhanaNumber(phone)) {
    alert(
      "❌ Please enter a valid Ghana WhatsApp number.\n\n" +
      "MTN: 024, 054, 055, 059\n" +
      "Telecel: 020, 050\n" +
      "AirtelTigo: 027, 057, 026, 056"
    );
    return;
  }

  let handler = PaystackPop.setup({
    key: "pk_live_8a7ac0a714d353356d6db58b4a3643bcf20f6aa4",
    email: email,
    amount: 7500,
    currency: "GHS",
    ref: generateReference(),
    channels: ["mobilemoney"],

    metadata: {
      custom_fields: [
        {
          display_name: "WhatsApp Number",
          variable_name: "whatsapp",
          value: phone
        }
      ]
    },

    callback: function (response) {
      fetch("https://stacked-giveaway-backend.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: response.reference })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            window.location.href =
              "success.html?email=" + encodeURIComponent(email);
          } else {
            alert("❌ Payment could not be verified.");
          }
        })
        .catch(() => {
          alert("❌ Verification error. Try again.");
        });
    },

    onClose: function () {
      alert("❌ Payment cancelled.");
    }
  });

  handler.openIframe();
});

// Instagram deep link
document.getElementById("instagram-link").addEventListener("click", function (e) {
  e.preventDefault();

  const appLink = "instagram://user?username=Stacked.giveaway";
  const webLink = "https://www.instagram.com/Stacked.giveaway";

  window.location = appLink;
  setTimeout(() => window.open(webLink, "_blank"), 1000);
});
