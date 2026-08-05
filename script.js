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
        // लॉगिन होते ही Active User ID सेट करें
        localStorage.setItem("iois_user_id", savedUserId);
        alert(`लॉगिन सफल! स्वागत है [${savedUserId}]`);
        window.location.href = "dashboard.html";
    } else {
        alert("⚠️ गलत User ID या Password!");
    }
}
