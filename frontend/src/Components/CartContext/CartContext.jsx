import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item, quantity, priceOption) => {
        const existingItem = cart.find(cartItem => cartItem.id === item._id && cartItem.priceOption === priceOption);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item._id && cartItem.priceOption === priceOption
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity, priceOption }]);
        }
    };

    const removeFromCart = (id, priceOption) => {
        setCart(cart.filter(cartItem => !(cartItem.id === id && cartItem.priceOption === priceOption)));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
