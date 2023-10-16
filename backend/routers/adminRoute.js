import express from 'express';
import Product from '../models/product.js';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Order from '../models/order.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvpvoqgia',
  api_key: '887845154618411',
  api_secret: '4PN-frHRrPCOsZedU_Y842aHD70',
  secure: true,
});

const uploadImageToCloudinary = async (imageBuffer, folderName) => {
  try {
    // Convert the buffer to a base64 data URI
    const dataURI = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

    // Upload the data URI to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'image',
      folder: folderName,
    });
    
    return result.secure_url;
  } catch (error) {
    throw error;
  }
};



// Handle adding a product
router.post('/addProduct', upload.single('image'), async (req, res) => {
  try {
    const { name, location, quantity, marketPrice, shippingDate,decription, seller } = req.body;
    const imageBuffer = req.file.buffer;

    // Define the Cloudinary folder
    const folderName = 'ZIEGLER AEROSPACE';

    // Upload the image to Cloudinary
    try {
      const imageUrl = await uploadImageToCloudinary(imageBuffer, folderName);
      console.log("Image uploaded to Cloudinary:", imageUrl);

      // Create a new product with the Cloudinary image URL
      const newProduct = new Product({
        name,
        location,
        quantity,
        marketPrice,
        shippingDate,
        seller,
        decription,
        image: imageUrl,
      });

      // Save the product to the database
      await newProduct.save();

      res.status(201).json({ message: 'Product added successfully' });
    } catch (uploadError) {
      console.error('Error uploading image to Cloudinary:', uploadError);
      res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
    }
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product' });
  }
});


// Handle fetching products
router.get('/getProducts', async (req, res) => {
  try {
    // Use the Product model to fetch products from the database
    const products = await Product.find();

    // Check if any products were found
    if (products.length === 0) {
      // If no products were found, return a 404 status code and a message
      return res.status(404).json({ message: 'No products found' });
    }

    // If products were found, send them in the response
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});
router.get('/orders', async (req, res) => {
  try {
    // Fetch orders from your database (assuming you have an "Order" model)
    const orders = await Order.find();
    console.log(orders)
    res.json( orders );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.patch('/admin/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { isShipmentComplete } = req.body;

  Order.updateOne({ _id: orderId }, { isShipmentComplete }, (err, result) => {
    if (err) {
      console.error('Error updating shipment status:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Shipment status updated:', result);
      res.status(200).json({ message: 'Shipment status updated successfully' });
    }
  });
});


export default router;
