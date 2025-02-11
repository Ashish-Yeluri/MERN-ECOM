// var product = {
//   name: 'Orange',
//   price: 200
// };

const { compareSync } = require("bcrypt");
const Product = require("../models/productModel.js");
const APIFILTERS = require("../utilities/apiFilters.js");
const Errorhandler = require("../utilities/errorhandler.js");



// controller for create product from db
async function createProducts(req, res, next) {

  req.body.user = req.user._id
  console.log('hello', res.body)

  let product = await Product.create(req.body)
  if (!product) {
    // res.status(404).json({
    //   message: "Product Not Created Yet"
    // })
    return next(new Errorhandler('Product not Created', 404))
  }
  res.status(201).json({
    product
  })
  console.log(product)
  
}

// controller for get product from db
async function getProduct(req, res, next) {
let resPerPage = 3
  // let product = await Product.find()
  let apifilters = new APIFILTERS(Product, req.query).search().filters()
  let products = await apifilters.query
  apifilters.pagination(resPerPage)
  let totalProducts = products.length
  products = await apifilters.query.clone()
  console.log(products)
  
  if (!products) {
    // res.status(404).json({
    //   message: "no products in db"
    // })
    return next(new Errorhandler('Products not Found', 404));

  }
  res.status(201).json({
    resPerPage,
    totalProducts,
    products
  })
  console.log(products)
}



// controller for get single product details from db
async function getProductDetails(req, res, next) {
  let product = await Product.findById(req.params.id);
  if (!product) {
    // res.status(404).json({
    //   message: 'products not found in DB',
    // });
    return next(new Errorhandler('Product Not Found', 404));

  }
  res.status(201).json({
    product,
  });
  console.log(product);
}



// controller for Update product details from db
async function updateProduct(req, res) {
  let product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404).json({
      message: 'product not found in db'
    })
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new : true})
  res.status(200).json({
    product
  })
  console.log(product)
}




// controller for Delete product details from db
async function deleteProduct(req, res) {
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      message: 'products not found in DB',
    });
  }
  await Product.deleteOne()

  res.status(201).json({
    messge: "Product Deleted From DataBase"
  });
  console.log(product);
}


//controller for create/update reveiw

async function createReview(req, res, next) {

  let { rating, comment, productId } = req.body
  console.log(req.body)
  
  let review = {
    user: req.user._id,
    rating: Number(rating),
    comment
  }

  let product = await Product.findById(productId)
  console.log(product)

  if (!product) {
    return next(new Errorhandler('product not found', 404))
  }

  let isReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

  console.log('hello', isReviewed)
  
  if (isReviewed) {
    product.reviews.forEach((reveiw) => {
      if (reveiw.user.toString() === req.user._id.toString()) {
        reveiw.rating = rating
        reveiw.comment = comment
      }
    })
    
  } else {
    console.log('else')
    product.reviews.push(review)
    product.noOfReviews = product.reviews.length
    // console.log(product.reviews)
    // console.log(product.noOfReviews)
  }

  console.log(product.reviews.length )

  product.ratings = product.reviews.rating === 0 ? 0 : product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.reviews.length
  

  await product.save({validateBeforeSave: false})
  
  return res.status(200).json({
    message:"You have given a Review Successfully",
    success: true,
    length: product.reviews.length,
    product
 })
}

//controller for getting all reviews

async function getReview(req, res, next) {
  let product = await Product.findById(req.query.id)
  console.log('allreviews', product)
  return res.status(200).json({
    reviews: product.reviews,
    product
  })
 }


//controller for deleteReview (admin)

async function deleteReview(req, res, next) {

  let product = await Product.findById(req.query.productId)
  console.log(product)

  if (!product) {
     return next(new Errorhandler('product not found', 404))
  }

  let reviews = product.reviews.filter((reveiw) => {
    return reveiw._id.toString() !== req.query.id.toString()
  })

  let noOfReviews = reviews.length

  let ratings = noOfReviews === 0 ? 0 :  product.reviews.reduce((acc, item) => {
   return  (item.rating+acc)/noOfReviews
  }, 0)

  product = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, noOfReviews, ratings },
    {new: true}
  )

  return res.status(200).json({
    success: true,
    product
  })

}
 


module.exports = { createProducts, getProduct, getProductDetails, updateProduct, deleteProduct, createReview, getReview, deleteReview}