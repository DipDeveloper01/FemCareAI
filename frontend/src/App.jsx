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
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-purple-950 text-white p-8 transition-all duration-500">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-3 bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          🌸 FemCare AI
        </h1>

        <p className="text-center text-slate-300 text-lg mb-10">
          AI Powered Women's Health Assistant
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
                <div className="bg-linear-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-3xl max-w-md shadow-xl transition-all duration-300 hover:scale-105">
                  <b>You:</b> {msg.text}
                </div>
              ) : (
                <div className="float-card backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6 w-full max-w-3xl transition-all duration-300 hover:shadow-purple-500/30 hover:-translate-y-1">
                  <h3 className="font-bold text-2xl mb-4 text-cyan-300">
                    ⚕️ FemCare AI
                  </h3>

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
                      className={`ml-2 px-4 py-2 rounded-full text-white font-bold shadow-lg transition-all duration-300 ${
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
                    {msg.data.recommendation_text && (
                      <div className="mb-3">
                        <b>Recommendations:</b>

                        <p className="mt-2 text-slate-300 leading-relaxed">
                          {msg.data.recommendation_text}
                        </p>
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
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6">
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
            className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
          />

          <button
            onClick={handleAnalyze}
            className="mt-4 bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            Analyze
          </button>
          <button
            onClick={() => setChatMessages([])}
            className="ml-4 bg-linear-to-r from-slate-700 to-slate-600 text-white px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            Clear Chat
          </button>
        </div>
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="h-16 w-16 border-4 border-purple-500 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        )}
        <div className="mt-10 text-center text-slate-400 text-sm">
          This tool is for informational purposes only and is not a substitute
          for professional medical advice.
        </div>
      </div>
    </div>
  );
}

export default App;
