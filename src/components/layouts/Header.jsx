"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileLanguageSwitcher from "./MobileLanguageSwitcher";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const Header = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Header"); // Sử dụng key "Header" để lấy các bản dịch từ JSON
  const currentLocale = useLocale(); // Lấy ngôn ngữ hiện tại

  // Sử dụng bản dịch từ JSON cho menuItems
  const menuItems = [
    { title: t("trac_nghiem_nhanh"), link: "/" },
    { title: t("trac_nghiem_50_cau"), link: "/50-question-test" },
    { title: t("nhom_tinh_cach"), link: "#footer" },
    { title: t("lien_he"), link: "/contact" },
  ];

  return (
    <div className="bg-gray-100 py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
        {/* Logo */}
        <Link href={`/${currentLocale}`} locale={currentLocale}>
          <Image
            src={locale === "vi" ? "/logo.png" : "/logo-en.png"}
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
              href={`/${currentLocale}${item.link}`} // Đảm bảo đường dẫn theo locale
              locale={currentLocale} // Đặt locale cho từng link
              className="text-gray-700 hover:text-blue-500 font-medium text-lg"
            >
              {item.title}
            </Link>
          ))}
          <LanguageSwitcher />
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
            <Link
              key={item.title}
              href={`/${currentLocale}${item.link}`} // Đảm bảo đường dẫn theo locale
              locale={currentLocale} // Đặt locale cho từng link
              className="text-gray-700 hover:text-blue-500 font-medium text-lg"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <div className="mt-8">
            <MobileLanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Overlay khi sidebar mở */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Header;
