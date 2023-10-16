import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  name: String,
  location: String,
  quantity: Number,
  marketPrice: Number,
  shippingDate: Date,
  seller: String,
  decription:String,
  image: String,
});

export default mongoose.model('Product', productSchema);
