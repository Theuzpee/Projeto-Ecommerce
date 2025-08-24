import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
    console.log('Produto adicionado:', product.name);
  };

  const removeFromCart = (productId) => {

    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    console.log('Produto removido, ID:', productId);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart, 
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
