"use client";
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { isSeller, router, user, getToken } = useAppContext();
  const { openSignIn } = useClerk();
  const pathName = usePathname();

  const [organization, setOrganization] = useState("");
  const [sub, setSet] = useState();
  // console.log(user);
  // console.log(organization);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("Ram");
      const token = await getToken();

      const { data } = await axios.post(
        "/api/become-seller",
        { organization },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log(data);

      if (data.success) {
        toast.success(data.message);
        setOrganization("");
        window.location.reload();
      } else {
        toast.error(data.message);
        setOrganization("");
      }
    } catch (error) {
      toast.error(error.message);
      setOrganization("");
    }
  };
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          className="w-10 h-10 rounded-full"
          src={assets.logo}
          alt="logo"
        />
        <h1 className="font-bold text-blue-600 ">BookNest</h1>
      </div>
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link
          href="/"
          className={`hover:text-blue-500 transition text-pretty ${
            pathName === "/" && "text-blue-600"
          }`}
        >
          Home
        </Link>
        <Link
          href="/all-products"
          className={`hover:text-blue-500 transition text-pretty ${
            pathName === "/all-products" && "text-blue-600"
          }`}
        >
          Shop
        </Link>

        {isSeller ? (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        ) : (
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button
                  className="text-xs border px-4 py-1.5 rounded-full"
                  variant="outline"
                >
                  Become a Seller
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>To Become a Seller</DialogTitle>
                  <DialogDescription>You have to fill it</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Shop/Organization Name</Label>
                    <Input
                      id="name-1"
                      name="name"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Enter Here..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller ? (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        ) : (
          <button className="text-xs border px-4 py-1.5 rounded-full">
            Become a Seller
          </button>
        )}
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Home"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push("/")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Products"
                  labelIcon={<BoxIcon />}
                  onClick={() => router.push("/all-products")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
