"use server";
import React from "react";
import BoxContentRight from "../../components/home/BoxContentRight";
import { ENDPOINT } from "../../enums/endpoint.enum";
import { apiService } from "../../services/api.service";

const searchData = {
  populate: ["seo.thumbnail"].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();

async function fetchData(endpoint) {
  try {
    const data = await apiService.get(endpoint);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const dataHome = await fetchData(
    `${ENDPOINT.GET_TINH_CACH}?filters[slug][$eq]=${slug}&${searchParams}`
  );

  const seo =
    (dataHome &&
      dataHome.data[0] &&
      dataHome.data[0].attributes &&
      dataHome.data[0].attributes.seo) ||
    {};

  const baseUrl = process.env.NEXT_PUBLIC_URL_BE || "";

  return {
    metadataBase: new URL(baseUrl),
    title: seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
    description:
      seo.description ||
      "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
    keywords:
      seo.keywords ||
      "kỹ thuật, công trình, tư vấn cơ điện, xử lý nước, tái sử dụng nước",
    authors: [{ name: seo.author || "Công ty TNHH Kỹ thuật NTS" }],
    openGraph: {
      title:
        seo.ogTitle || seo.title || "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.ogDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      url: `${baseUrl}/home`,
      images: [
        {
          url: seo.thumbnail?.data?.attributes?.url
            ? `${baseUrl}${seo.thumbnail.data.attributes.url}`
            : "/path/to/default-image.jpg",
          width: 800,
          height: 600,
          alt: "Image description",
        },
      ],
    },
    twitter: {
      title:
        seo.twitterTitle ||
        seo.title ||
        "Trang chủ - Công ty TNHH Kỹ thuật NTS",
      description:
        seo.twitterDescription ||
        seo.description ||
        "Công ty TNHH Kỹ thuật NTS cung cấp các giải pháp kỹ thuật công trình hàng đầu.",
      images: [
        seo.twitterImage
          ? `${baseUrl}${seo.twitterImage}`
          : "/path/to/default-image.jpg",
      ],
      card: "summary_large_image",
    },
  };
}

const Page = async ({ params }) => {
  const { slug } = params;
  const tinhCachData = await fetchData(`${ENDPOINT.GET_TINH_CACH}`);
  const list_tinh_cach = tinhCachData ? tinhCachData.data : [];

  const detail_tinh_cach = await fetchData(
    `${ENDPOINT.GET_TINH_CACH}?filters[slug][$eq]=${slug}&${searchParams}`
  );
  const data_detail = detail_tinh_cach ? detail_tinh_cach.data[0] : null;

  if (!data_detail) {
    return (
      <main className="container mx-auto px-4 md:px-0 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Không tìm thấy dữ liệu cho slug đã chọn!
        </h1>
      </main>
    );
  }

  const { type, type_tieng_viet, describe, content } = data_detail.attributes;

  return (
    <>
      <main className="container mx-auto px-4 md:px-0 py-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
              <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
                {type}
              </h1>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                {type_tieng_viet}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {describe}
              </p>

              <div
                className="prose lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4">
            <BoxContentRight list_tinh_cach={list_tinh_cach} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
