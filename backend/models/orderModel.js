

let mongoose = require('mongoose')

let orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      street: {
        type: String,
        require: true,
      },
      city: {
        type: String,
        require: true,
      },
      phoneNo: {
        type: Number,
        require: true,
      },
      zipCode: {
        type: String,
        require: true,
      },
      country: {
        type: String,
        require: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: {
          type: String,
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
        price: {
          type: Number,
          require: true,
        },
        image: {
          type: String,
          require: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: 'Product',
        },
      },
    ],
    orderStatis: {
      type: String,
      enum: {
        values: ['Processing', 'Shipped', 'Delivered'],
        message: 'Please Select above Status',
      },
      default: 'Processing'
    },
    itemPrice: {
      type: Number,
      require: true,
    },
    taxAmount: {
      type: Number,
      require: true,
    },
    shippingAmount: {
      type: Number,
      require: true,
    },
    totalAmount: {
      type: Number,
      require: true,
    },
    paymentMethod: {
      type: String,
      require: [true, 'Please Provide Payement Method: COD (or) Card'],
      enum: {
        values: ['COD', 'Card'],
        message: 'Please Select above Payment Methods',
      },
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    deliveredAt: Date
     
  },
  { timestamps: true }
);

let Order = mongoose.model('Order', orderSchema)

module.exports = Order