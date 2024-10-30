import { useLayout } from "../hooks/Layout/LayoutContext";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Form, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import StarRate from "../component/StarRate";
import { apiRequest } from "../hooks/Api/Api";



export default function ReviewBooking() {
  const location = useLocation();
  const [cookies] = useCookies();
  const user = jwtDecode(cookies.autherize);
  const { id } = useParams()
  const [form] = Form.useForm(); // Create form instance
  const navigate = useNavigate();
  const { setLayout } = useLayout();

  useEffect(() => {
    setLayout("main");
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
    var idpro = 0;
    if (detailOrder && detailOrder.length > 0) {
      idpro = detailOrder[0].idProduct
    }
    console.log(value.FeedBackContent);
    try {
      formData.append("user_id", user.id);
      formData.append("comment", value.FeedBackContent);
      formData.append("product_id", idpro);
      formData.append("score", star);
      formData.append("orderId", id);
      const response = await axios.post(
        "https://localhost:7229/api/ReviewFE/SendFeedBackProduct",
        formData
      );
      navigate("/customer")
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






  const [detailOrder, setDetailOrder] = useState()
  const fetchOrderDetail = useCallback(async () => {
    try {
      var res = await apiRequest("Get", `OrderDetailFE/GetOrderDetailByOrderId/${id}`)

      console.log(res.data.data)
      if (res && res.data && res.data.status === 200) {
        setDetailOrder(res.data.data)
        // setTimeout(() => {
        //     setIsloading(false)
        // }, 500);
      }
    } catch (error) {
      console.log(error)
    }
  }, [id])

  useEffect(() => {
    setTimeout(async () => {
      fetchOrderDetail()
    }, 100);
  }, [fetchOrderDetail])


  useEffect(() => {
    console.log(detailOrder);
  }, [detailOrder]);








  return detailOrder && detailOrder.length > 0 && (
    <>
      <div className="container my-5" style={{ height: "auto", width: "70%", width: "100%", backgroundColor: "var(--cl_bg)", paddingTop: "6rem" }}>
        <div style={{ width: "50%", margin: "auto", padding: "3rem 0" }} >
          <h1 className="mb-4" style={{ color: "white", padding: "1rem 0", fontWeight: "700" }}>Feed Back Product.</h1>
          <StarRate
            style={{ padding: "1rem 0" }}
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
                style={{ width: "100%", background: "white", minHeight: "50vh", maxHeight: "50vh", border: "none" }}
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
      </div>
    </>
  );
}
