import jwt from 'jsonwebtoken';

const protectAuth = (req, res, next) => {
    let token = req.cookies?.token

    if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'Unauthorized - No token provided'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id

        next()
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: 'Unauthorized - Invalid or expired token'
        })
    }
}

export default protectAuth