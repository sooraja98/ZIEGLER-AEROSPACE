import { useEffect, useState } from "react";
import Footer from "../components/user/Footer";
import Header from "../components/user/Header";
import PurchaseItem from "../components/user/PurchaceItem";
import axios from "axios";

const PurchaseItemPage = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        // Replace 'your-token-here' with the actual token
        const token = localStorage.getItem('usertoken');
    
        // Make a GET request to fetch purchase items from the backend with the Authorization header
        axios.get('http://localhost:4000/purchases', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
          .then((response) => {
            const purchases = response.data.purchases; // Assuming your API response returns purchases
    
            // Set the fetched purchases in the state
            setProducts(purchases);
          })
          .catch((error) => {
            console.error('Error fetching purchase items:', error);
          });
      }, []);

    return (
        <>
         <Header/>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Purchase Items</h1>
        <div className="flex flex-wrap -mx-4">
          {products.map((product) => (
            <PurchaseItem key={product._id} product={product} />
          ))}
        </div>
      </div>
      <Footer/>
        </>
       
    );
  };
  
  export default PurchaseItemPage;
 
  
  
  
  
  