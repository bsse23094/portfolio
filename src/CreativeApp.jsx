import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Arrow from "./components/Arrow";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ahmedPortrait from "./assets/images/profile/ahmed-portrait.webp";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────── Data ───────────────────────── */

const PROFILE = {
  name: "Ahmed Ayyan Mukhtar",
  title: "Content Creator | Storyteller | Video Editor",
  email: "ahmedayyan555@gmail.com",
  instagram: "https://www.instagram.com/ahmedayyanmukhtarr/",
};

const PERFORMANCE_METRICS = [
  {
    value: "549K",
    label: "Highest reel views",
    detail: "Single reel organic reach without paid boosting",
  },
  {
    value: "6",
    label: "Reels exceeding 100K views",
    detail: "Viral organic distribution driven by relatable hooks",
  },
  {
    value: "8",
    label: "Reels between 50K–100K views",
    detail: "Consistent high-performing short-form content",
  },
  {
    value: "8K–10K",
    label: "Typical reel views",
    detail: "Reliable baseline across standard organic releases",
  },
  {
    value: "21K",
    label: "Highest likes on a reel",
    detail: "Peak engagement reflecting strong audience connection",
  },
  {
    value: "15.7K",
    label: "Second-highest likes",
    detail: "High audience resonance on concept-driven content",
  },
  {
    value: "5.1K",
    label: "Third-highest likes",
    detail: "Proven multi-campaign audience engagement",
  },
  {
    value: "10",
    label: "Reels with over 1K likes",
    detail: "Consistent engagement across fashion and storytelling",
  },
];

const FEATURED_PROJECTS = [
  {
    number: "01",
    title: "The Skinny Jeans Transformation",
    category: "Relatable Storytelling",
    positioning: "Relatable storytelling & audience understanding",
    metric: "549K",
    metricLabel: "organic views",
    url: "https://www.instagram.com/reel/DSFNaKhCtyB/",
    videoSrc: "/videos/skinny-jeans.mp4",
    tag: "549K ORGANIC REACH",
    likes: "21K",
    comments: "482",
    shares: "12.8K",
    caption:
      "It's important you listen to your sister when she tells you to ditch skinny jeans. 👖",
    audio: "Original Audio · Ahmed Ayyan Mukhtar",
    theme: "terracotta",
    sceneSubtitle: "2022 vs Present Day · Personal Fashion Evolution",
    concept:
      'A before-and-after fashion transformation using an old photograph from 2022 contrasted with present-day appearance. Caption: "It\'s important you listen to your sister when she tells you to ditch skinny jeans."',
    approach: [
      "Used a personal transformation as the relatable foundation.",
      "Framed an observant fashion commentary with authentic humor.",
      "Engineered sharp visual contrast between past and present styling.",
      "Tapped into a universally recognized experience among young fashion audiences.",
    ],
    responsibilities: [
      "Idea",
      "Concept",
      "Shooting",
      "On-camera performance",
      "Editing",
      "Final delivery",
    ],
  },
  {
    number: "02",
    title: "Hal Jordan Inspired Fashion",
    category: "Concept-Led Fashion Storytelling",
    positioning: "Concept-led fashion storytelling",
    metric: "~50K",
    metricLabel: "organic views",
    url: "https://www.instagram.com/reel/DeMY9tbKnat/",
    videoSrc: "/videos/hal-jordan.mp4",
    tag: "~50K ORGANIC REACH",
    likes: "3.2K",
    comments: "140",
    shares: "2.4K",
    caption: "Translating Hal Jordan into wearable university fashion. 🟢",
    audio: "Original Audio · Ahmed Ayyan Mukhtar",
    theme: "emerald",
    sceneSubtitle: "Pop Culture Reference · Green Lantern Campus Styling",
    concept:
      "A conceptual fashion reel inspired by Hal Jordan / Green Lantern. Translated a recognizable fictional character's aesthetic into a wearable, accessible outfit for university students.",
    approach: [
      "Translated a recognizable pop-culture character aesthetic into wearable everyday wear.",
      "Bridged fictional character motifs with modern campus fashion.",
      "Used styling choices, composition and color pacing to keep the reference accessible.",
    ],
    responsibilities: [
      "Idea",
      "Concept",
      "Styling",
      "Shooting",
      "On-camera performance",
      "Editing",
      "Final delivery",
    ],
  },
];

const BRAND_COLLABORATIONS = [
  {
    name: "BOOST LIFESTYLE",
    type: "Commercial Campaign",
    scope: "Ergonomic chair (2 reels + 1 story) · Aura headphones (1 reel)",
    url: "https://www.instagram.com/reel/DXy9rO8Kv1X/",
    videoSrc: "/videos/boost-chair.mp4",
    positioning: "Creative execution within brand constraints",
    description:
      "Boost provided rigid campaign requirements without specific shot-by-shot instructions. I independently developed the creative concepts, storyboards and execution to deliver engaging lifestyle content that fulfilled all commercial parameters.",
    responsibilities: [
      "Concept development",
      "Creative approach",
      "Mobile shooting",
      "On-camera performance",
      "Editing",
      "Final delivery",
    ],
  },
  {
    name: "NESTLÉ PURE LIFE",
    type: "Lifestyle Integration",
    scope: "Day-in-the-life video with natural product integration",
    url: "https://www.instagram.com/reel/De6qAcoR4h0/",
    videoSrc: "/videos/nestle.mp4",
    positioning: "Natural product integration & lifestyle storytelling",
    description:
      "Tasked with naturally integrating Nestlé Pure Life into a day-in-the-life narrative. The focus was seamless product placement within an authentic daily routine, preserving narrative flow rather than feeling like a conventional disruptive advertisement.",
    responsibilities: [
      "Concept execution",
      "Filming",
      "Editing",
      "Final delivery",
    ],
  },
  {
    name: "AMD FRAGRANCES",
    type: "Experience Content",
    scope: "First-look review of newly opened store at Dolmen Mall",
    url: "https://www.instagram.com/reel/DXHNRGPCsLl/",
    videoSrc: "/videos/amd-fragrances.mp4",
    positioning: "Experience-led commercial content",
    description:
      "Captured the physical store environment and opening impressions through a creator-led lens, walking the audience through scents, atmosphere, and initial reactions.",
    responsibilities: [
      "Content creation",
      "Shooting",
      "Editing",
      "Final delivery",
    ],
  },
  {
    name: "AXE BODY SPRAYS",
    type: "Brand Relationship",
    scope: "Ongoing creative collaboration",
    url: null,
    positioning: "Active brand partnership",
    description:
      "An active, ongoing brand collaboration with AXE Body Sprays for upcoming creative initiatives and content development.",
    responsibilities: ["Creative development", "Content strategy"],
    ongoing: true,
  },
];

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "IDEA",
    description:
      "Understanding the audience, objective, and creative opportunity.",
  },
  {
    number: "02",
    title: "CONCEPT",
    description:
      "Developing the visual direction, approach, and narrative idea.",
  },
  {
    number: "03",
    title: "DIRECTION",
    description:
      "Planning shots, composition, wardrobe styling, and on-camera execution.",
  },
  {
    number: "04",
    title: "PRODUCTION",
    description: "Filming and performing on camera using mobile videography.",
  },
  {
    number: "05",
    title: "POST-PRODUCTION",
    description:
      "Editing, pacing, sound design, music selection, and color presentation.",
  },
  {
    number: "06",
    title: "DELIVERY",
    description:
      "Exporting and optimizing finished content for high platform retention.",
  },
];

const SOFTWARE_SKILLS = [
  { name: "Adobe Premiere Pro", level: "Advanced" },
  { name: "DaVinci Resolve", level: "Advanced" },
  { name: "Mobile Editing", level: "Advanced" },
];

const CREATIVE_DISCIPLINES = [
  "Fashion & lifestyle content",
  "Short-form storytelling",
  "Concept development",
  "Creative direction",
  "Mobile videography",
  "Video editing",
  "Brand integrations",
  "Product advertising",
  "Audience-focused content strategy",
];

/* ───────────────────── Shared Components ──────────────── */

function ExternalLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Arrow diagonal />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Authentic Cinematic Instagram Reel Showcase
 * Displays an authentic 9:16 vertical smartphone reel frame with live UI overlays:
 * creator avatar, verified badge, likes/comments/shares counters, spinning audio disc,
 * caption ticker, and an interactive "Watch Reel on Instagram" trigger.
 */
function ReelCard({
  number,
  title,
  category,
  metric,
  metricLabel,
  likes = "21K",
  comments = "482",
  shares = "12.8K",
  caption,
  audio = "Original Audio · Ahmed Ayyan Mukhtar",
  sceneSubtitle,
  tag,
  url,
  videoSrc,
  theme = "terracotta",
  isHero = false,
}) {
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const toggleVideo = (e) => {
    if (!videoRef.current) return;
    e.preventDefault();
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`cr-reel-frame ${isHero ? "cr-hero-reel-frame" : ""} cr-theme-${theme}`}
    >
      {/* Top Phone Bezel */}
      <div className="cr-reel-notch">
        <span className="cr-notch-lens" aria-hidden="true" />
      </div>

      {videoSrc && !videoError ? (
        <div className="cr-video-container" onClick={toggleVideo}>
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            loop
            muted
            className="cr-inline-video"
            onError={() => setVideoError(true)}
          />
          <div className={`cr-video-overlay ${isPlaying ? "is-playing" : ""}`}>
            <span className="cr-play-badge">
              {isPlaying ? "PAUSE VIDEO" : "PLAY VIDEO"}
            </span>
          </div>
        </div>
      ) : (
        <div className="cr-reel-stage">
          {/* Ambient Lighting & Atmosphere */}
          <div className="cr-reel-glow" aria-hidden="true" />

          {/* Top Reel Bar */}
          <div className="cr-reel-topbar">
            <div className="cr-reel-top-left">
              <span className="cr-reel-pill-tag">
                {tag || `${metric} ORGANIC`}
              </span>
              <span className="cr-reel-cat-pill">{category}</span>
            </div>
            <div className="cr-reel-reach-pill" title="Organic View Reach">
              <span className="cr-fire-icon" aria-hidden="true">
                🔥
              </span>
              <strong>{metric}</strong>
            </div>
          </div>

          {/* Center Reel Content Showcase */}
          <div className="cr-reel-center">
            <h4 className="cr-reel-title">{title}</h4>
            {sceneSubtitle && (
              <p className="cr-reel-subtitle">{sceneSubtitle}</p>
            )}

            {/* Central Play Trigger Button linking to Instagram Reel */}
            <a
              href={url || PROFILE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="cr-reel-play-btn"
              aria-label={`Watch ${title} reel on Instagram (opens in a new tab)`}
            >
              <span className="cr-play-disc" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </span>
              <span className="cr-play-text">WATCH ON INSTAGRAM</span>
              <Arrow diagonal />
            </a>
          </div>

          {/* Right-Side Instagram Action Column */}
          <div className="cr-reel-actions" aria-hidden="true">
            <div className="cr-action-btn">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{likes}</span>
            </div>
            <div className="cr-action-btn">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
              </svg>
              <span>{comments}</span>
            </div>
            <div className="cr-action-btn">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
              <span>{shares}</span>
            </div>
            <div className="cr-action-btn cr-audio-disc-wrap">
              <div className="cr-audio-disc">
                <img src={ahmedPortrait} alt="" className="cr-disc-art" />
              </div>
            </div>
          </div>

          {/* Bottom Native Instagram Creator Bar */}
          <div className="cr-reel-bottom">
            <div className="cr-creator-row">
              <img
                src={ahmedPortrait}
                alt="Ahmed Ayyan"
                className="cr-creator-avatar"
              />
              <span className="cr-creator-handle">@ahmedayyanmukhtarr</span>
              <span className="cr-verified-badge" aria-hidden="true">
                ✓
              </span>
            </div>
            <p className="cr-reel-caption">{caption}</p>
            <div className="cr-reel-audio">
              <span className="cr-audio-icon" aria-hidden="true">
                ♫
              </span>
              <span className="cr-audio-name">{audio}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────── Motion Hook ────────────────────── */

function useCreativeMotion(scope) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return undefined;
    const media = gsap.matchMedia();
    const cleanups = [];
    let lenis;
    let refreshFrame;
    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        lenis?.resize();
        ScrollTrigger.refresh();
      });
    };

    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        fine: "(pointer: fine)",
      },
      (context) => {
        if (!context.conditions.motion) return undefined;

        if (context.conditions.fine) {
          lenis = new Lenis({
            duration: 1.05,
            smoothWheel: true,
            syncTouch: false,
            autoRaf: false,
            anchors: false,
          });
          const tick = (time) => lenis?.raf(time * 1000);
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);

          const anchors = (event) => {
            const link = event.target.closest("a[href]");
            if (
              !link ||
              event.defaultPrevented ||
              event.button !== 0 ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey ||
              link.target === "_blank"
            )
              return;
            const url = new URL(link.href, window.location.href);
            if (
              url.origin !== location.origin ||
              url.pathname !== location.pathname ||
              !url.hash
            )
              return;
            let id;
            try {
              id = decodeURIComponent(url.hash.slice(1));
            } catch {
              return;
            }
            const target = document.getElementById(id);
            if (!target || id === "main") return;
            event.preventDefault();
            if (location.hash !== url.hash)
              history.pushState(null, "", url.hash);
            lenis.scrollTo(target, { offset: -100, duration: 1.1 });
          };
          document.addEventListener("click", anchors);
          cleanups.push(() => {
            document.removeEventListener("click", anchors);
            gsap.ticker.remove(tick);
            lenis?.destroy();
            lenis = null;
          });
        }

        // Hero line reveal
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        const heroLines = root.querySelectorAll(".cr-hero-line > span");
        if (heroLines.length) {
          intro
            .from(
              ".cr-hero-eyebrow",
              { y: 12, autoAlpha: 0, duration: 0.55 },
              0.05,
            )
            .from(
              heroLines,
              { yPercent: 110, rotation: 1.5, duration: 1.15, stagger: 0.13 },
              0.12,
            )
            .from(
              ".cr-hero-subtitle, .cr-hero-description, .cr-hero-actions, .cr-hero-location",
              {
                y: 18,
                autoAlpha: 0,
                duration: 0.7,
                stagger: 0.1,
                clearProps: "all",
              },
              0.55,
            )
            .from(
              ".cr-hero-visual",
              { y: 24, autoAlpha: 0, duration: 1.1, clearProps: "all" },
              0.3,
            );
        }

        // Reading progress
        const progress = root.querySelector(".cr-reading-progress");
        if (progress) {
          gsap.to(progress, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.2,
            },
          });
        }

        // Section headings reveal
        root.querySelectorAll(".cr-section-heading").forEach((heading) => {
          const title = heading.querySelector(".cr-heading-reveal > span");
          const rule = heading.querySelector(".cr-section-rule");
          const timeline = gsap.timeline({
            scrollTrigger: { trigger: heading, start: "top 88%", once: true },
          });
          if (title)
            timeline.from(title, {
              yPercent: 105,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform",
            });
          if (rule)
            timeline.from(
              rule,
              {
                scaleX: 0,
                transformOrigin: "left",
                duration: 1.05,
                ease: "power3.inOut",
              },
              0,
            );
        });

        // General reveal
        root
          .querySelectorAll("[data-reveal]:not(.cr-section-heading)")
          .forEach((element) => {
            gsap.from(element, {
              y: 32,
              duration: 0.85,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            });
          });

        // Stat cards stagger
        root.querySelectorAll(".cr-stat-card").forEach((card, i) => {
          gsap.from(card, {
            y: 35,
            autoAlpha: 0,
            duration: 0.65,
            delay: (i % 4) * 0.08,
            clearProps: "all",
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          });
        });

        // Footer wordmark
        const signature = root.querySelector(".cr-footer-wordmark");
        if (signature)
          gsap.from(signature, {
            yPercent: 30,
            opacity: 0.4,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: signature, start: "top 98%", once: true },
          });

        return () => {
          cleanups.splice(0).forEach((cleanup) => cleanup());
        };
      },
      root,
    );

    root.addEventListener("toggle", refresh, true);
    root.addEventListener("load", refresh, true);
    const layoutObserver = new ResizeObserver(refresh);
    layoutObserver.observe(root);
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) refresh();
    });
    return () => {
      alive = false;
      cancelAnimationFrame(refreshFrame);
      root.removeEventListener("toggle", refresh, true);
      root.removeEventListener("load", refresh, true);
      layoutObserver.disconnect();
      media.revert();
      cleanups.splice(0).forEach((cleanup) => cleanup());
    };
  }, [scope]);
}

/* ───────────────────── Page Sections ──────────────────── */

function CreativeHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => {
      document.removeEventListener("keydown", close);
      observer.disconnect();
    };
  }, [open]);

  const navItems = [
    { id: "brands", label: "Brands" },
    { id: "work", label: "Work" },
    { id: "performance", label: "Performance" },
    { id: "approach", label: "Approach" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="cr-header">
      <div className="cr-header-inner">
        <a
          className="cr-brand"
          href="#top"
          aria-label="Ahmed Ayyan creative portfolio"
          onClick={() => setOpen(false)}
        >
          <span className="cr-brand-mark" aria-hidden="true">
            a<span>.</span>
          </span>
          <span className="cr-brand-name">
            AHMED AYYAN<span>CONTENT CREATOR · STORYTELLER</span>
          </span>
        </a>
        <button
          className="cr-menu-toggle"
          ref={toggleRef}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="creative-navigation"
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="creative-navigation"
          className={open ? "cr-navigation is-open" : "cr-navigation"}
          aria-label="Creative portfolio navigation"
        >
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="cr-nav-index">0{index + 1}</span>
              {item.label}
            </a>
          ))}
          <a
            className="cr-nav-ig"
            href={PROFILE.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="cr-hero cr-container" aria-labelledby="cr-hero-title">
      <div className="cr-hero-copy">
        <div className="cr-hero-eyebrow cr-eyebrow" data-enter>
          <span className="cr-tiny-cross" aria-hidden="true">
            +
          </span>{" "}
          AHMED AYYAN MUKHTAR <span className="cr-eyebrow-rule" />
        </div>
        <h1
          id="cr-hero-title"
          aria-label="Ahmed Ayyan Mukhtar: Ideas Into Visual Stories"
        >
          <span className="cr-hero-line">
            <span>IDEAS INTO</span>
          </span>
          <span className="cr-hero-line">
            <span>
              VISUAL <em>Stories.</em>
            </span>
          </span>
        </h1>
        <p className="cr-hero-subtitle">
          Content Creator · Storyteller · Video Editor
        </p>
        <p className="cr-hero-description">
          “I develop, direct, shoot and edit short-form content, combining
          audience understanding with visual storytelling.”
        </p>
        <div className="cr-hero-actions">
          <a href="#brands" className="cr-button cr-button-primary">
            Explore My Work <Arrow />
          </a>
          <a href="#contact" className="cr-text-link">
            Get In Touch <Arrow diagonal />
          </a>
        </div>
        <div className="cr-hero-location">
          <span className="cr-location-symbol" aria-hidden="true">
            ◎
          </span>
          <span>Lahore, Pakistan · Short-Form Storytelling</span>
          <span className="cr-location-line" />
          <span className="cr-mono">FASHION / LIFESTYLE / COMMERCIAL</span>
        </div>
      </div>
      <div className="cr-hero-visual" data-reveal>
        <ReelCard
          title="The Skinny Jeans Transformation"
          category="Relatable Storytelling"
          metric="549K"
          metricLabel="organic views"
          tag="549K ORGANIC REACH"
          likes="21K"
          comments="482"
          shares="12.8K"
          caption="It's important you listen to your sister when she tells you to ditch skinny jeans. 👖"
          sceneSubtitle="2022 vs Present Day · Personal Fashion Evolution"
          audio="Original Audio · Ahmed Ayyan Mukhtar"
          url="https://www.instagram.com/reel/DSFNaKhCtyB/"
          videoSrc="/videos/skinny-jeans.mp4"
          theme="terracotta"
          isHero={true}
        />
      </div>
    </section>
  );
}

function PerformanceStrip() {
  return (
    <div className="cr-proof-strip">
      <div className="cr-container cr-proof-inner">
        <p className="cr-proof-label">
          <span className="cr-tiny-cross" aria-hidden="true">
            +
          </span>{" "}
          ORGANIC
          <br />
          HIGHLIGHTS
        </p>
        <div className="cr-proof-item">
          <strong>549K</strong>
          <p className="cr-proof-text">
            Highest reel views <span className="cr-proof-badge">organic</span>
          </p>
        </div>
        <div className="cr-proof-item">
          <strong>6</strong>
          <p className="cr-proof-text">Reels exceeding 100K views</p>
        </div>
        <div className="cr-proof-item">
          <strong>21K</strong>
          <p className="cr-proof-text">Highest likes on a single reel</p>
        </div>
        <div className="cr-proof-item">
          <strong>8K–10K</strong>
          <p className="cr-proof-text">Typical reel views baseline</p>
        </div>
      </div>
    </div>
  );
}

function BrandCollaborations() {
  return (
    <section id="brands" className="cr-section cr-container">
      <SectionHeading
        index="01"
        label="COMMERCIAL CONTENT EXPERIENCE"
        title="Brand collaborations."
      >
        <p>
          Translating commercial briefs into lifestyle content that preserves
          natural narrative flow.
        </p>
      </SectionHeading>
      <div className="cr-brands-list">
        {BRAND_COLLABORATIONS.map((brand, i) => (
          <article className="cr-brand-row" key={brand.name} data-reveal>
            <div className="cr-brand-meta">
              <span className="cr-brand-number cr-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="cr-brand-type">{brand.type}</span>
            </div>
            <div className="cr-brand-content">
              <div className="cr-brand-heading">
                <div>
                  <h3>{brand.name}</h3>
                  <p className="cr-brand-scope">{brand.scope}</p>
                </div>
                {brand.url ? (
                  <a
                    className="cr-circle-link"
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${brand.name} campaign on Instagram (opens in a new tab)`}
                  >
                    <Arrow diagonal />
                  </a>
                ) : (
                  brand.ongoing && (
                    <span className="cr-ongoing-badge">
                      ONGOING PARTNERSHIP
                    </span>
                  )
                )}
              </div>
              <p className="cr-brand-description">{brand.description}</p>
              {brand.responsibilities.length > 0 && (
                <div className="cr-brand-roles">
                  <ul className="cr-tags">
                    {brand.responsibilities.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ index, label, title, children }) {
  return (
    <div className="cr-section-heading" data-reveal>
      <div>
        <div className="cr-eyebrow">
          <span className="cr-section-number">{index}</span>
          {label}
        </div>
        <h2 className="cr-heading-reveal">
          <span>{title}</span>
        </h2>
      </div>
      {children}
      <span className="cr-section-rule" aria-hidden="true" />
    </div>
  );
}

function FeaturedWork() {
  return (
    <section id="work" className="cr-section cr-container">
      <SectionHeading
        index="02"
        label="FEATURED PERSONAL CONTENT"
        title="Selected projects."
      >
        <p>
          Concept-driven short-form storytelling developed independently from
          initial idea to final cut.
        </p>
      </SectionHeading>
      <div className="cr-featured-grid">
        {FEATURED_PROJECTS.map((project) => (
          <article
            key={project.number}
            className="cr-featured-project"
            data-reveal
          >
            <ReelCard
              number={project.number}
              title={project.title}
              category={project.category}
              metric={project.metric}
              metricLabel={project.metricLabel}
              tag={project.tag}
              likes={project.likes}
              comments={project.comments}
              shares={project.shares}
              caption={project.caption}
              audio={project.audio}
              sceneSubtitle={project.sceneSubtitle}
              url={project.url}
              videoSrc={project.videoSrc}
              theme={project.theme}
            />
            <div className="cr-project-info">
              <div className="cr-project-kicker">
                <span>{project.category}</span>
                <span>/{project.number}</span>
              </div>
              <div className="cr-project-title-row">
                <h3>{project.title}</h3>
                <a
                  className="cr-circle-link"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${project.title} on Instagram (opens in a new tab)`}
                >
                  <Arrow diagonal />
                </a>
              </div>
              <p className="cr-project-description">{project.concept}</p>

              <div className="cr-project-approach">
                <h4>Creative Approach</h4>
                <ul>
                  {project.approach.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="cr-project-roles">
                <h4>My Responsibilities (End-to-End)</h4>
                <ul className="cr-tags">
                  {project.responsibilities.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </div>

              <div className="cr-project-result">
                <div className="cr-result-stat">
                  <strong>{project.metric}</strong>
                  <span>{project.metricLabel}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PerformanceGrid() {
  return (
    <section id="performance" className="cr-performance-section">
      <div className="cr-container cr-section">
        <SectionHeading
          index="03"
          label="PERFORMANCE AND ANALYTICS"
          title="Content reach."
        >
          <p>
            Historical reach metrics demonstrating audience connection.
            <br className="cr-desktop-break" /> All figures represent organic
            content without paid boosting.
          </p>
        </SectionHeading>
        <div className="cr-stats-grid">
          {PERFORMANCE_METRICS.map((stat, i) => (
            <div className="cr-stat-card" key={stat.label}>
              <span className="cr-stat-index">
                {String(i + 1).padStart(2, "0")} /
              </span>
              <strong>{stat.value}</strong>
              <p className="cr-stat-label">{stat.label}</p>
              <span className="cr-stat-detail">{stat.detail}</span>
            </div>
          ))}
        </div>
        <div className="cr-performance-footer" data-reveal>
          <div className="cr-profile-context">
            <span className="cr-mono cr-context-badge">AUTHENTIC REACH</span>
            <p>
              Current Instagram following is approximately{" "}
              <strong>1,270</strong>. The historical figures above reflect
              organic distribution driven by relatable storytelling, strong
              hooks, and platform-native pacing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreativeApproach() {
  return (
    <section id="approach" className="cr-approach-section">
      <div className="cr-container cr-section">
        <SectionHeading
          index="04"
          label="CONTENT STRATEGY & RESOURCEFULNESS"
          title="How I approach content."
        />
        <div className="cr-approach-grid" data-reveal>
          <div className="cr-approach-copy">
            <p className="cr-approach-lead">
              “I believe good content isn't always about having more resources.
              It's about finding more ways to use what you already have.”
            </p>
            <p>
              I primarily create fashion content for university students. My
              approach involves understanding what resonates with this audience
              and developing concepts around relatable styling, culture and
              everyday experiences.
            </p>
            <p>
              One aspect of my content strategy is reusing existing wardrobe
              pieces without making the content feel repetitive. Instead of
              constantly introducing new clothes, I explore different concepts,
              styling combinations and visual angles around existing wardrobe
              pieces, keeping the content fresh and relatable for my audience.
            </p>
            <div className="cr-approach-highlight">
              <span className="cr-mono">STRATEGIC PRINCIPLE</span>
              <p>
                Creative resourcefulness paired with acute audience awareness.
              </p>
            </div>
          </div>
          <div className="cr-approach-pillars">
            <div className="cr-pillars-header">
              <span className="cr-mono">SIX EXPLORATION ANGLES</span>
            </div>
            {[
              {
                title: "Styling combinations",
                desc: "Reimagining wardrobe pieces into fresh aesthetics",
              },
              {
                title: "Visual angles",
                desc: "Dynamic framing and deliberate mobile camera motion",
              },
              {
                title: "Concepts",
                desc: "Strong thematic hooks grounded in student culture",
              },
              {
                title: "Pop-culture references",
                desc: "Translating recognizable characters into wearable fashion",
              },
              {
                title: "Presentation styles",
                desc: "Alternating pacing, humor, contrast, and tone",
              },
              {
                title: "Narratives",
                desc: "Relatable storytelling arcs that encourage sharing",
              },
            ].map((pillar, i) => (
              <div className="cr-pillar" key={pillar.title}>
                <span className="cr-pillar-number">
                  {String(i + 1).padStart(2, "0")} /
                </span>
                <div className="cr-pillar-text">
                  <strong>{pillar.title}</strong>
                  <p>{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductionProcess() {
  return (
    <section id="process" className="cr-section cr-container">
      <SectionHeading
        index="05"
        label="END-TO-END PRODUCTION CAPABILITIES"
        title="From idea to delivery."
      >
        <p>
          I independently take projects through every stage of production,
          combining creative concepting with technical execution.
        </p>
      </SectionHeading>
      <div className="cr-workflow-grid">
        {WORKFLOW_STEPS.map((step) => (
          <article className="cr-workflow-step" key={step.number} data-reveal>
            <span className="cr-workflow-number">{step.number} —</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
      <div className="cr-tools-section" data-reveal>
        <div className="cr-tools-grid">
          <div className="cr-tool-card">
            <span className="cr-eyebrow">EQUIPMENT</span>
            <h3>Smartphone-Based Videography</h3>
            <p className="cr-tools-note">
              Mobile-first production philosophy: filming on high-end
              smartphones ensures the exact framing, aspect ratio, and intimacy
              required for native short-form platform retention.
            </p>
          </div>
          <div className="cr-tool-card">
            <span className="cr-eyebrow">POST-PRODUCTION SOFTWARE</span>
            <div className="cr-software-list">
              {SOFTWARE_SKILLS.map((skill) => (
                <div className="cr-software-item" key={skill.name}>
                  <span>{skill.name}</span>
                  <span className="cr-mono cr-skill-level">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cr-tool-card">
            <span className="cr-eyebrow">CORE CREATIVE SKILLS</span>
            <ul className="cr-tags">
              {[
                "Mobile videography",
                "Concept development",
                "Short-form storytelling",
                "Product integration",
                "Brand content",
                "Fashion styling",
                "Pacing & sound design",
                "Hook engineering",
              ].map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="cr-section cr-container cr-about-section">
      <SectionHeading
        index="05"
        label="ABOUT ME"
        title="Storyteller and creator."
      />
      <div className="cr-about-grid" data-reveal>
        <div className="cr-about-portrait-wrap">
          <div className="cr-about-portrait-frame">
            <img
              src={ahmedPortrait}
              width="720"
              height="900"
              alt="Ahmed Ayyan Mukhtar"
              className="cr-about-portrait"
              loading="lazy"
            />
            <div className="cr-portrait-badge">
              <span className="cr-mono">AHMED AYYAN MUKHTAR</span>
              <span className="cr-mono">LAHORE, PK</span>
            </div>
          </div>
        </div>
        <div className="cr-about-copy">
          <p className="cr-about-lead">
            I enjoy developing concepts that make familiar ideas feel{" "}
            <em>fresh.</em>
          </p>
          <p>
            I'm a content creator and final-year Software Engineering student at
            Information Technology University, Lahore. My creative work focuses
            on fashion, lifestyle and branded short-form content.
          </p>
          <p>
            I enjoy developing concepts that make familiar ideas feel fresh,
            whether that's turning a pop-culture reference into a wearable
            outfit or building a relatable story around an everyday experience.
          </p>
          <p>
            I independently take projects from concept to final delivery,
            combining creative thinking with practical production and editing
            skills.
          </p>
          <div className="cr-about-focus">
            <span className="cr-eyebrow">CREATIVE FOCUS</span>
            <div className="cr-focus-list">
              {CREATIVE_DISCIPLINES.map((discipline) => (
                <div className="cr-focus-item" key={discipline}>
                  <span className="cr-focus-dot" />
                  <span>{discipline}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copyState, setCopyState] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopyState("Email copied to clipboard");
    } catch {
      setCopyState("Please select and copy: " + PROFILE.email);
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState(""), 4500);
  };

  return (
    <section id="contact" className="cr-contact-section">
      <div className="cr-container">
        <div className="cr-contact-top">
          <span className="cr-eyebrow">
            <span className="cr-section-number">06</span> GET IN TOUCH
          </span>
          <span className="cr-mono">LAHORE, PAKISTAN / UTC +05</span>
        </div>
        <div className="cr-contact-main" data-reveal>
          <h2>
            Have an idea?
            <br />
            <em>Let's make it a story.</em>
          </h2>
          <a
            className="cr-contact-arrow"
            href={`mailto:${PROFILE.email}`}
            aria-label="Send Ahmed Ayyan an email"
          >
            <Arrow diagonal />
          </a>
        </div>
        <div className="cr-contact-bottom">
          <div className="cr-contact-inquiry">
            <p>
              Looking for a Storytelling Officer who can independently
              conceptualize, direct, film, and edit engaging short-form content?
              Let's talk.
            </p>
            <div className="cr-email-row">
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                title="Copy email address"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="8"
                    y="8"
                    width="12"
                    height="13"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 8V3H3v12h5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
            <span className="cr-copy-status" role="status">
              {copyState}
            </span>
          </div>
          <div className="cr-contact-socials">
            <ExternalLink href={PROFILE.instagram}>Instagram</ExternalLink>
            <a href={`mailto:${PROFILE.email}`} className="cr-email-cta">
              Send Email <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="cr-footer cr-container">
      <span className="cr-footer-wordmark">
        ahmed ayyan<span>.</span>
      </span>
      <div className="cr-footer-meta">
        <span>
          © {new Date().getFullYear()} Ahmed Ayyan Mukhtar · Creative Portfolio
        </span>
        <div>
          <a href="#top" className="cr-back-top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────── App Shell ──────────────────────── */

export default function CreativeApp() {
  const root = useRef(null);
  useCreativeMotion(root);

  useEffect(() => {
    let cancelled = false;
    const scrollToInitialHash = async () => {
      await document.fonts.ready;
      if (cancelled || !window.location.hash) return;
      let id;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    };
    scrollToInitialHash();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={root} id="top" className="cr-root">
      <div className="cr-reading-progress" aria-hidden="true" />
      <a className="cr-skip-link" href="#main">
        Skip to content
      </a>
      <CreativeHeader />
      <main id="main">
        <Hero />
        <PerformanceStrip />
        <BrandCollaborations />
        <FeaturedWork />
        <PerformanceGrid />
        <CreativeApproach />
        <ProductionProcess />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
