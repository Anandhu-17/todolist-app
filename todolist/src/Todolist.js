import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing a spinner from react-spinners for better style
import { PulseLoader } from "react-spinners"; // You can customize the spinner

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false); // For managing loading state

  // Fetch tasks from the backend
  const fetchTodos = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        "https://todolist-app-xvty.onrender.com/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // Stop loading after API call
    }
  };

  // Handle input change for adding new tasks
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Add a new to-do
  const addTodo = async () => {
    if (input.trim() === "") {
      // Show an error toast if the input is empty
      toast.error("Task cannot be empty.", {
        position: "top-right",
        autoClose: 2000,
        closeButton: false,
      });
      return; // Don't proceed if the input is empty
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://todolist-app-xvty.onrender.com/todos",
        {
          text: input,
        }
      );
      setTodos([...todos, response.data]);
      setInput(""); // Clear the input field after successful addition

      // Show success toast after adding the task
      toast.success(`Task "${response.data.text}" added!`, {
        position: "top-right",
        autoClose: 2000,
        closeButton: false,
      });
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task.", {
        position: "top-right",
        autoClose: 2000,
        closeButton: false,
      });
    } finally {
      setLoading(false); // Stop loading after API call
    }
  };

  // Remove a to-do
  const removeTodo = async (id) => {
    setLoading(true); // Start loading
    try {
      await axios.delete(`https://todolist-app-xvty.onrender.com/todos/${id}`);
      const deletedTodo = todos.find((todo) => todo._id === id);
      setTodos(todos.filter((todo) => todo._id !== id));

      // Show success toast after deleting the task
      toast.error(`Task "${deletedTodo.text}" deleted!`, {
        position: "top-right",
        autoClose: 2000,
        closeButton: false,
      });
    } catch (error) {
      console.error("Error removing task:", error);
      toast.error("Failed to delete task.", {
        position: "top-right",
        autoClose: 2000,
        closeButton: false,
      });
    } finally {
      setLoading(false); // Stop loading after API call
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
    if (editText.trim() === "") {
      // Show an error toast if the edited text is empty
      toast.error("Task cannot be empty.", {
        position: "top-right",
        autoClose: 2000,
        closeButton: false,
      });
      return; // Don't proceed if the input is empty
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.put(
        `https://todolist-app-xvty.onrender.com/todos/${id}`,
        {
          text: editText,
        }
      );
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? response.data : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
      setEditText("");

      // Show success toast after saving the task
      toast.success(`Task "${response.data.text}" updated!`, {
        position: "top-right",
        autoClose: 2000,
        closeButton: false,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.", {
        position: "top-right",
        autoClose: 2000,
        closeButton: false,
      });
    } finally {
      setLoading(false); // Stop loading after API call
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

      {/* Show loading spinner or tasks */}
      {loading ? (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <PulseLoader size={15} color={"#36D7B7"} /> {/* Stylish spinner */}
        </div>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={todo._id}>
              {editIndex === index ? (
                // If the task is being edited, show an input field and Save button
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="text"
                    value={editText}
                    onChange={handleEditChange}
                    style={{ marginTop: "1.5rem" }}
                  />
                  <button
                    onClick={() => saveEdit(todo._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <span>{todo.text}</span> // Display the task text
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
      )}

      {/* Toast Notifications Container */}
      <ToastContainer />
    </div>
  );
};

export default TodoList;
