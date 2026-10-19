import Arrow from "./Arrow";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { systems } from "../data/projectSystems";

export default function SystemExplorer({
  projectId = "reply-mirror",
  onNotes,
}) {
  const system = systems[projectId];
  const selectionHint = `Select ${system.unit === "agent" ? "an agent" : "a stage"} to see its role`;
  const { nodes: systemNodes, steps: traceSteps } = system;
  const fallbackPositions = systemNodes.map((node) => [
    12 + (node.position[0] + 3.7) * 9.8,
    50 + node.position[2] * 14,
  ]);
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const labelsRef = useRef([]);
  const sceneRef = useRef(null);
  const timelineRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState([0]);
  const [layers, setLayers] = useState(false);
  const [status, setStatus] = useState("loading");
  const [trace, setTrace] = useState("idle");
  const [stepLabel, setStepLabel] = useState(selectionHint);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const node = systemNodes[selected];

  function selectNode(index) {
    timelineRef.current?.kill();
    setTrace("idle");
    setSelected(index);
    setActive([index]);
    setStepLabel(selectionHint);
  }

  useEffect(() => {
    let cancelled = false;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = (event) => {
      setReduced(event.matches);
      if (event.matches) {
        timelineRef.current?.kill();
        setTrace("idle");
      }
    };
    media.addEventListener("change", onMotion);
    import("./systemScene")
      .then(({ createSystemScene }) => {
        if (cancelled) return;
        try {
          sceneRef.current = createSystemScene({
            system,
            canvas: canvasRef.current,
            host: hostRef.current,
            labels: labelsRef.current,
            onSelect: selectNode,
            onLost: () => {
              sceneRef.current?.dispose();
              sceneRef.current = null;
              setStatus("fallback");
            },
            reducedMotion: media.matches,
          });
          setStatus("ready");
        } catch {
          setStatus("fallback");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("fallback");
      });
    return () => {
      cancelled = true;
      timelineRef.current?.kill();
      sceneRef.current?.dispose();
      sceneRef.current = null;
      media.removeEventListener("change", onMotion);
    };
  }, [system]);

  useEffect(() => {
    sceneRef.current?.select(selected, active, trace === "playing");
  }, [selected, active, trace, status]);
  useEffect(() => {
    sceneRef.current?.setLayers(layers);
  }, [layers, status]);
  useEffect(() => {
    sceneRef.current?.setMotion(reduced);
  }, [reduced, status]);
  useEffect(() => {
    const host = hostRef.current;
    const pause = () => {
      if (timelineRef.current?.isActive()) {
        timelineRef.current.pause();
        setTrace("paused");
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) pause();
    });
    observer.observe(host);
    const visibility = () => {
      if (document.hidden) pause();
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  function runTrace() {
    if (trace === "playing") {
      timelineRef.current?.pause();
      setTrace("paused");
      return;
    }
    if (trace === "paused") {
      timelineRef.current?.resume();
      setTrace("playing");
      return;
    }
    timelineRef.current?.kill();
    if (reduced) {
      const next =
        (traceSteps.findIndex((step) => step.active.includes(selected)) + 1) %
        traceSteps.length;
      const step = traceSteps[next];
      setSelected(step.selected);
      setActive(step.active);
      setStepLabel(step.label);
      return;
    }
    setTrace("playing");
    const timeline = gsap.timeline({
      onComplete: () => {
        setTrace("done");
        setStepLabel("Walkthrough complete · inspect any agent");
      },
    });
    traceSteps.forEach((step, index) =>
      timeline.call(
        () => {
          setSelected(step.selected);
          setActive(step.active);
          setStepLabel(step.label);
        },
        [],
        index * 1.65,
      ),
    );
    timeline.to({}, { duration: 1.2 });
    timelineRef.current = timeline;
  }

  return (
    <section
      className="system-explorer"
      aria-label={`${system.name} architecture explorer`}
      data-project={projectId}
      data-renderer={status}
    >
      <div className="system-heading">
        <div>
          <span className="system-eyebrow">
            PROJECT STUDY / {system.number}
          </span>
          <h2>Inside {system.name}</h2>
        </div>
        <span className="system-edition">
          {systemNodes.length} {system.unit === "agent" ? "AGENTS" : "STAGES"}
          <br />
          ONE PIPELINE
        </span>
      </div>
      <div className="system-decision">
        <strong>{system.headline}</strong>
        <p>{system.decision}</p>
      </div>
      <div className="system-toolbar">
        <span className="system-hint">
          {status === "ready"
            ? "Interactive 3D architecture"
            : "Interactive architecture"}
        </span>
        {status === "ready" && (
          <button
            aria-pressed={layers}
            onClick={() => setLayers(!layers)}
            className="layer-toggle"
          >
            {layers ? "Collapse layers" : "Inspect layers"}{" "}
            <span aria-hidden="true">{layers ? "−" : "+"}</span>
          </button>
        )}
      </div>
      <div
        className={`system-stage ${status !== "ready" ? "is-flat" : ""} ${layers ? "is-exploded" : ""}`}
        ref={hostRef}
      >
        <canvas ref={canvasRef} aria-hidden="true" />
        {status !== "ready" && (
          <svg
            className="system-flat-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {system.edges.map(([from, to]) => (
              <path
                key={from + "-" + to}
                d={`M${fallbackPositions[from][0]} ${fallbackPositions[from][1]} L${fallbackPositions[to][0]} ${fallbackPositions[to][1]}`}
              />
            ))}
          </svg>
        )}
        {systemNodes.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              labelsRef.current[index] = element;
            }}
            className={`system-node ${active.includes(index) ? "is-active" : ""}`}
            aria-pressed={selected === index}
            aria-label={`Inspect ${item.name} ${system.unit}`}
            onClick={() => selectNode(index)}
            style={{
              "--flat-x": `${fallbackPositions[index][0]}%`,
              "--flat-y": `${fallbackPositions[index][1]}%`,
            }}
          >
            <span className="node-index">0{index + 1}</span>
            {item.short}
          </button>
        ))}
        <div className="system-orientation" aria-hidden="true">
          <span>↑</span> DATA FLOW <span>→</span>
        </div>
      </div>
      {layers && (
        <div className="system-layer-key" aria-label="Component layers">
          {system.legend.map((label, index) => (
            <span key={label}>
              <i aria-hidden="true">{index + 1}</i>
              {label}
            </span>
          ))}
        </div>
      )}
      <div className="system-inspector" aria-live="polite" aria-atomic="true">
        <div className="inspector-header">
          <span className="inspector-number">0{selected + 1}</span>
          <h3>{node.name}</h3>
          <span className="inspector-layer">{node.layer}</span>
        </div>
        <p>{node.detail}</p>
        <div className="inspector-output">
          <span>OUTPUT</span>
          {node.output}
        </div>
      </div>
      <div className="system-trace">
        <div className="trace-caption">
          <span
            className={
              trace === "playing" ? "trace-dot is-playing" : "trace-dot"
            }
          />
          <span>{stepLabel}</span>
        </div>
        <button onClick={runTrace} className="trace-button">
          {reduced
            ? "Next stage"
            : trace === "playing"
              ? "Pause walkthrough"
              : trace === "paused"
                ? "Resume walkthrough"
                : trace === "done"
                  ? "Replay example"
                  : "Trace a request"}
          <span aria-hidden="true">{trace === "playing" ? "Ⅱ" : "→"}</span>
        </button>
      </div>
      <div className="system-evidence">
        <span>PROJECT EVIDENCE</span>
        <p>{system.evidence}</p>
      </div>
      <div className="system-footnote">
        <span>Illustrative flow · not live inference</span>
        <a href={`#${projectId}`} onClick={onNotes}>
          Project notes <span aria-hidden="true"><Arrow diagonal className="inline-arrow" /></span>
        </a>
      </div>
    </section>
  );
}
