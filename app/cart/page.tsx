"use client";
import Cart from "@/components/Cart";
import HomeHeader from "@/components/HomeComponents/HomeHeader";
import { getUserData } from "@/utils/helper";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
interface User {
  name: string;
  email: string;
}
const page = () => {
  const route = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    route.push("/login");
  };
  const getData = async () => {
    try {
      const res = await getUserData();
      if (res?.status == 401) {
        handleLogout();
      } else {
        if (res?.data) {
          setUser(res.data.data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  useEffect(() => {
    getData();
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

export default page;
