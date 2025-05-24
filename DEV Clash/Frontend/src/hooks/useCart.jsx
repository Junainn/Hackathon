import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Cart structure: [{ item: {id, name, price, description, imageUrl}, quantity: N, vendor: {id, name} }]
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem('shoppingCart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((item, vendor) => {
    setCartItems(prevItems => {
      // Check if item from different vendor is in cart
      if (prevItems.length > 0 && prevItems[0].vendor.id !== vendor._id) {
        alert("You can only order from one vendor at a time. Please clear your cart to order from a different vendor.");
        return prevItems; // Don't add if from different vendor
      }

      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.item.id === item.id);

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { item, quantity: 1, vendor }];
      }
    });
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(cartItem =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      ).filter(cartItem => cartItem.quantity > 0); // Remove if quantity becomes 0 or less
      return newItems;
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems(prevItems => prevItems.filter(cartItem => cartItem.item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.quantity), 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getTotalItems,
      getTotalPrice,
      cartVendor: cartItems.length > 0 ? cartItems[0].vendor : null,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
