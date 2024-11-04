import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_URL_BE,
    DEV_TOKEN: process.env.NEXT_PUBLIC_TOKEN_DEV,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "http://208.113.133.157",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
