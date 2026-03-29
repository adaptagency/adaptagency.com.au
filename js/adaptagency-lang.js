/**
 * Shared site language: one localStorage value (adaptagency-lang), toggle updates it,
 * every page entry re-reads storage and syncs the switch + [data-i18n] DOM.
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "adaptagency-lang";
  var siteLang = "en";
  var packs = null;
  var onAfterApply = null;

  function readStorage() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s === "vi" || s === "en") return s;
    } catch (e) {}
    return "en";
  }

  function writeStorage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function translate(key) {
    if (!packs || !packs.en) return key;
    var p = packs[siteLang] || packs.en;
    return p[key] != null ? p[key] : packs.en[key] != null ? packs.en[key] : key;
  }

  function syncDocumentLang(lang) {
    document.documentElement.setAttribute("data-aa-lang", lang);
    document.documentElement.lang = lang === "vi" ? "vi" : "en-AU";
  }

  function syncToggle(lang) {
    var root = document.getElementById("lang-switch-root");
    var toggle = document.getElementById("lang-toggle");
    if (!root || !toggle) return;
    root.setAttribute("data-lang", lang);
    if (lang === "en") {
      root.classList.add("is-en");
      toggle.setAttribute("aria-checked", "false");
    } else {
      root.classList.remove("is-en");
      toggle.setAttribute("aria-checked", "true");
    }
  }

  function syncOpenGraphLocale(lang) {
    var ogLoc = document.querySelector('meta[property="og:locale"]');
    var ogLocAlt = document.querySelector('meta[property="og:locale:alternate"]');
    if (!ogLoc || !ogLocAlt) return;
    if (lang === "vi") {
      ogLoc.setAttribute("content", "vi_VN");
      ogLocAlt.setAttribute("content", "en_AU");
    } else {
      ogLoc.setAttribute("content", "en_AU");
      ogLocAlt.setAttribute("content", "vi_VN");
    }
  }

  function applyDomTranslations() {
    var tr = translate;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      var text = tr(key);
      if (text != null && text !== "") el.textContent = text;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (key) el.setAttribute("placeholder", tr(key));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (key) el.setAttribute("aria-label", tr(key));
    });

    var titleEl = document.getElementById("doc-title");
    if (titleEl) titleEl.textContent = tr("doc_title");
    var descEl = document.getElementById("doc-desc");
    if (descEl) descEl.setAttribute("content", tr("doc_desc"));

    var ogTitle = document.getElementById("og-title");
    if (ogTitle) ogTitle.setAttribute("content", tr("doc_title"));
    var ogDesc = document.getElementById("og-desc");
    if (ogDesc) ogDesc.setAttribute("content", tr("doc_desc"));
    var twTitle = document.getElementById("tw-title");
    if (twTitle) twTitle.setAttribute("content", tr("doc_title"));
    var twDesc = document.getElementById("tw-desc");
    if (twDesc) twDesc.setAttribute("content", tr("doc_desc"));
  }

  function applyLang(lang) {
    if (lang !== "vi" && lang !== "en") lang = "en";
    siteLang = lang;
    writeStorage(lang);
    syncDocumentLang(lang);
    syncToggle(lang);
    syncOpenGraphLocale(lang);
    applyDomTranslations();
    if (typeof onAfterApply === "function") onAfterApply(lang);
  }

  function onPageShow() {
    applyLang(readStorage());
  }

  function onStorage(e) {
    if (e.key !== STORAGE_KEY || e.newValue == null) return;
    if (e.newValue !== "vi" && e.newValue !== "en") return;
    applyLang(e.newValue);
  }

  function onToggleClick() {
    applyLang(siteLang === "en" ? "vi" : "en");
  }

  /** i18nPacks: { en: { key: "..." }, vi: { ... } }; options.onAfterApply(lang) optional (e.g. contact form). */
  function init(i18nPacks, options) {
    packs = i18nPacks;
    onAfterApply = options && typeof options.onAfterApply === "function" ? options.onAfterApply : null;

    applyLang(readStorage());

    global.addEventListener("pageshow", onPageShow);
    global.addEventListener("storage", onStorage);

    var btn = document.getElementById("lang-toggle");
    if (btn) btn.addEventListener("click", onToggleClick);
  }

  global.AdaptAgencyLang = {
    init: init,
    applyLang: applyLang,
    readStoredLanguage: readStorage,
    t: translate,
    getSiteLang: function () {
      return siteLang;
    },
    STORAGE_KEY: STORAGE_KEY,
  };
})(window);
