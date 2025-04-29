const jwt = require("jsonwebtoken")

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header is missing or invalid" })
  }

  const token = authHeader.split(" ")[1]

  if (token) {
    try {
      const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD || "fallbacksecret")

      req.userId = jwtResponse.userId
      req.userEmail = jwtResponse.email
      
      if (!req.userEmail) {
        return res.status(401).json("Authorization failed... Invalid token payload.");
      }
      
      next()
    } catch (err) {
      res.status(401).json("Authorization failed... Please Login!!!")
    }
  } else {
    res.status(404).json("Authorization failed... Token is Missing!!!")
  }
}

module.exports = jwtMiddleware