// =========================
// We Know — script.js
// نسخه تمیز و یکپارچه
// =========================

document.addEventListener("DOMContentLoaded", () => {

    // ---------- عناصر اصلی ----------
    const navContainer = document.querySelector(".navbar .container");
    const searchForm    = document.querySelector(".search-box");
    const searchInput   = document.querySelector("#product-link");
    const preloader     = document.getElementById("preloader");

    // ---------- عناصر سایدبار ----------
    const sidebar   = document.getElementById("sidebar");
    const menuBtn   = document.querySelector(".menu-btn");

    // ---------- عناصر مودال ورود ----------
    const authModal  = document.getElementById("authModal");
    const loginBtn   = document.querySelector(".login-btn");
    const closeModal = document.querySelector(".close-modal");
    const toggleText = document.querySelector(".toggle-text");
    const modalTitle = document.getElementById("modalTitle");
    const toggleBtn  = document.getElementById("toggleBtn");
    const authSubmit = document.querySelector(".auth-submit");

    // =========================
    // ۱) اینترو / پرلودر
    // =========================

    function endIntro(){
        document.documentElement.classList.remove("is-loading");
        document.documentElement.classList.add("page-ready");

        if(preloader){
            preloader.classList.add("out");
            preloader.addEventListener("animationend", () => preloader.remove(), { once:true });
            setTimeout(() => preloader.remove(), 1200);
        }
    }

    if(preloader){
        setTimeout(endIntro, 1400);
    }else{
        document.documentElement.classList.add("page-ready");
    }

    // =========================
    // ۲) افکت اسکرول روی ناوبار
    // =========================

    if(navContainer){
        window.addEventListener("scroll", () => {
            navContainer.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    // =========================
    // ۳) سایدبار دسته‌بندی‌ها
    // =========================

    function toggleSidebar(){
        if(sidebar) sidebar.classList.toggle("active");
    }

    function buildShatterTiles(){
        const grid = document.getElementById("shatterGrid");
        if(!grid || grid.children.length) return;

        const total = 35; // 5 × 7
        for(let i = 0; i < total; i++){
            const tile = document.createElement("div");
            tile.className = "shatter-tile";
            tile.style.transitionDelay = (Math.random() * 0.35).toFixed(2) + "s";
            tile.style.setProperty("--tx", (Math.random() * 140 - 70).toFixed(0) + "px");
            tile.style.setProperty("--ty", (Math.random() * 140 - 70).toFixed(0) + "px");
            grid.appendChild(tile);
        }
    }

    buildShatterTiles();

    // توجه: toggleSidebar از طریق onclick داخل HTML صدا زده میشه،
    // پس اینجا دوباره addEventListener نمی‌ذاریم که دوبار اجرا نشه.

    // کلیک بیرون از سایدبار ببندتش
    document.addEventListener("click", (e) => {
        if(!sidebar || !sidebar.classList.contains("active")) return;
        if(sidebar.contains(e.target) || e.target === menuBtn) return;
        sidebar.classList.remove("active");
    });

    // =========================
    // ۴) مودال ورود / ثبت‌نام — وصل به بک‌اند واقعی
    // =========================

    // آدرس سرور بک‌اند. وقتی دیپلوی کردی، اینو به آدرس واقعی سرورت عوض کن.
    const API_BASE = "http://127.0.0.1:8000";

    let isLogin = true;

    const authNameInput = document.getElementById("authName");
    const authEmailInput = document.getElementById("authEmail");
    const authPasswordInput = document.getElementById("authPassword");
    const authError = document.getElementById("authError");

    function openAuth(){
        if(authModal) authModal.style.display = "flex";
        if(authError) authError.innerText = "";
    }

    function closeAuth(){
        if(authModal) authModal.style.display = "none";
    }

    function toggleAuthMode(){
        isLogin = !isLogin;
        if(authError) authError.innerText = "";

        if(authNameInput){
            authNameInput.style.display = isLogin ? "none" : "block";
        }

        if(!modalTitle || !toggleBtn || !authSubmit) return;

        if(isLogin){
            modalTitle.innerText = "ورود به حساب";
            toggleBtn.innerText  = "ثبت‌نام کنید";
            authSubmit.innerText = "ورود";
        }else{
            modalTitle.innerText = "ثبت‌نام در We Know";
            toggleBtn.innerText  = "ورود به حساب";
            authSubmit.innerText = "ساخت حساب";
        }
    }

    // =========================
    // وضعیت ورود کاربر (ذخیره‌شده تو مرورگر، خود اطلاعات رو سرور واقعیه)
    // =========================

    function getToken(){ return localStorage.getItem("weknow_token"); }

    function saveSession(token, user){
        localStorage.setItem("weknow_token", token);
        localStorage.setItem("weknow_user", JSON.stringify(user));
        updateAuthUI();
    }

    function clearSession(){
        localStorage.removeItem("weknow_token");
        localStorage.removeItem("weknow_user");
        updateAuthUI();
    }

    function updateAuthUI(){
        if(!loginBtn) return;
        const raw = localStorage.getItem("weknow_user");

        if(raw){
            const user = JSON.parse(raw);
            const initial = user.name ? user.name.trim().charAt(0) : "؟";
            loginBtn.innerHTML = `<span class="avatar-circle">${initial}</span><span class="avatar-name">${user.name}</span>`;
            loginBtn.classList.add("logged-in");
            loginBtn.title = "برو به حساب کاربری‌ت";
        }else{
            loginBtn.innerHTML = `<span class="icon">👤</span> ورود / ثبت نام`;
            loginBtn.classList.remove("logged-in");
            loginBtn.title = "";
        }
    }

    updateAuthUI();

    if(loginBtn){
        loginBtn.addEventListener("click", () => {
            if(getToken()){
                window.location.href = "dashboard.html";
            }else{
                openAuth();
            }
        });
    }

    // اگه با ?login=1 اومدیم اینجا (مثلاً از یه صفحه‌ی محافظت‌شده مثل داشبورد)، خودکار مودال ورود رو باز کن
    if(new URLSearchParams(window.location.search).get("login") === "1"){
        setTimeout(openAuth, 300);
    }

    // اعتبارسنجی رمز عبور: حداقل ۸ کاراکتر و شامل حرف + عدد
    const authForm = document.getElementById("authForm");
    if(authForm){
        authForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            if(authError) authError.innerText = "";

            const name = authNameInput ? authNameInput.value.trim() : "";
            const email = authEmailInput ? authEmailInput.value.trim() : "";
            const pw = authPasswordInput ? authPasswordInput.value : "";

            const hasLetter = /[A-Za-z]/.test(pw);
            const hasNumber = /[0-9]/.test(pw);
            const longEnough = pw.length >= 8;

            if(!(hasLetter && hasNumber && longEnough)){
                if(authError) authError.innerText = "رمز عبور باید حداقل ۸ کاراکتر باشه و شامل حروف و عدد باشه.";
                return;
            }

            if(!isLogin && !name){
                if(authError) authError.innerText = "اسمت رو وارد کن.";
                return;
            }

            const endpoint = isLogin ? "/api/login" : "/api/signup";
            const body = isLogin ? { email, password: pw } : { name, email, password: pw };

            authSubmit.disabled = true;
            const originalLabel = authSubmit.innerText;
            authSubmit.innerText = "لطفاً صبر کن...";

            try{
                const res = await fetch(API_BASE + endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });

                const data = await res.json();

                if(!res.ok){
                    throw new Error(data.detail || "یه مشکلی پیش اومد.");
                }

                saveSession(data.access_token, data.user);
                closeAuth();
                authForm.reset();

            }catch(err){
                if(err instanceof TypeError){
                    // معمولاً یعنی fetch اصلاً به سرور نرسیده (سرور روشن نیست یا CORS)
                    if(authError) authError.innerText = "به سرور وصل نشد. مطمئن شو بک‌اند (uvicorn) روشنه.";
                }else{
                    if(authError) authError.innerText = err.message;
                }
            }finally{
                authSubmit.disabled = false;
                authSubmit.innerText = originalLabel;
            }
        });
    }

    // در دسترس‌کردن توابع برای onclick داخل HTML
    window.toggleSidebar  = toggleSidebar;
    window.openAuth       = openAuth;
    window.closeAuth      = closeAuth;
    window.toggleAuthMode = toggleAuthMode;

    // کلیک روی فضای خالی پشت مودال، ببندتش
    if(authModal){
        authModal.addEventListener("click", (e) => {
            if(e.target === authModal) closeAuth();
        });
    }

    // بستن سایدبار/مودال با کلید Esc
    document.addEventListener("keydown", (e) => {
        if(e.key !== "Escape") return;
        if(sidebar) sidebar.classList.remove("active");
        closeAuth();
    });

    // =========================
    // فرم تماس با ما
    // =========================

    const contactForm = document.getElementById("contact-form") || document.querySelector(".contact-card");
    const contactMsg   = document.getElementById("contact-msg");

    if(contactForm){
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if(contactMsg) contactMsg.innerText = "پیامت ارسال شد! به‌زودی جوابت رو می‌دیم. 🙌";
            contactForm.reset();
        });
    }

    // =========================
    // کارت محصول: چرخش کوتاه، بعد رفتن به صفحه‌ی واقعی محصول
    // =========================

    document.querySelectorAll(".spin-link").forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            if(card.classList.contains("spin-out")) return;

            const href = card.getAttribute("href");
            card.classList.add("spin-out");
            setTimeout(() => { window.location.href = href; }, 480);
        });
    });

    // =========================
    // ۵) فرم جستجو
    // =========================

    if(searchForm){
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const productLink = searchInput.value.trim();

            if(productLink === ""){
                alert("لطفاً لینک محصول را وارد کنید.");
                return;
            }

            if(!productLink.startsWith("http://") && !productLink.startsWith("https://")){
                alert("لطفاً یک لینک معتبر وارد کنید.");
                return;
            }

            alert("در حال بررسی محصول...");
            console.log(productLink);
        });
    }

    // =========================
    // ۶) انیمیشن شمارنده‌ی آمار
    // =========================

    function animateCounter(element){
        const text = element.innerText;
        const number = parseInt(text.replace(/\D/g, ""));
        if(isNaN(number)) return;

        let current = 0;
        const speed = number / 60;

        const timer = setInterval(() => {
            current += speed;

            if(current >= number){
                current = number;
                clearInterval(timer);
            }

            if(text.includes("K")){
                element.innerText = Math.floor(current) + "K";
            }else if(text.includes("M")){
                element.innerText = Math.floor(current) + "M";
            }else{
                element.innerText = Math.floor(current);
            }
        }, 15);
    }

    // =========================
    // ۷) reveal روی اسکرول
    // =========================

    const revealItems = document.querySelectorAll(".scroll-reveal");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("in-view");

                const counter = entry.target.querySelector("h2");
                if(counter) animateCounter(counter);

                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold:.2 });

    revealItems.forEach(item => revealObserver.observe(item));

    // =========================
    // ۸) افکت نور زیر موس روی کارت‌ها
    // =========================

    const glowCards = document.querySelectorAll(".feature-card, .stat-card, .product-card");

    glowCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(110,168,255,.28), rgba(255,255,255,.05) 65%)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.background = "";
        });
    });

    // =========================
    // ۹) کج‌شدن سبک کارت‌های ویژگی زیر موس
    // =========================

    const tiltCards = document.querySelectorAll(".feature-card, .product-card");

    tiltCards.forEach(card => {
        card.style.transformStyle = "preserve-3d";
        card.style.willChange = "transform";

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;

            const rotateX = (py * -10).toFixed(2);
            const rotateY = (px * 10).toFixed(2);

            card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(700px) rotateX(0) rotateY(0) translateY(0)";
        });
    });

});
