import React, { useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";
import TodoStats from "./TodoStats";

/**
 * @typedef {"all"|"active"|"completed"} Filter
 */

/**
 * Generate a reasonably unique id without extra deps.
 * @returns {string}
 */
function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * @typedef {{ id: string, title: string, completed: boolean, createdAt: number }} Todo
 */

// PUBLIC_INTERFACE
export default function TodoApp() {
  /** Main to-do app with localStorage persistence, filtering, and inline editing. */
  const [todos, setTodos] = useLocalStorage("ocean_todos_v1", /** @type {Todo[]} */ ([]));
  const [filter, setFilter] = useState(/** @type {Filter} */ ("all"));

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [todos]);

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  function addTodo(title) {
    const trimmed = title.trim();
    if (!trimmed) return;
    /** @type {Todo} */
    const next = { id: createId(), title: trimmed, completed: false, createdAt: Date.now() };
    setTodos((prev) => [next, ...prev]);
  }

  function toggleTodo(id) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTitle(id, title) {
    const trimmed = title.trim();
    if (!trimmed) {
      // If user clears the title entirely, treat it as delete (common UX).
      deleteTodo(id);
      return;
    }
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t)));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  return (
    <div className="todoShell">
      <header className="todoHeader" role="banner">
        <div className="todoHeaderInner">
          <div className="todoHeaderTitle">
            <h1>To‑Do</h1>
            <p className="todoHeaderSubtitle">Ocean Professional task list with local persistence.</p>
          </div>
          <TodoStats stats={stats} onClearCompleted={clearCompleted} />
        </div>
      </header>

      <main className="todoMain" role="main">
        <section className="todoCard" aria-label="Task manager">
          <div className="todoCardTop">
            <TodoInput onAdd={addTodo} />
            <TodoFilters value={filter} onChange={setFilter} />
          </div>

          <TodoList
            todos={filteredTodos}
            emptyState={{
              title:
                filter === "completed"
                  ? "No completed tasks"
                  : filter === "active"
                    ? "No active tasks"
                    : "No tasks yet",
              description:
                filter === "all"
                  ? "Add a task above and press Enter."
                  : "Try switching filters to see other tasks.",
            }}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdateTitle={updateTitle}
          />
        </section>
      </main>
    </div>
  );
}
