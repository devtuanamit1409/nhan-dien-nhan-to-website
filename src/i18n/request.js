import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Đảm bảo `locale` hợp lệ
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;

    return { locale, messages };
  } catch (error) {
    console.error("Error loading messages:", error);
    return { locale, messages: {} }; // Trả về messages rỗng nếu lỗi
  }
});
