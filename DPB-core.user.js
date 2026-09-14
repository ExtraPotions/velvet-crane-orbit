// ==UserScript==
// @name           DPB-core
// @namespace      https://github.com/ExtraPotions/velvet-crane-orbit
// @version        1.0.0
// @description    Shared runtime for ExtraPotions userscript plugins.
// @author         expDARE
// @license        CC-BY-NC-4.0
// @match          https://www.amazon.com/*
// @match          https://amazon.com/*
// @match          https://www.amazon.co.uk/*
// @match          https://amazon.co.uk/*
// @match          https://www.amazon.ca/*
// @match          https://amazon.ca/*
// @match          https://www.amazon.de/*
// @match          https://amazon.de/*
// @match          https://www.amazon.fr/*
// @match          https://amazon.fr/*
// @match          https://www.amazon.it/*
// @match          https://amazon.it/*
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==
(function () {
  "use strict";
  if (window.ExpDareCore?.version) return;
  const plugins = new Map();
  const core = {
    version: "1.0.0",
    schemaVersion: 1,
    plugins,
    registerPlugin(id, plugin = {}) {
      if (!id || plugins.has(id)) return plugins.get(id) || null;
      const entry = { id, version: String(plugin.version || "0.0.0"), site: plugin.site || location.hostname, registeredAt: Date.now() };
      plugins.set(id, entry);
      window.dispatchEvent(new CustomEvent("expdare:plugin-registered", { detail: entry }));
      return entry;
    },
    getPlugin(id) { return plugins.get(id) || null; },
    storage(site, key, fallback) {
      const name = `expdare:${site}:${key}`;
      try { return GM_getValue(name, fallback); } catch { return fallback; }
    },
    setStorage(site, key, value) {
      try { GM_setValue(`expdare:${site}:${key}`, value); } catch {}
    },
    theme() {
      const source = document.getElementById("colorshift-root");
      const styles = getComputedStyle(source || document.documentElement);
      const values = {};
      for (const key of ["--menu-bg", "--menu-surface", "--menu-control", "--menu-text", "--menu-muted", "--menu-border", "--menu-accent", "--accent"]) {
        const value = styles.getPropertyValue(key).trim();
        if (value) values[key] = value;
      }
      return values;
    },
  };
  window.ExpDareCore = core;
  window.dispatchEvent(new CustomEvent("expdare:core-ready", { detail: { version: core.version } }));
})();
