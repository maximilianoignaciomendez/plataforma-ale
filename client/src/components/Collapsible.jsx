import { useState } from "react";

// Wraps a section under a clickable title that toggles its content.
// Reuses the existing .section-title look, just adds a chevron + toggle.
export default function Collapsible({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button type="button" className="collapsible-toggle" onClick={() => setOpen(!open)}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform 0.15s ease" }}
        >
          <path d="M7 4l6 6-6 6" />
        </svg>
        {title}
      </button>
      {open && children}
    </div>
  );
}
