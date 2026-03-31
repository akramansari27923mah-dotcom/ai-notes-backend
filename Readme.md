#  AI Notes Generator - Backend

A powerful backend service for the AI Notes Generator application. It handles PDF uploads, processes text, and generates structured notes using AI.

---

##  Overview

This backend provides REST APIs to:

* Upload and parse PDF files 
* Process text input 
* Generate AI-powered notes 
* Store and manage data using MongoDB 

---

##  Features

*  PDF file upload & parsing
*  AI-based notes generation (Groq / OpenAI)
*  RESTful API architecture
*  MongoDB database integration
*  Clean and scalable folder structure

---

## 📂 Folder Structure

```bash
Backend/
│── src/
│   ├── config/        # Database & app configuration
│   ├── controllers/   # Business logic
│   ├── middleware/    # Custom middleware
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── utils/         # Helper functions
│   └── app.js         # Express app setup
│
├── .env               # Environment variables
├── server.js          # Entry point
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **File Upload:** Multer
* **PDF Parsing:** pdf-parse
* **AI Integration:** Groq API / OpenAI API

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ai-notes-backend.git
cd ai-notes-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

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

Server will run on:
👉 http://localhost:4001

---

##  API Endpoints

###  Generate Notes

```http
POST /api/ai
```

**Request:**

* Text input OR uploaded file

**Response:**

* AI-generated structured notes

---

### 📄 Upload PDF

```http
POST /api/ai
```

**Request:**

* Multipart/form-data (PDF file)

**Response:**

* Extracted text from PDF

---

##  Testing

You can test APIs using:

* Postman
* Thunder Client (VS Code)

---

## 🌐 Deployment

* 🚀 Backend: Render / Railway
* ☁️ Database: MongoDB Atlas

---

##  Best Practices Implemented

* Environment variables for security
* MVC folder structure
* Clean separation of concerns
* Scalable API design

---

##  Future Improvements

*  Download notes as PDF
*  Rate limiting & security enhancements

---

##  Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

##  Contact

**Akram Ansari**
 [akramansari27923mah@gmail.com](mailto:akramansari27923mah@gmail.com)
 https://akram-portfolio-c4hv.vercel.app

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
