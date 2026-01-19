import React from "react";

// PUBLIC_INTERFACE
export default function TodoStats({ stats, onClearCompleted }) {
  /** Displays counts and provides 'clear completed'. */
  const canClear = (stats?.completed ?? 0) > 0;

  return (
    <div className="todoStats" aria-label="Task statistics">
      <div className="todoPills" aria-hidden="false">
        <span className="pill">
          <span className="pillLabel">Total</span>
          <span className="pillValue">{stats?.total ?? 0}</span>
        </span>
        <span className="pill">
          <span className="pillLabel">Active</span>
          <span className="pillValue">{stats?.active ?? 0}</span>
        </span>
        <span className="pill pillWarn">
          <span className="pillLabel">Done</span>
          <span className="pillValue">{stats?.completed ?? 0}</span>
        </span>
      </div>

      <button type="button" className="btn btnSecondary" onClick={onClearCompleted} disabled={!canClear}>
        Clear completed
      </button>
    </div>
  );
}
