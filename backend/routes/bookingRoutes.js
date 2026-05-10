const express = require('express')
const router = express.Router()
const pool = require('../db')
const auth = require('../middleware/auth')

router.get('/user', auth, async (req ,res)=>{
    try{
        const userId = req.user.id

        const result = await pool.query(`
            SELECT b.*, c.brand, c.model
            FROM bookings b
            JOIN cars c ON b.car_id = c.id
            WHERE b.user_id = $1
            ORDER BY b.created_at DESC
        `, [userId])
        res.json(result.rows)
    } catch(err){
        console.error(err)
        res.status(500).send('server error')
    }
})

router.post('/cancle', auth, async (req,res)=>{
    try{
        const userId = req.user.id
        const car = req.body
        console.log(car.id)
        console.log(userId)
        const result = await pool.query(`
            DELETE FROM bookings
            WHERE id = $1
                AND user_id = $2 
        `, [car.id, userId])
        res.status(201).json({message : 'finnish'})
        console.log('updated')
    }catch(err){
        res.status(500).json({error : err})
        console.error(err)
    }
})

module.exports = router