# 🌟 AI Notes Generator - Backend

Welcome to the **AI Notes Generator Backend**, the brain behind your smart note-taking assistant. This backend powers the app that can **take PDFs or raw text** and turn them into **structured, AI-powered notes**—fast, organized, and ready to use.

---

## 📝 What This Backend Does

Imagine you have PDFs, lecture notes, or long articles. Instead of manually reading and summarizing, this backend helps you convert them into clean, structured notes instantly.

1. Upload PDFs and automatically extract text
2. Send text input to the AI for analysis
3. Generate structured notes instantly
4. Store and manage data securely in MongoDB

---

## ⚡ Features

*  PDF Upload & Parsing
*  AI Notes Generation (Groq)
*  RESTful API Architecture
*  MongoDB Integration
*  Clean & Scalable Folder Structure

---

## 📂 Folder Structure

```bash
Backend/
│── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 🛠 Tech Stack

* Backend: Node.js, Express.js
* Database: MongoDB (Mongoose)
* File Upload: Multer
* PDF Parsing: pdf-parse
* AI Integration: Groq API / OpenAI API

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ai-notes-backend.git
cd ai-notes-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file:

```env
PORT=4001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwtSecret
GROQ_API_KEY=your_api_key
```

---

## ▶️ Run the Server

```bash
npm run dev
```

Server will run at:
http://localhost:4001

Live URL:
https://ai-notes-backend-1o1h.onrender.com

---

## 🔌 API Endpoints

### Generate Notes

```http
POST /api/ai
```

**Input:** Text or PDF
**Output:** AI-generated structured notes

---

### Upload PDF

```http
POST /api/ai/
```

**Input:** multipart/form-data (PDF)
**Output:** Extracted text

---

## 🧪 Testing

* Postman
* Thunder Client (VS Code)

---

## 🌐 Deployment

* Backend: Render
* Database: MongoDB Atlas

---

##  Best Practices

* Environment variables for security
* MVC architecture
* Clean code separation
* Scalable API design

---

##  Future Improvements

* Download notes as PDF
* Rate limiting & security
* Real-time updates

---

## 🤝 Contributing

Contributions are welcome! Fork the repo and submit a pull request.

---

## 📫 Contact

Akram Ansari
[akramansari27923mah@gmail.com](mailto:akramansari27923mah@gmail.com)
https://akram-portfolio-c4hv.vercel.app

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
