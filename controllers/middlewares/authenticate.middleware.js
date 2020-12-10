import jwt from 'jsonwebtoken'

const Authenticate = (req, res, next) => {
    try {
        //send token by headers
        const token = req.header('authToken')
        if(!token) return res.status(401).json({msg : 'Unauthorized'})

        const verifyToken = jwt.verify(token, process.env.JWT_TOKEN)
        if(!verifyToken) return res.status(401).json({msg : 'Unauthorized'})
        req.userID = verifyToken.id
        next()
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

export default Authenticate