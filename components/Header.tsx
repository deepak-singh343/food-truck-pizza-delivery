import React from "react";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <div
      className="flex flex-col text-white w-full h-screen md:p-8 p-4
    bg-[url('/banner.jpg')]
    bg-cover md:bg-[url(https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png)]"
    >
      <Navigation />
      <div className="text-center w-full flex items-center justify-center pb-30 flex-col gap-6 flex-1">
        <h1 className="md:text-7xl text-5xl font-extrabold">Food Truck</h1>
        <h3 className="text-3xl font-bold">
          Discover the best food & drinks here
        </h3>
      </div>
    </div>
  );
};

export default Header;
