import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Components/Global/Navbar";
import TopNav from "./Components/Global/Topnav";
import WebRouters from "./WebRouters";

import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch } from "react-redux";
import { AuthActions } from "./Store/auth-slice";
import Loader from "./Components/UI/Loader";

const App = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.auth);
    // console.log(user);

    async function userData () {
        let refferData = undefined;
        setIsLoading(true)
        if (!user.isLoggedIn) {
            console.log("You're not login!");
        } else {
            const docRef = doc(db, 'usersData', user.userId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                refferData = docSnap.data();
            } else {
                console.log("No such document!");
            }
        }
        dispatch(AuthActions.userDataHandler(refferData))
        setIsLoading(false)
    }

    useEffect(() => {
        userData()
    }, [user.isLoggedIn])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="layout">
            <Navbar />

            <div className="main--wrapper">
                <TopNav />
                <WebRouters />
            </div>
        </div>
    )
}

export default App;
