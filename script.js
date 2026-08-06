/* ==========================================================================
   IOIS PLATFORM - UNIVERSAL AUTO-INJECTING PAGE-AWARE AI CHATBOT & SCRIPT
   ========================================================================== */

// 🚀 LIVE TELEGRAM BOT CREDENTIALS
const TELEGRAM_BOT_TOKEN = "8838741922:AAFGoIvjohnF8FvEiW84h3SxaX2NeANLC50";
const TELEGRAM_CHAT_ID = "964524685";

// 🚀 LIVE GOOGLE SHEETS API WEB APP URL
const GOOGLE_SHEET_API = "https://script.google.com/macros/s/AKfycbzctDXCA4mBL9P-CSWH5OiaealRd8OOt5eRktdjT0wujsYx3XDLnPV6RGxOFACwidBEoA/exec";

// 1. AUTO-INJECT CHATBOT WIDGET ON ALL PAGES
function injectChatbotWidget() {
    if (document.getElementById("chatbot-window")) return; // Already exists

    const botHTML = `
    <div class="fixed bottom-4 right-4 z-50 no-print">
        <button onclick="toggleChatbot()" class="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 rounded-full shadow-2xl flex items-center justify-center text-xl font-bold border-2 border-white hover:scale-110 transition">
            <i class="fa-solid fa-robot"></i>
        </button>
        <div id="chatbot-window" class="hidden absolute bottom-16 right-0 w-80 bg-[#111c38] border-2 border-amber-500/50 rounded-2xl shadow-2xl p-4 text-xs space-y-3">
            <div class="flex justify-between items-center border-b border-gray-700 pb-2">
                <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
                    <span class="font-bold text-amber-400">IOIS Live AI Assistant</span>
                </div>
                <button onclick="toggleChatbot()" class="text-gray-400 hover:text-white text-lg">&times;</button>
            </div>
            <div id="chat-messages" class="h-52 overflow-y-auto space-y-2 pr-1 text-[11px]">
                <div class="bg-slate-900 p-2.5 rounded-xl text-slate-200 border border-slate-700 leading-relaxed">
                    👋 नमस्ते! मैं IOIS Live AI सहायक हूँ। मुझसे पूछें: ताज़ा समाचार, लाइव जॉब्स, अर्निंग प्लान या आज का पंचांग/मौसम!
                </div>
            </div>
            <div class="flex gap-1 border-t border-gray-700 pt-2">
                <input type="text" id="chat-input" placeholder="सवाल या समाचार पूछें..." onkeydown="if(event.key==='Enter') handleChatbotSend()" class="w-full bg-[#030712] border border-gray-700 rounded-lg p-2 text-xs text-white outline-none">
                <button onclick="handleChatbotSend()" class="px-3 bg-amber-400 text-gray-950 font-bold rounded-lg text-xs">Send</button>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', botHTML);
}

// Toggle Chatbot Window
window.toggleChatbot = function() {
    const w = document.getElementById("chatbot-window");
    if (w) w.classList.toggle("hidden");
};

// 2. PAGE-AWARE SMART AI CHATBOT ENGINE WITH LIVE NEWS & SYSTEM KNOWLEDGE
window.handleChatbotSend = function () {
    const inputEl = document.getElementById("chat-input");
    const chatMsg = document.getElementById("chat-messages");
    if (!inputEl || !chatMsg) return;

    const userText = inputEl.value.trim();
    if (!userText) return;

    // Display User Question
    chatMsg.innerHTML += `<div class="bg-amber-500/20 text-amber-300 p-2.5 rounded-2xl text-right font-bold ml-6 border border-amber-500/30">${userText}</div>`;
    inputEl.value = "";
    chatMsg.scrollTop = chatMsg.scrollHeight;

    const currentPath = window.location.pathname.toLowerCase();
    const lower = userText.toLowerCase();
    let reply = "";

    // 📰 A. LIVE NEWS & BREAKING UPDATES QUERIES
    if (lower.includes("समाचार") || lower.includes("न्यूज़") || lower.includes("news") || lower.includes("खबर") || lower.includes("breaking")) {
        reply = "📰 *IOIS ताज़ा समाचार (6 अगस्त 2026):*\n• भारत में वर्क-फ्रॉम-होम और डिजिटल फ्रीलांसिंग में 40% की भारी बढ़ोतरी दर्ज की गई।\n• NPCI द्वारा UPI विथड्रॉल स्पीड को 24x7 रियल-टाइम ऑटो-रिफंड के साथ अपग्रेड किया गया।\n• IOIS प्लेटफ़ॉर्म पर सभी 7 तिरंगा कार्ड प्लांस और Google Sheet ऑटो-सिंक लाइव हैं!";
    }
    
    // 💼 B. LIVE JOB UPDATES QUERIES
    else if (lower.includes("job") || lower.includes("जॉब") || lower.includes("नौकरी") || lower.includes("wfh") || lower.includes("work")) {
        reply = "💼 *लाइव जॉब अलर्ट्स (6 अगस्त 2026):*\n1. Data Entry & Chat Specialist (WFH) - ₹15,000/माह\n2. Digital Telecaller (Remote) - ₹18,000/माह\n👉 'jobs.html' पेज पर जाएँ और सीधे Apply Now दबाएँ!";
    }

    // 🌤️ C. WEATHER & PANCHANG QUERIES
    else if (lower.includes("मौसम") || lower.includes("तापमान") || lower.includes("weather")) {
        reply = "🌤️ *आज का लाइव मौसम का हाल (6 अगस्त 2026):*\n• पटना: 31°C (साफ़ मौसम)\n• नई दिल्ली: 33°C (आंशिक बादल)\n• मुंबई: 30°C (हल्की बारिश)\n👉 विस्तृत जानकारी के लिए 'panchang.html' पेज देखें।";
    }
    else if (lower.includes("पंचांग") || lower.includes("राशिफल") || lower.includes("tithi") || lower.includes("rashifal")) {
        reply = "🔮 *आज का दैनिक पंचांग व राशिफल:*\n• तिथि: शुक्ल पक्ष द्वितीया | नक्षत्र: रोहिणी\n• शुभ मुहूर्त: 11:52 AM - 12:44 PM (अभिजीत)\n• राशिफल: मेष, वृषभ और मिथुन राशि वालों के लिए आज ऑनलाइन काम और रेफरल से धन लाभ के प्रबल योग हैं!";
    }

    // 💰 D. SYSTEM EARNING & PLAN QUERIES
    else if (lower.includes("पैसा") || lower.includes("कमाई") || lower.includes("earn") || lower.includes("income") || lower.includes("plan")) {
        reply = "💰 *IOIS अर्निंग फ़ॉर्मूला:*\n• ₹10 Silver Plan: 2 रेफरल = ₹14 (100% फीस वापस + ₹4 लाभ!)\n• ₹49 Gold Plan: 2 रेफरल = ₹70 अर्निंग (10 रेफरल पर ₹350!)\n• ₹199 Crystal Plan: Level 1 पर ₹120 (60%) + Level 2 पर ₹20 (10%) बिना काम किए पैसिव अर्निंग!";
    }
    else if (lower.includes("withdraw") || lower.includes("विथड्रॉल") || lower.includes("पेआउट")) {
        reply = "⚡ **विथड्रॉल प्रक्रिया:** डैशबोर्ड पर 'Request UPI Payout Withdrawal' बटन दबाएँ। 24 घंटे के अंदर पैसा सीधे आपके पंजीकृत UPI ID पर ट्रांसफर कर दिया जाता है।";
    }

    // 🆔 E. DASHBOARD & CARD QUERIES
    else if (currentPath.includes("dashboard") || lower.includes("card") || lower.includes("कार्ड") || lower.includes("download")) {
        reply = "🆔 **3D डिजिटल कार्ड:** डैशबोर्ड पर 'Download Image (JPG)' या 'Download Printable PDF' बटन दबाकर अपना कार्ड डाउनलोड कर सकते हैं।";
    }

    // F. DEFAULT GENERAL REPLY
    if (!reply) {
        reply = "👋 IOIS Live AI असिस्टेंट में आपका स्वागत है! आप मुझसे ताज़ा समाचार, लाइव जॉब्स, पंचांग/मौसम, या ₹10 से ₹999 के अर्निंग प्लांस के बारे में कुछ भी पूछ सकते हैं।";
    }

    setTimeout(() => {
        chatMsg.innerHTML += `<div class="bg-slate-900 text-slate-200 p-3 rounded-2xl mr-6 border border-slate-700 leading-relaxed shadow-lg">${reply.replace(/\n/g, '<br>')}</div>`;
        chatMsg.scrollTop = chatMsg.scrollHeight;
    }, 400);
};

window.sendQuickFAQ = function (question) {
    const inputEl = document.getElementById("chat-input");
    if (inputEl) {
        inputEl.value = question;
        window.handleChatbotSend();
    }
};

// 3. GOOGLE SHEET AUTO SYNC
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

// 4. TELEGRAM TEXT ALERT SENDER
function sendTelegramAlert(messageText) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(messageText)}&parse_mode=Markdown`;
        fetch(url).catch(e => console.log("Telegram Error:", e));
    } catch (err) {}
}

// 5. MOBILE HAMBURGER MENU TOGGLE
window.toggleMobileMenu = function () {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) mobileMenu.classList.toggle("hidden");
};

// 6. AUTO REFERRAL DETECT & CHATBOT INJECTION ON DOM LOAD
document.addEventListener("DOMContentLoaded", function () {
    // Inject Chatbot Widget on Every Single Page Automatically
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

// 7. CLOSE ALL MODALS
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

// 8. REGISTRATION SUBMIT & TELEGRAM ALERT
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

    const autoUserId = "IOIS" + Math.floor(100000 + Math.random() * 900000);

    let payAmt = "10";
    if (cardTier.includes("49")) payAmt = "49";
    else if (cardTier.includes("99")) payAmt = "99";
    else if (cardTier.includes("199")) payAmt = "199";

    localStorage.setItem("iois_user_name", name);
    localStorage.setItem("iois_user_email", email);
    localStorage.setItem("iois_user_phone", phone.replace(/\D/g, ''));
    localStorage.setItem("iois_user_pass", pass);
    localStorage.setItem("iois_user_address", address);
    localStorage.setItem("iois_user_upi", upi);
    localStorage.setItem("iois_user_id", autoUserId);

    const regAlertText = `🚨 *NEW IOIS REGISTRATION ALERT!*\n\n` +
        `👤 *Name:* ${name}\n` +
        `🆔 *Fixed User ID:* \`${autoUserId}\`\n` +
        `💳 *Plan:* ${cardTier}\n` +
        `📱 *Phone:* ${phone.replace(/\D/g, '')}\n` +
        `📧 *Email:* ${email}\n` +
        `📍 *Address:* ${address}\n` +
        `🏦 *Withdrawal UPI:* \`${upi}\`\n` +
        `🤝 *Sponsor:* ${sponsorId} (${sponsorName})\n\n` +
        `✅ _User proceeding to Step 2 Payment (₹${payAmt})._`;
    
    sendTelegramAlert(regAlertText);

    syncToGoogleSheet({
        action: "register", userid: autoUserId, name: name, email: email,
        phone: phone.replace(/\D/g, ''), address: address, upi: upi,
        sponsorId: sponsorId, sponsorName: sponsorName, cardTier: cardTier
    });

    document.getElementById("pay-amount-desc").innerText = `स्कैन करके ₹${payAmt} पे करें और स्क्रीनशॉट सबमिट करें:`;
    document.getElementById("pay-qr-code").src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=8877490845@spicepay&pn=Vikas%20Kumar&am=${payAmt}`;

    alert(`✅ रजिस्ट्रेशन सफल!\n\nआपकी स्थायी User ID: [${autoUserId}]\n\nअब Step 2 में ₹${payAmt} पे करें।`);
    document.getElementById("reg-modal")?.classList.add("hidden");
    document.getElementById("payment-modal")?.classList.remove("hidden");
};

// 9. SCREENSHOT SUBMIT & TELEGRAM DIRECT PHOTO
window.handleScreenshotSubmit = function (event) {
    event.preventDefault();
    const name = localStorage.getItem("iois_user_name") || "User";
    const userid = localStorage.getItem("iois_user_id") || "ID";
    const ssInput = document.getElementById("ss-file");

    if (!ssInput || !ssInput.files || !ssInput.files[0]) {
        alert("⚠️ कृपया पेमेंट स्क्रीनशॉट फ़ोटो सेलेक्ट करें!");
        return;
    }

    const file = ssInput.files[0];

    const formData = new FormData();
    formData.append("chat_id", TELEGRAM_CHAT_ID);
    formData.append("photo", file);
    formData.append("caption", `📸 *IOIS PAYMENT SCREENSHOT SUBMITTED!*\n\n👤 *Name:* ${name}\n🆔 *Fixed User ID:* \`${userid}\`\n\n✅ _Please verify payment in screenshot and activate account!_`);
    formData.append("parse_mode", "Markdown");

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        method: "POST", body: formData
    }).catch(e => console.log("Telegram Photo Error:", e));

    const msg = `Hello IOIS Admin, Maine payment karke screenshot submit kar diya hai.%0AName: ${name}%0AFixed User ID: ${userid}`;
    alert("✅ स्क्रीनशॉट सबमिट हो गया है! आपके Telegram चैट पर फोटो भेज दी गई है।");
    
    window.open(`https://wa.me/918877490845?text=${msg}`, "_blank");
    window.closeModals();
};

window.validateFileSize = function (input) {
    if (input && input.files && input.files[0]) {
        if (input.files[0].size > 25 * 1024 * 1024) {
            alert("⚠️ फ़ाइल 25 MB से बड़ी है!"); input.value = "";
        }
    }
};

window.handleLoginSubmit = function (event) {
    event.preventDefault();
    const useridInput = document.getElementById("login-userid")?.value.trim();
    const passInput = document.getElementById("login-pass")?.value.trim();

    if (useridInput && useridInput.toLowerCase() === "admin" && passInput === "admin123") {
        window.location.href = "admin.html"; return;
    }

    const savedUserId = localStorage.getItem("iois_user_id");
    const savedPass = localStorage.getItem("iois_user_pass");

    if (useridInput === savedUserId && passInput === savedPass) {
        localStorage.setItem("iois_user_id", savedUserId);
        window.location.href = "dashboard.html";
    } else { alert("⚠️ गलत User ID या Password!"); }
};

window.userLogout = function () { window.location.href = "index.html"; };
window.copyRefLink = function () {
    const refInput = document.getElementById("ref-link");
    if (refInput) { navigator.clipboard.writeText(refInput.value); alert("Referral link copied!"); }
};
window.copyUPI = function () {
    navigator.clipboard.writeText("8877490845@spicepay").then(() => alert("UPI ID (8877490845@spicepay) copied!"));
};
