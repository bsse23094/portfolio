import { useLayoutEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useSmoothScroll() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -96 },
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const raf = (time) => lenis.raf(time * 1000);

    lenis.on('scroll', updateScrollTrigger);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', updateScrollTrigger);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}

export function usePortfolioMotion(scope) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return undefined;

    const context = gsap.context(() => {
      const heroMeta = root.querySelectorAll('[data-hero-meta]');
      const heroLines = root.querySelectorAll('[data-hero-line]');
      const heroCopy = root.querySelectorAll('[data-hero-copy]');
      const heroActions = root.querySelectorAll('[data-hero-action]');

      if (heroMeta.length || heroLines.length || heroCopy.length || heroActions.length) {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (heroMeta.length) intro.from(heroMeta, { autoAlpha: 0, y: 18, duration: 0.5 });
        if (heroLines.length) intro.from(heroLines, { autoAlpha: 0, yPercent: 120, stagger: 0.12, duration: 0.9 }, '-=0.15');
        if (heroCopy.length) intro.from(heroCopy, { autoAlpha: 0, y: 20, duration: 0.55 }, '-=0.35');
        if (heroActions.length) intro.from(heroActions, { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.45 }, '-=0.25');
      }

      gsap.utils.toArray('[data-reveal], [data-gsap-reveal]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 36,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            once: true,
          },
        });
      });

      gsap.utils.toArray('[data-gsap-stagger], .scroll-stagger-container').forEach((container) => {
        const items = container.querySelectorAll('[data-gsap-stagger-item], .scroll-stagger-item');
        if (!items.length) return;

        const isAIProjects = container.querySelector('[data-ai-card]');
        if (isAIProjects) {
          const section = container.closest('.ai-projects-section');
          const heading = section?.querySelectorAll('.section-eyebrow, .section-title, .section-subtitle');
          const cardContent = [...items].flatMap((card) => [
            card.querySelector('.ai-project-card-header'),
            ...card.querySelectorAll('.ai-project-card-body > *'),
          ].filter(Boolean));
          const aiTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section || container,
              start: 'top 72%',
              once: true,
            },
          });

          if (heading?.length) {
            aiTimeline.from(heading, {
              autoAlpha: 0,
              y: 26,
              stagger: 0.08,
              duration: 0.62,
              ease: 'power3.out',
            });
          }

          aiTimeline.from(items, {
            autoAlpha: 0,
            y: 54,
            scale: 0.96,
            stagger: 0.13,
            duration: 0.9,
            ease: 'expo.out',
            force3D: true,
          }, heading?.length ? '-=0.22' : 0);

          aiTimeline.from(cardContent, {
            autoAlpha: 0,
            y: 18,
            stagger: 0.025,
            duration: 0.5,
            ease: 'power3.out',
          }, '-=0.62');
          return;
        }

        gsap.from(items, {
          autoAlpha: 0,
          y: 28,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            once: true,
          },
        });
      });

      gsap.utils.toArray('[data-section-signal]').forEach((signal) => {
        gsap.from(signal, {
          scaleX: 0,
          duration: 0.85,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: signal.closest('.section-header'),
            start: 'top 80%',
            once: true,
          },
        });
      });

      gsap.utils.toArray('.featured-project-image img').forEach((image) => {
        gsap.from(image, {
          scale: 1.16,
          duration: 1.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: image.closest('.featured-project-card'),
            start: 'top 82%',
            once: true,
          },
        });
      });

      const skillFills = root.querySelectorAll('.resume-skill-fill');
      if (skillFills.length) {
        gsap.from(skillFills, {
          scaleX: 0,
          transformOrigin: 'left center',
          stagger: 0.09,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillFills[0].closest('.resume-sidebar'),
            start: 'top 78%',
            once: true,
          },
        });
      }

      const addParallax = (selector, triggerSelector, properties, start = 'top bottom') => {
        const element = root.querySelector(selector);
        if (!element) return;

        gsap.to(element, {
          ...properties,
          ease: 'none',
          scrollTrigger: {
            trigger: element.closest(triggerSelector),
            start,
            end: 'bottom top',
            scrub: 1,
          },
        });
      };

      addParallax('[data-hero-code]', '.hero', { y: -145, rotation: 16, scale: 1.08 }, 'top top');
      addParallax('[data-tagline-icon]', '.tagline-section', { y: -130, rotation: 12, scale: 1.06 });
      addParallax('[data-ai-robot]', '.ai-projects-section', { y: -155, rotation: 25, scale: 1.05 });

      const footerMark = root.querySelector('[data-footer-mark]');
      if (footerMark) {
        gsap.fromTo(footerMark, { xPercent: 18 }, {
          xPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: footerMark.closest('.footer'),
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1,
          },
        });
      }
    }, root);

    return () => context.revert();
  }, [scope]);
}
