
let Order = require('../models/orderModel.js')
const ErrorHandler = require('../utilities/errorhandler.js');



// controller for place Order
async function placeOrder(req, res, next) {

  let {
    orderItems,
    shippingInfo,
    paymentMethod,
    paymentInfo,
    itemPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    orderStatus
  } = req.body

  let order = await Order.create({
    orderItems,
    shippingInfo,
    paymentMethod,
    paymentInfo,
    itemPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    user: req.user._id
  })

  return res.status(201).json({
    order
  })
}


// controller for getOrderDetails

async function getOrderDetails(req, res, next) {

  let order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorHandler('Order not found with the Given Id...', 404))
  }
  return res.status(200).json({
    order,
  });
}

//  
async function getAllOrders(req, res, next) {
  let orders = await Order.find({user: req.user.id });

  if (!orders) {
    return next(new ErrorHandler('Order not found with this User...', 404))
  }
  return res.status(200).json({
    count: orders.length,
    orders,
  });
}



// controller for getting all orders by admin
async function allOrders(req, res, next) {
  let orders = await Order.find()
  return res.status(200).json({
    count: orders.length,
    orders,
  });
  if (!orders) {
    return next(new ErrorHandler('Orders Not Found...!!', 404));
  }
}



// controller for delete order by admin
async function deleteOrder(req, res, next) {
  let order = await Order.findById(req.params.id)
  
  if (!order) {
    return next(new ErrorHandler('Orders Not Found with Gievn ID...!!', 404));
  }
  await order.deleteOne()
  return res.status(200).json({
    message:"Order Deleted Succesfully"
  })
}




module.exports = { placeOrder, getOrderDetails, getAllOrders, allOrders, deleteOrder  };