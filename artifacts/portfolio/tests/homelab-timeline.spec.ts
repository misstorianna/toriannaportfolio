import { expect, test } from "@playwright/test";

const milestones = [
  "Build the Linux foundation",
  "Understand the home network",
  "Move the stack to Ubuntu",
  "Add network detection with Suricata",
  "Add threat intelligence with CrowdSec",
  "Centralize logs and build views",
  "Keep the public surface narrow",
  "Automate deployment with GitHub and cron",
];

test("keeps all Homelab milestones selectable and keyboard accessible", async ({ page }) => {
  await page.goto("/");

  const tabList = page.getByRole("tablist", { name: "Homelab build milestones" });
  const tabs = tabList.getByRole("tab");
  const panel = page.getByRole("tabpanel");
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