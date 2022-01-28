import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../UI/Heading";
import Loader from "../UI/Loader";
import Paragraph from "../UI/Paragraph";

const WishCard = ({ productId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({});

    const fetchProduct = async () => {
        setIsLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json()
        // console.log(data);
        setIsLoading(false)
        setProduct(data)
    }
    useEffect(() => {
        fetchProduct()
    }, [productId])

    if (isLoading) {
        return <Loader />
    }

    return <div className="wish--card">
        <div className="img-section">
            <img src={product.image} alt="" />
        </div>
        <div className="details-section">
            <h2>{product.title}</h2>
            <Paragraph>{product.category}</Paragraph>
            <Heading className="bold">${product.price}</Heading>
            <Link to={`/product/${productId}`} className="btn">
                <i className="bi bi-cart3"></i>
                <span>View Details</span>
            </Link>
        </div>
    </div>
}

export default WishCard;
