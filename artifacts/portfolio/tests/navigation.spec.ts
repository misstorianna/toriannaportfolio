import { expect, test } from "@playwright/test";

const navigationItems = ["About", "Projects", "Experience", "Credentials", "Contact"];
const sectionIds = ["about", "projects", "experience", "credentials", "contact"];

test.describe("workspace navigation", () => {
  test("shows the requested order without Skills or a Dashboard workspace item", async ({ page }) => {
    await page.goto("/");

    const navigation = page.locator('aside[aria-label="Portfolio navigation"]');
    const items = navigation.locator("nav").getByRole("button");

    await expect(items).toHaveCount(navigationItems.length);
    for (const [index, label] of navigationItems.entries()) {
      await expect(items.nth(index)).toHaveAccessibleName(new RegExp(label));
    }
    await expect(navigation.getByRole("button", { name: "Skills" })).toHaveCount(0);
    await expect(navigation.getByRole("button", { name: /Dashboard/ })).toHaveCount(0);

    await expect(items.nth(0).locator(".qcr-nav-index")).toHaveText("01");
    await expect(items.nth(4).locator(".qcr-nav-index")).toHaveText("05");
    await expect(navigation.getByRole("button", { name: /Homelab/ })).toHaveCount(0);
    await expect(navigation.getByRole("button", { name: /Last Updated/ })).toHaveCount(0);
    await expect(page.locator("#updated")).toHaveCount(0);
    await expect(page.locator("#projects #homelab")).toHaveCount(1);
    await expect(page.getByTestId("text-last-updated")).toContainText("September 29, 2026");
  });

  for (const [index, label] of navigationItems.entries()) {
    test(`navigates to ${label}`, async ({ page }) => {
      await page.goto("/");

      const navigation = page.locator('aside[aria-label="Portfolio navigation"]');
      const item = navigation.getByRole("button", { name: new RegExp(label) });
      await item.click();

      await expect(page.locator(`#${sectionIds[index]}`)).toBeInViewport();
      await expect(item).toHaveAttribute("aria-current", "page");
      await expect(page.locator(".qcr-breadcrumb")).toContainText(label.toLowerCase());
    });
  }
});

test.describe("mobile workspace navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("closes the drawer after navigating", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation drawer" }).click();
    const navigation = page.locator('aside[aria-label="Portfolio navigation"]');
    await expect(navigation).toHaveClass(/is-open/);

    await navigation.getByRole("button", { name: "Projects" }).click();

    await expect(navigation).not.toHaveClass(/is-open/);
    await expect(page.locator("#projects")).toBeInViewport();
    await expect(navigation.getByRole("button", { name: "Projects" })).toHaveAttribute("aria-current", "page");
  });
});