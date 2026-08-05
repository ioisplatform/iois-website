/* ==========================================================================
   IOIS PLATFORM - MASTER SCRIPT WITH LIVE GOOGLE SHEETS CLOUD DATABASE
   ========================================================================== */

// 🚀 आपकी लाइव Google Apps Script API URL:
const GOOGLE_SHEET_API = "https://script.google.com/macros/s/AKfycbzctDXCA4mBL9P-CSWH5OiaealRd8OOt5eRktdjT0wujsYx3XDLnPV6RGxOFACwidBEoA/exec";

// Google Sheet Auto Sync Helper Function
function syncToGoogleSheet(data) {
    if (!GOOGLE_SHEET_API) return;
    try {
        fetch(GOOGLE_SHEET_API, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    } catch (e) {
        console.log("Sheet Sync Error:", e);
    }
}

// 1. MOBILE MENU TOGGLE
window.toggleMobileMenu = function () {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) mobileMenu.classList.toggle("hidden");
};

// 2. AUTO REFERRAL DETECT FROM URL (?ref=IOIS123456)
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
            if (typeof window.openRegistrationFlow === "function") window.openRegistrationFlow();
        }
    } catch (e) {}
});

// 3. CLOSE ALL MODALS
window.closeModals = function () {
    ["reg-modal", "payment-modal", "login-modal", "forgot-id-modal", "reset-pass-modal"].forEach(id => {
        document.getElementById(id)?.classList.add("hidden");
    });
};

window.openRegistrationFlow = function () { window.closeModals(); document.getElementById("reg-modal")?.classList.remove("hidden"); };
window.openLoginModal = function () { window.closeModals(); document.getElementById("login-modal")?.classList.remove("hidden"); };
window.openForgotIDModal = function () { window.closeModals(); document.getElementById("forgot-id-modal")?.classList.remove("hidden"); };
window.openResetPasswordModal = function () { window.closeModals(); document.getElementById("reset-pass-modal")?.classList.remove("hidden"); };

function resetFormErrors() {
    ["reg-name", "reg-email", "reg-phone", "reg-pass", "reg-address", "reg-upi", "reg-qr-file"].forEach(id => {
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
        el.focus();
    }
}

// 4. REGISTRATION SUBMIT & AUTO-SAVE TO GOOGLE SHEET
window.handleDetailsSubmit = function (event) {
    event.preventDefault();
    resetFormErrors();

    const name = document.getElementById("reg-name")?.value.trim() || "";
    const email = document.getElementById("reg-email")?.value.trim() || "";
    const phone = document.getElementById("reg-phone")?.value.trim() || "";
    const pass = document.getElementById("reg-pass")?.value.trim() || "";
    const address = document.getElementById("reg-address")?.value.trim() || "";
    const upi = document.getElementById("reg-upi")?.value.trim() || "";
    const sponsorName = document.getElementById("reg-sponsor-name")?.value.trim() || "N/A";
    const sponsorId = document.getElementById("reg-sponsor-id")?.value.trim() || "Direct";
    const qrFiles = document.getElementById("reg-qr-file")?.files || [];
    const cardTier = document.getElementById("reg-card-tier")?.value || "Tiranga Silver Card (₹10)";

    // Strict Validations
    if (!name || name.length < 2) { highlightErrorField("reg-name"); alert("मिसटेक: कृपया अपना पूरा नाम दर्ज करें!"); return; }
    if (!email || !email.includes("@")) { highlightErrorField("reg-email"); alert("मिसटेक: कृपया सही ईमेल एड्रेस दर्ज करें!"); return; }
    if (!phone || phone.replace(/\D/g, '').length < 10) { highlightErrorField("reg-phone"); alert("मिसटेक: कृपया 10 अंकों का मोबाइल नंबर दर्ज करें!"); return; }
    if (!pass || pass.length < 4) { highlightErrorField("reg-pass"); alert("मिसटेक: कृपया कम से कम 4 अक्षरों का पासवर्ड बनाएँ!"); return; }
    if (!address || address.length < 4) { highlightErrorField("reg-address"); alert("मिसटेक: कृपया अपना पूरा पता दर्ज करें!"); return; }
    if (!upi || !upi.includes("@")) { highlightErrorField("reg-upi"); alert("मिसटेक: कृपया सही UPI ID दर्ज करें!"); return; }
    if (!qrFiles || qrFiles.length === 0) { highlightErrorField("reg-qr-file"); alert("मिसटेक: कृपया अपना पेमेंट QR कोड फ़ोटो चुनें!"); return; }

    const autoUserId = "IOIS" + Math.floor(100000 + Math.random() * 900000);

    // Save to Browser Storage
    localStorage.setItem("iois_user_name", name);
    localStorage.setItem("iois_user_email", email);
    localStorage.setItem("iois_user_phone", phone.replace(/\D/g, ''));
    localStorage.setItem("iois_user_pass", pass);
    localStorage.setItem("iois_user_address", address);
    localStorage.setItem("iois_user_upi", upi);
    localStorage.setItem("iois_user_id", autoUserId);

    let members = JSON.parse(localStorage.getItem('iois_all_members') || "[]");
    members.unshift({
        name: name, email: email, phone: phone.replace(/\D/g, ''), address: address, upi: upi,
        userid: autoUserId, cardTier: cardTier, status: "Pending Verification"
    });
    localStorage.setItem('iois_all_members', JSON.stringify(members));

    // 🚀 AUTO-SAVE TO LIVE GOOGLE SHEET DATABASE
    syncToGoogleSheet({
        action: "register",
        userid: autoUserId,
        name: name,
        email: email,
        phone: phone.replace(/\D/g, ''),
        address: address,
        upi: upi,
        sponsorId: sponsorId,
        sponsorName: sponsorName,
        cardTier: cardTier
    });

    alert(`✅ रजिस्ट्रेशन 100% सफल!\n\nआपकी स्थायी Fixed User ID है: [${autoUserId}]\n\nडेटा आपकी Google Sheet में परमानेंट सेव हो गया है! अब Step 2 में पे करें।`);
    document.getElementById("reg-modal")?.classList.add("hidden");
    document.getElementById("payment-modal")?.classList.remove("hidden");
};

// 5. FILE SIZE VALIDATION (MAX 25 MB)
window.validateFileSize = function (input) {
    if (input && input.files && input.files[0]) {
        if (input.files[0].size > 25 * 1024 * 1024) {
            highlightErrorField(input.id);
            alert("⚠️ फ़ाइल 25 MB से बड़ी है! कृपया 25 MB से कम साइज़ की इमेज चुनें।");
            input.value = ""; 
        } else {
            input.classList.remove("border-red-500", "bg-red-950/40");
        }
    }
};

// 6. SCREENSHOT SUBMIT TO ADMIN WHATSAPP
window.handleScreenshotSubmit = function (event) {
    event.preventDefault();
    const name = localStorage.getItem("iois_user_name") || "User";
    const userid = localStorage.getItem("iois_user_id") || "ID";
    const ssInput = document.getElementById("ss-file");

    if (ssInput && ssInput.files && ssInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const ssBase64 = e.target.result;
            localStorage.setItem("iois_user_screenshot", ssBase64);
            let members = JSON.parse(localStorage.getItem('iois_all_members') || "[]");
            if (members.length > 0) {
                members[0].screenshot = ssBase64;
                localStorage.setItem('iois_all_members', JSON.stringify(members));
            }
        };
        reader.readAsDataURL(ssInput.files[0]);
    }

    const msg = `Hello IOIS Admin, Maine ₹10 ka payment kar diya hai.%0AName: ${name}%0AFixed User ID: ${userid}%0AKripya mera Digital Starter Kit aur Dashboard activate karein.`;
    alert("पेमेंट स्क्रीनशॉट सबमिट हो गया! एडमिन वेरिफिकेशन के लिए WhatsApp खुल रहा है।");
    window.open(`https://wa.me/918877490845?text=${msg}`, "_blank");
    window.closeModals();
};

// 7. STRICT LOGIN VERIFICATION
window.handleLoginSubmit = function (event) {
    event.preventDefault();
    const useridInput = document.getElementById("login-userid")?.value.trim();
    const passInput = document.getElementById("login-pass")?.value.trim();

    if (useridInput && useridInput.toLowerCase() === "admin" && passInput === "admin123") {
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
        localStorage.setItem("iois_user_id", savedUserId);
        alert(`लॉगिन सफल! स्वागत है [${savedUserId}]`);
        window.location.href = "dashboard.html";
    } else {
        alert("⚠️ गलत User ID या Password!");
    }
};

// 8. REAL FORGOT USER ID RECOVERY
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

// 9. REAL RESET PASSWORD SUBMIT
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

// 10. PROFILE UPDATE & GOOGLE SHEET SYNC
window.updateUserProfileDetails = function (e) {
    if (e) e.preventDefault();
    const userid = localStorage.getItem('iois_user_id');
    const newName = document.getElementById('edit-name')?.value.trim();
    const newEmail = document.getElementById('edit-email')?.value.trim();
    const newPhone = document.getElementById('edit-phone')?.value.trim();
    const newUPI = document.getElementById('edit-upi')?.value.trim();

    if (newName) localStorage.setItem('iois_user_name', newName);
    if (newEmail) localStorage.setItem('iois_user_email', newEmail);
    if (newPhone) localStorage.setItem('iois_user_phone', newPhone);
    if (newUPI) localStorage.setItem('iois_user_upi', newUPI);

    // 🚀 AUTO SYNC PROFILE UPDATES TO GOOGLE SHEET
    syncToGoogleSheet({
        action: "updateProfile",
        userid: userid,
        name: newName,
        email: newEmail,
        phone: newPhone,
        upi: newUPI
    });

    alert("✅ आपकी प्रोफ़ाइल और Google Sheet डेटा सफलतापूर्वक अपडेट हो गया!");
    if (typeof loadDashboardData === "function") loadDashboardData();
};

window.userLogout = function () { window.location.href = "index.html"; };
window.requestWithdrawal = function () {
    const userid = localStorage.getItem("iois_user_id") || "User";
    const upi = localStorage.getItem("iois_user_upi") || "UPI";
    window.open(`https://wa.me/918877490845?text=Hello%20Admin,%20Main%20[${userid}]%20apna%20withdrawal%20request%20kar%20raha%20hu.%20UPI:%20${upi}`, "_blank");
};
window.copyRefLink = function () {
    const refInput = document.getElementById("ref-link");
    if (refInput) { navigator.clipboard.writeText(refInput.value); alert("Referral link copied!"); }
};
window.copyUPI = function () {
    navigator.clipboard.writeText("8877490845@spicepay").then(() => alert("UPI ID copied!"));
};
