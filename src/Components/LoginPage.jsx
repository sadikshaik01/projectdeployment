import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = ({ switchToSignup, switchToForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:2025/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const user = await response.json();

        // ✅ Log to inspect what fields are returned
        console.log("User response from backend:", user);

        // ✅ Extract name from the response
        const fullName = user.fullName || user.username || user.email;

        if (!fullName) {
          alert("Login succeeded, but username is missing from server response.");
          return;
        }

        // ✅ Store in localStorage
        localStorage.setItem("username", fullName);
        localStorage.setItem("user", JSON.stringify(user));

        alert(`Welcome, ${fullName}`);
        window.location.reload(); // Refresh to show username in Navbar
      } else {
        const errorText = await response.text();
        alert(`Login failed: ${errorText}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Please login to your account</p>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="input-field"
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            required
            className="input-field"
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

        <div className="footer-text">
          <span className="link" onClick={switchToForgotPassword}>
            Forgot Password?
          </span>
        </div>

        <div className="footer-text">
          Don't have an account?{" "}
          <span className="link" onClick={switchToSignup}>Sign Up</span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
