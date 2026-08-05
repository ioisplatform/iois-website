/* ==========================================================================
   IOIS PLATFORM - UNIVERSAL MASTER SCRIPT
   Indian Online Income Supporting System
   ========================================================================== */

// 1. GLOBAL MOBILE HAMBURGER MENU TOGGLE
window.toggleMobileMenu = function () {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) {
        mobileMenu.classList.toggle("hidden");
    }
};

// 2. AUTO-DETECT REFERRAL CODE FROM URL (?ref=IOIS123456)
document.addEventListener("DOMContentLoaded", function () {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const refCode = urlParams.get('ref');

        if (refCode) {
            const sponsorField = document.getElementById("reg-sponsor-id");
            if (sponsorField) {
                sponsorField.value = refCode.trim();
                sponsorField.classList.add("border-amber-400", "text-amber-400", "font-bold");
            }
            // ऑटोमैटिक रजिस्ट्रेशन फ़ॉर्म खोलें अगर रेफरल लिंक से आए हैं
            if (typeof window.openRegistrationFlow === "function") {
                window.openRegistrationFlow();
            }
        }
    } catch (e) {
        console.log("URL Params Parse Error:", e);
    }
});

// 3. CLOSE ALL MODALS / POPUPS
window.closeModals = function () {
    const modalIds = ["reg-modal", "payment-modal", "login-modal", "forgot-id-modal", "reset-pass-modal"];
    modalIds.forEach(id => {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add("hidden");
    });
};

// 4. MODAL OPEN TRIGGERS
window.openRegistrationFlow = function () {
    window.closeModals();
    document.getElementById("reg-modal")?.classList.remove("hidden");
};

window.openLoginModal = function () {
    window.closeModals();
    document.getElementById("login-modal")?.classList.remove("hidden");
};

window.openForgotIDModal = function () {
    window.closeModals();
    document.getElementById("forgot-id-modal")?.classList.remove("hidden");
};

window.openResetPasswordModal = function () {
    window.closeModals();
    document.getElementById("reset-pass-modal")?.classList.remove("hidden");
};

// 5. FORM ERROR HIGHLIGHTING & RESET FUNCTIONS
function resetFormErrors() {
    const fields = ["reg-name", "reg-email", "reg-phone", "reg-pass", "reg-address", "reg-upi", "reg-qr-file"];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove("border-red-500", "bg-red-950/40", "text-red-200");
            el.classList.add("border-gray-700", "bg-[#080d1e]", "text-white");
        }
    });
}

function highlightErrorField(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.classList.remove("border-gray-700", "bg-[#080d1e]");
        el.classList.add("border-red-500", "bg-red-950/40", "text-red-200");
        el.focus(); // गलत बॉक्स पर स्क्रीन ले जाएगा
    }
}

// 6. STRICT REGISTRATION FORM VALIDATION & SUBMISSION
window.handleDetailsSubmit = function (event) {
    event.preventDefault(); // फ़ॉर्म रीलोड रोकेगा
    resetFormErrors();

    const nameEl = document.getElementById("reg-name");
    const emailEl = document.getElementById("reg-email");
    const phoneEl = document.getElementById("reg-phone");
    const passEl = document.getElementById("reg-pass");
    const addressEl = document.getElementById("reg-address");
    const upiEl = document.getElementById("reg-upi");
    const qrFileEl = document.getElementById("reg-qr-file");

    const name = nameEl ? nameEl.value.trim() : "";
    const email = emailEl ? emailEl.value.trim() : "";
    const phone = phoneEl ? phoneEl.value.trim() : "";
    const pass = passEl ? passEl.value.trim() : "";
    const address = addressEl ? addressEl.value.trim() : "";
    const upi = upiEl ? upiEl.value.trim() : "";
    const qrFiles = qrFileEl ? qrFileEl.files : [];

    // 6.1 Validate Full Name
    if (!name || name.length < 2) {
        highlightErrorField("reg-name");
        alert("⚠️ मिसटेक (Error Alert):\n\n[पूरा नाम अधूरा है]\nकृपया अपना सही और पूरा नाम दर्ज करें!");
        return;
    }

    // 6.2 Validate Email Address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        highlightErrorField("reg-email");
        alert("⚠️ मिसटेक (Error Alert):\n\n[गलत ईमेल एड्रेस]\nकृपया सही ईमेल एड्रेस दर्ज करें! (उदाहरण: name@example.com)");
        return;
    }

    // 6.3 Validate Phone Number (10 digits)
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone || cleanPhone.length < 10) {
        highlightErrorField("reg-phone");
        alert("⚠️ मिसटेक (Error Alert):\n\n[गलत व्हाट्सएप नंबर]\nकृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें!");
        return;
    }

    // 6.4 Validate Password (min 4 chars)
    if (!pass || pass.length < 4) {
        highlightErrorField("reg-pass");
        alert("⚠️ मिसटेक (Error Alert):\n\n[कमज़ोर पासवर्ड]\nकृपया कम से कम 4 अक्षरों का पासवर्ड सेट करें!");
        return;
    }

    // 6.5 Validate Full Address
    if (!address || address.length < 4) {
        highlightErrorField("reg-address");
        alert("⚠️ मिसटेक (Error Alert):\n\n[पता अधूरा है]\nकृपया अपना पूरा पता (Address) दर्ज करें!");
        return;
    }

    // 6.6 Validate Real UPI ID (Flexibly accepts name@upi, 8877490845@spicepay, number@paytm, name@okaxis)
    const upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    if (!upi || !upiPattern.test(upi)) {
        highlightErrorField("reg-upi");
        alert("⚠️ मिसटेक (Error Alert):\n\n[गलत UPI ID Format]\nकृपया अपनी सही UPI ID दर्ज करें!\nउदाहरण: username@upi, 9876543210@paytm, 8877490845@spicepay");
        return;
    }

    // 6.7 Validate Payment QR File Selection
    if (!qrFiles || qrFiles.length === 0) {
        highlightErrorField("reg-qr-file");
        alert("⚠️ मिसटेक (Error Alert):\n\n[QR कोड फ़ाइल गायब है]\nकृपया अपना विथड्रॉल UPI QR कोड इमेज सेलेक्ट करें!");
        return;
    }

    // Auto-Generate Permanent Fixed User ID / Refer Code
    const autoUserId = "IOIS" + Math.floor(100000 + Math.random() * 900000);

    // Save strictly to local storage
    localStorage.setItem("iois_user_name", name);
    localStorage.setItem("iois_user_email", email);
    localStorage.setItem("iois_user_phone", cleanPhone);
    localStorage.setItem("iois_user_pass", pass);
    localStorage.setItem("iois_user_address", address);
    localStorage.setItem("iois_user_upi", upi);
    localStorage.setItem("iois_user_id", autoUserId);

    alert(`✅ रजिस्ट्रेशन 100% सफल!\n\nआपकी स्थायी User ID है: [${autoUserId}]\n\nअब Step 2 में ₹10 की किट पेमेंट करें।`);
    
    document.getElementById("reg-modal")?.classList.add("hidden");
    document.getElementById("payment-modal")?.classList.remove("hidden");
};

// 7. FILE SIZE VALIDATION (MAX 25 MB)
window.validateFileSize = function (input) {
    if (input && input.files && input.files[0]) {
        const file = input.files[0];
        const maxSizeBytes = 25 * 1024 * 1024; // 25 MB
        if (file.size > maxSizeBytes) {
            highlightErrorField(input.id);
            alert(`⚠️ मिसटेक (Error Alert):\n\n[फ़ाइल बहुत बड़ी है]\nआपकी फ़ाइल का साइज़ 25 MB से बड़ा है! (${(file.size / (1024 * 1024)).toFixed(2)} MB)\nकृपया 25 MB से कम साइज़ की इमेज चुनें।`);
            input.value = ""; 
        } else {
            input.classList.remove("border-red-500", "bg-red-950/40");
            input.classList.add("border-gray-700", "bg-[#080d1e]");
        }
    }
};

// 8. SCREENSHOT SUBMIT TO ADMIN WHATSAPP
window.handleScreenshotSubmit = function (event) {
    event.preventDefault();
    const name = localStorage.getItem("iois_user_name") || "User";
    const userid = localStorage.getItem("iois_user_id") || "ID";

    const msg = `Hello IOIS Admin, Maine ₹10 ka payment kar diya hai.%0AName: ${name}%0AFixed User ID: ${userid}%0AKripya mera Digital Starter Kit aur Dashboard activate karein.`;
    
    alert("स्क्रीनशॉट सबमिट हो गया! वेरिफिकेशन के लिए अब WhatsApp खोलें।");
    window.open(`https://wa.me/918877490845?text=${msg}`, "_blank");
    window.closeModals();
};

// 9. STRICT LOGIN VERIFICATION
window.handleLoginSubmit = function (event) {
    event.preventDefault();
    const useridInput = document.getElementById("login-userid")?.value.trim();
    const passInput = document.getElementById("login-pass")?.value.trim();

    // 9.1 Admin Login Check (User ID: admin , Pass: admin123)
    if (useridInput && useridInput.toLowerCase() === "admin" && passInput === "admin123") {
        alert("Admin Login Successful!");
        window.location.href = "admin.html";
        return;
    }

    // 9.2 User Login Check
    const savedUserId = localStorage.getItem("iois_user_id");
    const savedPass = localStorage.getItem("iois_user_pass");

    if (!savedUserId) {
        alert("⚠️ कोई अकाउंट नहीं मिला! कृपया पहले 'Register' करके ₹10 किट खरीदें।");
        return;
    }

    if (useridInput === savedUserId && passInput === savedPass) {
        localStorage.setItem("iois_user_id", savedUserId); // Set active session ID
        alert(`लॉगिन सफल! स्वागत है [${savedUserId}]`);
        window.location.href = "dashboard.html";
    } else {
        alert("⚠️ गलत User ID या Password!");
    }
};

// 10. REAL FORGOT USER ID RECOVERY
window.handleForgotIDSubmit = function (event) {
    event.preventDefault();
    const input = document.getElementById("forgot-contact-input")?.value.trim();
    const savedEmail = localStorage.getItem("iois_user_email");
    const savedPhone = localStorage.getItem("iois_user_phone");
    const savedUserId = localStorage.getItem("iois_user_id");

    if ((input === savedEmail || input === savedPhone) && savedUserId) {
        alert(`✅ खाता मिल गया!\n\nआपकी स्थायी Fixed User ID है: [${savedUserId}]`);
        window.closeModals();
    } else {
        alert("⚠️ इस ईमेल या व्हाट्सएप नंबर से कोई अकाउंट नहीं मिला!");
    }
};

// 11. REAL RESET PASSWORD SUBMIT
window.handleResetPasswordSubmit = function (event) {
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
        window.closeModals();
    } else {
        alert("⚠️ User ID या रजिस्टर्ड ईमेल/नंबर मैच नहीं हुआ!");
    }
};

// 12. USER LOGOUT
window.userLogout = function () {
    alert("Logged out successfully!");
    window.location.href = "index.html";
};

// 13. REQUEST WITHDRAWAL TO ADMIN WHATSAPP
window.requestWithdrawal = function () {
    const userid = localStorage.getItem("iois_user_id") || "User";
    const upi = localStorage.getItem("iois_user_upi") || "UPI";
    const msg = `Hello Admin, Main [${userid}] apna referral withdrawal request kar raha hu. Mera UPI ID hai: ${upi}`;
    window.open(`https://wa.me/918877490845?text=${msg}`, "_blank");
};

// 14. COPY REFERRAL LINK TO CLIPBOARD
window.copyRefLink = function () {
    const refInput = document.getElementById("ref-link");
    if (refInput) {
        navigator.clipboard.writeText(refInput.value);
        alert("Aapka unique referral link copy ho gaya hai!");
    }
};

// 15. COPY OFFICIAL UPI ID
window.copyUPI = function () {
    navigator.clipboard.writeText("8877490845@spicepay").then(() => {
        alert("UPI ID (8877490845@spicepay) copied!");
    });
};
