import { useId } from "react";
import { systems } from "../data/projectSystems";

const layouts = {
  cicd: {
    desktop: [[66, 135], [202, 135], [350, 63], [350, 207], [494, 135]],
    mobile: [[77, 44], [243, 44], [243, 144], [77, 144], [160, 246]],
    label: "CI/CD / PREDICTION PIPELINE",
    principle: "Prediction + explanation",
    delivery: "Docker / FastAPI / AWS",
  },
  ufc: {
    desktop: [[66, 135], [206, 63], [350, 63], [206, 207], [350, 207], [494, 207]],
    mobile: [[77, 44], [243, 44], [243, 144], [77, 144], [243, 246], [77, 246]],
    label: "UFC / DATA PIPELINE",
    principle: "Only pre-fight information",
    delivery: "130 features / 155 tests",
  },
};

function Diagram({ system, points, mobile, marker }) {
  const halfWidth = mobile ? 65 : 61;
  const halfHeight = 27;
  const connection = (from, to) => {
    const [x, y] = points[from];
    const [tx, ty] = points[to];
    const dx = tx - x, dy = ty - y;
    const inset = Math.min(dx ? halfWidth / Math.abs(dx) : Infinity, dy ? halfHeight / Math.abs(dy) : Infinity);
    return `M${x + dx * inset} ${y + dy * inset}L${tx - dx * inset} ${ty - dy * inset}`;
  };
  return (
    <svg className={mobile ? "pipeline-mobile" : "pipeline-desktop"} viewBox={mobile ? "0 0 320 290" : "0 0 560 270"} fill="none" aria-hidden="true">
      <defs>
        <marker id={marker} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="m1 1 5 3-5 3" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </marker>
      </defs>
      <g className="pipeline-routes" strokeWidth="1.2">
        {system.edges.map(([from, to]) => <path key={`${from}-${to}`} d={connection(from, to)} markerEnd={`url(#${marker})`} />)}
      </g>
      {system.nodes.map((node, index) => {
        const [x, y] = points[index];
        return (
          <g key={node.id} className={`pipeline-node ${node.kind === "output" ? "pipeline-output" : ""}`}>
            <rect x={x - halfWidth} y={y - halfHeight} width={halfWidth * 2} height={halfHeight * 2} rx="3" />
            <text x={x} y={y - 3} textAnchor="middle" className="pipeline-node-title">{node.short}</text>
            <text x={x} y={y + 13} textAnchor="middle" className="pipeline-node-detail">{node.layer}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function PipelineVisual({ type }) {
  const id = useId().replace(/:/g, "");
  const system = systems[type];
  const layout = layouts[type];
  return (
    <div className={`project-visual pipeline-visual pipeline-${type}`} role="img" aria-label={`${system.name} architecture: ${system.nodes.map(node => node.name).join(", ")}. ${system.decision}`}>
      <div className="visual-label"><span>{layout.label}</span><span>FLOW / {system.number}</span></div>
      <Diagram system={system} points={layout.desktop} marker={`${id}-desktop`} />
      <Diagram system={system} points={layout.mobile} marker={`${id}-mobile`} mobile />
      <div className="visual-bottom"><span>{layout.principle}</span><span>{layout.delivery}</span></div>
    </div>
  );
}
