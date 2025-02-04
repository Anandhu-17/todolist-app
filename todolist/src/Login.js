import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PulseLoader } from "react-spinners"; // For the loading spinner
import "./App.css"; // Import the CSS file
import "./TaskMateTitle";
import TaskMateTitle from "./TaskMateTitle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://todolist-app-xvty.onrender.com/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
        closeButton: false,
      });

      navigate("/todos"); // Redirect to todos page after successful login
    } catch (error) {
      setError("Invalid credentials");
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 2000,
        closeButton: false,
      });
    } finally {
      setLoading(false); // Stop loading after the API call
    }
  };

  return (
    <div className="container">
      <TaskMateTitle />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Show a loading spinner when logging in */}
      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <PulseLoader size={15} color={"#36D7B7"} />
        </div>
      )}

      <div className="link">
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
