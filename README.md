\# 🌸 FemCare AI



An AI-powered Women's Health Assistant built using FastAPI, React, Tailwind CSS, and Agentic AI architecture.



Features :



\* Symptom Analysis

\* Disease Prediction

\* Risk Assessment

\* Confidence Scoring

\* Follow-up Questions

\* Conversation Memory

\* Emergency Detection

\* Modern Chat Interface

\* Responsive UI



Tech Stack





Frontend :



\* React

\* Vite

\* Tailwind CSS

\* Axios



Backend :



\* FastAPI

\* Python

\* Pydantic

\* Uvicorn







AI Agents



\* Symptom Agent

\* Disease Agent

\* Risk Agent

\* Recommendation Agent

\* Follow-up Agent

\* Confidence Agent

\* Emergency Agent

\* Memory Agent







Project Structure



backend/

├── agents/

├── api/

├── services/

├── models/

├── main.py



frontend/

├── src/

├── public/

├── package.json







Installation



Backend



bash



cd backend



python -m venv venv



venv\\Scripts\\activate



pip install -r requirements.txt



uvicorn main:app --reload

```







Frontend



bash



cd frontend



npm install



npm run dev









API Endpoint



POST /analyze



Request:



```json

{

&#x20; "session\_id": "user\_001",

&#x20; "message": "I have pelvic pain for 3 weeks"

}

```



Response:



```json

{

&#x20; "conditions": \[

&#x20;   "Endometriosis",

&#x20;   "Ovarian Cysts"

&#x20; ],

&#x20; "risk": {

&#x20;   "risk\_level": "Moderate"

&#x20; }

}

```







Future Improvements



\* RAG Integration

\* ChromaDB Knowledge Base

\* LLM-powered Recommendations

\* User Authentication

\* Persistent Database Storage









Author



Randip Debnath



4th Year, B.Tech CSE



Kalyani Government Engineering College



