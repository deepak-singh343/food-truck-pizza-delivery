"use client";
import Cart from "@/components/Cart";
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
          <Cart />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartPage;
