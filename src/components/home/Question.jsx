"use client";
import React, { useState } from "react";
import {
  Card,
  Radio,
  Typography,
  Space,
  Button,
  Modal,
  Input,
  message,
} from "antd";
import {
  CheckCircleTwoTone,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { ENDPOINT } from "../../enums/endpoint.enum";
import Link from "next/link";
import { useTranslations } from "next-intl";

const { Title, Text } = Typography;

const Question = ({ question, button_send, error, locale }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [answers, setAnswers] = useState({});
  const [position, setPosition] = useState("");
  const [resultType, setResultType] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const token = process.env.NEXT_PUBLIC_TOKEN_DEV;
  const t = useTranslations("Questions");
  const error_5 = t("warning_submit");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    // Retrieve MBTI type from localStorage and ensure MBTI and fields are available
    const mbti = localStorage.getItem("mbti");
    const birthDatePattern = /^\d{2}-\d{2}-\d{4}$/;
    if (!mbti || !phone || !birthDate || !address || !position) {
      message.error(t("error_submit_5"));
      return;
    }
    if (!birthDatePattern.test(birthDate)) {
      message.error(t("error_submit_6"));
      return;
    }

    // Chuẩn bị dữ liệu theo cấu trúc `data: { ... }`
    const formData = {
      data: {
        type: mbti,
        phone,
        birthDate, // Trường này bây giờ là chuỗi văn bản nhập tay
        address,
        position,
      },
    };

    try {
      const response = await fetch(`${ENDPOINT.THONG_TIN_UNG_VIEN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData), // Gửi dữ liệu dưới dạng JSON với cấu trúc `data: { ... }`
      });

      if (!response.ok) {
        throw new Error(t("error_submit"));
      }

      const result = await response.json();
      message.success(t("success"));

      // Reset lại các trạng thái sau khi gửi thành công
      setResultType(result.data.attributes.type);
      setAnswers({});
      setPhone("");
      setBirthDate("");
      setAddress("");
      setPosition("");
      setResetKey(resetKey + 1);
      localStorage.removeItem("mbti");
      setIsModalVisible(false);
      setIsResultModalVisible(true);
    } catch (error) {
      console.error(error);
      message.error(t("error_submit_4"));
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    const allAnswered = question.every((section) =>
      section.attributes.questions.every(
        (item) => answers[item.id] !== undefined && answers[item.id] !== null
      )
    );
    console.log(answers);

    if (!allAnswered) {
      message.warning(error_5);
      return;
    }

    try {
      const response = await fetch(`${ENDPOINT.GET_ANSWERS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error(t("error_submit"));
      }

      const result = await response.json();
      if (result.mbti) {
        localStorage.setItem("mbti", result.mbti);
        showModal();
      } else {
        message.error(t("error_submit_2"));
      }
    } catch (error) {
      console.error(error);
      message.error(t("error_submit_3"));
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  return (
    <div className="container mx-auto py-8" key={resetKey}>
      {question.map((section, sectionIndex) => (
        <Card
          key={sectionIndex}
          title={
            <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
              <Title
                level={3}
                style={{
                  fontWeight: "bold",
                  background: "linear-gradient(90deg, #0066ff, #00ccff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "20px",
                }}
              >
                {section.attributes.part}. {section.attributes.description}
              </Title>
            </div>
          }
          bordered={false}
          style={{
            margin: "0 auto",
            marginBottom: "30px",
            backgroundColor: "#f0f8ff",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease",
          }}
          hoverable
        >
          <Space direction="vertical" size="large">
            {section.attributes.questions.map((item, key) => (
              <div key={item.id} style={{ marginBottom: "20px" }}>
                <Title
                  level={5}
                  style={{
                    fontWeight: "600",
                    color: "#1A1A1A",
                    marginBottom: "15px",
                  }}
                >
                  <CheckCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ marginRight: "8px" }}
                  />
                  {item.question}
                </Title>
                <Radio.Group
                  onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                >
                  <div
                    className={`grid gap-4 grid-cols-1 ${
                      item.columns === 2
                        ? "md:grid-cols-2"
                        : item.columns === 3
                        ? "md:grid-cols-3"
                        : item.columns === 4
                        ? "md:grid-cols-4"
                        : "md:grid-cols-1"
                    }`}
                  >
                    {item?.options?.map((option) => (
                      <div key={option.id} className="col-span-1">
                        <Radio
                          value={option.type}
                          style={{
                            padding: "8px",
                            backgroundColor: "#fefefe",
                            borderRadius: "8px",
                            transition: "background-color 0.3s",
                            width: "100%",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#e6f7ff")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#fefefe")
                          }
                        >
                          <Text style={{ fontSize: "16px", color: "#333" }}>
                            {option.label}
                          </Text>
                        </Radio>
                      </div>
                    ))}
                  </div>
                </Radio.Group>
              </div>
            ))}
          </Space>
        </Card>
      ))}

      <div className=" mt-8">
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
          {button_send}
        </Button>
      </div>

      <Modal
        title={t("fill_name")}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("send")}
        cancelText={t("cancle")}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("cancle")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
            onClick={handleOk}
          >
            {t("send")}
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
          {t("content_modal")}
        </p>
        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <Input
            prefix={<PhoneOutlined style={{ color: "#52c41a" }} />}
            placeholder={t("phone")}
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
            placeholder={t("birth")}
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
            placeholder={t("address")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          />
          <Input
            prefix={<SolutionOutlined style={{ color: "#52c41a" }} />}
            placeholder={t("position")}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          />
        </div>
      </Modal>

      <Modal
        title={t("result")}
        open={isResultModalVisible}
        onOk={() => setIsResultModalVisible(false)}
        okText={t("close")}
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
            {t("close")}
          </Button>,
        ]}
        style={{
          padding: "30px",
          textAlign: "center",
          backgroundColor: "#f0f8ff",
          borderRadius: "12px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Title level={4} style={{ color: "#52c41a" }}>
            {t("resultType")} <strong>{resultType}</strong>
          </Title>
        </div>
        <p style={{ fontSize: "16px", color: "#333", marginBottom: "20px" }}>
          {t("content_detail")}
        </p>
        <Link href={`/${locale}/${resultType?.toLowerCase()}`} passHref>
          <Button
            type="link"
            style={{
              fontSize: "16px",
              color: "#1890ff",
              fontWeight: "bold",
              textDecoration: "underline",
              textAlign: "center",
            }}
          >
            {t("detail_type")}
          </Button>
        </Link>
      </Modal>
    </div>
  );
};

export default Question;
