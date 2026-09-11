# Amazon Dark Pattern Blocker

<p align="center"><img src="icon-128.png" width="128" height="128" alt="Amazon Dark Pattern Blocker"></p>

Remove common Amazon dark patterns while keeping control over the protections you want.

[![Amazon ADPB v1.1.2](badge.svg)](https://github.com/ExtraPotions/velvet-crane-orbit/releases/tag/v1.1.2)

**Version 1.1.2** · By [expDARE](https://github.com/ExtraPotions) · [What's new](CHANGELOG.md)

## Features

- 12 toggleable protections, grouped into Promotions, Advertising, Amazon services, AI, Convenience and Advanced.
- Block Prime upsells, urgency/scarcity prompts and Subscribe & Save nudges.
- Remove sponsored products, ad shelves, credit-card and protection-plan promotions.
- Hide Rufus/AI chrome, service promos and Amazon Business nudges.
- Reduce frequently-bought-together and carousel clutter.
- Optional coupon auto-clipping and compact search results.
- Protection master switch to pause or resume cleanup.
- Display options and per-session blocked-item counts live under Advanced as nested menus.
- Optional quiet update checks use release metadata only and never download executable code.
- Clear stats sits with session stats; Reset recommended stays at the panel foot.
- Compact 280px charcoal menu with denser spacing, accessible toggle buttons and descriptions.
- Compact icon header, rounded category rows and sentence-case labels keep the menu easy to scan.
- Info buttons show descriptions on hover, keyboard focus or tap. Tap again or outside to dismiss; Escape dismisses help before closing the menu.
- Protection status shares one row with its master switch; Advanced submenus use light separators and minimal inset spacing.
- A short header explains the script; the footer shows live session counts for hidden items, ads and promotions.
- Show hidden items temporarily restores ADPB-hidden elements dimmed; hover or keyboard focus restores full contrast. Hide revealed items reapplies hiding without changing saved protections. Inspection ends on reload and does not undo clicks or other non-visual actions.
- Adaptive menu placement chooses the roomier side of the launcher and shifts upward as content expands.
- The title, close button and category navigation remain visible; overflow scrolls inside the expanded section.
- Small screens use a centered bottom sheet up to 280px wide. Very short viewports use a category selector to leave room for settings.
- High-contrast switches and automatic system reduced-motion support.
- Remembered launcher placement, including a preferred position beside a page control.
- Versioned settings are validated and migrated automatically when updating.
- Collapsible diagnostics report page detection, active protections, session totals, processing time and captured errors.
- A launcher coordination protocol publishes ownership, primary priority, preferred placement and occupied space for predictable companion positioning.
- An optional menu shortcut can be assigned or disabled, with collision warnings for other declared launchers.

Supports Amazon storefronts in the US, UK, Canada, Germany, France, Italy, Spain, Japan, Australia, India, Mexico and the Netherlands. Most settings apply immediately.

## Controls and companion plugins

[Desktop menu preview](docs/menu-desktop.png) · [Mobile menu preview](docs/menu-mobile.png)

Click the 48px rounded-square icon to open settings. **Escape** or an outside click closes the menu. Tab stays within the visible controls. Drag the launcher vertically to reposition it. Its identity label adapts to viewport edges and copies the plugin name when clicked.

The blocker recognizes other plugins made by expDARE and respects their positioning. **Amazon Dark Pattern Blocker and Theme Pickers always take primary position.** Overlapping secondary launchers make room without displacing either primary. Unrelated website controls are not moved.

## Install

Install Violentmonkey or Tampermonkey, then open the [latest userscript](https://github.com/ExtraPotions/velvet-crane-orbit/releases/latest/download/amazon-dark-pattern-blocker.user.js). Update the existing entry to retain settings and reload Amazon.

## License

[CC BY-NC 4.0](LICENSE) — Copyright (c) 2025–2026 expDARE. Attribution required; non-commercial use only.
