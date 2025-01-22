// src/TodoList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Index of the task being edited
  const [editText, setEditText] = useState(""); // Text of the task being edited

  // Fetch tasks from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Handle input change for adding new tasks
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Add a new to-do
  const addTodo = async () => {
    if (input.trim()) {
      try {
        const response = await axios.post("http://localhost:5000/todos", {
          text: input,
        });
        setTodos([...todos, response.data]);
        setInput("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Remove a to-do
  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  // Start editing a task
  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  // Handle change in task edit
  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  // Save the edited task
  const saveEdit = async (id) => {
    if (editText.trim()) {
      try {
        const response = await axios.put(`http://localhost:5000/todos/${id}`, {
          text: editText,
        });
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? response.data : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
        setEditText("");
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>

      {/* Input for adding new tasks */}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={todo._id}>
            {editIndex === index ? (
              // If the task is being edited, show an input field and Save button next to it
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                  style={{ flex: 1 }}
                />
                <button
                  onClick={() => saveEdit(todo._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Save
                </button>
              </div>
            ) : (
              <span>{todo.text}</span> // If not editing, show the task text
            )}

            {/* Edit and Delete buttons */}
            {editIndex !== index && (
              <div>
                <button
                  onClick={() => startEditing(index)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>
                <button onClick={() => removeTodo(todo._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
