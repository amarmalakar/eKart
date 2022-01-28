import { useEffect, useState } from "react";
import Container from "../UI/Container";
import Loader from "../UI/Loader";
import ProductCategoryList from "./ProductCategoryList";

const ProductCategories = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(0);
    const [productCategory, setProductCategory] = useState('');

    const fetchCategories = async () => {
        setIsLoading(true)
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setProductCategory(data[0])
        setIsLoading(false)
        setCategory(data)
    }
    useEffect(() => {
        fetchCategories()
    }, [])

    const categoryHandler = (i, category) => {
        setCurrentCategory(i)
        setProductCategory(category)
    }
    const isActiveCategory = (idx) => idx === currentCategory ? 'active--category' : '';


    if (isLoading) {
        return <Loader />
    }


    return (
        <Container>
            <ul className="product--category-list">
                {category.map((cat, i) => <li 
                    key={i}
                    onClick={() => categoryHandler(i, cat)}
                    className={`${isActiveCategory(i)}`}
                >{cat}</li>)}
            </ul>
            <ProductCategoryList category={productCategory} />
        </Container>
    )
}

export default ProductCategories;