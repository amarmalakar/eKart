import { Fragment } from 'react'
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Container from "../Components/UI/Container";
import Heading from "../Components/UI/Heading";
import WishCard from '../Components/WishList/WishCard';

const WishList = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth)

    if (!user.isLoggedIn) {
        return <Container>
            <Heading label={2}>
                <Link to="/auth">You've to login first!</Link>
            </Heading>
        </Container>
    } else {
        if (!user.userData) {
            return <Container>
                <Heading label={2}>You've not any wishes.</Heading>
            </Container>
        } else {
            return <Container>
                {!user.userData.wishList ? 
                    <Heading label={2}>You've not any wishes.</Heading>
                :
                    <Fragment>
                        <Heading label={2}>{user.userData.wishList == 0 ? 'Your wish list is empty' : 'Your Wishes'}</Heading>
                        <div style={{ maxWidth: '536px' }}>
                            {user.userData.wishList.map((wish, i) => (
                                <WishCard productId={wish} key={i} />
                            ))}
                        </div>
                    </Fragment>
                }
            </Container>
        }
    }
}

export default WishList;