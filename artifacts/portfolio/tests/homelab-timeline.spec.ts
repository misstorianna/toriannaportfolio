import { expect, test } from "@playwright/test";

const milestones = [
  "Build the Linux foundation",
  "Understand the home network",
  "Move the stack to Ubuntu",
  "Add network detection with Suricata",
  "Add threat intelligence with CrowdSec",
  "Centralize logs and build views",
];

test("separates the website and detection system into focused Homelab panels", async ({ page }) => {
  await page.goto("/");

  const projectTabs = page.getByRole("tablist", { name: "Homelab projects" });
  const overviewTab = projectTabs.getByRole("tab", { name: "Overview" });
  const websiteTab = projectTabs.getByRole("tab", { name: "This Website" });
  const detectionTab = projectTabs.getByRole("tab", { name: "Detection System" });
  const homelabSection = page.locator("#homelab");

  await expect(overviewTab).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#homelab-panel-overview")).toBeVisible();
  await expect(page.locator("#homelab-panel-website")).toHaveCount(0);
  await expect(page.locator("#homelab-panel-detection")).toHaveCount(0);
  const overviewHeight = Math.round(await homelabSection.evaluate(element => element.getBoundingClientRect().height));

  await overviewTab.press("ArrowRight");
  await expect(websiteTab).toBeFocused();
  await expect(websiteTab).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#homelab-panel-website")).toBeVisible();
  await expect(page.locator("#homelab-panel-detection")).toHaveCount(0);
  await expect(page.getByText("GitHub commit")).toBeVisible();
  const websiteHeight = Math.round(await homelabSection.evaluate(element => element.getBoundingClientRect().height));

  await detectionTab.click();
  await expect(detectionTab).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#homelab-panel-detection")).toBeVisible();
  await expect(page.locator("#homelab-panel-website")).toHaveCount(0);
  await expect(page.getByText("GitHub commit")).toHaveCount(0);
  const detectionHeight = Math.round(await homelabSection.evaluate(element => element.getBoundingClientRect().height));

  expect(websiteHeight).toBe(overviewHeight);
  expect(detectionHeight).toBe(overviewHeight);
});

test("keeps all Homelab milestones selectable and keyboard accessible", async ({ page }) => {
  await page.goto("/");

  const projectTabs = page.getByRole("tablist", { name: "Homelab projects" });
  await expect(projectTabs.getByRole("tab")).toHaveCount(3);
  await expect(projectTabs.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");
  await projectTabs.getByRole("tab", { name: "Detection System" }).click();

  const tabList = page.getByRole("tablist", { name: "Homelab build milestones" });
  const tabs = tabList.getByRole("tab");
  const panel = page.locator("#homelab-build-step-panel");
  const previousButton = page.getByRole("button", { name: "Show previous homelab milestone" });
  const nextButton = page.getByRole("button", { name: "Show next homelab milestone" });

  await expect(tabs).toHaveCount(milestones.length);
  await expect(previousButton).toBeDisabled();
  await expect(nextButton).toBeEnabled();
  await expect(panel).toContainText(milestones[0]);
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
  await expect(tabs.nth(0)).toHaveAttribute("tabindex", "0");
  await expect(tabs.nth(1)).toHaveAttribute("tabindex", "-1");

  for (const [index, title] of milestones.entries()) {
    await tabs.nth(index).click();
    await expect(tabs.nth(index)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(index)).toHaveAttribute("tabindex", "0");
    await expect(panel).toContainText(title);

    if (index > 0) {
      await expect(tabs.nth(index - 1)).toHaveAttribute("aria-selected", "false");
      await expect(tabs.nth(index - 1)).toHaveAttribute("tabindex", "-1");
    }
  }

  await expect(previousButton).toBeEnabled();
  await expect(nextButton).toBeDisabled();

  await tabs.nth(0).focus();
  await tabs.nth(0).press("ArrowRight");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(panel).toContainText(milestones[1]);

  await tabs.nth(1).press("ArrowLeft");
  await expect(tabs.nth(0)).toBeFocused();
  await expect(panel).toContainText(milestones[0]);

  await tabs.nth(0).press("End");
  await expect(tabs.nth(milestones.length - 1)).toBeFocused();
  await expect(panel).toContainText(milestones[milestones.length - 1]);
  await expect(previousButton).toBeEnabled();
  await expect(nextButton).toBeDisabled();

  await tabs.nth(milestones.length - 1).press("Home");
  await expect(tabs.nth(0)).toBeFocused();
  await expect(panel).toContainText(milestones[0]);
  await expect(previousButton).toBeDisabled();
  await expect(nextButton).toBeEnabled();
});

test.describe("on narrow mobile screens", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("keeps the milestone strip scrollable without clipping the detail panel", async ({ page }) => {
    await page.goto("/");

    const homelabSection = page.locator("#homelab");
    const overviewHeight = Math.round(await homelabSection.evaluate(element => element.getBoundingClientRect().height));

    await page.getByRole("tablist", { name: "Homelab projects" })
      .getByRole("tab", { name: "Detection System" })
      .click();
    const detectionHeight = Math.round(await homelabSection.evaluate(element => element.getBoundingClientRect().height));
    expect(detectionHeight).toBe(overviewHeight);

    const tabList = page.getByRole("tablist", { name: "Homelab build milestones" });
    const tabs = tabList.getByRole("tab");
    const milestoneScroller = tabList.locator("..");
    const panel = page.locator("#homelab-build-step-panel");
    const previousButton = page.getByRole("button", { name: "Show previous homelab milestone" });
    const nextButton = page.getByRole("button", { name: "Show next homelab milestone" });

    await expect(tabs).toHaveCount(milestones.length);
    await expect(milestoneScroller).toHaveCSS("overflow-x", "auto");
    await expect.poll(() => milestoneScroller.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);

    for (const [index, title] of milestones.entries()) {
      const tab = tabs.nth(index);
      await tab.scrollIntoViewIfNeeded();
      await expect(tab).toBeInViewport();
      await tab.click();

      await expect(tab).toHaveAttribute("aria-selected", "true");
      await expect(panel).toContainText(title);
      if (index === 0) {
        await expect(previousButton).toBeDisabled();
      } else {
        await expect(previousButton).toBeEnabled();
      }
      if (index === milestones.length - 1) {
        await expect(nextButton).toBeDisabled();
      } else {
        await expect(nextButton).toBeEnabled();
      }

      const panelMetrics = await panel.evaluate(element => {
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          viewportWidth: window.innerWidth,
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
        };
      });
      expect(panelMetrics.left).toBeGreaterThanOrEqual(0);
      expect(panelMetrics.right).toBeLessThanOrEqual(panelMetrics.viewportWidth);
      expect(panelMetrics.scrollWidth).toBeLessThanOrEqual(panelMetrics.clientWidth);
    }

    await tabs.nth(0).focus();
    await tabs.nth(0).press("End");
    await expect(tabs.nth(milestones.length - 1)).toBeFocused();
    await expect(panel).toContainText(milestones[milestones.length - 1]);
    await expect(previousButton).toBeEnabled();
    await expect(nextButton).toBeDisabled();
    await expect.poll(() => milestoneScroller.evaluate(element => element.scrollLeft > 0)).toBe(true);

    await tabs.nth(milestones.length - 1).press("Home");
    await expect(tabs.nth(0)).toBeFocused();
    await expect(panel).toContainText(milestones[0]);
    await expect(previousButton).toBeDisabled();
    await expect(nextButton).toBeEnabled();
  });
});