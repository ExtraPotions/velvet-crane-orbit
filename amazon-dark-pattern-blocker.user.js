// ==UserScript==
// @name           Amazon Dark Pattern Blocker
// @namespace      https://github.com/ExtraPotions/velvet-crane-orbit
// @version        1.2.1
// @description    Hide Amazon ads, upsells, and pressure tactics with adjustable protections and a dimmed reveal mode for hidden items.
// @tag            amazon
// @tag            shopping
// @tag            ad-blocking
// @tag            dark-patterns
// @author         expDARE
// @license        CC-BY-NC-4.0
// @homepageURL    https://github.com/ExtraPotions/velvet-crane-orbit
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
// @match          https://www.amazon.es/*
// @match          https://amazon.es/*
// @match          https://www.amazon.co.jp/*
// @match          https://amazon.co.jp/*
// @match          https://www.amazon.com.au/*
// @match          https://amazon.com.au/*
// @match          https://www.amazon.in/*
// @match          https://amazon.in/*
// @match          https://www.amazon.com.mx/*
// @match          https://amazon.com.mx/*
// @match          https://www.amazon.nl/*
// @match          https://amazon.nl/*
// @icon           https://raw.githubusercontent.com/ExtraPotions/velvet-crane-orbit/v1.2.1/icon-128.png
// @run-at         document-start
// @downloadURL    https://github.com/ExtraPotions/velvet-crane-orbit/releases/latest/download/amazon-dark-pattern-blocker.user.js
// @updateURL      https://github.com/ExtraPotions/velvet-crane-orbit/releases/latest/download/amazon-dark-pattern-blocker.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// ==/UserScript==

/* jshint esversion: 8 */
/* eslint-env es2017 */

/*
 * Amazon Dark Pattern Blocker
 * Copyright (c) 2025–2026 expDARE
 * Licensed under CC BY-NC 4.0 — https://creativecommons.org/licenses/by-nc/4.0/
 * Forks and modifications must attribute expDARE.
 * Non-commercial use only — no profit from this work.
 */

(function () {
  "use strict";

  const VERSION = "1.2.1";
  // ============================================================
  // CONFIGURATION
  // ============================================================

  const CONFIG = {
    selectors: {
      primeUpsells: {
        setting: "removePrimeUpsells",

        productPageIlmPromo:
          '[data-feature-name="desktop-dp-ilm"]',

        productPagePrimeUpsell:
          "#primeDPUpsellStaticContainerNPA",

        productPagePrimeUpsellAlt:
          "#primeDPUpsellStaticContainer",

        deliveryPrimeUpsell:
          "#mir-layout-DELIVERY_BLOCK-slot-SECONDARY_DELIVERY_MESSAGE_LARGE",

        navBarJoinPrime:
          "#nav-join-prime",

        checkoutPrimeUpsell:
          "#osu-prime-recommendations",

        checkoutPrimeStripe:
          "#prime-spc-stripe-recommendations",

        checkoutPrimeIsoa:
          ".isoa-wrapper-radio",

        searchPagePrimeUpsell:
          ".udm-primary-delivery-message:has(.prime-signup-ingress)",

        searchPagePrimeSavings:
          'span[data-csa-c-owner="PromotionsDiscovery"]:has(label[id^="greenBadge"])',

        businessPrimeUpsell:
          "#businessPrimeDPUpsellStaticContainer",

        productPagePrimeAccordionUpsell:
          "#primeSavingsUpsellAccordionRow",

        productPageBuyBoxPrimeUpsell:
          '#shippingMessageInsideBuyBox_feature_div:has(a[href*="prime"])',

        productPageFreeShippingPrimeUpsell:
          '#freeShippingPriceBadging_feature_div:has(a[href*="prime"])',

        productPageExclusivePricing:
          "#pep_feature_div",
      },

      urgencyTactics: {
        setting: "removeUrgencyTactics",

        cartScarcity:
          ".sc-product-scarcity",

        buyAgainScarcity:
          '[class*="_scarcityMessage_"]',

        searchPageScarcity:
          'span[aria-label*="left in stock"]',

        searchPageDealCountdown:
          '.a-badge[data-a-badge-type="deal"]',

        productPageDealBadge:
          "#dealBadge_feature_div",

        productPageDealProgress:
          "#dealProgress_feature_div",

        cartLowestPrice30Days:
          ".sc-delight-pricing",

        productPageLowestPrice30Days:
          "#delightPricingBadge_feature_div",
      },

      subscribeAndSave: {
        setting: "removeSubscribeNudges",

        cartSnsUpsell:
          ".sc-subscribe-and-save-upsell-message",
      },

      sponsoredProducts: {
        setting: "removeSponsoredProducts",

        searchSponsoredResult:
          '[data-component-type="sp-sponsored-result"]',

        searchAdHolder:
          ".AdHolder",

        searchSponsoredLabelCard:
          '.s-result-item:has(.puis-sponsored-label-text), .s-result-item:has(.s-sponsored-label-info-icon), .s-result-item:has([aria-label*="Sponsored"])',

        searchSponsoredWidget:
          '.s-widget-container:has(.puis-sponsored-label-text), .s-widget-container:has(.s-sponsored-label-text)',

        productSponsoredBrand:
          "#sp_detail_thematic",

        productSponsoredBottom:
          "#sp_detail",

        productAdsFeature:
          '[data-feature-name="sponsoredProducts"], [data-feature-name="sp_detail"]',

        productAdFeedback:
          "#ad-feedback-text-desktop-auto-sparkle-extra",
      },

      creditCardUpsells: {
        setting: "removeCreditCardUpsells",

        cartCreditCardBanner:
          "#sc-new-upsell",

        productPageCreditCardBanner:
          "#issuancePriceblockAmabot_feature_div",

        productPageCreditCardBannerMaple:
          "#maplePriceblockAmabot_feature_div",

        thankYouPageCreditCard:
          '[cel_widget_id="typ-mapleSlot"]',

        productPageInstallmentPlan:
          "#paymentOptions_PriceblockMessaging_feature_div",
      },

      aiUpsells: {
        setting: "removeAIUpsells",

        navRufus:
          "#nav-rufus-disco",

        navHealthAI:
          'li.nav-li:has(a[data-csa-c-content-id="nav_cs_health_ai"])',

        productPageRufus:
          "#nile-inline_feature_div",

        rufusTextSelectionTooltip:
          "#rufus-ask-rufus-tooltip",

        rufusPriceIngress:
          "#rufus-price-ingress",

        rufusPriceInsightsFodcx:
          "#fodcx_feature_div",
      },

      amazonServicePromos: {
        setting: "removeAmazonServicePromos",

        productPageMusicShoveler:
          '[cel_widget_id^="kahuna-music"]',

        productPageHeroQuickPromo:
          "#heroQuickPromoContainer",

        productPageAudibleUpsell:
          "#audibleUpsellAccordionRow",

        productPageFeedbackSurvey:
          "#feedbackSurvey_feature_div",
      },

      amazonBusinessPromos: {
        setting: "removeAmazonBusinessPromos",

        productPageBuyItOnAB:
          "#buyItOnAB_feature_div",

        productPageB2BUpsell:
          "#b2bUpsell_feature_div",
      },

      protectionPlans: {
        setting: "removeProtectionPlans",

        productPageProtectionPlan:
          "#mbb_feature_div",

        attachWarrantyExact:
          "#attach-warranty",

        attachSiNoCoverageRow:
          "#attachSiNoCoverage",
      },
    },

    clickTargets: {
      primeModals: {
        checkoutPrimeDecline:
          "#prime-decline-button",
      },

      generalDismiss: {},
    },

    textReplacements: {
      cartFreeShippingMessage: {
        selector: ".sc-sss-box .sc-sss",

        pattern:
          /Add\s+(\$[\d.]+)\s+of eligible items or.*?to get FREE delivery/s,

        replacement:
          "Add $1 of eligible items to get FREE delivery",
      },

      cartFlyoutFreeShippingMessage: {
        selector:
          ".ewc-compact-actions .sc-sss, #sw-threshold-message .sc-sss",

        pattern:
          /Add\s+(\$[\d.]+)\s+of eligible items or.*?to get FREE delivery[^.]*\./s,

        replacement:
          "Add $1 of eligible items to get FREE delivery on eligible items with no order minimum.",
      },

      searchPageSecondaryDelivery: {
        selector:
          ".udm-secondary-delivery-message",

        pattern:
          /^\s*Or\s+/i,

        replacement:
          "",
      },
    },

    uncheckTargets: {
      checkout: {},

      subscribeAndSave: {},
    },

    pages: {
      product:
        /\/dp\/|\/gp\/product\//,

      cart:
        /\/cart|\/gp\/cart/,

      checkoutPrimeInterstitial:
        /\/checkout\/.*\/pip/,

      checkout:
        /\/checkout\//,

      search:
        /\/s\?|\/s\/|\/b\?/,

      homepage:
        /^\/($|\?)/,
    },

    // MutationObserver handles normal dynamic content.
    // This is only a low-frequency safety net.
    safetySweepInterval: 15000,

    throttleDelay: 120,

    debug: false,
  };

  // ============================================================
  // SETTINGS
  // ============================================================

  const SETTINGS_CONFIG = {
    removePrimeUpsells: {
      displayName: "Remove Prime upsells",
      description: "Hide prompts encouraging Prime membership.",
      category: "promotions",
      default: true,
    },

    removeUrgencyTactics: {
      displayName: "Remove urgency tactics",
      description: "Hide scarcity, countdowns, and artificial urgency.",
      category: "promotions",
      default: true,
    },

    removeSubscribeNudges: {
      displayName: "Remove Subscribe & Save nudges",
      description: "Hide recurring-purchase prompts.",
      category: "promotions",
      default: true,
    },

    removeCreditCardUpsells: {
      displayName: "Remove credit card promos",
      description: "Hide Amazon credit-card and installment promotions.",
      category: "promotions",
      default: true,
    },

    removeProtectionPlans: {
      displayName: "Remove protection plans",
      description: "Hide extended warranty and protection-plan prompts.",
      category: "promotions",
      default: true,
    },

    removeAmazonBusinessPromos: {
      displayName: "Remove Amazon Business promos",
      description: "Hide Amazon Business upsells.",
      category: "promotions",
      default: true,
    },

    removeSponsoredProducts: {
      displayName: "Remove sponsored products",
      description: "Hide sponsored product placements.",
      category: "advertising",
      default: true,
    },

    removeFbtCarousels: {
      displayName: "Remove recommendation carousels",
      description: "Hide frequently-bought-together and similar-product shelves.",
      category: "advertising",
      default: true,
    },

    removeAmazonServicePromos: {
      displayName: "Remove Amazon service promos",
      description: "Hide Audible, Music, feedback, and related promotions.",
      category: "services",
      default: true,
    },

    removeAIUpsells: {
      displayName: "Remove Rufus AI",
      description: "Hide Rufus and other Amazon AI shopping prompts.",
      category: "ai",
      default: true,
    },

    autoClipCoupons: {
      displayName: "Auto-clip coupons",
      description: "Automatically select available coupons.",
      category: "convenience",
      default: true,
    },

    compactSearchResults: {
      displayName: "Compact search results",
      description: "Reduce spacing between search results.",
      category: "convenience",
      default: false,
    },
  };

  const SETTING_CATEGORIES = [
    {
      id: "promotions",
      title: "Promotions",
    },
    {
      id: "advertising",
      title: "Advertising",
    },
    {
      id: "services",
      title: "Amazon services",
    },
    {
      id: "ai",
      title: "Amazon AI",
    },
    {
      id: "convenience",
      title: "Convenience",
    },
    {
      id: "advanced",
      title: "Advanced",
    },
  ];

  class Setting {
    constructor(name, config) {
      this.name = name;
      this.displayName = config.displayName;
      this.description = config.description || "";
      this.category = config.category || "advanced";
      this.default = config.default;
    }

    get value() {
      try {
        return !!GM_getValue(this.name, this.default);
      } catch (e) {
        return this.default;
      }
    }

    set value(value) {
      try {
        GM_setValue(this.name, !!value);
      } catch (e) {
        debug("Unable to save setting", this.name, e);
      }
    }

    toggle() {
      this.value = !this.value;
    }
  }

  const Settings = Object.fromEntries(
    Object.entries(SETTINGS_CONFIG).map(([name, config]) => [
      name,
      new Setting(name, config),
    ]),
  );

  const UiSettings = {
    highContrast: new Setting(
      "adpb-high-contrast",
      {
        displayName: "High contrast switches",
        description: "Use stronger borders and clearer switch states.",
        default: false,
      },
    ),
    updateNotifications: new Setting(
      "adpb-update-notifications",
      {
        displayName: "Quiet update notifications",
        description: "Check release metadata once a day and show a quiet indicator.",
        default: false,
      },
    ),
  };

  // Small opt-in coordination surface for ExtraPotions overlays. Other
  // scripts can register secondary controls so the primary dock can make
  // room for them without guessing from z-index values.
  const ControlRegistry = (() => {
    const existing =
      window.ExtraPotionsControls;

    const api =
      existing &&
      Array.isArray(existing.controls) &&
      typeof existing.register === "function"
        ? existing
        : {
            controls: [],

            register(element, options = {}) {
              if (!element) return null;

              this.controls =
                this.controls.filter(
                  (entry) =>
                    entry.element &&
                    entry.element.isConnected !== false,
                );

              let entry =
                this.controls.find(
                  (item) =>
                    item.element === element,
                );

              if (!entry) {
                entry = {
                  element,
                  owner: options.owner || "expDARE",
                  role: options.role || "secondary",
                  primary: !!options.primary,
                };
                this.controls.push(entry);
              } else {
                Object.assign(entry, options);
              }

              element.dataset.expdareControl =
                "true";
              element.dataset.expdareOwner =
                entry.owner;

              return entry;
            },

            claimPrimary(element) {
              this.controls.forEach(
                (entry) => {
                  entry.primary = false;
                  if (entry.element) {
                    entry.element.dataset.expdarePrimary =
                      "false";
                  }
                },
              );

              const entry =
                this.register(element, {
                  owner: "expDARE",
                  role: "primary",
                  primary: true,
                });

              if (entry) {
                entry.primary = true;
                entry.element.dataset.expdarePrimary =
                  "true";
              }

              return entry;
            },
          };

    if (typeof api.claimPrimary !== "function") {
      api.claimPrimary = function (element) {
        (api.controls || []).forEach((entry) => {
          entry.primary = false;
          if (entry.element) {
            entry.element.dataset.expdarePrimary = "false";
          }
        });
        const entry = api.register(element, {
          owner: "expDARE",
          role: "primary",
          primary: true,
        });
        if (entry && entry.element) {
          entry.primary = true;
          entry.element.dataset.expdarePrimary = "true";
        }
        return entry;
      };
    }

    window.ExtraPotionsControls = api;
    return api;
  })();

  const MasterSetting = {
    get value() {
      try {
        return !!GM_getValue("adpb-enabled", true);
      } catch (e) {
        return true;
      }
    },

    set value(value) {
      try {
        GM_setValue("adpb-enabled", !!value);
      } catch (e) {}
    },
  };

  const SETTINGS_SCHEMA = 1;
  const SETTINGS_SCHEMA_KEY = "adpb-settings-schema";
  function migrateSettings() {
    let schema = 0;
    try { schema = Number(GM_getValue(SETTINGS_SCHEMA_KEY, 0)) || 0; } catch (e) {}
    if (schema >= SETTINGS_SCHEMA) return;
    for (const setting of [...Object.values(Settings), ...Object.values(UiSettings)]) {
      let value;
      try { value = GM_getValue(setting.name, setting.default); } catch (e) { value = setting.default; }
      setting.value = typeof value === "boolean" ? value : setting.default;
    }
    let enabled = true;
    try { enabled = GM_getValue("adpb-enabled", true); } catch (e) {}
    MasterSetting.value = typeof enabled === "boolean" ? enabled : true;
    try {
      const top = GM_getValue("adpb-fabTop", null);
      if (top !== null && (typeof top !== "number" || !Number.isFinite(top))) GM_setValue("adpb-fabTop", null);
      const target = GM_getValue("adpb-dockTarget", null);
      if (target !== null && typeof target !== "string") GM_setValue("adpb-dockTarget", null);
      GM_setValue(SETTINGS_SCHEMA_KEY, SETTINGS_SCHEMA);
    } catch (e) { debug("Unable to migrate settings", e); }
  }

  // ============================================================
  // SESSION STATS
  // ============================================================

  const Stats = {
    categories: {
      promotions: 0,
      advertising: 0,
      services: 0,
      ai: 0,
      convenience: 0,
      advanced: 0,
    },

    actions: {
      hidden: 0,
      clicked: 0,
      unchecked: 0,
      textReplaced: 0,
    },

    total: 0,

    increment(category, amount = 1, action = "hidden") {
      if (!amount || amount < 1) return;

      if (this.categories[category] == null) {
        this.categories[category] = 0;
      }

      this.categories[category] += amount;

      if (this.actions[action] == null) {
        this.actions[action] = 0;
      }

      this.actions[action] += amount;
      this.total += amount;

      SettingsRail.updateStats();
    },

    reset() {
      Object.keys(this.categories).forEach((key) => {
        this.categories[key] = 0;
      });

      Object.keys(this.actions).forEach((key) => {
        this.actions[key] = 0;
      });

      this.total = 0;

      SettingsRail.updateStats();
    },

    enabledCount() {
      return Object.values(Settings).filter(
        (setting) => setting.value,
      ).length;
    },

    totalSettings() {
      return Object.keys(Settings).length;
    },
  };

  // ============================================================
  // UTILITIES
  // ============================================================

  function debug(message, ...args) {
    if (CONFIG.debug) {
      console.log(
        `[Amazon Dark Pattern Blocker] ${message}`,
        ...args,
      );
    }
  }

  function safeQueryAll(selector) {
    try {
      return document.querySelectorAll(selector);
    } catch (e) {
      debug(`Invalid selector: ${selector}`, e);
      return [];
    }
  }

  const CART_RAIL_SELECTORS = [
    "#sc-page-content",
    "#sc-retail-cart-container",
    "#sc-cart-column",
    "#sc-active-cart",
    "#sc-empty-cart",
    "#sc-saved-cart",
    "#proceed-to-checkout-desktop-container",
    "#sc-buy-box-panel",
    "#sc-buy-box",
    "#sc-buy-box-ptc-button",
    "form#activeCartViewForm",

    "#attach-desktop-sideSheet",
    "#attach-accessory-pane",
    "#attachSideSheet_feature_div",
    "#nav-flyout-ewc",
    ".nav-ewcFlyout",
    ".nav-ewc-persistent",
    "#nav-flyout-ewc .nav-flyout-content",
    "#ewc-content",
    "#ewc-compact",
    "#ewc-compact-body",
    ".ewc-container",

    "#smartWagon_feature_div",
    "#sw-content",
    "#sw-foldaway",
    "#sw-subtotals",
    "#sw-items",
  ];

  function isInsideCartRail(el) {
    if (!el || !el.closest) return false;

    try {
      return !!el.closest(
        CART_RAIL_SELECTORS.join(","),
      );
    } catch (e) {
      return false;
    }
  }

  function isOwnedUI(el) {
    if (!el || !el.closest) return false;

    return !!el.closest(
      "#adpb-settings-fab, #adpb-settings-panel",
    );
  }

  // ============================================================
  // ACTIONS
  // ============================================================

  // Session-only inspection; deliberately independent of persisted protections.
  const Reveal = {
    active: false,
    apply(el) {
      if (this.active) {
        const display = el.dataset.adpbPreviousDisplay || "";
        if (display) el.style.setProperty("display", display, el.dataset.adpbPreviousPriority || "");
        else el.style.removeProperty("display");
        el.dataset.adpbRevealed = "true";
      } else {
        delete el.dataset.adpbRevealed;
        el.style.setProperty("display", "none", "important");
      }
    },
    toggle() {
      this.active = !this.active;
      refreshHideStyles();
      document.querySelectorAll('[data-adpb-hidden="true"]').forEach(el => this.apply(el));
      scheduleProcess(0);
      const control = SettingsRail.panel?.querySelector('.adpb-reveal');
      if (control) {
        control.textContent = this.active ? "Hide revealed items" : "Show hidden items";
        control.setAttribute("aria-pressed", String(this.active));
      }
    },
  };

  const Actions = {
    hide(el, category, reason) {
      if (!el || isOwnedUI(el)) return false;

      if (el.dataset.adpbHidden === "true") {
        return false;
      }

      if (isInsideCartRail(el)) {
        debug(`Skipped cart rail element: ${reason || "unknown"}`);
        return false;
      }

      try {
        el.dataset.adpbHidden = "true";
        el.dataset.adpbPreviousDisplay =
          el.style.getPropertyValue("display") || "";

        el.dataset.adpbPreviousPriority = el.style.getPropertyPriority("display");
        el.dataset.adpbReason = reason || category || "Hidden by ADPB";
        Reveal.apply(el);

        Stats.increment(category, 1, "hidden");

        debug(`Hidden ${reason || "element"}`);

        return true;
      } catch (e) {
        debug("Unable to hide element", e);
        return false;
      }
    },

    restoreHiddenElements() {
      const nodes = document.querySelectorAll(
        '[data-adpb-hidden="true"]',
      );

      nodes.forEach(restoreElement);
    },

    click(el, category, reason) {
      if (!el) return false;

      if (el.dataset.adpbClicked === "true") {
        return false;
      }

      try {
        el.dataset.adpbClicked = "true";
        el.click();

        Stats.increment(category, 1, "clicked");

        debug(`Clicked ${reason || "element"}`);

        return true;
      } catch (e) {
        debug("Unable to click element", e);
        return false;
      }
    },

    uncheck(el, category, reason) {
      if (!el || !el.checked) return false;

      try {
        el.checked = false;
        el.dispatchEvent(
          new Event("change", {
            bubbles: true,
          }),
        );

        Stats.increment(category, 1, "unchecked");

        debug(`Unchecked ${reason || "element"}`);

        return true;
      } catch (e) {
        debug("Unable to uncheck element", e);
        return false;
      }
    },
  };

  // ============================================================
  // EARLY CSS
  // ============================================================

  let hideSheet;
  function injectStyles() {
    if(!hideSheet)hideSheet=new CSSStyleSheet();
    hideSheet.replaceSync('');
    if(!document.adoptedStyleSheets.includes(hideSheet))document.adoptedStyleSheets=[...document.adoptedStyleSheets,hideSheet];
    const existing =
      document.getElementById("adpb-styles");

    if (existing) {
      existing.remove();
    }

    if (!MasterSetting.value) {
      return;
    }

    if (Reveal.active) {
      hideSheet.replaceSync('[data-adpb-revealed="true"]{opacity:.55!important;outline:1px dashed #9acde0!important;outline-offset:-1px!important}[data-adpb-revealed="true"]:hover,[data-adpb-revealed="true"]:focus-within{opacity:1!important}');
      return;
    }

    const path =
      window.location.pathname +
      window.location.search;

    const isHomepage =
      CONFIG.pages.homepage.test(path);

    let rules = [];

    if (isHomepage) {
      if (Settings.removePrimeUpsells.value) {
        rules.push("#nav-join-prime");
      }

      if (Settings.removeAIUpsells.value) {
        rules.push("#nav-rufus-disco");
        rules.push("#rufus-ask-rufus-tooltip");
      }
    } else {
      for (const category of Object.values(
        CONFIG.selectors,
      )) {
        if (
          !category.setting ||
          !Settings[category.setting] ||
          !Settings[category.setting].value
        ) {
          continue;
        }

        for (const [key, selector] of Object.entries(
          category,
        )) {
          if (key === "setting") continue;

          if (selector) {
            rules.push(selector);
          }
        }
      }
    }

    if (!rules.length) return;

    const exclude = [
      ":not(#nav-flyout-ewc):not(#nav-flyout-ewc *)",
      ":not(#ewc-content):not(#ewc-content *)",
      ":not(#ewc-compact):not(#ewc-compact *)",
      ":not(#attach-desktop-sideSheet):not(#attach-desktop-sideSheet *)",
      ":not(#attachSideSheet_feature_div):not(#attachSideSheet_feature_div *)",
      ":not(#proceed-to-checkout-desktop-container):not(#proceed-to-checkout-desktop-container *)",
      ":not(#sc-buy-box-panel):not(#sc-buy-box-panel *)",
      ":not(#sc-active-cart):not(#sc-active-cart *)",
      ":not(#smartWagon_feature_div):not(#smartWagon_feature_div *)",
    ].join("");

    const safeRules = rules
      .filter(
        (selector) =>
          !CART_RAIL_SELECTORS.includes(selector),
      )
      .map(
        (selector) =>
          `${selector}${exclude}`,
      );

    if (!safeRules.length) return;

    const style = document.createElement("style");

    style.id = "adpb-styles";

    const hideCss =
      `/* Amazon Dark Pattern Blocker ${VERSION} */\n` +
      safeRules.join(",\n") +
      " {\n" +
      "  display: none !important;\n" +
      "}\n";

    (
      document.head ||
      document.documentElement
    ).appendChild(style);

    hideSheet.replaceSync(hideCss);
    debug(
      `Injected ${safeRules.length} early CSS rules`,
    );
  }

  // ============================================================
  // PAGE DETECTION
  // ============================================================

  function getPageType() {
    const path =
      window.location.pathname +
      window.location.search;

    for (const [pageType, pattern] of Object.entries(
      CONFIG.pages,
    )) {
      if (pattern.test(path)) {
        return pageType;
      }
    }

    return "other";
  }

  // ============================================================
  // DECLUTTERER
  // ============================================================

  const Declutterer = {
    restoreCategory(categoryKey) {
      const selectors =
        CONFIG.selectors[categoryKey];

      if (!selectors) return 0;

      let count = 0;

      for (const [name, selector] of Object.entries(
        selectors,
      )) {
        if (name === "setting" || !selector) {
          continue;
        }

        safeQueryAll(selector).forEach((el) => {
          if (el.dataset.adpbHidden === "true") {
            restoreElement(el);
            count++;
          }
        });
      }

      return count;
    },

    removeByCategory(categoryKey, settingKey) {
      if (!MasterSetting.value) return 0;

      if (
        !Settings[settingKey] ||
        !Settings[settingKey].value
      ) {
        return this.restoreCategory(categoryKey);
      }

      const selectors =
        CONFIG.selectors[categoryKey];

      if (!selectors) return 0;

      const category =
        Settings[settingKey].category;

      let count = 0;

      for (const [name, selector] of Object.entries(
        selectors,
      )) {
        if (name === "setting" || !selector) {
          continue;
        }

        const elements =
          safeQueryAll(selector);

        elements.forEach((el) => {
          if (
            Actions.hide(
              el,
              category,
              name,
            )
          ) {
            count++;
          }
        });
      }

      return count;
    },

    clickByCategory(categoryKey, settingKey) {
      if (!MasterSetting.value) return 0;

      if (
        settingKey &&
        (!Settings[settingKey] ||
          !Settings[settingKey].value)
      ) {
        return 0;
      }

      const targets =
        CONFIG.clickTargets[categoryKey];

      if (!targets) return 0;

      let count = 0;

      for (const [name, selector] of Object.entries(
        targets,
      )) {
        if (!selector) continue;

        const elements =
          safeQueryAll(selector);

        elements.forEach((el) => {
          if (
            Actions.click(
              el,
              "promotions",
              name,
            )
          ) {
            count++;
          }
        });
      }

      return count;
    },

    uncheckByCategory(categoryKey) {
      if (!MasterSetting.value) return 0;

      const targets =
        CONFIG.uncheckTargets[categoryKey];

      if (!targets) return 0;

      let count = 0;

      for (const [name, selector] of Object.entries(
        targets,
      )) {
        if (!selector) continue;

        const elements =
          safeQueryAll(selector);

        elements.forEach((el) => {
          if (
            Actions.uncheck(
              el,
              "promotions",
              name,
            )
          ) {
            count++;
          }
        });
      }

      return count;
    },

    processPrimeAccordionUpsell() {
      if (
        !MasterSetting.value ||
        !Settings.removePrimeUpsells.value
      ) {
        return;
      }

      const primeRow =
        document.querySelector(
          "#primeSavingsUpsellAccordionRow",
        );

      if (
        !primeRow ||
        primeRow.dataset.adpbProcessed
      ) {
        return;
      }

      const isActive =
        primeRow.classList.contains(
          "a-accordion-active",
        ) ||
        primeRow.querySelector(
          ".a-icon-radio-active",
        );

      if (!isActive) return;

      const regularRow =
        document.querySelector(
          "#baseBuyingOptionAccordionRow",
        ) ||
        document.querySelector(
          '#buyBoxAccordion [data-a-accordion-row-name]:not(#primeSavingsUpsellAccordionRow)',
        );

      if (!regularRow) return;

      const clickTarget =
        regularRow.querySelector(
          '.a-accordion-row-a11y, .accordion-header, [role="button"]',
        );

      if (clickTarget) {
        primeRow.dataset.adpbProcessed =
          "true";

        Actions.click(
          clickTarget,
          "promotions",
          "regular-price-option",
        );
      }
    },

    processPrimeUpsells() {
      return this.removeByCategory(
        "primeUpsells",
        "removePrimeUpsells",
      );
    },

    processUrgencyTactics() {
      return this.removeByCategory(
        "urgencyTactics",
        "removeUrgencyTactics",
      );
    },

    processSubscribeNudges() {
      return this.removeByCategory(
        "subscribeAndSave",
        "removeSubscribeNudges",
      );
    },

    processSponsoredProducts() {
      return this.removeByCategory(
        "sponsoredProducts",
        "removeSponsoredProducts",
      );
    },

    processCreditCardUpsells() {
      return this.removeByCategory(
        "creditCardUpsells",
        "removeCreditCardUpsells",
      );
    },

    processAIUpsells() {
      return this.removeByCategory(
        "aiUpsells",
        "removeAIUpsells",
      );
    },

    processAmazonServicePromos() {
      return this.removeByCategory(
        "amazonServicePromos",
        "removeAmazonServicePromos",
      );
    },

    processProtectionPlans() {
      return this.removeByCategory(
        "protectionPlans",
        "removeProtectionPlans",
      );
    },

    processAmazonBusinessPromos() {
      return this.removeByCategory(
        "amazonBusinessPromos",
        "removeAmazonBusinessPromos",
      );
    },

    processFbtCarousels() {
      if (!MasterSetting.value) return 0;

      const selectors = [
        "#purchase-sims-feature",
        "#sims-consolidated-1_feature_div",
        "#sims-consolidated-2_feature_div",
        "#similarities_feature_div",
        "#sp_detail",
        "#HLCXComparisonWidget_feature_div",
        "#bundleV2_feature_div",
        "[id*='anonCarousel']",
        "#fbt_x_title",
        ".a-carousel-container",
        "#browse_feature_div",
      ];

      let count = 0;

      const enabled =
        Settings.removeFbtCarousels.value;

      selectors.forEach((selector) => {
        safeQueryAll(selector).forEach((el) => {
          if (
            el.closest(
              "#imageBlock, #altImages, #imageBlockNew, #adpb-settings-fab, #adpb-settings-panel",
            )
          ) {
            return;
          }

          if (enabled) {
            if (
              Actions.hide(
                el,
                "advertising",
                "recommendation-carousel",
              )
            ) {
              count++;
            }
          } else if (
            el.dataset.adpbHidden === "true"
          ) {
            restoreElement(el);
          }
        });
      });

      return count;
    },

    applyCompactSearch() {
      let node =
        document.getElementById(
          "adpb-compact-search-style",
        );

      if (
        !Settings.compactSearchResults.value ||
        !MasterSetting.value
      ) {
        if (node) node.remove();
        return;
      }

      if (!node) {
        node = document.createElement("style");
        node.id =
          "adpb-compact-search-style";

        (
          document.documentElement ||
          document.head
        ).appendChild(node);
      }

      node.textContent = `
        .s-result-item,
        .s-card-container,
        [data-component-type="s-search-result"] {
          margin-bottom: 0.35rem !important;
        }

        .s-result-item .a-section {
          padding-top: 0.25rem !important;
          padding-bottom: 0.25rem !important;
        }

        .s-widget-container,
        .AdHolder {
          margin: 0.25rem 0 !important;
        }
      `;
    },

    processPrimeModals() {
      return this.clickByCategory(
        "primeModals",
        "removePrimeUpsells",
      );
    },

    processGeneralDismiss() {
      return this.clickByCategory(
        "generalDismiss",
      );
    },

    processCheckoutUnchecks() {
      return this.uncheckByCategory(
        "checkout",
      );
    },

    processSubscribeUnchecks() {
      return this.uncheckByCategory(
        "subscribeAndSave",
      );
    },

    processPrimeInterstitial() {
      if (
        !MasterSetting.value ||
        !Settings.removePrimeUpsells.value
      ) {
        return;
      }

      const container =
        document.querySelector(
          "#updp-prime-recommendations",
        );

      const declineButton =
        document.querySelector(
          "#prime-decline-button",
        );

      if (
        container &&
        declineButton &&
        !container.dataset.adpbProcessed
      ) {
        container.dataset.adpbProcessed =
          "true";

        const declineUrl =
          declineButton.href;

        container.innerHTML = `
          <div style="
            display:flex;
            align-items:center;
            justify-content:center;
            min-height:200px;
            font-size:18px;
            color:#0F1111;
          ">
            <p>Skipping Prime upsell page...</p>
          </div>
        `;

        if (declineUrl) {
          window.location.href =
            declineUrl;
        }
      }
    },

    processAudibleDefaultSelection() {
      if (
        !MasterSetting.value ||
        !Settings.removeAmazonServicePromos.value
      ) {
        return;
      }

      const audibleSwatch =
        document.querySelector(
          "#tmm-grid-swatch-AUDIO_DOWNLOAD.selected",
        );

      if (
        !audibleSwatch ||
        audibleSwatch.dataset.adpbProcessed
      ) {
        return;
      }

      const physicalSwatch =
        document.querySelector(
          "#tmm-grid-swatch-HARDCOVER a",
        ) ||
        document.querySelector(
          "#tmm-grid-swatch-PAPERBACK a",
        );

      if (physicalSwatch) {
        audibleSwatch.dataset.adpbProcessed =
          "true";

        Actions.click(
          physicalSwatch,
          "services",
          "physical-format",
        );
      }
    },

    processAutoClipCoupons() {
      if (
        !MasterSetting.value ||
        !Settings.autoClipCoupons.value
      ) {
        return 0;
      }

      let count = 0;

      const coupons =
        document.querySelectorAll(
          '[data-component-type="s-coupon-component"] .s-coupon-tile.unclaimed input[type="checkbox"]:not(:checked), .ct-coupon-tile.unclaimed input[type="checkbox"]:not(:checked)',
        );

      coupons.forEach((checkbox) => {
        if (
          Actions.click(
            checkbox,
            "convenience",
            "coupon",
          )
        ) {
          count++;
        }
      });

      return count;
    },

    processTextReplacements() {
      if (
        !MasterSetting.value ||
        !Settings.removePrimeUpsells.value
      ) {
        return 0;
      }

      let count = 0;

      for (const [name, config] of Object.entries(
        CONFIG.textReplacements,
      )) {
        const elements =
          safeQueryAll(config.selector);

        elements.forEach((el) => {
          if (
            el.dataset.adpbTextProcessed ===
            "true"
          ) {
            return;
          }

          const originalText =
            el.textContent || "";

          if (!config.pattern.test(originalText)) {
            return;
          }

          const newText =
            originalText.replace(
              config.pattern,
              config.replacement,
            );

          el.textContent = newText;

          el.dataset.adpbTextProcessed =
            "true";

          Stats.increment(
            "promotions",
            1,
            "textReplaced",
          );

          count++;

          debug(
            `Replaced text in ${name}`,
          );
        });
      }

      return count;
    },
  };

  function restoreElement(el) {
    if (!el) return;
    try {
      const previous = el.dataset.adpbPreviousDisplay || "";
      if (previous) el.style.setProperty("display", previous, el.dataset.adpbPreviousPriority || "");
      else el.style.removeProperty("display");
      delete el.dataset.adpbHidden;
      delete el.dataset.adpbPreviousDisplay;
      delete el.dataset.adpbPreviousPriority;
      delete el.dataset.adpbRevealed;
      delete el.dataset.adpbReason;
    } catch (e) {}
  }

  // ============================================================
  // PAGE HANDLERS
  // ============================================================

  const PageHandlers = {
    product() {
      Declutterer.processPrimeAccordionUpsell();
      Declutterer.processPrimeUpsells();
      Declutterer.processAIUpsells();
      Declutterer.processCreditCardUpsells();
      Declutterer.processAmazonServicePromos();
      Declutterer.processAudibleDefaultSelection();
      Declutterer.processAmazonBusinessPromos();
      Declutterer.processProtectionPlans();
      Declutterer.processUrgencyTactics();
      Declutterer.processSubscribeNudges();
      Declutterer.processSubscribeUnchecks();
      Declutterer.processSponsoredProducts();
      Declutterer.processFbtCarousels();
      Declutterer.processAutoClipCoupons();
      Declutterer.processTextReplacements();
      Declutterer.processPrimeModals();
      Declutterer.processGeneralDismiss();
    },

    cart() {
      Declutterer.processPrimeUpsells();
      Declutterer.processAIUpsells();
      Declutterer.processCreditCardUpsells();
      Declutterer.processUrgencyTactics();
      Declutterer.processSubscribeNudges();
      Declutterer.processTextReplacements();
      Declutterer.processPrimeModals();
      Declutterer.processGeneralDismiss();
    },

    checkoutPrimeInterstitial() {
      Declutterer.processPrimeInterstitial();
    },

    checkout() {
      Declutterer.processPrimeUpsells();
      Declutterer.processAIUpsells();
      Declutterer.processCheckoutUnchecks();
      Declutterer.processPrimeModals();
      Declutterer.processGeneralDismiss();
    },

    search() {
      Declutterer.processPrimeUpsells();
      Declutterer.processAIUpsells();
      Declutterer.processSponsoredProducts();
      Declutterer.processFbtCarousels();
      Declutterer.applyCompactSearch();
      Declutterer.processUrgencyTactics();
      Declutterer.processAutoClipCoupons();
      Declutterer.processTextReplacements();
      Declutterer.processPrimeModals();
      Declutterer.processGeneralDismiss();
    },

    homepage() {
      if (
        Settings.removePrimeUpsells.value
      ) {
        safeQueryAll(
          "#nav-join-prime",
        ).forEach((el) => {
          Actions.hide(
            el,
            "promotions",
            "homepage-prime",
          );
        });
      }

      if (
        Settings.removeAIUpsells.value
      ) {
        safeQueryAll(
          "#nav-rufus-disco, #rufus-ask-rufus-tooltip",
        ).forEach((el) => {
          Actions.hide(
            el,
            "ai",
            "homepage-rufus",
          );
        });
      }
    },

    other() {
      Declutterer.processPrimeAccordionUpsell();
      Declutterer.processPrimeUpsells();
      Declutterer.processAIUpsells();
      Declutterer.processCreditCardUpsells();
      Declutterer.processAmazonBusinessPromos();
      Declutterer.processUrgencyTactics();
      Declutterer.processSponsoredProducts();
      Declutterer.processFbtCarousels();
      Declutterer.processTextReplacements();
      Declutterer.processPrimeModals();
      Declutterer.processGeneralDismiss();
    },
  };

  // ============================================================
  // PROCESSING
  // ============================================================

  let processTimer = null;
  let lastProcessedUrl = location.href;
  let lastProcessedAt = 0;
  const diagnosticErrors = [];
  function diagnosticsText() {
    const active = Object.values(Settings).filter((setting) => setting.value).length;
    return [`Amazon Dark Pattern Blocker ${VERSION}`, `Site: ${location.hostname}`, `Page: ${getPageType()} (${location.pathname || "/"})`, `Active protections: ${active}/${Object.keys(Settings).length}`, `Blocked this session: ${Stats.total}`, `Last processed: ${lastProcessedAt ? new Date(lastProcessedAt).toISOString() : "Not yet"}`, `Errors: ${diagnosticErrors.length}${diagnosticErrors.length ? " · " + diagnosticErrors.at(-1) : ""}`].join("\n");
  }

  function processPage() {
    if (!MasterSetting.value) {
      return;
    }

    try {
      const pageType =
        getPageType();

      const handler =
        PageHandlers[pageType] ||
        PageHandlers.other;

      debug(
        `Processing ${pageType}`,
      );

      handler();

      lastProcessedUrl =
        location.href;
      lastProcessedAt = Date.now();

      SettingsRail.updateStatus();
      SettingsRail.updateDiagnostics();
    } catch (error) {
      diagnosticErrors.push(String(error && error.message || error));
      debug(
        "Error during processing:",
        error,
      );
    }
  }

  function scheduleProcess(
    delay = CONFIG.throttleDelay,
  ) {
    if (!MasterSetting.value) return;

    if (processTimer !== null) {
      return;
    }

    processTimer = window.setTimeout(
      () => {
        processTimer = null;
        processPage();
      },
      delay,
    );
  }

  function refreshHideStyles() {
    hideSheet?.replaceSync('');
    const existing =
      document.getElementById(
        "adpb-styles",
      );

    if (existing) {
      existing.remove();
    }

    if (!MasterSetting.value) {
      Actions.restoreHiddenElements();

      const compact =
        document.getElementById(
          "adpb-compact-search-style",
        );

      if (compact) {
        compact.remove();
      }

      return;
    }

    try {
      injectStyles();
    } catch (e) {
      debug(
        "Unable to refresh hide styles",
        e,
      );
    }
  }

  function applySettingsLive() {
    refreshHideStyles();
    Actions.restoreHiddenElements();

    if (!MasterSetting.value) {
      SettingsRail.updateStatus();
      return;
    }

    processPage();

    try {
      Declutterer.processFbtCarousels();
      Declutterer.applyCompactSearch();
    } catch (e) {
      debug(
        "Live settings update failed",
        e,
      );
    }

    SettingsRail.updateStatus();
    SettingsRail.updateStats();
  }

  // ============================================================
  // NAVIGATION
  // ============================================================

  function setupNavigationDetection() {
    const originalPushState =
      history.pushState;

    const originalReplaceState =
      history.replaceState;

    history.pushState =
      function (...args) {
        const result =
          originalPushState.apply(
            this,
            args,
          );

        scheduleProcess(0);

        return result;
      };

    history.replaceState =
      function (...args) {
        const result =
          originalReplaceState.apply(
            this,
            args,
          );

        scheduleProcess(0);

        return result;
      };

    window.addEventListener(
      "popstate",
      () => scheduleProcess(0),
    );

    window.addEventListener(
      "hashchange",
      () => scheduleProcess(0),
    );
  }

  // ============================================================
  // SETTINGS UI
  // ============================================================

  // DOM-based opt-in works across userscript sandboxes; only expDARE companions yield.
  function coordinateExpdareControls(anchor, registered = []) {
    const candidates = new Set([...document.querySelectorAll('[data-userscript-launcher="userscript-launcher-v1"],[data-expdare-control="secondary"],#pfh-fab,.pfh-fab'), ...registered]);
    const anchorNode=anchor.getRootNode().host||anchor;
    const anchorPriority=Number(anchorNode.dataset.launcherPriority||100);
    const primary = [anchor];
    for (const host of document.querySelectorAll('[data-expdare-dock-root]')) {
      const control = host.shadowRoot?.querySelector('[data-expdare-control="primary"]');
      if (control && control !== anchor) primary.push(control);
    }
    const occupied = primary.map(el=>el.getBoundingClientRect()).filter(r=>r.width&&r.height);
    const origin=anchor.getBoundingClientRect();
    const overlaps=r=>occupied.some(o=>r.left<o.right+8&&r.right>o.left-8&&r.top<o.bottom+8&&r.bottom>o.top-8);
    for (const el of candidates) {
      if (!el.isConnected || el===anchorNode || primary.includes(el) || el.dataset.expdareControl==='primary' || Number(el.dataset.launcherPriority||0)>=anchorPriority) continue;
      const ownerRoot=el.getRootNode().host;
      if(ownerRoot?.dataset.expdareDockRoot==='primary')continue;
      let rect=el.getBoundingClientRect();
      if (!rect.width || !rect.height || !['fixed','sticky'].includes(getComputedStyle(el).position)) continue;
      if(overlaps(rect)){
        let x=origin.left-rect.width-8,y=origin.top;
        for(let n=0;n<100;n++){
          if(x<8){x=Math.max(8,innerWidth-rect.width-16);y-=rect.height+8;}
          if(y<8)break;
          const box={left:x,right:x+rect.width,top:y,bottom:y+rect.height};
          if(!overlaps(box)){
            for(const [key,value] of Object.entries({left:x+'px',top:y+'px',right:'auto',bottom:'auto'}))el.style.setProperty(key,value,'important');
            rect=box;break;
          }
          x-=rect.width+8;
        }
      }
      occupied.push(rect);
    }
  }
  const LAUNCHER_PROTOCOL='userscript-launcher-v1';
  const SHORTCUT_KEY='adpb-open-shortcut';
  function normaliseShortcut(value){if(typeof value!=='string')return '';const raw=value.trim();if(!raw||/^off$/i.test(raw))return '';const parts=raw.split('+').map(v=>v.trim()).filter(Boolean),key=parts.pop();if(!key)return '';const mods=['Ctrl','Alt','Shift','Meta'].filter(mod=>parts.some(v=>v.toLowerCase()===mod.toLowerCase()));return [...mods,key.length===1?key.toUpperCase():key].join('+');}
  function readShortcut(){try{return normaliseShortcut(GM_getValue(SHORTCUT_KEY,''));}catch{return '';}}
  function writeShortcut(value){const shortcut=normaliseShortcut(value);try{GM_setValue(SHORTCUT_KEY,shortcut);}catch{}return shortcut;}
  function eventShortcut(event){return [...(event.ctrlKey?['Ctrl']:[]),...(event.altKey?['Alt']:[]),...(event.shiftKey?['Shift']:[]),...(event.metaKey?['Meta']:[]),event.key.length===1?event.key.toUpperCase():event.key].join('+');}
  function editableTarget(target){return target?.matches?.('input,textarea,select,[contenteditable="true"]');}
  function shortcutBlocked(node,shortcut){const priority=Number(node?.dataset.launcherPriority||0),id=node?.dataset.launcherId||'';return [...document.querySelectorAll('[data-userscript-launcher="userscript-launcher-v1"]')].some(el=>{if(el===node)return false;let shortcuts=[];try{shortcuts=JSON.parse(el.dataset.launcherShortcuts||'[]');}catch{}const other=Number(el.dataset.launcherPriority||0);return shortcuts.includes(shortcut)&&(other>priority||(other===priority&&(el.dataset.launcherId||'').localeCompare(id)<0));});}
  function declareLauncher(node,controls,meta){
    node.dataset.userscriptLauncher=LAUNCHER_PROTOCOL;node.dataset.launcherOwner=meta.owner;node.dataset.launcherId=meta.id;node.dataset.launcherPriority=String(meta.priority);node.dataset.launcherPreferredPosition=meta.preferredPosition;
    let frame=0;const publish=()=>{frame=0;const rects=controls().filter(el=>el?.isConnected&&el.getClientRects().length).map(el=>el.getBoundingClientRect());if(!rects.length)return;const area={left:Math.round(Math.min(...rects.map(r=>r.left))),top:Math.round(Math.min(...rects.map(r=>r.top))),right:Math.round(Math.max(...rects.map(r=>r.right))),bottom:Math.round(Math.max(...rects.map(r=>r.bottom)))};node.dataset.launcherOccupiedArea=JSON.stringify(area);window.dispatchEvent(new CustomEvent('userscript-launcher:change',{detail:{protocol:LAUNCHER_PROTOCOL,owner:meta.owner,id:meta.id,priority:meta.priority,preferredPosition:meta.preferredPosition,occupiedArea:area}}));};
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(publish);};if(typeof ResizeObserver!=='undefined'){const observer=new ResizeObserver(schedule);for(const el of controls().filter(Boolean))observer.observe(el);}window.addEventListener('resize',schedule,{passive:true});const checkCollision=()=>{let own=[];try{own=JSON.parse(node.dataset.launcherShortcuts||'[]');}catch{}const collision=[...document.querySelectorAll('[data-userscript-launcher="userscript-launcher-v1"]')].some(el=>{if(el===node)return false;try{return JSON.parse(el.dataset.launcherShortcuts||'[]').some(value=>own.includes(value));}catch{return false;}});node.dataset.launcherShortcutCollision=String(collision);};window.addEventListener('userscript-launcher:change',checkCollision);queueMicrotask(checkCollision);return{publish:schedule};
  }
  const SettingsRail = {
    BTN_ID:
      "adpb-settings-fab",

    PANEL_ID:
      "adpb-settings-panel",

    LABEL_ID:
      "adpb-settings-label",

    STYLE_ID:
      "adpb-settings-rail-style",

    // Existing icon — intentionally unchanged.
    ICON:
      "data:image/png;base64,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",

    panel: null,
    button: null,
    label: null,
    enabledInput: null,
    statusNode: null,
    statsNode: null,
    footerStats: null,
    infoButton: null,
    infoPopover: null,
    infoPinned: false,
    descriptionId: 0,

    css() {
      return `
#${this.BTN_ID},
#${this.PANEL_ID},
#${this.PANEL_ID} *,
#${this.LABEL_ID} {
  box-sizing: border-box !important;
}

#${this.BTN_ID} {
  position: fixed !important;
  right: 12px !important;
  left: auto !important;
  z-index: 2147483646 !important;

  width: 48px !important;
  height: 48px !important;

  border-radius: 12px !important;
  border: 1px solid rgba(255,153,0,.45) !important;

  background: #131921 !important;
  background-image: none !important;

  color: #fff !important;

  box-shadow:
    0 4px 16px rgba(0,0,0,.38),
    0 0 0 1px rgba(255,153,0,.08) !important;

  cursor: grab !important;

  padding: 0 !important;
  margin: 0 !important;

  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;

  overflow: visible !important;

  touch-action: none !important;
  user-select: none !important;

  transition:
    background .15s ease,
    border-color .15s ease,
    box-shadow .15s ease,
    transform .15s ease !important;
}

#${this.BTN_ID}.adpb-dragging {
  cursor: grabbing !important;
}

#${this.BTN_ID}:hover {
  background: #232f3e !important;
  border-color: rgba(255,153,0,.8) !important;
}

#${this.BTN_ID}:focus-visible {
  outline: 2px solid #ff9900 !important;
  outline-offset: 3px !important;
}

#${this.BTN_ID}.adpb-open {
  box-shadow:
    0 4px 18px rgba(0,0,0,.42),
    0 0 0 2px rgba(255,153,0,.18) !important;
}

#${this.BTN_ID} img {
  width: 26px !important;
  height: 26px !important;
  object-fit: contain !important;
  pointer-events: none !important;
}

#${this.BTN_ID} .adpb-status-dot {
  position: absolute !important;
  right: -2px !important;
  bottom: -2px !important;

  width: 10px !important;
  height: 10px !important;

  border-radius: 50% !important;

  background: #32d583 !important;
  border: 2px solid #131921 !important;

  pointer-events: none !important;
}

#${this.LABEL_ID} {
  position: fixed !important;
  z-index: 2147483002 !important;
  display: none !important;
  max-width: min(240px, calc(100vw - 32px)) !important;
  min-height: 32px !important;
  padding: 7px 10px !important;
  border: 1px solid rgba(255,153,0,.42) !important;
  border-radius: 8px !important;
  background: #171a1f !important;
  color: #f5f5f5 !important;
  box-shadow: 0 8px 24px rgba(0,0,0,.4) !important;
  cursor: copy !important;
  font: 12px/1.25 "Amazon Ember", Arial, sans-serif !important;
  text-align: left !important;
  white-space: nowrap !important;
}

#${this.LABEL_ID}.adpb-label-visible {
  display: block !important;
}

#${this.LABEL_ID}:hover,
#${this.LABEL_ID}:focus-visible {
  border-color: #ff9900 !important;
  outline: 2px solid rgba(255,153,0,.32) !important;
  outline-offset: 2px !important;
}

#${this.BTN_ID}.adpb-high-contrast,
#${this.LABEL_ID}.adpb-high-contrast {
  border: 2px solid #fff !important;
}

#${this.LABEL_ID}.adpb-high-contrast {
  background: #000 !important;
  color: #fff !important;
}

#${this.BTN_ID}.adpb-disabled .adpb-status-dot {
  background: #777 !important;
}

#${this.PANEL_ID} {
  position: fixed !important;

  right: 12px !important;
  left: auto !important;
  bottom: auto !important;
  top: auto !important;

  z-index: 2147483001 !important;

  width: 280px !important;
  max-width: calc(100vw - 24px) !important;
  max-height: calc(100vh - 96px) !important;

  overflow-x: hidden !important;
  overflow-y: auto !important;

  background: #171a1f !important;
  color: #f5f5f5 !important;

  border: 1px solid rgba(255,255,255,.10) !important;
  border-radius: 14px !important;

  box-shadow:
    0 18px 50px rgba(0,0,0,.48),
    0 3px 12px rgba(0,0,0,.28) !important;

  padding: 12px !important;

  font:
    13px/1.4
    "Amazon Ember",
    Arial,
    sans-serif !important;

  display: none !important;

  scrollbar-width: thin !important;
  text-align: left !important;
}

#${this.PANEL_ID}.adpb-open {
  display: block !important;
}

#${this.PANEL_ID}::-webkit-scrollbar {
  width: 7px !important;
}

#${this.PANEL_ID}::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,.18) !important;
  border-radius: 10px !important;
}

#${this.PANEL_ID} .adpb-header {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: space-between !important;

  gap: 10px !important;

  margin-bottom: 8px !important;
}

#${this.PANEL_ID} .adpb-title {
  font-size: 15px !important;
  line-height: 1.2 !important;
  font-weight: 700 !important;

  color: #fff !important;

  margin: 0 !important;
}

#${this.PANEL_ID} .adpb-subtitle {
  margin-top: 2px !important;

  font-size: 11px !important;
  line-height: 1.35 !important;

  color: #9ca3af !important;
}

#${this.PANEL_ID} .adpb-close {
  flex: none !important;

  width: 28px !important;
  height: 28px !important;

  border: 0 !important;
  border-radius: 8px !important;

  background: transparent !important;
  color: #aeb4bc !important;

  cursor: pointer !important;

  font-size: 18px !important;
  line-height: 1 !important;

  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
}

#${this.PANEL_ID} .adpb-close:hover {
  background: rgba(255,255,255,.08) !important;
  color: #fff !important;
}

#${this.PANEL_ID} .adpb-status {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;

  padding: 7px 10px !important;
  margin-bottom: 8px !important;

  border-radius: 8px !important;

  background: rgba(50,213,131,.08) !important;
  border: 1px solid rgba(50,213,131,.15) !important;
}

#${this.PANEL_ID} .adpb-status-dot {
  width: 7px !important;
  height: 7px !important;

  flex: none !important;

  border-radius: 50% !important;

  background: #32d583 !important;
}

#${this.PANEL_ID} .adpb-status.disabled {
  background: rgba(255,255,255,.04) !important;
  border-color: rgba(255,255,255,.08) !important;
}

#${this.PANEL_ID} .adpb-status.disabled .adpb-status-dot {
  background: #777 !important;
}

#${this.PANEL_ID} .adpb-status-main {
  font-weight: 600 !important;
  color: #f5f5f5 !important;
}

#${this.PANEL_ID} .adpb-status-detail {
  margin-left: auto !important;
  color: #9ca3af !important;
  font-size: 11px !important;
}

#${this.PANEL_ID} .adpb-master {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;

  gap: 10px !important;

  padding: 9px 11px !important;
  margin-bottom: 8px !important;

  border: 1px solid rgba(255,153,0,.22) !important;
  border-radius: 10px !important;
  background: rgba(255,153,0,.08) !important;
}

#${this.PANEL_ID} .adpb-master-copy {
  min-width: 0 !important;
}

#${this.PANEL_ID} .adpb-master-title {
  font-size: 13px !important;
  font-weight: 700 !important;
  color: #fff !important;
}

#${this.PANEL_ID} .adpb-master-description {
  margin-top: 1px !important;
  color: #9299a3 !important;
  font-size: 11px !important;
}

#${this.PANEL_ID} .adpb-section {
  margin-top: 6px !important;

  border: 1px solid rgba(255,255,255,.08) !important;
  border-radius: 8px !important;
  background: rgba(255,255,255,.025) !important;
  overflow: hidden !important;
}

#${this.PANEL_ID} .adpb-section-toggle {
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  min-height: 32px !important;
  padding: 0 10px !important;
  border: 0 !important;
  background: transparent !important;
  color: #f2f3f5 !important;
  cursor: pointer !important;
  font: inherit !important;
  text-align: left !important;
}

#${this.PANEL_ID} .adpb-section-toggle:hover {
  background: rgba(255,255,255,.045) !important;
}

#${this.PANEL_ID} .adpb-section-toggle:focus-visible,
#${this.PANEL_ID} .adpb-action:focus-visible {
  outline: 2px solid rgba(255,153,0,.75) !important;
  outline-offset: -2px !important;
}

#${this.PANEL_ID} .adpb-section-title {
  flex: 1 1 auto !important;
  font-size: 12px !important;
  font-weight: 650 !important;
}

#${this.PANEL_ID} .adpb-section-count {
  margin-right: 10px !important;
  color: #828994 !important;
  font-size: 11px !important;
}

#${this.PANEL_ID} .adpb-section-chevron {
  color: #9ca3af !important;
  font-size: 16px !important;
  transition: transform .15s ease !important;
}

#${this.PANEL_ID} .adpb-section.is-open .adpb-section-chevron {
  transform: rotate(90deg) !important;
}

#${this.PANEL_ID} .adpb-section-content {
  display: none !important;
  padding: 0 10px 4px !important;
}


#${this.PANEL_ID} .adpb-section.is-open .adpb-section-content {
  display: block !important;
}

#${this.PANEL_ID} .adpb-submenu {
  margin-top: 6px !important;
  border: 1px solid rgba(255,255,255,.08) !important;
  border-radius: 8px !important;
  background: rgba(255,255,255,.03) !important;
  overflow: hidden !important;
}

#${this.PANEL_ID} .adpb-submenu-toggle {
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  min-height: 28px !important;
  padding: 0 8px !important;
  border: 0 !important;
  background: transparent !important;
  color: #e8eaed !important;
  cursor: pointer !important;
  font: inherit !important;
  text-align: left !important;
}

#${this.PANEL_ID} .adpb-submenu-toggle:hover {
  background: rgba(255,255,255,.045) !important;
}

#${this.PANEL_ID} .adpb-submenu-toggle:focus-visible {
  outline: 2px solid rgba(255,153,0,.75) !important;
  outline-offset: -2px !important;
}

#${this.PANEL_ID} .adpb-submenu-title {
  flex: 1 1 auto !important;
  font-size: 11px !important;
  font-weight: 650 !important;
}

#${this.PANEL_ID} .adpb-submenu-chevron {
  color: #9ca3af !important;
  font-size: 14px !important;
  transition: transform .15s ease !important;
}

#${this.PANEL_ID} .adpb-submenu.is-open .adpb-submenu-chevron {
  transform: rotate(90deg) !important;
}

#${this.PANEL_ID} .adpb-submenu-content {
  display: none !important;
  padding: 0 8px 6px !important;
}

#${this.PANEL_ID} .adpb-submenu.is-open .adpb-submenu-content {
  display: block !important;
}

#${this.PANEL_ID} .adpb-submenu .adpb-stats {
  margin-top: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
}

#${this.PANEL_ID} .adpb-submenu .adpb-stats-heading {
  margin-bottom: 4px !important;
}
#${this.PANEL_ID} .adpb-diagnostics { white-space:pre-wrap;overflow-wrap:anywhere;margin:0;padding:8px;background:#101216;color:#d8d8d8;border-radius:6px;font:11px/1.35 ui-monospace,monospace; }

#${this.PANEL_ID} .adpb-submenu .adpb-clear-stats {
  width: 100% !important;
  min-height: 26px !important;
  margin-top: 6px !important;
  padding: 0 8px !important;
  border: 1px solid rgba(255,255,255,.10) !important;
  border-radius: 8px !important;
  background: rgba(255,255,255,.04) !important;
  color: #d9dde2 !important;
  cursor: pointer !important;
  font: inherit !important;
  font-size: 11px !important;
}

#${this.PANEL_ID} .adpb-submenu .adpb-clear-stats:hover {
  background: rgba(255,255,255,.08) !important;
  color: #fff !important;
}

#${this.PANEL_ID} .adpb-setting {
  display: flex !important;
  align-items: center !important;

  width: 100% !important;

  gap: 8px !important;

  padding: 6px 0 !important;

  cursor: pointer !important;
}

#${this.PANEL_ID} .adpb-setting.is-extra {
  display: none !important;
}

#${this.PANEL_ID} .adpb-section.show-all .adpb-setting.is-extra {
  display: flex !important;
}

#${this.PANEL_ID} .adpb-setting-copy {
  flex: 1 1 auto !important;
  min-width: 0 !important;

  text-align: left !important;
}

#${this.PANEL_ID} .adpb-setting-name {
  display: block !important;

  color: #f2f3f5 !important;

  font-size: 12.5px !important;
  line-height: 1.25 !important;
}

#${this.PANEL_ID} .adpb-setting-description {
  display: block !important;

  margin-top: 1px !important;

  color: #828994 !important;

  font-size: 10px !important;
  line-height: 1.3 !important;
}

#${this.PANEL_ID} .adpb-switch-input {
  position: absolute !important;

  width: 1px !important;
  height: 1px !important;

  opacity: 0 !important;
  pointer-events: none !important;
}

#${this.PANEL_ID} .adpb-toggle {
  position: relative !important;

  flex: none !important;

  width: 38px !important;
  height: 21px !important;

  border-radius: 999px !important;

  background: #454b53 !important;

  cursor: pointer !important;

  transition:
    background .15s ease,
    box-shadow .15s ease !important;
}

#${this.PANEL_ID} .adpb-toggle::after {
  content: "" !important;

  position: absolute !important;

  left: 2px !important;
  top: 2px !important;

  width: 17px !important;
  height: 17px !important;

  border-radius: 50% !important;

  background: #d9dde2 !important;

  box-shadow:
    0 1px 3px rgba(0,0,0,.35) !important;

  transition:
    transform .15s ease !important;
}

#${this.PANEL_ID} .adpb-switch-input:checked + .adpb-toggle {
  background: #ff9900 !important;
}

#${this.PANEL_ID} .adpb-switch-input:checked + .adpb-toggle::after {
  transform: translateX(17px) !important;
  background: #fff !important;
}

#${this.PANEL_ID} .adpb-switch-input:focus-visible + .adpb-toggle {
  box-shadow:
    0 0 0 2px rgba(255,153,0,.35) !important;
}

#${this.PANEL_ID} .adpb-master .adpb-toggle {
  width: 46px !important;
  height: 25px !important;
  background: #565d66 !important;
}

#${this.PANEL_ID} .adpb-master .adpb-toggle::after {
  width: 21px !important;
  height: 21px !important;
}

#${this.PANEL_ID} .adpb-master .adpb-switch-input:checked + .adpb-toggle::after {
  transform: translateX(21px) !important;
}

#${this.PANEL_ID}.adpb-high-contrast {
  background: #000 !important;
  color: #fff !important;
  border: 2px solid #fff !important;
}

#${this.PANEL_ID}.adpb-high-contrast .adpb-toggle {
  border: 2px solid #fff !important;
}

#${this.PANEL_ID}.adpb-high-contrast .adpb-switch-input:checked + .adpb-toggle {
  background: #ffb000 !important;
}

#${this.PANEL_ID} .adpb-preferences {
  margin-top: 0 !important;
  padding-top: 0 !important;
  border-top: 0 !important;
}

#${this.PANEL_ID} .adpb-preferences-title {
  display: none !important;
}

#${this.PANEL_ID} .adpb-preferences input[type="text"] {
  width: 100% !important;
  min-height: 30px !important;
  margin-top: 6px !important;
  padding: 5px 8px !important;
  border: 1px solid rgba(255,255,255,.22) !important;
  border-radius: 7px !important;
  background: #171c27 !important;
  color: #fff !important;
}

@media (prefers-reduced-motion: reduce) {
  #${this.BTN_ID},
  #${this.PANEL_ID},
  #${this.PANEL_ID} *,
  #${this.LABEL_ID} {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
}

#${this.PANEL_ID} .adpb-show-more {
  width: 100% !important;
  min-height: 26px !important;
  margin: 1px 0 2px !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  color: #ffb347 !important;
  cursor: pointer !important;
  font: inherit !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  text-align: left !important;
}

#${this.PANEL_ID} .adpb-show-more:hover,
#${this.PANEL_ID} .adpb-show-more:focus-visible {
  color: #ffd08a !important;
}

#${this.PANEL_ID} .adpb-show-more:focus-visible {
  outline: 2px solid rgba(255,153,0,.75) !important;
  outline-offset: 2px !important;
}

#${this.PANEL_ID} .adpb-stats {
  margin-top: 0 !important;

  padding: 0 !important;

  border-radius: 9px !important;

  background: rgba(255,255,255,.045) !important;
  border: 1px solid rgba(255,255,255,.07) !important;
}

#${this.PANEL_ID} .adpb-stats-heading {
  display: flex !important;
  justify-content: space-between !important;
  align-items: baseline !important;

  margin-bottom: 4px !important;
}

#${this.PANEL_ID} .adpb-stats-title {
  font-weight: 700 !important;
  color: #fff !important;
}

#${this.PANEL_ID} .adpb-stats-total {
  font-weight: 700 !important;
  color: #ff9900 !important;
}

#${this.PANEL_ID} .adpb-stat-row {
  display: flex !important;
  justify-content: space-between !important;

  padding: 2px 0 !important;

  color: #a9afb7 !important;
  font-size: 11px !important;
}

#${this.PANEL_ID} .adpb-stat-value {
  color: #e5e7eb !important;
}

#${this.PANEL_ID} .adpb-actions {
  display: flex !important;
  gap: 6px !important;

  margin-top: 10px !important;
}

#${this.PANEL_ID} .adpb-action {
  flex: 1 1 0 !important;

  min-height: 28px !important;

  border-radius: 8px !important;

  border: 1px solid rgba(255,255,255,.10) !important;

  background: rgba(255,255,255,.04) !important;
  color: #d9dde2 !important;

  cursor: pointer !important;

  font: inherit !important;
  font-size: 11px !important;
  padding: 0 10px !important;
  text-align: left !important;
}

#${this.PANEL_ID} .adpb-action:hover {
  background: rgba(255,255,255,.08) !important;
  color: #fff !important;
}

#${this.PANEL_ID} .adpb-foot {
  margin-top: 13px !important;
  padding-top: 11px !important;

  border-top: 1px solid rgba(255,255,255,.07) !important;

  color: #666d77 !important;

  font-size: 10px !important;
  line-height: 1.4 !important;

  text-align: left !important;
}
`;
    },

    menuCss() {
      return `
        :host{font:13px/1.4 system-ui,sans-serif;color-scheme:dark}
        #${this.BTN_ID},#${this.PANEL_ID},#${this.LABEL_ID}{pointer-events:auto!important}
        #${this.BTN_ID}{right:16px!important;border-radius:13px!important;border:1px solid #ffffff33!important;background:#121722!important;box-shadow:0 5px 18px #0006!important}
        #${this.BTN_ID} img{display:block!important;width:40px!important;height:40px!important;max-width:40px!important;max-height:40px!important;object-fit:contain!important;pointer-events:none!important}
        #${this.PANEL_ID}{width:min(280px,calc(100vw - 32px))!important;max-height:calc(100dvh - 24px)!important;padding:0!important;background:#282826!important;color:#ddd!important;font:13px/1.4 system-ui,sans-serif!important;border:1px solid #ffffff22!important;box-shadow:0 16px 40px #0007!important}
        #${this.PANEL_ID} .adpb-header{padding:14px 18px 10px!important;margin:0!important}
        #${this.PANEL_ID} .adpb-title{font-size:15px!important;color:#ddd!important}
        #${this.PANEL_ID} .adpb-subtitle{font-size:12px!important;color:#bbb!important}
        #${this.PANEL_ID} :is(.adpb-master,.adpb-preferences,.adpb-section,.adpb-stats,.adpb-actions){padding:9px 18px!important;margin:0!important;border:0!important;border-top:1px solid #ffffff14!important;border-radius:0!important;background:transparent!important}
        #${this.PANEL_ID} .adpb-status{margin:0!important;padding:9px 18px!important;background:transparent!important;border:0!important;border-top:1px solid #ffffff14!important;border-radius:0!important;flex-wrap:wrap!important}
        #${this.PANEL_ID} :is(.adpb-section-title,.adpb-preferences-title,.adpb-stats-title){font:700 10px/1.4 system-ui,sans-serif!important;letter-spacing:.08em!important;color:#aaa!important;text-transform:uppercase!important}
        #${this.PANEL_ID} .adpb-setting{display:flex!important;justify-content:space-between!important;align-items:center!important;gap:12px!important;min-height:34px!important;padding:7px 0!important;background:transparent!important}
        #${this.PANEL_ID} .adpb-setting.is-extra{display:none!important}
        #${this.PANEL_ID} .show-all .adpb-setting.is-extra{display:flex!important}
        #${this.PANEL_ID} :is(.adpb-setting-name,.adpb-master-title){font:13px/1.4 system-ui,sans-serif!important;color:#ddd!important}
        #${this.PANEL_ID} :is(.adpb-setting-description,.adpb-master-description,.adpb-status-detail,.adpb-stat-row,.adpb-foot){color:#bbb!important;font:12px/1.4 system-ui,sans-serif!important}
        #${this.PANEL_ID} .adpb-toggle{display:none!important}
        #${this.PANEL_ID} .adpb-switch-input{all:initial!important;box-sizing:border-box!important;position:relative!important;display:block!important;flex:0 0 36px!important;width:36px!important;height:20px!important;padding:0!important;border:1px solid #ffffff33!important;border-radius:999px!important;background:#596171!important;cursor:pointer!important}
        #${this.PANEL_ID} .adpb-switch-input::after{content:'';position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;transition:transform .15s}
        #${this.PANEL_ID} .adpb-switch-input[aria-checked=true]{background:linear-gradient(90deg,#e66aa1,#67cfff,#a185f5)!important}
        #${this.PANEL_ID} .adpb-switch-input[aria-checked=true]::after{transform:translateX(16px)}
        #${this.PANEL_ID} :is(.adpb-action,.adpb-show-more,.adpb-close){border:1px solid #ffffff22!important;background:#1c2230!important;color:#ddd!important;border-radius:8px!important;padding:5px 8px!important;font:12px/1.4 system-ui,sans-serif!important}
        #${this.PANEL_ID} .adpb-section-toggle{background:transparent!important;color:#ddd!important}
        #${this.PANEL_ID} .adpb-foot{padding:8px 18px 12px!important;margin:0!important;font-size:10px!important}
        #${this.PANEL_ID} button:focus-visible,#${this.BTN_ID}:focus-visible{outline:2px solid #82dcff!important;outline-offset:3px!important}
        #${this.PANEL_ID}.adpb-high-contrast{background:#000!important;color:#fff!important;border:2px solid #fff!important}
        #${this.PANEL_ID}.adpb-high-contrast .adpb-switch-input{border-color:white!important;background:black!important}
        #${this.PANEL_ID}.adpb-high-contrast .adpb-switch-input[aria-checked=true]{background:white!important}
        #${this.PANEL_ID}.adpb-high-contrast .adpb-switch-input[aria-checked=true]::after{background:black}
        #${this.PANEL_ID}{overflow:hidden!important;box-sizing:border-box!important}
        #${this.PANEL_ID}.adpb-open{display:flex!important;flex-direction:column!important}
        #${this.PANEL_ID}>*{flex-shrink:0!important}
        #${this.PANEL_ID} .adpb-header{position:relative!important;z-index:1!important}
        #${this.PANEL_ID} .adpb-close{flex-shrink:0!important}
        #${this.PANEL_ID}>.adpb-section{padding:4px 18px!important}
        #${this.PANEL_ID}>.adpb-section.is-open{display:flex!important;flex-direction:column!important;flex-shrink:1!important;min-height:0!important}
        #${this.PANEL_ID} .adpb-section-toggle{flex-shrink:0!important}
        #${this.PANEL_ID} .adpb-section-content{min-height:0!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important;scrollbar-width:thin!important;scrollbar-gutter:stable!important}
        #${this.PANEL_ID} .adpb-category-picker{display:none!important;margin:8px 18px!important;min-height:36px!important;background:#1c2230!important;color:#ddd!important;border:1px solid #ffffff33!important;border-radius:6px!important;font:inherit!important}
        #${this.PANEL_ID}.adpb-short .adpb-category-picker{display:block!important}
        #${this.PANEL_ID}.adpb-short :is(.adpb-status,.adpb-foot,.adpb-subtitle,.adpb-master-description),
        #${this.PANEL_ID}.adpb-short>.adpb-section:not(.is-open),
        #${this.PANEL_ID}.adpb-short>.adpb-section>.adpb-section-toggle{display:none!important}
        #${this.PANEL_ID}.adpb-sheet{border-radius:18px 18px 0 0!important;padding-bottom:env(safe-area-inset-bottom,0px)!important}
        #${this.PANEL_ID}.adpb-sheet .adpb-header{padding-top:22px!important}
        #${this.PANEL_ID}.adpb-sheet .adpb-header::before{content:'';position:absolute;top:8px;left:calc(50% - 18px);width:36px;height:4px;border-radius:4px;background:#999}
        #${this.PANEL_ID}.adpb-sheet :is(.adpb-section-toggle,.adpb-submenu-toggle,.adpb-close,.adpb-action,.adpb-clear-stats){min-height:44px!important}
        #${this.PANEL_ID}.adpb-sheet .adpb-close{min-width:44px!important}
        #${this.PANEL_ID}.adpb-sheet .adpb-setting{min-height:44px!important}
        #${this.PANEL_ID}.adpb-sheet.adpb-open~:is(#${this.BTN_ID},#${this.LABEL_ID}){visibility:hidden!important}
        #${this.PANEL_ID}.adpb-sheet :is(.adpb-status,.adpb-foot,.adpb-subtitle,.adpb-master-description){display:none!important}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important;animation:none!important}}
        @media(forced-colors:active){#${this.PANEL_ID} .adpb-switch-input{forced-color-adjust:none!important;border-color:ButtonText!important;background:Canvas!important}#${this.PANEL_ID} .adpb-switch-input::after{background:ButtonText}#${this.PANEL_ID} .adpb-switch-input[aria-checked=true]{background:Highlight!important}#${this.PANEL_ID} .adpb-switch-input[aria-checked=true]::after{background:HighlightText}}
      `;
    },

    menuVisualCss() {
      return `
        #${this.PANEL_ID} .adpb-tabs{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:3px!important;margin:4px 0!important;flex-shrink:0!important}
        #${this.PANEL_ID} .adpb-tab{min-width:0!important;min-height:30px!important;padding:3px 2px!important;background:#2b2b29!important;border:1px solid #74746f!important;border-radius:6px!important;color:#ddd!important;font:700 11px/1.2 Arial,sans-serif!important;cursor:pointer!important}
        #${this.PANEL_ID} .adpb-tab[aria-selected=true]{background:#35454b!important;border-color:#9acde0!important;color:#fff!important}
        #${this.PANEL_ID}>.adpb-section>.adpb-section-toggle{display:none!important}
        #${this.PANEL_ID}>.adpb-section:not(.is-open){display:none!important}
        #${this.PANEL_ID}>.adpb-section.is-open{margin-top:0!important;padding-top:3px!important}
        #${this.PANEL_ID}.adpb-sheet .adpb-tab{min-height:40px!important}
        #${this.PANEL_ID}.adpb-short .adpb-tabs{display:none!important}
        @media(pointer:coarse){#${this.PANEL_ID} .adpb-tab{min-height:44px!important}}

        #${this.PANEL_ID} .adpb-setting-copy{display:flex!important;align-items:center!important;gap:4px!important}
        #${this.PANEL_ID} .adpb-setting-name{flex:0 1 auto!important;min-width:0!important}
        #${this.PANEL_ID} .adpb-setting-description[hidden]{display:none!important}
        #${this.PANEL_ID} .adpb-info{position:relative!important;flex:0 0 18px!important;width:18px!important;height:24px!important;padding:0!important;border:0!important;border-radius:4px!important;background:transparent!important;color:#bcbcb4!important;font:700 10px/1 Arial,sans-serif!important;cursor:pointer!important}
        #${this.PANEL_ID} .adpb-info::before{content:"";position:absolute;left:2px;top:5px;width:14px;height:14px;border:1px solid currentColor;border-radius:50%;box-sizing:border-box}
        #${this.PANEL_ID} .adpb-info:hover,#${this.PANEL_ID} .adpb-info[aria-expanded=true]{background:#41413b!important;color:#fff!important}
        #${this.PANEL_ID} .adpb-info-popover{position:fixed!important;z-index:2147483647!important;width:max-content!important;padding:8px 10px!important;border:1px solid #92928a!important;border-radius:7px!important;background:#171715!important;color:#f5f5ee!important;box-shadow:0 4px 16px #0008!important;font:12px/1.45 Arial,sans-serif!important;overflow:auto!important;overflow-wrap:anywhere!important;text-align:left!important}
        #${this.PANEL_ID} .adpb-info-popover[hidden]{display:none!important}
        #${this.PANEL_ID}.adpb-high-contrast :is(.adpb-info,.adpb-info-popover){background:#000!important;color:#fff!important;border-color:#fff!important}
        @media(pointer:coarse){#${this.PANEL_ID} .adpb-info{flex-basis:28px!important;width:28px!important;height:44px!important}#${this.PANEL_ID} .adpb-info::before{left:7px;top:15px}}
        #${this.PANEL_ID}{padding:4px!important;background:#242423!important;border-color:#777773!important;border-radius:16px!important;font:12px/1.4 Arial,sans-serif!important}
        #${this.PANEL_ID} .adpb-header{gap:5px!important;align-items:center!important;padding:0 2px 2px!important}
        #${this.PANEL_ID} .adpb-header-icon{width:36px!important;height:36px!important;flex:0 0 36px!important;object-fit:contain!important;border-radius:8px!important}
        #${this.PANEL_ID} .adpb-header-copy{flex:1!important;min-width:0!important}
        #${this.PANEL_ID} .adpb-title{font:700 15px/1.3 Arial,sans-serif!important;color:#f3f3f1!important}
        #${this.PANEL_ID} .adpb-subtitle{font:11px/1.4 Arial,sans-serif!important;margin-top:0!important;color:#c9c9c5!important}
        #${this.PANEL_ID} .adpb-close{width:32px!important;height:32px!important;padding:0!important;border:0!important;background:transparent!important;font:22px/1 Arial,sans-serif!important;align-self:flex-start!important}
        #${this.PANEL_ID} .adpb-close:hover{background:#393936!important}
        #${this.PANEL_ID} .adpb-status{padding:2px 4px!important;border-top:0!important;font-size:11px!important}
        #${this.PANEL_ID} .adpb-status-detail{font-size:11px!important}
        #${this.PANEL_ID} .adpb-master{padding:3px 5px!important;margin-bottom:0!important;border:1px solid #656560!important;border-radius:9px!important;background:#2b2b29!important}
        #${this.PANEL_ID} .adpb-master-description{display:none!important}
        #${this.PANEL_ID}>.adpb-section{padding:0!important;margin:2px 0 0!important;border:1px solid #74746f!important;border-radius:9px!important;background:#2b2b29!important}
        #${this.PANEL_ID} .adpb-section-toggle{min-height:26px!important;padding:2px 5px!important}
        #${this.PANEL_ID} .adpb-section-title{font:700 12px/1.4 Arial,sans-serif!important;color:#eee!important;text-transform:none!important;letter-spacing:0!important}
        #${this.PANEL_ID} .adpb-section-count{color:#b9b9b2!important;font-size:10px!important}
        #${this.PANEL_ID} .adpb-section.is-open>.adpb-section-toggle{border-bottom:1px solid #5e5e58!important}
        #${this.PANEL_ID} .adpb-section-content{padding:0 5px 2px!important;scrollbar-color:#b5cbd5 #2b2b29!important}
        #${this.PANEL_ID} .adpb-setting{gap:5px!important;min-height:26px!important;padding:1px 0!important}
        #${this.PANEL_ID} .adpb-setting+.adpb-setting{border-top:1px solid #ffffff18!important}
        #${this.PANEL_ID} .adpb-setting-name{font:12px/1.4 Arial,sans-serif!important;color:#eee!important}
        #${this.PANEL_ID} .adpb-setting-description{font:11px/1.4 Arial,sans-serif!important;color:#c5c5bf!important}
        #${this.PANEL_ID} .adpb-switch-input[aria-checked=true]{background:#9acde0!important}
        #${this.PANEL_ID} .adpb-switch-input[aria-checked=true]::after{background:#202c32!important}
        #${this.PANEL_ID} .adpb-actions{padding:3px 0 0!important;border:0!important}
        #${this.PANEL_ID} :is(.adpb-action,.adpb-show-more,.adpb-clear-stats){background:#2b2b29!important;border:1px solid #74746f!important;border-radius:7px!important;color:#eee!important}
        #${this.PANEL_ID} .adpb-foot{padding:2px 2px 0!important;font:10px/1.4 Arial,sans-serif!important;color:#c5c5bf!important}
        #${this.PANEL_ID} .adpb-foot{display:block!important;border-top:1px solid #ffffff22!important;margin-top:3px!important}
        #${this.PANEL_ID} .adpb-footer-stats{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:4px!important;margin-top:1px!important}
        #${this.PANEL_ID} .adpb-footer-stat-value{display:inline!important;margin-right:4px!important;font:700 12px/1.3 Arial,sans-serif!important;color:#eee!important;font-variant-numeric:tabular-nums!important}
        #${this.PANEL_ID}:is(.adpb-sheet,.adpb-short) .adpb-foot{display:block!important}
        #${this.PANEL_ID}:is(.adpb-sheet,.adpb-short) .adpb-subtitle{display:block!important}
        #${this.PANEL_ID}.adpb-short .adpb-footer-caption{display:none!important}
        #${this.PANEL_ID}.adpb-short .adpb-footer-stat-value{display:inline!important;margin-right:4px!important;font-size:12px!important}
        #${this.PANEL_ID} .adpb-submenu{border-color:#62625d!important;background:transparent!important}
        #${this.PANEL_ID} .adpb-submenu-toggle{min-height:26px!important}
        #${this.PANEL_ID} :is(input[type=text],.adpb-category-picker){box-sizing:border-box!important;max-width:100%!important;background:#222!important;color:#eee!important;border:1px solid #777!important;border-radius:6px!important;padding:3px!important;font:12px/1.4 Arial,sans-serif!important}
        #${this.PANEL_ID}.adpb-high-contrast :is(.adpb-section,.adpb-master,.adpb-submenu,.adpb-action){background:#000!important;border-color:#fff!important}
        #${this.PANEL_ID}.adpb-high-contrast .adpb-switch-input[aria-checked=true]{background:white!important}
        #${this.PANEL_ID}.adpb-high-contrast .adpb-switch-input[aria-checked=true]::after{background:black!important}
        #${this.PANEL_ID} .adpb-submenu{margin-top:0!important;border:0!important;border-radius:0!important}
        #${this.PANEL_ID} .adpb-submenu+.adpb-submenu{border-top:1px solid #ffffff22!important}
        #${this.PANEL_ID} .adpb-submenu-toggle{padding:2px 0!important}
        #${this.PANEL_ID} .adpb-submenu-content{padding:0 0 2px!important}
        #${this.PANEL_ID} .adpb-submenu :is(.adpb-preferences,.adpb-stats){padding:0!important}
        #${this.PANEL_ID} .adpb-master-copy{flex:1!important;min-width:0!important}
        #${this.PANEL_ID} .adpb-master .adpb-status{display:flex!important;gap:5px!important;padding:0!important;border:0!important}
        #${this.PANEL_ID} .adpb-master .adpb-status-detail{margin-left:auto!important;font-size:11px!important}
        #${this.PANEL_ID} .adpb-foot,
        #${this.PANEL_ID}:is(.adpb-sheet,.adpb-short) .adpb-foot{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:4px!important;padding:2px 2px 0!important}
        #${this.PANEL_ID} .adpb-footer-caption,
        #${this.PANEL_ID}.adpb-short .adpb-footer-caption{display:block!important;flex-shrink:0!important}
        #${this.PANEL_ID} .adpb-footer-stats{display:flex!important;align-items:center!important;gap:5px!important;margin:0!important}
        #${this.PANEL_ID} .adpb-footer-stats>div{white-space:nowrap!important}
        #${this.PANEL_ID} .adpb-footer-stats>div::before{content:"·";margin-right:5px}
        #${this.PANEL_ID} .adpb-footer-stat-value{font-size:11px!important;margin-right:2px!important}
        #${this.PANEL_ID} :is(.adpb-action,.adpb-show-more,.adpb-clear-stats){min-height:26px!important;padding:2px 5px!important;margin-top:2px!important}
        #${this.PANEL_ID} .adpb-category-picker{margin:3px 0!important;min-height:28px!important}
        #${this.PANEL_ID}.adpb-sheet .adpb-header{padding-top:14px!important}
        #${this.PANEL_ID}.adpb-sheet .adpb-header::before{top:4px!important}
        #${this.PANEL_ID}.adpb-sheet :is(.adpb-section-toggle,.adpb-submenu-toggle,.adpb-close,.adpb-action,.adpb-clear-stats){min-height:32px!important}
        #${this.PANEL_ID}.adpb-sheet .adpb-close{min-width:32px!important}
        #${this.PANEL_ID}.adpb-sheet .adpb-setting{min-height:26px!important}
        @media(pointer:coarse){#${this.PANEL_ID} :is(.adpb-section-toggle,.adpb-submenu-toggle,.adpb-close,.adpb-action,.adpb-clear-stats,.adpb-show-more,.adpb-setting){min-height:44px!important}}
        @media(forced-colors:active){#${this.PANEL_ID} .adpb-switch-input[aria-checked=true]{background:Highlight!important}#${this.PANEL_ID} .adpb-switch-input[aria-checked=true]::after{background:HighlightText!important}}
      `;
    },

    ensureStyle() {
      const sheet=new CSSStyleSheet();sheet.replaceSync(this.css()+this.menuCss()+this.menuVisualCss());
      this.shadow.adoptedStyleSheets=[sheet];
    },

    makeSwitch(name) {
      const input=document.createElement('button');input.type='button';input.setAttribute('role','switch');input.setAttribute('aria-label',name);
      Object.defineProperty(input,'checked',{get(){return this.getAttribute('aria-checked')==='true';},set(value){this.setAttribute('aria-checked',String(Boolean(value)));}});
      input.addEventListener('click',()=>{input.checked=!input.checked;input.dispatchEvent(new Event('change',{bubbles:true}));});
      return input;
    },

    hideInfo() {
      clearTimeout(this.infoHideTimer);
      if (this.infoButton) this.infoButton.setAttribute("aria-expanded", "false");
      if (this.infoPopover) this.infoPopover.hidden = true;
      this.infoButton = null;
      this.infoPinned = false;
    },

    showInfo(button, text) {
      if (this.infoButton !== button) this.hideInfo();
      if (!this.infoPopover) {
        this.infoPopover = document.createElement("div");
        this.infoPopover.className = "adpb-info-popover";
        this.infoPopover.setAttribute("role", "tooltip");
        this.infoPopover.addEventListener("pointerenter", () => clearTimeout(this.infoHideTimer));
        this.infoPopover.addEventListener("pointerleave", () => {
          if (!this.infoPinned && this.shadow.activeElement !== this.infoButton) this.hideInfo();
        });
        this.panel.appendChild(this.infoPopover);
      }
      this.infoButton = button;
      clearTimeout(this.infoHideTimer);
      this.infoPopover.textContent = text;
      this.infoPopover.hidden = false;
      button.setAttribute("aria-expanded", "true");
      const viewport = window.visualViewport;
      const x = viewport?.offsetLeft || 0;
      const y = viewport?.offsetTop || 0;
      const width = viewport?.width || window.innerWidth;
      const height = viewport?.height || window.innerHeight;
      const tip = this.infoPopover;
      tip.style.maxWidth = Math.min(240, width - 16) + "px";
      tip.style.maxHeight = Math.max(40, height - 16) + "px";
      const anchor = button.getBoundingClientRect();
      const rect = tip.getBoundingClientRect();
      tip.style.left = Math.max(x + 8, Math.min(anchor.right - rect.width, x + width - rect.width - 8)) + "px";
      const top = anchor.top - rect.height - 6 >= y + 8 ? anchor.top - rect.height - 6 : anchor.bottom + 6;
      tip.style.top = Math.max(y + 8, Math.min(top, y + height - rect.height - 8)) + "px";
    },

    createSwitch(
      setting,
      onChange,
    ) {
      const label =
        document.createElement("div");

      label.className =
        "adpb-setting";

      const copy =
        document.createElement("span");

      copy.className =
        "adpb-setting-copy";

      const name =
        document.createElement("span");

      name.className =
        "adpb-setting-name";

      name.textContent =
        setting.displayName.replace(/^Remove /, "").replace(/^./, letter => letter.toUpperCase());

      const description =
        document.createElement("span");

      description.className =
        "adpb-setting-description";

      description.textContent =
        setting.description;
      description.id = `adpb-description-${++this.descriptionId}`;
      description.hidden = true;

      copy.appendChild(name);
      copy.appendChild(description);

      const input =
        this.makeSwitch(setting.displayName);
      input.setAttribute("aria-describedby", description.id);
      const info = document.createElement("button");
      info.type = "button";
      info.className = "adpb-info";
      info.textContent = "i";
      info.setAttribute("aria-label", `About ${setting.displayName}`);
      info.setAttribute("aria-describedby", description.id);
      info.setAttribute("aria-expanded", "false");
      info.addEventListener("pointerenter", event => {
        if (event.pointerType === "mouse") this.showInfo(info, setting.description);
      });
      info.addEventListener("pointerleave", () => {
        if (this.infoButton === info && !this.infoPinned && this.shadow.activeElement !== info) {
          this.infoHideTimer = setTimeout(() => this.hideInfo(), 180);
        }
      });
      info.addEventListener("focus", () => this.showInfo(info, setting.description));
      info.addEventListener("blur", () => { if (this.infoButton === info) this.hideInfo(); });
      info.addEventListener("click", event => {
        event.stopPropagation();
        if (this.infoButton === info && this.infoPinned) this.hideInfo();
        else {
          this.showInfo(info, setting.description);
          this.infoPinned = true;
        }
      });

      input.className =
        "adpb-switch-input";

      input.checked =
        !!setting.value;

      input.setAttribute(
        "role",
        "switch",
      );

      input.setAttribute(
        "aria-checked",
        input.checked
          ? "true"
          : "false",
      );

      const toggle =
        document.createElement("span");

      toggle.className =
        "adpb-toggle";

      toggle.setAttribute(
        "aria-hidden",
        "true",
      );

      input.addEventListener(
        "change",
        () => {
          setting.value =
            !!input.checked;

          input.setAttribute(
            "aria-checked",
            input.checked
              ? "true"
              : "false",
          );

          onChange();
        },
      );

      copy.appendChild(info);
      label.appendChild(copy);
      label.appendChild(input);
      label.appendChild(toggle);

      return {
        label,
        input,
      };
    },

    buildPanel() {
      const panel =
        document.createElement("div");

      panel.id =
        this.PANEL_ID;

      panel.setAttribute(
        "role",
        "dialog",
      );

      panel.setAttribute(
        "aria-label",
        "Amazon Dark Pattern Blocker settings",
      );

      const header =
        document.createElement("div");

      header.className =
        "adpb-header";

      const titleBlock =
        document.createElement("div");
      titleBlock.className = "adpb-header-copy";
      const headerIcon = document.createElement("img");
      headerIcon.className = "adpb-header-icon";
      headerIcon.src = this.ICON;
      headerIcon.alt = "";

      const title =
        document.createElement("div");

      title.className =
        "adpb-title";

      title.textContent =
        "Dark Pattern Blocker";

      const subtitle =
        document.createElement("div");

      subtitle.className =
        "adpb-subtitle";

      subtitle.textContent =
        "Hide ads, upsells & pressure tactics.";

      titleBlock.appendChild(title);
      titleBlock.appendChild(subtitle);

      const close =
        document.createElement("button");

      close.type = "button";
      close.className =
        "adpb-close";

      close.textContent = "×";

      close.setAttribute(
        "aria-label",
        "Close settings",
      );

      close.addEventListener(
        "click",
        () => this.close(),
      );

      header.appendChild(headerIcon);
      header.appendChild(titleBlock);
      header.appendChild(close);

      panel.appendChild(header);

      const status =
        document.createElement("div");

      status.className =
        "adpb-status";

      const statusDot =
        document.createElement("span");

      statusDot.className =
        "adpb-status-dot";

      const statusMain =
        document.createElement("span");

      statusMain.className =
        "adpb-status-main";

      const statusDetail =
        document.createElement("span");

      statusDetail.className =
        "adpb-status-detail";

      status.appendChild(statusDot);
      status.appendChild(statusMain);
      status.appendChild(statusDetail);

      this.statusNode = {
        container: status,
        main: statusMain,
        detail: statusDetail,
      };


      const master =
        document.createElement("div");

      master.className =
        "adpb-master";

      const masterCopy =
        document.createElement("div");

      masterCopy.className =
        "adpb-master-copy";

      masterCopy.appendChild(status);

      const masterInput =
        this.makeSwitch("Protection");

      masterInput.className =
        "adpb-switch-input";

      masterInput.checked =
        MasterSetting.value;

      masterInput.setAttribute(
        "role",
        "switch",
      );

      masterInput.setAttribute(
        "aria-checked",
        masterInput.checked
          ? "true"
          : "false",
      );

      const masterToggle =
        document.createElement("span");

      masterToggle.className =
        "adpb-toggle";

      masterToggle.setAttribute(
        "aria-hidden",
        "true",
      );

      masterInput.addEventListener(
        "change",
        () => {
          MasterSetting.value =
            !!masterInput.checked;

          masterInput.setAttribute(
            "aria-checked",
            masterInput.checked
              ? "true"
              : "false",
          );

          this.refreshInputs();
          applySettingsLive();
        },
      );

      master.appendChild(masterCopy);
      master.appendChild(masterInput);
      master.appendChild(masterToggle);

      this.enabledInput =
        masterInput;

      panel.appendChild(master);

      const categoryPicker = document.createElement("select");
      categoryPicker.className = "adpb-category-picker";
      categoryPicker.setAttribute("aria-label", "Settings category");
      categoryPicker.addEventListener("change", () => {
        const section = panel.querySelector(`[data-category="${categoryPicker.value}"]`);
        if (section && !section.classList.contains("is-open")) {
          section.querySelector(".adpb-section-toggle").click();
        }
      });
      panel.appendChild(categoryPicker);

      for (const category of SETTING_CATEGORIES) {
        const section =
          document.createElement("section");

        section.className =
          "adpb-section";
        section.dataset.category = category.id;

        if (category === SETTING_CATEGORIES[0]) {
          section.classList.add("is-open");
        }

        const categorySettings =
          Object.entries(Settings).filter(
            ([, setting]) =>
              setting.category === category.id,
          );

        const heading =
          document.createElement("button");

        heading.type = "button";
        heading.className =
          "adpb-section-toggle";

        heading.setAttribute(
          "aria-expanded",
          section.classList.contains("is-open")
            ? "true"
            : "false",
        );

        const headingTitle =
          document.createElement("span");

        headingTitle.className =
          "adpb-section-title";

        headingTitle.textContent =
          category.title;

        const headingCount =
          document.createElement("span");

        headingCount.className =
          "adpb-section-count";

        const nestedMenuCount =
          category.id === "advanced" ? 4 : 0;

        headingCount.textContent =
          String(
            categorySettings.length + nestedMenuCount,
          );

        const chevron =
          document.createElement("span");

        chevron.className =
          "adpb-section-chevron";

        chevron.setAttribute(
          "aria-hidden",
          "true",
        );

        chevron.textContent = "›";

        heading.appendChild(headingTitle);
        heading.appendChild(headingCount);
        heading.appendChild(chevron);

        const content =
          document.createElement("div");

        content.className =
          "adpb-section-content";

        heading.addEventListener(
          "click",
          () => {
            const open =
              !section.classList.contains(
                "is-open",
              );

            panel
              .querySelectorAll(":scope > .adpb-section")
              .forEach((item) => {
                item.classList.remove("is-open");

                const toggle =
                  item.querySelector(
                    ":scope > .adpb-section-toggle",
                  );

                if (toggle) {
                  toggle.setAttribute(
                    "aria-expanded",
                    "false",
                  );
                }
              });

            if (open) {
              categoryPicker.value = category.id;
              section.classList.add("is-open");

              heading.setAttribute(
                "aria-expanded",
                "true",
              );
            }
          },
        );

        section.appendChild(heading);
        section.appendChild(content);

        categorySettings.forEach(([
          key,
          setting,
        ], index) => {
          const result =
            this.createSwitch(
              setting,
              () => {
                applySettingsLive();
                this.refreshInputs();
              },
            );

          result.label.dataset.setting =
            key;

          if (categorySettings.length > 6 && index >= 5) {
            result.label.classList.add(
              "is-extra",
            );
          }

          content.appendChild(
            result.label,
          );
        });

        if (categorySettings.length > 6) {
          const showMore =
            document.createElement("button");

          showMore.type = "button";
          showMore.className =
            "adpb-show-more";

          showMore.textContent =
            `Show ${categorySettings.length - 5} more`;

          showMore.setAttribute(
            "aria-expanded",
            "false",
          );

          showMore.addEventListener(
            "click",
            () => {
              const expanded =
                section.classList.toggle("show-all");

              showMore.textContent = expanded
                ? "Show fewer"
                : `Show ${categorySettings.length - 5} more`;

              showMore.setAttribute(
                "aria-expanded",
                expanded ? "true" : "false",
              );
            },
          );

          content.appendChild(showMore);
        }

        if (category.id === "advanced") {
          const makeSubmenu = (
            title,
          ) => {
            const submenu =
              document.createElement("div");

            submenu.className =
              "adpb-submenu";

            const toggle =
              document.createElement("button");

            toggle.type = "button";
            toggle.className =
              "adpb-submenu-toggle";
            toggle.setAttribute(
              "aria-expanded",
              "false",
            );

            const titleNode =
              document.createElement("span");

            titleNode.className =
              "adpb-submenu-title";
            titleNode.textContent =
              title;

            const chevronNode =
              document.createElement("span");

            chevronNode.className =
              "adpb-submenu-chevron";
            chevronNode.setAttribute(
              "aria-hidden",
              "true",
            );
            chevronNode.textContent =
              "›";

            toggle.appendChild(titleNode);
            toggle.appendChild(chevronNode);

            const body =
              document.createElement("div");

            body.className =
              "adpb-submenu-content";

            toggle.addEventListener(
              "click",
              (event) => {
                event.stopPropagation();

                const open =
                  !submenu.classList.contains(
                    "is-open",
                  );

                content
                  .querySelectorAll(".adpb-submenu")
                  .forEach((item) => {
                    item.classList.remove("is-open");

                    const itemToggle =
                      item.querySelector(
                        ".adpb-submenu-toggle",
                      );

                    if (itemToggle) {
                      itemToggle.setAttribute(
                        "aria-expanded",
                        "false",
                      );
                    }
                  });

                if (open) {
                  submenu.classList.add("is-open");
                  toggle.setAttribute(
                    "aria-expanded",
                    "true",
                  );
                }
              },
            );

            submenu.appendChild(toggle);
            submenu.appendChild(body);

            return {
              root: submenu,
              body,
            };
          };

          const displayMenu =
            makeSubmenu("Display");

          const preferences =
            document.createElement("div");

          preferences.className =
            "adpb-preferences";

          const preferencesTitle =
            document.createElement("div");

          preferencesTitle.className =
            "adpb-preferences-title";

          preferencesTitle.textContent =
            "Display";

          preferences.appendChild(
            preferencesTitle,
          );

          const contrastSwitch =
            this.createSwitch(
              UiSettings.highContrast,
              () => this.updateAppearance(),
            );

          contrastSwitch.label.dataset.setting =
            "highContrast";

          preferences.appendChild(
            contrastSwitch.label,
          );

          const updateSwitch =
            this.createSwitch(
              UiSettings.updateNotifications,
              () => this.checkForUpdate(),
            );

          updateSwitch.label.dataset.setting =
            "updateNotifications";

          preferences.appendChild(
            updateSwitch.label,
          );

          displayMenu.body.appendChild(
            preferences,
          );

          content.appendChild(
            displayMenu.root,
          );

          const shortcutMenu = makeSubmenu("Keyboard shortcut");
          const shortcutLabel = document.createElement("label");
          shortcutLabel.className = "adpb-preferences";
          shortcutLabel.textContent = "Open menu shortcut";
          const shortcutInput = document.createElement("input");
          shortcutInput.type = "text";
          shortcutInput.placeholder = "Off";
          shortcutInput.setAttribute("aria-label", "Open menu shortcut");
          shortcutInput.value = readShortcut();
          shortcutInput.addEventListener("change", () => {
            shortcutInput.value = writeShortcut(shortcutInput.value);
            if (this.host) this.host.dataset.launcherShortcuts = JSON.stringify(shortcutInput.value ? [shortcutInput.value] : []);
            const collision = [...document.querySelectorAll('[data-userscript-launcher="userscript-launcher-v1"]')].some((el) => { if (el === this.host) return false; try { return JSON.parse(el.dataset.launcherShortcuts || '[]').includes(shortcutInput.value); } catch { return false; } });
            if(this.statusNode?.detail)this.statusNode.detail.textContent=collision ? "Shortcut is also used by another installed script." : "Shortcut saved.";
          });
          shortcutLabel.appendChild(shortcutInput);
          const disableShortcut = document.createElement("button");disableShortcut.type="button";disableShortcut.className="adpb-clear-stats";disableShortcut.textContent="Disable shortcut";disableShortcut.addEventListener("click",()=>{shortcutInput.value=writeShortcut("");if(this.host)this.host.dataset.launcherShortcuts="[]";if(this.statusNode?.detail)this.statusNode.detail.textContent="Keyboard shortcut disabled.";});shortcutLabel.appendChild(disableShortcut);
          shortcutMenu.body.appendChild(shortcutLabel);
          content.appendChild(shortcutMenu.root);

          const statsMenu =
            makeSubmenu(
              "Blocked this session",
            );

          const stats =
            document.createElement("div");

          stats.className =
            "adpb-stats";

          const statsHeading =
            document.createElement("div");

          statsHeading.className =
            "adpb-stats-heading";

          const statsTitle =
            document.createElement("span");

          statsTitle.className =
            "adpb-stats-title";

          statsTitle.textContent =
            "Total";

          const statsTotal =
            document.createElement("span");

          statsTotal.className =
            "adpb-stats-total";

          statsHeading.appendChild(
            statsTitle,
          );

          statsHeading.appendChild(
            statsTotal,
          );

          stats.appendChild(
            statsHeading,
          );

          const statRows = {};

          const statLabels = {
            promotions: "Promotions",
            advertising: "Advertising",
            services: "Services",
            ai: "Amazon AI",
            convenience: "Convenience",
            advanced: "Advanced",
          };

          Object.entries(
            statLabels,
          ).forEach(([key, label]) => {
            const row =
              document.createElement("div");

            row.className =
              "adpb-stat-row";

            const labelNode =
              document.createElement("span");

            labelNode.textContent =
              label;

            const valueNode =
              document.createElement("span");

            valueNode.className =
              "adpb-stat-value";

            valueNode.textContent =
              "0";

            row.appendChild(labelNode);
            row.appendChild(valueNode);

            stats.appendChild(row);

            statRows[key] =
              valueNode;
          });

          this.statsNode = {
            total: statsTotal,
            rows: statRows,
          };

          statsMenu.body.appendChild(
            stats,
          );

          const clearStatsButton =
            document.createElement("button");

          clearStatsButton.type =
            "button";

          clearStatsButton.className =
            "adpb-clear-stats";

          clearStatsButton.textContent =
            "Clear stats";

          clearStatsButton.addEventListener(
            "click",
            (event) => {
              event.stopPropagation();
              Stats.reset();
            },
          );

          statsMenu.body.appendChild(
            clearStatsButton,
          );

          content.appendChild(
            statsMenu.root,
          );

          const diagnosticsMenu = makeSubmenu("About & diagnostics");
          const diagnosticsOutput = document.createElement("pre");
          diagnosticsOutput.className = "adpb-diagnostics";
          diagnosticsOutput.textContent = diagnosticsText();
          this.diagnosticsNode = diagnosticsOutput;
          diagnosticsMenu.body.appendChild(diagnosticsOutput);
          const copyDiagnostics = document.createElement("button");
          copyDiagnostics.type = "button";
          copyDiagnostics.className = "adpb-clear-stats";
          copyDiagnostics.textContent = "Copy diagnostics";
          copyDiagnostics.addEventListener("click", async (event) => {
            event.stopPropagation();
            const text = diagnosticsText();
            try { await navigator.clipboard.writeText(text); } catch (error) { window.prompt("Copy diagnostics", text); }
          });
          diagnosticsMenu.body.appendChild(copyDiagnostics);
          content.appendChild(diagnosticsMenu.root);
        }

        if (
          categorySettings.length > 0 ||
          category.id === "advanced"
        ) {
          panel.appendChild(section);
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.title;
          categoryPicker.appendChild(option);
        }
      }

      const actions =
        document.createElement("div");

      actions.className =
        "adpb-actions";

      const resetButton =
        document.createElement("button");

      resetButton.type =
        "button";

      resetButton.className =
        "adpb-action";

      resetButton.textContent =
        "Reset recommended";

      resetButton.addEventListener(
        "click",
        () => {
          this.resetRecommended();
        },
      );

      const revealButton = document.createElement("button");
      revealButton.type = "button";
      revealButton.className = "adpb-action adpb-reveal";
      revealButton.textContent = "Show hidden items";
      revealButton.setAttribute("aria-pressed", "false");
      revealButton.title = "Temporarily reveal hidden items dimmed. Hover or focus to see full contrast.";
      revealButton.addEventListener("click", () => Reveal.toggle());
      actions.append(revealButton, resetButton);

      panel.appendChild(actions);

      const foot =
        document.createElement("div");

      foot.className =
        "adpb-foot";

      const footerCaption = document.createElement("div");
      footerCaption.className = "adpb-footer-caption";
      footerCaption.textContent = "Session";
      const footerStats = document.createElement("div");
      footerStats.className = "adpb-footer-stats";
      foot.setAttribute("aria-label", "This session activity");
      this.footerStats = {};
      for (const [key, label] of [["hidden", "hidden"], ["advertising", "ads"], ["promotions", "promos"]]) {
        const metric = document.createElement("div");
        const value = document.createElement("span");
        value.className = "adpb-footer-stat-value";
        value.dataset.metric = key;
        value.textContent = "0";
        metric.append(value, document.createTextNode(label));
        footerStats.appendChild(metric);
        this.footerStats[key] = value;
      }
      foot.append(footerCaption, footerStats);

      panel.appendChild(foot);

      const tabs = document.createElement("div");
      tabs.className = "adpb-tabs";
      tabs.setAttribute("role", "tablist");
      tabs.setAttribute("aria-label", "Protection categories");
      const sections = [...panel.querySelectorAll(":scope > .adpb-section")];
      const tabNames = {promotions:"Promotions",advertising:"Ads",services:"Services",ai:"AI",convenience:"Convenience",advanced:"Advanced"};
      const tabButtons = [];
      const syncTabs = () => sections.forEach((section, index) => {
        const selected = section.classList.contains("is-open");
        tabButtons[index].setAttribute("aria-selected", String(selected));
        tabButtons[index].tabIndex = selected ? 0 : -1;
      });
      sections.forEach((section, index) => {
        const tab = document.createElement("button");
        tab.type = "button";
        tab.className = "adpb-tab";
        tab.textContent = tabNames[section.dataset.category] || section.dataset.category;
        tab.id = "adpb-tab-" + index;
        section.id = "adpb-tabpanel-" + index;
        section.setAttribute("role", "tabpanel");
        section.setAttribute("aria-labelledby", tab.id);
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-controls", section.id);
        const oldHeading = section.querySelector(".adpb-section-toggle");
        oldHeading.addEventListener("click", syncTabs);
        tab.addEventListener("click", () => {
          this.hideInfo();
          if (!section.classList.contains("is-open")) oldHeading.click();
          syncTabs();
        });
        tab.addEventListener("keydown", event => {
          const step = {ArrowRight:1,ArrowLeft:-1,ArrowDown:3,ArrowUp:-3}[event.key];
          if (step === undefined && event.key !== "Home" && event.key !== "End") return;
          event.preventDefault();
          const next = event.key === "Home" ? 0 : event.key === "End" ? sections.length-1 : (index+step+sections.length)%sections.length;
          tabButtons[next].click();
          tabButtons[next].focus();
        });
        tabButtons.push(tab);
        tabs.appendChild(tab);
      });
      panel.insertBefore(tabs, sections[0]);
      syncTabs();
      return panel;
    },

    resetRecommended() {
      MasterSetting.value =
        true;

      Object.entries(Settings).forEach(
        ([key, setting]) => {
          setting.value =
            SETTINGS_CONFIG[key].default;
        },
      );

      Stats.reset();

      this.refreshInputs();

      applySettingsLive();
    },

    refreshInputs() {
      if (this.enabledInput) {
        this.enabledInput.checked =
          MasterSetting.value;

        this.enabledInput.setAttribute(
          "aria-checked",
          MasterSetting.value
            ? "true"
            : "false",
        );
      }

      if (!this.panel) return;

      Object.entries(Settings).forEach(
        ([key, setting]) => {
          const input =
            this.panel.querySelector(
              `[data-setting="${key}"] [role="switch"]`,
            );

          if (!input) return;

          input.checked =
            setting.value;

          input.setAttribute(
            "aria-checked",
            setting.value
              ? "true"
              : "false",
          );
        },
      );

      this.updateDiagnostics();
      this.updateStatus();
    },

    updateDiagnostics() {
      if (this.diagnosticsNode) this.diagnosticsNode.textContent = diagnosticsText();
    },

    updateStatus() {
      if (!this.statusNode) {
        return;
      }

      const enabled =
        MasterSetting.value;

      const count =
        Stats.enabledCount();

      const total =
        Stats.totalSettings();

      this.statusNode.main.textContent =
        enabled
          ? "Protection active"
          : "Protection disabled";

      this.statusNode.detail.textContent =
        enabled
          ? `${count}/${total}`
          : "All protections off";

      this.statusNode.container.classList.toggle(
        "disabled",
        !enabled,
      );

      if (this.button) {
        this.button.classList.toggle(
          "adpb-disabled",
          !enabled,
        );
      }
    },

    updateStats() {
      if (this.footerStats) {
        this.footerStats.hidden.textContent = String(Stats.actions.hidden);
        this.footerStats.advertising.textContent = String(Stats.categories.advertising);
        this.footerStats.promotions.textContent = String(Stats.categories.promotions);
      }
      if (!this.statsNode) {
        return;
      }

      this.statsNode.total.textContent =
        String(Stats.total);

      Object.entries(
        this.statsNode.rows,
      ).forEach(([key, node]) => {
        node.textContent =
          String(
            Stats.categories[key] || 0,
          );
      });
    },

    close() {
      this.hideInfo();
      if (!this.panel) return;

      this.panel.classList.remove(
        "adpb-open",
      );

      if (this.button) {
        this.button.classList.remove(
          "adpb-open",
        );

        this.button.setAttribute(
          "aria-expanded",
          "false",
        );
      }
    },

    toggle() {
      if (!this.panel) return;

      const open =
        this.panel.classList.toggle(
          "adpb-open",
        );

      if (this.button) {
        this.button.classList.toggle(
          "adpb-open",
          open,
        );

        this.button.setAttribute(
          "aria-expanded",
          open
            ? "true"
            : "false",
        );
      }

      if (open) {
        this.placePanel();
        this.panel.querySelector('button').focus({preventScroll:true});
      } else {
        this.button.focus({preventScroll:true});
      }
    },

    updateAppearance() {
      const highContrast =
        UiSettings.highContrast.value || matchMedia('(prefers-contrast: more)').matches;

      if (this.panel) {
        this.panel.classList.toggle(
          "adpb-high-contrast",
          highContrast,
        );
      }

      if (this.button) {
        this.button.classList.toggle(
          "adpb-high-contrast",
          highContrast,
        );
      }

      if (this.label) {
        this.label.classList.toggle(
          "adpb-high-contrast",
          highContrast,
        );
      }
    },

    isNewerVersion(latest, current) {
      const a = String(latest).split(".").map(Number);
      const b = String(current).split(".").map(Number);
      if (a.some(Number.isNaN) || b.some(Number.isNaN)) return false;
      for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
        const difference = (a[i] || 0) - (b[i] || 0);
        if (difference) return difference > 0;
      }
      return false;
    },

    async checkForUpdate() {
      if (!this.host || !this.button) return;
      if (!UiSettings.updateNotifications.value) {
        this.host.removeAttribute("data-update-available");
        this.button.title = "Dark Pattern Blocker settings";
        return;
      }
      const key = "adpb-update-check";
      const show = (latest) => {
        this.host.removeAttribute("data-update-available");
        this.button.title = "Dark Pattern Blocker settings";
        if (!this.isNewerVersion(latest, VERSION)) return;
        this.host.dataset.updateAvailable = latest;
        this.button.title = `Dark Pattern Blocker ${latest} is available`;
        if (this.statusNode) this.statusNode.textContent = `Update available: ${latest}`;
      };
      try {
        const cached = JSON.parse(localStorage.getItem(key) || "null");
        if (cached && Date.now() - cached.checked < 86400000) {
          show(cached.latest);
          return;
        }
        const response = await fetch("https://api.github.com/repos/ExtraPotions/velvet-crane-orbit/releases/latest", { headers: { Accept: "application/vnd.github+json" } });
        if (!response.ok) return;
        const data = await response.json();
        const latest = String(data.tag_name || "").replace(/^v/, "");
        localStorage.setItem(key, JSON.stringify({ checked: Date.now(), latest }));
        show(latest);
      } catch (_err) {}
    },

    mount() {
      if (!document.body) {
        return false;
      }

      if (this.host?.isConnected) {
        return true;
      }

      this.host=document.createElement('div');this.host.id='adpb-ui-root';this.host.dataset.expdareDockRoot='primary';
      this.host.style.cssText='all:initial!important;position:fixed!important;inset:0!important;z-index:2147483647!important;pointer-events:none!important';
      this.shadow=this.host.attachShadow({mode:'open'});
      this.ensureStyle();

      const panel =
        this.buildPanel();

      const button =
        document.createElement("button");

      button.id =
        this.BTN_ID;

      button.type =
        "button";
      button.dataset.expdareControl='primary';
      button.setAttribute('aria-controls',this.PANEL_ID);
      this.launcherDeclaration=declareLauncher(this.host,()=>[button,panel],{owner:'expDARE',id:'amazon-dark-pattern-blocker',priority:100,preferredPosition:'right-bottom'});
      this.host.dataset.launcherShortcuts=JSON.stringify(readShortcut()?[readShortcut()]:[]);
      if(!this.shortcutBound){this.shortcutBound=true;document.addEventListener('keydown',(event)=>{const shortcut=readShortcut();if(shortcut&&!editableTarget(event.target)&&eventShortcut(event)===shortcut&&!shortcutBlocked(this.host,shortcut)){event.preventDefault();this.toggle();}});}

      button.title =
        "Dark Pattern Blocker settings";

      button.setAttribute(
        "aria-label",
        "Dark Pattern Blocker settings",
      );

      button.setAttribute(
        "aria-expanded",
        "false",
      );

      const img =
        document.createElement("img");

      // Existing icon unchanged.
      img.src =
        this.ICON;

      img.alt = "";

      img.width = 26;
      img.height = 26;

      button.appendChild(img);

      const statusDot =
        document.createElement("span");

      statusDot.className =
        "adpb-status-dot";

      statusDot.setAttribute(
        "aria-hidden",
        "true",
      );

      button.appendChild(
        statusDot,
      );

      const identityLabel =
        document.createElement("button");

      identityLabel.type = "button";
      identityLabel.id = this.LABEL_ID;
      identityLabel.className =
        "adpb-label";
      identityLabel.textContent =
        "Amazon Dark Pattern Blocker";
      identityLabel.setAttribute(
        "aria-label",
        "Copy Amazon Dark Pattern Blocker identity",
      );
      identityLabel.title =
        "Copy identity name";

      this.panel = panel;
      this.button = button;
      this.label = identityLabel;

      try {
        ControlRegistry.claimPrimary(button);
        window.__expdarePrimaryControl = button;
      } catch (e) {}

      const clampTop = (y) => {
        const max =
          Math.max(
            8,
            (window.innerHeight || 600) -
              56,
          );

        return Math.min(
          max,
          Math.max(8, y),
        );
      };

      const findClearTop = (requestedTop) => {
        const viewportHeight =
          window.innerHeight || 600;

        const maxTop =
          Math.max(
            8,
            viewportHeight - 56,
          );

        const preferred =
          Math.min(
            maxTop,
            Math.max(8, requestedTop),
          );

        const viewportWidth =
          window.innerWidth || 1024;

        const fabLeft =
          viewportWidth - 12 - 48;

        const fabRight =
          viewportWidth - 12;

        const blockers = [];

        document
          .querySelectorAll('[data-adpb-pushed="true"]')
          .forEach((node) => {
            node.style.removeProperty("translate");
            delete node.dataset.adpbPushed;
          });

        const registeredControls = (ControlRegistry.controls || [])
          .filter((entry) =>
            entry &&
            entry.element &&
            entry.element.isConnected !== false &&
            entry.role !== "primary" &&
            entry.owner === "expDARE",
          )
          .map((entry) => entry.element);

        registeredControls.forEach((node) => {
            if (
              node === button ||
              node.dataset.expdareOwner ===
                "expDARE" ||
              node.closest(
                "#adpb-settings-fab, #adpb-settings-panel",
              )
            ) {
              return;
            }

            const style =
              window.getComputedStyle(node);

            if (
              style.position !== "fixed" &&
              style.position !== "sticky"
            ) {
              return;
            }

            const rect =
              node.getBoundingClientRect();

            if (
              rect.width < 8 ||
              rect.height < 8 ||
              rect.bottom <= 0 ||
              rect.top >= viewportHeight ||
              rect.right < fabLeft - 10 ||
              rect.left > fabRight + 10
            ) {
              return;
            }

            blockers.push(rect);
          });

        const isBlocked = (top) =>
          blockers.some(
            (rect) =>
              top < rect.bottom + 10 &&
              top + 48 > rect.top - 10,
          );

        const isDenseCorner = (top) => {
          const nearTop =
            top < 96;
          const nearBottom =
            top > maxTop - 64;

          if (!nearTop && !nearBottom) {
            return false;
          }

          return (
            blockers.filter((rect) => {
              const distance =
                nearTop
                  ? rect.top
                  : viewportHeight - rect.bottom;

              return (
                distance >= -8 &&
                distance < 128
              );
            }).length >= 2
          );
        };

        const isSafeSlot = (top) =>
          !isBlocked(top) &&
          !isDenseCorner(top);

        if (isSafeSlot(preferred)) {
          return preferred;
        }

        const candidates = [
          8,
          maxTop,
          maxTop / 2,
          maxTop / 3,
          (maxTop * 2) / 3,
          preferred,
        ];

        blockers.forEach((rect) => {
          candidates.push(
            rect.top - 48 - 10,
            rect.bottom + 10,
          );
        });

        candidates
          .map((top) =>
            Math.min(
              maxTop,
              Math.max(8, top),
            ),
          )
          .sort(
            (a, b) =>
              Math.abs(a - preferred) -
              Math.abs(b - preferred),
          );

        for (const candidate of candidates) {
          const top =
            Math.min(
              maxTop,
              Math.max(8, candidate),
            );

          if (isSafeSlot(top)) {
            return top;
          }
        }

        return preferred;
      };

      const positionLabel = () => {
        if (
          !identityLabel.classList.contains(
            "adpb-label-visible",
          )
        ) {
          return;
        }

        const buttonRect =
          button.getBoundingClientRect();

        identityLabel.style.setProperty(
          "left",
          "8px",
          "important",
        );
        identityLabel.style.setProperty(
          "top",
          "8px",
          "important",
        );

        const labelRect =
          identityLabel.getBoundingClientRect();

        const viewportWidth =
          window.innerWidth || 1024;
        const viewportHeight =
          window.innerHeight || 600;
        const gap = 8;
        const candidates = [
          {
            left:
              buttonRect.left -
              labelRect.width -
              gap,
            top:
              buttonRect.top +
              (buttonRect.height -
                labelRect.height) /
                2,
          },
          {
            left:
              buttonRect.right + gap,
            top:
              buttonRect.top +
              (buttonRect.height -
                labelRect.height) /
                2,
          },
          {
            left: buttonRect.left,
            top:
              buttonRect.bottom + gap,
          },
          {
            left: buttonRect.left,
            top:
              buttonRect.top -
              labelRect.height -
              gap,
          },
        ];

        const companionRects=[...document.querySelectorAll('[data-expdare-control="secondary"],#pfh-fab,.pfh-fab')].map(el=>el.getBoundingClientRect());
        const fits = (candidate) =>
          !companionRects.some(r=>candidate.left<r.right+8&&candidate.left+labelRect.width>r.left-8&&candidate.top<r.bottom+8&&candidate.top+labelRect.height>r.top-8) &&
          candidate.left >= 8 &&
          candidate.top >= 8 &&
          candidate.left +
            labelRect.width <=
            viewportWidth - 8 &&
          candidate.top +
            labelRect.height <=
            viewportHeight - 8;

        const chosen =
          candidates.map(candidate=>({...candidate,left:Math.max(8,Math.min(viewportWidth-labelRect.width-8,candidate.left))})).find(fits) || {
            left: Math.max(
              8,
              Math.min(
                viewportWidth -
                  labelRect.width -
                  8,
                buttonRect.left -
                  labelRect.width -
                  gap,
              ),
            ),
            top: Math.max(
              8,
              Math.min(
                viewportHeight -
                  labelRect.height -
                  8,
                buttonRect.top,
              ),
            ),
          };

        identityLabel.style.setProperty(
          "left",
          chosen.left + "px",
          "important",
        );
        identityLabel.style.setProperty(
          "top",
          chosen.top + "px",
          "important",
        );
      };

      const pushRelatedControls = () => {
        const registered=(ControlRegistry.controls||[]).filter(entry=>entry.owner==='expDARE'&&entry.role!=='primary').map(entry=>entry.element).filter(Boolean);
        coordinateExpdareControls(button,registered);
      };

      const controlIdentity = (node) => ({
        id: node.id || "",
        ariaLabel:
          node.getAttribute("aria-label") || "",
        title: node.getAttribute("title") || "",
        text: (node.textContent || "")
          .trim()
          .replace(/s+/g, " ")
          .slice(0, 80),
      });

      const findSavedDockRect = (saved) => {
        if (!saved) return null;

        const viewportWidth =
          window.innerWidth || 1024;
        const viewportHeight =
          window.innerHeight || 600;

        const match = Array.from(
          document.querySelectorAll(
            'button, [role="button"], input[type="button"], input[type="submit"], a[role="button"]',
          ),
        ).find((node) => {
          if (
            node === button ||
            node.dataset.expdareOwner ===
              "expDARE" ||
            node.closest(
              "#adpb-settings-fab, #adpb-settings-panel, #adpb-settings-label",
            )
          ) {
            return false;
          }

          const style =
            window.getComputedStyle(node);

          if (
            style.position !== "fixed" &&
            style.position !== "sticky"
          ) {
            return false;
          }

          const rect =
            node.getBoundingClientRect();

          if (
            rect.width < 8 ||
            rect.height < 8 ||
            rect.right < viewportWidth - 140 ||
            rect.bottom <= 0 ||
            rect.top >= viewportHeight
          ) {
            return false;
          }

          const identity =
            controlIdentity(node);

          if (saved.id) {
            return identity.id === saved.id;
          }

          return (
            (!saved.ariaLabel ||
              identity.ariaLabel === saved.ariaLabel) &&
            (!saved.title ||
              identity.title === saved.title) &&
            (!saved.text || identity.text === saved.text)
          );
        });

        return match
          ? match.getBoundingClientRect()
          : null;
      };

      const applyFabTop = (
        topPx,
        avoidButtons = false,
      ) => {
        button.style.setProperty(
          "right",
          "12px",
          "important",
        );

        button.style.setProperty(
          "left",
          "auto",
          "important",
        );

        button.style.setProperty(
          "bottom",
          "auto",
          "important",
        );

        button.style.setProperty(
          "top",
          (avoidButtons
            ? findClearTop(topPx)
            : clampTop(topPx)) + "px",
          "important",
        );

        pushRelatedControls();
        positionLabel();
      };

      const loadFabTop = () => {
        let saved = null;
        let dockTarget = null;

        try {
          saved =
            GM_getValue(
              "adpb-fabTop",
              null,
            );
          dockTarget =
            GM_getValue(
              "adpb-dockTarget",
              null,
            );
        } catch (e) {}

        const dockRect =
          findSavedDockRect(dockTarget);

        if (dockRect) {
          return clampTop(
            dockRect.top +
              (dockRect.height - 48) / 2,
          );
        }

        if (
          typeof saved ===
            "number" &&
          isFinite(saved)
        ) {
          return clampTop(saved);
        }

        return clampTop(
          (window.innerHeight || 600) -
            64,
        );
      };

      this.placePanel = () => {
        if (!panel.classList.contains("adpb-open")) return;
        const viewport = window.visualViewport;
        const width = viewport ? viewport.width : window.innerWidth;
        const height = viewport ? viewport.height : window.innerHeight;
        const left = viewport ? viewport.offsetLeft : 0;
        const topEdge = viewport ? viewport.offsetTop : 0;
        const sheet = width <= 600;
        const short = height < 560;
        panel.classList.toggle("adpb-sheet", sheet);
        panel.classList.toggle("adpb-short", short);
        if (short && !panel.querySelector(".adpb-section.is-open")) {
          const first = panel.querySelector(".adpb-section");
          first.classList.add("is-open");
          first.querySelector(".adpb-section-toggle").setAttribute("aria-expanded", "true");
          panel.querySelector(".adpb-category-picker").value = first.dataset.category;
        }
        const set = (name, value) => panel.style.setProperty(name, value, "important");
        const available = Math.max(0, height - (sheet ? 8 : 24));
        set("max-height", available + "px");
        set("width", (sheet ? Math.min(280, width) : Math.min(280, width - 24)) + "px");
        set("max-width", (sheet ? width : width - 24) + "px");
        set("right", "auto");
        set("bottom", "auto");
        const br = button.getBoundingClientRect();
        const ph = panel.getBoundingClientRect().height;
        const pw = panel.getBoundingClientRect().width;
        const above = br.top - topEdge - 8;
        const below = topEdge + height - br.bottom - 8;
        const side = above >= below ? "above" : "below";
        let top = sheet ? topEdge + height - ph :
          Math.max(topEdge + 12, Math.min(
            side === "above" ? br.top - ph - 8 : br.bottom + 8,
            topEdge + height - ph - 12));
        let x = sheet ? left + (width - pw) / 2 : left + width - pw - 12;
        // A growing panel can use the full viewport; leave the launcher reachable.
        if (!sheet && top < br.bottom + 8 && top + ph > br.top - 8) {
          x = Math.max(left + 12, Math.min(x, br.left - pw - 8));
        }
        set("left", x + "px");
        set("top", top + "px");
        panel.dataset.placement = sheet ? "sheet" : side;
        this.launcherDeclaration?.publish();
      };

      applyFabTop(
        loadFabTop(),
      );

      let labelHideTimer = null;

      const showLabel = () => {
        if (labelHideTimer) {
          window.clearTimeout(labelHideTimer);
          labelHideTimer = null;
        }

        identityLabel.classList.add(
          "adpb-label-visible",
        );

        positionLabel();
      };

      const scheduleHideLabel = () => {
        if (labelHideTimer) {
          window.clearTimeout(labelHideTimer);
        }

        labelHideTimer = window.setTimeout(
          () => {
            if (
              this.shadow.activeElement ===
                button ||
              this.shadow.activeElement ===
                identityLabel
            ) {
              return;
            }

            identityLabel.classList.remove(
              "adpb-label-visible",
            );
          },
          140,
        );
      };

      const copyIdentity = async () => {
        const identity =
          identityLabel.dataset.identity ||
          "Amazon Dark Pattern Blocker";

        try {
          if (
            navigator.clipboard &&
            navigator.clipboard.writeText
          ) {
            await navigator.clipboard.writeText(
              identity,
            );
          } else {
            throw new Error(
              "Clipboard API unavailable",
            );
          }
        } catch (error) {
          const helper =
            document.createElement("textarea");

          helper.value = identity;
          helper.setAttribute(
            "readonly",
            "true",
          );
          helper.style.position = "fixed";
          helper.style.opacity = "0";
          document.body.appendChild(helper);
          helper.select();

          try {
            document.execCommand("copy");
          } catch (fallbackError) {}

          helper.remove();
        }

        identityLabel.textContent = "Copied!";

        window.setTimeout(() => {
          identityLabel.textContent = identity;
        }, 1200);
      };

      identityLabel.dataset.identity =
        identityLabel.textContent;

      button.addEventListener(
        "pointerenter",
        showLabel,
      );
      button.addEventListener(
        "pointerleave",
        scheduleHideLabel,
      );
      button.addEventListener(
        "focus",
        showLabel,
      );
      button.addEventListener(
        "blur",
        scheduleHideLabel,
      );
      identityLabel.addEventListener(
        "pointerenter",
        showLabel,
      );
      identityLabel.addEventListener(
        "pointerleave",
        scheduleHideLabel,
      );
      identityLabel.addEventListener(
        "focus",
        showLabel,
      );
      identityLabel.addEventListener(
        "blur",
        scheduleHideLabel,
      );
      identityLabel.addEventListener(
        "click",
        copyIdentity,
      );

      const drag = {
        active: false,
        moved: false,
        startY: 0,
        origTop: 0,
        pointerId: null,
      };

      button.addEventListener(
        "pointerdown",
        (event) => {
          if (
            event.button != null &&
            event.button !== 0
          ) {
            return;
          }

          drag.active = true;
          drag.moved = false;
          drag.startY =
            event.clientY;

          drag.origTop =
            button.getBoundingClientRect()
              .top;

          drag.pointerId =
            event.pointerId;

          try {
            button.setPointerCapture(
              event.pointerId,
            );
          } catch (e) {}
        },
      );

      button.addEventListener(
        "pointermove",
        (event) => {
          if (!drag.active) {
            return;
          }

          const dy =
            event.clientY -
            drag.startY;

          if (
            !drag.moved &&
            Math.abs(dy) < 5
          ) {
            return;
          }

          drag.moved = true;

          button.classList.add(
            "adpb-dragging",
          );

          applyFabTop(
            drag.origTop + dy,
          );

          if (
            panel.classList.contains(
              "adpb-open",
            )
          ) {
            this.placePanel();
          }
        },
      );

      const endDrag = () => {
        if (!drag.active) {
          return;
        }

        drag.active = false;

        button.classList.remove(
          "adpb-dragging",
        );

        try {
          if (
            drag.pointerId != null
          ) {
            button.releasePointerCapture(
              drag.pointerId,
            );
          }
        } catch (e) {}

        if (drag.moved) {
          try {
            const buttonRect =
              button.getBoundingClientRect();
            const viewportWidth =
              window.innerWidth || 1024;
            const buttonCenter =
              buttonRect.top +
              buttonRect.height / 2;

            const dockCandidate =
              Array.from(
                document.querySelectorAll(
                  'button, [role="button"], input[type="button"], input[type="submit"], a[role="button"]',
                ),
              )
                .filter((node) => {
                  if (
                    node === button ||
                    node.dataset.expdareOwner ===
                      "expDARE" ||
                    node.closest(
                      "#adpb-settings-fab, #adpb-settings-panel, #adpb-settings-label",
                    )
                  ) {
                    return false;
                  }

                  const style =
                    window.getComputedStyle(node);

                  if (
                    style.position !== "fixed" &&
                    style.position !== "sticky"
                  ) {
                    return false;
                  }

                  const rect =
                    node.getBoundingClientRect();

                  return (
                    rect.width >= 8 &&
                    rect.height >= 8 &&
                    rect.right >=
                      viewportWidth - 140 &&
                    Math.abs(
                      rect.top +
                        rect.height / 2 -
                        buttonCenter,
                    ) < 62 &&
                    rect.right >=
                      buttonRect.left - 24
                  );
                })
                .sort((a, b) => {
                  const aRect =
                    a.getBoundingClientRect();
                  const bRect =
                    b.getBoundingClientRect();

                  return (
                    Math.abs(
                      aRect.top +
                        aRect.height / 2 -
                        buttonCenter,
                    ) -
                    Math.abs(
                      bRect.top +
                        bRect.height / 2 -
                        buttonCenter,
                    )
                  );
                })[0];

            GM_setValue(
              "adpb-dockTarget",
              dockCandidate
                ? controlIdentity(dockCandidate)
                : null,
            );
            GM_setValue(
              "adpb-fabTop",
              clampTop(buttonRect.top),
            );
          } catch (e) {}

          if (
            panel.classList.contains(
              "adpb-open",
            )
          ) {
            this.placePanel();
          }
        }
      };

      button.addEventListener(
        "pointerup",
        endDrag,
      );

      button.addEventListener(
        "pointercancel",
        endDrag,
      );

      // Amazon and other storefront widgets can mount fixed buttons after
      // this userscript. Re-check the rail periodically when the user is not
      // actively dragging so the control does not cover a newly-added action.
      window.setInterval(() => {
        if (drag.active) {
          return;
        }

        applyFabTop(loadFabTop());

        if (
          panel.classList.contains(
            "adpb-open",
          )
        ) {
          this.placePanel();
        }
      }, 1500);

      button.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          event.stopPropagation();

          if (drag.moved) {
            drag.moved = false;
            return;
          }

          this.toggle();
        },
      );

      document.addEventListener(
        "click",
        (event) => {
          if (
            !panel.classList.contains(
              "adpb-open",
            )
          ) {
            return;
          }

          const target =
            event.composedPath()[0];

          if (
            target === button ||
            button.contains(target) ||
            target === panel ||
            panel.contains(target)
          ) {
            return;
          }

          this.close();
        },
        true,
      );

      document.addEventListener(
        "keydown",
        (event) => {
          if (
            event.key === "Escape" &&
            panel.classList.contains(
              "adpb-open",
            )
          ) {
            this.close();
            button.focus();
          }
        },
      );

      window.addEventListener(
        "resize",
        () => {
          applyFabTop(
            loadFabTop(),
          );

          if (
            panel.classList.contains(
              "adpb-open",
            )
          ) {
            this.placePanel();
          }
        },
      );

      this.shadow.appendChild(
        panel,
      );

      this.shadow.appendChild(
        button,
      );

      this.shadow.appendChild(
        identityLabel,
      );
      document.body.appendChild(this.host);
      panel.addEventListener('keydown',event=>{
        if(event.key==='Escape' && this.infoButton){event.preventDefault();event.stopPropagation();this.hideInfo();return;}
        if(event.key!=='Tab')return;
        const items=[...panel.querySelectorAll('button,input,select,textarea,summary,a[href]')].filter(el=>el.getClientRects().length&&!el.disabled);
        const first=items[0],last=items.at(-1);
        if(event.shiftKey&&this.shadow.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&this.shadow.activeElement===last){event.preventDefault();first.focus();}
      });
      let layoutFrame = 0;
      const schedulePanelLayout = () => {
        if (!layoutFrame) layoutFrame = requestAnimationFrame(() => {
          layoutFrame = 0;
          this.placePanel();
        });
      };
      panel.addEventListener('click', schedulePanelLayout);
      panel.addEventListener('change', schedulePanelLayout);
      panel.addEventListener('scroll', () => this.hideInfo(), true);
      document.addEventListener('pointerdown', event => {
        const path = event.composedPath();
        if (this.infoButton && !path.includes(this.infoButton) && !path.includes(this.infoPopover)) this.hideInfo();
      }, true);
      window.addEventListener('resize', () => this.hideInfo(), {passive:true});
      window.visualViewport?.addEventListener('resize', () => this.hideInfo(), {passive:true});
      if (typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(schedulePanelLayout);
        observer.observe(panel);
        observer.observe(button);
        // Watch inner content too: diagnostics can change without resizing its scroll area.
        for (const node of panel.querySelectorAll('.adpb-section-content,.adpb-submenu-content,.adpb-header,.adpb-status')) observer.observe(node);
      }
      window.visualViewport?.addEventListener('resize', schedulePanelLayout, {passive:true});
      window.visualViewport?.addEventListener('scroll', schedulePanelLayout, {passive:true});
      matchMedia('(prefers-contrast: more)').addEventListener('change',()=>this.updateAppearance());
      pushRelatedControls();

      this.updateAppearance();
      this.checkForUpdate();

      this.updateStatus();
      this.updateStats();

      return true;
    },

    start() {
      const tryMount = () =>
        this.mount();

      if (tryMount()) {
        return;
      }

      const observer =
        new MutationObserver(() => {
          if (tryMount()) {
            observer.disconnect();
          }
        });

      observer.observe(
        document.documentElement,
        {
          childList: true,
          subtree: true,
        },
      );

      if (
        document.readyState ===
        "loading"
      ) {
        document.addEventListener(
          "DOMContentLoaded",
          tryMount,
          { once: true },
        );
      }
    },
  };

  // ============================================================
  // MUTATION OBSERVER
  // ============================================================

  function setupMutationObserver() {
    let lastMutationTime = 0;

    const observer =
      new MutationObserver(
        (mutations) => {
          if (
            !MasterSetting.value
          ) {
            return;
          }

          let relevant = false;

          for (const mutation of mutations) {
            if (
              mutation.addedNodes &&
              mutation.addedNodes.length
            ) {
              relevant = true;
              break;
            }
          }

          if (!relevant) {
            return;
          }

          const now =
            Date.now();

          if (
            now - lastMutationTime <
            CONFIG.throttleDelay
          ) {
            return;
          }

          lastMutationTime = now;

          scheduleProcess(
            CONFIG.throttleDelay,
          );
        },
      );

    const target =
      document.documentElement ||
      document.body;

    if (!target) {
      return;
    }

    observer.observe(
      target,
      {
        childList: true,
        subtree: true,
      },
    );

    debug(
      "MutationObserver active",
    );
  }

  // ============================================================
  // MENU
  // ============================================================

  function setupMenu() {
    try {
      GM_registerMenuCommand(
        `${MasterSetting.value ? "✓" : "✗"} Protection`,
        () => {
          MasterSetting.value =
            !MasterSetting.value;

          applySettingsLive();
          SettingsRail.refreshInputs();
        },
      );

      Object.entries(Settings).forEach(
        ([key, setting]) => {
          GM_registerMenuCommand(
            `${setting.value ? "✓" : "✗"} ${setting.displayName}`,
            () => {
              setting.toggle();

              applySettingsLive();

              SettingsRail.refreshInputs();
            },
          );
        },
      );

      GM_registerMenuCommand(
        "↺ Reset recommended settings",
        () => {
          SettingsRail.resetRecommended();
        },
      );
    } catch (e) {
      debug(
        "Unable to register menu commands",
        e,
      );
    }
  }

  // ============================================================
  // SAFETY SWEEP
  // ============================================================

  function setupSafetySweep() {
    window.setInterval(
      () => {
        if (
          !MasterSetting.value
        ) {
          return;
        }

        if (
          location.href !==
          lastProcessedUrl
        ) {
          scheduleProcess(0);
          return;
        }

        scheduleProcess(0);
      },
      CONFIG.safetySweepInterval,
    );
  }

  // ============================================================
  // INITIALIZATION
  // ============================================================

  function init() {
    debug(
      `Initializing ${VERSION}`,
    );

    migrateSettings();
    setupMenu();
    SettingsRail.start();

    setupMutationObserver();
    setupNavigationDetection();
    setupSafetySweep();

    if (
      document.readyState ===
      "loading"
    ) {
      document.addEventListener(
        "DOMContentLoaded",
        () => scheduleProcess(0),
        { once: true },
      );
    } else {
      scheduleProcess(0);
    }

    debug("Ready");
  }

  // ============================================================
  // EARLY CSS + STARTUP
  // ============================================================

  function boot() {
   try {
    injectStyles();
  } catch (error) {
    console.error(
      "[Amazon Dark Pattern Blocker] CSS injection failed:",
      error,
    );
  }

  try {
    init();
  } catch (error) {
    console.error(
      "[Amazon Dark Pattern Blocker] Initialization failed:",
      error,
    );
   }
  }
  if(document.documentElement)boot();
  else document.addEventListener('DOMContentLoaded',boot,{once:true});
})();
