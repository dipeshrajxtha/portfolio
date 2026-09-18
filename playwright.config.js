import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration — Portfolio 2
 * Used for visual inspection, responsive testing, screenshot capture,
 * and interaction/navigation testing of the portfolio.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  workers: 1,

  reporter: [
    ['html', { outputFolder: 'tests/playwright-report', open: 'never' }],
    ['list'],
  ],

  use: {
    /* Base URL — adjust to your local dev server port */
    baseURL: 'http://localhost:5173',

    /* Always capture trace + screenshot on failure */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Viewport defaults to 1280×720 (desktop) */
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    /* ── Desktop ─────────────────────────────────── */
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },

    /* ── Tablet ──────────────────────────────────── */
    {
      name: 'iPad',
      use: {
        ...devices['iPad (gen 7)'],
        viewport: { width: 768, height: 1024 },
      },
    },

    /* ── Mobile ──────────────────────────────────── */
    {
      name: 'iPhone 14',
      use: {
        ...devices['iPhone 14'],
        viewport: { width: 390, height: 844 },
      },
    },
  ],

  /* Dev server — auto-start before tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
