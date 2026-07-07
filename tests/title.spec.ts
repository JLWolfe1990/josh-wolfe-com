import { test, expect } from '@playwright/test';

test('has the correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Josh Wolfe | AI-Native Lead Engineer');
});
