import React from "react";
import Image from "next/image";

const BannerComponent = ({ imageUrl, title }) => {
  // Base URL and complete image URL
  const baseURL = process.env.NEXT_PUBLIC_URL_BE
    ? `${process.env.NEXT_PUBLIC_URL_BE}`
    : "";

  const completeImageUrl = imageUrl
    ? `${baseURL}${imageUrl}`
    : "/path/to/default-image.jpg";

  return (
    <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 bg-gray-100 rounded-md shadow-md overflow-hidden">
      <Image
        src={completeImageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        quality={75}
        className="rounded-md"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default BannerComponent;
