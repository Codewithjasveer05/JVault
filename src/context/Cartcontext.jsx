import {createContext, useEffect, useState} from "react"
export const CartContext = createContext()

const CartProvider= ({children}) =>{
   
const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart ? JSON.parse(savedCart) : [];
});

  useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}, [cart]);


const addToCart = (product,quantity) => {
  const exist = cart.find(
    (item) => item.id === product.id
  );

  if (exist) {
    setCart(
      cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  } else {
    setCart([
      ...cart,
      {
        ...product,
        quantity,
      },
    ]);
  }
};
const increaseQuantity = (id) => {
  setCart(
    cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  );
};
const decreaseQuantity = (id) => {
  setCart(
    cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1,
          }
        : item
    )
  );
};
const removeFromCart = (id) => {
  setCart(
    cart.filter((item) => item.id !== id)
  );
};
  return(
     <CartContext.Provider value={{cart,setCart,addToCart,increaseQuantity,decreaseQuantity,removeFromCart}}>
        {children}
     </CartContext.Provider>
  )
}

export default CartProvider