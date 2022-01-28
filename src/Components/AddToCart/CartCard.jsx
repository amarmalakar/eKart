import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Heading from "../UI/Heading";
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../Store/auth-slice";
import Loader from "../UI/Loader";

const CartCard = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false);

    const reloadUserData = async () => {
        const docRef = doc(db, 'usersData', user.userId);
        const docSnap = await getDoc(docRef)
        let refferData = docSnap.data();
        dispatch(AuthActions.userDataHandler(refferData))
    }
    
    const deleteCart = async () => {
        setIsLoading(true)
        const docRef = doc(db, 'usersData', user.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const carts = docSnap.data().cartList;
            const filteredArr = carts.filter(cart => cart.productId !== props.productId)
            await updateDoc(docRef, { cartList: filteredArr })
        }

        reloadUserData()
        setIsLoading(false)
    }

    const decUpdateCart = async () => {
        if (props.quantity === 1) {
            alert ('1 is the minimum')
        } else {
            cartAction('dec')
        }
    }
    const incUpdateCart = async () => {
        if (props.quantity === 30) {
            alert ('30 is the maximum')
        } else {
            cartAction('inc')
        }
    }

    const cartAction = async (action) => {
        setIsLoading(true)
        const foundCart = user.userData.cartList.filter(cart => cart.productId === props.productId)
        const prevQuantity = foundCart[0].quantity
        const newQuantity = action === 'inc' ? prevQuantity + 1 : prevQuantity - 1;
        const newCartList = user.userData.cartList.map(cart => {
            if (cart.productId === props.productId) {
                return { productId: props.productId, image: props.image, title: props.title, price: props.price, quantity: newQuantity }
            }
            return cart;
        })
        const docRef = doc(db, 'usersData', user.userId);
        await updateDoc(
            docRef, 
            {
                cartList: [...newCartList]
            }
        )

        reloadUserData()
        setIsLoading(false)
    }

    if (isLoading) {return <Loader />}

    return (
        <div className="wish--card">
            <div className="img-section">
                <img src={props.image} alt="" />
            </div>
            <div className="details-section">
                <h2><Link to={`/product/${props.productId}`}>{props.title}</Link></h2>
                <Heading className="bold">${props.price}</Heading>

                <div className="cart--input">
                    <div className="cart--input-field">
                        <i className="bi bi-dash" onClick={decUpdateCart}></i>
                        <p>{props.quantity}</p>
                        <i className="bi bi-plus" onClick={incUpdateCart}></i>
                    </div>
                </div>
                
                <button className="btn red" onClick={deleteCart}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    )
}

export default CartCard;