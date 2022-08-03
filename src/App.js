import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Todolist from "./TodoList";
import uuidv4 from "uuid/v4";
const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }
  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }
  return (
    <>
      <div>
        <h1 id="title">To Do List</h1>
      </div>

      <Todolist todos={todos} toggleTodo={toggleTodo} />
      <input id="input" ref={todoNameRef} type="text" />

      <Button variant="contained" id="addtodo" onClick={handleAddTodo}>
        Add
      </Button>
      <br></br>
      <Button variant="contained" id="clear" onClick={handleClearTodos}>
        Clear
      </Button>
      <div id="lefttodo">
        {todos.filter((todo) => !todo.complete).length} Left To Do
      </div>
    </>
  );
}

export default App;
