// Mobile Hamburger Menu Toggle (For ALL Pages)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) {
        mobileMenu.classList.toggle("hidden");
    }
}

// Close All Modals / Popups
function closeModals() {
    document.getElementById("reg-modal")?.classList.add("hidden");
    document.getElementById("payment-modal")?.classList.add("hidden");
    document.getElementById("login-modal")?.classList.add("hidden");
    document.getElementById("forgot-modal")?.classList.add("hidden");
}

// Open Registration (Step 1)
function openRegistrationFlow() {
    closeModals();
    document.getElementById("reg-modal")?.classList.remove("hidden");
}

// Open Login Modal
function openLoginModal() {
    closeModals();
    document.getElementById("login-modal")?.classList.remove("hidden");
}

// Show Forgot ID/Password Modal
function showForgotModal() {
    closeModals();
    document.getElementById("forgot-modal")?.classList.remove("hidden");
}

// Step 1 Form Submit -> Moves to Payment (Step 2)
function handleDetailsSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("reg-name").value;
    const userid = document.getElementById("reg-userid").value;
    const upi = document.getElementById("reg-upi").value;

    // Save details locally
    localStorage.setItem("iois_user_name", name);
    localStorage.setItem("iois_user_id", userid);
    localStorage.setItem("iois_user_upi", upi);

    alert(`Welcome ${name}! Your Fixed User ID is [${userid}]. Now please pay ₹10 and upload screenshot.`);
    
    document.getElementById("reg-modal").classList.add("hidden");
    document.getElementById("payment-modal").classList.remove("hidden");
}

// File Size Validation (Max 25 MB)
function validateFileSize(input) {
    const file = input.files[0];
    if (file) {
        const maxSizeBytes = 25 * 1024 * 1024; // 25 MB
        if (file.size > maxSizeBytes) {
            alert(`फ़ाइल का साइज़ 25 MB से बड़ा है! (आपकी फ़ाइल: ${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
            input.value = ""; 
        }
    }
}

// Handle Screenshot Submission (Redirects to WhatsApp for Instant Admin Verification)
function handleScreenshotSubmit(event) {
    event.preventDefault();
    const name = localStorage.getItem("iois_user_name") || "User";
    const userid = localStorage.getItem("iois_user_id") || "ID";

    const msg = `Hello IOIS Admin, Maine ₹10 ka payment kar diya hai.%0AName: ${name}%0AFixed User ID: ${userid}%0AKripya mera Digital Starter Kit aur Dashboard activate karein.`;
    
    alert("आपका डेटा सबमिट हो गया है! वेरिफिकेशन के लिए अब WhatsApp पर मैसेज और स्क्रीनशॉट भेजें।");
    window.open(`https://wa.me/918877490845?text=${msg}`, "_blank");
    closeModals();
}

// Handle Login Submit -> Redirects to Dashboard
function handleLoginSubmit(event) {
    event.preventDefault();
    const userid = document.getElementById("login-userid").value;
    
    if (userid.toLowerCase() === "admin") {
        window.location.href = "admin.html";
    } else {
        alert(`Login Successful as [${userid}]! Opening Dashboard...`);
        window.location.href = "dashboard.html";
    }
}

// User Logout
function userLogout() {
    alert("Logged out successfully!");
    window.location.href = "index.html";
}

// Copy Referral Link
function copyRefLink() {
    const refInput = document.getElementById("ref-link");
    if (refInput) {
        navigator.clipboard.writeText(refInput.value);
        alert("Referral link copied successfully!");
    }
}

// Copy UPI ID Function
function copyUPI() {
    navigator.clipboard.writeText("8877490845@spicepay").then(() => {
        alert("UPI ID (8877490845@spicepay) copied!");
    });
}
