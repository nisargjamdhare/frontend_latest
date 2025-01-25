import React, { useState } from "react";
import TestForm from "./TestForm"; // Import the TestForm component

function StartTest() {
  const [isChecked, setIsChecked] = useState(false); // To control checkbox state
  const [isTestFormVisible, setIsTestFormVisible] = useState(false); // To show/hide TestForm
  const [isDemoInterview, setIsDemoInterview] = useState(false); // To control demo interview state

  // Handle the checkbox change event for Demo Interview
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setIsDemoInterview(e.target.checked); // Set isDemoInterview based on checkbox
  };

  // Handle the start button click event
  const handleStartButtonClick = () => {
    setIsTestFormVisible(true);
  };

  return (
    <div style={{height : "100vh"}}>

      <h1 style={{margin : "20px"}}>Welcome to the Guidence Platform</h1>

      {/* Ask for Demo Interview Confirmation */}
      {!isTestFormVisible && !isChecked && (
        <div>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            Do you want to give a Demo Interview?
          </label>
        </div>
      )}

      {/* Show Start Button if checkbox is checked */}
      {isChecked && !isTestFormVisible && (
        <button onClick={handleStartButtonClick}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        >Start QUIZ</button>
      )}

      {/* Show the TestForm when the Start Button is clicked */}
      {isTestFormVisible && <TestForm isDemoInterview={isDemoInterview} />}
    </div>
  );
}

export default StartTest;
