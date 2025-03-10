import { mockData } from "@/utils/mockData";
import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";

const Menu = () => {
  return (
    <div className="flex md:px-6 px-3 my-8 flex-1 w-full">
      <div className="flex flex-col gap-8 w-full">
        {mockData.map((category) => {
          return <MenuCard category={category} key={category.category} />;
        })}
      </div>
    </div>
  );
};

export default Menu;
