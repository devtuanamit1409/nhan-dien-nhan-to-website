"use server";
import React from "react";
import { ENDPOINT } from "../../enums/endpoint.enum";
import { apiService } from "../../services/api.service";

// Cấu hình truy vấn để lấy dữ liệu
const searchData = {
  populate: ["content"].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();

// Hàm để lấy dữ liệu từ API
async function fetchData(endpoint) {
  try {
    const data = await apiService.get(endpoint);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Component Footer để hiển thị thông tin từ API
const Footer = async () => {
  const data = await fetchData(`${ENDPOINT.GET_FOOTER}?${searchParams}`);
  const dataFooter = data?.data || [];

  return (
    <footer className="bg-blue-200 py-10" id="footer">
      <div className="container mx-auto px-4">
        {/* Bố cục lưới cho 4 cột trên màn hình lớn và 1 cột trên màn hình nhỏ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {dataFooter.map((section, index) => (
            <div
              key={index}
              className="bg-blue-400 p-5 rounded-md shadow-md text-white"
            >
              {/* Hiển thị tiêu đề chính và tiêu đề phụ */}
              <h2 className="text-lg font-bold mb-2">
                {section.attributes.titlePrimary}
              </h2>
              <h3 className="text-base font-semibold mb-4">
                {section.attributes.titleSecondary}
              </h3>

              {/* Render nội dung mô tả HTML */}
              <div
                className="text-sm space-y-2 text-white"
                dangerouslySetInnerHTML={{
                  __html: section.attributes.description,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
