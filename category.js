// =========================
// We Know — category.js
// فقط تو category.html لود میشه
// =========================

document.addEventListener("DOMContentLoaded", () => {

    if(typeof CATEGORIES === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const activeCat = params.get("cat");

    const badgeTags = {
        electronics: ["پرفروش", "ارسال سریع"],
        beauty:      ["ارسال رایگان", "پرفروش"],
        food:        ["تازه", "ارسال رایگان"],
        fashion:     ["پرفروش", "تخفیف فصلی"],
        home:        ["ارسال سریع", "پرفروش"],
        services:    ["مقایسه قیمت", "معتبر"]
    };

    // =========================
    // ۱) کارت‌های رنگی دسته‌بندی (همیشه بالای صفحه)
    // =========================

    const catGrid = document.getElementById("catGrid");
    if(catGrid){
        catGrid.innerHTML = Object.keys(CATEGORIES).map(key => {
            const c = CATEGORIES[key];
            const tags = badgeTags[key] || [];
            return `
            <a href="category.html?cat=${key}" class="cat-card cat-${key} ${key === activeCat ? "active" : ""}">
                <span class="cat-card-icon">${c.icon}</span>
                <h3>${c.label}</h3>
                <div class="cat-card-tags">
                    ${tags.map(t => `<span>${t}</span>`).join("")}
                </div>
            </a>`;
        }).join("");
    }

    // =========================
    // ۲) دسته‌ی انتخاب‌شده: اینترو + فروشگاه‌ها
    // =========================

    if(!activeCat || !CATEGORIES[activeCat]){
        return; // هیچ دسته‌ای انتخاب نشده: فقط همون گرید رنگی نشون داده میشه
    }

    // یه دسته انتخاب شده: گرید بالا رو مخفی کن، فقط همون دسته نشون داده بشه
    const gridWrap = document.querySelector(".cat-grid-wrap");
    if(gridWrap) gridWrap.style.display = "none";

    const cat = CATEGORIES[activeCat];

    document.title = cat.label + " | We Know";

    // تم رنگی روی بخش‌های مربوطه
    document.getElementById("catIntro").classList.add("theme-" + cat.theme, "show");
    document.getElementById("storesWrap").classList.add("theme-" + cat.theme);

    document.getElementById("catIntroIcon").innerText = cat.icon;
    document.getElementById("catIntroTitle").innerText = cat.label;

    const storesWrap = document.getElementById("storesWrap");
    storesWrap.innerHTML = cat.stores.map(store => `
        <div class="store-section">
            <div class="store-head">
                <h2>🏪 ${store.name}</h2>
                <a href="${store.url}" target="_blank" rel="noopener">مشاهده در ${store.name} ↗</a>
            </div>
            <div class="store-grid">
                ${store.products.map(p => `
                    <div class="store-product-card">
                        <div class="spc-icon">${p.icon}</div>
                        <h4>${p.name}</h4>
                        <div class="spc-price">${p.price}</div>
                        ${p.badge ? `<span class="spc-badge">${p.badge}</span>` : ""}
                    </div>
                `).join("")}
            </div>
        </div>
    `).join("");

});
