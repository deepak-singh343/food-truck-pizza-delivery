"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "@/context/AppContext";

interface User {
  name: string;
  email: string;
  address?: string;
}

interface UserInfoProps {
  user: User;
  heading: string;
}

const UserInfo = ({ user, heading }: UserInfoProps) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("context not found");
  }
  const { setNotification } = context;
  const [formData, setFormData] = useState<User>({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put("/api/edit-profile", formData);
      setNotification({
        show: true,
        message: "Logged in successfully",
        type: "success",
      });
      setNotification({
        show: true,
        message: "User details updated successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to update user:", error);
      setNotification({
        show: true,
        message: "There is some error" + error,
        type: "error",
      });
    }
  };

  return (
    <div className="md:px-8 px-4 py-4 bg-white md:w-[75%] w-full">
      <h1 className="text-4xl mb-4">{heading}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded font-semibold hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
