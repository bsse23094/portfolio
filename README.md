# Ahmed Ayyan — Portfolio

Personal portfolio for Ahmed Ayyan Mukhtar, a Software Engineering student and AI Engineer Intern. The site presents practical AI systems, full-stack work, and selected client projects at [ahmedayyan.codes](https://ahmedayyan.codes).

## Highlights

- React + Vite single codebase with static entry points for home, projects, privacy, and terms pages.
- Editorial, brutalist visual language with GSAP/ScrollTrigger interactions and Lenis smooth scrolling.
- AI project showcase for MediSense AI, A-EYE J.A.R.V.I.S., SentinelAI, Reply Mirror, and CI/CD failure prediction.
- Portfolio and résumé content are data-driven rather than repeated across page markup.
- Responsive design and reduced-motion support.

## Tech stack

- React 19, Vite, GSAP, ScrollTrigger, Lenis
- CSS with a custom visual system and Font Awesome icons
- GitHub Pages on the `gh-pages` branch with the custom domain `ahmedayyan.codes`

## Run locally

```bash
npm install
npm run dev
```

Use `npm run build` to create the production-ready `dist/` folder, or `npm run preview` to inspect that build locally.

## Deploy

```bash
npm run deploy
```

The deploy script builds the site and publishes `dist/` to the `gh-pages` branch. `public/CNAME` is copied into the build so GitHub Pages retains `ahmedayyan.codes`; `public/.nojekyll` disables Jekyll processing for the generated site.

## Project structure

- `src/App.jsx` — shared layout and page components
- `src/data/portfolio.js` — projects, résumé, social links, and page content
- `src/hooks/useMotion.js` — Lenis and GSAP/ScrollTrigger setup
- `src/app.css` — responsive visual system
- `src/assets/` — organized image and document assets
- `public/` — static deployment files, including the custom-domain configuration
