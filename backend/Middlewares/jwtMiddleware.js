const jwt = require("jsonwebtoken")

const jwtMiddleware = (req, res, next) => {
  console.log("Inside jwtMiddlware")
  // const token = req.headers["authorization"].split(" ")[1]
  // console.log(token);
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header is missing or invalid" })
  }

  const token = authHeader.split(" ")[1]
  // console.log(token);

  if (token) {
    try {
      const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD)
      // console.log(jwtResponse);

      req.userId = jwtResponse.userId
      next()
    } catch (err) {
      res.status(401).json("Authorisation failed... Please Login!!!")
      console.log(err)
    }
  } else {
    res.status(404).json("Authorization failed... Token is Missing!!!")
    console.log("Authorization failed... Token is Missing!!!")
  }
}

module.exports = jwtMiddleware
