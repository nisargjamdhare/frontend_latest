import React, { useEffect, useState } from "react";

const CareerFieldsList = () => {
  const [careerFields, setCareerFields] = useState([]);

  useEffect(() => {
    // Retrieve careerFields from localStorage and parse it correctly
    const storedCareerFields = localStorage.getItem("careerFieldsData");
    if (storedCareerFields) {
      try {
        setCareerFields(JSON.parse(storedCareerFields));
      } catch (error) {
        console.error("Error parsing career fields:", error);
        setCareerFields([]);
      }
    }
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Career Fields</h2>
      {careerFields.length > 0 ? (
        <ul className="list-disc pl-5">
          {careerFields.map((field, index) => (
            <li key={index} className="mb-2">
              <strong>{field.field}:</strong> {field.reason}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No career fields available.</p>
      )}
    </div>
  );
};

export default CareerFieldsList;
