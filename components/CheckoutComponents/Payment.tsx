"use client";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

interface totalAmount {
  amount: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment = ({ amount }: totalAmount) => {
  const route = useRouter();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("context not found");
  }
  const { setCartItems, setNotification } = context;
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      const res = await loadRazorpayScript();

      if (!res) {
        alert("Failed to load Razorpay script.");
        return;
      }
      const { data } = await axios.post("/api/create-order", { amount });
      console.log(data);
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: data.orderId.amount,
        currency: data.orderId.currency,
        order_id: data.orderId.id,
        name: "Food Truck Pizza",
        description: "Payment for Order",
        handler: function (response: any) {
          setCartItems([]);
          route.push("/home");
          setNotification({
            show: true,
            message: "Payment Successful",
            type: "success",
          });
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment failed:", error);
      setNotification({
        show: true,
        message: "Payment failed please try again",
        type: "error",
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md text-center h-fit">
      <h1 className="text-2xl font-bold mb-4">Make a Payment</h1>
      <p className="mb-2">Amount: ₹{amount}</p>
      <button
        onClick={handlePayment}
        className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-600"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
