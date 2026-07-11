// =========================
// We Know — دیتای محصولات (مشترک بین صفحات)
// =========================

const PRODUCTS = {
    p1: {
        name: "گوشی موبایل سامسونگ Galaxy A55",
        icon: "📱", category: "electronics", categoryLabel: "الکترونیکی",
        priceNum: 22100000, price: "۲۲,۱۰۰,۰۰۰ تومان", badge: "۱۸٪ زیر سقف قیمت", fake: false,
        ai: "قیمت این محصول تو ۶ هفته‌ی گذشته ۱۸٪ پایین‌تر از بالاترین قیمت ثبت‌شده‌ست. روند کلی نزولیه و الان می‌تونه زمان مناسبی برای خرید باشه.",
        history: [26500000,25100000,23800000,21400000,21900000,22100000],
        reviews: [
            { name:"سارا", stars:"★★★★★", text:"کیفیت دوربینش عالیه، راضی‌ام." },
            { name:"امیر", stars:"★★★★☆", text:"باتریش خوبه ولی گرم می‌کنه گاهی." }
        ]
    },
    p2: {
        name: "هدفون بی‌سیم سونی WH-1000XM5",
        icon: "🎧", category: "electronics", categoryLabel: "الکترونیکی",
        priceNum: 18450000, price: "۱۸,۴۵۰,۰۰۰ تومان", badge: "۲۶٪ زیر سقف قیمت", fake: false,
        ai: "این یکی از بهترین زمان‌های خرید این هدفون تو ۲ ماه اخیر بوده. نویزکنسلینگش هم تو این رده قیمتی رقیب نداره.",
        history: [24900000,24200000,19800000,17200000,18100000,18450000],
        reviews: [
            { name:"مهدی", stars:"★★★★★", text:"حذف نویزش فوق‌العاده‌ست." },
            { name:"نیلوفر", stars:"★★★★★", text:"ارزش خریدن داره، صداش تمیزه." }
        ]
    },
    p3: {
        name: "ست آرایشی میبلین",
        icon: "💄", category: "beauty", categoryLabel: "آرایشی و بهداشتی",
        priceNum: 1250000, price: "۱,۲۵۰,۰۰۰ تومان", badge: "تخفیف الکی", fake: true,
        ai: "قیمت «قبل از تخفیف» که فروشگاه نشون داده، فقط ۳ روز قبل از شروع حراج ثبت شده. قیمت واقعیِ متوسط این محصول در ۲ ماه گذشته پایین‌تر از قیمت الانه.",
        history: [1100000,1150000,1180000,1900000,1300000,1250000],
        reviews: [
            { name:"مریم", stars:"★★★☆☆", text:"کیفیتش خوبه ولی گرون‌تر از قبل شده." }
        ]
    },
    p4: {
        name: "کاپشن زمستانی مردانه",
        icon: "👕", category: "fashion", categoryLabel: "مد و پوشاک",
        priceNum: 980000, price: "۹۸۰,۰۰۰ تومان", badge: "۱۲٪ زیر سقف قیمت", fake: false,
        ai: "قیمت این محصول فصلیه و معمولاً اوایل زمستون افت می‌کنه. الان تقریباً نزدیک به کف قیمت فصل قرار داره.",
        history: [1100000,1080000,950000,900000,940000,980000],
        reviews: [
            { name:"رضا", stars:"★★★★☆", text:"گرمه و دوخت خوبی داره." }
        ]
    },
    p5: {
        name: "ماشین لباسشویی ال‌جی ۸ کیلویی",
        icon: "🏠", category: "home", categoryLabel: "خانه و آشپزخانه",
        priceNum: 31900000, price: "۳۱,۹۰۰,۰۰۰ تومان", badge: "۱۴٪ زیر سقف قیمت", fake: false,
        ai: "نوسان قیمت این محصول تو بازه‌ی ۶ هفته‌ای زیاد بوده. الان نسبتاً پایین‌تر از میانگینه ولی احتمال افت بیشتر هم هست.",
        history: [33000000,32800000,32800000,29500000,30800000,31900000],
        reviews: [
            { name:"فاطمه", stars:"★★★★★", text:"بی‌صدا و مصرف برق پایینی داره." }
        ]
    },
    p6: {
        name: "پک آجیل و خشکبار پذیرایی",
        icon: "🍎", category: "food", categoryLabel: "خوراکی",
        priceNum: 650000, price: "۶۵۰,۰۰۰ تومان", badge: "۹٪ زیر سقف قیمت", fake: false,
        ai: "قیمت خشکبار معمولاً نزدیک عید بالا می‌ره. الان نسبت به بقیه‌ی سال قیمت خوبیه.",
        history: [700000,690000,680000,660000,640000,650000],
        reviews: [
            { name:"حسین", stars:"★★★★★", text:"تازه بود و بسته‌بندی خوبی داشت." }
        ]
    },
    p7: {
        name: "سرویس نصب و راه‌اندازی هوشمندسازی خانه",
        icon: "🛠️", category: "services", categoryLabel: "خدمات",
        priceNum: 2400000, price: "۲,۴۰۰,۰۰۰ تومان", badge: "۷٪ زیر سقف قیمت", fake: false,
        ai: "قیمت خدمات نصب معمولاً ثابت‌تر از کالاست. این تغییر جزئی احتمالاً به‌خاطر تخفیف فصلیه.",
        history: [2500000,2550000,2500000,2450000,2380000,2400000],
        reviews: [
            { name:"علی", stars:"★★★★☆", text:"سر وقت اومدن و کارشون تمیز بود." }
        ]
    }
};

function buildSparkline(history){
    const w = 560, h = 130, pad = 8;
    const max = Math.max(...history), min = Math.min(...history);
    const range = (max - min) || 1;

    const points = history.map((v, i) => {
        const x = pad + (i / (history.length - 1)) * (w - pad * 2);
        const y = h - pad - ((v - min) / range) * (h - pad * 2);
        return `${x},${y}`;
    }).join(" ");

    return `
    <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
        <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#6EA8FF"/>
                <stop offset="100%" stop-color="#A78BFA"/>
            </linearGradient>
        </defs>
        <polyline points="${points}" fill="none" stroke="url(#sparkGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

function toman(n){ return n.toLocaleString("fa-IR"); }
