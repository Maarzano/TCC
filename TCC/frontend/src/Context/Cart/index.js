import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addItemToCart = (item, quantity) => {
        setCartItems(prev => {
            const existingItem = prev.find(i => i.itemId === item.itemId);
            if (existingItem) {
                return prev.map(i =>
                    i.itemId === item.itemId
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [...prev, { ...item, quantity }];
        });
    };

    const removeItemFromCart = (itemId) => {
        setCartItems(prev => prev.filter(i => i.itemId !== itemId));
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
