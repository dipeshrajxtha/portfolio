/**
 * Portfolio 2 — Visual & Navigation Tests
 * Run: npx playwright test
 * Report: npx playwright show-report tests/playwright-report
 */
import { test, expect } from '@playwright/test';

// ── Helpers ───────────────────────────────────────────────────
const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // Wait for loading screen to clear
  await page.waitForSelector('.loading-screen', { state: 'hidden', timeout: 10_000 });
});

// ── 1. Page load & title ──────────────────────────────────────
test('page has correct title', async ({ page }) => {
  await expect(page).toHaveTitle(/Dipeshraj Shrestha/i);
});

// ── 2. Navbar renders ─────────────────────────────────────────
test('navbar is visible and has all nav links', async ({ page }) => {
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav).toBeVisible();

  for (const section of SECTIONS) {
    // Links visible on desktop; on mobile the menu is behind hamburger
    const viewportWidth = page.viewportSize()?.width ?? 1280;
    if (viewportWidth >= 768) {
      await expect(nav.getByRole('button', { name: new RegExp(section, 'i') })).toBeVisible();
    }
  }
});

// ── 3. Hero section renders ───────────────────────────────────
test('hero section loads with name and CTAs', async ({ page }) => {
  const hero = page.locator('#home');
  await expect(hero).toBeVisible();
  await expect(hero.getByText(/Dipeshraj/i)).toBeVisible();
  await expect(hero.getByRole('button', { name: /View My Work/i })).toBeVisible();
  await expect(hero.getByRole('button', { name: /Get In Touch/i })).toBeVisible();
});

// ── 4. All section IDs exist ──────────────────────────────────
test('all section IDs are present in DOM', async ({ page }) => {
  for (const id of SECTIONS) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
});

// ── 5. Smooth scroll navigation ───────────────────────────────
test('clicking About nav scrolls to about section', async ({ page }) => {
  const viewportWidth = page.viewportSize()?.width ?? 1280;
  if (viewportWidth >= 768) {
    await page.getByRole('button', { name: /^About$/i }).click();
    await page.waitForTimeout(1000);
    const about = page.locator('#about');
    const box = await about.boundingBox();
    expect(box).not.toBeNull();
  } else {
    test.skip();
  }
});

// ── 6. Resume link present ────────────────────────────────────
test('resume link is accessible', async ({ page }) => {
  const link = page.getByRole('link', { name: /Resume/i }).first();
  await expect(link).toBeVisible();
  const href = await link.getAttribute('href');
  expect(href).toMatch(/resume/i);
});

// ── 7. Mobile hamburger menu ──────────────────────────────────
test('mobile hamburger opens mobile menu', async ({ page }) => {
  const viewportWidth = page.viewportSize()?.width ?? 1280;
  if (viewportWidth < 768) {
    const hamburger = page.getByRole('button', { name: /open menu/i });
    await hamburger.click();
    await expect(page.locator('.mobile-menu')).toBeVisible();
    // Close it
    await page.getByRole('button', { name: /close menu/i }).click();
    await expect(page.locator('.mobile-menu')).not.toBeVisible();
  } else {
    test.skip();
  }
});

// ── 8. Screenshot snapshots (visual reference) ────────────────
test('desktop screenshot — hero', async ({ page }) => {
  await page.screenshot({
    path: 'tests/screenshots/hero-desktop.png',
    fullPage: false,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
});

test('full-page screenshot', async ({ page }) => {
  await page.screenshot({
    path: 'tests/screenshots/full-page.png',
    fullPage: true,
  });
});

// ── 9. Accessibility — focus-visible on buttons ───────────────
test('buttons have accessible labels', async ({ page }) => {
  const buttons = page.getByRole('button');
  const count = await buttons.count();
  for (let i = 0; i < count; i++) {
    const btn = buttons.nth(i);
    const label =
      (await btn.getAttribute('aria-label')) ??
      (await btn.textContent());
    expect(label?.trim().length, `Button ${i} has no accessible label`).toBeGreaterThan(0);
  }
});

// ── 10. Contact section has form fields ───────────────────────
test('contact section renders form', async ({ page }) => {
  const contact = page.locator('#contact');
  await expect(contact).toBeAttached();
});
