"use server";
import React from "react";
import BoxContent from "../../components/home/BoxContent";
import Question from "../../components/home/Question";
import BoxContentRight from "../../components/home/BoxContentRight";
import { ENDPOINT } from "../../enums/endpoint.enum";
import { apiService } from "../../services/api.service";

// Cấu trúc dữ liệu tìm kiếm
const searchData = {
  populate: ["seo.thumbnail"].toString(),
};
const searchDataQuestion = {
  populate: ["questions", "questions.options"].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();
const searchParamsQuestion = new URLSearchParams(searchDataQuestion).toString();

// Hàm server-side để gọi API
async function fetchData(endpoint) {
  try {
    const data = await apiService.get(endpoint);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function generateMetadata() {
  const dataHome = await fetchData(`${ENDPOINT.GET_HOME}?${searchParams}`);

  const seo =
    (dataHome &&
      dataHome.data &&
      dataHome.data.attributes &&
      dataHome.data.attributes.seo) ||
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

// Component server-side
const Home = async () => {
  // Gọi dữ liệu từ API
  const section_50 = await fetchData(
    `${ENDPOINT.GET_50_QUESTIONS}?${searchParamsQuestion}`
  );
  const homeData = await fetchData(`${ENDPOINT.GET_HOME}`);

  const tinhCachData = await fetchData(`${ENDPOINT.GET_TINH_CACH}`);

  // Kiểm tra nếu `section_50` là null hoặc không chứa dữ liệu
  const list_50_question = section_50?.data || [];
  const content = homeData.data.attributes.content || "";
  const list_tinh_cach = tinhCachData.data;

  return (
    <main>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
        <div>
          <BoxContent content={content} />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8">
              <Question question={list_50_question} />
            </div>
            <div className="col-span-12 md:col-span-4">
              <BoxContentRight list_tinh_cach={list_tinh_cach} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
