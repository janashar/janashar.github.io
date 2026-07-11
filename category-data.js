// =========================
// We Know — دیتای دسته‌بندی‌ها (برای صفحه‌ی category.html)
// =========================

const CATEGORIES = {
    electronics: {
        label: "الکترونیکی",
        icon: "📱",
        theme: "electronics",
        stores: [
            {
                name: "دیجی‌کالا",
                url: "https://www.digikala.com",
                products: [
                    { icon: "📱", name: "گوشی سامسونگ Galaxy A55", price: "۲۲,۱۰۰,۰۰۰ تومان", badge: "پرفروش" },
                    { icon: "🎧", name: "هدفون سونی WH-1000XM5", price: "۱۸,۴۵۰,۰۰۰ تومان", badge: "ارزان‌ترین" }
                ]
            },
            {
                name: "ترب",
                url: "https://torob.com",
                products: [
                    { icon: "💻", name: "لپ‌تاپ لنوو IdeaPad Slim 3", price: "۴۲,۹۰۰,۰۰۰ تومان", badge: "" },
                    { icon: "⌚", name: "ساعت هوشمند شیائومی Band 9", price: "۲,۴۰۰,۰۰۰ تومان", badge: "تخفیف امروز" }
                ]
            },
            {
                name: "ایمالز",
                url: "https://emalls.ir",
                products: [
                    { icon: "🎮", name: "پلی‌استیشن ۵ اسلیم", price: "۳۵,۲۰۰,۰۰۰ تومان", badge: "" },
                    { icon: "📷", name: "دوربین دیجیتال کانن", price: "۲۸,۰۰۰,۰۰۰ تومان", badge: "" }
                ]
            }
        ]
    },
    beauty: {
        label: "آرایشی و بهداشتی",
        icon: "💄",
        theme: "beauty",
        stores: [
            {
                name: "خانومی",
                url: "https://www.khanoumi.com",
                products: [
                    { icon: "💄", name: "ست آرایشی میبلین", price: "۱,۲۵۰,۰۰۰ تومان", badge: "پرفروش" },
                    { icon: "🧴", name: "کرم مرطوب‌کننده نیوآ", price: "۳۸۰,۰۰۰ تومان", badge: "" }
                ]
            },
            {
                name: "رژا شاپ",
                url: "https://rojashop.com",
                products: [
                    { icon: "💅", name: "لاک ناخن اسنس", price: "۱۲۰,۰۰۰ تومان", badge: "" },
                    { icon: "🌸", name: "عطر زنانه فلورمار", price: "۹۵۰,۰۰۰ تومان", badge: "تخفیف امروز" }
                ]
            },
            {
                name: "مدیاژ",
                url: "https://modiaj.ir",
                products: [
                    { icon: "💆‍♀️", name: "ماسک مو کراتینه", price: "۲۹۰,۰۰۰ تومان", badge: "" },
                    { icon: "🖌️", name: "براش آرایشی حرفه‌ای", price: "۴۵۰,۰۰۰ تومان", badge: "" }
                ]
            }
        ]
    },
    food: {
        label: "خوراکی",
        icon: "🍎",
        theme: "food",
        stores: [
            {
                name: "افق کوروش",
                url: "https://okcs.com",
                products: [
                    { icon: "🍎", name: "پک آجیل و خشکبار پذیرایی", price: "۶۵۰,۰۰۰ تومان", badge: "پرفروش" },
                    { icon: "🫒", name: "روغن زیتون فرابکر", price: "۴۲۰,۰۰۰ تومان", badge: "" }
                ]
            },
            {
                name: "هایپر فامیلی",
                url: "https://hyperfamili.com",
                products: [
                    { icon: "🥛", name: "پک لبنیات خانواده", price: "۳۸۰,۰۰۰ تومان", badge: "تخفیف امروز" },
                    { icon: "🍫", name: "شکلات و تنقلات میهمانی", price: "۲۹۰,۰۰۰ تومان", badge: "" }
                ]
            },
            {
                name: "اُکالا",
                url: "https://okala.com",
                products: [
                    { icon: "🍞", name: "سبد نان و صبحانه", price: "۲۱۰,۰۰۰ تومان", badge: "" },
                    { icon: "🍉", name: "میوه‌های فصل تازه", price: "۳۵۰,۰۰۰ تومان", badge: "ارسال رایگان" }
                ]
            }
        ]
    },
    fashion: {
        label: "مد و پوشاک",
        icon: "👕",
        theme: "fashion",
        stores: [
            {
                name: "مدیسه",
                url: "https://www.modiseh.com",
                products: [
                    { icon: "👕", name: "کاپشن زمستانی مردانه", price: "۹۸۰,۰۰۰ تومان", badge: "پرفروش" },
                    { icon: "👗", name: "پیراهن مجلسی زنانه", price: "۱,۴۵۰,۰۰۰ تومان", badge: "" }
                ]
            },
            {
                name: "بانی‌مد",
                url: "https://baniamode.com",
                products: [
                    { icon: "👟", name: "کفش اسپرت مردانه", price: "۱,۱۰۰,۰۰۰ تومان", badge: "تخفیف امروز" },
                    { icon: "🧥", name: "پالتو زنانه پاییزه", price: "۱,۸۰۰,۰۰۰ تومان", badge: "" }
                ]
            },
            {
                name: "دیجی‌استایل",
                url: "https://style.digikala.com",
                products: [
                    { icon: "👖", name: "شلوار جین مردانه", price: "۷۵۰,۰۰۰ تومان", badge: "" },
                    { icon: "🎒", name: "کوله‌پشتی روزمره", price: "۶۲۰,۰۰۰ تومان", badge: "" }
                ]
            }
        ]
    },
    home: {
        label: "خانه و آشپزخانه",
        icon: "🏠",
        theme: "home",
        stores: [
            {
                name: "دیجی‌کالا",
                url: "https://www.digikala.com",
                products: [
                    { icon: "🌀", name: "ماشین لباسشویی ال‌جی ۸ کیلویی", price: "۳۱,۹۰۰,۰۰۰ تومان", badge: "پرفروش" },
                    { icon: "🍳", name: "سرویس قابلمه ۱۲ پارچه", price: "۴,۲۰۰,۰۰۰ تومان", badge: "" }
                ]
            },
            {
                name: "ترب",
                url: "https://torob.com",
                products: [
                    { icon: "❄️", name: "یخچال ساید بای ساید", price: "۵۸,۰۰۰,۰۰۰ تومان", badge: "" },
                    { icon: "🛋️", name: "مبل راحتی سه‌نفره", price: "۱۲,۵۰۰,۰۰۰ تومان", badge: "تخفیف امروز" }
                ]
            },
            {
                name: "ایمالز",
                url: "https://emalls.ir",
                products: [
                    { icon: "🧹", name: "جاروبرقی بدون سیم", price: "۶,۸۰۰,۰۰۰ تومان", badge: "" },
                    { icon: "🛏️", name: "تشک طبی دو نفره", price: "۹,۹۰۰,۰۰۰ تومان", badge: "" }
                ]
            }
        ]
    },
    services: {
        label: "خدمات",
        icon: "🛠️",
        theme: "services",
        stores: [
            {
                name: "ازکی",
                url: "https://www.azki.com",
                products: [
                    { icon: "🚗", name: "بیمه شخص ثالث خودرو", price: "از ۲,۸۰۰,۰۰۰ تومان", badge: "مقایسه قیمت" },
                    { icon: "🏥", name: "بیمه درمان تکمیلی", price: "از ۱,۲۰۰,۰۰۰ تومان", badge: "" }
                ]
            },
            {
                name: "اسنپ",
                url: "https://snapp.ir",
                products: [
                    { icon: "🚕", name: "سرویس درخواست خودرو", price: "متغیر بر اساس مسیر", badge: "" },
                    { icon: "🍔", name: "اسنپ‌فود — سفارش غذا", price: "ارسال از ۲۵,۰۰۰ تومان", badge: "تخفیف اولین سفارش" }
                ]
            },
            {
                name: "بیمه‌بازار",
                url: "https://bimehbazar.com",
                products: [
                    { icon: "🏍️", name: "بیمه موتورسیکلت", price: "از ۹۵۰,۰۰۰ تومان", badge: "" },
                    { icon: "🔧", name: "سرویس نصب و راه‌اندازی هوشمندسازی خانه", price: "۲,۴۰۰,۰۰۰ تومان", badge: "پرفروش" }
                ]
            }
        ]
    }
};
