import Heading from "../UI/Heading";
import Paragraph from "../UI/Paragraph";

const TotalPrice = ({ cartData }) => {

    let numberOfCart = 0;
    let totalPrice = 0;

    if (!cartData) {
        numberOfCart = 0;
        totalPrice = 0;
    } else {
        if (cartData.length === 0) {
            numberOfCart = 0;
            totalPrice = 0;
        } else if (cartData.length === 1) {
            numberOfCart = cartData[0].quantity;
            totalPrice = cartData[0].quantity * cartData[0].price;
        } else {
            numberOfCart = cartData.map(item => item.quantity).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);
            totalPrice = cartData.reduce(function (accumulator, item) {
                return parseFloat(accumulator) + parseFloat(item.quantity) * parseFloat(item.price);
            }, 0);
            totalPrice = parseFloat(totalPrice).toFixed(2)
        }
    }
    
    return(
        <div className="cart--price-card">
            <Heading label={3} className="bold">Checkout</Heading>
            <div className="label--text">
                <i className="bi bi-check2-all"></i>
                <span>Your order is eligible for free delivery.</span>
            </div>
            <Heading className="bold">Sub-Total: ${totalPrice}</Heading>
            <Paragraph>Number of items: {numberOfCart}</Paragraph>
            <button className="btn">
                <i className="bi bi-cart-check"></i>
                <span>Proceed To Cart</span>
            </button>
        </div>
    )
}

export default TotalPrice;