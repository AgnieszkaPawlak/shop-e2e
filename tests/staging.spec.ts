import { test, expect } from '@playwright/test';

const stagingUrl = process.env.STAGING_URL ?? process.env.BASE_URL;

test.describe('Staging', () => {
  test.beforeEach(() => {
    test.skip(
      !stagingUrl,
      'Set STAGING_URL or BASE_URL to run staging tests',
    );
  });

test(
  'homepage loads and backend is healthy',
  { tag: ['@smoke', '@critical'] },
  async ({ page, request }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: 'AHOP Shop' })
    ).toBeVisible();

    const health = await request.get('/api/health');
    expect(health.ok()).toBeTruthy();

    const versionResponse = await request.get('/api/version');
    expect(versionResponse.ok()).toBeTruthy();

    const version = await versionResponse.json();
    expect(version.version).toBe(process.env.APP_VERSION);
  }
);
});
