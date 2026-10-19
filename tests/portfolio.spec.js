import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("project tabs, modal exploration, and focus restoration work", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("tab", { name: /Reply Mirror/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /MediSense/ })).toBeFocused();
  await expect(page.locator(".system-explorer")).toHaveAttribute(
    "data-project",
    "medisense",
  );
  await page
    .getByRole("button", { name: "Inspect OCR and isolation stage" })
    .click();
  await expect(page.locator(".system-inspector")).toContainText(
    "Isolated patient report evidence",
  );
  const opener = page.getByRole("button", {
    name: "Explore architecture of UFC Fight Predictor",
  });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator(".system-explorer")).toHaveAttribute(
    "data-project",
    "ufc",
  );
  await expect(dialog.locator(".system-explorer")).toHaveAttribute(
    "data-renderer",
    "ready",
  );
  await dialog
    .getByRole("button", { name: "Inspect Pre-fight snapshots stage" })
    .click();
  await expect(dialog.locator(".system-inspector")).toContainText(
    "18,136 pre-fight snapshots",
  );
  await dialog.getByRole("tab", { name: /CI\/CD/ }).click();
  await dialog
    .getByRole("button", { name: "Inspect SHAP explanations stage" })
    .click();
  await expect(dialog.locator(".system-inspector")).toContainText(
    "Feature contributions",
  );
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map((item) => ({
      id: item.id,
      nodes: item.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});

test("animated layer inspection preserves stage positions and survives interruption", async ({
  page,
}) => {
  await page.goto("/");
  const nodes = page.locator(".system-node");
  await expect(page.locator(".system-explorer")).toHaveAttribute(
    "data-renderer",
    "ready",
  );
  await page.locator(".system-stage").scrollIntoViewIfNeeded();
  const positions = () =>
    nodes.evaluateAll((items) =>
      items.map((item) => ({
        x: parseFloat(item.style.left),
        y: parseFloat(item.style.top),
      })),
    );
  const before = await positions();
  await page.getByRole("button", { name: "Inspect layers" }).click();
  await expect
    .poll(async () => (await positions())[0].y)
    .toBeLessThan(before[0].y - 3);
  await page.getByRole("button", { name: "Collapse layers" }).click();
  await page.getByRole("button", { name: "Inspect layers" }).click();
  await expect
    .poll(async () =>
      (await positions()).map(
        (point, i) => Math.abs(point.x - before[i].x) < 0.01,
      ),
    )
    .toEqual(before.map(() => true));
  await page.getByRole("button", { name: "Trace a request" }).click();
  await page.getByRole("tab", { name: /MediSense/ }).click();
  await expect(page.locator(".system-explorer")).toHaveAttribute(
    "data-renderer",
    "ready",
  );
  await expect(page.locator(".system-node")).toHaveCount(6);
  await expect(
    page.getByRole("button", { name: "Trace a request" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Inspect layers" }).click();
  await expect(page.getByLabel("Component layers")).toContainText(
    "Source material",
  );
});

test("homepage loads without errors and presents the updated career", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const failed = [];
  page.on("response", (response) => {
    if (
      response.status() >= 400 &&
      response.url().startsWith("http://127.0.0.1")
    )
      failed.push(response.url());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ahmed");
  await expect(page.locator("#experience")).toContainText(
    "Jul 2026 — Sep 2026",
  );
  await expect(page.locator("#experience")).toContainText(
    "Feb 2025 — Jun 2026",
  );
  await expect(page.locator("#experience")).not.toContainText("Current");
  const resume = page.getByRole("link", { name: "Download résumé PDF" });
  const response = await page.request.get(await resume.getAttribute("href"));
  expect(response.headers()["content-type"]).toContain("application/pdf");
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".portrait-frame img").scrollIntoViewIfNeeded();
  await expect(page.locator(".portrait-frame img")).toHaveJSProperty(
    "complete",
    true,
  );
  expect(
    await page
      .locator(".portrait-frame img")
      .evaluate((image) => image.naturalWidth),
  ).toBeGreaterThan(0);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
    fullPage: true,
    animations: "disabled",
    scale: "css",
  });
  expect(failed).toEqual([]);
  expect(errors).toEqual([]);
});

test("project notes and architecture controls work with keyboard input", async ({
  page,
}) => {
  await page.goto("/");
  const summary = page.locator(".project-details summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".project-details").first()).toHaveAttribute(
    "open",
    "",
  );
  await expect(
    page.getByText("Fraud signals arrive across behavior", { exact: false }),
  ).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator(".project-details").first()).not.toHaveAttribute(
    "open",
    "",
  );
  await expect(page.locator(".system-explorer")).toHaveAttribute(
    "data-renderer",
    "ready",
  );
  const geography = page.getByRole("button", {
    name: "Inspect Geography agent",
  });
  await geography.click();
  await expect(geography).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".system-inspector")).toContainText(
    "Geographic risk signals",
  );
  await page.getByRole("button", { name: "Inspect layers" }).click();
  await expect(
    page.getByRole("button", { name: "Collapse layers" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Trace a request" }).click();
  await expect(
    page.getByRole("button", { name: "Pause walkthrough" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pause walkthrough" }).click();
  await expect(
    page.getByRole("button", { name: "Resume walkthrough" }),
  ).toBeVisible();
});

test("all archive filters show the right projects", async ({
  page,
}, testInfo) => {
  await page.goto("/projects.html");
  await expect(page.locator(".archive-card")).toHaveCount(14);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const image of await page.locator(".archive-image img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(
      await image.evaluate((element) => element.naturalWidth),
    ).toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: `test-results/archive-${testInfo.project.name}.png`,
    fullPage: true,
    scale: "css",
  });
  await page.getByRole("button", { name: "AI & ML", exact: true }).click();
  await expect(page.locator(".archive-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Client work", exact: true }).click();
  await expect(page.locator(".archive-card")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "Orionex", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Web applications", exact: true })
    .click();
  await expect(page.locator(".archive-card")).toHaveCount(5);
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page.locator(".archive-card")).toHaveCount(14);
});

test("navigation, mobile menu, and deep links reach the intended sections", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("button", { name: "Close" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    await page.getByRole("button", { name: "Menu" }).click();
  }
  await page
    .getByRole("navigation")
    .getByRole("link", { name: /Experience/ })
    .click();
  await expect(page).toHaveURL(/#experience$/);
  if (isMobile)
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  await page.goto("/index.html#contact");
  await expect(
    page.getByRole("link", { name: "Send Ahmed an email" }),
  ).toBeInViewport();
});

test("pages have no horizontal overflow or WCAG A/AA violations", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/projects.html", "/privacy.html", "/terms.html"]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      route,
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      route,
    ).toEqual([]);
  }
  for (const width of [320, 375, 580, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `width ${width}`,
    ).toBe(true);
  }
});

test("reduced motion starts paused and clipboard failure is explained", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("denied")) },
    }),
  );
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Next stage" })).toBeVisible();
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toContainText("Copy unavailable");
});

test("copy email succeeds and unknown routes have a way home", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "ahmedayyan555@gmail.com",
  );
  await page.goto("/404.html");
  await expect(
    page.getByRole("heading", { name: "A wrong turn. An easy fix." }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Back to the portfolio", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ahmed");
  await page.goto("/missing/nested/");
  await expect(
    page.getByRole("heading", { name: "A wrong turn. An easy fix." }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Back to the portfolio", exact: true })
    .click();
  await expect(page).toHaveURL("http://127.0.0.1:4173/");
});

test("smooth scroll and the technology slider honor motion preferences", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (!isMobile) await expect(page.locator("html")).toHaveClass(/lenis/);
  await page.locator(".tech-section").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Pause technology slider" }).click();
  const track = page.locator(".tech-track");
  const stopped = await track.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await expect(
    page.getByRole("button", { name: "Play technology slider" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Play technology slider" }).click();
  await expect
    .poll(() =>
      track.evaluate((element) => getComputedStyle(element).transform),
    )
    .not.toBe(stopped);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await expect(page.locator(".tech-window")).toHaveClass(/is-static/);
  await expect(page.getByRole("button", { name: "Next stage" })).toBeVisible();
});

test("the architecture remains usable when WebGL is unavailable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
      if (kind.startsWith("webgl")) return null;
      return original.call(this, kind, ...args);
    };
  });
  await page.goto("/");
  await expect(page.locator(".system-explorer")).toHaveAttribute(
    "data-renderer",
    "fallback",
  );
  await page.getByRole("button", { name: "Inspect Decision agent" }).click();
  await expect(page.locator(".system-inspector")).toContainText(
    "A traceable fraud decision",
  );
  for (const [project, stage, output] of [
    ["MediSense", "OCR and isolation", "Isolated patient report evidence"],
    ["CI/CD", "SHAP explanations", "Feature contributions"],
    ["UFC", "Pre-fight snapshots", "Leakage-safe pre-fight records"],
  ]) {
    await page.getByRole("tab", { name: new RegExp(project) }).click();
    await expect(page.locator(".system-explorer")).toHaveAttribute(
      "data-renderer",
      "fallback",
    );
    await page.getByRole("button", { name: `Inspect ${stage} stage` }).click();
    await expect(page.locator(".system-inspector")).toContainText(output);
  }
});

test("architecture labels remain separate and within the stage at every size", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    for (const project of ["Reply Mirror", "MediSense", "CI/CD", "UFC"]) {
      await page.getByRole("tab", { name: new RegExp(project) }).click();
      await expect(page.locator(".system-explorer")).toHaveAttribute(
        "data-renderer",
        "ready",
      );
      await page.evaluate(() => document.fonts.ready);
      await page.locator(".system-stage").scrollIntoViewIfNeeded();
      for (const expanded of [false, true]) {
        if (expanded)
          await page.getByRole("button", { name: "Inspect layers" }).click();
        await expect
          .poll(
            () =>
              page.locator(".system-stage").evaluate((stage) => {
                const bounds = stage.getBoundingClientRect();
                const nodes = [...stage.querySelectorAll(".system-node")].map(
                  (node) => ({
                    name: node.textContent,
                    rect: node.getBoundingClientRect(),
                  }),
                );
                const issues = [];
                nodes.forEach(({ name, rect }, index) => {
                  if (
                    rect.top < bounds.top ||
                    rect.bottom > bounds.bottom ||
                    rect.left < bounds.left ||
                    rect.right > bounds.right
                  )
                    issues.push(`Clipped: ${name}`);
                  nodes.slice(index + 1).forEach((other) => {
                    if (
                      rect.left < other.rect.right &&
                      rect.right > other.rect.left &&
                      rect.top < other.rect.bottom &&
                      rect.bottom > other.rect.top
                    )
                      issues.push(`Overlap: ${name} / ${other.name}`);
                  });
                });
                return issues;
              }),
            { message: `width ${width}, expanded ${expanded}` },
          )
          .toEqual([]);
      }
    }
  }
});
