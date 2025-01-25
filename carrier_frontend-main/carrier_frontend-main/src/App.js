import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import backgroundImage from "./Images/career.jpg";
import StartTest from "./Component/StartTest";
import HomePage from "./Component/HomePage";
import TestForm from './Component/TestForm';
import SpeechToText from "./Component/SpeechToText";

function App() {
  const location = useLocation();

  const getBackgroundStyle = () => {
    if (location.pathname === "/starttest") {
      return {
        backgroundImage: "none",
      };
    }
    return {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  };

  return (
    <div className="App" style={getBackgroundStyle()}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<HomePage type="login" />} />
        <Route path="/register" element={<HomePage type="register" />} />
        <Route path="/starttest" element={<StartTest />} />
        <Route path="/testform" element={<TestForm isDemoInterview={true} />} />
        <Route path="/speechtotext" element={<SpeechToText />} />
      </Routes>
    </div>
  );
}

export default App;
