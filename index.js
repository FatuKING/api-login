import express from 'express'

const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

const ACCEPTED_ORIGINS = [
  'https://06-login.netlify.app',
  'http://localhost:5173',
  'http://localhost:5173/'
]

app.get('/users/hash', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
})

app.post('/users/register', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
})

app.use((req, res) => { // devuelvo 40r4 en caso de no realizar match
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  res.status(404).send('<h1>Error 404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
