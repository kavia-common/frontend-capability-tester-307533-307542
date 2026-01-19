import React, { useEffect, useId, useRef, useState } from "react";

// PUBLIC_INTERFACE
export default function TodoItem({ todo, onToggle, onDelete, onUpdateTitle }) {
  /** Single task row with toggle, inline edit, and delete. */
  const checkboxId = useId();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef(null);

  useEffect(() => {
    // Keep draft in sync if parent updates title while not editing.
    if (!isEditing) setDraft(todo.title);
  }, [todo.title, isEditing]);

  useEffect(() => {
    if (isEditing) {
      // Focus & select on edit start for fast keyboard editing.
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function beginEdit() {
    setIsEditing(true);
    setDraft(todo.title);
  }

  function cancelEdit() {
    setIsEditing(false);
    setDraft(todo.title);
  }

  function commitEdit() {
    setIsEditing(false);
    onUpdateTitle(draft);
  }

  function onEditKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  }

  return (
    <li className={`todoItem ${todo.completed ? "isCompleted" : ""}`}>
      <div className="todoLeft">
        <input
          id={checkboxId}
          type="checkbox"
          className="todoCheckbox"
          checked={todo.completed}
          onChange={onToggle}
        />
        <label htmlFor={checkboxId} className="srOnly">
          Toggle task completion
        </label>

        {!isEditing ? (
          <button
            type="button"
            className="todoTitleButton"
            onClick={beginEdit}
            aria-label={`Edit task: ${todo.title}`}
          >
            <span className="todoTitle">{todo.title}</span>
          </button>
        ) : (
          <div className="todoEditWrap">
            <label className="srOnly" htmlFor={`${checkboxId}-edit`}>
              Edit task title
            </label>
            <input
              id={`${checkboxId}-edit`}
              ref={inputRef}
              className="todoEditInput"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onEditKeyDown}
              onBlur={commitEdit}
            />
            <div className="todoEditHint" aria-hidden="true">
              Enter to save • Esc to cancel
            </div>
          </div>
        )}
      </div>

      <div className="todoActions">
        {!isEditing ? (
          <button type="button" className="btn btnGhost" onClick={beginEdit}>
            Edit
          </button>
        ) : (
          <button type="button" className="btn btnGhost" onClick={cancelEdit}>
            Cancel
          </button>
        )}
        <button type="button" className="btn btnDanger" onClick={onDelete} aria-label="Delete task">
          Delete
        </button>
      </div>
    </li>
  );
}
