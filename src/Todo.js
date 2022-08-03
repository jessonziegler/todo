import React from "react";
import "./App.css";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  return (
    <div>
      <label>
        <input
          id="checkbox"
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />

        {todo.name}
      </label>
    </div>
  );
}
