const express = require('express')
const router = express.Router()
const pool = require('../db')
const auth = require('../middleware/auth')

router.get('', async (req ,res)=>{
    try{
        const result = await pool.query(`
            SELECT * FROM location
        `)
        res.json(result.rows)
    }catch(err){
        res.status(500).send(err)
    }
    
})

module.exports = router