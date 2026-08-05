/* ==========================================================================
   IOIS MASTER SCRIPT (WITH CHATBOT, TOAST POPUPS, GOOGLE SHEET & GOLD PLAN)
   ========================================================================== */

const GOOGLE_SHEET_API = "https://script.google.com/macros/s/AKfycbzctDXCA4mBL9P-CSWH5OiaealRd8OOt5eRktdjT0wujsYx3XDLnPV6RGxOFACwidBEoA/exec";

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

// 1. LIVE PAYOUT TOAST NOTIFICATION LOOP
const samplePayouts = [
    { title: "🔥 Ramesh (Patna)", desc: "Got ₹35 UPI Payout! (12s ago)" },
    { title: "✨ Priya (Jaipur)", desc: "Joined Tiranga Gold Pro Kit! (5s ago)" },
    { title: "⚡ Vikas (Delhi)", desc: "Got ₹35 Referral Bonus! (Just now)" },
    { title: "🚀 Amit (Lucknow)", desc: "Earned ₹70 today! (25s ago)" },
    { title: "🔥 Neha (Indore)", desc: "Joined Tiranga Silver Kit! (1 min ago)" }
];

let toastIndex = 0;
function triggerLiveToast() {
    const toastEl = document.getElementById("payout-toast");
    const titleEl = document.getElementById("toast-title");
    const descEl = document.getElementById("toast-desc");

    if (toastEl && titleEl && descEl) {
        titleEl.innerText = samplePayouts[toastIndex].title;
        descEl.innerText = samplePayouts[toastIndex].desc;
        
        toastEl.classList.remove("hidden");
        toastEl.classList.add("toast-animate");

        setTimeout(() => { toastEl.classList.add("hidden"); }, 4000);
        toastIndex = (toastIndex + 1) % samplePayouts.length;
    }
}
setInterval(triggerLiveToast, 9000);

// 2. IOIS 24/7 AI CHATBOT ASSISTANT
window.sendQuickFAQ = function(question) {
    const chatMsg = document.getElementById("chat-messages");
    if (!chatMsg) return;

    // User message
    chatMsg.innerHTML += `<div class="bg-amber-500/20 text-amber-400 p-2 rounded text-right font-bold">${question}</div>`;

    let reply = "IOIS सपोर्ट में आपका स्वागत है!";
    if (question.includes("पैसे कैसे कमाएँ")) {
        reply = "💡 IOIS पर आप डिजिटल किट खरीदकर अपने दोस्तों को रेफरल लिंक भेजें। हर सफल रेफरल पर आपको ₹7 से ₹35 सीधे UPI में मिलेंगे!";
    } else if (question.includes("UPI विथड्रॉल")) {
        reply = "⚡ विथड्रॉल के लिए डैशबोर्ड में 'Request Withdrawal' बटन दबाएँ। 24 घंटे के अंदर पैसा आपके पंजीकृत UPI ID पर भेज दिया जाता है।";
    }

    setTimeout(() => {
        chatMsg.innerHTML += `<div class="bg-gray-800 p-2 rounded text-gray-200">${reply}</div>`;
        chatMsg.scrollTop = chatMsg.scrollHeight;
    }, 500);
};

// 3. REGISTRATION SUBMIT WITH ₹10 / ₹49 GOLD PLAN LOGIC
window.handleDetailsSubmit = function (event) {
    event.preventDefault();

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

    if (!name || !email || !phone || !pass || !address || !upi || qrFiles.length === 0) {
        alert("⚠️ मिसटेक: कृपया सभी फ़ील्ड्स और क्यूआर फोटो सही-सही भरें!");
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

    // Dynamic QR & Amount update in Step 2 Modal
    const isGold = cardTier.includes("49");
    const payAmt = isGold ? "49" : "10";
    
    document.getElementById("pay-amount-desc").innerText = `स्कैन करके ₹${payAmt} पे करें और स्क्रीनशॉट सबमिट करें:`;
    document.getElementById("pay-qr-code").src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=8877490845@spicepay&pn=Vikas%20Kumar&am=${payAmt}`;

    syncToGoogleSheet({
        action: "register", userid: autoUserId, name: name, email: email,
        phone: phone.replace(/\D/g, ''), address: address, upi: upi,
        sponsorId: sponsorId, sponsorName: sponsorName, cardTier: cardTier
    });

    alert(`✅ रजिस्ट्रेशन सफल!\n\nआपकी User ID: [${autoUserId}]\nचयनित प्लान: ${cardTier}\n\nअब Step 2 में ₹${payAmt} पे करें।`);
    document.getElementById("reg-modal")?.classList.add("hidden");
    document.getElementById("payment-modal")?.classList.remove("hidden");
};

window.validateFileSize = function (input) {
    if (input && input.files && input.files[0]) {
        if (input.files[0].size > 25 * 1024 * 1024) {
            alert("⚠️ फ़ाइल 25 MB से बड़ी है!");
            input.value = "";
        }
    }
};

window.handleScreenshotSubmit = function (event) {
    event.preventDefault();
    const name = localStorage.getItem("iois_user_name") || "User";
    const userid = localStorage.getItem("iois_user_id") || "ID";
    const msg = `Hello IOIS Admin, Maine payment karke screenshot submit kar diya hai.%0AName: ${name}%0AFixed User ID: ${userid}`;
    
    alert("स्क्रीनशॉट सबमिट हो गया! अब एडमिन वेरिफिकेशन के लिए WhatsApp खुल रहा है।");
    window.open(`https://wa.me/918877490845?text=${msg}`, "_blank");
    window.closeModals();
};

window.handleLoginSubmit = function (event) {
    event.preventDefault();
    const useridInput = document.getElementById("login-userid")?.value.trim();
    const passInput = document.getElementById("login-pass")?.value.trim();

    if (useridInput.toLowerCase() === "admin" && passInput === "admin123") {
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
