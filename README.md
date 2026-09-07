# Amazon Dark Pattern Blocker

<p align="center">
  <img src="icon-128.png" width="128" height="128" alt="Amazon Dark Pattern Blocker icon" />
</p>

<p align="center">
  Strip common Amazon dark patterns — Prime upsells, urgency, sponsored junk, Rufus, and more — with a floating settings panel.
</p>

<p align="center">
  <a href="https://github.com/ExtraPotions/velvet-crane-orbit/releases/latest"><img alt="Release" src="https://img.shields.io/github/v/release/ExtraPotions/velvet-crane-orbit?style=flat-square&label=release" /></a>
  <a href="https://github.com/ExtraPotions/velvet-crane-orbit/releases"><img alt="Downloads" src="https://img.shields.io/github/downloads/ExtraPotions/velvet-crane-orbit/total?style=flat-square" /></a>
  <a href="https://github.com/ExtraPotions/velvet-crane-orbit/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/ExtraPotions/velvet-crane-orbit?style=flat-square" /></a>
  <a href="https://github.com/ExtraPotions/velvet-crane-orbit/network/members"><img alt="Forks" src="https://img.shields.io/github/forks/ExtraPotions/velvet-crane-orbit?style=flat-square" /></a>
  <a href="https://github.com/ExtraPotions/velvet-crane-orbit/issues"><img alt="Issues" src="https://img.shields.io/github/issues/ExtraPotions/velvet-crane-orbit?style=flat-square" /></a>
  <a href="https://creativecommons.org/licenses/by-nc/4.0/"><img alt="License: CC BY-NC 4.0" src="https://img.shields.io/badge/license-CC%20BY--NC%204.0-lightgrey?style=flat-square" /></a>
</p>

**Author:** [expDARE](https://github.com/ExtraPotions) · **Latest:** [v0.1.33](https://github.com/ExtraPotions/velvet-crane-orbit/releases/tag/v0.1.33)

| Stat | Value |
|------|-------|
| Toggleable filters | **13** |
| Userscript | `amazon-dark-pattern-blocker.user.js` |
| Runs on | `.com` · `.co.uk` · `.ca` · `.de` · `.fr` · `.it` · `.es` · `.co.jp` · `.com.au` · `.in` · `.com.mx` · `.nl` |
| Storage | `GM_getValue` / `GM_setValue` |
| Managers | Violentmonkey (preferred), Tampermonkey, others |

## Install

1. Install [Violentmonkey](https://violentmonkey.github.io/) (preferred) or [Tampermonkey](https://www.tampermonkey.net/).
2. Download **`amazon-dark-pattern-blocker.user.js`** from the [latest release](https://github.com/ExtraPotions/velvet-crane-orbit/releases/latest).
3. Open the file (or drag it into the extension dashboard) and confirm install.
4. Visit a supported Amazon storefront — dark-pattern chrome gets stripped per your toggles.
5. Violentmonkey/Tampermonkey can auto-update from the GitHub release (`@downloadURL` / `@updateURL`).

## What it blocks

- Prime upsells and checkout interstitials  
- Urgency / scarcity tactics  
- Subscribe & Save nudges  
- Sponsored products and ad shelves  
- Credit-card, installment, and protection-plan upsells  
- Rufus / AI promo chrome  
- Amazon service and Business promos  
- Frequently bought together / carousel clutter  

Optional: auto-clip coupons, compact search results.

## Settings

Floating 48px icon button on the right (drag up/down). It keeps its saved dock position as the primary control and pushes registered ExtraPotions overlays away instead of moving. Drag it beside a page control to remember that dock target for future visits. The panel groups the 13 protections into collapsible Promotions, Advertising, Amazon services, AI, Convenience, and Advanced sections, keeping one group open at a time and up to five settings visible by default. Each option uses a keyboard-accessible toggle switch with a short description. Use the prominent **Protection** master switch to pause or resume all cleanup, or **Reset recommended** to restore defaults.

Most changes apply live without a refresh. The panel also shows per-session blocked-item totals by category and lets you clear those stats. The button’s identity label appears near the safest viewport edge and copies its name when clicked. Reduced-motion preferences are respected automatically, and **High contrast switches** strengthens the control borders and states.

### ExtraPotions control coordination

Controls from another ExtraPotions userscript can opt in to make room for this primary dock. Register its fixed or sticky element after it is created:

```js
window.ExtraPotionsControls.register(controlElement, {
  owner: "expDARE",
  role: "secondary",
});
```

No unrelated page element is moved based on its z-index.

## Testing

The dependency-free browser fixtures cover product and search selectors, master-toggle restoration, registry collision handling, stable docking, and page-type detection. Run `node tests/server.mjs`, then open <http://localhost:4173/tests/harness.html>.

## Releases

Run `powershell -ExecutionPolicy Bypass -File scripts/release.ps1 -Version 0.1.34` from the repository root. It updates the script and README version, commits, tags, and pushes. The tag-triggered GitHub workflow verifies the version, generates release notes, and uploads the userscript and icons.

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — Copyright (c) 2025–2026 **expDARE**. Attribution required. Non-commercial use only. Full text in [`LICENSE`](LICENSE).

## Changelog

See [GitHub Releases](https://github.com/ExtraPotions/velvet-crane-orbit/releases) for downloadable versions and notes.
