import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [email, setEmail] = useState(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        const userEmail = usuario?.email;

        if (userEmail) {
            setEmail(userEmail);

            const savedCart = localStorage.getItem(`cart_${userEmail}`);
            setCartItems(savedCart ? JSON.parse(savedCart) : []);
        }

        setInitialized(true);
    }, []);

    useEffect(() => {
        if (email) {
            localStorage.setItem(`cart_${email}`, JSON.stringify(cartItems));
        }
    }, [cartItems, email]);

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

    if (!initialized) return null;

    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
