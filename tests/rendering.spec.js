import { test, expect } from "@playwright/test";

test("3D accents share a context, stay idle, and preserve navigation after context loss", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    window.renderProbe = { contexts: [], draws: 0, architectureDraws: 0 };
    const original = HTMLCanvasElement.prototype.getContext;
    const seen = new WeakSet();
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      const context = original.call(this, type, ...args);
      if (type.startsWith("webgl") && context && !seen.has(context)) {
        seen.add(context);
        const architecture = !!this.closest(".system-stage");
        window.renderProbe.contexts.push({ context, architecture });
        for (const name of [
          "drawElements",
          "drawArrays",
          "drawElementsInstanced",
          "drawArraysInstanced",
        ]) {
          const draw = context[name];
          context[name] = function (...values) {
            window.renderProbe.draws++;
            if (architecture) window.renderProbe.architectureDraws++;
            return draw.apply(this, values);
          };
        }
      }
      return context;
    };
  });
  await page.goto("/");
  await expect(page.locator(".hero-copy .design-accent")).toHaveCount(0);
  await expect(page.locator(".system-explorer")).toHaveAttribute(
    "data-renderer",
    "ready",
  );
  for (const kind of ["rail", "orbit"]) {
    await page.locator(`.design-${kind}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`.design-${kind}`)).toHaveAttribute(
      "data-ready",
      "true",
    );
  }
  expect(await page.evaluate(() => renderProbe.contexts.length)).toBe(2);
  await page.evaluate(() => scrollTo(0, 0));
  await page.getByRole("tab", { name: /MediSense/ }).click();
  await expect(page.locator(".system-explorer")).toHaveAttribute(
    "data-renderer",
    "ready",
  );
  await page.getByRole("tab", { name: /Reply Mirror/ }).click();
  await expect(page.locator(".system-explorer")).toHaveAttribute(
    "data-renderer",
    "ready",
  );
  await page.locator(".system-stage").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".system-node")
        .first()
        .evaluate((node) => parseFloat(node.style.top)),
    )
    .toBeGreaterThan(0);
  // Let the final resize/visibility notifications settle before measuring idle.
  await page.waitForTimeout(350);
  const idle = await page.evaluate(() => renderProbe.draws);
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => renderProbe.draws)).toBe(idle);
  await page.evaluate(() => {
    renderProbe.architectureDraws = 0;
  });
  await page.getByRole("button", { name: "Inspect Geography agent" }).click();
  await expect
    .poll(() => page.evaluate(() => renderProbe.architectureDraws))
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => renderProbe.architectureDraws)).toBeLessThan(
    45,
  );
  expect(
    await page.evaluate(
      () =>
        renderProbe.contexts.filter((item) => !item.context.isContextLost())
          .length,
    ),
  ).toBe(2);
  await page.evaluate(() =>
    renderProbe.contexts
      .find((item) => !item.architecture)
      .context.getExtension("WEBGL_lose_context")
      .loseContext(),
  );
  await expect(page.locator('.design-accent[data-ready="true"]')).toHaveCount(
    0,
  );
  await page
    .getByRole("navigation", { name: "Selected project index" })
    .getByRole("link", { name: /UFC/ })
    .click();
  await expect(page).toHaveURL(/#ufc$/);
  await expect(page.locator("#ufc h3")).toBeInViewport();
});
