import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppContext } from "@/context/AppContext";

const HeaderSlider = () => {

  const {router} = useAppContext();
  
  const sliderImageData = [
    {
      imgSrc: assets.book1,
    },
    {
      imgSrc: assets.book2,
    },
    {
      imgSrc: assets.book3,
    },
    {
      imgSrc: assets.book4,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImageData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderImageData.length]);

  return (
    <div className="overflow-hidden relative w-full">
      <div>
        <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full">
          <div className="md:pl-8 mt-10 md:mt-0">
            <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
              Unlock New Worlds – Discover Your Next Great Read!
            </h1>
            <div className="flex items-center mt-4 md:mt-6 ">
              <button className="md:px-10 px-7 md:py-2.5 py-2 bg-blue-600 rounded-full text-white font-medium" onClick={()=>router.push("/all-products")}>
                Shop Now
              </button>
              <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                Browse Collection
                <Image
                  className="group-hover:translate-x-1 transition"
                  src={assets.arrow_icon}
                  alt="arrow_icon"
                />
              </button>
            </div>
          </div>
          <div className="flex items-center flex-1 justify-center">
            <Carousel className="w-full max-w-xs">
              <CarouselContent
                className="transition-transform duration-700"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {sliderImageData.map((img, index) => (
                  <CarouselItem key={index}>
                    <Image
                      className="md:w-72 w-48"
                      src={img.imgSrc}
                      alt={`Slide ${index + 1}`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default HeaderSlider;
