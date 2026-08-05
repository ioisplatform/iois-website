// AUTO REFERRAL DETECTION FROM URL
document.addEventListener("DOMContentLoaded", function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const refCode = urlParams.get('ref');
        if (refCode) {
            const sponsorField = document.getElementById("reg-sponsor-id");
            if (sponsorField) {
                sponsorField.value = refCode.trim();
            }
            // Auto open registration modal if user came via referral link
            if (typeof window.openRegistrationFlow === "function") {
                window.openRegistrationFlow();
            }
        }
    } catch (e) {
        console.log("URL parsing:", e);
    }
});

function highlightErrorField(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.classList.add("border-red-500", "bg-red-950/40");
        el.focus();
    }
}

function resetFormErrors() {
    const fields = ["reg-name", "reg-email", "reg-phone", "reg-pass", "reg-address", "reg-upi", "reg-qr-file"];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove("border-red-500", "bg-red-950/40");
    });
}

// FORM SUBMIT WITH STRICT CHECK
function handleDetailsSubmit(event) {
    event.preventDefault();
    resetFormErrors();

    const name = document.getElementById("reg-name")?.value.trim();
    const email = document.getElementById("reg-email")?.value.trim();
    const phone = document.getElementById("reg-phone")?.value.trim();
    const pass = document.getElementById("reg-pass")?.value.trim();
    const address = document.getElementById("reg-address")?.value.trim();
    const upi = document.getElementById("reg-upi")?.value.trim();
    const qrFiles = document.getElementById("reg-qr-file")?.files;

    if (!name || name.length < 2) {
        highlightErrorField("reg-name");
        alert("मिसटेक: कृपया अपना पूरा नाम दर्ज करें!");
        return;
    }

    if (!email || !email.includes("@")) {
        highlightErrorField("reg-email");
        alert("मिसटेक: कृपया सही ईमेल एड्रेस दर्ज करें!");
        return;
    }

    if (!phone || phone.replace(/\D/g, '').length < 10) {
        highlightErrorField("reg-phone");
        alert("मिसटेक: कृपया 10 अंकों का व्हाट्सएप नंबर दर्ज करें!");
        return;
    }

    if (!pass || pass.length < 4) {
        highlightErrorField("reg-pass");
        alert("मिसटेक: कृपया कम से कम 4 अक्षरों का पासवर्ड बनाएँ!");
        return;
    }

    if (!address || address.length < 4) {
        highlightErrorField("reg-address");
        alert("मिसटेक: कृपया अपना पूरा पता दर्ज करें!");
        return;
    }

    if (!upi || !upi.includes("@")) {
        highlightErrorField("reg-upi");
        alert("मिसटेक: कृपया सही UPI ID दर्ज करें! (उदा: 8877490845@spicepay, name@upi)");
        return;
    }

    if (!qrFiles || qrFiles.length === 0) {
        highlightErrorField("reg-qr-file");
        alert("मिसटेक: कृपया अपना पेमेंट QR कोड फ़ोटो चुनें!");
        return;
    }

    const autoUserId = "IOIS" + Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem("iois_user_name", name);
    localStorage.setItem("iois_user_email", email);
    localStorage.setItem("iois_user_phone", phone.replace(/\D/g, ''));
    localStorage.setItem("iois_user_pass", pass);
    localStorage.setItem("iois_user_address", address);
    localStorage.setItem("iois_user_upi", upi);
    localStorage.setItem("iois_user_id", autoUserId);

    alert(`रजिस्ट्रेशन 100% सफल!\n\nआपकी स्थायी User ID है: [${autoUserId}]\n\nअब Step 2 में ₹10 पे करें।`);

    document.getElementById("reg-modal")?.classList.add("hidden");
    document.getElementById("payment-modal")?.classList.remove("hidden");
}

function validateFileSize(input) {
    if (input.files && input.files[0]) {
        if (input.files[0].size > 25 * 1024 * 1024) {
            alert("फ़ाइल 25 MB से बड़ी है! कृपया 25 MB से कम साइज़ की इमेज चुनें।");
            input.value = "";
        }
    }
}

function handleScreenshotSubmit(event) {
    event.preventDefault();
    const name = localStorage.getItem("iois_user_name") || "User";
    const userid = localStorage.getItem("iois_user_id") || "ID";

    const msg = `Hello IOIS Admin, Maine ₹10 ka payment kar diya hai.%0AName: ${name}%0AFixed User ID: ${userid}%0AKripya mera Digital Starter Kit aur Dashboard activate karein.`;

    alert("स्क्रीनशॉट सबमिट हो गया! अब वेरिफिकेशन के लिए WhatsApp खुल रहा है।");
    window.open(`https://wa.me/918877490845?text=${msg}`, "_blank");
    closeModals();
}

function handleLoginSubmit(event) {
    event.preventDefault();
    const useridInput = document.getElementById("login-userid")?.value.trim();
    const passInput = document.getElementById("login-pass")?.value.trim();

    if (useridInput.toLowerCase() === "admin" && passInput === "admin123") {
        window.location.href = "admin.html";
        return;
    }

    const savedUserId = localStorage.getItem("iois_user_id");
    const savedPass = localStorage.getItem("iois_user_pass");

    if (!savedUserId) {
        alert("⚠️ कोई अकाउंट नहीं मिला! कृपया पहले 'Register' करके ₹10 किट खरीदें।");
        return;
    }

    if (useridInput === savedUserId && passInput === savedPass) {
        alert(`लॉगिन सफल! स्वागत है [${savedUserId}]`);
        window.location.href = "dashboard.html";
    } else {
        alert("⚠️ गलत User ID या Password!");
    }
}

// REAL FORGOT USER ID SUBMIT
function handleForgotIDSubmit(event) {
    event.preventDefault();
    const input = document.getElementById("forgot-contact-input")?.value.trim();
    const savedEmail = localStorage.getItem("iois_user_email");
    const savedPhone = localStorage.getItem("iois_user_phone");
    const savedUserId = localStorage.getItem("iois_user_id");

    if ((input === savedEmail || input === savedPhone) && savedUserId) {
        alert(`✅ खाता मिल गया!\n\nआपकी Fixed User ID है: [${savedUserId}]`);
        closeModals();
    } else {
        alert("⚠️ इस ईमेल या व्हाट्सएप नंबर से कोई अकाउंट नहीं मिला!");
    }
}

// REAL RESET PASSWORD SUBMIT
function handleResetPasswordSubmit(event) {
    event.preventDefault();
    const userid = document.getElementById("reset-userid-input")?.value.trim();
    const contact = document.getElementById("reset-contact-input")?.value.trim();
    const newPass = document.getElementById("reset-newpass-input")?.value.trim();

    const savedUserId = localStorage.getItem("iois_user_id");
    const savedEmail = localStorage.getItem("iois_user_email");
    const savedPhone = localStorage.getItem("iois_user_phone");

    if (userid === savedUserId && (contact === savedEmail || contact === savedPhone)) {
        localStorage.setItem("iois_user_pass", newPass);
        alert("✅ पासवर्ड सफलतापूर्वक बदल दिया गया है! अब नए पासवर्ड से लॉगिन करें।");
        closeModals();
    } else {
        alert("⚠️ User ID या रजिस्टर्ड ईमेल/नंबर मैच नहीं हुआ!");
    }
}

function userLogout() {
    alert("Logged out successfully!");
    window.location.href = "index.html";
}

function requestWithdrawal() {
    const userid = localStorage.getItem("iois_user_id") || "User";
    const upi = localStorage.getItem("iois_user_upi") || "UPI";
    const msg = `Hello Admin, Main [${userid}] apna referral withdrawal request kar raha hu. Mera UPI ID hai: ${upi}`;
    window.open(`https://wa.me/918877490845?text=${msg}`, "_blank");
}

function copyRefLink() {
    const refInput = document.getElementById("ref-link");
    if (refInput) {
        navigator.clipboard.writeText(refInput.value);
        alert("Aapka unique referral link copy ho gaya hai!");
    }
}
