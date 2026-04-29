const express = require('express')
const router = express.Router()
const pool = require('../db')

router.post('/', async (req,res)=>{
    const { carID, startDate, endDate } = req.body
    console.log(carID + ' ' + startDate + ' ' + endDate)
    try{
        const result = await pool.query(`
            SELECT price FROM cars WHERE id = $1
            `, [carID])
        const start = new Date(startDate)
        const end = new Date(endDate)
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

module.exports = router