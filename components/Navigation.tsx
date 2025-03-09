import Link from "next/link";
import { GiFoodTruck } from "react-icons/gi";

const Navigation = () => {
  return (
    <div className="flex justify-end items-center md:mr-8 mr-0 md:mt-0 mt-4 relative">
      <div id="logo" className="absolute top-[-1rem] z-1 left-2 text-white">
        <GiFoodTruck size={60} />
      </div>
      <div className="flex gap-8">
        <Link href="/login" className="cursor-pointer">
          Login
        </Link>
        <Link href="/register" className="cursor-pointer">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
