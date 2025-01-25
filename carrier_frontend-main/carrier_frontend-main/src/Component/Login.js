import React, { useState } from "react";
import axios from "axios";
import Register from "./Register";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const buttonStyles = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    transform: isButtonPressed ? "scale(0.95)" : "scale(1)",
    boxShadow: isButtonPressed 
      ? "0 1px 2px rgba(0,0,0,0.2)" 
      : "0 2px 4px rgba(0,0,0,0.2)",
    ":hover": {
      backgroundColor: "#45a049",
    }
  };

  const startTestButtonStyles = {
    padding: "10px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    transform: isButtonPressed ? "scale(0.95)" : "scale(1)",
    boxShadow: isButtonPressed 
      ? "0 1px 2px rgba(0,0,0,0.2)" 
      : "0 2px 4px rgba(0,0,0,0.2)",
    ":hover": {
      backgroundColor: "#1976D2",
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsButtonPressed(true);

    try {
      const response = await axios.post(
        "https://carrier-api-latest.onrender.com/User/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        setName(response.data.name);
        setIsModalVisible(true);
        setIsLoggedIn(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed! Please try again."
      );
    } finally {
      // Reset button state after a short delay
      setTimeout(() => {
        setIsButtonPressed(false);
      }, 200);
    }
  };

  const handleStartTest = () => {
    setIsButtonPressed(true);
    window.open(`/starttest?name=${encodeURIComponent(name)}`, "_blank");
    // Reset button state after a short delay
    setTimeout(() => {
      setIsButtonPressed(false);
    }, 200);
  };

  const handleRegisterClick = () => {
    setIsRegisterVisible(true);
  };

  const handleLoginClick = () => {
    setIsRegisterVisible(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      {!isLoggedIn && (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            {error && (
              <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
            )}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              type="submit"
              style={buttonStyles}
              onMouseDown={() => setIsButtonPressed(true)}
              onMouseUp={() => setIsButtonPressed(false)}
              onMouseLeave={() => setIsButtonPressed(false)}
            >
              Login
            </button>
          </form>
          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Don't have an account?{" "}
            <span
              onClick={handleRegisterClick}
              style={{
                color: "#4CAF50",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Register here
            </span>
          </p>
        </>
      )}

      {isModalVisible && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3>Welcome, {name}!</h3>
            <p>You have logged in successfully.</p>
            <button
              onClick={handleStartTest}
              style={startTestButtonStyles}
              onMouseDown={() => setIsButtonPressed(true)}
              onMouseUp={() => setIsButtonPressed(false)}
              onMouseLeave={() => setIsButtonPressed(false)}
            >
              Start Test
            </button>
          </div>
        </div>
      )}

      {isRegisterVisible && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <Register handleLoginClicks={handleLoginClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;