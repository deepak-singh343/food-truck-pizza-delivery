"use client";
import UserInfo from "@/components/CheckoutComponents/UserInfo";
import HomeHeader from "@/components/HomeComponents/HomeHeader";
import { AppContext } from "@/context/AppContext";
import { getUserData } from "@/utils/helper";
import React, { useContext, useEffect, useState } from "react";

const CartPage = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context not found");
  }
  const [user, setUser] = useState();

  const getUser = async () => {
    const data = await getUserData();
    setUser(data.data.data);
    console.log(data);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      {user ? (
        <>
          <div className="sticky top-0 bg-gray-50 z-1">
            <HomeHeader user={user} />
          </div>
          <div className="p-8">
            <UserInfo user={user} heading="Change User Details" />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartPage;
