import { useState } from "react";
import API from "./services/api";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await API.post("/analyze", {
        message: message,
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);

      alert("Backend connection failed.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>FemCare AI</h1>

      <textarea
        rows="4"
        style={{
          width: "100%",
          padding: "10px",
        }}
        placeholder="Describe your symptoms..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAnalyze}>Analyze</button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Possible Conditions</h2>

          {result.conditions.map((condition) => (
            <div
              key={condition}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
            >
              <h3>{condition}</h3>

              <p>
                Confidence:
                {result.confidence_scores[condition]}%
              </p>

              <p>{result.explanations[condition]}</p>
            </div>
          ))}

          <h2>Risk Assessment</h2>

          <div
            style={{
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          >
            <p>
              Risk Level:
              <b> {result.risk.risk_level}</b>
            </p>

            <p>Risk Score: {result.risk.risk_score}</p>
          </div>

          <h2>Recommendations</h2>

          <ul>
            {result.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2>Follow-up Questions</h2>

          <ul>
            {result.followup_questions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
