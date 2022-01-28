import { useEffect, useState } from "react";
import Loader from "../UI/Loader";
import { Link } from "react-router-dom";

const ProductCategoryList = ({ category }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchProduct = async () => {
        setIsLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await response.json()
        setIsLoading(false)
        setProducts(data)
        // console.log(data);
    }
    useEffect(() => {
        fetchProduct()
    }, [category])

    if (isLoading) {
        return <Loader />
    }

    // console.log(products);

    return (
        <div className="product--list">
            {products.map(product => (
                <div className="product--card" key={product.id}>
                    <div className="img">
                        <img src={`${product.image}`} alt="" />
                    </div>
                    <div className="details">
                        <h3 className="title">{product.title}</h3>
                        {/* <p className="desc">${product.description}</p> */}
                        <div className="flex">
                            <p className="price">${product.price}</p>
                            <Link className="button" to={`/product/${product.id}`}><i className="bi bi-cart4"></i></Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductCategoryList;

// outreach@flipkart.com