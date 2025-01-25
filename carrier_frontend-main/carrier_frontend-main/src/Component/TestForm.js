import React, { useState, useEffect } from 'react';
import '../Css/TestForm.css';

// SkillResponse Model
function SkillResponse(question, answer) {
  this.question = question;
  this.answer = answer;
}

// InterviewForm Model
function InterviewForm() {
  this.formResponse = []; // Array of SkillResponse objects
  this.interviewResponse = ''; // Interview response as a string
}

const TestForm = () => {
  const [skills, setSkills] = useState({});
  const [isReadyToRecord, setIsReadyToRecord] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const skillLevels = [
    'Choose option', 'Not interested', 'Poor', 'Beginner', 
    'Average', 'Intermediate', 'Excellent', 'Professional'
  ];

  const skillCategories = [
    { name: 'Database Fundamentals', defaultValue: 'Choose option' },
    { name: 'Computer Architecture', defaultValue: 'Choose option' },
    { name: 'Distributed Computing Systems', defaultValue: 'Choose option' },
    { name: 'Cyber Security', defaultValue: 'Choose option' },
    { name: 'Computer Networking', defaultValue: 'Choose option' },
    { name: 'Software Development', defaultValue: 'Choose option' },
    { name: 'Programming Skills', defaultValue: 'Professional' },
    { name: 'Project Management', defaultValue: 'Choose option' },
    { name: 'Computer Forensics Fundamentals', defaultValue: 'Choose option' }
  ];

  const interviewForm = new InterviewForm();

  useEffect(() => {
    const initialSkills = Object.fromEntries(
      skillCategories.map(category => [category.name, category.defaultValue])
    );
    setSkills(initialSkills);
  }, []);

  const handleSkillChange = (skill, value) => {
    setSkills(prev => ({
      ...prev,
      [skill]: value
    }));
  };

  const handleSubmit = () => {
    const responses = Object.entries(skills).map(([question, answer]) => ({
      question,
      answer
    }));

    console.log('Question-Answer Responses:', responses);

    // Store responses in the interviewForm object
    responses.forEach(({ question, answer }) => {
      interviewForm.formResponse.push(new SkillResponse(question, answer));
    });
    console.log('Interview Form Responses:', interviewForm.formResponse);

    setIsSubmitted(true); // Mark as submitted to show the next step
  };

  const handleReadyToRecord = (e) => {
    setIsReadyToRecord(e.target.checked);
  };

  const handleRedirectToInterview = () => {
    if (isReadyToRecord) {
      // Serialize the interviewForm object to query parameters
      const queryParams = new URLSearchParams({
        formResponse: JSON.stringify(interviewForm.formResponse),
        interviewResponse: interviewForm.interviewResponse,
      }).toString();

      // Redirect to the next page with the interviewForm data as query parameters
      window.open(`/speechtotext?${queryParams}`, '_blank');
      console.log("passed the form response to the next page");
    } else {
      console.log('User is not ready for the interview.');
    }
  };

  return (
    <div className="test-form-container">
      <div className="test-form-header">
        <h2 className="test-form-title">RATE YOURSELF...!!</h2>
      </div>

      <form className="test-form-content">
        <div className="skills-container">
          {skillCategories.map((category) => (
            <div key={category.name} className="skill-item">
              <label className="skill-label">{category.name}</label>
              <select
                value={skills[category.name]}
                onChange={(e) => handleSkillChange(category.name, e.target.value)}
                className="skill-select"
              >
                {skillLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </form>

      <div className="submit-button-container">
        {!isSubmitted && (
          <button
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>

      {isSubmitted && (
        <>
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={isReadyToRecord}
                onChange={handleReadyToRecord}
              />
              I am ready to record a demo audio interview
            </label>
          </div>

          {isReadyToRecord && (
            <div className="redirect-button-container">
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                type="button"
                onClick={handleRedirectToInterview}
              >
                Proceed to Interview
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestForm;
