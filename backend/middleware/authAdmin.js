const pool = require('../db')
const jwt = require('jsonwebtoken')

async function authAdmin(req, res, next){
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json( {msg: 'no token'})
    }

    console.log('checkAdmin')

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        const userCheck = await pool.query(`
            SELECT role FROM users WHERE id = $1
            `,[req.user.id])
        
        if(userCheck.rows.length === 0){
            console.log('you are here')
            return res.status(401).json({ msg: 'user not found' })
        }

        if(userCheck.rows[0]?.role !== 'admin'){
            return res.status(403).json({ msg : 'forbidden'})
        }
        return next()

    } catch(err){
        return res.status(401).json({msg : 'Invalid token'})
    }
}

module.exports = authAdmin