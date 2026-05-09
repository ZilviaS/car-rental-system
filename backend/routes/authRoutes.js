const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pool = require('../db')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
 
router.post('/register', async (req,res)=>{
    const {username, email, password} = req.body
    const client = await pool.connect()

    console.log(username, email, password)

    if (!email || !password || !username){
        return res.status(500).json({ error: err.message })
    }

    try{
        await client.query('BEGIN');
        const hashedPassword = await bcrypt.hash(password, 10)
        const userResult = await client.query(`
            INSERT INTO users (username, password, email, role) VALUES ( $1, $2, $3 , $4) 
            RETURNING id`,
            [username, hashedPassword, email, 'user']
        )
        const userId = userResult.rows[0].id
        console.log(userId)
        await client.query(`
            INSERT INTO user_account (user_id) VALUES ($1)`,
            [userId]
        )

        await client.query('COMMIT');
        console.log(userResult.rows)

        res.status(201).json({
            message: 'Register success',
            user: userResult.rows[0]
        })
        
    }catch (err){
        await client.query('ROLLBACK');
        console.log("error", err)
        res.status(500).json({ error: err.message })
    }finally{
        client.release();
    }
})

router.post('/login', async (req,res)=>{
    const {email, password} = req.body

    if (!email || !password){
        return res.status(500).json({ error: err.message })
    }

    console.log("email : " + email + "\npassword : " + password)

    try{
        const result = await pool.query(`
            SELECT id, username, email, password , role FROM users WHERE email = $1`, [email]
        )
        const user = result.rows[0]
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: "Your password is wrong"})
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username, role: user.role},
            process.env.JWT_SECRET
        )

        res.json({
            message: 'Login Success',
            token
        })
        
    } catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
})

module.exports = router