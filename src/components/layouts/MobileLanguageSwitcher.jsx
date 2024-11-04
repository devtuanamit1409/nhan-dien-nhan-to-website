"use client";
import React, { useState } from "react";
import { Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const MobileLanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState(locale.toUpperCase());
  const t = useTranslations("HomePage");
  const generateLocaleLink = (newLocale) => {
    return `/${newLocale}${
      pathname.startsWith("/en") || pathname.startsWith("/vi")
        ? pathname.slice(3)
        : pathname
    }`;
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <span className="text-gray-800 font-medium mb-2">{t("lang")}</span>
      <div className="flex space-x-2">
        <a href={generateLocaleLink("vi")}>
          <Button
            type={currentLang === "VI" ? "primary" : "default"}
            icon={<GlobalOutlined />}
            onClick={() => setCurrentLang("VI")}
          >
            VI
          </Button>
        </a>
        <a href={generateLocaleLink("en")}>
          <Button
            type={currentLang === "EN" ? "primary" : "default"}
            icon={<GlobalOutlined />}
            onClick={() => setCurrentLang("EN")}
          >
            EN
          </Button>
        </a>
      </div>
    </div>
  );
};

export default MobileLanguageSwitcher;
