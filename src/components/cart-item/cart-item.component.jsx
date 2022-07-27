import { useContext } from "react"
import { CartContext } from "../context/cart.context"
import './cart-item.styles.scss'
const CartItem = ({ cartItem }) => {
    const { name, quanity, imageUrl, price } = cartItem;
    return (
        <div className="cart-item-container ">
            <img src={imageUrl} alt={`${name}`} />
            <div className="item-details">

                <span className="name">{name}</span>
                <span className="price">{quanity}x ${price}</span>
            </div>
        </div>

    )
}

export default CartItem;