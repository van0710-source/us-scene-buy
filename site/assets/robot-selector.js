(function () {
  var pickers = document.querySelectorAll("[data-model-picker]");

  pickers.forEach(function (picker) {
    var select = picker.querySelector("[data-model-select]");
    var submit = picker.querySelector('button[type="submit"]');
    if (!select || !submit) return;

    function sync() {
      submit.disabled = !select.value;
    }

    picker.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!select.value) return;
      if (window.umami && typeof window.umami.track === "function") {
        window.umami.track("robot-model-selected", { destination: select.value });
      }
      window.location.assign(select.value);
    });

    select.addEventListener("change", sync);
    sync();
  });
})();
