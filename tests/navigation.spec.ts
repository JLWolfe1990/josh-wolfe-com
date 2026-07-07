import { test, expect } from '@playwright/test';

test('homepage exposes the current professional positioning', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /I bridge customers, product, and engineering/i })).toBeVisible();
  await expect(page.getByText('Lead Engineer · FDE · AI Systems')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Blog' }).first()).toBeVisible();
});

test('blog index and article routes render', async ({ page }) => {
  await page.goto('/blog');

  await expect(page.getByRole('heading', { name: /Your Business Probably Needs a System/i })).toBeVisible();
  await page.getByRole('link').filter({ hasText: 'Where AI Actually Helps in a Real Business Workflow' }).click();

  await expect(page).toHaveURL(/\/blog\/ai-real-business-workflow$/);
  await expect(page.getByRole('heading', { name: /Where AI Actually Helps in a Real Business Workflow/i })).toBeVisible();
  await expect(page.getByText('6', { exact: true }).first()).toBeVisible();

  await page.goto('/blog/production-readiness-checklist');
  await expect(page.getByRole('heading', { name: /The Production Checklist I Want Before Anything Goes Live/i })).toBeVisible();
  await expect(page.getByText('production readiness checklist', { exact: false }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What should be on a production readiness checklist?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Related Posts' })).toBeVisible();
  await expect(page.locator('.blog-related-card')).toHaveCount(3);

  await page.goto('/blog/manual-workflow-internal-tool');
  await expect(page.getByRole('heading', { name: /How to Turn a Manual Workflow Into an Internal Tool/i })).toBeVisible();
  await expect(page.getByText('manual workflow', { exact: false }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Related Posts' })).toBeVisible();

  await page.goto('/blog/custom-software-project-scope');
  await expect(page.getByRole('heading', { name: /How I Scope a Custom Software Project Before Writing Code/i })).toBeVisible();
  await expect(page.getByText('software discovery', { exact: false }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Related Posts' })).toBeVisible();

  await page.goto('/blog/software-handoff-checklist');
  await expect(page.getByRole('heading', { name: /What a Good Software Handoff Looks Like/i })).toBeVisible();
  await expect(page.getByText('handoff', { exact: false }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Related Posts' })).toBeVisible();
});
