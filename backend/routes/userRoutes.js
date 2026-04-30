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

module.exports = router