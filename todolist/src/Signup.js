import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./App.css"; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading spinner

    try {
      await axios.post("https://todolist-app-xvty.onrender.com/signup", {
        username,
        email,
        password,
      });

      // If the signup is successful, show success toast
      toast.success("Signup successful! Please login.", {
        position: "top-right",
        autoClose: 2000,
        closeButton: false,
      });

      navigate("/login"); // Redirect to login page
    } catch (error) {
      setLoading(false); // Stop loading spinner

      // Check the error response and display specific messages
      if (error.response) {
        // If the server returned a response
        if (error.response.status === 400) {
          toast.error(
            "User already exists. Please login or use a different email.",
            {
              position: "top-right",
              autoClose: 3000,
              closeButton: false,
            }
          );
        } else {
          toast.error("Signup failed. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            closeButton: false,
          });
        }
      } else if (error.request) {
        // No response from the server
        toast.error("No response from server. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          closeButton: false,
        });
      } else {
        // Something else went wrong
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          closeButton: false,
        });
      }
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>

      <div className="link">
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
