import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartCard from "../Components/AddToCart/CartCard";
import TotalPrice from "../Components/AddToCart/TotalPrice";
import Container from "../Components/UI/Container";
import Heading from "../Components/UI/Heading";

const Cart = () => {
    const user = useSelector(state => state.auth)
    // console.log(user.userData.cartList);

    if (!user.isLoggedIn) {
        return <Container>
            <Heading label={2}>
                <Link to="/auth">You've to login first!</Link>
            </Heading>
        </Container>
    } else {
        if (!user.userData) {
            return <Container>
                <Heading label={2}>You're cart is empty.</Heading>
            </Container>
        } else {
            return <Container>
                {!user.userData.cartList ? 
                    <Heading label={2}>You're cart is empty.</Heading>
                :
                    <div className="cart--page">
                        <div>
                            <Heading label={2}>{user.userData.cartList == 0 ? "You're cart is empty" : 'Your Cart'}</Heading>
                            <div>
                                {user.userData.cartList.map((cart, i) => (
                                    <CartCard {...cart} key={i} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <TotalPrice cartData={user.userData.cartList} />
                        </div>
                    </div>
                }
            </Container>
        }
    }
}

export default Cart;