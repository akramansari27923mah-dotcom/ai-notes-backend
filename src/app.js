import express from 'express';
import authRouter from './Routes/auth.routes.js'
import aiRouter from './Routes/pdf.routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();

//MIDDLEWARE
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://ai-notes-frontend-x9sz.vercel.app/'
    ],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

//prefix
app.use('/api/auth', authRouter)
app.use('/api/ai', aiRouter)

app.get('/', (_, res) => {
    res.send('Api is working')
})

export default app