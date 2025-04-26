const users = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// register
exports.registerController = async (req, res) => {
  console.log("Inside registerController")
  console.log(req.body)
  const { username, email, password } = req.body
  try {
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      res.status(406).json("Already existing user... Please Login!!!")
    } else {
      const newUser = new users({
        username,
        email,
        password,
        phoneNo: "",
        userSavedEvents: [],
        userPastEvents: [],
        userEvents: [],
      })
      await newUser.save()
      res.status(200).json(newUser)
    }
  } catch (err) {
    res.status(401).json(err)
  }
}

// login
exports.loginController = async (req, res) => {
  console.log("Inside loginController")
  const { email, password } = req.body
  console.log("Login attempt with email:", email)

  try {
    // First, try an exact match
    let existingUser = await users.findOne({ email })
    
    // If no exact match, try case-insensitive search
    if (!existingUser) {
      console.log("No exact match found, trying case-insensitive search")
      // Using regex for case-insensitive match
      existingUser = await users.findOne({ 
        email: { $regex: new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } 
      })
    }
    
    // Log all emails in DB for debugging
    const allUsers = await users.find({}, {email: 1, _id: 0})
    console.log("All emails in DB:", allUsers.map(u => u.email))
    console.log("Found user?", existingUser ? "Yes" : "No")
    
    if (existingUser) {
      console.log("Found user with email:", existingUser.email)
      
      if (password === existingUser.password) {
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD || "fallbacksecret")
        console.log("Login successful, token generated")
        
        res.status(200).json({ 
          user: existingUser, 
          token 
        })
      } else {
        console.log("Password mismatch for user:", existingUser.email)
        console.log("Provided password:", password)
        console.log("Stored password:", existingUser.password)
        res.status(404).json("Invalid Email/Password")
      }
    } else {
      console.log("User not found with email:", email)
      console.log("Available emails:", allUsers.map(u => u.email).join(", "))
      res.status(404).json("User doesn't exist. Please register!!")
    }
  } catch (err) {
    console.error("Login error:", err)
    res.status(401).json(err)
  }
}

// get user details
exports.getUserDetailsController = async (req, res) => {
  console.log("Inside getUserDetailsController")
  const userId = req.userId

  try {
    const userDetails = await users.find({ _id: userId })
    res.status(200).json(userDetails)
  } catch (err) {
    res.status(401).json(err)
  }
}

// get user details by id
exports.getUserDetailsByIdController = async (req, res) => {
  console.log("Inside getUserDetailsController")
  const userId = req.params.id

  try {
    const userDetails = await users.findById(userId)
    res.status(200).json(userDetails)
  } catch (err) {
    res.status(401).json(err)
  }
}
