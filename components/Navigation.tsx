import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex justify-end md:mr-8 mr-0 relative">
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
