import { useLayout } from "../hooks/Layout/LayoutContext";
import React, { useState, useEffect, useRef } from "react";
import { Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import StarRate from "../component/StarRate";
export default function ReviewBooking() {
  const location = useLocation();
  const [cookies] = useCookies();
  const user = jwtDecode(cookies.autherize);

  const [form] = Form.useForm(); // Create form instance
  //lay tu  route?id=giatriId
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const { setLayout } = useLayout();

  useEffect(() => {
    setLayout("auth");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [setLayout]);
  const quillRef = useRef();
  const [content, setContent] = useState("");
  const handleChangeDescription = (content, delta, source, editor) => {
    // Remove <p> tags around <img> elements
    const updatedContent = content.replace(/<p>(<img[^>]+>)<\/p>/g, "$1");
    setContent(updatedContent);
  };
  const toolbarOptions = [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
    // Thêm tùy chọn điều chỉnh font size
    [{ size: ["small", false, "large", "huge"] }],
  ];

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "color",
    "background",
    "align",
  ];
  const handleCreate = async (value) => {
    const formData = new FormData();
    if (value.FeedBackContent.startsWith("<p><br></p>")) {
      message.error("Input Feed Back!!");
      return;
    }

    console.log(value.FeedBackContent);
    try {
      formData.append("user_id", user.id);
      formData.append("comment", value.FeedBackContent);
      formData.append("id_booking", 2);
      formData.append("score", star);
      const response = await axios.post(
        "https://localhost:7229/api/Review/SendFeedBackConsultation",
        formData
      );
    } catch (error) {
      message.error("Error Form : " + error);
      return;
    }

    try {
      //   const response = await axios.post(APILink() + "Question", formData, {});
      if (window.confirm("Send Success.Back To List")) {
      }
    } catch (error) {
      message.error("Create Error: " + error.response.data.message);
    } finally {
    }
  };

  const [star, setStar] = useState(5);
  const handleRateStar = (value) => {
    console.log(value);
    setStar(value);
  };
  return (
    <>
      <div className="container my-5" style={{ height: "auto", width: "70%" }}>
        <h1 className="mb-4">Feed Back Booking.</h1>
        <StarRate
          handleRateStar={(value) => handleRateStar(value)}
          initialRating={star || 5}
        />
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            name="FeedBackContent"
            rules={[{ required: true, message: "Please input Feed Back!" }]}
          >
            <ReactQuill
              ref={quillRef}
              modules={{
                toolbar: toolbarOptions,
              }}
              formats={formats}
              value={content}
              onChange={handleChangeDescription}
              style={{ width: "100%", background: "white", height: "50vh" }}
              className="description"
            />
          </Form.Item>
          <br />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
