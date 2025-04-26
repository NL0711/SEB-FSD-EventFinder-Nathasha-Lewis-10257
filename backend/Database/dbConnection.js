const mongoose = require("mongoose")

const connectionString = process.env.MONGO_URI

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4
}

mongoose
  .connect(connectionString, options)
  .then((res) => {
    console.log("MongoDb Atlas connected successfully with eventServer.")
  })
  .catch((err) => {
    console.log("MongoDb Atlas connection failed with eventServer.")
    console.log(err)
  })
