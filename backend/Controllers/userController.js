const users = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.loginController = async (req, res) => {
  const { email, password } = req.body
  try {
    let existingUser = await users.findOne({ email })
    
    if (!existingUser) {
      existingUser = await users.findOne({ 
        email: { $regex: new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } 
      })
    }
    
    if (existingUser) {
      if (password === existingUser.password) {
        const token = jwt.sign({ userId: existingUser._id, email: existingUser.email }, process.env.JWTPASSWORD || "fallbacksecret")
        res.status(200).json({ 
          user: existingUser, 
          token 
        })
      } else {
        res.status(404).json("Invalid Email/Password")
      }
    } else {
      res.status(404).json("User doesn't exist. Please register!!")
    }
  } catch (err) {
    res.status(401).json(err)
  }
}

// get user details
exports.getUserDetailsController = async (req, res) => {
  const userId = req.userId
  try {
    const userDetails = await users.find({ _id: userId })
    if (userDetails && userDetails.length > 0) {
        res.status(200).json(userDetails[0]) // Return the user object, not the array
    } else {
         res.status(404).json({ message: "User details not found" });
    }
  } catch (err) {
    res.status(401).json(err)
  }
}