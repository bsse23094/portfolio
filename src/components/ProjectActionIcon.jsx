export default function ProjectActionIcon({ notes = false }) {
  return (
    <svg
      className="project-action-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={notes
          ? "M6 3h9l4 4v14H5V3h1Zm8 0v5h5M9 12h6m-6 4h6"
          : "m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9v9M4 7.5l8 4.5 8-4.5"}
      />
    </svg>
  );
}
