import { test, expect } from '@playwright/test';

test('homepage exposes the current professional positioning', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /I bridge customers, product, and engineering/i })).toBeVisible();
  await expect(page.getByText('Lead Engineer · FDE · AI Systems')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Blog' }).first()).toBeVisible();
});

test('blog index and article routes render', async ({ page }) => {
  await page.goto('/blog');

  const firstArticle = page.locator('a.blog-index-card').first();
  const articleTitle = (await firstArticle.getByRole('heading', { level: 2 }).textContent())?.trim();
  const articleHref = await firstArticle.getAttribute('href');

  expect(articleTitle).toBeTruthy();
  expect(articleHref).toMatch(/^\/blog\/[a-z0-9-]+$/);

  await firstArticle.click();

  await expect(page).toHaveURL(new RegExp(`${articleHref}$`));
  await expect(page.getByRole('heading', { level: 1, name: articleTitle, exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Related Posts' })).toBeVisible();
});
