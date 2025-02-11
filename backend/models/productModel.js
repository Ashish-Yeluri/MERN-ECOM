
let mongoose = require('mongoose')

let productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Provide Product NAME'],
      maxlength: [100, 'Product name cannot Exceed 100 Characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please Provide Product PRICE'],
      maxlength: [6, 'Product Price cannot Exceed 6 Digits'],
    },
    description: {
      type: String,
      required: [true, 'Please Provide Product DESCRIPTION'],
    },
    images: [
      {
        public_id: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    seller: {
      type: String,
      required: [true, 'Please Provide Seller Name'],
    },
    stock: {
      type: Number,
      required: [true, 'Please Provide Stock'],
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      }],
    noOfReviews: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'please provide category'],
      enum: {
        values: ['electronics', 'cloths', 'fruits'],
        message: 'please select correct category',
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);


let Product = mongoose.model('Products', productSchema)

module.exports = Product