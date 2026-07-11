// =========================
// We Know — dashboard.js
// فقط تو dashboard.html لود میشه
// =========================

const API_BASE = "http://127.0.0.1:8000";

document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("weknow_token");

    // اگه لاگین نکرده، بفرستش صفحه‌ی اصلی و مودال ورود رو خودکار باز کن
    if(!token){
        window.location.href = "index.html?login=1";
        return;
    }

    // =========================
    // گرفتن اطلاعات کاربر از سرور واقعی
    // =========================

    try{
        const res = await fetch(API_BASE + "/api/me", {
            headers: { "Authorization": "Bearer " + token }
        });

        if(!res.ok){
            // توکن منقضی شده یا نامعتبره
            localStorage.removeItem("weknow_token");
            localStorage.removeItem("weknow_user");
            window.location.href = "index.html?login=1";
            return;
        }

        const user = await res.json();
        localStorage.setItem("weknow_user", JSON.stringify(user));

        const initial = user.name ? user.name.trim().charAt(0) : "؟";
        document.getElementById("dashAvatar").innerText = initial;
        document.getElementById("dashName").innerText = user.name;
        document.getElementById("dashEmail").innerText = user.email;
        document.getElementById("dashGreeting").innerText = `خوش اومدی، ${user.name} 👋`;
        document.getElementById("profileName").innerText = user.name;
        document.getElementById("profileEmail").innerText = user.email;

    }catch(err){
        document.getElementById("dashGreeting").innerText = "به سرور وصل نشد ⚠️";
        document.getElementById("dashName").innerText = "بک‌اند روشن نیست";
    }

    // =========================
    // خلاصه‌ی کیف‌پول (از localStorage، همون‌جایی که wallet.html ذخیره می‌کنه)
    // =========================

    function toman(n){ return Number(n || 0).toLocaleString("fa-IR"); }

    const balance = parseInt(localStorage.getItem("weknow_wallet_balance") || "0", 10);
    const alerts = JSON.parse(localStorage.getItem("weknow_wallet_alerts") || "[]");
    const history = JSON.parse(localStorage.getItem("weknow_wallet_history") || "[]");

    document.getElementById("dashBalance").innerText = toman(balance) + " تومان";
    document.getElementById("dashAlertsCount").innerText = alerts.length;
    document.getElementById("dashOrdersCount").innerText = history.length;

    const alertsList = document.getElementById("dashAlertsList");
    if(!alerts.length){
        alertsList.innerHTML = `<p class="empty-state">هنوز هیچ هشداری فعال نکردی.</p>`;
    }else{
        alertsList.innerHTML = alerts.map(a => `
            <div class="history-item">
                <div class="hi-info">
                    <span>${a.icon || "🛒"}</span>
                    <span>${a.productName}</span>
                </div>
                <div style="color:#6b6491;">هدف: ${toman(a.targetPrice)} تومان</div>
            </div>
        `).join("");
    }

    const ordersList = document.getElementById("dashOrdersList");
    if(!history.length){
        ordersList.innerHTML = `<p class="empty-state">هنوز خریدی ثبت نشده.</p>`;
    }else{
        ordersList.innerHTML = history.map(h => `
            <div class="history-item">
                <div class="hi-info">
                    <span>${h.icon || "🛒"}</span>
                    <span>${h.name}</span>
                </div>
                <div style="color:#6b6491;">${toman(h.price)} تومان · ${h.date}</div>
            </div>
        `).join("");
    }

});

function logoutUser(){
    if(!confirm("مطمئنی می‌خوای از حسابت خارج بشی؟")) return;
    localStorage.removeItem("weknow_token");
    localStorage.removeItem("weknow_user");
    window.location.href = "index.html";
}
