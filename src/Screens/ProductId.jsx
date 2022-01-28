import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../Components/UI/Container";
import Loader from "../Components/UI/Loader";
import Heading from "../Components/UI/Heading";
import Paragraph from "../Components/UI/Paragraph";
import CartInput from "../Components/ProductId/CartInput";
import ProductWish from "../Components/ProductId/ProductWish";


const ProductId = () => {
    const { productId } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({});

    const fetchProduct = async () => {
        setIsLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json()
        setIsLoading(false)
        setProduct(data)
    }
    useEffect(() => {
        fetchProduct()
    }, [productId])

    if (isLoading) {
        return <Loader />
    }
    
    return (
        <Container>
            <div className="product--flex">
                <img src={product.image} alt="" />
                <div className="description">
                    <ProductWish productId={productId} />
                    <h1 className="bold pColor">{product.title}</h1>
                    <Paragraph>{product.description}</Paragraph>
                    <Heading>${product.price}</Heading>
                    <CartInput
                        productId={productId}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                    />
                </div>
            </div>
        </Container>
    )
}

export default ProductId;
