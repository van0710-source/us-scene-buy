// Phase B · Umami Cloud (Hobby, $0). Paste website UUID from cloud.umami.is → Settings → Websites.
// Leave empty to disable; no script loads until set.
var USB_UMAMI = {
  websiteId: "3eb5fde2-b2e6-41e8-98ad-9c84cd7bb6e9",
  scriptSrc: "https://cloud.umami.is/script.js",
};

(function loadUmami() {
  if (!USB_UMAMI.websiteId) return;
  var s = document.createElement("script");
  s.defer = true;
  s.src = USB_UMAMI.scriptSrc;
  s.setAttribute("data-website-id", USB_UMAMI.websiteId);
  document.head.appendChild(s);
})();

(function () {
  var STORAGE_KEY = "usb_visit";
  var today = new Date().toISOString().slice(0, 10);

  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    var visit = raw ? JSON.parse(raw) : null;
    if (!visit || visit.day !== today) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ day: today, count: 1, path: location.pathname })
      );
    }
  } catch (err) {
    /* ignore storage failures */
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href]");
    if (!link) return;

    var href = link.getAttribute("href") || "";
    if (!/amazon\.com/i.test(href)) return;
    if (!/tag=usscenebuy-20/i.test(href)) return;

    try {
      var outbound = JSON.parse(localStorage.getItem("usb_outbound") || "[]");
      outbound.push({
        at: new Date().toISOString(),
        path: location.pathname,
        href: href.split("?")[0],
      });
      localStorage.setItem("usb_outbound", JSON.stringify(outbound.slice(-20)));
    } catch (err) {
      /* ignore storage failures */
    }
  });
})();
