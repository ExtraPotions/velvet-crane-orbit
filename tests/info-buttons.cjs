const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  try {
    for (const touch of [false, true]) {
      const context = await browser.newContext({ viewport: touch ? { width: 390, height: 740 } : { width: 1000, height: 900 }, hasTouch: touch, isMobile: touch });
      await context.route('https://www.amazon.com/**', route => route.fulfill({ contentType: 'text/html', body: '<meta name="viewport" content="width=device-width,initial-scale=1"><main>Product details</main>' }));
      await context.addInitScript(() => {
        window.GM_getValue = (k, d) => d;
        window.GM_setValue = () => {};
        window.GM_registerMenuCommand = () => {};
      });
      await context.addInitScript({ content: fs.readFileSync('amazon-dark-pattern-blocker.user.js', 'utf8') });
      const page = await context.newPage();
      await page.goto('https://www.amazon.com/dp/fixture');
      await page.locator('#adpb-settings-fab').click();
      const panel = page.getByRole('dialog');
      const info = panel.getByRole('button', { name: 'About Remove Prime upsells', exact: true });
      const control = panel.getByRole('switch', { name: 'Remove Prime upsells', exact: true });
      const tooltip = page.getByRole('tooltip');
      const original = await control.getAttribute('aria-checked');
      assert.equal(await panel.locator('.adpb-setting-description').first().isVisible(), false);
      if (touch) {
        await info.tap();
        assert.equal(await tooltip.isVisible(), true);
        await info.tap();
        assert.equal(await tooltip.isVisible(), false);
        await info.tap();
      } else {
        await info.hover();
        assert.equal(await tooltip.isVisible(), true);
        await tooltip.hover();
        await page.waitForTimeout(220);
        assert.equal(await tooltip.isVisible(), true, 'tooltip stays open while hovered');
        await page.mouse.move(0, 0);
        await info.focus();
        assert.equal(await tooltip.isVisible(), true);
        await page.keyboard.press('Escape');
        assert.equal(await tooltip.isVisible(), false);
        assert.equal(await panel.isVisible(), true, 'first Escape dismisses only help');
        await info.click();
      }
      assert.match(await tooltip.textContent(), /Prime/);
      const box = await tooltip.boundingBox();
      const viewport = page.viewportSize();
      assert(box.x >= 0 && box.y >= 0 && box.x + box.width <= viewport.width && box.y + box.height <= viewport.height);
      const panelBox = await panel.boundingBox();
      fs.mkdirSync('test-results', { recursive: true });
      const x = Math.min(box.x, panelBox.x), y = Math.min(box.y, panelBox.y);
      await page.screenshot({path: `test-results/info-preview-${touch ? 'mobile' : 'desktop'}.png`, clip: {x, y, width: Math.max(box.x + box.width, panelBox.x + panelBox.width) - x, height: Math.max(box.y + box.height, panelBox.y + panelBox.height) - y}});
      assert.equal(await control.getAttribute('aria-checked'), original, 'info never toggles the setting');
      const other = panel.getByRole('button', { name: 'About Remove urgency tactics', exact: true });
      if (touch) await other.tap(); else await other.click();
      assert.equal(await info.getAttribute('aria-expanded'), 'false');
      assert.equal(await tooltip.count(), 1);
      assert.match(await tooltip.textContent(), /scarcity/);
      await panel.locator('.adpb-title').click();
      assert.equal(await tooltip.isVisible(), false);
      await info.click();
      await page.setViewportSize({ width: 320, height: 480 });
      await page.waitForTimeout(100);
      assert.equal(await tooltip.isVisible(), false, 'resizing dismisses stale help');
      await context.close();
    }
    console.log('Info buttons: hover, focus, touch, dismissal, bounds and switch isolation passed');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
