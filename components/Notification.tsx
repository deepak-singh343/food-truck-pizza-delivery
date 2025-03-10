"use client";
import { AppContext } from "@/context/AppContext";
import React, { useContext, useEffect } from "react";

interface Props {
  notification: {
    show: boolean;
    message: string;
    type: string;
  };
}

const Notification = ({ notification }: Props) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context not found");
  }
  const { setNotification } = context;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setNotification({
        show: false,
        message: "",
        type: "",
      });
    }, 5000);

    return () => clearTimeout(timer); // Cleanup function to clear timeout on unmount
  }, []);
  return (
    <div
      className={`px-8 md:py-4 py-2 w-[70%] md:w-fit z-2 rounded absolute top-4 left-1/2 transform -translate-x-1/2 text-white ${
        notification.type == "success" ? "bg-green-300" : "bg-red-400 "
      }`}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
