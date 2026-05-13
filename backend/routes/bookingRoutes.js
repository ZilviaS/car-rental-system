const express = require('express')
const router = express.Router()
const pool = require('../db')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

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
        const id = req.user.id
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

router.post('/:id/received', auth, async (req, res)=>{
    const { id } = req.params
    const userID = req.user.id
    const today = new Date()
    today.setHours(0,0,0,0)

    try{
        const check = await pool.query(`
            SELECT * FROM bookings WHERE id = $1
            `,[ id ])
        
        if (check.rows.length === 0){
            return res.status(404).json({message : 'booking not found'})
        }

        const startDate = new Date(check.rows[0].start_date)
        startDate.setHours(0,0,0,0)
        const endDate = new Date(check.rows[0].end_date)
        endDate.setHours(0,0,0,0)
        if (check.rows[0].user_id === userID){
            if (today >= startDate && today <= endDate){
                const result = await pool.query(`
                    UPDATE bookings SET status = 'received' WHERE id = $1
                    `,[ id ])
                return res.status(201).json({message : 'booking received'})
            }else{
                return res.status(403).json({message : 'error, received only apply in the booking date'})
            }
            
        }else{
            return res.status(403).json({message : 'error, you are not the owner of this booking'})
        }

    }catch(err){
        return res.status(500).json({error : err})
    }
})

router.post('/:id/refund', auth, async(req,res)=>{
    const { id } = req.params
    const userID = req.user.id
    const today = new Date()
    today.setHours(0,0,0,0)

    console.log('refund')

    try{
        const check = await pool.query(`
            SELECT * FROM bookings WHERE id = $1
            `,[ id ])

        if (check.rows.length === 0){
            return res.status(404).json({
                message : 'booking not found'})
        }

        if (check.rows[0].status !== 'success'){
            return res.status(403).json({
                message : 'you are not allowed to refund'})
        }

        const endDate = new Date(check.rows[0].end_date)
        endDate.setHours(0,0,0,0)

        if (today > endDate){
            await pool.query(`
                UPDATE bookings SET status = 'refund pending' WHERE id = $1
            `,[ id ])
            return res.status(201).json({
                message : 'refunding request success'})
        }else{
            return res.status(403).json({
                message : 'the booking refunding is not in the time period'})
        }


    } catch (err) {
        return res.status(500).json({error : err})
    }
})

router.post('/:id/refund/submit', authAdmin, async(req,res)=>{
    const { id } = req.params

    console.log('refund',id)
    try{
        await pool.query(`
            UPDATE bookings SET status = 'pending success' WHERE id = $1
        `, [ id ])
        return res.status(201).json({
            message : 'refund complete'
        })
    }catch(err){
        return res.status(500).json({error : err})
    }
})

router.get('/refund', authAdmin, async (req,res)=>{
    try{
        const data = await pool.query(`
            SELECT 
            c.brand,
            c.model,
            c.trim,
            c.description,
            c.image_url,
            c.plate,
            b.start_date,
            b.end_date,
            b.price,
            b.id,
            b.location_id,
            u.email,
            u.username,
            l.location_name
            FROM bookings b
            JOIN cars c ON b.car_id = c.id
            JOIN users u ON b.user_id = u.id
            JOIN location l ON b.location_id = l.id
            WHERE b.status::text = 'refund pending'
            `)
        
        if (data.rows.length === 0){
            return res.json([])
        }

        console.log(data.rows)
        res.json(data.rows)
        
    }catch(err){
        return res.status(500).json({error : err})
    }
})

module.exports = router