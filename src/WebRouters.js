import { Route, Routes } from "react-router-dom";
import Auth from "./Screens/Auth";
import Cart from "./Screens/Cart";
import Home from "./Screens/Home";
import ProductId from "./Screens/ProductId";
import WishList from "./Screens/WishList";

const WebRouters = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductId />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/wishes" element={<WishList />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    )
}

export default WebRouters