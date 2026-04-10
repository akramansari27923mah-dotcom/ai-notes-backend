import express from "express";
import authRouter from "./Routes/auth.routes.js";
import aiRouter from "./Routes/pdf.routes.js";
import quizRouter from "./Routes/quiz.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://notecraftai.vercel.app",
];

const corsOptions = {
  origin: function(origin, callback){
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true)
    }
    else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
};

//MIDDLEWARE
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//prefix
app.use("/api/auth", authRouter);
app.use("/api/ai", aiRouter);
app.use("/api/quiz", quizRouter);

app.get("/", (_, res) => {
  res.send("Api is working");
});

export default app;
