// Mobile Hamburger Menu Toggle
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

    alert(`Welcome ${name}! Your Fixed User ID is [${userid}]. Now please proceed to payment.`);
    
    // Close Step 1, Open Step 2
    document.getElementById("reg-modal").classList.add("hidden");
    document.getElementById("payment-modal").classList.remove("hidden");
}

// File Size Validation (Max 25 MB = 26214400 Bytes)
function validateFileSize(input) {
    const file = input.files[0];
    const msgEl = document.getElementById("file-msg");
    
    if (file) {
        const maxSizeMB = 25;
        const maxSizeBytes = maxSizeMB * 1024 * 1024; // 25 MB

        if (file.size > maxSizeBytes) {
            alert(`फ़ाइल का साइज़ बहुत बड़ा है! कृपया 25 MB से कम साइज़ की इमेज अपलोड करें। (आपकी फ़ाइल: ${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
            input.value = ""; // Reset input
            if (msgEl) msgEl.innerText = "Error: File size exceeds 25 MB!";
        } else {
            if (msgEl) msgEl.innerText = `Selected File: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
        }
    }
}

// Handle Screenshot Form Submission
function handleScreenshotSubmit(event) {
    event.preventDefault();
    const fileInput = document.getElementById("ss-file");

    if (!fileInput.files.length) {
        alert("कृपया पेमेंट का स्क्रीनशॉट अपलोड करें!");
        return;
    }

    alert("आपका स्क्रीनशॉट और डिटेल्स सफलतापूर्वक सबमिट हो गए हैं! वेरिफिकेशन के बाद आपको Google Drive का एक्सेस मिल जाएगा।");
    
    // Redirect or WhatsApp Notification
    window.open("https://wa.me/918877490845?text=Hello%20IOIS%20Admin,%20maine%20%E2%82%B910%20ka%20payment%20karke%20screenshot%20submit%20kar%20diya%20hai.", "_blank");
    closeModals();
}

// Handle Login Submit
function handleLoginSubmit(event) {
    event.preventDefault();
    const userid = document.getElementById("login-userid").value;
    alert(`Logged in as [${userid}]. Accessing IOIS Portal...`);
    closeModals();
}

// Handle Forgot Submit
function handleForgotSubmit(event) {
    event.preventDefault();
    const contact = document.getElementById("forgot-contact").value;
    alert(`Recovery details sent to [${contact}]. Fixed User ID cannot be changed, Password reset link sent!`);
    closeModals();
}

// Copy UPI ID Function
function copyUPI() {
    const upiID = "8877490845@spicepay";
    navigator.clipboard.writeText(upiID).then(() => {
        alert("UPI ID (8877490845@spicepay) copied successfully!");
    });
}
