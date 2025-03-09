"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Ratings from "./Ratings";
import { AppContext } from "@/context/AppContext";

const FoodTile = ({ item }: any) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("FoodTile must be used within an AppContextProvider");
  }

  const { cartItems, setCartItems } = context;
  const [expanded, setExpanded] = useState(false);
  const maxLength = 60;

  const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = () => {
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  };

  const handleIncreaseQuantity = () => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
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

  return (
    <div className="flex justify-between bg-white py-2 px-2 rounded shadow-md">
      <div className="flex gap-4">
        <div className="w-45 h-45 rounded overflow-hidden relative">
          <Image
            src={item.imageUrl}
            alt="food"
            width={200}
            height={200}
            className="w-full h-full object-fit"
          />
          <div
            className={`absolute border rounded-[2px] ${
              item.type == "veg" ? "border-green-300" : "border-red-400"
            } bg-white top-1.5 right-1.5 w-2.5 h-2.5 flex justify-center items-center`}
          >
            {item.type == "veg" ? (
              <div className="w-1 h-1 bg-green-600 rounded-full"></div>
            ) : (
              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
            )}
          </div>
        </div>
        <div className="w-[60%] text-sm flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[1.3rem]">{item.name}</span>
            <Ratings rating={item.rating} />
            <span>&#8377;{item.price}</span>
          </div>
          {expanded ? (
            <div className="text-[rgb(79,79,79)] font-extralight">
              {item.description}
            </div>
          ) : (
            <div className="text-[rgb(79,79,79)] font-extralight">
              {item.description.slice(0, maxLength)}...
              <span
                className="font-semibold cursor-pointer ml-1"
                onClick={toggleReadMore}
              >
                Read More
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center mr-2">
        {quantity > 0 ? (
          <div className="flex items-center border border-red-500 rounded">
            <button
              onClick={handleDecreaseQuantity}
              className="cursor-pointer px-3 py-1 text-red-500 font-semibold"
            >
              -
            </button>
            <span className="px-4 text-red-500 font-semibold">{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="cursor-pointer px-3 py-1 text-red-500 font-semibold"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="cursor-pointer rounded text-red-500 font-semibold px-4 py-1 flex justify-center items-center border border-red-500"
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodTile;
