import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AuthActions } from "../../Store/auth-slice";
const Navbar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)
    
    let wishLength = 0;
    let cartLength = 0;

    if (user.isLoggedIn) {
        if (!user.userData) {
            wishLength = 0;
            cartLength = 0;
        } else {
            wishLength = !user.userData.wishList ? 0 : user.userData.wishList.length;
            if (!user.userData.cartList) {
                cartLength = 0;
            } else {
                if (user.userData.cartList.length === 0) {
                    cartLength = 0;
                } else if (user.userData.cartList.length === 1) {
                    cartLength = user.userData.cartList[0].quantity;
                } else {
                    cartLength = user.userData.cartList.map(item => item.quantity).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
                }
            }
        }
    }
    
    const logoutHandler = () => {
        dispatch(AuthActions.logoutHandler());
        alert("You're successfully logout!")
    }

    return (
        <div className="left--navbar">
            <Link to="/" data-title="Home"><i className="bi bi-house-door"></i></Link>
            <div className="mid--navbar">
                <Link to="/cart" data-title="Cart">
                    <i className="bi bi-cart4"></i>
                    <span>{cartLength}</span>
                </Link>
                <Link to="/wishes" data-title="WishList">
                    <i className="bi bi-heart"></i>
                    <span>{wishLength}</span>
                </Link>
            </div>
            <div>
                {user.isLoggedIn ? 
                    <Link to="/auth" data-title="Auth" onClick={logoutHandler}><i className="bi bi-person-circle"></i></Link>
                :
                    <Link to="/auth" data-title="Auth"><i className="bi bi-box-arrow-in-right"></i></Link>
                }
            </div>
        </div>
    )
}

export default Navbar;