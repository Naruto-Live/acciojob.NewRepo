import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }

    setConfirmPasswordError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;

    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    setPassword(value);
    validatePassword(value);

    if (confirmPassword) {
      if (value !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;

    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid =
      validateConfirmPassword(confirmPassword);

    if (
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      alert("Form submitted successfully");
    } else {
      alert("Can't submit the form");
    }
  };

  return (
    <div className="page">
      <div className="signup-container">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={
                email === ""
                  ? ""
                  : emailError
                  ? "invalid"
                  : "valid"
              }
              placeholder="Enter your email"
            />

            {emailError && (
              <p className="error">{emailError}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={
                password === ""
                  ? ""
                  : passwordError
                  ? "invalid"
                  : "valid"
              }
              placeholder="Enter your password"
            />

            {passwordError && (
              <p className="error">{passwordError}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={
                confirmPassword === ""
                  ? ""
                  : confirmPasswordError
                  ? "invalid"
                  : "valid"
              }
              placeholder="Confirm your password"
            />

            {confirmPasswordError && (
              <p className="error">
                {confirmPasswordError}
              </p>
            )}
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default App;