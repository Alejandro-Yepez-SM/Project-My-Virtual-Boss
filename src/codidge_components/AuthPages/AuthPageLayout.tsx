"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import fullLogoImage from "@assets/Full_Brand_L_1766196510731.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const images = ["/login/login.jpg"];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        <div className="absolute top-20 left-20">
          <a href="/">
            <img
              src={fullLogoImage}
              alt="My Virtual Boss"
              className="w-auto h-20"
            />
          </a>
        </div>
        {children}
        <div className="items-center hidden w-full h-screen lg:w-3/5 lg:grid relative overflow-hidden">
          {/* Image stack */}
          {images.map((src, index) => (
            <img
              key={src}
              src={src}
              alt="login background"
              className={clsx(
                "absolute top-0 left-0 w-full h-full object-cover object-right transition-opacity duration-[2000ms] ease-in-out",
                {
                  "opacity-100 z-10": index === currentIndex,
                  "opacity-0 z-0": index !== currentIndex,
                }
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
