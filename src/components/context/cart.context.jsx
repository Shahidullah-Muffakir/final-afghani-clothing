import { useEffect } from "react";
import { createContext, useState } from "react";

/*
here we are passing the cartItems and productToAdd
*/

const addCartItem = (cartItems, productToAdd) => {
    //find if this product we want to add to the list, alread exist there.
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id)
    //when the product alread exist in the cartItems, then only increase the quantity of the same
    //product and write the reaming products unchanged in the cartItems.
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quanity: cartItem.quanity + 1 }
                : cartItem
        )

    }
    //if the product is new, then write all the previous products and add the new product
    // and add new prop quantity to it,   
    return [...cartItems, { ...productToAdd, quanity: 1 }]

}


//fucntion for removing or decreasing the quantity of cart items.
const removeCartItem = (cartItems, productToRemove) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

    if (existingCartItem.quanity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
    }

    return cartItems.map((cartItem) =>
        cartItem.id == productToRemove.id ?
            { ...cartItem, quanity: cartItem.quanity - 1 }
            : cartItem
    )

}

//helper function for clearing a specific checkout item
const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    total: () => { },
    cartCount: 0


})


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)

    const [cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState(0)
    //this funciton will add the product to the cartItems or increase the quantiy array by passing the product to it,
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    //this function will remove thr product from the cartItems to decrease or increase the quantity
    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    const [cartCount, setCartCount] = useState(0)

    //cartCount is changing my looping over the quantity of every cartItem inside the cartitems
    // total is first 0, after looping over the first cartItem, it become the quantiy of first cartItem,
    // now it will loop through and second and rest cartItems and sum the quantity.
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quanity, 0)
        setCartCount(newCartCount)

    }, [cartItems])


    useEffect(() => {
      const newTotal=cartItems.reduce((total,cartItem)=>total+cartItem.quanity*cartItem.price,0)
      setTotal(newTotal)

        
    }, [cartItems])
    

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, total }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}