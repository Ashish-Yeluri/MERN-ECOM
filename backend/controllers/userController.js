let User = require('../models/userModel.js')
let ErrorHandler = require('../utilities/errorhandler.js')
const sendEmail = require('../utilities/sendEmail.js')
const sendEmailTemplate = require('../utilities/sendEmailTemplate.js')
const sendToken = require('../utilities/sendToken.js')
let crypto = require('crypto')

// controller for user register
async function registerUser(req, res, next) {
  // User.create({
  // name: req.body.name,
  // email: req.body.email,
  // password: req.body.password,
  // });

  let { name, email, password } = req.body
  var user = await User.create({
    name,
    email,
    password
  })

  let token = user.getJwtToken()
  console.log(token)

  res.status(201).json({
    message: 'User Registered in DataBase Successfully',
    token
  })
}




// controller for user login
async function loginUser(req, res, next) {

  let { email, password } = req.body
  console.log(req.body)

  if (!email || !password) {
  return  next(new ErrorHandler('Please Enter Email and Password', 400))
  }

  // check user id in db or not
  let user = await User.findOne({ email }).select("+password")
  
  if (!user) {
   return next(new ErrorHandler('Invalid Email OR Password', 400))
  }

  // comapre user entered password is matched with db user password
  let isPasswordMatched = await user.comparePassword(password)         

  if (!isPasswordMatched) {
   return next(new ErrorHandler('Invalid Email OR Password', 401));
  }
  
  // let token = user.getJwtToken()
  // console.log(token)

  // res.status(200).json({
  //   message: 'User Login in DataBase Successfully',
  //   token,
  // });

  sendToken(user, 200, res)

}


// controller for forgetpassword
async function forgetPassword(req, res, next) {

  // check user id in db or not
  let user = await User.findOne({ email: req.body.email })
  
  // if user is not there
  if (!user) {
    return next(new ErrorHandler('user is not available in DB', 404))
  }

  // if user is there
  let resetToken = user.getResetPasswordToken()

  await user.save()

  let resetUrl = `${process.env.FRONTEND_URL}/api/password/reset/${resetToken}`

  console.log(process.env.FRONTEND_URL);
  let message = sendEmailTemplate(user.name, resetUrl)

  try {
   await sendEmail({
     email: user.email,
     subject: 'Recovery Forget Password',
     message: message
   })
    
    return res.status(200).json({
      message: `send mail to ${user.email}`
    })

  } catch (error) {
    user.resetPasswordToken = undefined, 
    user.resetPasswordExpire = undefined
    await user.save()
   return next(new ErrorHandler(error.Message, 500))

  }
}

// controller for reset password
async function resetPassword(req, res, next) {

  console.log(req.params.token) 
  let resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
  
  // console.log(resetPasswordToken)
  let user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  
  console.log(user)
  if (!user) {
    return next(new ErrorHandler('User is not available (or) Token Expired', 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('password & Reset password not Matched', 400))
  }
  user.password = req.body.password

  user.resetPasswordToken = null
  user.resetPasswordExpire = null
  await user.save()

  return res.status(200).json({
    message: 'Password reset Successfully...'
  })
}


// controller for getUser Profile
async function getUserProfile(req, res, next) {
  let user = await User.findById(req.user._id)

  res.status(200).json({
    user
  })
}



// controller for update password
async function updatePassword(req, res, next) {
  let user = await User.findById(req.user._id).select('+password')
  let isPasswordMatched = await user.comparePassword(req.body.oldPassword)
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Entered old Password is not Matched', 400));
  }
  user.password = req.body.password
  user.save()
  return res.status(200).json({
    message: 'Updated Password Successfully...!!'
  })
}




// controller for delete userProfile
async function deleteUserProfile(req, res, next) {
  let user = await User.findByIdAndDelete(req.user._id)
  
  res.status(200).json({
    message: 'User Profile Deleted'
  });
}


// controller for profileUpdate
async function updateUserProfile(req, res, next) {
  let newData = {
    name: req.body.name,
    email: req.body.email
  }
  let user = await User.findByIdAndUpdate(req.user._id, newData, { new: true });
  return res.status(200).json({
    user
  })
}

// controller for user logout
async function logoutUser(req, res, next) { 
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })
  res.status(200).json({
    message: 'Logged Out USER'
  })
}


// Admin Routes
// controller for getting all users (admin)
async function getAllUsers(req, res, next) {

  let users = await User.find()

  return res.status(200).json({
    users
  })
}

// controller for getting each users details (admin route)
async function getUserDetails(req, res, next) {

  let user = await User.findById(req.params.id)
  if (!user) {
    return next(new ErrorHandler('User not Found with given ID', 404)); 
  }

  return res.status(200).json({
    user
  })
}


// controller for deleting each users details (admin route)
async function deleteUser(req, res, next) {

  let user = await User.findById(req.params.id)
  if (!user) {
    return next(new ErrorHandler('User not Found with given ID', 404)); 
  }

  await user.deleteOne();

  return res.status(200).json({
    message:"User Deleted Successfully...!!"
  })
}


// controller for update user role (admin route)
async function updateUser(req, res, next) {

  let newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  }

  let user = await User.findByIdAndUpdate(req.params.id, newUserData, {new: true})
  if (!user) {
    return next(new ErrorHandler('User not Found with given ID', 404)); 
  }

  return res.status(200).json({
    user
  })
}




module.exports = {registerUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserProfile, deleteUserProfile, updateUserProfile, updatePassword, getAllUsers, getUserDetails, deleteUser, updateUser}