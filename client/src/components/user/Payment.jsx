import{ useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PaymentForm({ productId, wishlistCount }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [product, setProduct] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const navigate =useNavigate()

  useEffect(() => {
    // Fetch product details based on productId from your server using Axios
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/productview/${productId}`);
        const productData = response.data;

        if (productData) {
          setProduct(productData);
          // Calculate the total amount based on product price and wishlistCount
          setTotalAmount(productData.marketPrice * wishlistCount);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId, wishlistCount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("usertoken");

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create a payment method with name, address, phone, and totalAmount
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: name,
        address: {
          line1: address,
          // Add other address details as needed
        },
        phone: number, // Include the phone number
      },
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);

      // Here, you can send the paymentMethod, totalAmount, name, address, and phone number to your server for processing using Axios
      try {
        const response = await axios.post('http://localhost:4000/process-payment', {
          paymentMethod,
          totalAmount,
          productId,
          name, // Include the name
          address, // Include the address
          phone: number,
          wishlistCount, // Include the phone number
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Handle the response from your server
        if(response.data.message==="Payment successful"){
          alert("payment susccess")
          navigate('/Purchace')
          
        }
      } catch (error) {
        console.error('Error processing payment:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 border rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <div className="border border-gray-300 p-4 rounded-md shadow-md">
            {product ? (
              <div className="flex items-center">
                <div className="w-1/2 md:w-1/3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-fill h-48 md:h-64 w-full rounded-md"
                  />
                </div>
                <div className="w-1/2 md:w-2/3 ml-4">
                  <h2 className="text-2xl text-white font-semibold mb-4">
                    {product.name}
                  </h2>
                  <p className="text-white text-lg mb-4">{product.description}</p>
                  <p className="text-blue-600 font-semibold text-lg">
                    Price: ${product.marketPrice * wishlistCount}
                  </p>
                </div>
              </div>
            ) : (
              <p>Loading product details...</p>
            )}
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Phone number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!stripe}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover-bg-blue-600 focus:outline-none focus-ring focus-bg-blue-600"
            >
              Pay ${totalAmount}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
