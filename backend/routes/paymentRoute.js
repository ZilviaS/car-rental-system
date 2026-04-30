const express = require('express')
const router = express.Router()
const pool = require('../db')
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req,res)=>{
    const { carID, start_date, end_date } = req.body
    console.log(carID + ' ' + start_date + ' ' + end_date)
    try{
        const result = await pool.query(`
            SELECT price FROM cars WHERE id = $1
            `, [carID])
        const start = new Date(start_date)
        const end = new Date(end_date)
        const days = Math.max((end - start) / (1000*60*60*24), 1)
        const price = result.rows[0].price * days
        res.json({
            price , days
        })

    }catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

router.post('/transcript/', async (req,res)=>{
    const { paymentInfo, userPayment , bookingData , carID , userID } = req.body
    console.log(paymentInfo , userPayment, bookingData, carID , userID)
    const client = await pool.connect()

    try{
        await client.query('BEGIN');

        const bookingId = uuidv4();
        const paymentId = uuidv4();

        await client.query(`
        INSERT INTO bookings(
	    id, user_id, car_id, start_date, end_date, status, location_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [bookingId, userID, carID, bookingData.startDate, bookingData.endDate, 'pending', bookingData.location])
        
        const transaction_ref = uuidv4();

        await client.query(`
        INSERT INTO payments(
        id, booking_id, amount, bank, status, transaction_ref)   
        VALUES ($1, $2, $3, $4, $5 , $6)
        `, [paymentId, bookingId, paymentInfo.price, userPayment.Bank , 'paid' , transaction_ref]) 

        await client.query(`
        UPDATE bookings
        SET status = 'success'
        WHERE id = $1
            `,[bookingId])

        await client.query('COMMIT');
        
        res.json({message: 'payment success', bookingId})
    }catch(err){
        await client.query('ROLLBACK');
        console.error(err)
        res.status(500).json({error: 'payment success', bookingId})
    }finally{
        client.release();
    }      
})

module.exports = router