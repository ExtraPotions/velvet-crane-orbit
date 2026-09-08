// ==UserScript==
// @name           Amazon Dark Pattern Blocker
// @namespace      https://github.com/ExtraPotions/velvet-crane-orbit
// @version        0.1.37
// @description    Remove Amazon dark patterns + floating settings; major amazon.* storefronts
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
// @icon           https://raw.githubusercontent.com/ExtraPotions/velvet-crane-orbit/v0.1.37/icon-128.png
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
 * Copyright (c) 2025â€“2026 expDARE
 * Licensed under CC BY-NC 4.0 â€” https://creativecommons.org/licenses/by-nc/4.0/
 * Forks and modifications must attribute expDARE.
 * Non-commercial use only â€” no profit from this work.
 */

(function () {
  "use strict";

  const VERSION = "0.1.37";
  const PREFIX = "adpb-";

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

      homepageClutter: {
        setting: "removeHomepageClutter",
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

    removeHomepageClutter: {
      displayName: "Remove homepage clutter",
      description: "Extra homepage cleanup. Disabled by default for safety.",
      category: "advanced",
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

  // One-time migration from 0.1.11.
  try {
    if (GM_getValue("adpbMigrate011", true)) {
      GM_setValue("removeHomepageClutter", false);
      GM_setValue("adpbMigrate011", false);
    }
  } catch (e) {}

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

        el.style.setProperty(
          "display",
          "none",
          "important",
        );

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

      nodes.forEach((el) => {
        try {
          const previous =
            el.dataset.adpbPreviousDisplay || "";

          if (previous) {
            el.style.setProperty(
              "display",
              previous,
              "important",
            );
          } else {
            el.style.removeProperty("display");
          }

          delete el.dataset.adpbHidden;
          delete el.dataset.adpbPreviousDisplay;
        } catch (e) {}
      });
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

    processHomepageClutter() {
      return this.removeByCategory(
        "homepageClutter",
        "removeHomepageClutter",
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
      const previous =
        el.dataset.adpbPreviousDisplay ||
        "";

      if (previous) {
        el.style.setProperty(
          "display",
          previous,
          "important",
        );
      } else {
        el.style.removeProperty("display");
      }

      delete el.dataset.adpbHidden;
      delete el.dataset.adpbPreviousDisplay;
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

      SettingsRail.updateStatus();
    } catch (error) {
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
    const candidates = new Set([...document.querySelectorAll('[data-expdare-control="secondary"],#pfh-fab,.pfh-fab'), ...registered]);
    const primary = [anchor];
    for (const host of document.querySelectorAll('[data-expdare-dock-root]')) {
      const control = host.shadowRoot?.querySelector('[data-expdare-control="primary"]');
      if (control && control !== anchor) primary.push(control);
    }
    const occupied = primary.map(el=>el.getBoundingClientRect()).filter(r=>r.width&&r.height);
    const origin=anchor.getBoundingClientRect();
    const overlaps=r=>occupied.some(o=>r.left<o.right+8&&r.right>o.left-8&&r.top<o.bottom+8&&r.bottom>o.top-8);
    for (const el of candidates) {
      if (!el.isConnected || primary.includes(el) || el.dataset.expdareControl==='primary') continue;
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
  const SettingsRail = {
    BTN_ID:
      "adpb-settings-fab",

    PANEL_ID:
      "adpb-settings-panel",

    LABEL_ID:
      "adpb-settings-label",

    STYLE_ID:
      "adpb-settings-rail-style",

    // Existing icon â€” intentionally unchanged.
    ICON:
      "data:image/png;base64,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",

    panel: null,
    button: null,
    label: null,
    enabledInput: null,
    statusNode: null,
    statsNode: null,

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

  width: 340px !important;
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
        #${this.BTN_ID} img{display:block!important;width:26px!important;height:26px!important;max-width:26px!important;max-height:26px!important;object-fit:contain!important;pointer-events:none!important}
        #${this.PANEL_ID}{width:min(312px,calc(100vw - 32px))!important;max-height:calc(100dvh - 24px)!important;padding:0!important;background:#282826!important;color:#ddd!important;font:13px/1.4 system-ui,sans-serif!important;border:1px solid #ffffff22!important;box-shadow:0 16px 40px #0007!important}
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
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important;animation:none!important}}
        @media(forced-colors:active){#${this.PANEL_ID} .adpb-switch-input{forced-color-adjust:none!important;border-color:ButtonText!important;background:Canvas!important}#${this.PANEL_ID} .adpb-switch-input::after{background:ButtonText}#${this.PANEL_ID} .adpb-switch-input[aria-checked=true]{background:Highlight!important}#${this.PANEL_ID} .adpb-switch-input[aria-checked=true]::after{background:HighlightText}}
      `;
    },

    ensureStyle() {
      const sheet=new CSSStyleSheet();sheet.replaceSync(this.css()+this.menuCss());
      this.shadow.adoptedStyleSheets=[sheet];
    },

    makeSwitch(name) {
      const input=document.createElement('button');input.type='button';input.setAttribute('role','switch');input.setAttribute('aria-label',name);
      Object.defineProperty(input,'checked',{get(){return this.getAttribute('aria-checked')==='true';},set(value){this.setAttribute('aria-checked',String(Boolean(value)));}});
      input.addEventListener('click',()=>{input.checked=!input.checked;input.dispatchEvent(new Event('change',{bubbles:true}));});
      return input;
    },

    createSwitch(
      setting,
      onChange,
    ) {
      const label =
        document.createElement("label");

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
        setting.displayName;

      const description =
        document.createElement("span");

      description.className =
        "adpb-setting-description";

      description.textContent =
        setting.description;

      copy.appendChild(name);
      copy.appendChild(description);

      const input =
        this.makeSwitch(setting.displayName);

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
        "Cleaner shopping without manipulative prompts";

      titleBlock.appendChild(title);
      titleBlock.appendChild(subtitle);

      const close =
        document.createElement("button");

      close.type = "button";
      close.className =
        "adpb-close";

      close.textContent = "Ã—";

      close.setAttribute(
        "aria-label",
        "Close settings",
      );

      close.addEventListener(
        "click",
        () => this.close(),
      );

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

      panel.appendChild(status);

      const master =
        document.createElement("div");

      master.className =
        "adpb-master";

      const masterCopy =
        document.createElement("div");

      masterCopy.className =
        "adpb-master-copy";

      const masterTitle =
        document.createElement("div");

      masterTitle.className =
        "adpb-master-title";

      masterTitle.textContent =
        "Protection";

      const masterDescription =
        document.createElement("div");

      masterDescription.className =
        "adpb-master-description";

      masterDescription.textContent =
        "Enable or disable all protections";

      masterCopy.appendChild(masterTitle);
      masterCopy.appendChild(
        masterDescription,
      );

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

      for (const category of SETTING_CATEGORIES) {
        const section =
          document.createElement("section");

        section.className =
          "adpb-section";

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
          category.id === "advanced" ? 2 : 0;

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

        chevron.textContent = "â€º";

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

          if (index >= 5) {
            result.label.classList.add(
              "is-extra",
            );
          }

          content.appendChild(
            result.label,
          );
        });

        if (categorySettings.length > 5) {
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
              "â€º";

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

          displayMenu.body.appendChild(
            preferences,
          );

          content.appendChild(
            displayMenu.root,
          );

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
        }

        if (
          categorySettings.length > 0 ||
          category.id === "advanced"
        ) {
          panel.appendChild(section);
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

      actions.appendChild(
        resetButton,
      );

      panel.appendChild(actions);

      const foot =
        document.createElement("div");

      foot.className =
        "adpb-foot";

      foot.textContent =
        `Amazon Dark Pattern Blocker ${VERSION} Â· Drag the button to reposition`;

      panel.appendChild(foot);

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

      this.updateStatus();
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
          ? `${count}/${total} protections`
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
        const br =
          button.getBoundingClientRect();

        const ph =
          panel.offsetHeight || 400;

        let top =
          br.top -
          ph -
          8;

        if (top < 8) {
          top =
            br.bottom +
            8;
        }

        const maxTop =
          Math.max(
            8,
            (window.innerHeight || 600) -
              Math.min(
                ph,
                (window.innerHeight || 600) -
                  16,
              ) -
              8,
          );

        if (top > maxTop) {
          top = maxTop;
        }

        panel.style.setProperty(
          "right",
          "12px",
          "important",
        );

        panel.style.setProperty(
          "left",
          "auto",
          "important",
        );

        panel.style.setProperty(
          "bottom",
          "auto",
          "important",
        );

        panel.style.setProperty(
          "top",
          top + "px",
          "important",
        );
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
        if(event.key!=='Tab')return;
        const items=[...panel.querySelectorAll('button,select,summary')].filter(el=>el.getClientRects().length&&!el.disabled);
        const first=items[0],last=items.at(-1);
        if(event.shiftKey&&this.shadow.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&this.shadow.activeElement===last){event.preventDefault();first.focus();}
      });
      panel.addEventListener('click',()=>this.placePanel());
      matchMedia('(prefers-contrast: more)').addEventListener('change',()=>this.updateAppearance());
      pushRelatedControls();

      this.updateAppearance();

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
        `${MasterSetting.value ? "âœ“" : "âœ—"} Protection`,
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
            `${setting.value ? "âœ“" : "âœ—"} ${setting.displayName}`,
            () => {
              setting.toggle();

              applySettingsLive();

              SettingsRail.refreshInputs();
            },
          );
        },
      );

      GM_registerMenuCommand(
        "â†º Reset recommended settings",
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
