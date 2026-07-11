// =========================
// We Know — wallet.js
// فقط تو wallet.html لود میشه
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const BALANCE_KEY = "weknow_wallet_balance";
    const ALERTS_KEY   = "weknow_wallet_alerts";
    const HISTORY_KEY  = "weknow_wallet_history";

    function getBalance(){
        const v = localStorage.getItem(BALANCE_KEY);
        return v ? parseInt(v, 10) : 5000000; // موجودی نمایشی پیش‌فرض
    }

    function setBalance(v){
        localStorage.setItem(BALANCE_KEY, String(v));
    }

    function getAlerts(){
        return JSON.parse(localStorage.getItem(ALERTS_KEY) || "[]");
    }

    function setAlerts(list){
        localStorage.setItem(ALERTS_KEY, JSON.stringify(list));
    }

    function getHistory(){
        return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    }

    function addHistory(entry){
        const h = getHistory();
        h.unshift(entry);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
    }

    function parseAmount(str){
        const fa = "۰۱۲۳۴۵۶۷۸۹";
        const converted = (str || "").replace(/[۰-۹]/g, d => fa.indexOf(d));
        return parseInt(converted.replace(/[^\d]/g, ""), 10) || 0;
    }

    function renderBalance(){
        document.getElementById("walletBalance").innerText = toman(getBalance()) + " تومان";
    }

    function renderAlerts(){
        const list = getAlerts();
        const el = document.getElementById("alertList");

        if(!list.length){
            el.innerHTML = `<p class="empty-state">هنوز هیچ هشدار خرید خودکاری فعال نکردی. از صفحه‌ی هر محصول می‌تونی اضافه کنی.</p>`;
            return;
        }

        el.innerHTML = list.map(a => {
            const product = (typeof PRODUCTS !== "undefined") ? PRODUCTS[a.productId] : null;
            const current = product ? product.priceNum : null;
            const ready = current !== null && current <= a.targetPrice;
            const progress = current ? Math.min(100, Math.round((a.targetPrice / current) * 100)) : 0;
            const autoBuy = a.autoBuy !== false;

            return `
            <div class="alert-item">
                <div class="ai-top">
                    <div class="ai-info">
                        <span>${a.icon || "🛒"}</span>
                        <div>
                            <div>${a.productName}</div>
                            <div style="font-size:.75rem;color:#8a84ab;">
                                هدف: <span class="ai-target">${toman(a.targetPrice)} تومان</span>
                                ${ready ? " — آماده‌ی خرید ✅" : ""}
                            </div>
                        </div>
                    </div>
                    <div class="ai-controls">
                        <label class="switch" title="خرید خودکار">
                            <input type="checkbox" ${autoBuy ? "checked" : ""} onchange="toggleAutoBuy(${a.id})">
                            <span class="switch-slider"></span>
                        </label>
                        <button class="alert-remove" onclick="removeAlert(${a.id})">✕</button>
                    </div>
                </div>
                <div class="alert-progress">
                    <div class="alert-progress-fill" style="width:${progress}%"></div>
                </div>
            </div>`;
        }).join("");
    }

    function renderHistory(){
        const list = getHistory();
        const el = document.getElementById("historyList");

        if(!list.length){
            el.innerHTML = `<p class="empty-state">هنوز خریدی ثبت نشده.</p>`;
            return;
        }

        el.innerHTML = list.map(h => `
            <div class="history-item">
                <div class="hi-info">
                    <span>${h.icon || "🛒"}</span>
                    <span>${h.name}</span>
                </div>
                <div style="color:#6b6491;">${toman(h.price)} تومان · ${h.date}</div>
            </div>
        `).join("");
    }

    function renderAll(){
        renderBalance();
        renderAlerts();
        renderHistory();
    }

    window.topUp = function(){
        const input = document.getElementById("topupInput");
        const msg   = document.getElementById("walletMsg");
        const amount = parseAmount(input.value);

        if(!amount){
            msg.innerText = "یه مبلغ معتبر وارد کن.";
            return;
        }

        setBalance(getBalance() + amount);
        input.value = "";
        msg.innerText = `${toman(amount)} تومان به کیف‌پولت اضافه شد. ✅`;
        renderBalance();
    };

    window.withdraw = function(){
        const input = document.getElementById("withdrawInput");
        const msg   = document.getElementById("walletMsg");
        const amount = parseAmount(input.value);
        const balance = getBalance();

        if(!amount){
            msg.innerText = "یه مبلغ معتبر وارد کن.";
            return;
        }
        if(amount > balance){
            msg.innerText = "موجودی کافی نیست.";
            return;
        }

        setBalance(balance - amount);
        input.value = "";
        msg.innerText = `${toman(amount)} تومان برداشت شد. ✅`;
        renderBalance();
    };

    window.removeAlert = function(id){
        setAlerts(getAlerts().filter(a => a.id !== id));
        renderAlerts();
    };

    window.toggleAutoBuy = function(id){
        const alerts = getAlerts().map(a => {
            if(a.id === id) a.autoBuy = a.autoBuy === false ? true : false;
            return a;
        });
        setAlerts(alerts);
        renderAlerts();
    };

    window.checkAndBuy = function(){
        const msg = document.getElementById("walletMsg");
        let alerts = getAlerts();
        let balance = getBalance();
        let bought = 0;

        alerts = alerts.filter(a => {
            if(a.autoBuy === false) return true; // خرید خودکار خاموشه، نگهش دار

            const product = (typeof PRODUCTS !== "undefined") ? PRODUCTS[a.productId] : null;
            if(!product) return true;

            const ready = product.priceNum <= a.targetPrice;
            if(!ready) return true;

            if(balance < product.priceNum){
                return true; // پول کافی نیست، هشدار می‌مونه
            }

            balance -= product.priceNum;
            addHistory({
                name: product.name,
                icon: product.icon,
                price: product.priceNum,
                date: new Date().toLocaleDateString("fa-IR")
            });
            bought++;
            return false; // این هشدار انجام شد، از لیست حذف میشه
        });

        setBalance(balance);
        setAlerts(alerts);
        renderAll();

        msg.innerText = bought > 0
            ? `${bought} تا خرید خودکار انجام شد! برو تاریخچه رو ببین. 🎉`
            : "فعلاً هیچ محصولی به قیمت هدف نرسیده یا موجودی کافی نیست.";
    };

    renderAll();
});
