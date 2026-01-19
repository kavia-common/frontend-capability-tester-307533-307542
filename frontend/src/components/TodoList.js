import React from "react";
import TodoItem from "./TodoItem";

// PUBLIC_INTERFACE
export default function TodoList({ todos, emptyState, onToggle, onDelete, onUpdateTitle }) {
  /** Renders the task list and empty state. */
  if (!todos.length) {
    return (
      <div className="todoEmpty" role="status" aria-live="polite">
        <div className="todoEmptyIcon" aria-hidden="true">
          ✓
        </div>
        <div className="todoEmptyText">
          <div className="todoEmptyTitle">{emptyState?.title ?? "Nothing here"}</div>
          <div className="todoEmptyDescription">{emptyState?.description ?? ""}</div>
        </div>
      </div>
    );
  }

  return (
    <ul className="todoList" aria-label="Tasks">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => onToggle(t.id)}
          onDelete={() => onDelete(t.id)}
          onUpdateTitle={(title) => onUpdateTitle(t.id, title)}
        />
      ))}
    </ul>
  );
}
