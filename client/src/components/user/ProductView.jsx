import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function ProductView({productId}) {
    const [product, setProduct] = useState(null);
    const [wishlistCount, setWishlistCount] = useState(1);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const token = localStorage.getItem("usertoken")
    const navigate = useNavigate();


    const incrementWishlist = () => {
        setWishlistCount(wishlistCount + 1);
    };

    const decrementWishlist = () => {
        if (wishlistCount <= 1) {
            setWishlistCount(1);
        } else {
            setWishlistCount(wishlistCount - 1);
        }
    };
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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/productview/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [productId]);


    const buynow = () => {
      // When the "BUY NOW" button is clicked, set the state and navigate
      navigate(`/payment?productId=${productId}&wishlistCount=${wishlistCount}`);
    };

    return (
        <div className="max-h-screen">
            {
            product ? (
                <>
                    <h1 className="text-4xl md:text-4xl text-white font-serif mb-14">PRODUCT DETAILS</h1>
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="lg:w-1/2">
                            <img src={
                                    product.image
                                }
                                alt={
                                    product.name
                                }
                                className="object-cover h-96 w-full rounded-lg hover:shadow-lg"/>
                        </div>
                        <div className="lg:w-1/2 mt-4 lg:mt-0 lg:ml-8">
                            <h2 className="text-3xl text-gray-800 font-semibold">
                                {
                                product.name
                            }</h2>
                            <p className="text-gray-600 text-lg my-4 pt-2">
                                {
                                product.decription
                            }</p>
                            <div className="flex items-center text-gray-600 text-lg mb-4 pt-2 md:pl-44 pl-20">
                                <span className="mr-2  ">Location:</span>
                                <span className="text-blue-600  font-semibold">
                                    {
                                    product.location
                                }</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-lg mb-4 pt-2 md:pl-44 pl-20">
                                <span className="mr-2">Seller:</span>
                                <span className="text-blue-600 font-semibold">
                                    {
                                    product.seller
                                }</span>
                            </div>
                            <p className="text-3xl text-blue-600 font-bold">
                                Total Price: ${
                                product.marketPrice * wishlistCount
                            } </p>
                            <div className="flex items-end mt-6 md:pl-40 pl-10 space-x-4">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full focus:outline-none"
                                    onClick={buynow}>
                                    BUY NOW
                                </button>
                                <div className="flex items-center space-x-2">
                                    {
                                    wishlistCount > 1 && (
                                        <button onClick={decrementWishlist}
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-full focus:outline-none">
                                            -
                                        </button>
                                    )
                                }
                                    <span className="text-xl text-white font-semibold">
                                        {wishlistCount}</span>
                                    <button onClick={incrementWishlist}
                                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-full focus:outline-none">
                                        +
                                    </button>
                                    <button onClick={handleToggleWishlist}
                                        className="bg-red-800 hover:bg-yellow-500 text-white font-semibold py-2 px-3 rounded-full focus:outline-none">
                                        Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>Loading...</div>
            )
        } </div>
    );
}

export default ProductView;
