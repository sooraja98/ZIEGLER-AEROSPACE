import  { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const token = localStorage.getItem('usertoken');
  const [wishlist, setWishlist] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/getproducts");
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // Make a GET request to fetch the user's wishlist based on the token
    axios
      .get('http://localhost:4000/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setWishlist(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching wishlist:', error);
      });
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, []); // Fetch products when the component mounts

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, products.length);

  // Slice the products array to get products for the current page
  const displayedProducts = products.slice(startIndex, endIndex);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-black min-h-screen p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap justify-center">
          {currentPage > 1 && (
            <button
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-full mr-2"
              onClick={() => handlePageClick(currentPage - 1)}
            >
              Previous
            </button>
          )}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              className={`${
                currentPage === index + 1
                  ? "bg-black text-white font-bold"
                  : "bg-white text-gray-700"
              } font-semibold px-4 py-2 rounded-full mx-2 mt-2 sm:mt-0`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-full ml-2"
              onClick={() => handlePageClick(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
