import { useState, useEffect } from 'react';
import axios from 'axios';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); // State to track if data is loading
  const token = localStorage.getItem('usertoken');

  useEffect(() => {
    // Make a GET request to fetch the user's wishlist based on the token
    axios
      .get('http://localhost:4000/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setWishlist(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching wishlist:', error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [token]);
  const handleRemoveFromWishlist = (itemId) => {
    // Make a DELETE request to your server to remove the item from the user's wishlist
    axios
      .delete(`http://localhost:4000/wishlist/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Handle successful removal on the client-side
        // Update the wishlist state by filtering out the removed item
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item._id !== itemId)
        );
      })
      .catch((error) => {
        console.error('Error removing item from wishlist:', error);
      });
  }

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Wishlist</h1>
      {loading ? ( // Show a loading indicator if data is loading
        <div className="text-white text-center">Loading your wishlist...</div>
      ) : (
        <ul className="space-y-2 text-white">
          {wishlist.map((item) => (
            <li
              key={item._id}
              className="border p-3 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-400">Price: ${item.marketPrice}</p>
                  <p className="text-gray-400">Seller: {item.seller}</p>
                  {/* Add more details here */}
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => handleRemoveFromWishlist(item._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
