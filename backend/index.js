require("dotenv").config()
const express = require("express")
const cors = require("cors")
require("./Database/dbConnection")
const router = require("./Routes/router")

// creating server
const eventServer = express()

// enable the data sharing with cors
eventServer.use(cors())
// parse json data
eventServer.use(express.json())
eventServer.use(router)

// creating port
const PORT = 3000 || process.env.PORT

// run the server app in specified port
eventServer.listen(PORT, () => {
  console.log(`eventServer started at port ${PORT}`)
})

// resolving get request
eventServer.get("/", (req, res) => {
  res.status(200).send(`<h1 style="color:green"> EventServer started at port and waiting for client request</h1>`)
})
