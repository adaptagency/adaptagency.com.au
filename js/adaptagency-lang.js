/**
 * Shared site language: sessionStorage + session cookie + ?aa_lang= on internal links.
 * Preference lasts for the browser session only; a new session defaults to English.
 * file:// pages are separate origins — query + cookie carry choice between HTML files.
 */
(function (global) {
  "use strict";

  /** sessionStorage key for this browsing session. */
  var STORAGE_KEY = "adaptagency-lang";
  /** Session cookie (no Max-Age); separate name so old year-long adaptagency-lang cookies can be cleared. */
  var SESSION_COOKIE_KEY = "aa_lang_sess";
  /** Query key on index/privacy/terms links so language survives cross-document navigation. */
  var LANG_QUERY = "aa_lang";
  var siteLang = "en";
  var packs = null;
  var onAfterApply = null;

  function readLangFromQuery() {
    try {
      var q = new URLSearchParams(location.search.slice(1)).get(LANG_QUERY);
      if (q === "vi" || q === "en") return q;
    } catch (e) {}
    return null;
  }

  function readLangFromCookie() {
    try {
      var prefix = SESSION_COOKIE_KEY + "=";
      var parts = document.cookie.split(";");
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i].trim();
        if (p.indexOf(prefix) !== 0) continue;
        var v = decodeURIComponent(p.slice(prefix.length));
        if (v === "vi" || v === "en") return v;
      }
    } catch (e) {}
    return null;
  }

  function readStorage() {
    var fromQuery = readLangFromQuery();
    if (fromQuery) return fromQuery;
    try {
      var s = sessionStorage.getItem(STORAGE_KEY);
      if (s === "vi" || s === "en") return s;
    } catch (e) {}
    var fromCookie = readLangFromCookie();
    if (fromCookie) return fromCookie;
    return "en";
  }

  function writeStorage(lang) {
    try {
      sessionStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    try {
      var secure = location.protocol === "https:" ? ";Secure" : "";
      /* Session cookie (no Max-Age) — cleared when the browser session ends. */
      document.cookie =
        SESSION_COOKIE_KEY + "=" + encodeURIComponent(lang) + ";path=/;SameSite=Lax" + secure;
    } catch (e) {}
  }

  function stripLangQueryFromUrl() {
    try {
      if (!location.search) return;
      var params = new URLSearchParams(location.search.slice(1));
      if (!params.has(LANG_QUERY)) return;
      params.delete(LANG_QUERY);
      var q = params.toString();
      history.replaceState(null, "", location.pathname + (q ? "?" + q : "") + location.hash);
    } catch (e) {}
  }

  /** Keep internal .html links carrying current lang (needed when sessionStorage is not shared). */
  function syncInternalNavLinks(lang) {
    document.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href || /^(https?:|\/\/|mailto:|tel:)/i.test(href)) return;
      var hashIx = href.indexOf("#");
      var hash = hashIx >= 0 ? href.slice(hashIx) : "";
      var pathQuery = hashIx >= 0 ? href.slice(0, hashIx) : href;
      var qIx = pathQuery.indexOf("?");
      var pathOnly = qIx >= 0 ? pathQuery.slice(0, qIx) : pathQuery;
      var file = pathOnly.replace(/^\.\//, "");
      if (file !== "index.html" && file !== "privacy.html" && file !== "terms.html") return;
      a.setAttribute("href", file + "?" + LANG_QUERY + "=" + lang + hash);
    });
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
      if (el.querySelector("[data-i18n]")) return;
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
    syncInternalNavLinks(lang);
    if (typeof onAfterApply === "function") onAfterApply(lang);
  }

  function onPageShow() {
    applyLang(readStorage());
  }

  function onToggleClick() {
    applyLang(siteLang === "en" ? "vi" : "en");
  }

  function onVisibilityChange() {
    if (document.visibilityState !== "visible" || !packs) return;
    applyLang(readStorage());
  }

  /** i18nPacks: { en: { key: "..." }, vi: { ... } }; options.onAfterApply(lang) optional (e.g. contact form). */
  function init(i18nPacks, options) {
    packs = i18nPacks;
    onAfterApply = options && typeof options.onAfterApply === "function" ? options.onAfterApply : null;

    applyLang(readStorage());
    stripLangQueryFromUrl();

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    try {
      var sec = location.protocol === "https:" ? ";Secure" : "";
      document.cookie = "adaptagency-lang=;path=/;max-age=0;SameSite=Lax" + sec;
    } catch (e) {}

    global.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibilityChange);

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
