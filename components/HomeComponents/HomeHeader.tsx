"use client";
import { getUserData } from "@/utils/helper";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

interface HomeHeaderProps {
  user: User;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ user }) => {
  const navigate = useRouter();
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    navigate.push("/login");
  };

  const handleProfile = () => {};

  useEffect(() => {
    const logo = document.getElementById("logo");
    if (logo) {
      logo.style.color = "black";
    }
  }, []);

  return (
    <div className="flex h-[5rem] min-h-[5rem] justify-end items-center px-6 py-4 border border-gray-200">
      <div className="flex gap-4 items-center">
        <div className="h-10 w-10 p-4 bg-blue-400 rounded-full flex justify-center items-center text-white">
          {user?.name?.[0].toUpperCase()}
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
