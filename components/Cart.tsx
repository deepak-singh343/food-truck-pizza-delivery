import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Cart = () => {
  const route = useRouter();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("context not found");
  }
  const { cartItems, setCartItems } = context;

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    let totalPrice = 0;
    cartItems.map((item) => {
      total += item.quantity;
      totalPrice = totalPrice + item.quantity * item.price;
    });
    setTotalQuantity(total);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  const handleIncreaseQuantity = (item: any) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const handleDecreaseQuantity = (item: any) => {
    if (item.quantity > 1) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    }
  };

  const handleCheckout = () => {
    route.push("/checkout");
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="flex md:flex-row flex-col-reverse md:gap-12 gap-4 md:px-12 px-4 py-4 justify-between">
          <div className="rounded flex-1 bg-white md:px-8 px-4 md:py-8 py-4 shadow-md">
            <div className="text-4xl mb-4 font-semibold">Shopping Cart</div>
            <div className="border-y border-gray-300 md:py-8 py-6 flex flex-col gap-6">
              {cartItems &&
                cartItems.map((item: any) => {
                  return (
                    <div
                      key={item.id}
                      className="flex md:flex-row flex-col justify-between bg-white py-4 px-2 rounded shadow-md border border-gray-300"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded overflow-hidden relative">
                          <Image
                            src={item.imageUrl}
                            alt="food"
                            width={200}
                            height={200}
                            className="w-full h-full object-fit"
                          />
                          <div
                            className={`absolute border rounded-[2px] ${
                              item.type == "veg"
                                ? "border-green-300"
                                : "border-red-400"
                            } bg-white top-1.5 right-1.5 w-2.5 h-2.5 flex justify-center items-center`}
                          >
                            {item.type == "veg" ? (
                              <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                            ) : (
                              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm flex flex-col gap-2">
                          <div className="flex flex-col gap-1">
                            <span className="text-[1.1rem]">{item.name}</span>
                            <span>&#8377;{item.price}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center items-center mr-2 md:mt-0 mt-4">
                        <div className="flex items-center border border-red-500 rounded">
                          <button
                            onClick={() => handleDecreaseQuantity(item)}
                            className="cursor-pointer px-3 py-1 text-red-500 font-semibold"
                          >
                            -
                          </button>
                          <span className="px-4 text-red-500 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item)}
                            className="cursor-pointer px-3 py-1 text-red-500 font-semibold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="rounded flex flex-col gap-4 bg-white md:px-8 px-4 md:py-8 py-4 shadow-md h-fit ">
            <div className="text-1xl">
              SubTotal (
              {totalQuantity == 1
                ? `${totalQuantity} item`
                : `${totalQuantity} items`}
              ) : <span className="font-semibold">{totalPrice}</span>
            </div>
            <div className="w-full flex justify-center">
              <button
                className="cursor-pointer px-6 py-1 rounded-l-full rounded-r-full text-sm bg-yellow-300"
                onClick={handleCheckout}
              >
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 text-2xl">Cart is Empty</div>
      )}
    </>
  );
};

export default Cart;
