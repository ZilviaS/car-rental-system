const jwt = require('jsonwebtoken')

function auth(req, res, next){
    const token = req.cookies.token;
    // const authHeader = req.headers.authorization

    if(!token){
        console.log('This is unauthorized')
        return res.status(401).json( {msg: 'Unauthorized'})
    }

    // const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(err){
        return res.status(401).json({msg : 'Invalid token'})
    }
}

module.exports = auth