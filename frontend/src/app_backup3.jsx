import { useState, useEffect, useRef } from "react";
import API from "./services/api";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
        session_id: Date.now().toString(),
        message,
      });

      const aiResponse = response.data;

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
        <div className="space-y-4 mb-6 flex flex-col">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "user" ? (
                <div className="bg-blue-500 text-white p-3 rounded-2xl max-w-md">
                  <b>You:</b> {msg.text}
                </div>
              ) : (
                <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-3xl">
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
                    {msg.data.recommendations?.length > 0 && (
                      <div className="mb-3">
                        <b>Recommendations:</b>

                        <ul className="list-disc pl-5">
                          {msg.data.recommendations.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    {msg.data.followup_questions?.length > 0 && (
                      <div>
                        <b>Follow-up Questions:</b>

                        <ul className="list-disc pl-5">
                          {msg.data.followup_questions.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
          <button
            onClick={() => setChatMessages([])}
            className="ml-4 bg-gray-500 text-white px-6 py-3 rounded-lg"
          >
            Clear Chat
          </button>
        </div>
        {loading && (
          <div className="text-center mt-8 text-lg">
            <div className="flex justify-center items-center mt-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
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
