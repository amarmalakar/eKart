import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from '../../firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useDispatch } from "react-redux";
import { AuthActions } from "../../Store/auth-slice";
import Loader from "../UI/Loader";

const ProductWish = ({ productId }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);

    let wishList = [];
    let isWish = false;

    if (user.isLoggedIn) {
        if (!user.userData) {
            wishList = []
        } else {
            wishList = !user.userData.wishList ?  [] : user.userData.wishList;
            if (wishList.length > 0) {
                const found = wishList.find(product => product === productId)
                isWish = !found ? false : true;
            }
        }
    }
    // console.log(wishList, wishList.length);

    const wishHandler = async () => {
        if (!user.isLoggedIn) {
            navigate('/auth');
            alert('Please LogIn!')
        } else {
            setIsLoading(true)
            const docRef = doc(db, 'usersData', user.userId)
            if (!isWish) {
                if (!user.userData) {
                    await setDoc(
                        docRef, 
                        {
                            wishList: [...wishList, productId]
                        }
                    )
                } else {
                    await updateDoc(
                        docRef, 
                        {
                            wishList: [...wishList, productId]
                        }
                    )
                }
            } else {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const wishes = docSnap.data().wishList;
                    const filteredArr = wishes.filter(wish => wish !== productId)
                    await updateDoc(docRef, { wishList: filteredArr })
                }
            }

            const docSnap = await getDoc(docRef)
            let refferData = docSnap.data();
            dispatch(AuthActions.userDataHandler(refferData))
            setIsLoading(false)
        }
    }

    if (isLoading) {return <Loader />}

    return (
        <button className="wish--button" onClick={wishHandler}>
            {!isWish ? <i className="bi bi-heart"></i>
            : <i className="bi bi-heart-fill"></i>}
        </button>
    )
}

export default ProductWish;
