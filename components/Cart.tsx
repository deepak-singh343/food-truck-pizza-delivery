import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";

const Cart = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("context not found");
  }
  const { cartItems } = context;
  console.log(cartItems);
  return (
    <>
      {cartItems.length > 0 ? (
        <div></div>
      ) : (
        <div className="p-4">Cart is Empty</div>
      )}
    </>
  );
};

export default Cart;
