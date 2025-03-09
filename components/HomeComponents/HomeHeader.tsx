"use client";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GiFoodTruck } from "react-icons/gi";
import { AppContext } from "@/context/AppContext";
import { BsCart } from "react-icons/bs";

interface User {
  name: string;
  email: string;
}

interface HomeHeaderProps {
  user: User;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ user }) => {
  const context = useContext(AppContext);
  let quantity = 0;
  if (!context) {
    throw new Error("context not found");
  }
  const { cartItems } = context;

  const navigate = useRouter();
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    navigate.push("/login");
  };

  const getQuantity = () => {
    cartItems.map((item) => {
      quantity = quantity + item.quantity;
    });
    return quantity;
  };

  const handleCart = () => {
    navigate.push("/cart");
  };

  const handleProfile = () => {};

  return (
    <div className="flex h-[5rem] min-h-[5rem] justify-end items-center px-6 py-4 border border-gray-200">
      <div id="logo" className="z-1 absolute top-2 left-6 cursor-pointer">
        <GiFoodTruck size={60} onClick={() => navigate.push("/home")} />
      </div>
      <div className="flex gap-4 items-center">
        <div className="cursor-pointer h-10 w-10 p-4 bg-blue-400 rounded-full flex justify-center items-center text-white">
          {user?.name?.[0].toUpperCase()}
        </div>
        <div className="relative cursor-pointer">
          <BsCart size={30} onClick={handleCart} />

          {getQuantity() > 0 ? (
            <span className="absolute flex justify-center items-center top-[-0.2rem] right-[-0.2rem] border rounded-full h-4 w-4 bg-white text-[red] border-red-300 text-[0.5rem]">
              {quantity}
            </span>
          ) : (
            ""
          )}
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowSettings(!showSettings)}
        >
          {user?.name}

          {showSettings ? (
            <div className="relative">
              <MdKeyboardArrowUp />

              <ul className="overflow-hidden text-sm bg-white text-left w-[7rem] absolute right-0 top-8 drop-shadow-md rounded">
                <li
                  className="px-2 py-2 hover:bg-gray-300"
                  onClick={handleProfile}
                >
                  Profile
                </li>
                <li
                  className="px-2 py-2 hover:bg-gray-300"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          ) : (
            <MdKeyboardArrowDown />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
