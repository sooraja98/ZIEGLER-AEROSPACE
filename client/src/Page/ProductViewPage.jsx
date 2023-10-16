import { useParams } from "react-router-dom";
import Footer from "../components/user/Footer"
import Header from "../components/user/Header"
import ProductView from "../components/user/ProductView"

const ProductViewPage = () => {
  const  {productId}  = useParams();
  return (
    <div>
        <Header/>
        <ProductView className="mt-7" productId={productId} />
        <Footer className="mt-36"/>
    </div>
  )
}

export default ProductViewPage
