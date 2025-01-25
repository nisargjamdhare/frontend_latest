import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const HomePage = () => {
  // State for managing modal visibility
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Handlers for opening and closing modals
  const handleLoginClick = () => {
    setShowRegister(false); // Ensure only one modal is open at a time
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false); // Ensure only one modal is open at a time
    setShowRegister(true);
  };

  const handleCloseModal = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <>
      <div className="auth-buttons">
        <button className="auth-button" onClick={handleLoginClick}>
          Login
        </button>
        <button className="auth-button" onClick={handleRegisterClick}>
          Register
        </button>
      </div>

      <div className="App-content">
        <h1>
          <b>Let’s Kick Start Your Dream</b> <br />
          <b>Career</b>
        </h1>
        <div className="LetsStarted">
          <button className="start-button" onClick={handleRegisterClick}>
            Let’s Get Started
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <Login />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <Register handleLoginClicks={handleLoginClick} />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
