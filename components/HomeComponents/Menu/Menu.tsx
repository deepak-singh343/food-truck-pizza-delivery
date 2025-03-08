import { mockData } from "@/utils/mockData";
import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";

const Menu = () => {
  return (
    <div className="flex px-6 my-8 flex-1 w-full">
      {/* <div className="md:flex hidden flex-col pr-18 gap-4 text-gray-500 border-r border-gray-400">
        {mockData.map((category) => {
          return (
            <div key={category.category}>
              {category.category} ({category.data.length})
            </div>
          );
        })}
      </div> */}
      <div className="flex flex-col gap-8 w-full">
        {mockData.map((category) => {
          return <MenuCard category={category} key={category.category} />;
        })}
      </div>
    </div>
  );
};

export default Menu;
