import { useEffect, useRef, useState } from "react";

// Decorative only: information and controls always live outside this canvas.
export default function DesignAccent({ kind, className = "", active = 0 }) {
  const host = useRef(null);
  const canvas = useRef(null);
  const sceneRef = useRef(null);
  const activeRef = useRef(active);
  activeRef.current = active;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    let scene;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        import("./designScene")
          .then(({ createDesignScene }) => {
            if (cancelled) return;
            try {
              scene = createDesignScene({
                host: host.current,
                canvas: canvas.current,
                kind,
                active: activeRef.current,
                onReady: () => {
                  if (!cancelled) setReady(true);
                },
                onLost: () => {
                  scene?.dispose();
                  scene = null;
                  sceneRef.current = null;
                  if (!cancelled) setReady(false);
                },
              });
              sceneRef.current = scene;
            } catch {
              setReady(false);
            }
          })
          .catch(() => {
            if (!cancelled) setReady(false);
          });
      },
      { rootMargin: "160px" },
    );
    observer.observe(host.current);
    return () => {
      cancelled = true;
      observer.disconnect();
      scene?.dispose();
      sceneRef.current = null;
    };
  }, [kind]);
  useEffect(() => {
    sceneRef.current?.setActive(active);
  }, [active]);
  return (
    <span
      ref={host}
      className={`design-accent design-${kind} ${className}`}
      aria-hidden="true"
      data-ready={ready}
    >
      <canvas ref={canvas} />
      <svg className="design-fallback" viewBox="0 0 200 200" fill="none">
        {kind === "orbit" ? (
          <>
            <ellipse cx="100" cy="100" rx="91" ry="70" />
            <ellipse cx="100" cy="100" rx="70" ry="91" />
          </>
        ) : (
          <>
            <path d="M4 100H196" />
            {[25, 75, 125, 175].map((x) => (
              <circle key={x} cx={x} cy="100" r="5" />
            ))}
          </>
        )}
      </svg>
    </span>
  );
}
