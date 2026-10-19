import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const technologies = [
  { name: "Python", icon: "python", context: "AI & DATA PIPELINES" },
  { name: "C# / .NET", icon: "dotnet", context: "ENTERPRISE SERVICES" },
  { name: "LangGraph", icon: "langgraph", context: "AGENT ORCHESTRATION" },
  { name: "FastAPI", icon: "fastapi", context: "MODEL SERVING" },
  { name: "PostgreSQL", icon: "postgresql", context: "APPLICATION DATA" },
  { name: "React", icon: "react", context: "PRODUCT INTERFACES" },
  { name: "TypeScript", icon: "typescript", context: "APPLICATION LOGIC" },
  { name: "Docker", icon: "docker", context: "REPRODUCIBLE DEPLOYMENT" },
  { name: "LangChain", icon: "langchain", context: "RETRIEVAL WORKFLOWS" },
  {
    name: "scikit-learn",
    icon: "scikitlearn",
    context: "APPLIED MACHINE LEARNING",
  },
];

export default function TechRail() {
  const rootRef = useRef(null),
    trackRef = useRef(null),
    groupRef = useRef(null),
    tweenRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = (event) => setReduced(event.matches);
    media.addEventListener("change", change);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(rootRef.current);
    const visibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", change);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (reduced) {
      gsap.set(trackRef.current, { clearProps: "transform" });
      return undefined;
    }
    const tween = gsap.fromTo(
      trackRef.current,
      { x: 0 },
      {
        x: () => -groupRef.current.offsetWidth,
        duration: 62,
        ease: "none",
        repeat: -1,
        paused: true,
      },
    );
    tweenRef.current = tween;
    const observer = new ResizeObserver(() => {
      const progress = tween.progress();
      tween.invalidate().progress(progress);
    });
    observer.observe(groupRef.current);
    return () => {
      tween.kill();
      tweenRef.current = null;
      observer.disconnect();
    };
  }, [reduced]);
  useEffect(() => {
    tweenRef.current?.paused(paused || hovered || !visible || hidden);
  }, [paused, hovered, visible, hidden, reduced]);
  return (
    <section
      className="tech-section"
      ref={rootRef}
      aria-label="Technology toolkit"
    >
      <div className="container tech-heading">
        <div>
          <span className="eyebrow">THE WORKING TOOLKIT</span>
          <h2>The tools behind the work.</h2>
        </div>
        <div className="tech-rail-controls">
          <span>SELECTED TECHNOLOGIES</span>
          {!reduced && (
            <button
              aria-label={
                paused ? "Play technology slider" : "Pause technology slider"
              }
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              {paused ? "▶" : "Ⅱ"}
            </button>
          )}
        </div>
      </div>
      <div
        className={`tech-window ${reduced ? "is-static" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="tech-track" ref={trackRef}>
          {[0, 1].map((copy) => (
            <ul
              className="tech-group"
              key={copy}
              ref={copy === 0 ? groupRef : undefined}
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {technologies.map((item) => (
                <li className="tech-item" key={item.name}>
                  <img
                    src={`/icons/${item.icon}.svg`}
                    alt=""
                    width="34"
                    height="34"
                    loading="lazy"
                  />
                  <div>
                    <h3>{item.name}</h3>
                    <span>{item.context}</span>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="container tech-note">
        <span>From orchestration to deployment.</span>
        <span>Used across the projects above.</span>
      </div>
    </section>
  );
}
