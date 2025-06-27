import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { router, user } = useAppContext();

  const [orgName, setOrgName] = useState("");

  useEffect(() => {
    if (user?.publicMetadata?.role !== "seller") {
      router.push("/");
    } else {
      setOrgName(user?.publicMetadata?.organization);
    }
  }, [user]);

  return (
    <div className="flex items-center px-4 md:px-8 py-3 justify-between border-b">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          className="w-10 h-10 rounded-full"
          src={assets.logo}
          alt="logo"
        />
        <h1 className="font-bold text-blue-600">BookNest</h1>
      </div>

      <h2>
        Welcome back <span className="text-blue-600 font-bold">{orgName}</span>
      </h2>
    </div>
  );
};

export default Navbar;
