require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express())
app.use(cors())
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
    console.log('hi')
})

app.listen(process.env.PORT, ()=>{
    console.log('server is listening on port : ' + process.env.port)
})