import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createRouter } from './routes/appRouter.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(corsMiddleware())
app.use(cookieParser())
app.disable('x-powered-by')

app.use('/user', createRouter())

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
