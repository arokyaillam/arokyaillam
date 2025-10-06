import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct title and meta information', async ({ page }) => {
    await expect(page).toHaveTitle(/AROKYA ILLAM CHARITABLE TRUST/);

    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Healthcare and aided support/);
  });

  test('should display main navigation', async ({ page }) => {
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();

    // Check for key navigation links
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /programs/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /get support/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /donate/i })).toBeVisible();
  });

  test('should display hero section with CTAs', async ({ page }) => {
    // Check hero content
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Health, dignity, and access/);

    // Check CTA buttons
    await expect(page.getByRole('link', { name: /get support/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /donate now/i })).toBeVisible();
  });

  test('should display programs section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /our programs/i })).toBeVisible();

    // Check for program cards
    await expect(page.getByText(/Mental health wellness support/)).toBeVisible();
    await expect(page.getByText(/Patient care/)).toBeVisible();
    await expect(page.getByText(/Accessibility devices for mobility/)).toBeVisible();
  });

  test('should have working theme toggle', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /switch to dark theme/i });
    await expect(themeToggle).toBeVisible();

    // Theme toggle should be functional (basic check)
    await themeToggle.click();
  });

  test('should have working language switcher', async ({ page }) => {
    const langSwitcher = page.getByRole('group', { name: /language selection/i });
    await expect(langSwitcher).toBeVisible();

    // Should have English and Tamil options
    await expect(page.getByRole('button', { name: /english/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /தமிழ்/i })).toBeVisible();
  });

  test('should have accessible skip link', async ({ page }) => {
    // Tab to reveal skip link
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: /skip to main content/i })).toBeVisible();
  });

  test('should have proper footer with links', async ({ page }) => {
    await expect(page.getByRole('contentinfo')).toBeVisible(); // Footer landmark

    // Check for key footer links
    await expect(page.getByRole('link', { name: /privacy policy/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /terms of use/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /contact us/i })).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigation should still be accessible
    await expect(page.getByRole('button', { name: /toggle navigation menu/i })).toBeVisible();

    // Hero content should be visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

test.describe('Form Submission', () => {
  test('should allow contact form access', async ({ page }) => {
    await page.goto('/contact');

    // Check form elements
    await expect(page.getByRole('textbox', { name: /name/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('should allow volunteer form access', async ({ page }) => {
    await page.goto('/volunteer');

    // Check form elements
    await expect(page.getByRole('textbox', { name: /full name/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /submit volunteer application/i })).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Should have exactly one h1
    await expect(page.locator('h1')).toHaveCount(1);

    // Should have proper heading levels
    await expect(page.locator('h2')).toHaveCount(3); // Programs, Impact, CTA sections
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');

    // Check for images with alt text (logos, icons should have aria-hidden or alt text)
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const altText = await img.getAttribute('alt');
      // Either has alt text or is decorative (aria-hidden)
      expect(altText || await img.getAttribute('aria-hidden')).toBeTruthy();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: /skip to main content/i })).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: /AROKYA ILLAM CHARITABLE TRUST/i })).toBeFocused();
  });
});