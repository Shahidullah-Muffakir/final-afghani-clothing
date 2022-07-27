
import { useContext } from "react"

import { useNavigate } from "react-router-dom"

import Button from "../button/button.component"
import CartItem from "../cart-item/cart-item.component"
import { CartContext } from "../context/cart.context"

import './cart-dropdown.styles.scss'


const CartDropdown = () => {

    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()
    const checkoutHandler = () => navigate('checkout')

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items" >
                {cartItems.map((cartItem) => (
                    <CartItem cartItem={cartItem} key={cartItem.id} />
                ))}
            </div>
            <Button onClick={checkoutHandler} >GO CHECKOUT</Button>
        </div>
    )
}
export default CartDropdown