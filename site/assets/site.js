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
