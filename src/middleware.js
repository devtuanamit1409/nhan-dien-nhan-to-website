import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const middleware = createMiddleware({
  ...routing,
  defaultLocale: "en",
});

export default function handler(req) {
  const { pathname } = req.nextUrl;

  // Kiểm tra nếu người dùng truy cập vào root URL `/`
  if (pathname === "/") {
    // Tạo URL mới để chuyển hướng đến `/en`
    const url = new URL(`/en`, req.nextUrl.origin);

    // Cập nhật cookie `NEXT_LOCALE` thành `en`
    const response = NextResponse.redirect(url);
    response.cookies.set("NEXT_LOCALE", "en", { path: "/" });
    return response;
  }

  // Tiếp tục xử lý cho các đường dẫn khác
  return middleware(req);
}

export const config = {
  matcher: ["/", "/(vi|en)/:path*"],
};
