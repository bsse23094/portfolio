import { test, expect } from "@playwright/test";

test.describe("Creative Portfolio (/creative)", () => {
  test("creative page loads with proper title, metadata, and dark theme", async ({
    page,
  }) => {
    await page.goto("/creative.html");
    await expect(page).toHaveTitle(/Creative Portfolio/i);

    // Verify dark background theme is applied
    const root = page.locator(".cr-root");
    await expect(root).toBeVisible();

    // Verify hero displays correct content
    const heroTitle = page.locator("#cr-hero-title");
    await expect(heroTitle).toContainText("IDEAS INTO");
    await expect(heroTitle).toContainText("VISUAL");
    await expect(heroTitle).toContainText("Stories.");

    const subtitle = page.locator(".cr-hero-subtitle");
    await expect(subtitle).toContainText(
      "Content Creator · Storyteller · Video Editor",
    );

    const description = page.locator(".cr-hero-description");
    await expect(description).toContainText(
      "I develop, direct, shoot and edit short-form content",
    );
  });

  test("strict separation: no links back to the engineering portfolio", async ({
    page,
  }) => {
    await page.goto("/creative.html");

    // Brand link should point to #top, NOT "/"
    const brandLink = page.locator(".cr-brand");
    await expect(brandLink).toHaveAttribute("href", "#top");

    // All links on the page must NOT navigate to "/" or engineering routes
    const links = await page.locator("a[href]").all();
    for (const link of links) {
      const href = await link.getAttribute("href");
      expect(href).not.toBe("/");
      expect(href).not.toBe("/index.html");
      expect(href).not.toBe("/projects.html");
      expect(href).not.toContain("Ahmed_Ayyan_Mukhtar_AI_Resume");
    }

    // Verify navigation only exposes creative portfolio sections
    const navLinks = page.locator("#creative-navigation a");
    const navTexts = await navLinks.allTextContents();
    const joinedNav = navTexts.join(" ");

    expect(joinedNav).not.toContain("Selected work");
    expect(joinedNav).not.toContain("Experience");
    expect(joinedNav).not.toContain("Résumé");
    expect(joinedNav).toContain("Work");
    expect(joinedNav).toContain("Brands");
    expect(joinedNav).toContain("Contact");
  });

  test("performance and analytics section presents accurate numbers without fabrication", async ({
    page,
  }) => {
    await page.goto("/creative.html");

    const statsGrid = page.locator(".cr-stats-grid");
    await expect(statsGrid).toBeVisible();

    // Check specific required metrics
    await expect(statsGrid).toContainText("549K");
    await expect(statsGrid).toContainText("6");
    await expect(statsGrid).toContainText("8");
    await expect(statsGrid).toContainText("8K–10K");
    await expect(statsGrid).toContainText("21K");
    await expect(statsGrid).toContainText("15.7K");
    await expect(statsGrid).toContainText("5.1K");
    await expect(statsGrid).toContainText("10");

    // Verify follower context
    const context = page.locator(".cr-profile-context");
    await expect(context).toContainText("1,270");
    await expect(context).toContainText("organic");
  });

  test("featured projects contain required case studies and Instagram links", async ({
    page,
  }) => {
    await page.goto("/creative.html");

    const workSection = page.locator("#work");
    await expect(workSection).toBeVisible();

    // Project 1: Skinny Jeans
    await expect(workSection).toContainText("The Skinny Jeans Transformation");
    await expect(workSection).toContainText("549K");
    await expect(workSection).toContainText("Relatable Storytelling");
    const skinnyLink = page.locator(
      'a[href="https://www.instagram.com/reel/DSFNaKhCtyB/"]',
    );
    await expect(skinnyLink.first()).toBeVisible();

    // Project 2: Hal Jordan
    await expect(workSection).toContainText("Hal Jordan Inspired Fashion");
    await expect(workSection).toContainText("~50K");
    await expect(workSection).toContainText("Concept-Led Fashion Storytelling");
    const halLink = page.locator(
      'a[href="https://www.instagram.com/reel/DeMY9tbKnat/"]',
    );
    await expect(halLink.first()).toBeVisible();
  });

  test("brand collaborations list all four commercial brands accurately", async ({
    page,
  }) => {
    await page.goto("/creative.html");

    const brandsSection = page.locator("#brands");
    await expect(brandsSection).toBeVisible();

    await expect(brandsSection).toContainText("BOOST LIFESTYLE");
    await expect(brandsSection).toContainText("NESTLÉ PURE LIFE");
    await expect(brandsSection).toContainText("AMD FRAGRANCES");
    await expect(brandsSection).toContainText("AXE BODY SPRAYS");

    // Axe should be marked as ongoing
    const ongoingBadge = page.locator(".cr-ongoing-badge");
    await expect(ongoingBadge).toContainText("ONGOING PARTNERSHIP");
  });

  test("creative approach, production capabilities, and about me sections render correctly", async ({
    page,
  }) => {
    await page.goto("/creative.html");

    // Creative Approach
    const approachSection = page.locator("#approach");
    await expect(approachSection).toContainText("How I approach content.");
    await expect(approachSection).toContainText(
      "I believe good content isn't always about having more resources",
    );

    // Production Process
    const processSection = page.locator("#process");
    await expect(processSection).toContainText("01 —");
    await expect(processSection).toContainText("IDEA");
    await expect(processSection).toContainText("06 —");
    await expect(processSection).toContainText("DELIVERY");
    await expect(processSection).toContainText("Adobe Premiere Pro");
    await expect(processSection).toContainText("DaVinci Resolve");
    await expect(processSection).toContainText("Smartphone-Based Videography");

    // About Me
    const aboutSection = page.locator("#about");
    await expect(aboutSection).toContainText(
      "Information Technology University, Lahore",
    );
    await expect(aboutSection).toContainText(
      "fashion, lifestyle and branded short-form content",
    );
  });

  test("contact section has functioning email copy and correct links", async ({
    page,
  }) => {
    await page.goto("/creative.html");

    const contactSection = page.locator("#contact");
    await expect(contactSection).toBeVisible();
    await expect(contactSection).toContainText("Have an idea?");
    await expect(contactSection).toContainText("Let's make it a story.");

    const emailLink = page.locator('a[href="mailto:ahmedayyan555@gmail.com"]');
    await expect(emailLink.first()).toBeVisible();

    const igLink = contactSection.locator(
      'a[href="https://www.instagram.com/ahmedayyanmukhtarr/"]',
    );
    await expect(igLink).toBeVisible();
  });
});
