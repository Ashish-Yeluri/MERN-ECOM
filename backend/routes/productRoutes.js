let express = require('express')

let {createProducts, getProduct, getProductDetails,updateProduct, deleteProduct, createReview, getReview, deleteReview} = require('../controllers/productController.js');
let { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth.js');
let router = express.Router();

// router.get();
// router.get('./api/products', (req, res) => {
//   res.status(200).json({
//     products,
//   });
//   console.log(product);
// });





router.route('/products').get(getProduct)
router.route('/products/:id').get(getProductDetails)
router.route('/admin/products').post(isAuthenticatedUser, authorizeRoles('admin'), createProducts);
router.route('/admin/products/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.route('/admin/products/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/reviews').put(isAuthenticatedUser, createReview);
router.route('/allReviews').get(isAuthenticatedUser, getReview);
router.route('/admin/deleteReview').delete(isAuthenticatedUser, authorizeRoles('admin'),deleteReview);






module.exports = router;

