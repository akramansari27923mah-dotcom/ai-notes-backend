import userModel from "../models/user.model.js";
import hashPassword from "../utils/hash.js";
import generateToken from "../utils/token.js";
import bcrypt from "bcryptjs";

const isProduction = process.env.NODE_ENV === 'production'
const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
}


// register api 
const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(401).json({
            success: false,
            message: 'All fields are required'
        })
    }

    const normalizedEmail = email.toLowerCase()

    const userExist = await userModel.findOne({ email: normalizedEmail })

    if (userExist) {
        return res.status(400).json({
            success: false,
            message: 'User already exist'
        })
    }

    try {
        const passwordHashed = await hashPassword(password)
        const user = await userModel.create({
            username,
            email,
            password: passwordHashed
        })

        const token = await generateToken(user._id)
        console.log("token", token);

        res.cookie('token', token, cookieOptions)

        res.status(201).json({
            success: true,
            message: 'User register successfully',
            user: {
                username: user.username,
                email: user.email,
                id: user._id
            },
            token
        })

    }
    catch (err) {
        console.log('Register fields');
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

// login api
const login = async (req, res) => {
    const { password, email } = req.body;

    if (!password || !email) {
        return res.status(401).json({
            success: false,
            message: 'All fields are required'
        })
    }

    const normalizEmail = email.toLowerCase()

    try {
        const isUser = await userModel.findOne({ email: normalizEmail })

        if (!isUser) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        const isMatch = await bcrypt.compare(password, isUser.password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        const token = await generateToken(isUser._id)
        res.cookie('token', token, cookieOptions)

        res.status(200).json({
            success: true,
            message: 'User loggedin successfully',
            user: {
                username: isUser.username,
                email: isUser.email,
                id: isUser._id
            },
            token
        })

    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

// logout api
const logout = async (_, res) => {
    try {
        res.clearCookie('token', cookieOptions)

        res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

// getuser api
const getMe = async (req, res) => {
    const id = req.userId;

    const user = await userModel.findById(id).select("-password")

    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'user not found'
        })
    }

    res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        user
    })
}

export default {
    register,
    login,
    logout,
    getMe
}