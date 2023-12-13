import { test, expect } from '@playwright/test';

test('has root path', async ({ page }) => {
  await page.goto('./');

  await expect(page.getByRole('heading', { name: 'Josh Wolfe, M.B.A.' })).toBeVisible();
});

test('can navigate to all of the pages', async ({ page }) => {
  await page.goto('./home');

  // can navigate to skills
  await page.getByRole('link', { name: 'Skills' }).click();
  await expect(page.getByRole('main').getByRole('list').getByText('Name of Skill')).toBeVisible();

  // can navigate to experience and the first list item is expanded
  await page.getByRole('link', { name: 'Experience' }).click();
  await expect(page.getByText('Senior Full-Stack Software')).toBeVisible();
  await expect(page.getByText('Technical Scope: 100% Development')).toBeVisible();

  // can navigate to FAQs
  await page.getByRole('link', { name: 'FAQs' }).click();

  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.getByRole('heading', { name: 'Josh Wolfe, M.B.A.' })).toBeVisible();
});
