
import { useState } from "react";
import "./login.css";
import { useNavigate, Link } from "react-router-dom";

import {
  FileUser,
  Mail,
  LockKeyhole,
} from "lucide-react";

function Login() {
  const API_URL = "http://localhost:8000/api/auth/login";

  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formdata),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login unsuccessful");
        return;
      }

      alert(data.message || "Login successful!");

      navigate("/fetching");
    } catch (error) {
      console.log(error);
      alert("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-heading">
          <div className="login-logo">
            <FileUser size={38} strokeWidth={1.8} />
          </div>

          <h1>Welcome Back</h1>
          <p>Login to your Resume Analyser account</p>
        </div>

        <label htmlFor="email">Email</label>

        <div className="login-input-group">
          <Mail size={21} />

          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formdata.email}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="password">Password</label>

        <div className="login-input-group">
          <LockKeyhole size={21} />

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formdata.password}
            onChange={handleChange}
            required
          />
        </div>
           <div className="forgot-password">
    <Link to="/forgot-password">
        Forgot Password?
    </Link>
</div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p className="login-message" role="status">
            {message}
          </p>
        )}

        <p className="login-footer">
          Don't have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
