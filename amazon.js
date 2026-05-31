/* ============================================================
   AMAZON.IN CLONE — 100% Pure JavaScript
   Everything: styles, DOM creation, data, interactions
   ============================================================ */

"use strict";

// ─────────────────────────────────────────────
// 1. INJECT GLOBAL CSS via JS
// ─────────────────────────────────────────────
const injectStyles = (css) => {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
};

injectStyles(`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --dark:   #131921;
    --mid:    #232f3e;
    --light:  #37475a;
    --orange: #febd69;
    --yellow: #f90;
    --red:    #b12704;
    --blue:   #007185;
    --bg:     #eaeded;
    --white:  #fff;
    --text:   #0f1111;
    --muted:  #565959;
    --border: #ddd;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: var(--bg);
    color: var(--text);
  }

  /* NAV */
  #amz-header {
    background: var(--dark);
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 2px 8px rgba(0,0,0,.4);
  }
  .nav-top {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 18px; max-width: 1500px; margin: 0 auto;
  }
  .amz-logo {
    font-size: 24px; font-weight: 700; color: #fff;
    cursor: pointer; letter-spacing: -1px; user-select: none;
    padding: 4px 8px; border: 1px solid transparent; border-radius: 3px;
    flex-shrink: 0;
  }
  .amz-logo span { color: var(--orange); }
  .amz-logo:hover { border-color: #fff; }

  .nav-location {
    display: flex; flex-direction: column;
    color: #fff; font-size: 11px;
    padding: 4px 8px; border: 1px solid transparent;
    border-radius: 3px; cursor: pointer; flex-shrink: 0;
  }
  .nav-location:hover { border-color: #fff; }
  .nav-location strong { font-size: 13px; }

  .search-wrap {
    flex: 1; display: flex; height: 40px;
    border-radius: 5px; overflow: hidden;
  }
  .search-cat {
    background: #f3f3f3; border: none;
    padding: 0 10px; font-size: 12px;
    cursor: pointer; border-right: 1px solid #cdcdcd;
    color: var(--text); font-family: inherit;
    flex-shrink: 0;
  }
  .search-cat:hover { background: #e8e8e8; }
  .search-input {
    flex: 1; border: none; outline: none;
    padding: 0 12px; font-size: 15px;
    font-family: inherit; background: #fff;
  }
  .search-btn {
    background: var(--orange); border: none;
    padding: 0 16px; cursor: pointer;
    font-size: 20px; transition: background .15s;
  }
  .search-btn:hover { background: var(--yellow); }

  .nav-links { display: flex; gap: 4px; flex-shrink: 0; }
  .nav-link {
    color: #fff; cursor: pointer; font-size: 12px;
    padding: 4px 8px; border: 1px solid transparent;
    border-radius: 3px; line-height: 1.4; user-select: none;
  }
  .nav-link:hover { border-color: #fff; }
  .nav-link small { display: block; font-weight: 400; font-size: 11px; }
  .nav-link strong { font-size: 13px; display: block; }
  .cart-link { display: flex; align-items: center; gap: 5px; }
  .cart-badge {
    background: var(--orange); color: var(--dark);
    border-radius: 50%; width: 20px; height: 20px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 12px; margin-top: -14px;
  }

  /* SUB-NAV */
  .nav-sub {
    background: var(--mid);
    display: flex; align-items: center; gap: 2px;
    padding: 0 16px; overflow-x: auto;
  }
  .nav-sub::-webkit-scrollbar { height: 0; }
  .nav-sub-link {
    color: #fff; white-space: nowrap; font-size: 13px;
    padding: 8px 12px; border: 1px solid transparent;
    border-radius: 3px; cursor: pointer; user-select: none;
  }
  .nav-sub-link:hover { border-color: #fff; }
  .nav-sub-link.bold { font-weight: 700; }

  /* HERO */
  .hero-wrap {
    position: relative; overflow: hidden; height: 380px;
  }
  .hero-track {
    display: flex; height: 100%;
    transition: transform .55s cubic-bezier(.4,0,.2,1);
  }
  .hero-slide {
    min-width: 100%; height: 100%;
    display: flex; align-items: flex-end; justify-content: center;
    padding-bottom: 48px; position: relative;
  }
  .hero-slide::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 30%, rgba(0,0,0,.65));
  }
  .hero-text {
    position: relative; z-index: 2; text-align: center;
  }
  .hero-text h1 { color: #fff; font-size: 34px; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,.5); }
  .hero-text p  { color: var(--orange); font-size: 16px; margin-top: 6px; font-weight: 600; }
  .hero-arrow {
    position: absolute; top: 50%; transform: translateY(-50%);
    background: rgba(255,255,255,.88); border: none;
    width: 40px; height: 90px; font-size: 24px; cursor: pointer;
    z-index: 3; transition: background .2s; border-radius: 3px;
    display: flex; align-items: center; justify-content: center;
    color: var(--dark);
  }
  .hero-arrow:hover { background: #fff; }
  .hero-arrow.left  { left: 0; }
  .hero-arrow.right { right: 0; }
  .hero-dots {
    position: absolute; bottom: 12px; left: 50%;
    transform: translateX(-50%); display: flex; gap: 7px; z-index: 4;
  }
  .dot {
    width: 9px; height: 9px; border-radius: 50%;
    background: rgba(255,255,255,.45); cursor: pointer;
    transition: background .2s, transform .2s;
  }
  .dot.active { background: #fff; transform: scale(1.3); }

  /* MAIN */
  .main-wrap {
    max-width: 1500px; margin: 0 auto; padding: 16px;
  }

  /* CATEGORY CARDS */
  .cat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
    gap: 16px; margin-top: -90px; position: relative; z-index: 5;
  }
  .cat-card {
    background: #fff; border-radius: 6px; padding: 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
    transition: box-shadow .2s, transform .2s;
  }
  .cat-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,.16); transform: translateY(-2px); }
  .cat-card h3  { font-size: 17px; margin-bottom: 12px; }
  .cat-emojis  {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;
  }
  .cat-emoji-box {
    aspect-ratio: 1; background: #f5f5f5; border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    font-size: 44px;
  }
  .cat-link {
    color: var(--blue); font-size: 13px; cursor: pointer;
  }
  .cat-link:hover { color: var(--red); text-decoration: underline; }

  /* SECTION */
  .section { margin-top: 28px; }
  .section-head {
    display: flex; align-items: baseline;
    justify-content: space-between; margin-bottom: 14px;
  }
  .section-head h2 { font-size: 21px; font-weight: 700; }
  .section-head a  {
    color: var(--blue); font-size: 13px; cursor: pointer; text-decoration: none;
  }
  .section-head a:hover { color: var(--red); text-decoration: underline; }

  /* PRODUCT ROW */
  .products-row {
    display: flex; gap: 12px;
    overflow-x: auto; padding-bottom: 6px;
  }
  .products-row::-webkit-scrollbar { height: 5px; }
  .products-row::-webkit-scrollbar-track { background: #eee; border-radius: 10px; }
  .products-row::-webkit-scrollbar-thumb { background: #aaa; border-radius: 10px; }

  .prod-card {
    min-width: 185px; max-width: 185px;
    background: #fff; border-radius: 6px;
    padding: 14px; cursor: pointer; flex-shrink: 0;
    transition: box-shadow .2s, transform .2s;
    border: 1px solid transparent;
  }
  .prod-card:hover {
    box-shadow: 0 4px 18px rgba(0,0,0,.16);
    transform: translateY(-3px);
    border-color: var(--orange);
  }
  .prod-emoji {
    font-size: 58px; text-align: center;
    background: #f8f8f8; border-radius: 5px;
    padding: 12px; margin-bottom: 10px;
  }
  .prod-badge {
    display: inline-block; background: var(--red);
    color: #fff; font-size: 10px; font-weight: 700;
    padding: 2px 6px; border-radius: 3px; margin-bottom: 5px;
  }
  .prod-name { font-size: 12.5px; margin-bottom: 5px; line-height: 1.4; }
  .prod-stars { color: var(--orange); font-size: 13px; }
  .prod-rcount { color: var(--muted); font-size: 11px; }
  .prod-price { font-size: 15px; font-weight: 700; color: var(--red); margin-top: 5px; }
  .prod-mrp   { color: var(--muted); font-size: 11px; text-decoration: line-through; }
  .add-btn {
    width: 100%; margin-top: 8px;
    background: var(--orange); border: none;
    padding: 7px; border-radius: 20px;
    font-size: 12px; font-weight: 700; cursor: pointer;
    font-family: inherit; transition: background .15s;
    color: var(--dark);
  }
  .add-btn:hover { background: var(--yellow); }

  /* PROMO BANNER */
  .promo {
    background: linear-gradient(135deg, #1a2533 0%, #2d4a6e 100%);
    border-radius: 8px; padding: 32px 40px;
    display: flex; align-items: center;
    justify-content: space-between; gap: 24px;
    margin-top: 28px;
  }
  .promo h2 { color: var(--orange); font-size: 24px; }
  .promo p  { color: #ccc; margin-top: 6px; font-size: 14px; }
  .promo-cta {
    background: var(--orange); border: none;
    padding: 12px 30px; font-size: 15px; font-weight: 700;
    border-radius: 6px; cursor: pointer; white-space: nowrap;
    font-family: inherit; transition: background .15s;
    color: var(--dark);
  }
  .promo-cta:hover { background: var(--yellow); }

  /* CART OVERLAY */
  .cart-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.45);
    z-index: 200; opacity: 0; pointer-events: none;
    transition: opacity .25s;
  }
  .cart-overlay.open { opacity: 1; pointer-events: all; }
  .cart-panel {
    position: fixed; right: -440px; top: 0; bottom: 0;
    width: 440px; background: #fff; z-index: 201;
    padding: 22px; overflow-y: auto;
    transition: right .3s cubic-bezier(.4,0,.2,1);
    box-shadow: -4px 0 24px rgba(0,0,0,.2);
  }
  .cart-overlay.open .cart-panel { right: 0; }
  .cart-panel-title {
    font-size: 20px; font-weight: 700; padding-bottom: 14px;
    border-bottom: 1px solid var(--border); margin-bottom: 4px;
  }
  .cart-item {
    display: flex; gap: 14px; padding: 14px 0;
    border-bottom: 1px solid #f0f0f0; align-items: flex-start;
  }
  .ci-emoji {
    font-size: 40px; min-width: 68px; height: 68px;
    background: #f8f8f8; border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
  }
  .ci-name  { font-size: 13px; margin-bottom: 4px; line-height: 1.4; }
  .ci-price { font-weight: 700; color: var(--red); }
  .qty-row  { display: flex; align-items: center; gap: 9px; margin-top: 6px; }
  .q-btn {
    width: 28px; height: 28px; border: 1px solid var(--border);
    background: #f0f2f2; border-radius: 4px; cursor: pointer;
    font-size: 16px; font-weight: 700; display: flex;
    align-items: center; justify-content: center;
  }
  .q-btn:hover { background: #e3e6e6; }
  .rm-btn {
    color: var(--blue); font-size: 12px; cursor: pointer; margin-top: 5px;
  }
  .rm-btn:hover { color: var(--red); text-decoration: underline; }
  .cart-empty {
    text-align: center; padding: 50px 0; color: var(--muted);
  }
  .cart-empty-icon { font-size: 56px; margin-bottom: 12px; }
  .cart-subtotal {
    font-size: 18px; font-weight: 700; text-align: right; margin: 14px 0;
  }
  .checkout-btn {
    width: 100%; padding: 13px; background: var(--orange);
    border: none; border-radius: 22px; font-size: 15px;
    font-weight: 700; cursor: pointer; font-family: inherit;
    transition: background .15s; color: var(--dark);
  }
  .checkout-btn:hover { background: var(--yellow); }

  /* TOAST */
  .toast {
    position: fixed; bottom: 26px; left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: #222; color: #fff;
    padding: 12px 26px; border-radius: 28px;
    font-size: 14px; z-index: 500;
    transition: transform .32s cubic-bezier(.4,0,.2,1);
    white-space: nowrap; pointer-events: none;
    box-shadow: 0 4px 16px rgba(0,0,0,.4);
  }
  .toast.show { transform: translateX(-50%) translateY(0); }

  /* FOOTER */
  footer {
    background: var(--mid); color: #ccc;
    margin-top: 40px; padding: 36px 40px 24px;
    text-align: center;
  }
  .footer-links {
    display: flex; flex-wrap: wrap; justify-content: center;
    gap: 18px; margin-bottom: 18px;
  }
  .footer-link {
    color: #ccc; font-size: 12px; cursor: pointer; text-decoration: none;
  }
  .footer-link:hover { text-decoration: underline; color: #fff; }
  .footer-copy { color: #888; font-size: 12px; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .animate-in { animation: fadeIn .5s ease both; }
`);


// ─────────────────────────────────────────────
// 2. DATA
// ─────────────────────────────────────────────
const HERO_SLIDES = [
  { bg: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)", title: "Mega Electronics Sale", sub: "Up to 70% off — Today Only" },
  { bg: "linear-gradient(135deg,#134e5e,#71b280)", title: "Fresh Fashion Arrivals", sub: "New Season, New You" },
  { bg: "linear-gradient(135deg,#7b2d00,#c0392b,#e74c3c)", title: "Great Indian Festival", sub: "Biggest Deals of the Year" },
  { bg: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)", title: "Smart Home Essentials", sub: "Build Your Connected Home" },
];

const CATEGORIES = [
  { title: "Electronics",   emojis: ["📱","💻","📷","🎧"],  link: "See all electronics" },
  { title: "Fashion",       emojis: ["👗","👠","👜","⌚"],  link: "See all fashion"    },
  { title: "Home & Kitchen",emojis: ["🛋️","🍳","🪴","🧹"], link: "See all home"       },
  { title: "Books",         emojis: ["📚","📖","🧠","✏️"],  link: "Shop all books"     },
];

let idSeed = 1;
const mkProds = (arr) => arr.map(p => ({ id: idSeed++, ...p }));

const DEALS = mkProds([
  { name: "boAt Rockerz 450 Wireless",     price: 1299,  mrp: 3990,  rating: 4.3, rc: 12450, emoji: "🎧", badge: "67% off"  },
  { name: "OnePlus Nord CE 3 Lite 5G",     price: 19999, mrp: 25999, rating: 4.5, rc: 8320,  emoji: "📱", badge: "23% off"  },
  { name: "Samsung 43\" 4K Crystal TV",    price: 32990, mrp: 54900, rating: 4.6, rc: 3410,  emoji: "📺", badge: "40% off"  },
  { name: "JBL Flip 6 Portable Speaker",   price: 8999,  mrp: 13999, rating: 4.7, rc: 6780,  emoji: "🔊", badge: "36% off"  },
  { name: "Apple AirPods 3rd Gen",         price: 16900, mrp: 19900, rating: 4.8, rc: 21000, emoji: "🎵", badge: "15% off"  },
  { name: "Xiaomi 11 Lite 5G NE",          price: 26999, mrp: 32999, rating: 4.4, rc: 5620,  emoji: "📲", badge: "18% off"  },
]);

const BESTSELLERS = mkProds([
  { name: "Redmi Note 13 Pro 5G",          price: 24999, mrp: 29999, rating: 4.6, rc: 41200, emoji: "📱", badge: "Best Seller"    },
  { name: "Amazon Echo Dot (5th Gen)",     price: 4499,  mrp: 5499,  rating: 4.5, rc: 35600, emoji: "🔵", badge: "Amazon Pick"    },
  { name: "Logitech MX Master 3S",         price: 7995,  mrp: 9995,  rating: 4.8, rc: 18700, emoji: "🖱️", badge: ""               },
  { name: "Kindle Paperwhite",             price: 14999, mrp: 18999, rating: 4.7, rc: 28900, emoji: "📖", badge: "Best Seller"    },
  { name: "TP-Link Deco AX3000 Wi-Fi 6",  price: 8499,  mrp: 12499, rating: 4.5, rc: 7200,  emoji: "📡", badge: ""               },
  { name: "Zebronics Sound Bomb 1",        price: 699,   mrp: 1299,  rating: 4.1, rc: 53000, emoji: "🎧", badge: "#1 Best Seller" },
]);

const NEW_ARRIVALS = mkProds([
  { name: "Nothing Phone (2a) 5G",         price: 23999, mrp: 23999, rating: 4.4, rc: 520,  emoji: "📱", badge: "New" },
  { name: "Realme GT 6T 5G",               price: 35999, mrp: 35999, rating: 4.5, rc: 310,  emoji: "🚀", badge: "New" },
  { name: "iQOO Z9 Turbo 5G",             price: 22999, mrp: 24999, rating: 4.6, rc: 890,  emoji: "⚡", badge: "New" },
  { name: "Oppo Find X7 Ultra",            price: 79999, mrp: 85000, rating: 4.7, rc: 230,  emoji: "📸", badge: "New" },
  { name: "Noise ColorFit Ultra 3",        price: 2999,  mrp: 5999,  rating: 4.3, rc: 1400, emoji: "⌚", badge: "New" },
]);

const ALL_PRODUCTS = [...DEALS, ...BESTSELLERS, ...NEW_ARRIVALS];

const NAV_LINKS = ["Today's Deals","Customer Service","Registry","Gift Cards",
  "Electronics","Books","Fashion","Home & Garden","Sports","Automotive","Sell"];

const FOOTER_LINKS = ["Careers","Blog","About Amazon","Investor Relations",
  "Amazon Devices","Sell products","Become an Affiliate","Advertise",
  "Help","Privacy Notice","Conditions of Use","Cookie Notice"];


// ─────────────────────────────────────────────
// 3. STATE
// ─────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem("amz_cart") || "[]");
let slideIndex = 0;
let slideTimer = null;


// ─────────────────────────────────────────────
// 4. HELPERS
// ─────────────────────────────────────────────
const el = (tag, cls = "", attrs = {}) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "text")  e.textContent = v;
    else if (k === "html") e.innerHTML = v;
    else e.setAttribute(k, v);
  });
  return e;
};

const fmt = (n) => "₹" + n.toLocaleString("en-IN");

const stars = (r) => {
  const f = Math.floor(r), h = r % 1 >= 0.5;
  return "★".repeat(f) + (h ? "½" : "") + "☆".repeat(5 - f - (h ? 1 : 0));
};

const saveCart = () => localStorage.setItem("amz_cart", JSON.stringify(cart));


// ─────────────────────────────────────────────
// 5. TOAST
// ─────────────────────────────────────────────
const toastEl = el("div", "toast");
document.body.appendChild(toastEl);
let toastTimer = null;

const showToast = (msg) => {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3000);
};


// ─────────────────────────────────────────────
// 6. BUILD HEADER
// ─────────────────────────────────────────────
const buildHeader = () => {
  const header = el("header", "", { id: "amz-header" });

  // TOP ROW
  const navTop = el("div", "nav-top");

  // Logo
  const logo = el("div", "amz-logo", { html: 'amazon<span>.in</span>' });
  logo.addEventListener("click", () => window.scrollTo(0, 0));

  // Deliver
  const loc = el("div", "nav-location", { html: '<small>Deliver to</small><strong>📍 India</strong>' });

  // Search
  const searchWrap = el("div", "search-wrap");
  const catSel = el("select", "search-cat");
  ["All","Electronics","Fashion","Books","Home","Sports"].forEach(c => {
    const opt = el("option", "", { text: c });
    catSel.appendChild(opt);
  });
  const searchInput = el("input", "search-input", { type: "text", placeholder: "Search Amazon.in" });
  searchInput.addEventListener("keydown", e => { if (e.key === "Enter") doSearch(searchInput.value, catSel.value); });
  const searchBtn = el("button", "search-btn", { text: "🔍" });
  searchBtn.addEventListener("click", () => doSearch(searchInput.value, catSel.value));
  searchWrap.append(catSel, searchInput, searchBtn);

  // Nav links
  const links = el("div", "nav-links");

  const acctLink = el("div", "nav-link", { html: '<small>Hello, Sign in</small><strong>Account & Lists</strong>' });

  const ordersLink = el("div", "nav-link", { html: '<small>Returns</small><strong>& Orders</strong>' });

  const cartLink = el("div", "nav-link cart-link");
  const cartBadge = el("span", "cart-badge", { text: "0", id: "cartBadgeEl" });
  const cartText  = el("span", "", { html: "🛒 <strong>Cart</strong>" });
  cartLink.append(cartBadge, cartText);
  cartLink.addEventListener("click", openCart);

  links.append(acctLink, ordersLink, cartLink);
  navTop.append(logo, loc, searchWrap, links);

  // SUB-NAV
  const navSub = el("nav", "nav-sub");
  const allLink = el("span", "nav-sub-link bold", { text: "☰ All" });
  navSub.appendChild(allLink);
  NAV_LINKS.forEach(name => {
    const a = el("a", "nav-sub-link", { text: name, href: "#" });
    navSub.appendChild(a);
  });

  header.append(navTop, navSub);
  return header;
};


// ─────────────────────────────────────────────
// 7. BUILD HERO
// ─────────────────────────────────────────────
const buildHero = () => {
  const wrap  = el("div", "hero-wrap");
  const track = el("div", "hero-track", { id: "heroTrack" });

  HERO_SLIDES.forEach(s => {
    const slide = el("div", "hero-slide");
    slide.style.background = s.bg;
    const textDiv = el("div", "hero-text", {
      html: `<h1>${s.title}</h1><p>${s.sub}</p>`
    });
    slide.appendChild(textDiv);
    track.appendChild(slide);
  });

  // Arrows
  const leftArrow  = el("button", "hero-arrow left",  { text: "❮" });
  const rightArrow = el("button", "hero-arrow right", { text: "❯" });
  leftArrow.addEventListener("click",  () => goSlide(slideIndex - 1));
  rightArrow.addEventListener("click", () => goSlide(slideIndex + 1));

  // Dots
  const dotsWrap = el("div", "hero-dots", { id: "heroDots" });
  HERO_SLIDES.forEach((_, i) => {
    const dot = el("div", i === 0 ? "dot active" : "dot");
    dot.addEventListener("click", () => goSlide(i));
    dotsWrap.appendChild(dot);
  });

  wrap.append(track, leftArrow, rightArrow, dotsWrap);
  return wrap;
};

const goSlide = (n) => {
  slideIndex = ((n % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length;
  const track = document.getElementById("heroTrack");
  if (track) track.style.transform = `translateX(-${slideIndex * 100}%)`;
  document.querySelectorAll(".dot").forEach((d, i) =>
    d.classList.toggle("active", i === slideIndex));
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goSlide(slideIndex + 1), 4500);
};


// ─────────────────────────────────────────────
// 8. BUILD CATEGORY CARDS
// ─────────────────────────────────────────────
const buildCategories = () => {
  const grid = el("div", "cat-grid");
  CATEGORIES.forEach((c, ci) => {
    const card = el("div", "cat-card animate-in");
    card.style.animationDelay = `${ci * 80}ms`;

    const title = el("h3", "", { text: c.title });
    const emBox = el("div", "cat-emojis");
    c.emojis.forEach(e => {
      const box = el("div", "cat-emoji-box", { text: e });
      emBox.appendChild(box);
    });
    const link = el("span", "cat-link", { text: c.link });

    card.append(title, emBox, link);
    grid.appendChild(card);
  });
  return grid;
};


// ─────────────────────────────────────────────
// 9. BUILD PRODUCT CARD
// ─────────────────────────────────────────────
const buildProductCard = (p) => {
  const card = el("div", "prod-card animate-in");

  const emojiDiv = el("div", "prod-emoji", { text: p.emoji });

  const badgeEl = p.badge
    ? el("div", "prod-badge", { text: p.badge })
    : null;

  const nameEl   = el("div", "prod-name",  { text: p.name });
  const starsEl  = el("div", "prod-stars", { text: stars(p.rating) });
  const rcountEl = el("span", "prod-rcount", { text: ` (${p.rc.toLocaleString()})` });
  starsEl.appendChild(rcountEl);

  const priceEl = el("div", "prod-price", { text: fmt(p.price) });
  if (p.mrp > p.price) {
    const mrpEl = el("div", "prod-mrp", { text: fmt(p.mrp) });
    card.appendChild(mrpEl); // will reorder below
  }

  const addBtn = el("button", "add-btn", { text: "Add to Cart" });
  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    addToCart(p.id);
  });

  if (badgeEl) card.appendChild(badgeEl);
  card.append(emojiDiv, nameEl, starsEl, priceEl);
  if (p.mrp > p.price) {
    const mrpEl2 = el("div", "prod-mrp", { text: fmt(p.mrp) });
    card.appendChild(mrpEl2);
  }
  card.appendChild(addBtn);
  return card;
};


// ─────────────────────────────────────────────
// 10. BUILD PRODUCT ROW SECTION
// ─────────────────────────────────────────────
const buildSection = (title, products, seeAll) => {
  const section = el("div", "section");
  const head    = el("div", "section-head");
  const h2      = el("h2", "", { text: title });
  const seeLink = el("a",  "", { text: seeAll, href: "#" });
  head.append(h2, seeLink);

  const row = el("div", "products-row");
  products.forEach((p, i) => {
    const card = buildProductCard(p);
    card.style.animationDelay = `${i * 50}ms`;
    row.appendChild(card);
  });

  section.append(head, row);
  return section;
};


// ─────────────────────────────────────────────
// 11. PROMO BANNER
// ─────────────────────────────────────────────
const buildPromo = () => {
  const banner = el("div", "promo");
  const text   = el("div", "");
  text.innerHTML = `<h2>Prime Members get FREE delivery</h2><p>Shop millions of items with fast, free shipping. Start your 30-day free trial today.</p>`;
  const btn = el("button", "promo-cta", { text: "Try Prime Free" });
  btn.addEventListener("click", () => showToast("🎉 Prime free trial started!"));
  banner.append(text, btn);
  return banner;
};


// ─────────────────────────────────────────────
// 12. FOOTER
// ─────────────────────────────────────────────
const buildFooter = () => {
  const foot  = el("footer");
  const links = el("div", "footer-links");
  FOOTER_LINKS.forEach(name => {
    const a = el("a", "footer-link", { text: name, href: "#" });
    links.appendChild(a);
  });
  const copy = el("div", "footer-copy", {
    text: `© 1996–${new Date().getFullYear()}, Amazon.com, Inc. or its affiliates`
  });
  foot.append(links, copy);
  return foot;
};


// ─────────────────────────────────────────────
// 13. CART
// ─────────────────────────────────────────────
const cartOverlay = el("div", "cart-overlay", { id: "cartOverlay" });
const cartPanel   = el("div", "cart-panel");
cartOverlay.appendChild(cartPanel);
document.body.appendChild(cartOverlay);

// Close on overlay click
cartOverlay.addEventListener("click", (e) => {
  if (e.target === cartOverlay) cartOverlay.classList.remove("open");
});

const updateCartBadge = () => {
  const badge = document.getElementById("cartBadgeEl");
  if (badge) badge.textContent = cart.reduce((a, i) => a + i.qty, 0);
};

const renderCart = () => {
  cartPanel.innerHTML = "";

  const title = el("div", "cart-panel-title", { text: "🛒 Shopping Cart" });
  cartPanel.appendChild(title);

  if (!cart.length) {
    const empty = el("div", "cart-empty");
    empty.innerHTML = `<div class="cart-empty-icon">🛒</div><p>Your cart is empty</p>`;
    cartPanel.appendChild(empty);
    return;
  }

  cart.forEach(item => {
    const row = el("div", "cart-item");

    const emojiDiv = el("div", "ci-emoji", { text: item.emoji });

    const info = el("div", "");
    const name  = el("div", "ci-name",  { text: item.name });
    const price = el("div", "ci-price", { text: fmt(item.price) });

    const qtyRow = el("div", "qty-row");
    const minBtn = el("button", "q-btn", { text: "−" });
    const qtySpan = el("span", "", { text: item.qty });
    const plusBtn = el("button", "q-btn", { text: "+" });
    minBtn.addEventListener("click",  () => changeQty(item.id, -1));
    plusBtn.addEventListener("click", () => changeQty(item.id, +1));
    qtyRow.append(minBtn, qtySpan, plusBtn);

    const rmBtn = el("div", "rm-btn", { text: "Remove" });
    rmBtn.addEventListener("click", () => removeItem(item.id));

    info.append(name, price, qtyRow, rmBtn);
    row.append(emojiDiv, info);
    cartPanel.appendChild(row);
  });

  const total   = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const totalQty = cart.reduce((a, i) => a + i.qty, 0);
  const subtotal = el("div", "cart-subtotal", {
    text: `Subtotal (${totalQty} items): ${fmt(total)}`
  });
  const checkoutBtn = el("button", "checkout-btn", { text: "Proceed to Checkout" });
  checkoutBtn.addEventListener("click", doCheckout);
  cartPanel.append(subtotal, checkoutBtn);
};

const openCart = () => {
  cartOverlay.classList.add("open");
  renderCart();
};

const addToCart = (id) => {
  const product = ALL_PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  saveCart(); updateCartBadge();
  showToast(`✅ "${product.name.slice(0, 28)}…" added to cart`);
};

const changeQty = (id, delta) => {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart(); updateCartBadge(); renderCart();
};

const removeItem = (id) => {
  cart = cart.filter(i => i.id !== id);
  saveCart(); updateCartBadge(); renderCart();
};

const doCheckout = () => {
  showToast("🎉 Order placed! Thanks for shopping with Amazon.");
  cart = []; saveCart(); updateCartBadge();
  cartOverlay.classList.remove("open");
};


// ─────────────────────────────────────────────
// 14. SEARCH
// ─────────────────────────────────────────────
const doSearch = (query, category = "All") => {
  const q = query.trim();
  if (!q) return;
  showToast(`🔍 Searching "${q}" in ${category}…`);
};


// ─────────────────────────────────────────────
// 15. ASSEMBLE & MOUNT
// ─────────────────────────────────────────────
const mount = () => {
  const root = document.getElementById("root");

  // Header
  root.appendChild(buildHeader());

  // Hero
  root.appendChild(buildHero());
  slideTimer = setInterval(() => goSlide(slideIndex + 1), 4500);

  // Main wrapper
  const main = el("div", "main-wrap");

  // Categories
  main.appendChild(buildCategories());

  // Product sections
  main.appendChild(buildSection("🔥 Deal of the Day",          DEALS,       "See all deals »"));
  main.appendChild(buildSection("⭐ Best Sellers in Electronics", BESTSELLERS, "See more »"));

  // Promo
  main.appendChild(buildPromo());

  // New arrivals
  main.appendChild(buildSection("🆕 New Arrivals",             NEW_ARRIVALS, "Explore all »"));

  root.appendChild(main);

  // Footer
  root.appendChild(buildFooter());

  // Init cart badge from storage
  updateCartBadge();
};

// Run
mount();