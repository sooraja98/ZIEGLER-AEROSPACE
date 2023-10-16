import express from 'express';
import jwt, { decode } from 'jsonwebtoken'; // Import the JWT library
import User from '../models/user.js'; // Replace with the correct path to your User model
import Product from '../models/product.js'
import mongoose from 'mongoose';
import Stripe from 'stripe';
import Order from '../models/order.js'
// Replace 'your-stripe-secret-key' with your actual Stripe API secret key
const stripe = new Stripe('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
const router = express.Router();

router.post('/add-to-wishlist', async (req, res) => {
    const productId = req.body.productId;
    const isInWishlist = req.body.isInWishlist;
    try {
        const token = req.header('Authorization'); // Get the JWT token from the request headers
        if (! token) {
            return res.status(401).json({success: false, message: 'Unauthorized'});
        }
        const tokenParts = token.split(' '); // Split the token by space
        if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
            const tokenWithoutBearer = tokenParts[1];
            var decoded = jwt.verify(tokenWithoutBearer, "mysecretkey");
            console.log(decoded)

        }
        const user = await User.findOne({ email: decoded.email });       
         console.log(user)

        if (! user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        if (isInWishlist) {
            user.wishlist.push(productId);
        } else {
            user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
        }

        await user.save();
        res.status(200).json({success: true, wishlist: user.wishlist});
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({success: false, message: 'Internal server error'});
    }
});

router.get('/wishlist',async (req, res) => {  
    try {
        const token = req.header('Authorization'); // Get the JWT token from the request headers
        if (! token) {
            return res.status(401).json({success: false, message: 'Unauthorized'});
        }
        const tokenParts = token.split(' '); // Split the token by space
        if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
            const tokenWithoutBearer = tokenParts[1];
            var decoded = jwt.verify(tokenWithoutBearer, "mysecretkey");
        }
      // Fetch the user's wishlist based on their user ID
      const user = await User.findOne({ email: decoded.email }).populate({path:'wishlist',model: 'Product' }); // Replace 'wishlist' with your actual field name
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

  
      res.status(200).json(user.wishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });



  router.delete('/wishlist/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    // Get the user ID from the authenticated token
    const token = req.header('Authorization'); // Get the JWT token from the request headers
        if (! token) {
            return res.status(401).json({success: false, message: 'Unauthorized'});
        }
        const tokenParts = token.split(' '); // Split the token by space
        if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
            const tokenWithoutBearer = tokenParts[1];
            var decoded = jwt.verify(tokenWithoutBearer, "mysecretkey");
        }
  
    try {
      // Remove the item from the user's wishlist
      const user = await User.findOne({email: decoded.email })
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Find the index of the item to remove
      const index = user.wishlist.indexOf(itemId);
      if (index > -1) {
        user.wishlist.splice(index, 1);
        await user.save();
        res.status(200).json({ success: true, message: 'Item removed from wishlist' });
      } else {
        res.status(404).json({ success: false, message: 'Item not found in wishlist' });
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });



  router.post('/add-to-cart', async (req, res) => {
    const token = req.header('Authorization'); // Get the JWT token from the request headers
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const tokenParts = token.split(' '); // Split the token by space
    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
      const tokenWithoutBearer = tokenParts[1];
      var decoded = jwt.verify(tokenWithoutBearer, "mysecretkey");
    }
    const { productId } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email: decoded.email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Find the product by ID
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      // Check if the product is already in the user's cart
      const existingCartItem = user.cart.find((item) => item.product.toString() === productId);
  
      if (existingCartItem) {
        // If the product is in the cart, update the quantity
        existingCartItem.quantity += 1;
      } else {
        // If the product is not in the cart, add it to the cart
        user.cart.push({ product: productId });
      }
  
      await user.save();
  
      res.status(200).json({ success: true, message: 'Product added to cart' });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });



  router.get('/productview/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findOne({ _id: new mongoose.Types.ObjectId(productId) });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Send the product details back to the client.
      res.json(product);
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/process-payment', async (req, res) => {
    try {
      const token = req.header('Authorization'); // Get the JWT token from the request headers
      if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
  
      const tokenParts = token.split(' '); // Split the token by space
      if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
        const tokenWithoutBearer = tokenParts[1];
        var decoded = jwt.verify(tokenWithoutBearer, 'mysecretkey');
      }
  
      const { paymentMethod, totalAmount, productId, name, address, phone,wishlistCount } = req.body;  
      // Assuming you have the user ID available in the 'decoded' object
      const user = await User.findOne({ email: decoded.email });
      const product=await Product.findById(productId)
  
      const purchase = {
        products: [
          {
            product: productId,
            quantity: 1,
          },
        ],
        totalPrice: totalAmount,
      };
  
      user.purchases.push(purchase);
  
      // Create a new order based on the payment details
      const order = new Order({
        buyerName: name,
        phone:phone,
        quantity: wishlistCount, // Assuming a single quantity for this example
        Price: product.marketPrice, // Assuming market price is the total amount
        shippingDate: new Date(), // Set to the current date, or you can get it from the user's input
        seller: product.seller, // Replace with the actual seller name
        image: product.image, // Replace with the actual product image URL
        amount: totalAmount,
        buyerAddress:address, // Replace with the actual address field from the user's profile
        amountPaid: totalAmount,
        shipmentStatus: 'Pending', // Set the initial shipment status
      });
  
      // Save the order to the Order collection
      await order.save();
  
      // Save the user's purchase details
      await user.save();
  
      res.json({ message: 'Payment successful' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  });


  router.get('/purchases', async (req, res) => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
  
      const tokenParts = token.split(' ');
      if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
        const tokenWithoutBearer = tokenParts[1];
        var decoded = jwt.verify(tokenWithoutBearer, 'mysecretkey');
      }
  
      const user = await User.findOne({ email: decoded.email }).populate({
        path: 'purchases.products.product',
        select: 'name image marketPrice', // Include the fields you want to retrieve
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const purchases = user.purchases;
  
      // Create a new array to hold the processed purchase data
      const processedPurchases = await Promise.all(purchases.map(async (purchase) => {
        const productsWithDetails = await Promise.all(purchase.products.map(async (product) => {
          // Populate the details of each product
          const detailedProduct = await Product.findById(product.product._id).select('name image marketPrice');
          return {
            ...product,
            product: detailedProduct, // Replace with the detailed product info
          };
        }));
  
        return {
          ...purchase.toObject(),
          products: productsWithDetails,
        };
      }));
      console.log(purchases)
      res.json({ purchases: processedPurchases });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
export default router;
