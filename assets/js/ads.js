/* Kalunda portal — banner advertising, 2003 style.
 *
 * An homage to Kaboodle (MIT, 2015): same idea, rewritten so the creatives are
 * ours and every click-through stays inside the fiction.
 *
 * Self-contained: no network calls, no trackers, no dependencies.
 *
 * Usage, anywhere in a page:
 *     <script src="assets/js/ads.js"></script>        (or ../assets/js/ads.js)
 *
 * Optional, for placement control:
 *     <div id="kalunda-ads" data-num-rows="2"></div>
 * With no container present, one is inserted directly below the nav bar.
 * Add data-rotate="true" to reshuffle on every load instead of holding steady.
 */
(function () {
  "use strict";

  var CREATIVES = [
    { img: "luvasi-bottling.png",      caption: "Luvasi Bottling \u2014 the water of the valley",        href: "tourism/index.html" },
    { img: "kalunda-mobile.png",       caption: "Kalunda Mobile \u2014 now in nine wards",                href: "geography/index.html" },
    { img: "ministry-health.png",      caption: "Ministry of Health \u2014 boil water before drinking",  href: "government-notice.html" },
    { img: "sere-copper.png",          caption: "Sere Copper \u2014 we are hiring",                      href: "country.html" },
    { img: "ministry-information.png", caption: "Report rumours to your ward office",                   href: "government-notice.html" },
    { img: "kalunda-fa.png",           caption: "Kalunda Football Association \u2014 league fixtures",   href: "news/index.html" },
    { img: "mbuyane-traders.png",      caption: "Mbuyane Traders' Association \u2014 open daily",        href: "tourism/index.html" },
    { img: "tourism-board.png",        caption: "Visit the valley \u2014 the Tourism Board",             href: "tourism/index.html" },
    { img: "kalunda-rail.png",         caption: "Kalunda Rail \u2014 Nsundu to Kembe",                   href: "geography/index.html" }
  ];

  /* ROGUE SLOT — the point of the whole mechanism.
   *
   * Once the archived page exists (say archive/tsero-statement.html), add:
   *
   *   { img: "tsero-mirror.png", caption: "Statement from the Tsero National Movement (mirror, hosted abroad)", href: "archive/tsero-statement.html" }
   *
   * Rules: never place it on the front page, never put it in the nav, and let it
   * surface only through the rotation on interior pages. The caption must read as
   * something a 2003 ad rotation would actually carry, which is why it says
   * "mirror, hosted abroad" and not "rebel manifesto".
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

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
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

  function build(c) {
    var wrap = el("div", "ad");
    var a = el("a");
    a.href = base + c.href;
    a.title = c.caption;

    var img = el("img");
    img.width = 210;
    img.height = 176;
    img.alt = c.caption;
    img.onerror = function () { wrap.className = "ad ad-noimg"; };
    img.src = base + "assets/img/ads/" + c.img;

    var cap = el("span", "ad-cap");
    cap.textContent = c.caption;

    a.appendChild(img);
    a.appendChild(cap);

    var label = el("div", "ad-label");
    label.textContent = "Advertisement";

    wrap.appendChild(a);
    wrap.appendChild(label);
    return wrap;
  }

  function mount() {
    var host = document.getElementById("kalunda-ads");
    if (!host) {
      host = el("div", "ads");
      host.id = "kalunda-ads";
      var nav = document.querySelector(".nav");
      if (nav && nav.parentNode) {
        nav.parentNode.insertBefore(host, nav.nextSibling);
      } else {
        document.body.insertBefore(host, document.body.firstChild);
      }
    }
    host.className = "ads";

    var rows = parseInt(host.getAttribute("data-num-rows") ||
                        (script && script.getAttribute("data-num-rows")) || "2", 10);
    var width = host.clientWidth || 732;
    var perRow = Math.max(1, Math.floor(width / 222));
    var want = rows * perRow;

    /* Stable per page by design: a student comparing screens with a neighbour
       should see the same portal, not a slot machine. */
    var rotate = host.getAttribute("data-rotate") === "true";
    var seed = rotate ? seedFrom(location.pathname + Date.now()) : seedFrom(location.pathname);

    var pool = shuffled(CREATIVES, seed);
    var shown = 0, round = 0;
    while (shown < want) {
      if (shown >= pool.length * (round + 1)) {
        round++;
        pool = pool.concat(shuffled(CREATIVES, seedFrom(String(round) + seed)));
      }
      host.appendChild(build(pool[shown]));
      shown++;
    }

    var note = el("div", "ads-note");
    var link = el("a");
    link.href = base + "government-notice.html";
    link.textContent = "Advertise on this portal";
    note.appendChild(link);
    note.appendChild(document.createTextNode(" \u00b7 rates on application to the Ministry of Information"));
    host.appendChild(note);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
