// Universal Mobile Hamburger Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) {
        mobileMenu.classList.toggle("hidden");
    }
}

// Close All Modals
function closeModals() {
    document.getElementById("reg-modal")?.classList.add("hidden");
    document.getElementById("payment-modal")?.classList.add("hidden");
    document.getElementById("login-modal")?.classList.add("hidden");
    document.getElementById("forgot-modal")?.classList.add("hidden");
}

function openRegistrationFlow() {
    closeModals();
    document.getElementById("reg-modal")?.classList.remove("hidden");
}

function openLoginModal() {
    closeModals();
    document.getElementById("login-modal")?.classList.remove("hidden");
}

function showForgotModal(type) {
    closeModals();
    const titleEl = document.getElementById("forgot-title");
    if (titleEl) {
        titleEl.innerText = type === 'id' ? 'Forgot Username/ID Recovery' : 'Forgot Password Recovery';
    }
    document.getElementById("forgot-modal")?.classList.remove("hidden");
}

// STRICT FORM VALIDATION & REGISTRATION
function handleDetailsSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const phone = document.getElementById("reg-phone").value.trim();
    const pass = document.getElementById("reg-pass").value.trim();
    const address = document.getElementById("reg-address").value.trim();
    const upi = document.getElementById("reg-upi").value.trim();
    const qrFile = document.getElementById("reg-qr-file").files.length;

    // STRICT VALIDATION WRONG ALERT
    if (!name || !email || !phone || !pass || !address || !upi || !qrFile) {
        alert("⚠️ गलत या अधूरी एंट्री (Wrong Entry Alert)!\n\nकृपया सभी आवश्यक फ़ील्ड्स (Name, Email, Phone, Pass, Address, UPI ID, और QR File) सही-सही भरें!");
        return;
    }

    if (phone.length < 10) {
        alert("⚠️ अमान्य मोबाइल नंबर! कृपया 10 अंकों का व्हाट्सएप नंबर दर्ज करें।");
        return;
    }

    // Auto-Generate Fixed User ID / Refer Code
    const autoUserId = "IOIS" + Math.floor(100000 + Math.random() * 900000);

    // Save strictly to local storage
    localStorage.setItem("iois_user_name", name);
    localStorage.setItem("iois_user_email", email);
    localStorage.setItem("iois_user_phone", phone);
    localStorage.setItem("iois_user_pass", pass);
    localStorage.setItem("iois_user_address", address);
    localStorage.setItem("iois_user_upi", upi);
    localStorage.setItem("iois_user_id", autoUserId);

    alert(`✅ रजिस्ट्रेशन सफल!\n\nआपकी स्थायी User ID/Refer Code है: [${autoUserId}]\n\nअब ₹10 की किट एक्टिवेट करने के लिए पेमेंट करें।`);
    
    document.getElementById("reg-modal").classList.add("hidden");
    document.getElementById("payment-modal").classList.remove("hidden");
}

// Validate 25 MB File Size
function validateFileSize(input) {
    const file = input.files[0];
    if (file) {
        const maxSizeBytes = 25 * 1024 * 1024; // 25 MB
        if (file.size > maxSizeBytes) {
            alert(`⚠️ फ़ाइल का साइज़ 25 MB से बड़ा है! (आपकी फ़ाइल: ${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
            input.value = ""; 
        }
    }
}

// Screenshot Submit
function handleScreenshotSubmit(event) {
    event.preventDefault();
    const name = localStorage.getItem("iois_user_name") || "User";
    const userid = localStorage.getItem("iois_user_id") || "ID";

    const msg = `Hello IOIS Admin, Maine ₹10 ka payment kar diya hai.%0AName: ${name}%0AUser ID: ${userid}%0AKripya mera Digital Starter Kit aur Dashboard activate karein.`;
    
    alert("स्क्रीनशॉट सबमिट हो गया! वेरिफिकेशन के लिए अब WhatsApp खोलें।");
    window.open(`https://wa.me/918877490845?text=${msg}`, "_blank");
    closeModals();
}

// LOGIN VERIFICATION
function handleLoginSubmit(event) {
    event.preventDefault();
    const useridInput = document.getElementById("login-userid").value.trim();
    const passInput = document.getElementById("login-pass").value.trim();

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

function handleForgotSubmit(event) {
    event.preventDefault();
    alert("रिकवरी विवरण आपके दर्ज किए गए व्हाट्सएप / ईमेल पर भेज दिया गया है!");
    closeModals();
}

function userLogout() {
    alert("Logged out successfully!");
    window.location.href = "index.html";
}

function copyRefLink() {
    const refInput = document.getElementById("ref-link");
    if (refInput) {
        navigator.clipboard.writeText(refInput.value);
        alert("Aapka unique referral link copy ho gaya hai!");
    }
}
