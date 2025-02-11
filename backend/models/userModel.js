require('dotenv').config()
let mongoose = require('mongoose')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let crypto = require('crypto')

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please Enter your Name'],
      maxlength: [50, 'name can not exceed 50 chars'],
    },
    email: {
      type: String,
      require: [true, 'Please Enter your Email'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Please Enter your Password'],
      minlength: [6, 'Password should not lessthan 6 Characters'],
      select: false
    },
    avatar: {
      public_id: String,
      url: String
    },
    role: {
      type: String,
      default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  }, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  this.password =await bcrypt.hash(this.password, 10)
})

// generate token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.jWT_SECRETE, {expiresIn: process.env.JWT_EXPIRY_TIME});
}

userSchema.methods.comparePassword =async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}


// generate forget password token
userSchema.methods.getResetPasswordToken = function () {
  let resetToken = crypto.randomBytes(10).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // reset password expire
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

  return resetToken
}





let User = mongoose.model('Users', userSchema)

module.exports = User