import { useState } from "react";
import DesignAccent from "./DesignAccent";
import { systems } from "../data/projectSystems";

export default function ProjectSignalIndex() {
  const [active, setActive] = useState(0);
  return (
    <nav className="project-signal-index" aria-label="Selected project index">
      <DesignAccent
        kind="rail"
        className="project-signal-rail"
        active={active}
      />
      {Object.values(systems).map((project, index) => (
        <a
          key={project.id}
          href={`#${project.id}`}
          data-active={active === index}
          onPointerEnter={() => setActive(index)}
          onFocus={() => setActive(index)}
          onClick={() => setActive(index)}
        >
          <span>{project.number}</span>
          <strong>{project.tab}</strong>
          <span className="signal-index-arrow" aria-hidden="true">
            ↘
          </span>
        </a>
      ))}
    </nav>
  );
}
