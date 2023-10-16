import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import Contact from './components/user/Contact';
import SignupPage from './Page/SignupPage';
import Login from './Page/Login';
import ShopPage from './Page/ShopPage';
import ProductViewPage from './Page/ProductViewPage';
import PaymentPage from './Page/PaymentPage';
import Dashboard from './components/admin/Dashboard';
import OrderPage from './Page/OrderPage';
import AdminLogin from './components/admin/Login'
import WishListPage from './Page/WishListPage';
import PurchaseItemPage from './Page/PurchaseItemPage';

function App() {
  return (
    <>
      <Routes>
        {/* Define the route for "/home" with the Home component */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productview/:productId" element={<ProductViewPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<Dashboard />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/Purchace" element={<PurchaseItemPage />} />


      </Routes>
    </>
  );
}

export default App;
