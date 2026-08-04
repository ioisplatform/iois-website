// Mobile Navbar Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
        });
    }
});

// Open Payment Popup Modal
function openPaymentModal() {
    const modal = document.getElementById("payment-modal");
    if (modal) {
        modal.classList.remove("hidden");
    }
}

// Close Payment Popup Modal
function closePaymentModal() {
    const modal = document.getElementById("payment-modal");
    if (modal) {
        modal.classList.add("hidden");
    }
}

// Copy UPI ID to Clipboard
function copyUPI() {
    const upiID = "8877490845@spicepay";
    navigator.clipboard.writeText(upiID).then(() => {
        alert("UPI ID (8877490845@spicepay) copied successfully!");
    }).catch(err => {
        console.error("Copy failed: ", err);
    });
}
