/* Kitchen drain quiz — shared by site/quiz.html */
(function () {
  // Amazon Associates store ID / tag
  const AFFILIATE_TAG = "usscenebuy-20";

  const ASIN = {
    S1: "B08FGH2V5Q",
    S2: "B079K94HHV",
    S3: "B00IPUIQIA",
    S4: "B00ZS4ZAEE",
  };

  const SKU = {
    S1: {
      id: "S1",
      name: "Zip-It Hair Clog Remover (drain snake)",
      url: () => amazon(ASIN.S1),
      anchor:
        "Brand claim: chemical-free plastic strip; insert, twist, pull to catch hair/debris. Opening must be larger than ~1/4\". Kitchen grease soft clogs may respond poorly.",
    },
    S2: {
      id: "S2",
      name: "Green Gobbler Enzyme Drain Cleaner (1 gal)",
      url: () => amazon(ASIN.S2),
      anchor:
        "Brand claim: enzyme formula marketed for grease/odor-related organics; often positioned for drains, septic, grease traps. Verify this bottle’s label for your use. No guaranteed clear time.",
    },
    S3: {
      id: "S3",
      name: "Liquid-Plumr Industrial Strength Gel (~42 fl oz)",
      url: () => amazon(ASIN.S3),
      anchor:
        "Brand claim: gel clog remover for hair/grease/soap scum; marketed for kitchen sinks and disposals. Common label cautions: do not use with a plunger, other clog removers, or ammonia; not for toilets.",
    },
    S4: {
      id: "S4",
      name: "Green Gobbler Septic Enzyme Treatment Packets",
      url: () => amazon(ASIN.S4),
      anchor:
        "Brand claim: monthly flush-down septic maintenance packets (not an emergency clog gel). Check label for septic upkeep use.",
    },
    S5: {
      id: "S5",
      name: "Cup-style sink plunger (basin / sink — not toilet flange)",
      // Search keeps options flexible; tag still attributes Associates clicks.
      url: () => {
        var u = "https://www.amazon.com/s?k=cup+sink+plunger+basin";
        if (AFFILIATE_TAG) {
          u += "&tag=" + encodeURIComponent(AFFILIATE_TAG);
        }
        return u;
      },
      anchor:
        "Spec: pressure seal on the sink drain opening; no chemicals. Prefer before stacking chemicals if fully clogged. If chemicals already poured, do not plunge (splash risk).",
    },
  };

  const LABELS = {
    q1: {
      full_clog: "basically stuck",
      slow_drain: "slow after cooking",
      odor_only: "smell with flow still OK",
      odor_and_slow: "smell + slow drain",
    },
    q2: { sewer: "city sewer", septic: "septic", unsure: "system unsure" },
    q3: {
      grease_disposal: "grease/food + disposal",
      grease_no_disposal: "grease/food, no disposal",
      unsure_cause: "cause unsure",
    },
    disposal: {
      disposal_yes: "has disposal",
      disposal_no: "no disposal",
      disposal_unsure: "disposal unsure",
    },
    cause: { grease: "likely grease/food", unsure: "cause unclear" },
    q4: {
      rental_no_harsh: "rental / cautious on harsh chemicals",
      old_pipes: "older pipes",
      kids_pets: "kids or pets",
      none: "no hard limits",
    },
    q5: {
      tried_none: "tried nothing yet",
      tried_mechanical: "already tried physical tools",
      tried_chemical: "already used a chemical opener",
      tried_pro_contact: "plumber contacted / planned",
    },
  };

  const SAMPLES = {
    A: {
      q1: "slow_drain",
      q2: "septic",
      q3: "grease_disposal",
      q4: ["kids_pets"],
      q5: "tried_none",
    },
    B: {
      q1: "full_clog",
      q2: "sewer",
      q3: "grease_no_disposal",
      q4: ["none"],
      q5: "tried_none",
    },
    C: {
      q1: "slow_drain",
      q2: "sewer",
      q3: "grease_disposal",
      q4: ["none"],
      q5: "tried_chemical",
    },
    D: {
      q1: "odor_only",
      q2: "unsure",
      q3: "grease_disposal",
      q4: ["rental_no_harsh"],
      q5: "tried_none",
    },
  };

  function amazon(asin) {
    var url = "https://www.amazon.com/dp/" + asin;
    if (AFFILIATE_TAG) {
      url +=
        (url.indexOf("?") >= 0 ? "&" : "?") +
        "tag=" +
        encodeURIComponent(AFFILIATE_TAG);
    }
    return url;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalizeQ3(raw) {
    if (raw === "grease_disposal") {
      return { q3Raw: raw, disposal: "disposal_yes", cause: "grease" };
    }
    if (raw === "grease_no_disposal") {
      return { q3Raw: raw, disposal: "disposal_no", cause: "grease" };
    }
    return { q3Raw: raw, disposal: "disposal_unsure", cause: "unsure" };
  }

  function readConstraints(form) {
    const q1 = form.q1.value;
    const q2 = form.q2.value;
    const q3n = normalizeQ3(form.q3.value);
    const q5 = form.q5.value;
    let q4 = [...form.querySelectorAll('input[name="q4"]:checked')].map(
      (el) => el.value
    );
    if (!q4.length) q4 = ["none"];
    if (q4.includes("none") && q4.length > 1) {
      q4 = q4.filter((v) => v !== "none");
    }
    return {
      q1,
      q2,
      q3: q3n.q3Raw,
      disposal: q3n.disposal,
      cause: q3n.cause,
      q4,
      q5,
    };
  }

  function route(c) {
    const hardLimits = c.q4.some((v) => v !== "none");
    const chemicalHarshBlocked =
      c.q2 === "septic" || c.q2 === "unsure" || hardLimits;
    const refuseNewChemical = c.q5 === "tried_chemical";
    const preferNoBuyOrPro =
      c.q1 === "full_clog" &&
      (c.q2 === "septic" ||
        c.q4.includes("old_pipes") ||
        c.q5 === "tried_chemical" ||
        c.q5 === "tried_pro_contact");
    const callProFirst = c.q5 === "tried_pro_contact" && c.q1 === "full_clog";

    let priority = "enzyme_maintain";
    if (refuseNewChemical) priority = "physical";
    else if (callProFirst || preferNoBuyOrPro) priority = "call_pro";
    else if (
      !chemicalHarshBlocked &&
      c.q1 === "full_clog" &&
      c.q5 === "tried_none"
    )
      priority = "harsh_chemical";
    else if (c.q1 === "full_clog") priority = "physical";
    else if (
      c.cause === "grease" ||
      c.q1 === "odor_only" ||
      c.q1 === "slow_drain"
    )
      priority = "enzyme_maintain";

    return {
      chemicalHarshBlocked,
      refuseNewChemical,
      preferNoBuyOrPro,
      callProFirst,
      priority,
    };
  }

  function buildRecommendation(c, r) {
    const primary = { sku: null, title: "", benefit: "", notFor: "" };
    const alts = [];
    let noBuy = "";
    let refuseBanner = "";

    if (r.refuseNewChemical) {
      refuseBanner =
        "You already used a chemical drain opener. I’m not handing you a second bottle to stack on top — that mix risk isn’t worth it. Follow the label on what you already used, wait/flush as directed, or call a plumber.";
      primary.sku = SKU.S1;
      primary.title = "Next step (no new chemicals): " + SKU.S1.name;
      primary.benefit =
        "Keeps you out of a second chemistry. A grabber can help with debris; if this is mostly soft grease, a plumber may still be the honest answer.";
      primary.notFor = "Anyone hoping a stronger chemical will finish the job.";
      noBuy =
        "Skip every new chemical clog remover. Waiting, flushing per label, or a plumber beats stacking products.";
    } else if (r.callProFirst) {
      primary.sku = null;
      primary.title = "Next step: wait for the plumber";
      primary.benefit =
        "You’ve already got a pro in the loop and the sink is stuck. Pouring more product can make the visit riskier (fumes, splash, mystery chemistry in the line).";
      primary.notFor = "DIY chemical stacking while you wait.";
      alts.push({
        sku: SKU.S1,
        why: "Only if your plumber is fine with a dry mechanical try first.",
      });
      noBuy =
        "Don’t buy a clog gel before they arrive. Maintenance products can wait until water is moving again.";
    } else if (r.priority === "harsh_chemical") {
      primary.sku = SKU.S3;
      primary.title = "Primary pick: " + SKU.S3.name;
      primary.benefit =
        "Fully stuck, city sewer, no caution flags, nothing tried yet" +
        (c.cause === "grease"
          ? " — and you’re pointing at grease/food, which is exactly the mess these gels market for."
          : ".") +
        " Still: follow the label, and never mix products.";
      primary.notFor =
        "Septic/unsure systems, rentals, older pipes, kids/pets caution, or anyone who already poured a chemical.";
      alts.push({ sku: SKU.S1, why: "You’d rather try zero chemicals first." });
      alts.push({
        sku: SKU.S5,
        why: "The drain opening can take a cup plunger (and you haven’t poured chemicals yet).",
      });
      noBuy =
        "A plunger or Zip-It first is totally reasonable. If this keeps coming back, a plumber beats buying bottle #2.";
    } else if (
      c.q1 === "full_clog" &&
      (r.priority === "physical" || r.priority === "call_pro")
    ) {
      // Fix: full clog → physical / plumber first, not enzyme as primary
      primary.sku = SKU.S5;
      primary.title = "Primary pick: " + SKU.S5.name;
      primary.benefit = r.preferNoBuyOrPro
        ? "You’re fully stuck and caution flags (septic, older pipes, or similar) keep harsh gels off the headline. A cup plunger is the clearer next try — or call a plumber if nothing moves."
        : "You’re fully stuck and you’ve already tried other steps (or harsh gel isn’t the first call). Start with a cup plunger on the sink opening before buying another liquid.";
      primary.notFor = "Anyone who already poured chemicals (don’t plunge splash risk).";
      alts.push({
        sku: SKU.S1,
        why: "You’d rather pull debris with a dry snake tool.",
      });
      if (!r.chemicalHarshBlocked && c.q5 === "tried_mechanical") {
        alts.push({
          sku: SKU.S3,
          why: "Physical tools didn’t help, city sewer, and you still want a labeled gel option.",
        });
      } else {
        alts.push({
          sku: SKU.S2,
          why: "Only after water is moving again — maintenance for grease film, not tonight’s emergency.",
        });
      }
      while (alts.length > 2) alts.pop();
      noBuy = r.preferNoBuyOrPro
        ? "Calling a plumber is a solid call on a full clog with septic/old-pipe limits. Skip harsh gels as the primary move."
        : "If nothing budges, a plumber beats stacking products. Buying nothing tonight is fine.";
    } else {
      primary.sku = SKU.S2;
      primary.title = "Primary pick: " + SKU.S2.name;
      if (c.q1 === "odor_only") {
        primary.benefit =
          "Water still moves and the issue is smell" +
          (c.cause === "grease" ? " with a grease/food story" : "") +
          " — so I’m steering you toward a maintenance-leaning enzyme option (check the label), not an “industrial strength” panic pour.";
      } else if (c.q2 === "septic" || c.q2 === "unsure") {
        primary.benefit =
          "With septic (or uncertainty) on the table" +
          (c.cause === "grease" ? " and a likely grease/food buildup" : "") +
          ", harsh emergency gels stay off the primary slot. Enzyme-style products marketed for organics are the calmer fit — verify septic language on the label.";
      } else if (c.cause === "grease") {
        primary.benefit =
          "You’re describing a cooking grease/food pattern. That usually responds better to enzyme/maintenance logic than to panic-buying the strongest gel on the shelf — unless you’re fully stuck with no caution flags.";
      } else {
        primary.benefit =
          "Given your limits, I’m prioritizing a gentler enzyme/maintenance-leaning pick over a harsh clog gel. No product gets a “guaranteed clear” promise.";
      }
      primary.notFor =
        "People who already used a chemical opener, or who need a same-hour guarantee.";

      if (c.q1 !== "odor_only") {
        alts.push({
          sku: SKU.S1,
          why: "You want a chemical-free mechanical first step.",
        });
      } else {
        alts.push({
          sku: null,
          name: "No purchase — clean first",
          why:
            c.disposal === "disposal_yes"
              ? "Clean the disposal splash guard, empty the strainer, and check the trap smell before buying anything."
              : "Empty the strainer, flush with hot water after degreasing pans in the trash, and reassess before buying.",
          anchor: "Non-purchase steps; no product claim.",
        });
      }

      noBuy = r.chemicalHarshBlocked
        ? "I’m not making a harsh gel the headline pick (septic/unsure and/or caution flags). Hot water + strainer check first is fine; call a plumber if nothing moves."
        : "Buying nothing is a valid outcome — habits and a simple tool may be enough.";
    }

    if (c.q1 === "full_clog" && !r.refuseNewChemical && !r.callProFirst) {
      noBuy +=
        " For a total clog, physical tools or a plumber stay on the table — a chemical link alone is never the whole answer.";
    }

    return { primary, alts, noBuy, refuseBanner };
  }

  function maintenanceBlock(c, r, primarySkuId) {
    const habits = `
      <ul>
        <li>Keep a basket strainer in; empty into trash</li>
        <li>Wipe grease to trash before washing</li>
        <li>Hot water after heavy cooking (habit — not a guarantee)</li>
        <li>If you have a disposal: no fibrous scraps; treat grease as trash</li>
      </ul>`;

    if (
      r.refuseNewChemical ||
      r.callProFirst ||
      (c.q1 === "full_clog" &&
        (r.priority === "physical" || r.priority === "call_pro"))
    ) {
      return `
        <div class="rec">
          <div class="tag">After this settles</div>
          <h3>Habits only for now</h3>
          <p class="muted">I’m not pushing a maintenance bottle while the sink is still an emergency.</p>
          ${habits}
          <p><a class="btn ghost" href="guides/prevent-grease-clog.html">Read the prevention guide</a></p>
        </div>`;
    }

    let ctaSku = SKU.S2;
    let note =
      "Today’s fix is for this incident. Grease film comes back. If the sink is flowing again, a maintenance-style enzyme (check the label: upkeep vs clog remover) is a different job from another harsh gel.";

    if (c.q2 === "septic") {
      ctaSku = SKU.S4;
      note =
        "On septic, once things calm down, a monthly septic enzyme packet (label: upkeep) is often smarter than repeating emergency gels. Verify the label.";
    } else if (primarySkuId === "S2" && c.q2 !== "septic") {
      ctaSku = SKU.S2;
      note =
        "Your primary pick is already maintenance-leaning. You can stop here and lean on habits — or check the same product’s label for preventative use.";
    }

    if (c.q1 === "full_clog" && r.priority === "harsh_chemical") {
      note =
        "After a full clog, let flow stabilize for a bit before starting any maintenance routine. Don’t stack products tonight.";
    }

    return `
      <div class="rec">
        <div class="tag">Keep it from coming back</div>
        <h3>Before the next backup</h3>
        <p>${esc(note)}</p>
        ${habits}
        <div class="actions">
          <a class="btn primary" href="${esc(ctaSku.url())}" target="_blank" rel="noopener noreferrer sponsored">Check price on Amazon</a>
          <a class="btn ghost" href="guides/prevent-grease-clog.html">Prevention habits</a>
          <button type="button" class="ghost" id="habits-only">Not now</button>
        </div>
        <p class="hint">Tip: add the item to your Amazon cart within 24 hours of clicking so attribution can stick. Always verify the label.</p>
      </div>`;
  }

  function renderProductBlock(heading, sku, benefit, extra) {
    if (!sku) {
      return `
        <div class="rec">
          <div class="tag">${esc(heading)}</div>
          <h3>${esc(extra.title || "No product")}</h3>
          <ul>
            <li><strong>What this means for you:</strong> ${esc(benefit)}</li>
            ${extra.why ? `<li><strong>Why:</strong> ${esc(extra.why)}</li>` : ""}
            ${extra.anchor ? `<li><strong>Fact anchor:</strong> ${esc(extra.anchor)}</li>` : ""}
          </ul>
        </div>`;
    }
    return `
      <div class="rec">
        <div class="tag">${esc(heading)}</div>
        <h3>${esc(extra.title || sku.name)}</h3>
        <ul>
          <li><strong>What this means for you:</strong> ${esc(benefit)}</li>
          ${extra.constraints ? `<li><strong>Matched to:</strong> ${esc(extra.constraints)}</li>` : ""}
          <li><strong>Fact anchor:</strong> ${esc(sku.anchor)}</li>
          ${extra.notFor ? `<li><strong>Not for:</strong> ${esc(extra.notFor)}</li>` : ""}
          ${extra.why ? `<li><strong>Better if:</strong> ${esc(extra.why)}</li>` : ""}
        </ul>
        <p class="actions">
          <a class="btn primary" href="${esc(sku.url())}" target="_blank" rel="noopener noreferrer sponsored">Check price on Amazon</a>
        </p>
        <p class="hint">Open Amazon, then add to cart if it fits — don’t wait days if you want this click to count.</p>
      </div>`;
  }

  function renderResult(c) {
    const r = route(c);
    const rec = buildRecommendation(c, r);
    const constraintsHit = [
      LABELS.q1[c.q1],
      LABELS.q2[c.q2],
      LABELS.cause[c.cause],
      LABELS.disposal[c.disposal],
      ...c.q4.map((x) => LABELS.q4[x]),
      LABELS.q5[c.q5],
    ].join(" · ");

    const understand =
      "Here’s what I heard: " +
      LABELS.q1[c.q1] +
      "; " +
      LABELS.q2[c.q2] +
      "; " +
      LABELS.q3[c.q3] +
      "; limits — " +
      c.q4.map((x) => LABELS.q4[x]).join(", ") +
      "; " +
      LABELS.q5[c.q5] +
      ". So I’m leaning " +
      r.priority.replace(/_/g, " ") +
      ".";

    let html = `
      <p class="step-label">Your next step</p>
      <h2>Here’s the honest call</h2>
      <div class="banner disclosure">
        <strong>Disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases. Prices and stock change — trust the checkout page. Info as-of 2026-07-17.
      </div>
      <div class="banner safety">
        <strong>Safety:</strong> Never mix drain chemicals. Follow the product label every time.
      </div>
      ${rec.refuseBanner ? `<div class="banner refuse">${esc(rec.refuseBanner)}</div>` : ""}
      <p>${esc(understand)}</p>
    `;

    if (rec.primary.sku) {
      html += renderProductBlock("Primary", rec.primary.sku, rec.primary.benefit, {
        title: rec.primary.title,
        constraints: constraintsHit,
        notFor: rec.primary.notFor,
      });
    } else {
      html += renderProductBlock("Primary", null, rec.primary.benefit, {
        title: rec.primary.title,
        notFor: rec.primary.notFor,
      });
    }

    rec.alts.forEach((alt) => {
      if (alt.sku) {
        html += renderProductBlock(
          "Also worth considering",
          alt.sku,
          alt.sku.anchor,
          { why: alt.why }
        );
      } else {
        html += renderProductBlock("Also worth considering", null, alt.why, {
          title: alt.name || "No purchase",
          why: alt.why,
          anchor: alt.anchor,
        });
      }
    });

    html += `
      <div class="rec">
        <div class="tag">Buy nothing</div>
        <h3>You’re allowed to wait</h3>
        <p>${esc(rec.noBuy)}</p>
      </div>
    `;

    const primaryId = rec.primary.sku ? rec.primary.sku.id : null;
    html += maintenanceBlock(c, r, primaryId);
    return html;
  }

  function initQuiz() {
    const form = document.getElementById("quiz");
    const result = document.getElementById("result");
    if (!form || !result) return;
    const q4None = document.getElementById("q4-none");

    form.querySelectorAll('input[name="q4"]').forEach((el) => {
      el.addEventListener("change", () => {
        if (el.value === "none" && el.checked) {
          form.querySelectorAll('input[name="q4"]').forEach((other) => {
            if (other !== el) other.checked = false;
          });
        } else if (el.checked && q4None && q4None.checked) {
          q4None.checked = false;
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const c = readConstraints(form);
      result.hidden = false;
      result.innerHTML = renderResult(c);
      result.querySelector("#habits-only")?.addEventListener("click", () => {
        alert("Got it — habits only. No maintenance product needed.");
      });
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    form.addEventListener("reset", () => {
      result.hidden = true;
      result.innerHTML = "";
    });

    function applySample(key) {
      const s = SAMPLES[key];
      if (!s) return;
      form.reset();
      result.hidden = true;
      form.querySelector('input[name="q1"][value="' + s.q1 + '"]').checked = true;
      form.querySelector('input[name="q2"][value="' + s.q2 + '"]').checked = true;
      form.querySelector('input[name="q3"][value="' + s.q3 + '"]').checked = true;
      form.querySelectorAll('input[name="q4"]').forEach((el) => {
        el.checked = s.q4.includes(el.value);
      });
      form.querySelector('input[name="q5"][value="' + s.q5 + '"]').checked = true;
      form.querySelector('button[type="submit"]').focus();
    }

    document.querySelectorAll("[data-sample]").forEach((btn) => {
      btn.addEventListener("click", () => applySample(btn.dataset.sample));
    });

    // Deep links from guides / Reddit: quiz.html?q1=full_clog&q2=sewer&auto=1
    (function applyQueryPrefill() {
      var params = new URLSearchParams(window.location.search);
      if (![...params.keys()].length) return;
      var q1 = params.get("q1");
      var q2 = params.get("q2");
      var q3 = params.get("q3");
      var q5 = params.get("q5");
      var q4 = params.get("q4");
      if (q1) {
        var el1 = form.querySelector('input[name="q1"][value="' + q1 + '"]');
        if (el1) el1.checked = true;
      }
      if (q2) {
        var el2 = form.querySelector('input[name="q2"][value="' + q2 + '"]');
        if (el2) el2.checked = true;
      }
      if (q3) {
        var el3 = form.querySelector('input[name="q3"][value="' + q3 + '"]');
        if (el3) el3.checked = true;
      }
      if (q5) {
        var el5 = form.querySelector('input[name="q5"][value="' + q5 + '"]');
        if (el5) el5.checked = true;
      }
      if (q4) {
        var parts = q4.split(",").map(function (s) {
          return s.trim();
        });
        form.querySelectorAll('input[name="q4"]').forEach(function (el) {
          el.checked = parts.indexOf(el.value) >= 0;
        });
      }
      if (params.get("auto") === "1") {
        var ready =
          form.querySelector('input[name="q1"]:checked') &&
          form.querySelector('input[name="q2"]:checked') &&
          form.querySelector('input[name="q3"]:checked') &&
          form.querySelector('input[name="q5"]:checked');
        if (ready) {
          form.requestSubmit();
        }
      }
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initQuiz);
  } else {
    initQuiz();
  }
})();
