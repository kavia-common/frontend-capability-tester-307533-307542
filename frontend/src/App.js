import React from "react";
import "./App.css";
import TodoApp from "./components/TodoApp";

// PUBLIC_INTERFACE
function App() {
  /** Application entry component rendering the To-Do app. */
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
