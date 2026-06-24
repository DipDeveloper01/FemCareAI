import { useState, useEffect, useRef } from "react";
import API from "./services/api";

function App() {
  const [message, setMessage] = useState("");
  // const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [history, setHistory] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages]);

  const handleAnalyze = async () => {
    if (!message.trim()) return;
    try {
      setLoading(true);

      const response = await API.post("/analyze", {
        session_id: "user_001",
        message,
      });

      const aiResponse = response.data;

      // setResult(aiResponse);

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: message,
        },
        {
          sender: "ai",
          data: aiResponse,
        },
      ]);

      setMessage("");

      // setHistory((prev) => [
      //   ...prev,
      //   {
      //     query: message,
      //     response: response.data,
      //   },
      // ]);
    } catch (error) {
      console.error(error);

      alert("Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">🌸 FemCare AI</h1>
        <p className="text-center text-gray-600 mb-8">
          Women's Health Assistant
        </p>
        {/* {history.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Previous Conversations</h2>

            {history.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-3 mb-2">
                <p>
                  <b>User:</b> {item.query}
                </p>
              </div>
            ))}
          </div>
        )} */}
        <div className="space-y-4 mb-6">
          {chatMessages.map((msg, index) => (
            <div key={index}>
              {msg.sender === "user" ? (
                <div className="bg-blue-100 p-3 rounded-xl">
                  <b>You:</b> {msg.text}
                </div>
              ) : (
                // <div className="bg-white shadow rounded-xl p-4">
                //   <h3 className="font-bold text-lg mb-2">⚕️ FemCare AI</h3>

                //   <p>
                //     <b>Conditions:</b> {msg.data.conditions?.join(", ")}
                //   </p>

                //   <p className="mt-2">
                //     <b>Risk Level:</b> {msg.data.risk?.risk_level}
                //   </p>

                //   <p>
                //     <b>Risk Score:</b> {msg.data.risk?.risk_score}
                //   </p>

                //   <div className="mt-3">
                //     <b>Recommendations:</b>

                //     <ul className="list-disc pl-5">
                //       {msg.data.recommendations?.map((item, index) => (
                //         <li key={index}>{item}</li>
                //       ))}
                //     </ul>
                //   </div>
                // </div>

                <div className="bg-white shadow rounded-xl p-4">
                  <h3 className="font-bold text-lg mb-3">⚕️ FemCare AI</h3>

                  <div className="mb-3">
                    <b>Possible Conditions:</b>

                    <ul className="list-disc pl-5 mt-1">
                      {msg.data.conditions?.map((condition, index) => (
                        <li key={index}>
                          {condition}

                          {msg.data.confidence_scores && (
                            <span className="text-gray-500 ml-2">
                              ({msg.data.confidence_scores[condition]}% )
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-3">
                    <b>Risk:</b>

                    <span
                      className={`ml-2 px-2 py-1 rounded text-white ${
                        msg.data.risk?.risk_level === "High"
                          ? "bg-red-500"
                          : msg.data.risk?.risk_level === "Moderate"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    >
                      {msg.data.risk?.risk_level}
                    </span>
                  </div>

                  <div className="mb-3">
                    <b>Recommendations:</b>

                    <ul className="list-disc pl-5">
                      {msg.data.recommendations?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <b>Follow-up Questions:</b>

                    <ul className="list-disc pl-5">
                      {msg.data.followup_questions?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <textarea
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAnalyze();
              }
            }}
            rows="4"
            placeholder="Describe your symptoms..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleAnalyze}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Analyze
          </button>
        </div>
        {loading && (
          <div className="text-center mt-8 text-lg">
            <div className="flex justify-center items-center mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            </div>
          </div>
        )}
        {result && (
          <div className="mt-8 space-y-6">
            {/* Conditions */}

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Possible Conditions</h2>
              {result.emergency && (
                <div className="bg-red-100 border border-red-500 text-red-700 p-4 rounded-xl">
                  <h2 className="font-bold text-xl">Emergency Alert</h2>

                  <p>Seek urgent medical attention immediately.</p>
                </div>
              )}
              {result.conditions.map((condition) => (
                <div key={condition} className="border rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-lg">{condition}</h3>

                  <p>Confidence: {result.confidence_scores[condition]}%</p>

                  <p className="text-gray-700 mt-2">
                    {result.explanations[condition]}
                  </p>
                </div>
              ))}
            </div>

            {/* Risk */}

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Risk Assessment</h2>

              <p>
                Risk Level:{" "}
                <span
                  className={`px-3 py-1 rounded-full text-white font-bold ${
                    result.risk.risk_level === "High"
                      ? "bg-red-500"
                      : result.risk.risk_level === "Moderate"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                >
                  {result.risk.risk_level}
                </span>
              </p>

              <p>Risk Score: {result.risk.risk_score}</p>
            </div>

            {/* Recommendations */}

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Recommendations</h2>

              <ul className="list-disc pl-6">
                {result.recommendations.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Follow-up Questions */}

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Follow-up Questions</h2>

              <ul className="list-disc pl-6">
                {result.followup_questions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="mt-8 text-center text-gray-500 text-sm">
          This tool is for informational purposes only and is not a substitute
          for professional medical advice.
        </div>
      </div>
    </div>
  );
}

export default App;
