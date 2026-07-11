// =========================
// We Know — product.js
// فقط تو product.html لود میشه
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const productPage = document.getElementById("productPage");

    if(typeof PRODUCTS === "undefined"){
        if(productPage) productPage.innerHTML = `<div style="padding:160px 24px;text-align:center;">فایل <b>products-data.js</b> لود نشده. مطمئن شو کنار بقیه‌ی فایل‌هاست.</div>`;
        return;
    }

    const p = PRODUCTS[id];

    if(!p || !productPage){
        if(productPage) productPage.innerHTML = `<div style="padding:160px 24px;text-align:center;">محصولی با این شناسه (${id}) پیدا نشد. از صفحه‌ی محصولات دوباره وارد شو.</div>`;
        return;
    }

    function el(elId){ return document.getElementById(elId); }
    function setText(elId, text){ const e = el(elId); if(e) e.innerText = text; }
    function setHTML(elId, html){ const e = el(elId); if(e) e.innerHTML = html; }

    // تم رنگی بر اساس دسته‌بندی
    productPage.classList.add("theme-" + p.category);

    setText("ppIcon", p.icon);
    setText("ppName", p.name);
    setText("ppPrice", p.price);
    document.title = p.name + " | We Know";

    const badgeEl = el("ppBadge");
    if(badgeEl){
        badgeEl.innerText = p.badge;
        badgeEl.className = "product-page-badge" + (p.fake ? " fake" : "");
    }

    setText("ppAI", p.ai);
    setHTML("ppChart", buildSparkline(p.history));

    // =========================
    // مقایسه قیمت بین فروشگاه‌ها (دیجی‌کالا / ترب / ایمالز)
    // =========================

    function renderCompare(){
        const stores = [
            { name: "دیجی‌کالا", icon: "🛍️", factor: 1 },
            { name: "ترب",       icon: "🔎", factor: 1.035 },
            { name: "ایمالز",    icon: "🛒", factor: 0.978 }
        ];

        const rows = stores.map(s => ({
            name: s.name, icon: s.icon,
            price: Math.round((p.priceNum * s.factor) / 1000) * 1000
        }));

        const min = Math.min(...rows.map(r => r.price));

        setHTML("ppCompare", rows
            .sort((a, b) => a.price - b.price)
            .map(r => `
                <div class="compare-row ${r.price === min ? "cheapest" : ""}">
                    <span class="cr-store">${r.icon} ${r.name}</span>
                    <span class="cr-price">
                        ${r.price === min ? `<span class="cheapest-tag">ارزون‌ترین</span>` : ""}
                        ${toman(r.price)} تومان
                    </span>
                </div>
            `).join(""));
    }

    renderCompare();

    // =========================
    // نظرات: نمایش نظرات پیش‌فرض + نظرات ثبت‌شده‌ی کاربر (ذخیره تو مرورگر)
    // =========================

    const REVIEWS_KEY = "weknow_reviews_" + id;

    function getUserReviews(){
        return JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
    }

    function renderReviews(){
        const all = p.reviews.concat(getUserReviews());
        setHTML("ppReviews", all.map(r => `
            <div class="review-item ${r.isNew ? "new-review" : ""}">
                <div class="review-top">
                    <span>${r.name}</span>
                    <span class="stars">${r.stars}</span>
                </div>
                <p>${r.text}</p>
            </div>
        `).join(""));
    }

    renderReviews();

    const reviewForm = document.getElementById("reviewForm");
    if(reviewForm){
        reviewForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name  = document.getElementById("reviewName").value.trim();
            const text  = document.getElementById("reviewText").value.trim();
            const stars = document.getElementById("reviewStars").value;

            if(!name || !text) return;

            const list = getUserReviews();
            list.push({ name, text, stars, isNew: true });
            localStorage.setItem(REVIEWS_KEY, JSON.stringify(list));

            renderReviews();
            reviewForm.reset();
        });
    }

    // =========================
    // اعلان قیمت (+ اتصال اختیاری به کیف‌پول برای خرید خودکار)
    // =========================

    function parsePrice(str){
        const fa = "۰۱۲۳۴۵۶۷۸۹";
        const converted = str.replace(/[۰-۹]/g, d => fa.indexOf(d));
        return parseInt(converted.replace(/[^\d]/g, ""), 10);
    }

    window.setPriceAlert = function(){
        const input   = document.getElementById("ppTargetPrice");
        const msg     = document.getElementById("ppAlertMsg");
        const autoBuy = document.getElementById("ppAutoBuy");

        const target = parsePrice(input.value || "");

        if(!target){
            msg.innerText = "لطفاً یه قیمت معتبر وارد کن.";
            return;
        }

        if(autoBuy && autoBuy.checked){
            const alerts = JSON.parse(localStorage.getItem("weknow_wallet_alerts") || "[]");
            alerts.push({
                id: Date.now(),
                productId: id,
                productName: p.name,
                icon: p.icon,
                targetPrice: target,
                createdAt: new Date().toLocaleDateString("fa-IR")
            });
            localStorage.setItem("weknow_wallet_alerts", JSON.stringify(alerts));
            msg.innerText = `ثبت شد! وقتی قیمت به ${toman(target)} تومان یا کمتر رسید، از کیف‌پولت خریداری میشه. 🔔`;
        }else{
            msg.innerText = `باشه! وقتی قیمت به ${toman(target)} تومان یا کمتر رسید بهت خبر می‌دیم. 🔔`;
        }
    };

});
