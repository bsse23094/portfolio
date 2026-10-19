# Ahmed Ayyan — Engineering Portfolio

A personal portfolio focused on agentic AI, applied machine learning, and C#/.NET backend engineering. Built with React 19, Vite, and GSAP, and hosted on GitHub Pages at [ahmedayyan.codes](https://ahmedayyan.codes).

## Design and content

- An ivory, ink, and copper identity with locally hosted Manrope, Instrument Serif, and IBM Plex Mono fonts.
- A name-led editorial layout, asymmetric selected projects, and restrained copper accents.
- Four Three.js architecture studies: Reply Mirror, MediSense AI, the CI/CD Build Predictor, and the UFC Fight Predictor. Switch projects in the hero or open a larger explorer from a project card. Each study connects a design decision with documented evidence, selectable stages, and an illustrative walkthrough.
- Layer inspection lifts each component's internal stack vertically while keeping its footprint, routing, and camera fixed. Storage and document stages use distinct shapes, and the camera fits both layer states at each viewport size.
- GSAP entrance sequences, ScrollTrigger reveals and parallax, and a pausable technology rail with locally served icons.
- Three.js details integrated with navigation: a four-terminal project index links directly to the studies, and an open copper circuit frames the contact button with hover/focus feedback. Native links remain usable independently of the canvas.
- The decorative views share one WebGL renderer and copy completed frames to DOM-local 2D canvases. One GSAP scheduler wakes on interaction and detaches when settled. Resolution budgets, 24/30fps limits, offscreen suspension, modal suppression, reduced-motion rendering, SVG fallback, and context-loss cleanup keep the accents bounded.
- Four selected projects with 2D architecture diagrams, consistent metric/action rows, and progressively disclosed engineering notes. CI/CD and UFC diagrams reuse the 3D studies' stage graphs and switch to readable vertical layouts on phones.
- Experience date ranges use prominent Manrope numerals and a slim copper rule, with location as secondary text.
- Experience, education, leadership, project results, and downloadable PDF aligned with the supplied October 2026 CV.
- A 14-project archive with AI, web application, and client-work filters.
- Lenis wheel smoothing synchronized with the GSAP ticker, native touch scrolling, keyboard controls, reduced-motion support, and clipboard feedback.
- Compressed WebP images, local font licenses, page metadata, a social preview, sitemap, and a custom 404 page.

## Development

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Verification

```sh
npx playwright install chromium
npm run build
npm test
```

Playwright runs isolated Chromium checks at desktop and mobile sizes. The suite covers the updated experience, PDF delivery, project filters, keyboard-operated disclosures, mobile navigation, cross-page anchor links, Three.js controls, WebGL fallback, reduced motion, slider controls, clipboard handling, image assets, and overflow from 320px to 1440px. Architecture labels are checked for clipping and overlap in both layer modes. Rendering checks cover shared context count, no GPU draws while settled, batched architecture draw calls, absence of decorative hero effects, and context-loss recovery. Axe checks WCAG A/AA rules on all four main routes. These automated checks supplement visual review; they are not a complete accessibility certification.

At a 1440×1000 Chromium viewport, initializing the hero architecture and both accents used two WebGL contexts (previously four). A settled Reply Mirror node-selection update used 34 draw calls (previously 88). These are instrumented rendering counts, not a claim about frame rate on every device. Architecture pads and bases are instanced, routing geometry is prepared once, and label/material updates run only when scene state changes.

Generated screenshots and failure traces live in the ignored `test-results/` directory. Use `npm run format` to format source files.

## Content maintenance

- `src/data/portfolio.js` — professional details, projects, technologies, and links.
- `src/App.jsx` — homepage, shared layout, project archive, and secondary pages.
- `src/data/system.js` — explanatory agent roles and walkthrough stages, grounded in the Reply Mirror project summary.
- `src/data/projectSystems.js` — stage graphs, engineering decisions, and evidence for all four project studies; diagrams are conceptual explanations, not live inference or exact deployment diagrams.
- `src/components/SystemWorkbench.jsx` — keyboard-operated project tabs, modal exploration, and project-card launchers with focus restoration.
- `src/components/DesignAccent.jsx` — lazy accent mounting, live project selection, and non-interactive SVG fallbacks.
- `src/components/designScene.js` — shared renderer, event-driven scheduling, bounded resolution, 2D output surfaces, and context/resource lifecycle.
- `src/components/accentGeometry.js` — project-terminal and contact-circuit geometry with shared visual treatment.
- `src/components/PipelineVisual.jsx` ? responsive SVG architecture diagrams for CI/CD and UFC, using the shared project stage data.
- `src/components/ProjectSignalIndex.jsx` — native project navigation linked to the 3D terminal states.
- `src/components/SystemExplorer.jsx` — accessible controls, inspector, walkthrough, and interactive 2D fallback.
- `src/components/systemScene.js` — dynamically imported Three.js renderer; draws only on interaction or during a walkthrough, pauses outside the viewport, and disposes GPU resources on unmount.
- `src/components/TechRail.jsx` — looping GSAP technology slider; pauses on hover, user request, background tabs, and outside the viewport.
- `src/hooks/useMotion.js` — Lenis/ScrollTrigger integration, entrance sequences, section reveals, parallax, and subtle pointer interactions. Reduced motion removes smoothing and scroll animations.
- `src/app.css` and `src/refinement.css` — visual tokens, components, responsive layouts, and print styles.
- `src/assets/documents/Ahmed_Ayyan_Mukhtar_AI_Resume.pdf` — current downloadable CV.
- `public/fonts/` — locally served fonts and SIL Open Font License notices.
- `public/icons/` — technology logos from Simple Icons with license and source attribution.

Motion follows the official [Lenis/GSAP integration](https://github.com/darkroomengineering/lenis#gsap-scrolltrigger) and [ScrollTrigger refresh guidance](<https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh()/>). The architecture uses [Three.js picking](https://threejs.org/manual/en/picking.html) with native HTML buttons as its keyboard-accessible interface. If WebGL is unavailable, the same agent information remains available in a flat diagram. Reduced motion changes the walkthrough to manual stage advancement and the technology rail to a static list.

The accent renderer follows the [Three.js multiple-scenes approach](https://threejs.org/manual/pages/multiple-scenes.html), rendering separate views through one context and copying their results into local canvases.

Keep experience dates and quantitative claims grounded in the latest CV. Archive links can point to prototypes or third-party hosting; their availability is independent of this portfolio.

## Deployment

```sh
npm run deploy
```

This builds and publishes `dist/` to the `gh-pages` branch. `public/CNAME` retains the existing `ahmedayyan.codes` domain, and `.nojekyll` keeps GitHub Pages from applying Jekyll processing. No hosting or domain change is required.
