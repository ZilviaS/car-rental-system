const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pool = require('../db')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

router.get('/me', auth, async(req, res)=>{
    try{
        const userId = req.user.id

        const result = await pool.query(
            `SELECT * FROM users WHERE id = $1`,
            [userId]
        )
        console.log(result.rows[0])
        res.json(result.rows[0])
    } catch(err){
        console.error(err)
        res.status(500).send('server error')
    }
})

router.post('/', auth, async(req,res)=>{
    try{
        const user = req.body
        console.log(user)
        const result = await pool.query(
            `UPDATE users
            SET fname = $1 , tel = $2, sex = $3, birthdate = $4
            WHERE id = $5`,
            [ user.fname, user.tel, user.sex, user.birthdate, user.id ] 
        )
        
        res.json({ message : 'updated!'})
    }catch(err){
        console.error(err)
        res.status(500).send(err)
    }
})

router.get('/account', auth, async(req, res)=>{
    try{
        const userId = req.user.id

        const result = await pool.query(
            `SELECT * FROM user_account WHERE user_id = $1`,
            [userId]
        )
        console.log(result.rows[0])
        res.json(result.rows[0])
    } catch(err){
        console.error(err)
        res.status(500).send('server error')
    }
})

router.post('/account', auth, async(req,res)=>{
    try{
        const account = req.body
        console.log(account)
        const result = await pool.query(
            `UPDATE user_account
            SET card_number = $1 , ex_month = $2, ex_year = $3, bank = $4
            WHERE user_id = $5`,
            [ account.cardNumber, account.exMonth, account.exYear, account.bank, req.user.id ] 
        )
        
        res.json({ message : 'updated!'})
    }catch(err){
        console.error(err)
        res.status(500).send(err)
    }
})

router.get('/cars', auth, async(req,res)=>{
    try{
        const userId = req.user.id
        const result = await pool.query(
            `SELECT 
                b.id,
                b.start_date::text,
                b.end_date::text,
                b.status,
                c.plate,
                c.brand,
                c.model,
                c.year,
                b.price
            FROM bookings b
            JOIN cars c ON b.car_id = c.id
            WHERE b.user_id = $1
            ORDER BY b.start_date DESC`,
            [ userId ]
        )
        console.log('yay')
        console.log(result.rows)
        res.json(result.rows)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router