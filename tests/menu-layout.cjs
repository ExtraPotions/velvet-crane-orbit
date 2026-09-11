const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1100, height: 1400 } });
    await context.route('https://www.amazon.com/**', route => route.fulfill({
      contentType: 'text/html; charset=utf-8', body: '<main style="height:2500px;background:#eef0f2;padding:30px;font:20px system-ui">Amazon product page - local test fixture<div id="primeDPUpsellStaticContainerNPA">Join Prime</div><div id="sp_detail">Sponsored products</div></main>'
    }));
    await context.addInitScript(() => {
      window.GM_getValue = (key, fallback) => key === 'adpb-fabTop' ? 1250 : fallback;
      window.GM_setValue = () => {};
      window.GM_registerMenuCommand = () => {};
    });
    await context.addInitScript({ content: fs.readFileSync('amazon-dark-pattern-blocker.user.js', 'utf8') });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('https://www.amazon.com/dp/fixture');
    const fab = page.locator('#adpb-settings-fab');
    const panel = page.getByRole('dialog');
    await fab.click();
    const settle = () => page.waitForTimeout(100);
    await settle();
    assert.equal(await panel.locator('.adpb-subtitle').textContent(), 'Hide Amazon ads, upsells & pressure tactics.');
    assert.equal(await panel.locator('[data-metric=hidden]').textContent(), '2');
    assert.equal(await panel.locator('[data-metric=advertising]').textContent(), '1');
    assert.equal(await panel.locator('[data-metric=promotions]').textContent(), '1');
    const prime = page.locator('#primeDPUpsellStaticContainerNPA');
    await panel.getByRole('button', { name: 'Show hidden items', exact: true }).click();
    assert.equal(await prime.isVisible(), true);
    await page.mouse.move(0, 0);
    assert.equal(await prime.evaluate(el => getComputedStyle(el).opacity), '0.55');
    await prime.hover();
    assert.equal(await prime.evaluate(el => getComputedStyle(el).opacity), '1');
    assert.equal(await panel.locator('[data-metric=hidden]').textContent(), '2', 'reveal does not count a new block');
    await panel.getByRole('button', { name: 'Hide revealed items', exact: true }).click();
    assert.equal(await prime.isVisible(), false);
    assert.equal(await panel.locator('[data-metric=hidden]').textContent(), '2', 'rehide does not count a new block');
    await panel.getByRole('button', { name: 'Show hidden items', exact: true }).click();
    await page.evaluate(() => {
      const ad = document.createElement('div');
      ad.id = 'sp_detail_thematic';
      ad.style.display = 'flex';
      ad.textContent = 'New sponsored content';
      document.body.prepend(ad);
    });
    await page.waitForFunction(() => document.getElementById('sp_detail_thematic').dataset.adpbRevealed === 'true');
    assert.equal(await page.locator('#sp_detail_thematic').isVisible(), true);
    await panel.getByRole('button', { name: 'Hide revealed items', exact: true }).click();
    assert.equal(await page.locator('#sp_detail_thematic').isVisible(), false);
    assert.equal(await panel.getAttribute('data-placement'), 'above');
    await panel.getByRole('button', { name: /^Advanced/ }).click();
    await settle();
    const before = await panel.boundingBox();
    const launcherBefore = await fab.boundingBox();
    await panel.getByRole('button', { name: 'About & diagnostics', exact: true }).click();
    await settle();
    const after = await panel.boundingBox();
    assert(after.y < before.y, 'expanded panel moves upward');
    assert(Math.abs(after.y + after.height - before.y - before.height) < 2, 'bottom anchor stays fixed');
    assert.deepEqual(await fab.boundingBox(), launcherBefore, 'expansion does not move launcher');

    await page.mouse.move(launcherBefore.x + 24, launcherBefore.y + 24);
    await page.mouse.down();
    await page.mouse.move(launcherBefore.x + 24, 100, { steps: 12 });
    await page.mouse.up();
    await settle();
    assert.equal(await panel.getAttribute('data-placement'), 'below');

    for (const name of ['Display', 'Blocked this session', 'Keyboard shortcut']) {
      await panel.getByRole('button', { name, exact: true }).click();
    }
    await panel.getByRole('textbox', { name: 'Open menu shortcut' }).focus();
    await page.keyboard.press('Tab');
    assert.equal(await panel.evaluate(el => el.contains(el.getRootNode().activeElement)), true);
    await panel.getByRole('button', { name: 'About & diagnostics', exact: true }).click();
    for (const viewport of [
      { width: 1100, height: 700 }, { width: 360, height: 640 },
      { width: 320, height: 480 }, { width: 800, height: 360 },
      { width: 360, height: 280 }, { width: 1100, height: 900 }
    ]) {
      await page.setViewportSize(viewport);
      await settle();
      const box = await panel.boundingBox();
      assert(box.x >= -1 && box.y >= -1 && box.x + box.width <= viewport.width + 1 && box.y + box.height <= viewport.height + 1, JSON.stringify({ viewport, box }));
      assert.equal(await panel.evaluate(el => el.scrollHeight > el.clientHeight + 1), false, 'panel itself never overflows');
      const header = panel.locator('.adpb-header');
      const headerBefore = await header.boundingBox();
      const active = panel.locator('.adpb-section.is-open > .adpb-section-content');
      await active.evaluate(el => { el.scrollTop = el.scrollHeight; });
      if (viewport.height <= 480) assert(await active.evaluate(el => el.scrollTop > 0), 'active section actually scrolls');
      assert.deepEqual(await header.boundingBox(), headerBefore, 'scroll leaves header fixed');
      assert.equal(await panel.evaluate(el => el.scrollTop), 0);
      assert.equal(await page.evaluate(() => window.scrollY), 0);
      const closeBox = await panel.getByRole('button', { name: 'Close settings' }).boundingBox();
      assert(closeBox.y >= box.y && closeBox.y + closeBox.height <= box.y + box.height);
      if (viewport.width <= 600) {
        assert.equal(await fab.isVisible(), false, 'launcher cannot cover bottom sheet controls');
        assert.equal(await panel.getAttribute('data-placement'), 'sheet');
        assert.equal(Math.round(box.width), viewport.width);
        assert(Math.abs(box.y + box.height - viewport.height) < 2);
      }
      if (viewport.height < 560) {
        await panel.getByRole('combobox', { name: 'Settings category' }).selectOption('promotions');
        await settle();
        assert.equal(await panel.locator('.adpb-section.is-open').getAttribute('data-category'), 'promotions');
        await panel.getByRole('combobox', { name: 'Settings category' }).selectOption('advanced');
      } else {
        const headings = await panel.locator('.adpb-section-toggle').all();
        for (const heading of headings) {
          const rect = await heading.boundingBox();
          assert(rect.y >= box.y && rect.y + rect.height <= box.y + box.height, 'category heading remains in view');
        }
      }
    }
    await panel.getByRole('button', { name: 'Close settings' }).focus();
    await page.keyboard.press('Shift+Tab');
    assert.equal(await panel.evaluate(el => el.contains(el.getRootNode().activeElement)), true, 'reverse tab stays inside panel');
    await page.keyboard.press('Tab');
    assert.equal(await panel.getByRole('button', { name: 'Close settings' }).evaluate(el => el === el.getRootNode().activeElement), true);
    fs.mkdirSync('test-results', { recursive: true });
    await page.screenshot({ path: 'test-results/adaptive-desktop.png' });
    await page.setViewportSize({ width: 390, height: 740 });
    await settle();
    await page.screenshot({ path: 'test-results/adaptive-mobile.png' });
    await page.keyboard.press('Escape');
    assert.equal(await panel.isVisible(), false);
    assert.equal(await fab.isVisible(), true);
    assert.equal(await fab.evaluate(el => el === el.getRootNode().activeElement), true);
    await page.setViewportSize({ width: 1100, height: 900 });
    await fab.click();
    await panel.getByRole('button', { name: /^Promotions/ }).click();
    await settle();
    await panel.screenshot({ path: 'test-results/menu-redesign-desktop.png' });
    await page.setViewportSize({ width: 390, height: 740 });
    await settle();
    await panel.screenshot({ path: 'test-results/menu-redesign-mobile.png' });
    await panel.getByRole('button', { name: /^Advanced/ }).click();
    await panel.getByRole('button', { name: 'Blocked this session', exact: true }).click();
    await panel.getByRole('button', { name: 'Clear stats', exact: true }).click();
    assert.deepEqual(await panel.locator('.adpb-footer-stat-value').allTextContents(), ['0', '0', '0']);
    assert.deepEqual(errors, []);
    console.log('Adaptive placement, growth, section scrolling, small viewports and keyboard navigation passed');
    await context.close();
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
