const express = require('express')
const router = express.Router()
const pool = require('../db')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('', async (req ,res)=>{
    try{
        const result = await pool.query(`
            SELECT * FROM location
        `)
        return res.json(result.rows)
    }catch(err){
        return res.status(500).send(err)
    }
    
})

module.exports = router