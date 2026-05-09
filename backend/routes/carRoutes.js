const express = require('express')
const router = express.Router()
const pool = require('../db')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const { v4: uuidv4 } = require('uuid')

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
                    AND b.start_date::date <= $${index + 1}::date
                    AND b.end_date::date >= $${index}::date
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
        console.log(baseQuery)
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

        const imageResult = await pool.query(`
            SELECT * FROM car_image WHERE car_id = $1`,
            [id]
        )

        const car = result.rows[0]

        car.image_url_secondary = imageResult.rows[0]?.image_url || ''
        car.image_url_teritery = imageResult.rows[1]?.image_url || ''
        console.log(car)
        res.json(car)
    }catch (err){

        console.log(err)
        res.status(500).send('server error')
    }

})

router.get('', async (req,res)=>{
    try{
        const result = await pool.query(
            `SELECT * FROM cars`
        )
        console.log(result.rows)
        res.json(result.rows)
    }catch(err){
        res.status(500).send('server error')
    }
})

router.get('/:id/booked-dates', async (req,res)=>{
    const { id } = req.params
    try{
        const result = await pool.query(`
            SELECT start_date, end_date
            FROM bookings
            WHERE car_id = $1
            AND status != 'cancelled'
        `, [id])
        console.log(result.rows)
        res.json(result.rows)
    }catch(err){
        console.error(err)
        res.status(500).send(err)
    }
})

router.post('/insert', authAdmin, async (req,res)=>{
    const {brand, model, trim, year, plate, imageURL, description, price, imageURL_secondary, imageURL_teritary} = req.body
    console.log(brand, model, trim, year, plate, imageURL, description, imageURL_secondary, imageURL_teritary)
    const client = await pool.connect()
    const carId = uuidv4();
    try{
        await client.query('BEGIN')
        await client.query(`
            INSERT INTO cars(
	        brand, model, trim, year, description, plate, status, image_url, price, id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `,[brand, model, trim, year, description, plate, 'true' ,imageURL, price, carId])
        
        if (imageURL_secondary && imageURL_secondary.trim() !== ''){
            await client.query(`
                INSERT INTO car_image(car_id, image_url)
                VALUES ($1, $2)`,[carId, imageURL_secondary])
        }

        if (imageURL_teritary && imageURL_teritary.trim() !== ''){
            await client.query(`
                INSERT INTO car_image(car_id, image_url)
                VALUES ($1, $2)`,[carId, imageURL_teritary])
        }
        
        await client.query('COMMIT');
        res.status(201).json({
            message: 'success'
        })

    }catch(err){
        console.log(err)
        await client.query('ROLLBACK')
        res.status(500).send(err)
    }finally{
        client.release()
    }
})

router.post('/delete', authAdmin, async (req,res)=>{
    const { id } = req.body
    console.log(id)
    const client = await pool.connect()
    try{
        await client.query('BEGIN')
        await client.query(`
            DELETE FROM cars WHERE id = $1`, [id])

        await client.query(`
            DELETE FROM car_image WHERE car_id = $1`, [id])

        await client.query('COMMIT')
        return res.status(201).json({
            message : 'success'
        })
    }catch(err){
        await client.query('ROLLBACK')
        return res.status(500).send(err)
    }finally{
        await client.release()
    }
})

router.post('/update', authAdmin, async (req, res)=>{
    const {id, brand, model, trim, year, plate, status, image_url, description, price , image_url_secondary, image_url_teritery} = req.body
    console.log(id, brand, model, trim, year, plate, status, image_url, description, price, image_url_secondary, image_url_teritery)
    const client = await pool.connect()
    try{
        await client.query('BEGIN');

        await client.query(`
            UPDATE cars 
            SET brand = $1, model = $2, trim = $3, year = $4, 
            plate = $5, status = $6, image_url = $7, description = $8,
            price = $9
            WHERE id = $10`,[
                brand, model, trim, year, plate, status, image_url, description, price, id
        ])

        await client.query(`
            DELETE FROM car_image
            WHERE car_id = $1
        `,[id])

        await client.query(`
            INSERT INTO car_image(car_id, image_url)
            VALUES ($1, $2)
            `,[id, image_url_secondary])

        await client.query(`
            INSERT INTO car_image(car_id, image_url)
            VALUES ($1, $2)
            `,[id, image_url_teritery])
        
        await client.query('COMMIT');

        res.status(201).json({
            message : 'success'
        })
    }catch(err){
        await client.query('ROLLBACK');
        console.log(err)
        res.status(500).send(err)
    }finally{
        client.release();
    }
})


module.exports = router
