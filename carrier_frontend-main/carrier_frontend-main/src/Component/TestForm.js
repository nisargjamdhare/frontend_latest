import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/TestForm.css';

const TestForm = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState({});
  const [isReadyToRecord, setIsReadyToRecord] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const skillLevels = [
    "Choose option",
    "Not Interested",
   "Average",
    "Highly Interested",
    "Passionate (Want to build a career in this)"
  ];

  const skillCategories = [
  { name: "Mathematics Interest", defaultValue: "Choose option" },
  { name: "Science & Research Interest", defaultValue: "Choose option" },
  { name: "Creativity & Design Interest", defaultValue: "Choose option" },
  { name: "Logical & Analytical Thinking", defaultValue: "Choose option" },
  { name: "Public Speaking & Communication", defaultValue: "Choose option" },
  { name: "Problem-Solving Ability", defaultValue: "Choose option" },
  { name: "Entrepreneurial & Business Skills", defaultValue: "Choose option" },
  { name: "Teamwork & Collaboration", defaultValue: "Choose option" },
  { name: "Technological & Programming Interest", defaultValue: "Choose option" },
  { name: "Healthcare & Medical Science Interest", defaultValue: "Choose option" },
  { name: "Social Work & Helping Others", defaultValue: "Choose option" },
  { name: "Finance & Investment Interest", defaultValue: "Choose option" },
  { name: "Arts & Performing Arts Interest", defaultValue: "Choose option" },
  { name: "Writing & Journalism Interest", defaultValue: "Choose option" }
];

  // Initialize skills state
  useEffect(() => {
    const initialSkills = {};
    skillCategories.forEach(category => {
      initialSkills[category.name] = category.defaultValue;
    });
    setSkills(initialSkills);
  }, []);

  // Validate form whenever skills change
  useEffect(() => {
    const isValid = Object.values(skills).every(value => 
      value && value !== 'Choose option'
    );
    setIsFormValid(isValid);
  }, [skills]);

  const handleSkillChange = (skillName, value) => {
    setSkills(prevSkills => ({
      ...prevSkills,
      [skillName]: value
    }));
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      alert('Please select an option for all skills before submitting.');
      return;
    }

    const formattedResponses = Object.entries(skills).map(([question, answer]) => ({
      question,
      answer
    }));

    // Store form responses and redirect to the interview page
    const formData = JSON.stringify(formattedResponses);
    localStorage.setItem('formResponses', formData);

    setIsSubmitted(true);
  };

  const handleReadyToRecord = (e) => {
    setIsReadyToRecord(e.target.checked);
  };

  const handleRedirectToInterview = () => {
    if (isReadyToRecord) {
      navigate('/speechtotext', { state: { formResponses: JSON.parse(localStorage.getItem('formResponses')) } });
    }
  };

  return (
    <div className="test-form-container">
      <div className="test-form-header">
        <h2 className="test-form-title">RATE YOURSELF...!!</h2>
      </div>

      <div className="test-form-content">
        <div className="skills-container">
          {skillCategories.map((category) => (
            <div key={category.name} className="skill-item">
              <label className="skill-label">{category.name}</label>
              <select
                value={skills[category.name] || 'Choose option'}
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

        {!isSubmitted && (
          <div className="submit-button-container">
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: isFormValid ? "#4CAF50" : "#cccccc",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: isFormValid ? "pointer" : "not-allowed",
                marginTop: "20px"
              }}
            >
              Submit
            </button>
          </div>
        )}

        {isSubmitted && (
          <>
            <div className="checkbox-container">
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
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
                  onClick={handleRedirectToInterview}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "20px"
                  }}
                >
                  Proceed to Interview
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TestForm;
