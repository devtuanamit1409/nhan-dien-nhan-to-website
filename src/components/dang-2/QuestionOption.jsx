"use client";
import React, { useState } from "react";
import { ENDPOINT } from "../../enums/endpoint.enum";
import { Modal, Button, Input, message, Typography } from "antd";
import {
  CheckCircleTwoTone,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Link from "next/link";
const { Title, Text } = Typography;

const QuestionOption = ({ questionData, questionsMain }) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [resultType, setResultType] = useState(null);
  const optionLabels = ["A", "B", "C", "D", "E", "F", "G"];
  const token = process.env.NEXT_PUBLIC_TOKEN_DEV;

  const handleSelectOption = (questionId, optionId) => {
    setSelectedOption({ ...selectedOption, [questionId]: optionId });
  };

  const handleSubmit = async () => {
    const answers = Object.values(selectedOption);

    if (answers.length !== 4) {
      message.error("Vui lòng chọn đúng 4 đáp án.");
      return;
    }

    try {
      const response = await fetch(`${ENDPOINT.GET_ANSWERS_TYPE_2}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi gửi câu trả lời.");
      }

      const result = await response.json();
      if (result?.mbti) {
        localStorage.setItem("mbti", result.mbti);
        setIsInfoModalVisible(true);
        message.success("Đã nhận được kết quả MBTI!");
      } else {
        message.error("Không tìm thấy type cho câu trả lời.");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      message.error("Không thể gửi câu trả lời. Vui lòng thử lại sau.");
    }
  };

  const handleInfoSubmit = async () => {
    const mbti = localStorage.getItem("mbti");

    if (!mbti || !phone || !birthDate || !address) {
      message.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const formData = {
      data: {
        type: mbti,
        phone,
        birthDate,
        address,
      },
    };

    try {
      const response = await fetch(`${ENDPOINT.THONG_TIN_UNG_VIEN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok)
        throw new Error("Có lỗi xảy ra khi gửi dữ liệu ứng viên.");

      const result = await response.json();
      setResultType(result.data.attributes.type);
      setPhone("");
      setBirthDate("");
      setAddress("");
      setSelectedOption({});
      localStorage.removeItem("mbti");
      setIsInfoModalVisible(false);
      setIsResultModalVisible(true);
    } catch (error) {
      console.error(error);
      message.error("Không thể gửi thông tin ứng viên. Vui lòng thử lại sau.");
    }
  };

  const handleCancel = () => {
    setIsInfoModalVisible(false);
  };

  return (
    <div className="container mx-auto ">
      <div className="bg-white shadow-md rounded-lg p-4 mb-8 ">
        <h1 className="text-2xl font-semibold text-gray-800">
          {questionsMain}
        </h1>
      </div>

      {/* Nội dung câu hỏi */}
      {questionData.map((question) => (
        <div
          key={question.id}
          className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {question.attributes.question}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.attributes.options.map((option, index) => (
              <div
                key={option.id}
                onClick={() => handleSelectOption(question.id, option.type)}
                className={`border p-4 rounded-lg cursor-pointer transition duration-300 ${
                  selectedOption[question.id] === option.type
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-50 hover:bg-blue-50"
                }`}
              >
                <div
                  className="text-gray-800 text-base leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: option.label }}
                ></div>
                <div className="mt-2 flex items-center">
                  <input
                    type="radio"
                    id={`option-${option.id}`}
                    name={`question-${question.id}`}
                    value={option.type}
                    checked={selectedOption[question.id] === option.type}
                    onChange={() =>
                      handleSelectOption(question.id, option.type)
                    }
                    className="text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`option-${option.id}`}
                    className="ml-2 text-gray-600 font-semibold"
                  >
                    {optionLabels[index]}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className=" my-8">
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: "#52c41a",
            borderColor: "#52c41a",
            color: "#fff",
          }}
          onClick={handleSubmit}
        >
          Gửi câu trả lời
        </Button>
      </div>

      <Modal
        title="Nhập thông tin của bạn"
        open={isInfoModalVisible}
        onOk={handleInfoSubmit}
        onCancel={handleCancel}
        okText="Gửi"
        cancelText="Hủy"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
            onClick={handleInfoSubmit}
          >
            Gửi
          </Button>,
        ]}
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          borderRadius: "12px",
        }}
      >
        <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
          Vui lòng nhập thông tin để chúng tôi có thể đánh giá tốt hơn.
        </p>
        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <Input
            prefix={<PhoneOutlined style={{ color: "#52c41a" }} />}
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          />
          <Input
            prefix={<CalendarOutlined style={{ color: "#52c41a" }} />}
            placeholder="Ngày sinh (DD-MM-YYYY)"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          />
          <Input
            prefix={<HomeOutlined style={{ color: "#52c41a" }} />}
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          />
        </div>
      </Modal>

      {/* Modal kết quả */}
      <Modal
        title="Kết quả của bạn"
        open={isResultModalVisible}
        onOk={() => setIsResultModalVisible(false)}
        okText="Đóng"
        centered
        footer={[
          <Button
            key="close"
            onClick={() => setIsResultModalVisible(false)}
            style={{
              backgroundColor: "#52c41a",
              borderColor: "#52c41a",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Đóng
          </Button>,
        ]}
        bodyStyle={{
          padding: "30px",
          textAlign: "center",
          backgroundColor: "#f0f8ff",
          borderRadius: "12px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Title level={4} style={{ color: "#52c41a" }}>
            Type tính cách của bạn là: <strong>{resultType}</strong>
          </Title>
        </div>
        <p style={{ fontSize: "16px", color: "#333", marginBottom: "20px" }}>
          Khám phá thêm về tính cách của bạn và tìm hiểu thêm các thông tin hữu
          ích.
        </p>
        <Link href={`/${resultType?.toLowerCase()}`} passHref>
          <Button
            type="link"
            style={{
              fontSize: "16px",
              color: "#1890ff",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Xem chi tiết tính cách của bạn tại đây
          </Button>
        </Link>
      </Modal>
    </div>
  );
};

export default QuestionOption;
