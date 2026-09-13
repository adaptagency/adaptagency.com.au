/**
 * Shared transparent-header contrast: flip header text to the site's dark
 * green-black (#030706) while the sticky header floats over the page's LIGHT
 * gradient zone, and back to white over the dark top/footer zones.
 *
 * All pages share one body background: linear-gradient(to bottom, #030706 0%,
 * #0f3d3a 18%, #dceeeb 38%, #e8f3f2 48%, #e8f3f2 68%, #dceeeb 78%, #0f3d3a 90%,
 * #030706 100%). The gradient is parsed from the body's inline style so editing
 * the background in any page updates this behaviour automatically.
 *
 * Sets data-contrast="light" on <header class="site-header-home"> while the
 * backdrop luminance is above the threshold; page stylesheets style that state.
 */
(function () {
  "use strict";

  var header = document.querySelector(".site-header-home");
  if (!header) return;

  var GRADIENT_RE = /linear-gradient\((?:to\s+\w+)?\s*(.*)\)/;
  var TOKEN_RE = /(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))\s*([\d.]+%)?/g;
  /** Backdrop luminance crossover where dark text becomes higher-contrast than
   *  white (WCAG: (1.05)/(L+0.05) == (L+0.05)/(0.0516) -> L ≈ 0.183). */
  var LIGHT_THRESHOLD = 0.19;

  function parseColor(token) {
    var m, r, g, b;
    if ((m = token.match(/^#([0-9a-fA-F]{3})$/))) {
      r = parseInt(m[1][0] + m[1][0], 16);
      g = parseInt(m[1][1] + m[1][1], 16);
      b = parseInt(m[1][2] + m[1][2], 16);
    } else if ((m = token.match(/^#([0-9a-fA-F]{6})$/))) {
      r = parseInt(m[1].slice(0, 2), 16);
      g = parseInt(m[1].slice(2, 4), 16);
      b = parseInt(m[1].slice(4, 6), 16);
    } else if ((m = token.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/))) {
      r = parseFloat(m[1]);
      g = parseFloat(m[2]);
      b = parseFloat(m[3]);
    } else {
      return null;
    }
    return [r, g, b];
  }

  function parseStops() {
    var grad = document.body.style.background.match(GRADIENT_RE);
    if (!grad) return null;
    var stops = [];
    var m;
    TOKEN_RE.lastIndex = 0;
    while ((m = TOKEN_RE.exec(grad[1])) !== null) {
      var rgb = parseColor(m[1]);
      if (!rgb) continue;
      var pos = m[2] ? parseFloat(m[2]) / 100 : (stops.length ? 1 : 0);
      stops.push({ pos: pos, rgb: rgb });
    }
    if (stops.length < 2) return null;
    stops.sort(function (a, b) { return a.pos - b.pos; });
    return stops;
  }

  var stops = parseStops();
  if (!stops) return;

  function linearize(c) {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  function relativeLuminance(rgb) {
    return (
      0.2126 * linearize(rgb[0]) +
      0.7152 * linearize(rgb[1]) +
      0.0722 * linearize(rgb[2])
    );
  }

  function colourAt(frac) {
    if (frac <= stops[0].pos) return stops[0].rgb;
    for (var i = 1; i < stops.length; i++) {
      if (frac <= stops[i].pos) {
        var a = stops[i - 1], b = stops[i];
        var t = (frac - a.pos) / (b.pos - a.pos);
        return [
          a.rgb[0] + (b.rgb[0] - a.rgb[0]) * t,
          a.rgb[1] + (b.rgb[1] - a.rgb[1]) * t,
          a.rgb[2] + (b.rgb[2] - a.rgb[2]) * t
        ];
      }
    }
    return stops[stops.length - 1].rgb;
  }

  function update() {
    var bodyH = document.body.getBoundingClientRect().height;
    if (bodyH <= 0) return;
    var y = window.scrollY + header.getBoundingClientRect().height / 2;
    var frac = Math.max(0, Math.min(1, y / bodyH));

    // While the hero atmosphere (dark overlay) still covers the sticky header
    // band, the composite backdrop is dark regardless of the body gradient.
    var hero = document.querySelector(".hero-atmos");
    var overHero = hero && hero.getBoundingClientRect().bottom > header.getBoundingClientRect().bottom;

    var light = !overHero && relativeLuminance(colourAt(frac)) > LIGHT_THRESHOLD;
    var current = header.getAttribute("data-contrast") === "light";
    if (light !== current) {
      if (light) header.setAttribute("data-contrast", "light");
      else header.removeAttribute("data-contrast");
    }
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("pageshow", update);
  update();
})();