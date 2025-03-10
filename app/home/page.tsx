"use client";
import HomeHeader from "@/components/HomeComponents/HomeHeader";
import Menu from "@/components/HomeComponents/Menu/Menu";
import ResturantInfo from "@/components/HomeComponents/ResturantInfo";
import { AppContext, AppContextProvider } from "@/context/AppContext";
import { getUserData } from "@/utils/helper";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
interface User {
  name: string;
  email: string;
}
const Home = () => {
  // const context = useContext(AppContext);
  // if (!context) {
  //   throw new Error("Context not found");
  // }
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
    <div className="bg-gray-50 h-full flex flex-col">
      {user ? (
        <>
          <div className="sticky top-0 bg-gray-50 z-1">
            <HomeHeader user={user} />
            <div className="px-6 py-4 border-b border-gray-300">
              <ResturantInfo />
            </div>
          </div>

          <Menu />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
