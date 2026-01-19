import React from "react";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

// PUBLIC_INTERFACE
export default function TodoFilters({ value, onChange }) {
  /** Filter control row. Uses aria-pressed for accessible toggle group semantics. */
  return (
    <div className="todoFilters" role="group" aria-label="Task filters">
      {FILTERS.map((f) => {
        const active = value === f.value;
        return (
          <button
            key={f.value}
            type="button"
            className={`filterBtn ${active ? "isActive" : ""}`}
            aria-pressed={active}
            onClick={() => onChange(f.value)}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
