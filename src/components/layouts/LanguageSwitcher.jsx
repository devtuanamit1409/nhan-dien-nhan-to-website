"use client";
import React, { useState } from "react";
import { Menu, Dropdown, Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState(locale.toUpperCase());

  const generateLocaleLink = (newLocale) => {
    return `/${newLocale}${
      pathname.startsWith("/en") || pathname.startsWith("/vi")
        ? pathname.slice(3)
        : pathname
    }`;
    z;
  };

  const menu = (
    <Menu>
      <Menu.Item key="vi">
        <a href={generateLocaleLink("vi")} locale="vi" passHref>
          <span onClick={() => setCurrentLang("VI")}>Tiếng Việt</span>
        </a>
      </Menu.Item>
      <Menu.Item key="en">
        <a href={generateLocaleLink("en")} locale="en" passHref>
          <span onClick={() => setCurrentLang("EN")}>English</span>
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        placement="bottom"
        className="hidden laptop:flex"
      >
        <Space className="text-[#3B559E] max-h-[40px] my-auto font-medium px-4 rounded flex items-center cursor-pointer">
          <span>{currentLang}</span>
          <GlobalOutlined />
        </Space>
      </Dropdown>
    </>
  );
};

export default LanguageSwitcher;
