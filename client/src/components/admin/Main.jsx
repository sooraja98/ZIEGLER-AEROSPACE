import {useEffect, useState} from "react";
import AddProductForm from "./AddProduct";
import axios from "axios";

const Main = () => {

    const [products, setProducts] = useState([]);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/admin/getproducts");
            console.log(response)
            if (response.data && Array.isArray(response.data)) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []); // Place fetchProducts in the dependency array

    const toggleAddForm = () => {
        setIsAddFormVisible(!isAddFormVisible);
    };

    const handleAddProduct = (formData) => {
        console.log(formData);
    };

    const handleCloseForm = () => {
        setIsAddFormVisible(false);
    };


    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold">Product Management</h1>
                <button onClick={toggleAddForm}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
                    Add Product
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Index
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Product image
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Product Name
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Quantity
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Market Price
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Estimated Shipping Date
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Seller
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                        products.map((product,index) => (
                            <tr key={
                                product.id
                            }>
                                 <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                    {
                                    index+1
                                } </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                    <img src={
                                            (product.image)
                                        }
                                        alt={
                                            product.name
                                        }
                                        className="h-16 w-16 object-cover rounded-full"/>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                    {
                                    product.name
                                } </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                    {
                                    product.location
                                } </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                    {
                                    product.quantity
                                } </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                    {
                                    product.marketPrice
                                } </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                    {
                                    product.shippingDate
                                } </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                    {
                                    product.seller
                                } </td>
                                {/* Add more table cells for other product details */} </tr>
                        ))
                    } </tbody>
                </table>
            </div>
            {
            isAddFormVisible && (
                <AddProductForm isOpen={isAddFormVisible}
                    onClose={handleCloseForm}
                    onAddProduct={handleAddProduct}/>
            )
        } </div>
    );
};

export default Main;
