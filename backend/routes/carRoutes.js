const express = require('express')
const router = express.Router()
const pool = require('../db')

router.post('/', async (req,res)=>{
    const {brand, carname, startDate, endDate} = req.body
    console.log('brand : ' + brand + ' carname: ' + carname + '\nstartDate ' + startDate + '\nendDate ' + endDate)
    try{
        let baseQuery = `SELECT * FROM cars c`
        let conditions = []
        let values = []
        let index = 1

        if (startDate && endDate) {
            conditions.push(`
                NOT EXISTS (
                SELECT 1 FROM bookings b
                WHERE b.car_id = c.id
                AND NOT (b.end_date < $${index} OR b.start_date > $${index + 1})
                )
            `)
            values.push(startDate, endDate)
            index += 2
        }

        if (brand) {
            conditions.push(`c.brand ILIKE $${index}`)
            values.push(`%${brand}%`)
            index++
        }

        if (carname) {
            conditions.push(`c.model ILIKE $${index}`)
            values.push(`%${carname}%`)
            index++
        }

        if (conditions.length > 0) {
            baseQuery += ` WHERE ` + conditions.join(' AND ')
        }

        const result = await pool.query(baseQuery, values)
        console.log(result.rows)
        res.json(result.rows)
    }
    catch (err) {
        console.error(err)
        res.status(500).send('server error')
    }
})

router.get('/:id', async (req,res)=>{
    const { id } = req.params
    console.log(id)
    try{
        const result = await pool.query(
            `SELECT * FROM cars WHERE id = $1`,
            [id]
        )
        console.log(result.rows)
        res.json(result.rows[0])
    }catch (err){
        res.status(500).send('server error')
    }

})

module.exports = router
