# 🌸 FemCare AI

An AI-powered Women's Health Assistant built using FastAPI, React, Tailwind CSS, and an Agent-Based Architecture to provide symptom analysis, disease prediction, risk assessment, and personalized recommendations.

## 🚀 Overview

FemCare AI helps users describe symptoms in natural language and receive intelligent health insights through a multi-agent system. The platform analyzes symptoms, predicts possible conditions, assesses risk levels, generates recommendations, and asks relevant follow-up questions to improve understanding of the user's situation.

> **Disclaimer:** This application is intended for educational and informational purposes only and does not replace professional medical advice, diagnosis, or treatment.

---

## ✨ Features

### 🩺 Symptom Analysis

- Natural language symptom input
- Symptom extraction and normalization
- Context-aware symptom processing

### 🤖 Multi-Agent AI Architecture

- Emergency Detection Agent
- Symptom Extraction Agent
- Disease Prediction Agent
- Risk Assessment Agent
- Recommendation Agent
- Follow-up Question Agent
- Confidence Scoring Agent
- Memory Agent

### 📋 Disease Prediction

Currently supports prediction and explanation of:

- Endometriosis
- PCOS
- Ovarian Cysts
- Uterine Fibroids
- Additional women's health conditions can be added easily

### ⚠️ Risk Assessment

- Low Risk
- Moderate Risk
- High Risk

### 💬 Conversational Experience

- Chat-based interface
- Session memory
- Follow-up questioning
- Dynamic recommendations

### 🎨 Modern Frontend

- React + Vite
- Tailwind CSS
- Dark UI
- Responsive design
- Smooth animations

---

## 🏗️ System Architecture

User Input
↓
Memory Agent
↓
Emergency Detection Agent
↓
Symptom Extraction Agent
↓
Disease Prediction Agent
↓
Confidence Scoring Agent
↓
Risk Assessment Agent
↓
Explanation Agent
↓
Recommendation Agent
↓
Follow-up Question Agent
↓
Final Response

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios

### Backend

- FastAPI
- Python
- Uvicorn
- Pydantic

### AI & Data

- Sentence Transformers
- Vector Search
- RAG Components
- ChromaDB / Vector Database Integration

---

## 📁 Project Structure

```text
femcareAI
│
├── backend
│   ├── agents
│   ├── api
│   ├── data
│   ├── models
│   ├── services
│   ├── tests
│   ├── main.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/DipDeveloper01/FemCareAI.git

cd FemCareAI
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 📡 API Example

### Request

```json
{
  "session_id": "user_001",
  "message": "I have pelvic pain for the last 3 weeks"
}
```

### Response

```json
{
  "conditions": ["Endometriosis", "Ovarian Cysts"],
  "risk": {
    "risk_level": "Moderate"
  },
  "followup_questions": [
    "How long have you been experiencing pelvic pain?",
    "Does the pain become worse during menstruation?"
  ]
}
```

---

## 🔮 Future Improvements

- Persistent database storage
- User authentication
- LLM-powered medical explanations
- Appointment recommendations
- Expanded women's health knowledge base
- Cloud deployment
- Mobile application

---

## 👨‍💻 Author

**Randip Debnath**

B.Tech Computer Science & Engineering

Kalyani Government Engineering College (KGEC)

GitHub: https://github.com/DipDeveloper01

---

## 📜 License

This project is released under the MIT License.
