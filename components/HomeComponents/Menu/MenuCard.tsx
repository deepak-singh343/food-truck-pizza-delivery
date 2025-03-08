import React from "react";
import FoodTile from "./FoodTile";

const MenuCard = ({ category }: any) => {
  return (
    <div className="flex flex-col gap-6 px-4 bg-gray-100">
      <div className="font-semibold text-[1.5rem]">{category.category}</div>
      {category.data.map((item: any, index: Number) => {
        return <FoodTile item={item} key={index} />;
      })}
    </div>
  );
};

export default MenuCard;
