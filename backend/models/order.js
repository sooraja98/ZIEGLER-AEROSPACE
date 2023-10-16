import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  buyerName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
Price: {
    type: Number,
    required: true,
  },
  shippingDate: {
    type: Date,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  image: {
    type: String, // You can store the image URL as a string
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  buyerAddress: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  shipmentStatus: {
    type: String, // You can define a set of valid shipment statuses
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);


