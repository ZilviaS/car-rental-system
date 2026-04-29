const express = require('express')
const router = express.Router()
const pool = require('../db')
const auth = require('../middleware/auth')

router.get('/user', auth, async (req ,res)=>{
    try{
        const userId = req.user.userId

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

module.exports = router