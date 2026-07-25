import { test, expect } from '@playwright/test';

test('homepage exposes the current professional positioning', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /I bridge customers, product, and engineering/i })).toBeVisible();
  await expect(page.getByText('Lead Engineer · FDE · AI Systems')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Blog' }).first()).toBeVisible();
});

test('blog index and article routes render', async ({ page }) => {
  await page.goto('/blog');

  await expect(page.getByRole('heading', { name: /Prompt Engineering for Code/i }).first()).toBeVisible();
  await page.getByRole('link').filter({ hasText: 'Prompt Engineering for Code' }).first().click();

  await expect(page).toHaveURL(/\/blog\/prompt-engineering-for-code$/);
  await expect(page.getByRole('heading', { name: /Prompt Engineering for Code: How to Get Production-Ready Output/i }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Use a Five-Layer Prompt' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Related Posts' })).toBeVisible();
});
