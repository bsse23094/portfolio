import * as THREE from "three";
import { gsap } from "gsap";
import { createAccentGeometry } from "./accentGeometry";

// One WebGL context; completed views are copied to their DOM-local 2D canvases.
let pool;
function createPool() {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setScissorTest(true);
  const views = new Set();
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = matchMedia("(pointer: coarse)");
  let running = false,
    disposed = false,
    lastTime = -Infinity;
  let bufferWidth = 1,
    bufferHeight = 1;
  const stop = () => {
    gsap.ticker.remove(tick);
    running = false;
  };
  const wake = () => {
    if (!running && !disposed && !document.hidden && views.size) {
      running = true;
      lastTime = -Infinity;
      gsap.ticker.add(tick);
    }
  };
  const invalidate = (view) => {
    view.dirty = true;
    if (view.visible) wake();
  };
  const resize = (view) => {
    const bounds = view.host.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const dpr = Math.min(devicePixelRatio || 1, coarse.matches ? 1 : 1.25);
    const budget = coarse.matches ? 110000 : 220000;
    const ratio = Math.min(
      dpr,
      Math.sqrt(budget / (bounds.width * bounds.height)),
      1200 / bounds.width,
    );
    view.width = Math.max(1, Math.round(bounds.width * ratio));
    view.height = Math.max(1, Math.round(bounds.height * ratio));
    if (
      view.canvas.width !== view.width ||
      view.canvas.height !== view.height
    ) {
      view.canvas.width = view.width;
      view.canvas.height = view.height;
    }
    view.art.resize(bounds.width / bounds.height);
    invalidate(view);
  };
  const intersection = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const view = [...views].find((item) => item.host === entry.target);
      if (view) {
        view.visible = entry.isIntersecting;
        invalidate(view);
      }
    }
  });
  const sizes = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const view = [...views].find((item) => item.host === entry.target);
      if (view) resize(view);
    }
  });
  function tick(time) {
    if (document.hidden || disposed) {
      stop();
      return;
    }
    if (time - lastTime < 1 / (coarse.matches ? 24 : 30)) return;
    const delta = Number.isFinite(lastTime)
      ? Math.min(time - lastTime, 0.1)
      : 1 / 30;
    lastTime = time;
    let pending = false;
    for (const view of views) {
      if (!view.visible || !view.dirty || !view.width) continue;
      const bounds = view.host.getBoundingClientRect();
      if (
        bounds.bottom <= 0 ||
        bounds.top >= innerHeight ||
        document.querySelector("dialog[open]")
      )
        continue;
      const progress = THREE.MathUtils.clamp(
        (bounds.top + bounds.height / 2) / innerHeight - 0.5,
        -1,
        1,
      );
      const unsettled = view.art.update(
        {
          pointer: view.pointer,
          progress,
          engaged: view.engaged,
          active: view.active,
          reduced: motion.matches,
        },
        delta,
      );
      if (view.width > bufferWidth || view.height > bufferHeight) {
        bufferWidth = Math.max(bufferWidth, view.width);
        bufferHeight = Math.max(bufferHeight, view.height);
        renderer.setSize(bufferWidth, bufferHeight, false);
      }
      renderer.setViewport(0, 0, view.width, view.height);
      renderer.setScissor(0, 0, view.width, view.height);
      renderer.render(view.art.scene, view.art.camera);
      view.context.clearRect(0, 0, view.width, view.height);
      view.context.drawImage(
        renderer.domElement,
        0,
        bufferHeight - view.height,
        view.width,
        view.height,
        0,
        0,
        view.width,
        view.height,
      );
      if (!view.ready) {
        view.ready = true;
        view.onReady();
      }
      view.dirty = unsettled;
      pending ||= unsettled;
    }
    if (!pending) stop();
  }
  const scroll = () => {
    if (!motion.matches)
      views.forEach((view) => {
        if (view.visible) invalidate(view);
      });
  };
  const visibility = () => {
    if (document.hidden) stop();
    else views.forEach(invalidate);
  };
  const preference = () => {
    views.forEach((view) => {
      view.pointer = { x: 0, y: 0 };
      resize(view);
    });
  };
  const contextLost = (event) => {
    event.preventDefault();
    [...views].forEach((view) => view.onLost());
  };
  window.addEventListener("scroll", scroll, { passive: true });
  document.addEventListener("visibilitychange", visibility);
  motion.addEventListener("change", preference);
  coarse.addEventListener("change", preference);
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  return {
    add({ host, canvas, kind, onLost, onReady, active = 0 }) {
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas 2D unavailable");
      const view = {
        host,
        canvas,
        context,
        art: createAccentGeometry(kind),
        onLost,
        onReady,
        active,
        pointer: { x: 0, y: 0 },
        engaged: false,
        visible: true,
        dirty: true,
        ready: false,
      };
      const root =
        host.closest(".project-signal-index, .contact-arrow") ||
        host.parentElement;
      const move = (event) => {
        if (
          motion.matches ||
          coarse.matches ||
          !view.visible ||
          event.pointerType !== "mouse" ||
          kind === "rail"
        )
          return;
        const bounds = root.getBoundingClientRect();
        view.pointer = {
          x: THREE.MathUtils.clamp(
            (event.clientX - bounds.left) / bounds.width - 0.5,
            -0.5,
            0.5,
          ),
          y: THREE.MathUtils.clamp(
            (event.clientY - bounds.top) / bounds.height - 0.5,
            -0.5,
            0.5,
          ),
        };
        view.engaged = true;
        invalidate(view);
      };
      const leave = () => {
        view.pointer = { x: 0, y: 0 };
        view.engaged = root.contains(document.activeElement);
        invalidate(view);
      };
      const focus = () => {
        view.engaged = true;
        invalidate(view);
      };
      const blur = () => {
        view.engaged = false;
        invalidate(view);
      };
      root.addEventListener("pointermove", move, { passive: true });
      root.addEventListener("pointerleave", leave);
      root.addEventListener("focusin", focus);
      root.addEventListener("focusout", blur);
      views.add(view);
      intersection.observe(host);
      sizes.observe(host);
      resize(view);
      return {
        setActive(index) {
          if (view.active !== index) {
            view.active = index;
            invalidate(view);
          }
        },
        dispose() {
          views.delete(view);
          intersection.unobserve(host);
          sizes.unobserve(host);
          root.removeEventListener("pointermove", move);
          root.removeEventListener("pointerleave", leave);
          root.removeEventListener("focusin", focus);
          root.removeEventListener("focusout", blur);
          view.art.dispose();
          if (!views.size) {
            disposed = true;
            stop();
            intersection.disconnect();
            sizes.disconnect();
            window.removeEventListener("scroll", scroll);
            document.removeEventListener("visibilitychange", visibility);
            motion.removeEventListener("change", preference);
            coarse.removeEventListener("change", preference);
            renderer.domElement.removeEventListener(
              "webglcontextlost",
              contextLost,
            );
            renderer.dispose();
            renderer.forceContextLoss();
            pool = undefined;
          }
        },
      };
    },
  };
}
export function createDesignScene(options) {
  if (!pool) pool = createPool();
  return pool.add(options);
}
