import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Footer from '../components/user/Footer';
import Header from '../components/user/Header';
import PaymentForm from '../components/user/Payment';
import { useLocation } from 'react-router-dom';

// Load Stripe outside of the component's render to avoid recreating it on every render
const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');

const PaymentPage = () => {
    // Move this part inside the component body or a useEffect
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('productId');
    const wishlistCount = searchParams.get('wishlistCount');

    return (
        <div>
            <Header /> 
            <Elements stripe={stripePromise}>
                <PaymentForm productId={productId} wishlistCount={wishlistCount} />
            </Elements>
            <Footer />
        </div>
    );
};

export default PaymentPage;
