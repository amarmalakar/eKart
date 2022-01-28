import { Fragment } from "react";
import Slider from '../Components/Home/Slider';
import ProductCategories from '../Components/Home/ProductCategories';

const Home = () => {
    return (
        <Fragment>
            <Slider />
            <ProductCategories />
        </Fragment>
    )
}

export default Home;
