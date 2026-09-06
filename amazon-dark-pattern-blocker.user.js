// ==UserScript==
// @name           Amazon Dark Pattern Blocker
// @namespace      https://github.com/ExtraPotions/velvet-crane-orbit
// @version        0.1.31
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
// @icon           https://raw.githubusercontent.com/ExtraPotions/velvet-crane-orbit/main/icon-128.png
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
 * Forks and modifications must attribute expDARE. Non-commercial use only — no profit from this work.
 */


(function () {
  "use strict";

  // ============================================
  // CONFIGURATION
  // ============================================

  const CONFIG = {
    // Elements to remove from DOM
    selectors: {
      primeUpsells: {
        setting: "removePrimeUpsells",
        // homepageHeroBanner removed in 0.1.11 — #desktop-banner is the main gateway hero, not a Prime-only strip
        productPageIlmPromo: '[data-feature-name="desktop-dp-ilm"]',
        productPagePrimeUpsell: "#primeDPUpsellStaticContainerNPA",
        productPagePrimeUpsellAlt: "#primeDPUpsellStaticContainer",
        deliveryPrimeUpsell:
          "#mir-layout-DELIVERY_BLOCK-slot-SECONDARY_DELIVERY_MESSAGE_LARGE",
        navBarJoinPrime: "#nav-join-prime",
        // 0.1.14: do not hide/remove #sc-primeupsell-widget — sits in cart right rail
        // (#proceed-to-checkout-desktop-container) beside #sc-buy-box
        checkoutPrimeUpsell: "#osu-prime-recommendations",
        checkoutPrimeStripe: "#prime-spc-stripe-recommendations",
        checkoutPrimeIsoa: ".isoa-wrapper-radio",
        searchPagePrimeUpsell:
          ".udm-primary-delivery-message:has(.prime-signup-ingress)",
        searchPagePrimeSavings:
          'span[data-csa-c-owner="PromotionsDiscovery"]:has(label[id^="greenBadge"])',
        businessPrimeUpsell: "#businessPrimeDPUpsellStaticContainer",
        productPagePrimeAccordionUpsell: "#primeSavingsUpsellAccordionRow",
        productPageBuyBoxPrimeUpsell:
          '#shippingMessageInsideBuyBox_feature_div:has(a[href*="prime"])',
        productPageFreeShippingPrimeUpsell:
          '#freeShippingPriceBadging_feature_div:has(a[href*="prime"])',
        productPageExclusivePricing: "#pep_feature_div",
      },
      urgencyTactics: {
        setting: "removeUrgencyTactics",
        cartScarcity: ".sc-product-scarcity",
        buyAgainScarcity: '[class*="_scarcityMessage_"]',
        searchPageScarcity: 'span[aria-label*="left in stock"]',
        searchPageDealCountdown: '.a-badge[data-a-badge-type="deal"]',
        productPageDealBadge: "#dealBadge_feature_div",
        productPageDealProgress: "#dealProgress_feature_div",
        cartLowestPrice30Days: ".sc-delight-pricing",
        productPageLowestPrice30Days: "#delightPricingBadge_feature_div",
      },
      subscribeAndSave: {
        setting: "removeSubscribeNudges",
        cartSnsUpsell: ".sc-subscribe-and-save-upsell-message",
      },
      sponsoredProducts: {
        setting: "removeSponsoredProducts",
        // Search / browse sponsored slots
        searchSponsoredResult: '[data-component-type="sp-sponsored-result"]',
        searchAdHolder: ".AdHolder",
        searchSponsoredLabelCard:
          '.s-result-item:has(.puis-sponsored-label-text), .s-result-item:has(.s-sponsored-label-info-icon), .s-result-item:has([aria-label*="Sponsored"])',
        searchSponsoredWidget:
          '.s-widget-container:has(.puis-sponsored-label-text), .s-widget-container:has(.s-sponsored-label-text)',
        // Product-page sponsored / ad shelves (distinct from FBT sims)
        productSponsoredBrand: "#sp_detail_thematic",
        productSponsoredBottom: "#sp_detail",
        productAdsFeature: '[data-feature-name="sponsoredProducts"], [data-feature-name="sp_detail"]',
        productAdFeedback: "#ad-feedback-text-desktop-auto-sparkle-extra",
      },
      creditCardUpsells: {
        setting: "removeCreditCardUpsells",
        cartCreditCardBanner: "#sc-new-upsell",
        // 0.1.13: do not hide #sw-maple — lives inside smart-wagon / right cart rail
        productPageCreditCardBanner: "#issuancePriceblockAmabot_feature_div",
        productPageCreditCardBannerMaple: "#maplePriceblockAmabot_feature_div",
        thankYouPageCreditCard: '[cel_widget_id="typ-mapleSlot"]',
        productPageInstallmentPlan:
          "#paymentOptions_PriceblockMessaging_feature_div",
      },
      aiUpsells: {
        setting: "removeAIUpsells",
        navRufus: "#nav-rufus-disco",
        navHealthAI:
          'li.nav-li:has(a[data-csa-c-content-id="nav_cs_health_ai"])',
        productPageRufus: "#nile-inline_feature_div",
        rufusTextSelectionTooltip: "#rufus-ask-rufus-tooltip",
        rufusPriceIngress: "#rufus-price-ingress",
        rufusPriceInsightsFodcx: "#fodcx_feature_div",
      },
      amazonServicePromos: {
        setting: "removeAmazonServicePromos",
        productPageMusicShoveler: '[cel_widget_id^="kahuna-music"]',
        productPageHeroQuickPromo: "#heroQuickPromoContainer",
        productPageAudibleUpsell: "#audibleUpsellAccordionRow",
        productPageFeedbackSurvey: "#feedbackSurvey_feature_div",
      },
      homepageClutter: {
        setting: "removeHomepageClutter",
        // 0.1.11: do NOT target #gwm-window-layout / [id^="gwm-Deck"] — those are the main homepage cards.
        // Leave empty until safer Prime-only homepage selectors are found.
      },
      amazonBusinessPromos: {
        setting: "removeAmazonBusinessPromos",
        productPageBuyItOnAB: "#buyItOnAB_feature_div",
        productPageB2BUpsell: "#b2bUpsell_feature_div",
      },
      protectionPlans: {
        setting: "removeProtectionPlans",
        productPageProtectionPlan: "#mbb_feature_div",
        // 0.1.12+: never touch #attach-desktop-sideSheet (right-side cart).
        // 0.1.13: drop broad [id*="attach-warranty"] / [data-feature-name*="protection"].
        attachWarrantyExact: "#attach-warranty",
        attachSiNoCoverageRow: "#attachSiNoCoverage",
      },
    },

    // Buttons/links to click (dismiss modals, "No thanks" buttons)
    clickTargets: {
      primeModals: {
        checkoutPrimeDecline: "#prime-decline-button",
      },
      generalDismiss: {
        // e.g., noThanks: '[data-action="no-thanks"]',
      },
    },

    // Elements to modify text content (remove Prime upsell text while keeping useful info)
    textReplacements: {
      cartFreeShippingMessage: {
        selector: ".sc-sss-box .sc-sss",
        pattern:
          /Add\s+(\$[\d.]+)\s+of eligible items or.*?to get FREE delivery/s,
        replacement: "Add $1 of eligible items to get FREE delivery",
      },
      cartFlyoutFreeShippingMessage: {
        selector: ".ewc-compact-actions .sc-sss, #sw-threshold-message .sc-sss",
        pattern:
          /Add\s+(\$[\d.]+)\s+of eligible items or.*?to get FREE delivery[^.]*\./s,
        replacement:
          "Add $1 of eligible items to get FREE delivery on eligible items with no order minimum.",
      },
      searchPageSecondaryDelivery: {
        selector: ".udm-secondary-delivery-message",
        pattern: /^\s*Or\s+/i,
        replacement: "",
      },
    },

    // Checkboxes to uncheck (pre-selected add-ons, protection plans)
    uncheckTargets: {
      checkout: {
        // e.g., protectionPlan: '#add-protection-plan-checkbox',
      },
      subscribeAndSave: {
        // e.g., snsCheckbox: '#sns-checkbox',
      },
    },

    // Page detection patterns
    pages: {
      product: /\/dp\/|\/gp\/product\//,
      cart: /\/cart|\/gp\/cart/,
      checkoutPrimeInterstitial: /\/checkout\/.*\/pip/,
      checkout: /\/checkout\//,
      search: /\/s\?|\/s\/|\/b\?/,
      homepage: /^\/($|\?)/,
    },

    pollInterval: 2000,
    throttleDelay: 100,
    debug: false,
  };

  // Settings configuration
  const SETTINGS_CONFIG = {
    removePrimeUpsells: {
      displayName: "Remove Prime upsells",
      default: true,
    },
    removeUrgencyTactics: {
      displayName: "Remove urgency tactics",
      default: true,
    },
    removeSubscribeNudges: {
      displayName: "Remove Subscribe & Save nudges",
      default: true,
    },
    removeSponsoredProducts: {
      displayName: "Remove sponsored products",
      default: true,
    },
    removeCreditCardUpsells: {
      displayName: "Remove credit card upsells",
      default: true,
    },
    removeAIUpsells: {
      displayName: "Remove Rufus AI",
      default: true,
    },
    removeAmazonServicePromos: {
      displayName: "Remove Amazon service promos",
      default: true,
    },
    removeProtectionPlans: {
      displayName: "Remove protection plans",
      default: true,
    },
    removeAmazonBusinessPromos: {
      displayName: "Remove Amazon Business promos",
      default: true,
    },
    removeHomepageClutter: {
      displayName: "Remove homepage clutter",
      default: false,
    },
    autoClipCoupons: {
      displayName: "Auto-clip coupons",
      default: true,
    },
    removeFbtCarousels: {
      displayName: "Remove FBT / carousels",
      default: true,
    },
    compactSearchResults: {
      displayName: "Compact search results",
      default: false,
    },
  };

  // ============================================
  // SETTINGS
  // ============================================

  class Setting {
    constructor(name, config) {
      this.name = name;
      this.displayName = config.displayName;
      this.default = config.default;
    }

    get value() {
      return GM_getValue(this.name, this.default);
    }

    set value(val) {
      GM_setValue(this.name, val);
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

  // 0.1.11 one-time: prior builds defaulted homepage clutter ON and deleted the gateway layout
  try {
    if (GM_getValue("adpbMigrate011", true)) {
      GM_setValue("removeHomepageClutter", false);
      GM_setValue("adpbMigrate011", false);
    }
  } catch (e) {}

  // ============================================
  // UTILITIES
  // ============================================

  function debug(message, ...args) {
    if (CONFIG.debug) {
      console.log(`[Amazon Dark Pattern Blocker] ${message}`, ...args);
    }
  }

  const CART_RAIL_SELECTORS = [
    // /cart page (from live inspect)
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
    // attach / ewc flyouts
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
    // smart wagon
    "#smartWagon_feature_div",
    "#sw-content",
    "#sw-foldaway",
    "#sw-subtotals",
    "#sw-items",
  ];

  function isInsideCartRail(el) {
    if (!el || !el.closest) return false;
    try {
      return !!el.closest(CART_RAIL_SELECTORS.join(","));
    } catch (e) {
      return false;
    }
  }

  // ============================================
  // CSS INJECTION (runs at document-start, before paint)
  // ============================================

  function injectStyles() {
    if (document.getElementById("adpb-styles")) return;

    const path = window.location.pathname + window.location.search;
    const isHomepage = CONFIG.pages.homepage.test(path);

    // 0.1.15: on homepage, ONLY hide Join Prime + Rufus nav chips.
    // Full selector dumps were blanking the persistent EWC cart rail on the right.
    let rules = [];
    if (isHomepage) {
      if (Settings.removePrimeUpsells.value) rules.push("#nav-join-prime");
      if (Settings.removeAIUpsells.value) {
        rules.push("#nav-rufus-disco");
        rules.push("#rufus-ask-rufus-tooltip");
      }
    } else {
      for (const category of Object.values(CONFIG.selectors)) {
        if (!category.setting || !Settings[category.setting].value) continue;
        for (const [key, selector] of Object.entries(category)) {
          if (key === "setting") continue;
          rules.push(selector);
        }
      }
    }

    if (rules.length === 0) return;

    // Never hide nodes inside the cart / EWC / attach rails
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
      .filter(function (sel) {
        return CART_RAIL_SELECTORS.indexOf(sel) === -1;
      })
      .map(function (sel) {
        return sel + exclude;
      });

    if (safeRules.length === 0) return;

    const style = document.createElement("style");
    style.id = "adpb-styles";
    style.textContent =
      "/* Amazon Dark Pattern Blocker 0.1.31 - FOUC prevention (cart-rail safe) */\n" +
      safeRules.join(",\n") +
      " {\n  display: none !important;\n}\n";
    (document.head || document.documentElement).appendChild(style);
    debug("Injected CSS hide rules for " + safeRules.length + " selectors");
  }

  function getPageType() {
    const path = window.location.pathname + window.location.search;
    for (const [pageType, pattern] of Object.entries(CONFIG.pages)) {
      if (pattern.test(path)) {
        return pageType;
      }
    }
    return "other";
  }

  // ============================================
  // DECLUTTERER
  // ============================================

  const Declutterer = {
    /**
     * Remove elements matching selectors in a category
     */
    removeByCategory(categoryKey, settingKey) {
      if (!Settings[settingKey].value) return 0;

      const selectors = CONFIG.selectors[categoryKey];
      if (!selectors) return 0;

      let count = 0;

      for (const [name, selector] of Object.entries(selectors)) {
        if (name === "setting") continue;
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el) => {
            if (isInsideCartRail(el)) {
              debug(`Skipped ${name} (inside cart rail)`);
              return;
            }
            el.remove();
            count++;
            debug(`Removed ${name}`);
          });
        } catch (e) {
          debug(`Invalid selector for ${name}: ${selector}`, e);
        }
      }

      return count;
    },

    /**
     * Click elements in a category (for dismissing modals, etc.)
     */
    clickByCategory(categoryKey) {
      const targets = CONFIG.clickTargets[categoryKey];
      if (!targets) return 0;

      let count = 0;

      for (const [name, selector] of Object.entries(targets)) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          // Guard against MutationObserver + 2s poll re-clicking the same control
          if (el.dataset.dpbClicked === "true") return;
          el.dataset.dpbClicked = "true";
          el.click();
          count++;
          debug(`Clicked ${name}`);
        });
      }

      return count;
    },

    /**
     * Uncheck pre-selected checkboxes in a category
     */
    uncheckByCategory(categoryKey) {
      const targets = CONFIG.uncheckTargets[categoryKey];
      if (!targets) return 0;

      let count = 0;

      for (const [name, selector] of Object.entries(targets)) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          if (el.checked) {
            el.checked = false;
            el.dispatchEvent(new Event("change", { bubbles: true }));
            count++;
            debug(`Unchecked ${name}`);
          }
        });
      }

      return count;
    },

    /**
     * Handle the Prime accordion upsell in the buy box.
     * If pre-selected, it clicks the regular price before the upsell is removed.
     */
    processPrimeAccordionUpsell() {
      if (!Settings.removePrimeUpsells.value) return;

      const primeRow = document.querySelector(
        "#primeSavingsUpsellAccordionRow",
      );
      if (!primeRow || primeRow.dataset.dpbProcessed) return;

      // Check if it's currently active/selected
      const isActive =
        primeRow.classList.contains("a-accordion-active") ||
        primeRow.querySelector(".a-icon-radio-active");

      if (isActive) {
        // Find the regular price row to click
        // baseBuyingOptionAccordionRow is the standard one-time purchase row
        const regularRow =
          document.querySelector("#baseBuyingOptionAccordionRow") ||
          document.querySelector(
            "#buyBoxAccordion [data-a-accordion-row-name]:not(#primeSavingsUpsellAccordionRow)",
          );

        if (regularRow) {
          const clickTarget = regularRow.querySelector(
            '.a-accordion-row-a11y, .accordion-header, [role="button"]',
          );
          if (clickTarget) {
            debug("Prime upsell is pre-selected. Clicking regular price...");
            primeRow.dataset.dpbProcessed = "true";
            clickTarget.click();
          }
        }
      }
    },

    // Category processors
    processPrimeUpsells() {
      this.removeByCategory("primeUpsells", "removePrimeUpsells");
    },

    processUrgencyTactics() {
      this.removeByCategory("urgencyTactics", "removeUrgencyTactics");
    },

    processSubscribeNudges() {
      this.removeByCategory("subscribeAndSave", "removeSubscribeNudges");
    },

    processSponsoredProducts() {
      this.removeByCategory("sponsoredProducts", "removeSponsoredProducts");
    },

    processFbtCarousels() {
      const sels = [
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
        "#browse_feature_div"
      ];
      const hide = Settings.removeFbtCarousels.value;
      sels.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          if (el.closest("#imageBlock, #altImages, #imageBlockNew, #adpb-settings-fab, #adpb-settings-panel")) return;
          if (hide) {
            el.style.setProperty("display", "none", "important");
          } else if (el.style.getPropertyValue("display") === "none") {
            // Restore only what we hid; leave Amazon's own display alone
            el.style.removeProperty("display");
          }
        });
      });
    },

    applyCompactSearch() {
      let node = document.getElementById("adpb-compact-search-style");
      if (!Settings.compactSearchResults.value) {
        if (node) node.remove();
        return;
      }
      if (!node) {
        node = document.createElement("style");
        node.id = "adpb-compact-search-style";
        (document.documentElement || document.head).appendChild(node);
      }
      node.textContent = `
        .s-result-item, .s-card-container, [data-component-type="s-search-result"] {
          margin-bottom: 0.35rem !important;
        }
        .s-result-item .a-section { padding-top: 0.25rem !important; padding-bottom: 0.25rem !important; }
        .s-widget-container, .AdHolder { margin: 0.25rem 0 !important; }
      `;
    },

    processPrimeModals() {
      this.clickByCategory("primeModals");
    },

    processGeneralDismiss() {
      this.clickByCategory("generalDismiss");
    },

    processCheckoutUnchecks() {
      this.uncheckByCategory("checkout");
    },

    processSubscribeUnchecks() {
      this.uncheckByCategory("subscribeAndSave");
    },

    processCreditCardUpsells() {
      this.removeByCategory("creditCardUpsells", "removeCreditCardUpsells");
    },

    processAIUpsells() {
      this.removeByCategory("aiUpsells", "removeAIUpsells");
    },

    processAmazonServicePromos() {
      this.removeByCategory("amazonServicePromos", "removeAmazonServicePromos");
    },

    processProtectionPlans() {
      this.removeByCategory("protectionPlans", "removeProtectionPlans");
    },

    processAmazonBusinessPromos() {
      this.removeByCategory(
        "amazonBusinessPromos",
        "removeAmazonBusinessPromos",
      );
    },

    processHomepageClutter() {
      this.removeByCategory("homepageClutter", "removeHomepageClutter");
    },

    /**
     * Handle the Prime interstitial page that hijacks checkout
     * Replaces content with a message and auto-clicks decline
     */
    processPrimeInterstitial() {
      if (!Settings.removePrimeUpsells.value) return;

      const container = document.querySelector("#updp-prime-recommendations");
      const declineButton = document.querySelector("#prime-decline-button");

      if (container && declineButton && !container.dataset.dpbProcessed) {
        container.dataset.dpbProcessed = "true";

        // Get the decline URL before we do anything
        const declineUrl = declineButton.href;

        // Replace the container content with a simple message
        container.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center;
                      min-height: 200px; font-size: 18px; color: #0F1111;">
            <p>Skipping Prime upsell page...</p>
          </div>
        `;

        debug("Replaced Prime interstitial content, redirecting...");

        // Navigate to the decline URL
        if (declineUrl) {
          window.location.href = declineUrl;
        }
      }
    },

    /**
     * If Audible is pre-selected in the format switcher, click a physical format instead
     */
    processAudibleDefaultSelection() {
      if (!Settings.removeAmazonServicePromos.value) return;

      const audibleSwatch = document.querySelector(
        "#tmm-grid-swatch-AUDIO_DOWNLOAD.selected",
      );
      if (!audibleSwatch || audibleSwatch.dataset.dpbProcessed) return;
      audibleSwatch.dataset.dpbProcessed = "true";

      // Prefer hardcover, fall back to paperback
      const physicalSwatch =
        document.querySelector("#tmm-grid-swatch-HARDCOVER a") ||
        document.querySelector("#tmm-grid-swatch-PAPERBACK a");
      if (physicalSwatch) {
        physicalSwatch.click();
        debug("Switched from Audible default to physical format");
      }
    },

    /**
     * Auto-clip coupons to remove gamification (checkbox click-to-save pattern)
     */
    processAutoClipCoupons() {
      if (!Settings.autoClipCoupons.value) return 0;

      let count = 0;
      const coupons = document.querySelectorAll(
        '[data-component-type="s-coupon-component"] .s-coupon-tile.unclaimed input[type="checkbox"]:not(:checked), .ct-coupon-tile.unclaimed input[type="checkbox"]:not(:checked)',
      );
      coupons.forEach((checkbox) => {
        checkbox.click();
        count++;
        debug("Auto-clipped coupon");
      });
      return count;
    },

    /**
     * Replace text content in elements (for removing inline Prime upsells while keeping useful text)
     */
    processTextReplacements() {
      if (!Settings.removePrimeUpsells.value) return 0;

      const replacements = CONFIG.textReplacements;
      if (!replacements) return 0;

      let count = 0;

      for (const [name, config] of Object.entries(replacements)) {
        const elements = document.querySelectorAll(config.selector);
        elements.forEach((el) => {
          // Check if already processed
          if (el.dataset.dpbProcessed) return;

          const originalText = el.textContent;
          if (config.pattern.test(originalText)) {
            // Remove all child elements (scripts, links, etc.) and replace with clean text
            const newText = originalText.replace(
              config.pattern,
              config.replacement,
            );
            el.textContent = newText;
            el.dataset.dpbProcessed = "true";
            count++;
            debug(`Replaced text in ${name}`);
          }
        });
      }

      return count;
    },
  };

  // ============================================
  // PAGE HANDLERS
  // ============================================

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
      // This is the Prime upsell interstitial page that hijacks checkout
      // Replace the content with a message and auto-click decline
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
      // 0.1.15: do NOT run full prime/clutter passes on homepage — they blank the
      // persistent right-side EWC cart rail. Only strip Join Prime + Rufus in the nav.
      if (Settings.removePrimeUpsells.value) {
        document.querySelectorAll("#nav-join-prime").forEach(function (el) {
          if (!isInsideCartRail(el)) el.remove();
        });
      }
      if (Settings.removeAIUpsells.value) {
        document.querySelectorAll("#nav-rufus-disco, #rufus-ask-rufus-tooltip").forEach(function (el) {
          if (!isInsideCartRail(el)) el.remove();
        });
      }
    },

    other() {
      // Fallback: run shared patterns
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

  function processPage() {
    try {
      const pageType = getPageType();
      const handler = PageHandlers[pageType] || PageHandlers.other;
      debug(`Processing page type: ${pageType}`);
      handler();
    } catch (error) {
      debug("Error during processing:", error);
    }
  }

  // Rebuild early CSS hide rules to match current Settings (live toggles).
  // CSS-hidden nodes reappear when rules drop; nodes already el.remove()'d
  // cannot be restored without navigation — that is expected.
  function refreshHideStyles() {
    const existing = document.getElementById("adpb-styles");
    if (existing) existing.remove();
    try {
      injectStyles();
    } catch (e) {
      debug("refreshHideStyles failed", e);
    }
  }

  function applySettingsLive() {
    refreshHideStyles();
    processPage();
    try {
      Declutterer.processFbtCarousels();
      Declutterer.applyCompactSearch();
    } catch (e) {
      debug("applySettingsLive extras failed", e);
    }
  }


  // ============================================
  // SETTINGS FAB (floating favicon; vertical drag)
  // ============================================

  const SettingsRail = {
    RAIL_ID: "adpb-settings-rail",
    BTN_ID: "adpb-settings-fab",
    PANEL_ID: "adpb-settings-panel",
    STYLE_ID: "adpb-settings-rail-style",
    ICON: "https://raw.githubusercontent.com/ExtraPotions/velvet-crane-orbit/main/icon-64.png",

    css() {
      return `
#${this.BTN_ID}, #${this.PANEL_ID}, #${this.BTN_ID} * { box-sizing: border-box; }
#${this.BTN_ID} {
  position: fixed !important;
  right: 12px !important;
  left: auto !important;
  z-index: 2147483000 !important;
  width: 48px !important;
  height: 48px !important;
  border-radius: 999px !important;
  border: 1px solid #ff9900 !important;
  background: #131921 !important;
  background-image: none !important;
  color: #ff9900 !important;
  box-shadow: 0 2px 10px rgba(0,0,0,.4), 0 0 0 1px rgba(255,153,0,0.25) !important;
  cursor: grab !important;
  padding: 0 !important;
  margin: 0 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
  touch-action: none !important;
  user-select: none !important;
  transition: background .15s ease, border-color .15s ease !important;
}
#${this.BTN_ID}.adpb-dragging { cursor: grabbing !important; }
#${this.BTN_ID}:hover {
  background: #232f3e !important;
  border-color: #ff9900 !important;
}
#${this.BTN_ID} img {
  width: 26px !important;
  height: 26px !important;
  object-fit: contain !important;
  pointer-events: none !important;
}
#${this.PANEL_ID} {
  position: fixed !important;
  right: 12px !important;
  left: auto !important;
  bottom: auto !important;
  top: auto !important;
  transform: none !important;
  z-index: 2147483001 !important;
  width: 280px !important;
  max-width: calc(100vw - 24px) !important;
  max-height: calc(100vh - 96px) !important;
  overflow: auto !important;
  background: #232f3e !important;
  color: #eee !important;
  border: 1px solid rgba(255,153,0,0.35) !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 28px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,153,0,0.12) !important;
  padding: 12px !important;
  font: 13px/1.35 "Amazon Ember", Arial, sans-serif !important;
  display: none !important;
}
#${this.PANEL_ID}.adpb-open { display: block !important; }
#${this.PANEL_ID} .adpb-title {
  font-weight: 700 !important;
  margin: 0 0 10px !important;
  color: #f0c14b !important;
}
#${this.PANEL_ID} .adpb-row {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 10px !important;
  margin: 0 0 8px !important;
}
#${this.PANEL_ID} label {
  color: #eee !important;
  cursor: pointer !important;
  flex: 1 !important;
}
#${this.PANEL_ID} label.adpb-switch {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 10px !important;
  width: 100% !important;
  margin: 6px 0 !important;
  color: #eee !important;
  cursor: pointer !important;
  user-select: none !important;
}
#${this.PANEL_ID} .adpb-switch-text { flex: 1 1 auto !important; min-width: 0 !important; line-height: 1.3 !important; }
#${this.PANEL_ID} .adpb-switch-input {
  position: absolute !important; opacity: 0 !important; width: 0 !important; height: 0 !important; pointer-events: none !important;
}
#${this.PANEL_ID} .adpb-toggle {
  position: relative !important; flex: none !important;
  width: 36px !important; height: 18px !important;
  background: #6b6b6b !important; border: 0 !important; border-radius: 12px !important;
  cursor: pointer !important; box-sizing: border-box !important;
  transition: background .15s ease !important;
}
#${this.PANEL_ID} .adpb-toggle::after {
  content: "" !important; position: absolute !important; top: 0 !important; left: 0 !important;
  width: 18px !important; height: 18px !important; border-radius: 12px !important;
  background: #d4d4d4 !important; box-shadow: 0 1px 2px rgba(0,0,0,.35) !important;
  transition: transform .15s ease, background .15s ease !important;
}
#${this.PANEL_ID} .adpb-switch-input:checked + .adpb-toggle {
  background: #ff9900 !important;
}
#${this.PANEL_ID} .adpb-switch-input:checked + .adpb-toggle::after {
  transform: translateX(18px) !important; background: #e8e8e8 !important;
}
#${this.PANEL_ID} .adpb-foot {
  margin-top: 8px !important;
  padding-top: 8px !important;
  border-top: 1px solid rgba(255,255,255,0.12) !important;
  font-size: 11px !important;
  color: #99a !important;
}`;
    },

    ensureStyle() {
      let node = document.getElementById(this.STYLE_ID);
      if (!node) {
        node = document.createElement("style");
        node.id = this.STYLE_ID;
        (document.documentElement || document.head).appendChild(node);
      }
      node.textContent = this.css();
    },

    buildPanel() {
      const panel = document.createElement("div");
      panel.id = this.PANEL_ID;
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-label", "Amazon Dark Pattern Blocker settings");

      const title = document.createElement("div");
      title.className = "adpb-title";
      title.textContent = "Dark Pattern Blocker";
      panel.appendChild(title);

      Object.entries(Settings).forEach(([key, setting]) => {
        const on = !!setting.value;
        const lab = document.createElement("label");
        lab.className = "adpb-switch";
        const text = document.createElement("span");
        text.className = "adpb-switch-text";
        text.textContent = setting.displayName;
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.className = "adpb-switch-input";
        cb.setAttribute("role", "switch");
        cb.checked = on;
        cb.setAttribute("aria-checked", on ? "true" : "false");
        const track = document.createElement("span");
        track.className = "adpb-toggle";
        track.setAttribute("aria-hidden", "true");
        lab.appendChild(text);
        lab.appendChild(cb);
        lab.appendChild(track);
        cb.addEventListener("change", () => {
          setting.value = !!cb.checked;
          cb.setAttribute("aria-checked", cb.checked ? "true" : "false");
          try {
            applySettingsLive();
          } catch (e) {}
        });
        panel.appendChild(lab);
      });

      const foot = document.createElement("div");
      foot.className = "adpb-foot";
      foot.textContent = "Drag up/down · install from GitHub Releases";
      panel.appendChild(foot);
      return panel;
    },

    mount() {
      if (!document.body) return false;
      this.ensureStyle();
      if (document.getElementById(this.BTN_ID)) return true;
      const legacy = document.getElementById(this.RAIL_ID);
      if (legacy) legacy.remove();

      const panel = this.buildPanel();
      const btn = document.createElement("button");
      btn.id = this.BTN_ID;
      btn.type = "button";
      btn.title = "Dark Pattern Blocker settings";
      btn.setAttribute("aria-label", "Dark Pattern Blocker settings");
      btn.setAttribute("aria-expanded", "false");
      const img = document.createElement("img");
      img.src = this.ICON;
      img.alt = "";
      img.width = 26;
      img.height = 26;
      btn.appendChild(img);

      const clampTop = (y) => {
        const max = Math.max(8, (window.innerHeight || 600) - 56);
        return Math.min(max, Math.max(8, y));
      };
      const applyFabTop = (topPx) => {
        btn.style.setProperty("right", "12px", "important");
        btn.style.setProperty("left", "auto", "important");
        btn.style.setProperty("bottom", "auto", "important");
        btn.style.setProperty("top", clampTop(topPx) + "px", "important");
      };
      const loadFabTop = () => {
        let saved = null;
        try { saved = GM_getValue("adpb-fabTop", null); } catch (e) {}
        if (typeof saved === "number" && isFinite(saved)) return clampTop(saved);
        return clampTop((window.innerHeight || 600) - 64);
      };
      const placePanel = () => {
        const br = btn.getBoundingClientRect();
        const ph = panel.offsetHeight || 300;
        let top = br.top - ph - 8;
        if (top < 8) top = br.bottom + 8;
        const maxTop = Math.max(8, (window.innerHeight || 600) - Math.min(ph, (window.innerHeight || 600) - 16) - 8);
        if (top > maxTop) top = maxTop;
        panel.style.setProperty("right", "12px", "important");
        panel.style.setProperty("left", "auto", "important");
        panel.style.setProperty("bottom", "auto", "important");
        panel.style.setProperty("top", top + "px", "important");
      };
      applyFabTop(loadFabTop());

      const drag = { active: false, moved: false, startY: 0, origTop: 0, pointerId: null };
      btn.addEventListener("pointerdown", (e) => {
        if (e.button != null && e.button !== 0) return;
        drag.active = true;
        drag.moved = false;
        drag.startY = e.clientY;
        drag.origTop = btn.getBoundingClientRect().top;
        drag.pointerId = e.pointerId;
        try { btn.setPointerCapture(e.pointerId); } catch (err) {}
      });
      btn.addEventListener("pointermove", (e) => {
        if (!drag.active) return;
        const dy = e.clientY - drag.startY;
        if (!drag.moved && Math.abs(dy) < 5) return;
        drag.moved = true;
        btn.classList.add("adpb-dragging");
        applyFabTop(drag.origTop + dy);
        if (panel.classList.contains("adpb-open")) placePanel();
      });
      const endDrag = () => {
        if (!drag.active) return;
        drag.active = false;
        btn.classList.remove("adpb-dragging");
        try { if (drag.pointerId != null) btn.releasePointerCapture(drag.pointerId); } catch (err2) {}
        if (drag.moved) {
          try { GM_setValue("adpb-fabTop", clampTop(btn.getBoundingClientRect().top)); } catch (e3) {}
          if (panel.classList.contains("adpb-open")) placePanel();
        }
      };
      btn.addEventListener("pointerup", endDrag);
      btn.addEventListener("pointercancel", endDrag);

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (drag.moved) { drag.moved = false; return; }
        const open = panel.classList.toggle("adpb-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) placePanel();
      });

      document.addEventListener(
        "click",
        (e) => {
          if (!panel.classList.contains("adpb-open")) return;
          const t = e.target;
          if (t === btn || btn.contains(t) || t === panel || panel.contains(t)) return;
          panel.classList.remove("adpb-open");
          btn.setAttribute("aria-expanded", "false");
        },
        true,
      );

      window.addEventListener("resize", () => {
        applyFabTop(loadFabTop());
        if (panel.classList.contains("adpb-open")) placePanel();
      });

      document.body.appendChild(panel);
      document.body.appendChild(btn);
      return true;
    },

    start() {
      const tryMount = () => this.mount();
      if (tryMount()) return;
      const obs = new MutationObserver(() => {
        if (tryMount()) obs.disconnect();
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", tryMount, { once: true });
      }
    },
  };


  // ============================================
  // MENU
  // ============================================

  function setupMenu() {
    for (const [key, setting] of Object.entries(Settings)) {
      GM_registerMenuCommand(
        `${setting.value ? "\u2713" : "\u2717"} ${setting.displayName}`,
        () => {
          setting.toggle();
          try {
            applySettingsLive();
          } catch (e) {}
          const state = setting.value ? "enabled" : "disabled";
          alert(`${setting.displayName} ${state}.`);
        },
      );
    }
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function setupMutationObserver() {
    let timeoutId = null;
    const observer = new MutationObserver((mutations) => {
      let shouldProcess = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          shouldProcess = true;
          break;
        }
      }

      if (shouldProcess) {
        if (!timeoutId) {
          timeoutId = setTimeout(() => {
            processPage();
            timeoutId = null;
          }, CONFIG.throttleDelay);
        }
      }
    });

    const target = document.documentElement || document.body;
    if (target) {
      observer.observe(target, {
        childList: true,
        subtree: true,
      });
      debug("MutationObserver setup");
    }
  }

  function init() {
    debug("Initializing...");

    setupMenu();
    SettingsRail.start();
    setupMutationObserver();

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", processPage);
    } else {
      processPage();
    }

    debug("Ready");
  }

  function safeInit() {
    try {
      init();
    } catch (error) {
      console.error(
        "[Amazon Dark Pattern Blocker] Initialization failed:",
        error,
      );
    }
  }

  // Inject CSS rules immediately (before paint) to prevent flash of unwanted content
  try {
    injectStyles();
  } catch (error) {
    console.error("[Amazon Dark Pattern Blocker] CSS injection failed:", error);
  }

  // Initialize immediately
  safeInit();

  // Continuous polling for dynamic content + SPA navigation detection
  let lastUrl = location.href;
  setInterval(() => {
    processPage();

    if (location.href !== lastUrl) {
      debug(`Navigation detected: ${lastUrl} -> ${location.href}`);
      lastUrl = location.href;
    }
  }, CONFIG.pollInterval);
})();
