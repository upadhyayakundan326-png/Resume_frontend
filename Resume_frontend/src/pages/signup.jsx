
import { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";

import {
  FileUser,
  UserRound,
  Mail,
  LockKeyhole,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

function Signup() {
  const API_URL = `${API}/api/auth/signup`;

  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    userName: "",
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

    console.log("========== SIGNUP DEBUG START ==========");
    console.log("STEP 1: Button clicked");
    console.log("STEP 2: API URL:", API_URL);
    console.log("STEP 3: Form submitted");

    if (!API) {
      console.error("ERROR: VITE_API_URL is missing");
      setMessage("API URL is missing");
      return;
    }

    setLoading(true);
    setMessage("Creating account...");

    try {
      console.log("STEP 4: Sending request to backend...");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formdata),
      });

      console.log("STEP 5: Response received");
      console.log("HTTP STATUS:", response.status);
      console.log("STATUS TEXT:", response.statusText);

      const data = await response.json();

      console.log("STEP 6: Backend response:", data);

      if (!response.ok) {
        console.error("SIGNUP FAILED:", data);

        setMessage(data.message || "Signup unsuccessful");

        alert(data.message || "Signup unsuccessful");

        return;
      }

      console.log("STEP 7: Signup successful");

      setMessage("OTP sent successfully. Check your email.");

      alert(data.message || "Signup successful. Check your email.");

      console.log("STEP 8: Navigating to OTP page");

      navigate("/otp");

    } catch (error) {
      console.error("SIGNUP CATCH ERROR:", error);
      console.error("ERROR MESSAGE:", error.message);

      setMessage("Server connection failed");

      alert(error.message || "Could not connect to server");

    } finally {
      setLoading(false);
      console.log("========== SIGNUP DEBUG END ==========");
    }
  };

  return (
    <main className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-heading">
          <div className="signup-logo">
            <FileUser size={38} strokeWidth={1.8} />
          </div>

          <h1>Create Account</h1>
          <p>Sign up for Resume Analyser</p>
        </div>

        <label htmlFor="userName">Username</label>

        <div className="input-group">
          <UserRound size={21} />

          <input
            id="userName"
            type="text"
            name="userName"
            placeholder="Enter your username"
            value={formdata.userName}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="email">Email</label>

        <div className="input-group">
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

        <div className="input-group">
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

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="login">
          <p className="signup-footer">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>

        {message && (
          <p className="signup-message" role="status">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}

export default Signup;
