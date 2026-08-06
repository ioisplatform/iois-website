<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Safe Session & Data Persistence Demo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-slate-950 text-slate-100 font-sans min-h-screen flex flex-col" onload="renderUI()">

    <!-- Header Navigation -->
    <nav class="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div class="max-w-4xl mx-auto flex justify-between items-center">
            <span class="text-lg font-bold text-amber-400">Safe Web Authentication Demo</span>
            <span id="session-status" class="text-xs text-slate-400">Session Status: Offline</span>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto p-6 flex-1 w-full space-y-8">

        <!-- 1. DASHBOARD VIEW (केवल लॉगिन होने पर दिखेगा) -->
        <div id="dashboard-view" class="hidden bg-slate-900 border border-emerald-500/40 p-6 rounded-2xl shadow-xl space-y-4">
            <div class="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                    <h2 class="text-xl font-bold text-emerald-400">User Dashboard</h2>
                    <p class="text-xs text-slate-400">आपकी प्रोफ़ाइल डेटाबेस में सुरक्षित है</p>
                </div>
                <button onclick="handleLogout()" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs">
                    सुरक्षित लॉगआउट (Safe Logout)
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span class="text-slate-400 block text-[10px]">नाम (Name)</span>
                    <span id="user-display-name" class="font-bold text-white text-sm">---</span>
                </div>
                <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span class="text-slate-400 block text-[10px]">User ID (Permanent)</span>
                    <span id="user-display-id" class="font-bold text-amber-400 text-sm font-mono">---</span>
                </div>
                <div class="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span class="text-slate-400 block text-[10px]">ईमेल (Email)</span>
                    <span id="user-display-email" class="font-bold text-teal-400 text-sm">---</span>
                </div>
            </div>
        </div>

        <!-- 2. AUTHENTICATION FORMS VIEW (रजिस्ट्रेशन और लॉगिन) -->
        <div id="auth-forms-view" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Registration Form -->
            <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                <h3 class="text-lg font-bold text-amber-400">नया अकाउंट बनाएँ</h3>
                <form onsubmit="handleRegister(event)" class="space-y-3 text-xs">
                    <div>
                        <label class="block text-slate-300 mb-1">पूरा नाम *</label>
                        <input type="text" id="reg-name" required placeholder="अपना नाम लिखें" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none">
                    </div>
                    <div>
                        <label class="block text-slate-300 mb-1">ईमेल *</label>
                        <input type="email" id="reg-email" required placeholder="email@example.com" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none">
                    </div>
                    <div>
                        <label class="block text-slate-300 mb-1">पासवर्ड *</label>
                        <input type="password" id="reg-pass" required placeholder="पासवर्ड बनाएँ" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none">
                    </div>
                    <button type="submit" class="w-full py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl shadow hover:bg-amber-500">
                        Register Account
                    </button>
                </form>
            </div>

            <!-- Login Form -->
            <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                <h3 class="text-lg font-bold text-teal-400">लॉगिन करें</h3>
                <form onsubmit="handleLogin(event)" class="space-y-3 text-xs">
                    <div>
                        <label class="block text-slate-300 mb-1">User ID या ईमेल *</label>
                        <input type="text" id="login-id" required placeholder="Enter User ID or Email" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none">
                    </div>
                    <div>
                        <label class="block text-slate-300 mb-1">पासवर्ड *</label>
                        <input type="password" id="login-pass" required placeholder="Enter Password" class="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none">
                    </div>
                    <button type="submit" class="w-full py-2.5 bg-teal-400 text-slate-950 font-bold rounded-xl shadow hover:bg-teal-500">
                        Login
                    </button>
                </form>
            </div>

        </div>

    </main>

    <!-- JAVASCRIPT AUTHENTICATION ENGINE -->
    <script>
        // Helper 1: Read Database Safely
        function getDatabase() {
            var data = localStorage.getItem('app_users_database');
            return data ? JSON.parse(data) : [];
        }

        // Helper 2: Save Database Safely
        function saveDatabase(usersArray) {
            localStorage.setItem('app_users_database', JSON.stringify(usersArray));
        }

        // 1. REGISTRATION HANDLER
        function handleRegister(e) {
            e.preventDefault();
            var name = document.getElementById('reg-name').value.trim();
            var email = document.getElementById('reg-email').value.trim().toLowerCase();
            var pass = document.getElementById('reg-pass').value.trim();

            var db = getDatabase();
            
            // Check Duplicate Email
            var exists = db.some(function(u) { return u.email === email; });
            if (exists) {
                alert("⚠️ इस ईमेल से अकाउंट पहले से मौजूद है! कृपया लॉगिन करें।");
                return;
            }

            var userId = "USER" + Math.floor(100000 + Math.random() * 900000);
            var newUser = { userId: userId, name: name, email: email, pass: pass };

            // PERMANENT SAVE (Never wiped on logout)
            db.push(newUser);
            saveDatabase(db);

            // SET ACTIVE SESSION
            sessionStorage.setItem('app_active_user_id', userId);
            alert("✅ रजिस्ट्रेशन सफल! आपकी स्थायी User ID है: [" + userId + "]");
            
            e.target.reset();
            renderUI();
        }

        // 2. LOGIN HANDLER
        function handleLogin(e) {
            e.preventDefault();
            var idOrEmail = document.getElementById('login-id').value.trim().toLowerCase();
            var pass = document.getElementById('login-pass').value.trim();

            var db = getDatabase();
            var user = db.find(function(u) {
                return (u.userId.toLowerCase() === idOrEmail || u.email === idOrEmail);
            });

            if (!user) {
                alert("⚠️ अकाउंट नहीं मिला! कृपया पहले रजिस्ट्रेशन करें।");
                return;
            }

            if (user.pass === pass) {
                // Set Session Only
                sessionStorage.setItem('app_active_user_id', user.userId);
                alert("✅ लॉगिन सफल! स्वागत है " + user.name);
                e.target.reset();
                renderUI();
            } else {
                alert("⚠️ गलत पासवर्ड!");
            }
        }

        // 3. SAFE LOGOUT HANDLER (Wipes ONLY Session, Database Stays Intact)
        function handleLogout() {
            sessionStorage.removeItem('app_active_user_id'); // Only clear session!
            alert("आप लॉगआउट हो चुके हैं। आपका अकाउंट डेटाबेस में सुरक्षित है।");
            renderUI();
        }

        // 4. UI RENDERER (Renders state based on active session)
        function renderUI() {
            var activeId = sessionStorage.getItem('app_active_user_id');
            var db = getDatabase();

            var dashboardView = document.getElementById('dashboard-view');
            var authView = document.getElementById('auth-forms-view');
            var statusEl = document.getElementById('session-status');

            if (activeId) {
                var user = db.find(function(u) { return u.userId === activeId; });
                if (user) {
                    dashboardView.classList.remove('hidden');
                    authView.classList.add('hidden');
                    statusEl.innerText = "Session Status: Active (" + user.userId + ")";

                    document.getElementById('user-display-name').innerText = user.name;
                    document.getElementById('user-display-id').innerText = user.userId;
                    document.getElementById('user-display-email').innerText = user.email;
                    return;
                }
            }

            // Default Offline View
            dashboardView.classList.add('hidden');
            authView.classList.remove('hidden');
            statusEl.innerText = "Session Status: Offline";
        }
    </script>
</body>
</html>
