const jwt = require('jsonwebtoken');

// will handle JSON web token verification 
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        if (!token){
            return res.status(401).json({
                status: 'FAILED',
                error: 'Unauthorized request'
            })
        }
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedToken) => {
            if (err){
                return res.status(404).json({
                    status: 'FAILED',
                    error: 'Bad token'
                })
            }
            const userId = decodedToken.userId;
            req.auth = {userId : userId}
        })
        next()
    } catch(err) {
        return res.status(500).json({
            status: 'FAILED',
            error: err.message
        })
    }
}
