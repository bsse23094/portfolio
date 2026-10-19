import { useLayoutEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export function usePortfolioMotion(scope) {
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
        // Lenis keeps document scrolling native; GSAP supplies one shared clock.
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

        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        const lines = root.querySelectorAll(".hero-line > span");
        if (lines.length)
          intro
            .from(".hero-intro", { y: 12, autoAlpha: 0, duration: 0.55 }, 0.05)
            .from(
              lines,
              { yPercent: 110, rotation: 2, duration: 1.15, stagger: 0.13 },
              0.12,
            )
            .from(
              ".hero-description, .hero-actions, .hero-location, .hero-experience",
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
              ".hero-visual",
              { y: 30, autoAlpha: 0, duration: 1, clearProps: "all" },
              0.3,
            );

        const progress = root.querySelector(".reading-progress");
        if (progress)
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
        root.querySelectorAll(".section-heading").forEach((heading) => {
          const title = heading.querySelector(".heading-reveal > span");
          const rule = heading.querySelector(".section-rule");
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
        root
          .querySelectorAll("[data-reveal]:not(.section-heading)")
          .forEach((element) => {
            gsap.from(element, {
              y: 34,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            });
          });
        root.querySelectorAll(".project-visual > svg").forEach((art) => {
          gsap.fromTo(
            art,
            { yPercent: 5 },
            {
              yPercent: -5,
              ease: "none",
              scrollTrigger: {
                trigger: art.closest(".featured-project"),
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        });
        root.querySelectorAll(".experience-content").forEach((item) => {
          gsap.from(item.children, {
            y: 20,
            opacity: 0.25,
            stagger: 0.07,
            duration: 0.7,
            clearProps: "all",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          });
        });
        const portrait = root.querySelector(".portrait-frame img");
        if (portrait)
          gsap.fromTo(
            portrait,
            { yPercent: -4, scale: 1.12 },
            {
              yPercent: 4,
              scale: 1.06,
              ease: "none",
              scrollTrigger: {
                trigger: portrait.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        const signature = root.querySelector(".footer-wordmark");
        if (signature)
          gsap.from(signature, {
            yPercent: 30,
            opacity: 0.4,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: signature, start: "top 98%", once: true },
          });

        if (context.conditions.fine) {
          root
            .querySelectorAll(".button-primary, .circle-link, .contact-arrow")
            .forEach((button) => {
              const x = gsap.quickTo(button, "x", {
                duration: 0.45,
                ease: "power3.out",
              });
              const y = gsap.quickTo(button, "y", {
                duration: 0.45,
                ease: "power3.out",
              });
              const move = (event) => {
                const bounds = button.getBoundingClientRect();
                x((event.clientX - bounds.left - bounds.width / 2) * 0.12);
                y((event.clientY - bounds.top - bounds.height / 2) * 0.12);
              };
              const reset = () => {
                x(0);
                y(0);
              };
              button.addEventListener("pointermove", move);
              button.addEventListener("pointerleave", reset);
              cleanups.push(() => {
                button.removeEventListener("pointermove", move);
                button.removeEventListener("pointerleave", reset);
                x.tween.kill();
                y.tween.kill();
                gsap.set(button, { clearProps: "transform" });
              });
            });
        }
        return () => {
          cleanups.splice(0).forEach((cleanup) => cleanup());
        };
      },
      root,
    );

    // Expanding project notes and loading images change document geometry.
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
