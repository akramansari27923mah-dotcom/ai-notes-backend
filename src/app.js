import express from 'express';
import authRouter from './Routes/auth.routes.js'
import aiRouter from './Routes/pdf.routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();

//MIDDLEWARE
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

//prefix
app.use('/api/auth', authRouter)
app.use('/api/ai', aiRouter)

export default app