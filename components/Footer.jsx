import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          {/* <Image
            className="w-20 h-20 rounded-full"
            src={assets.logo}
            alt="logo"
          /> */}

          <div className="flex items-center gap-2">
                  <Image
            className="w-20 h-20 rounded-full"
            src={assets.logo}
            alt="logo"
          />
                  <h1 className="font-bold text-blue-600 text-xl">BookNest</h1>
                </div>
          <p className="mt-6 text-sm">
            BookNest is your one-stop online bookstore, offering a wide
            collection of novels, academic books, and bestsellers. Whether
            you're a casual reader or a dedicated learner, we help you discover
            your next great read.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+917870375975</p>
              <p>rks829421@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © Ravi Shankar Kumar All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
