

function sendToken(user, statusCode, res) {
 
let token = user.getJwtToken()
  console.log(token)

  let options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true
  }

  res.status(statusCode).cookie('token', token, options).json({
    token
  })

}

module.exports = sendToken