import React, { useId, useState } from "react";

// PUBLIC_INTERFACE
export default function TodoInput({ onAdd }) {
  /** Input row for adding a new task. Enter submits; empty values are ignored. */
  const [value, setValue] = useState("");
  const inputId = useId();

  function submit() {
    onAdd(value);
    setValue("");
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="todoInputRow">
      <label className="srOnly" htmlFor={inputId}>
        Add a new task
      </label>
      <input
        id={inputId}
        className="todoInput"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Add a task…"
        autoComplete="off"
        inputMode="text"
      />
      <button type="button" className="btn btnPrimary" onClick={submit} disabled={!value.trim()}>
        Add
      </button>
    </div>
  );
}
