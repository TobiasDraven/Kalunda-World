/* Kalunda portal — banner advertising, 2003 style.
 *
 * An homage to Kaboodle (MIT, 2015): same idea, rewritten so the creatives are
 * ours and every click-through stays inside the fiction.
 *
 * Self-contained: no network calls, no trackers, no dependencies.
 *
 * A page with no containers gets a default banner block inserted below the nav.
 * To place a specific format, add any of:
 *     <div data-ad-format="banner"></div>      210x176 grid, 2 rows
 *     <div data-ad-format="leaderboard"></div> 728x90
 *     <div data-ad-format="skyscraper"></div>  120x600
 *     <div data-ad-format="box"></div>         300x250
 *     <div data-ad-format="buttons"></div>     88x31 buttons
 *     <div data-ad-format="text"></div>        plain text links
 *
 * Images are exported at 2x their display size, so a 1080p screen gets crisp edges.
 */
(function () {
  "use strict";

  /* One record per advertiser. `plate: true` means the image is a finished ad;
     otherwise it is square artwork and the format composes type around it. */
  var CREATIVES = [
    { id: "ministry-health", advertiser: "MINISTRY OF HEALTH", plate: true,
      headline: "Boil water before drinking", body: "", cta: "",
      img: "ministry-health.png", href: "government-notice.html", formats: ["banner", "box"] },

    { id: "kalunda-mobile", advertiser: "KALUNDA MOBILE",
      headline: "Now in nine wards",
      body: "Pay as you go. Cards sold at every ward office and at the market gates.",
      cta: "Find a card",
      img: "kalunda-mobile.png", href: "geography/index.html",
      formats: ["skyscraper", "leaderboard", "box", "banner"] },

    { id: "kalunda-rail", advertiser: "KALUNDA RAIL",
      headline: "Nsundu to Kembe",
      body: "Freight and second class. Departs Tuesdays and Fridays.",
      cta: "Timetable",
      img: "kalunda-rail.png", href: "geography/index.html",
      formats: ["leaderboard", "box", "banner"] },

    { id: "luvasi-bottling", advertiser: "LUVASI BOTTLING",
      headline: "The water of the valley",
      body: "Bottled at Kembe. Delivered in Lukunda.",
      cta: "Stockists",
      img: "luvasi-bottling.png", href: "tourism/index.html",
      formats: ["banner", "skyscraper", "box"] },

    { id: "ministry-information", advertiser: "MINISTRY OF INFORMATION",
      headline: "Report rumours to your ward office",
      body: "Unverified reports cause unnecessary alarm. Your ward office will assist.",
      cta: "Find your ward office",
      img: "ministry-information.png", href: "government-notice.html",
      formats: ["banner", "skyscraper", "box"] },

    { id: "kalunda-fa", advertiser: "KALUNDA FOOTBALL ASSOCIATION",
      headline: "League fixtures",
      body: "Saturday afternoons at the Kembe ground. Entry one karu.",
      cta: "Fixtures",
      img: "kalunda-fa.png", href: "news/index.html",
      formats: ["banner", "box"] },

    { id: "mbuyane-traders", advertiser: "MBUYANE TRADERS' ASSOCIATION",
      headline: "Open daily",
      body: "Cloth, grain and hardware. The market is open while it is safe to open.",
      cta: "Directions",
      img: "mbuyane-traders.png", href: "tourism/index.html",
      formats: ["banner", "box"] },

    { id: "tourism-board", advertiser: "KALUNDA TOURISM BOARD",
      headline: "Visit the valley",
      body: "River trips, escarpment walks and market days in the nine wards.",
      cta: "Plan your visit",
      img: "tourism-board.png", href: "tourism/index.html",
      formats: ["banner", "box", "leaderboard"] }
  ];

  /* Text ads — the AdSense-shaped line of 2003. */
  var TEXT_ADS = [
    { text: "Kalunda Mobile \u2014 prepaid cards in every ward.", href: "geography/index.html" },
    { text: "Luvasi Bottling \u2014 bottled at Kembe, delivered in Lukunda.", href: "tourism/index.html" },
    { text: "Kalunda Rail \u2014 freight and second class, Tuesdays and Fridays.", href: "geography/index.html" },
    { text: "Ministry of Lands \u2014 survey sheets available for the eastern escarpment.", href: "geography/index.html" }
  ];

  /* 88x31 buttons — the webring furniture of the era. */
  var BUTTONS = [
    { label: "KALUNDA ONLINE", href: "index.html" },
    { label: "RADIO KBS", href: "radio/index.html" },
    { label: "VISIT THE VALLEY", href: "tourism/index.html" },
    { label: "LANDS DEPT", href: "geography/index.html" },
    { label: "BEST VIEWED 800x600", href: "index.html" }
  ];

  /* ROGUE SLOT — the point of the whole mechanism.
   *
   * Once an archived movement page exists (say archive/tsero-statement.html), add
   * to BUTTONS or TEXT_ADS an entry such as:
   *
   *   { label: "TSERO \u2014 MIRROR", href: "archive/tsero-statement.html" }
   *   { text: "Statement from the Tsero National Movement (mirror, hosted abroad).", href: "archive/tsero-statement.html" }
   *
   * Rules: interior pages only, never the front page, never the nav, and phrased
   * the way a period ad rotation would phrase it. A button in a strip of buttons
   * is the least inspected link on any page ever built.
   */

  function seedFrom(str) {
    var h = 2166136261, i;
    for (i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  function shuffled(list, seed) {
    var a = list.slice(), i, j, t;
    for (i = a.length - 1; i > 0; i--) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      j = seed % (i + 1);
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    if (txt) { e.textContent = txt; }
    return e;
  }

  var script = document.currentScript;
  if (!script) {
    var all = document.getElementsByTagName("script"), i;
    for (i = all.length - 1; i >= 0; i--) {
      if (/ads\.js/.test(all[i].src || "")) { script = all[i]; break; }
    }
  }

  /* Resolve paths from this script's own location, so one file serves pages at
     any depth without the caller worrying about ../../ */
  var base = script ? script.src.replace(/assets\/js\/ads\.js.*$/, "") : "";

  function link(href, cls, txt) {
    var a = el("a", cls, txt);
    a.href = base + href;
    return a;
  }

  function plate(src, w, h, alt, onFail) {
    var img = el("img");
    img.width = w;
    img.height = h;
    img.alt = alt || "";
    img.onerror = onFail || function () {};
    img.src = base + "assets/img/ads/" + src;
    return img;
  }

  function adlabel() {
    return el("div", "ad-label", "Advertisement");
  }

  function adnote() {
    var note = el("div", "ads-note");
    note.appendChild(link("government-notice.html", "", "Advertise on this portal"));
    note.appendChild(document.createTextNode(" \u00b7 rates on application to the Ministry of Information"));
    return note;
  }

  function pool(key) {
    return CREATIVES.filter(function (c) { return c.formats.indexOf(key) > -1; });
  }

  /* ---------- banner: 210x176 grid ---------- */
  function mountBanner(host, seed) {
    host.className = "ads";
    var rows = parseInt(host.getAttribute("data-num-rows") || "2", 10);
    var width = host.clientWidth || 732;
    var perRow = Math.max(1, Math.floor(width / 222));
    var want = rows * perRow;

    var p = shuffled(pool("banner"), seed);
    var shown = 0, round = 0;
    while (shown < want) {
      if (shown >= p.length) {
        round++;
        p = p.concat(shuffled(pool("banner"), seedFrom(String(round) + seed)));
      }
      host.appendChild(buildBanner(p[shown]));
      shown++;
    }
    host.appendChild(adnote());
  }

  function buildBanner(c) {
    var wrap = el("div", "ad");
    var a = link(c.href, "", "");
    a.title = c.advertiser + " \u2014 " + c.headline;
    var capText = c.advertiser + " \u2014 " + c.headline;
    var cap = el("span", "ad-cap", capText);
    a.appendChild(plate(c.img, 210, 176, capText, function () {
      wrap.className = "ad ad-noimg";
    }));
    a.appendChild(cap);
    wrap.appendChild(a);
    wrap.appendChild(adlabel());
    return wrap;
  }

  /* ---------- leaderboard: 728x90 ---------- */
  function mountLeaderboard(host, seed) {
    host.className = "ad-host ad-lb-host";
    var c = shuffled(pool("leaderboard"), seed)[0];
    host.appendChild(buildLeaderboard(c));
  }

  function buildLeaderboard(c) {
    var wrap = el("div", "ad-lb");
    var a = link(c.href, "ad-lb-link", "");
    a.title = c.advertiser + " \u2014 " + c.headline;

    a.appendChild(plate(c.img, 90, 90, c.advertiser, function () {
      a.className = "ad-lb-link ad-lb-noimg";
    }));

    var txt = el("div", "ad-lb-text");
    txt.appendChild(el("div", "ad-lb-brand", c.advertiser));
    txt.appendChild(el("div", "ad-lb-head", c.headline));
    if (c.body) { txt.appendChild(el("div", "ad-lb-body", c.body)); }
    a.appendChild(txt);

    wrap.appendChild(a);
    wrap.appendChild(adlabel());
    return wrap;
  }

  /* ---------- skyscraper: 120x600, CSS composition ---------- */
  function mountSkyscraper(host, seed) {
    host.className = "ad-host ad-sky-host";
    var c = shuffled(pool("skyscraper"), seed)[0];

    var a = link(c.href, "ad-sky", "");
    a.title = c.advertiser + " \u2014 " + c.headline;

    a.appendChild(el("div", "ad-sky-brand", c.advertiser));
    a.appendChild(plate(c.img, 106, 106, c.advertiser, function () {
      a.className = "ad-sky ad-noimg";
    }));
    a.appendChild(el("div", "ad-sky-head", c.headline));
    if (c.body) { a.appendChild(el("div", "ad-sky-body", c.body)); }
    a.appendChild(el("div", "ad-sky-cta", c.cta || "Find out more"));
    a.appendChild(el("div", "ad-sky-rule"));

    host.appendChild(a);
    host.appendChild(adlabel());
  }

  /* ---------- box: 300x250 ---------- */
  function mountBox(host, seed) {
    host.className = "ad-host ad-box-host";
    var c = shuffled(pool("box"), seed)[0];

    var wrap = el("div", "ad-box");
    var a = link(c.href, "ad-box-link", "");
    a.title = c.advertiser + " \u2014 " + c.headline;

    if (c.plate) {
      a.appendChild(plate(c.img, 298, 248, c.headline, function () {
        wrap.className = "ad-box ad-noimg";
      }));
    } else {
      a.appendChild(plate(c.img, 298, 150, c.advertiser, function () {
        wrap.className = "ad-box ad-noimg";
      }));
      a.appendChild(el("div", "ad-box-brand", c.advertiser));
      a.appendChild(el("div", "ad-box-head", c.headline));
      if (c.body) { a.appendChild(el("div", "ad-box-body", c.body)); }
      a.appendChild(el("div", "ad-box-cta", c.cta || "Find out more"));
    }

    wrap.appendChild(a);
    wrap.appendChild(adlabel());
    host.appendChild(wrap);
  }

  /* ---------- 88x31 buttons ---------- */
  function mountButtons(host, seed) {
    host.className = "ad-host ad-btns";
    shuffled(BUTTONS, seed).forEach(function (b) {
      host.appendChild(link(b.href, "ad-btn", b.label));
    });
  }

  /* ---------- text ads ---------- */
  function mountText(host, seed) {
    host.className = "ad-host ad-text";
    shuffled(TEXT_ADS, seed).slice(0, 3).forEach(function (t) {
      var line = el("div", "ad-text-line");
      line.appendChild(document.createTextNode("\u00bb "));
      line.appendChild(link(t.href, "", t.text));
      host.appendChild(line);
    });
    var note = el("div", "ad-label");
    note.appendChild(document.createTextNode("Text advertisements \u00b7 "));
    note.appendChild(link("government-notice.html", "", "Advertise"));
    host.appendChild(note);
  }

  var MOUNTERS = {
    banner: mountBanner,
    leaderboard: mountLeaderboard,
    skyscraper: mountSkyscraper,
    box: mountBox,
    buttons: mountButtons,
    text: mountText
  };

  function mount() {
    var hosts = [], i;
    var marked = document.querySelectorAll("[data-ad-format]");
    for (i = 0; i < marked.length; i++) { hosts.push(marked[i]); }

    var hasBanner = document.querySelector('[data-ad-format="banner"]') ||
                    document.getElementById("kalunda-ads");
    if (!hasBanner) {
      var auto = el("div", "ads");
      auto.id = "kalunda-ads";
      auto.setAttribute("data-ad-format", "banner");
      var nav = document.querySelector(".nav");
      if (nav && nav.parentNode) {
        nav.parentNode.insertBefore(auto, nav.nextSibling);
      } else {
        document.body.insertBefore(auto, document.body.firstChild);
      }
      hosts.unshift(auto);
    }

    /* Stable per page: a student comparing screens with a neighbour sees the
       same portal, not a slot machine. data-ad-rotate="true" on <html> opts out. */
    var rotate = document.documentElement.getAttribute("data-ad-rotate") === "true";
    var seed = rotate ? seedFrom(location.pathname + Date.now()) : seedFrom(location.pathname);

    hosts.forEach(function (host, idx) {
      var fmt = host.getAttribute("data-ad-format") || "banner";
      var fn = MOUNTERS[fmt];
      if (fn) { fn(host, seedFrom(idx + ":" + seed)); }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
