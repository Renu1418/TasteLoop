import userModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const isProduction = process.env.NODE_ENV === 'production'

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

// Register User
const registerUser = async (req, res) => {
  try {
    const {
      businessName,
      fullname,
      email,
      password,
      phone,
      address,
      role,
    } = req.body

    const isUserExists = await userModel.findOne({ email })

    if (isUserExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
      businessName,
      fullname,
      email,
      password: hashedPassword,
      phone,
      address,
      role: role || 'client',
    })

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.cookie('token', token, cookieOptions)

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        businessName: user.businessName,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    })
  } catch (err) {
    console.error('Error registering user:', err)

    return res.status(500).json({
      success: false,
      message: 'Error registering user',
    })
  }
}

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.cookie('token', token, cookieOptions)

    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user: {
        id: user._id,
        businessName: user.businessName,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    })
  } catch (err) {
    console.error('Error logging in:', err)

    return res.status(500).json({
      success: false,
      message: 'Error logging in',
    })
  }
}

// Logout User
const logoutUser = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
  })

  return res.status(200).json({
    success: true,
    message: 'User logged out successfully',
  })
}

// Get Current User
const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      businessName: req.user.businessName,
      fullname: req.user.fullname,
      email: req.user.email,
      phone: req.user.phone,
      address: req.user.address,
      role: req.user.role,
    },
  })
}

export { registerUser, loginUser, logoutUser, getCurrentUser }
