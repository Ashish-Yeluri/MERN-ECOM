let express = require('express');
const {registerUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserProfile, deleteUserProfile, updateUserProfile, updatePassword, getAllUsers, getUserDetails, deleteUser, updateUser} = require('../controllers/userController.js');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth.js');


let router = express.Router();


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forget').post(forgetPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/getuser').get(isAuthenticatedUser, getUserProfile)
router.route('/deleteuser').delete(isAuthenticatedUser, deleteUserProfile)
router.route('/updateuser').put(isAuthenticatedUser, updateUserProfile)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers)
router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser);


module.exports = router;
