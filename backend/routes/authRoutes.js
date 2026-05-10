const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pool = require('../db')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
 
router.post('/register', async (req,res)=>{
    const {username, email, password, confirmPassword} = req.body

    if (!email || !password || !username){
        return res.status(500).json({ error: 'Please provide username, email, password' })
    }

    if (password !== confirmPassword){
        return res.status(500).json({ error: 'password and confirm password is not equal' })
    }

    console.log(username, email, password, confirmPassword)

    const client = await pool.connect()

    try{
        await client.query('BEGIN');

                // check email
        const emailCheck = await client.query(
            `SELECT id FROM users WHERE email = $1`,
            [email]
        )

        if(emailCheck.rows.length > 0){
            await client.query('ROLLBACK');
            return res.status(500).json({
                error: 'Email already exists'
            })
        }

        // check username
        const usernameCheck = await client.query(
            `SELECT * FROM users WHERE username = $1`,
            [username]
        )

        if(usernameCheck.rows.length > 0){
            await client.query('ROLLBACK');
            return res.status(400).json({
                error: 'Username already exists'
            })
        }

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
        console.log("error", err.message)
        res.status(500).json({ error: err.message })
    }finally{
        client.release();
    }
})

router.post('/login', async (req,res)=>{
    const {email, password} = req.body

    if (!email || !password){
        return res.status(400).json({ message: "please provide email and password" })
    }

    console.log("email : " + email + "\npassword : " + password)

    try{
        const result = await pool.query(`
            SELECT id, username, email, password , role FROM users WHERE email = $1`, [email]
        )
        const user = result.rows[0]

        if(!user){
            return res.status(400).json({
                message: 'Email not found'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or password'})
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username, role: user.role},
            process.env.JWT_SECRET, { expiresIn: '7d' }
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