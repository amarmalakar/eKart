import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from '../UI/Loader'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useDispatch } from "react-redux";
import { AuthActions } from "../../Store/auth-slice";

const CartInput = ({ productId, image, title, price }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [num, setNum] = useState(1);
    const user = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);

    let cartList = [];
    let isInCart = false;

    if (user.isLoggedIn) {
        if (!user.userData) {
            cartList = []
        } else {
            cartList = !user.userData.cartList ?  [] : user.userData.cartList;
            if (cartList.length > 0) {
                const found = cartList.find(product => product.productId === productId)
                isInCart = !found ? false : true;
                // console.log(isInCart);
            }
        }
    }

    const addToCartHandler = async () => {
        if (!user.isLoggedIn) {
            navigate('/auth');
            alert('Please LogIn!')
        } else {
            setIsLoading(true)
            const docRef = doc(db, 'usersData', user.userId);
            if (!isInCart) {
                if (!user.userData) {
                    await setDoc(
                        docRef, 
                        {
                            cartList: [...cartList, { productId, image, title, price, quantity: num }]
                        }
                    )
                } else {
                    await updateDoc(
                        docRef, 
                        {
                            cartList: [...cartList, { productId, image, title, price, quantity: num }]
                        }
                    )
                }
            } else {
                const foundCart = cartList.filter(cart => cart.productId === productId)
                const prevQuantity = foundCart[0].quantity
                const newQuantity = +prevQuantity + +num;
                // console.log(newQuantity);
                const newCartList = cartList.map(cart => {
                    if (cart.productId === productId) {
                        return { productId, image, title, price, quantity: newQuantity }
                    }
                    return cart;
                })
                await updateDoc(
                    docRef, 
                    {
                        cartList: [...newCartList]
                    }
                )
            }
            
            const docSnap = await getDoc(docRef)
            let refferData = docSnap.data();
            dispatch(AuthActions.userDataHandler(refferData))
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="cart--fields">
            <input
                type="number"
                value={num}
                onChange={e => setNum(e.target.value)}
                min="1"
                max="30"
            />
            <button onClick={addToCartHandler}><i className="bi bi-cart-plus"></i></button>
        </div>
    )
}

export default CartInput;
