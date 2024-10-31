"use server";
import React from "react";
import { ENDPOINT } from "../../enums/endpoint.enum";
import { apiService } from "../../services/api.service";
import QuestionOption from "../../components/dang-2/QuestionOption";
import HeaderBanner from "../../components/dang-2/HeaderBanner";
import BoxContentRight from "../../components/home/BoxContentRight";

const searchData = {
  populate: ["seo.thumbnail", "backgroundImage"].toString(),
};
const searchDataQuestion = {
  populate: ["options"].toString(),
};

const searchParams = new URLSearchParams(searchData).toString();
const searchParamsQuestion = new URLSearchParams(searchDataQuestion).toString();

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
  const dataHome = await fetchData(
    `${ENDPOINT.GET_PAGE_DANG_2}?${searchParams}`
  );

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

const page = async () => {
  const data = await fetchData(
    `${ENDPOINT.GET_CAU_HOI_DANG_2}?${searchParamsQuestion}`
  );
  const dataPage = await fetchData(
    `${ENDPOINT.GET_PAGE_DANG_2}?${searchParams}`
  );
  const questionData = data.data || [];
  const dataPageMain = dataPage.data || "";
  const tinhCachData = await fetchData(`${ENDPOINT.GET_TINH_CACH}`);
  const list_tinh_cach = tinhCachData.data;
  return (
    <>
      <HeaderBanner
        title={dataPageMain.attributes.title || ""}
        imageUrl={
          dataPageMain.attributes.backgroundImage.data.attributes.url || ""
        }
      />

      <div className="container mx-auto px-4 md:px-0">
        <div
          className="text-lg md:text-xl w-full"
          dangerouslySetInnerHTML={{ __html: dataPageMain.attributes.content }}
        ></div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <QuestionOption
              questionData={questionData}
              questionsMain={dataPageMain.attributes.questionsMain}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <BoxContentRight list_tinh_cach={list_tinh_cach} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
