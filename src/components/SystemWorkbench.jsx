import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SystemExplorer from "./SystemExplorer";
import { systems } from "../data/projectSystems";

export default function SystemWorkbench({
  initialProject = "reply-mirror",
  onNotes,
}) {
  const [projectId, setProjectId] = useState(initialProject);
  const id = useId();
  const tabRefs = useRef([]);
  const projects = Object.values(systems);
  const changeTab = (event, index) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % projects.length;
    if (event.key === "ArrowLeft")
      next = (index + projects.length - 1) % projects.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = projects.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setProjectId(projects[next].id);
    tabRefs.current[next]?.focus();
  };
  return (
    <div className="system-workbench">
      <div
        className="system-project-tabs"
        role="tablist"
        aria-label="Explore project architecture"
      >
        {projects.map((project, index) => (
          <button
            key={project.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            id={`${id}-${project.id}`}
            aria-controls={`${id}-panel`}
            aria-selected={projectId === project.id}
            tabIndex={projectId === project.id ? 0 : -1}
            onClick={() => setProjectId(project.id)}
            onKeyDown={(event) => changeTab(event, index)}
          >
            <span>{project.number}</span>
            {project.tab}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${projectId}`}
      >
        <SystemExplorer
          key={projectId}
          projectId={projectId}
          onNotes={onNotes}
        />
      </div>
    </div>
  );
}

function ArchitectureDialog({ project, onClose }) {
  const dialogRef = useRef(null);
  const id = useId();
  useEffect(() => {
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    const trigger = document.activeElement;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog
      ref={dialogRef}
      className="architecture-dialog"
      aria-labelledby={id}
      data-lenis-prevent
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="architecture-dialog-bar">
        <span id={id}>THE ENGINEERING, EXPLAINED</span>
        <button
          onClick={onClose}
          aria-label="Close architecture explorer"
          autoFocus
        >
          Close <span aria-hidden="true">×</span>
        </button>
      </div>
      <SystemWorkbench initialProject={project.id} onNotes={onClose} />
    </dialog>,
    document.body,
  );
}

export function ArchitectureButton({ project }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="architecture-button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm0 10v10M3 7l9 5 9-5M7.5 4.5l9 5v5" />
        </svg>
        Explore architecture<span className="sr-only"> of {project.title}</span>
        <span aria-hidden="true">↗</span>
      </button>
      {open && (
        <ArchitectureDialog project={project} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
