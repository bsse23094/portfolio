<!-- PROJECT LOGO -->
<p align="center">
  <img src="BATLOGO UPDATED.png" alt="Logo" width="120" height="120">
</p>

<h1 align="center">🚀 Modern Developer Portfolio</h1>

<p align="center">
  <b>A sleek, minimal, dark-themed portfolio for developers & tech creatives</b><br>
  <i>Clean typography • Strong hierarchy • Subtle motion • Responsive design</i>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Responsive-Yes-44cc11?style=for-the-badge">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge">
</p>

---

## ✨ Features

- 🌑 **Modern dark UI** with soft gradients and subtle depth
- 📱 **Responsive layout** for desktop, tablet, and mobile
- 🧩 **Reusable section patterns**: hero, about, experience, skills, projects, contact
- 🎨 **CSS variables** for quick theme customization
- 🌀 **Hover & entrance animations** for a polished feel
- 🗂️ **Grid-based layouts** for cards, stats, projects, contact
- 📝 **ATS-friendly content structure** for resume pairing

---

## 🏗 Tech Stack

- **HTML5** for structure  
- **CSS3** (`style-modern.css`) for layout, theme, animations, responsiveness  
- Optional vanilla **JavaScript** for scroll animations, navigation, or form handling

---

## 📂 File Structure

```bash
project-root/
├─ index.html
├─ style-modern.css
├─ /assets
│  ├─ images/       # project screenshots, avatar, logo
│  └─ icons/        # optional SVG icons
└─ README.md
```

- `index.html` – main portfolio page using the classes defined in style-modern.css
- `style-modern.css` – all core styling, layout, theme variables, and media queries

---

## 🚀 Getting Started

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

Link the stylesheet in your `index.html`:
```html
<link rel="stylesheet" href="style-modern.css">
```

Open the page in a browser:
- Double-click `index.html`, or
- Use a simple dev server:
  ```bash
  npx serve .
  # or
  python -m http.server 8000
  ```

Replace placeholder content (name, summary, experience, project details, contact info) with your own.

---

## 🎨 Theme & Customization

All primary styling is controlled by CSS variables in the `:root` section of `style-modern.css`:

```css
:root {
    --bg-primary: #0a0a0a;
    --bg-secondary: #141414;
    --bg-card: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #a1a1a1;
    --text-muted: #666666;
    --border-color: #2a2a2a;
    --hover-bg: #232323;
    --border-radius: 12px;
    --border-radius-lg: 16px;
    --container-width: 1200px;
}
```

**Quickly customize:**
- 🎨 Color palette: swap `--bg-*` and `--text-*` for dark/light themes
- 🟦 Accent: tweak `--hover-bg` and border colors
- 🟪 Card feel: adjust border radius for sharper/softer corners
- 🟫 Depth: modify shadow variables for stronger/softer depth
- 📏 Layout: change `--container-width` for max content width

---

## 🧱 Main Components & Sections

Your HTML can map to these classes:

1. **Header / Navigation**: `.gotham-header`, `.nav-link`
2. **Hero Section**: `.hero-section`, `.hero-content`, `.hero-title`, `.hero-subtitle`, `.hero-stats`
3. **About Section**: `.about-content`, `.about-card`, `.about-badge`
4. **Experience / Timeline**: `.timeline`, `.timeline-item`, `.timeline-title`, `.timeline-subtitle`
5. **Skills**: `.skills-container`, `.skill-category`, `.skill-items`, `.skill-bar`, `.skill-progress`
6. **Featured Projects**: `.featured-projects-grid`, `.featured-project-card`, `.featured-project-image`, `.tech-pill`
7. **Contact Section**: `.contact-grid`, `.contact-card`, `.contact-icon`, `.contact-form`
8. **Footer**: `.gotham-footer`, `.footer-content`, `.footer-links`, `.footer-bottom`

---

## 📱 Responsiveness

Key breakpoints:
- **≤ 1024px**: Hero/layout scale down, about switches to single column
- **≤ 768px**: Compact paddings/fonts, nav can be hidden or mobile
- **≤ 480px**: Typography scales, card paddings reduced

Flexible layout lets you wire in a mobile menu or JS navigation easily.

---

## 📝 Recommended Usage

- Pair with a matching PDF resume for job applications
- Use Featured Projects to highlight 3–6 strong, production-quality projects
- Keep text concise and impact-focused for minimalist style

---

## 📄 License

You are free to use, modify, and adapt this layout for personal and professional portfolios.
If you share it publicly, a small credit link back to your portfolio or repository is appreciated but not required.

---

<p align="center">
  <i>Made for developers</i>
</p>
