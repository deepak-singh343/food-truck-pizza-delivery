"use client";
import Image from "next/image";
import React, { useState } from "react";
import Ratings from "./Ratings";

const FoodTile = ({ item }: any) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 60;

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <div className="flex justify-between bg-white py-2 px-2 rounded">
        <div className="flex gap-4">
          <div className="w-45 h-45 rounded overflow-hidden relative">
            <Image
              src={item.imageUrl}
              alt="food"
              width={200}
              height={200}
              className="w-full h-full object-fit"
            />
            <div
              className={`absolute border rounded-[2px] ${
                item.type == "veg" ? "border-green-300" : "border-red-400"
              } bg-white top-1.5 right-1.5 w-2.5 h-2.5 flex justify-center items-center`}
            >
              {item.type == "veg" ? (
                <div className="w-1 h-1 bg-green-600 rounded-full"></div>
              ) : (
                <div className="w-1 h-1 bg-red-600 rounded-full"></div>
              )}
            </div>
          </div>
          <div className="w-[60%] text-sm flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-[1.3rem]">{item.name}</span>
              <Ratings rating={item.rating} />
              <span>&#8377;{item.price}</span>
            </div>
            {expanded ? (
              <div className="text-[rgb(79,79,79)] font-extralight">
                {item.description}
              </div>
            ) : (
              <div className="text-[rgb(79,79,79)] font-extralight">
                {item.description.slice(0, maxLength)}...
                <span
                  className="font-semibold cursor-pointer ml-1"
                  onClick={toggleReadMore}
                >
                  Read More
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center mr-2">
          <button className="rounded text-red-500 font-semibold px-4 py-1 flex justify-center items-center border border-red-500">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodTile;
