require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://car-rental-system-omega-lemon.vercel.app/'
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

app.use(express.json())

const carRoutes = require('./routes/carRoutes')
app.use('/api/car', carRoutes)

const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

const bookingRoutes = require('./routes/bookingRoutes')
app.use('/api/booking', bookingRoutes)

const userRoutes = require('./routes/userRoutes')
app.use('/api/user', userRoutes)

const paymentRoutes = require('./routes/paymentRoute')
app.use('/api/payment', paymentRoutes)

const locationRoutes = require('./routes/locationRoute')
app.use('/api/location', locationRoutes)

app.get('/', (req,res)=>{
    res.send('API is running')
})

const PORT = process.env.PORT || 3000

app.listen(PORT , ()=>{
    console.log(`server is listening on port : ${PORT}`)
})