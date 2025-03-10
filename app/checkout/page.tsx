"use client";
import Payment from "@/components/CheckoutComponents/Payment";
import UserInfo from "@/components/CheckoutComponents/UserInfo";
import HomeHeader from "@/components/HomeComponents/HomeHeader";
import { AppContext } from "@/context/AppContext";
import { getUserData } from "@/utils/helper";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const CheckoutPage = () => {
  const route = useRouter();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context not found");
  }
  const { cartItems } = context;
  const [user, setUser] = useState();

  const getUser = async () => {
    const data = await getUserData();
    setUser(data.data.data);
    console.log(data);
  };

  useEffect(() => {
    getUser();
  }, []);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!cartItems || cartItems.length == 0) {
      route.push("/home");
    }
    let total = 0;
    let totalPrice = 0;
    cartItems.map((item) => {
      total += item.quantity;
      totalPrice = totalPrice + item.quantity * item.price;
    });
    setTotalQuantity(total);
    setTotalPrice(totalPrice);
  }, [cartItems]);
  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      {user && cartItems.length > 0 ? (
        <>
          <div className="sticky top-0 bg-gray-50 z-1">
            <HomeHeader user={user} />
          </div>
          <div className="flex md:flex-row flex-col-reverse md:py-8 py-4 md:px-8 px-4 justify-between gap-8">
            <div className="md:w-[80%] w-full flex flex-col gap-8">
              <UserInfo user={user} heading="User Details" />
              <Payment amount={totalPrice} />
            </div>
            <div className="rounded flex flex-col gap-4 bg-white md:px-4 px-2 md:py-2 py-2 shadow-md h-fit md:w-[10rem] w-full">
              <div className="flex justify-between">
                <span>Items: </span>
                <span className="font-semibold"> {totalQuantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Total: </span>
                <span className="font-semibold"> {totalPrice}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CheckoutPage;
