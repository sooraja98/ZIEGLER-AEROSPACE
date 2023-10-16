import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product' // Assuming you have a 'Product' model for products
    }
  ],
  purchases: [
    {
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
          },
          quantity: {
            type: Number,
            required: true
          }
        }
      ],
      totalPrice: {
        type: Number,
        required: true
      },
      purchaseDate: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
