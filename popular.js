/ =========================
// We Know — popular.js
// فقط تو popular.html لود میشه
// =========================

document.addEventListener("DOMContentLoaded", () => {

    if(typeof PRODUCTS === "undefined") return;

    const grid = document.getElementById("popularGrid");
    if(!grid) return;

    const list = Object.keys(PRODUCTS)
        .map(id => ({ id, ...PRODUCTS[id] }))
        .sort((a, b) => (b.views || 0) - (a.views || 0));

    grid.innerHTML = list.map((p, i) => `
        <a href="product.html?id=${p.id}" class="product-card spin-link scroll-reveal spin-reveal">
            <span class="product-icon">${p.icon}</span>
            <h3>${p.name}</h3>
            <p class="price">${p.price}</p>
            <span class="product-badge ${p.fake ? "fake" : ""}">
                ${i === 0 ? "🥇 پربازدیدترین" : i === 1 ? "🥈 داغ" : i === 2 ? "🥉 داغ" : (p.badge || "")}
            </span>
        </a>
    `).join("");

});
