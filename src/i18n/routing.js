import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["vi", "en"], // Các ngôn ngữ được hỗ trợ
  defaultLocale: "vi", // Ngôn ngữ mặc định
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
