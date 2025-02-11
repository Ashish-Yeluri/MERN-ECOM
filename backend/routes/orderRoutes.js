let express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth.js');
const { placeOrder, getOrderDetails, getAllOrders, allOrders, deleteOrder } = require('../controllers/orderController.js');


let router = express.Router();

router.route('/placeOrder').post(isAuthenticatedUser,placeOrder);
router.route('/getOrderDetails/:id').get(isAuthenticatedUser, getOrderDetails);
router.route('/getAllOrders').get(isAuthenticatedUser, getAllOrders);
router.route('/admin/allOrders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router.route('/admin/deleteOrder/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)


module.exports = router;
