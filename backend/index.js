

require('dotenv').config()            // here we can put this in variable or not that is our personal
let express = require('express');                   // common js syntax
const mongoose = require('mongoose');
// import express from 'express'                   // es-6 syntax    // if we use this syntax then go to package.json and put this   "type": "module", after main
let connectDb = require('./db.js')
let productRoutes = require('./routes/productRoutes.js');
let userRoutes = require('./routes/userRoutes.js')
let orderRoutes = require('./routes/orderRoutes.js');
const errorMiddleWare = require('./middlewares/errorMiddleWare.js');
const cookieParser = require('cookie-parser');
  


let app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api', productRoutes)
app.use('/api', userRoutes)
app.use('/api', orderRoutes)
app.use(errorMiddleWare)


process.on('uncaughtException',(err) => {
  console.log(err, 'handling un caught Exception')
  process.exit(1)
})



connectDb();


let PORT = process.env.PORT || 5000

let server = app.listen(process.env.PORT, () => {
  console.log(`server started in ${process.env.PORT}runs ${process.env.NODE_ENV} environment`);

})

process.on('unhandledRejection', (err) => {
  console.log('Error', err)
  console.log('Handling unhandled Promise rejection')
  server.close(() => {
    process.exit(1)
  })
})


