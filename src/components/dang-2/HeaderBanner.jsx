import React from "react";

const BannerComponent = ({ title }) => {
  return (
    <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 bg-blue-700 rounded-md shadow-md overflow-hidden">
      {/* Overlay với độ trong suốt nhẹ hơn */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight drop-shadow-lg">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default BannerComponent;
