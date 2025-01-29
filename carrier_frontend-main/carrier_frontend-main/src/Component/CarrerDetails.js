import React, { useEffect, useState } from "react";

const CareerFieldsList = () => {
  const [parsedFields, setParsedFields] = useState([]);
  useEffect(() => {
    const storedCareerFields = localStorage.getItem("careerFieldsData");
    if (storedCareerFields) {
      try {
        const parsed = JSON.parse(storedCareerFields); // Ensure proper JSON parsing
        setParsedFields(parsed.careerFields || []);
      } catch (error) {
        console.error("Error parsing career fields:", error);
        setParsedFields([]);
      }
    }
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Career Fields</h2>
      {parsedFields.length > 0 ? (
        <div style={styles.grid}>
          {parsedFields.map((career, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.cardTitle}>{career.field}</h3>
              <p style={styles.cardDescription}>{career.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noData}>No career fields available.</p>
      )}
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    transition: "transform 0.3s ease-in-out",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#555",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  noData: {
    fontSize: "16px",
    color: "#777",
    marginTop: "20px",
  },
};

export default CareerFieldsList;
