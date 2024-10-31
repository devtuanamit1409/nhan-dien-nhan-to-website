"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons"; // Sử dụng icon từ Ant Design cho nút hamburger và nút close
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Quản lý trạng thái sidebar
  const menuItems = [
    { title: "Bài Trắc Nghiệm 50 Câu", link: "/bai-trac-nghiem-50-cau" },
    { title: "Bài Trắc Nghiệm MBTI", link: "/bai-trac-nghiem-mbti" },
    { title: "8 Đặc Điểm Tính Cách", link: "#footer" },
    { title: "Liên Hệ", link: "/lien-he" },
  ];

  return (
    <div className="bg-gray-100 py-4 shadow-lg  sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={300}
            height={300}
            className="w-[200px] md:w-[300px]"
          />
        </Link>

        {/* Nút Hamburger cho Mobile */}
        <div className="block lg:hidden">
          {isOpen ? (
            <CloseOutlined
              className="text-3xl text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <MenuOutlined
              className="text-3xl text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>

        {/* Menu cho màn hình lớn */}
        <div className="hidden lg:flex space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="text-gray-700 hover:text-blue-500 font-medium text-lg"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Sidebar cho mobile */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col mt-16 space-y-6 pl-6">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.link}
              className="text-gray-700 hover:text-blue-500 font-medium text-lg"
              onClick={() => setIsOpen(false)} // Đóng sidebar sau khi chọn
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>

      {/* Overlay khi sidebar mở */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)} // Đóng sidebar khi nhấn vào overlay
        ></div>
      )}
    </div>
  );
};

export default Header;
