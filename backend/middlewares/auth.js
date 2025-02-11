let jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Errorhandler = require('../utilities/errorhandler.js')

async function isAuthenticatedUser(req, res, next) {

  let { token } = req.cookies
  console.log(token)

 let decode = await jwt.verify(token, process.env.jWT_SECRETE)
  console.log(decode.id)

  req.user = await User.findById(decode.id)

  next()
}

 function authorizeRoles(...roles) {
   return (req, res, next) => {
     console.log('hello', req.user);
    if (!roles.includes(req.user.role)) {
      return next(new Errorhandler(`Role is (${req.user.role}) so, not accessed resources`, 403))
      // return res.status(403).json({
      //   message: 'user not an admin'
      // })
    }
    next()
  }
}

module.exports = { isAuthenticatedUser, authorizeRoles }