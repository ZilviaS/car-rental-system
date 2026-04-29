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
            `SELECT id, username, email FROM users WHERE id = $1`,
            [userId]
        )

        res.json(result.rows[0])
    } catch(err){
        console.error(err)
        res.status(500).send('server error')
    }
})

module.exports = router