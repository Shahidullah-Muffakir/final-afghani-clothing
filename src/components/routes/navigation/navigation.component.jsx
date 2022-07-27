import React from "react"
import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"

// import { ReactComponent as logoMain } from '../../../assets/logo.svg'
import './navigation.styles.scss'
import logo from '../../../assets/logo10.png'
import { useContext } from "react"
import { UserContext } from "../../context/user.context"
import { signOutUser } from "../../../utils/firebase/firebase.utils"
import CartIcon from "../../cart-icon/cart-icon.component"
import CartDropdown from "../../cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../context/cart.context"
const Navigation = () => {

    const { currentUser } = useContext(UserContext)
    console.log(currentUser)

    const { isCartOpen} = useContext(CartContext)

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container " to='/'>
                    <img src={logo} alt="logo" />
                    {/* <logoMain /> */}
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='shop'>
                        SHOP
                    </Link>
                    {currentUser ? (
                        <Link onClick={signOutUser} className="nav-link" to='auth'>
                            SIGN OUT
                        </Link>
                    ) : <Link className="nav-link" to='auth'>
                        SIGN IN
                    </Link>}
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation