"use client";
import HomeHeader from "@/components/HomeComponents/HomeHeader";
import Menu from "@/components/HomeComponents/Menu/Menu";
import ResturantInfo from "@/components/HomeComponents/ResturantInfo";
import { getUserData } from "@/utils/helper";
import React, { useEffect, useState } from "react";
interface User {
  name: string;
  email: string;
}
const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const getData = async () => {
    try {
      const data = await getUserData();
      if (data?.data) {
        setUser(data.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="bg-gray-100 h-full flex flex-col">
      {user ? (
        <>
          <HomeHeader user={user} />
          <div className="px-6 py-4 border-b border-gray-300">
            <ResturantInfo />
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
