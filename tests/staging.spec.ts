import { test, expect } from '@playwright/test';

const stagingUrl = process.env.STAGING_URL ?? process.env.BASE_URL;

test.describe('Staging', () => {
  test.beforeEach(() => {
    test.skip(
      !stagingUrl,
      'Set STAGING_URL or BASE_URL to run staging tests',
    );
  });

  test('homepage loads and backend is healthy', async ({ page }) => {
    await page.goto(stagingUrl!);

    await expect(page.getByRole('heading', { name: 'AHOP Shop' })).toBeVisible();
    await expect(page.getByText('Frontend is running.')).toBeVisible();
    await expect(page.getByText('Backend status: UP')).toBeVisible();
    await expect(  page.getByText(`Application version: ${process.env.APP_VERSION}`)
    await expect(page.getByText('Application version: loading...')).toHaveCount(0);
    await expect(page.getByText('Backend unavailable')).toHaveCount(0);
  });
});
