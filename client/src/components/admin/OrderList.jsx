import  { useEffect, useState } from 'react';
import axios from 'axios'
const Orders = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true); // State to track if data is loading

  useEffect(() => {
    const token = localStorage.getItem('usertoken');
    // Make a GET request to fetch the user's wishlist based on the token
    axios
      .get('http://localhost:4000/admin/orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setShipments(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching wishlist:', error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);
  console.log(shipments)
  const handleShipmentToggle = (index) => {
    const updatedShipments = [...shipments];
    updatedShipments[index].isShipmentComplete = !updatedShipments[index].isShipmentComplete;
    setShipments(updatedShipments);
  };

  return (
    <div className="container mx-auto mt-8 text-white">
      <h1 className="text-3xl font-semibold mb-4">Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Buyer Name
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Market Price
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Shipping Date
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Seller
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Buyer Address
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Amount Paid
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Shipment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((order, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.buyerName}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.Price}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.shippingDate}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.seller}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.image && (
                    <img
                      src={order.image}
                      alt={`Product ${index}`}
                      width="50"
                      height="50"
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.amount}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.buyerAddress}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  {order.amountPaid}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                  <button
                    onClick={() => handleShipmentToggle(index)}
                    className={`${order.isShipmentComplete
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      } px-2 py-1 rounded-md`}
                    >
                      {order.isShipmentComplete ? 'Complete' : 'Not Complete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Orders;
