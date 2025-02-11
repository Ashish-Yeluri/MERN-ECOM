let dotenv = require('dotenv').config()
let mongoose = require('mongoose')

async function connectDb() {
  mongoose.connect(process.env.DB_URL)
    .then(() => {
      console.log('DataBase Connected Succesfully -Mr.ASHISH!');
    })
    .catch(() => {
      console.log('DB Not Connected');
    })
}

module.exports = connectDb