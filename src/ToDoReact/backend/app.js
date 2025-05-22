import express from 'express';
import {AppRouter} from './routes/router.js'
import cors from 'cors'

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json())

app.use(cors())

app.use(AppRouter())

app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`)
})