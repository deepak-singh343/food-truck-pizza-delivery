import React from "react";
import { FiPhoneCall } from "react-icons/fi";
const ResturantInfo = () => {
  const getStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();

    const openHour = 11;
    const closeHour = 24;

    if (currentHour > openHour && currentHour < closeHour) {
      return "Open Now";
    }
    return "Currenlty Closed";
  };
  return (
    <div className=" flex flex-col gap-2">
      <div className="text-3xl font-bold">Food Truck Pizza</div>
      <div className="text-1xl font-medium text-gray-500">
        Pizza, Beverages, Desserts
      </div>
      <div className="flex gap-6">
        <div className="text-[0.8rem] flex justify-center gap-1 items-center font-extralight border border-gray-400 px-2 rounded-l-full rounded-r-full w-fit">
          <span className="text-red-300">{getStatus()}</span>{" "}
          <span className="text-gray-500"> - 11am - 12pm</span>
        </div>
        <div className="flex gap-1 items-center">
          <FiPhoneCall className="text-red-400" />
          <span className="text-[0.8rem] text-gray-500">+919582728781</span>
        </div>
      </div>
    </div>
  );
};

export default ResturantInfo;
