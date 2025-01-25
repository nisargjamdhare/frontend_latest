import React, { useState } from "react";
import axios from "axios";

const Register = (props) => {
  const [showRegisterModal, setShowRegisterModal] = useState(true); // State for register modal visibility
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [message, setMessage] = useState(""); // State to display backend messages

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Call the registration API
      const response = await axios.post("https://carrier-api-latest.onrender.com/User/register", {
        name, // Include name in the request
        email,
        password,
      });

      if (response.status === 200) {
        const { message, user } = response.data;
        setMessage(message); // Set success message
        console.log("User Details:", user);
        // Once the alert is closed, show the login modal
        props.handleLoginClicks(true);
        setShowRegisterModal(false); // Hide register modal
      }
    } catch (error) {
      // Handle error response
      if (error.response) {
        setMessage(error.response.data.message || "Registration failed!");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      {showRegisterModal && (
        <>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            {/* Name Field */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            {/* Email Field */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
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
            {/* Password Field */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Password:</label>
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
            {/* Confirm Password Field */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Register
            </button>
          </form>
          {message && (
            <p
              style={{
                marginTop: "15px",
                textAlign: "center",
                color: message.includes("successfully") ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}
          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Already have an account?{" "}
            <span
              onClick={props.handleLoginClicks}
              style={{
                color: "#4CAF50",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Login here
            </span>
          </p>
        </>
      )}

    </div>
  );
};

export default Register;
