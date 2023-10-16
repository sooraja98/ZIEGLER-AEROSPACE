import {EyeIcon, HeartIcon} from "@heroicons/react/outline";
import axios from "axios";
import PropTypes from "prop-types";
import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'

function ProductCard({product}) {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const token = localStorage.getItem("usertoken")
    const navigate = useNavigate();


    const handleToggleWishlist = async () => {
        try { // Make a POST request to your server to add or remove the product from the user's wishlist
            const response = await axios.post("http://localhost:4000/add-to-wishlist", {
                productId: product._id, // Replace with the actual product ID or identifier
                isInWishlist: !isInWishlist, // Toggle the wishlist status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) { // Product was successfully added or removed from the wishlist
                setIsInWishlist(!isInWishlist); // Toggle the local state
                navigate('/wishlist')

            }
        } catch (error) {
            console.error("Error adding/removing from wishlist:", error);
        }
    };

    return (
        <div className="bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
            <img src={
                    product.image
                }
                alt={
                    product.name
                }
                className="object-cover h-48 w-full"/>

            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                    {
                    product.name
                }</h2>
                <p className="text-gray-400 text-sm mb-2">Location: {
                    product.location
                }</p>
                <p className="text-gray-400 text-sm mb-2">Market Price: ${
                    product.marketPrice
                }</p>
                <p className="text-gray-400 text-sm">Seller: {
                    product.seller
                }</p>

                <div className="flex justify-center items-center mt-4">
                    {
                    token ? (
                        <button className={
                                `bg-${
                                    isInWishlist ? "red" : "primary"
                                }-600 hover:bg-${
                                    isInWishlist ? "red" : "primary"
                                }-700 text-white font-semibold py-2 px-4 rounded-full mr-2 transition duration-300 ease-in-out transform hover:scale-105`
                            }
                            onClick={handleToggleWishlist}>
                            <HeartIcon className="h-5 w-5 inline-block mr-2"/>
                            Add to Wishlist
                        </button>
                    ) : (
                        <div className="flex justify-center items-center">
                            <div>
                                <Link to='/login' className="bg-blue-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                                    Login
                                </Link>
                            </div>

                        </div>
                    )
                }


                    {
                     token && (
                        <button className={`bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105`}
                           >
                            <Link to={
                                `/productview/${
                                    product._id
                                }`
                            }>
                                <>
                                    <EyeIcon className="h-5 w-5 inline-block mr-2"/>
                                    View Product
                                </>
                            </Link>
                        </button>
                    )
                } </div>
            </div>
        </div>

    );
}

ProductCard.propTypes = {
    product: PropTypes.shape(
        {
            name: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
            marketPrice: PropTypes.string.isRequired,
            seller: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired
        }
    ).isRequired
};
export default ProductCard;
