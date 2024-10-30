import React, { useCallback, useEffect, useRef, useState } from "react";
import "../style/Home.scss";
import { useLayout } from "../hooks/Layout/LayoutContext";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingPage from "../component/LoadingPage";
import { apiRequest } from "../hooks/Api/Api";
export default function Home() {
  const { setLayout } = useLayout();
  const detailsRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0); // Lưu trạng thái của thẻ mở
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    setLayout("main");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      setIsloading(false);
    }, 500);

    // Mặc định mở summary 1 (Step 0)
    if (detailsRefs.current.length > 0) {
      detailsRefs.current[0].setAttribute("open", true);
      setActiveStep(0); // Đặt active step là 0
    }
  }, [setLayout]);

  const handleToggle = (index) => {
    setActiveStep(index); // Cập nhật trạng thái thẻ đang mở

    // Đóng tất cả các summary trừ cái hiện tại
    detailsRefs.current.forEach((details, i) => {
      if (i !== index) {
        details.removeAttribute("open");
      }
    });
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [designer, setDesigner] = useState();
  const fetchDesigner = useCallback(async () => {
    try {
      var res = await apiRequest("GET", `DesigneFE`);
      console.log(res);
      if (res && res.data && res.data.status === 200) {
        const list = res.data.data;
        setDesigner(list);
        setTimeout(() => {
          setIsloading(false);
        }, 500);
      }
      // setLoadingcomponent(false)
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      fetchDesigner();
    }, 100);
  }, [fetchDesigner]);

  return (
    <div className="home_page">
      <LoadingPage isloading={isloading} />
      <section className="sec1">
        <div className="b_content">
          <p className="title_1">Design Your Home with the Experts</p>
          <p className="title_2">Style Your House</p>
          <p className="title_3">Style Your Life</p>
          <Link className="link_tag" to={"/designer"}>
            <div className="b_btn">
              <p>Book Appointment Now</p>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </Link>
        </div>
      </section>
      <section className="sec2">
        <div className="b_sec2">
          <div className="b_1">
            <div className="b_1_container">
              <p>25</p>
              <p>Years in interior design</p>
            </div>
          </div>
          <div className="b_2">
            <p>About us</p>
            <p>Creative solutions by professional living spaces</p>
          </div>
          <div className="b_3">
            <p className="tilte">
              Discover how our team of professional designers at Decor Vista can
              transform your space with innovative, tailored solutions. Let us
              help you create your dream environment today!
            </p>
            <Link className="link_tag" to={"/product"}>
              <div className="b_btn">
                <p>Go to Product</p>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="sec3">
        <div className="sec3_container">
          <Slider {...settings}>
            <div className="b_slider_item">
              <div className="b_item">
                <div
                  className="item"
                  style={{
                    backgroundImage: `url(${require("../assets/images/livingroom/z5844676578908_ed1a97bab9fcc090dbf1e1b8e37b8655.jpg")})`,
                  }}
                >
                  <p className="title">Living room</p>
                  <Link className="link_tag" to={"/roomconcept/livingroom"}>
                    <p>Go to more</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="b_slider_item">
              <div className="b_item">
                <div
                  className="item"
                  style={{
                    backgroundImage: `url(${require("../assets/images/kitchen/z5844678841513_0e5efdb1df197f0c47eb4a4d8ae5889d.jpg")})`,
                  }}
                >
                  <p className="title">Kitchen</p>
                  <Link className="link_tag" to={"/roomconcept/kitchen"}>
                    <p>Go to more</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="b_slider_item">
              <div className="b_item">
                <div
                  className="item"
                  style={{
                    backgroundImage: `url(${require("../assets/images/bathroom/z5844677191978_578a51d879db1fd568d9e1d52fb1cd83.jpg")})`,
                  }}
                >
                  <p className="title">Bathroom</p>
                  <Link className="link_tag" to={"/roomconcept/bathroom"}>
                    <p>Go to more</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="b_slider_item">
              <div className="b_item">
                <div
                  className="item"
                  style={{
                    backgroundImage: `url(${require("../assets/images/bedroom/z5844680925705_47b448c48e30f5d14b16ef4bd46c8636.jpg")})`,
                  }}
                >
                  <p className="title">Bedroom</p>
                  <Link className="link_tag" to={"/roomconcept/bedroom"}>
                    <p>Go to more</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="b_slider_item">
              <div className="b_item">
                <div
                  className="item"
                  style={{
                    backgroundImage: `url(${require("../assets/images/office/z5844677831910_76ff09e504843adf145c9437aae22774.jpg")})`,
                  }}
                >
                  <p className="title">Offices</p>
                  <Link className="link_tag" to={"/roomconcept/office"}>
                    <p>Go to more</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="b_slider_item">
              <div className="b_item">
                <div
                  className="item"
                  style={{
                    backgroundImage: `url(${require("../assets/images/outdoor/z5844677422749_18459f033e5b01500f136da1a3432dd4.jpg")})`,
                  }}
                >
                  <p className="title">Outdoor Spaces</p>
                  <Link className="link_tag" to={"/roomconcept/outdoor"}>
                    <p>Go to more</p>
                  </Link>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>

      <section className="sec4">
        <div className="b_sec4">
          <div className="b_1_sec4">
            <p>Why us?</p>
            <p>
              With 25 years of experience, we connect you with top interior
              designers for professional results.
            </p>
          </div>
          <div className="b_2_sec4">
            <div className="item">
              <div className="b_img">
                <img alt="" src={require("../assets/images/icon/chinhhangwhite.png")} />
              </div>
              <p className="title">25 Years of Experience</p>
              <p className="discription">
                Over two decades in the industry, understanding customer needs
                for optimal products and services
              </p>
            </div>
            <div className="item">
              <div className="b_img">
                <img alt="" src={require("../assets/images/icon/thanthienwhite.png")} />
              </div>
              <p className="title">Designer Hub</p>
              <p className="discription">
                Connect easily with top, reputable interior designers,
                streamlining your design process.
              </p>
            </div>
            <div className="item">
              <div className="b_img">
                <img alt="" src={require("../assets/images/icon/sangtaowhite.png")} />
              </div>
              <p className="title">Quality Service</p>
              <p className="discription">
                Committed to professional consultation and design services for
                every client.
              </p>
            </div>
            <div className="item">
              <div className="b_img">
                <img alt="" src={require("../assets/images/icon/tuvanwhite.png")} />
              </div>
              <p className="title">Positive Reviews</p>
              <p className="discription">
                Numerous satisfied customer testimonials highlight our
                commitment to quality and satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec6">
        <div className="item">
          <div className="b_img">
            <img src={require("../assets/images/livingroom/z5844676588182_bf1ec8d5b85cccf981e706067602dc5e.jpg")} alt="" />
          </div>
        </div>
        <div className="b_content">
          <p className="note">How it works</p>
          <p className="title">
            Your journey on DecorVista is completely fast and effective{" "}
          </p>

          <div
            className={`list_step ${activeStep !== null ? "step_show" : ""}`}
          >
            {[...Array(4)].map((_, index) => (
              <details
                key={index}
                ref={(el) => (detailsRefs.current[index] = el)}
                className={`step_item ${activeStep === index ? "step_show" : ""
                  }`} // Thêm class `step_show` cho thẻ đang mở
              >
                <summary>
                  <div onClick={() => handleToggle(index)}>
                    <p>Step {index + 1}</p>
                    <p>Market & Advertise</p>
                  </div>
                </summary>
                <p className="discription">
                  Designs are promoted through targeted marketing strategies,
                  showcasing the unique value to attract potential clients and
                  generate interest.{" "}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="sec5">
        <div className="b_1_sec5">
          <div className="left">
            {designer && designer.length > 0 && (
              <div className="b_item">
                <div className="item">
                  <div className="b_img">
                    <img src="https://tinyurl.com/2774tvkx" alt="" />
                  </div>
                  <div className="info">
                    <p className="name">
                      {designer[0].first_name} {designer[0].last_name}
                    </p>
                    <p className="content">
                      Experience {designer[0].yearsofexperience} years
                    </p>
                  </div>
                </div>
              </div>
            )}
            {designer && designer.length > 1 && (
              <div className="b_item">
                <div className="item">
                  <div className="b_img">
                    <img src="https://tinyurl.com/2774tvkx" alt="" />
                  </div>
                  <div className="info">
                    <p className="name">
                      {designer[1].first_name} {designer[1].last_name}
                    </p>
                    <p className="content">
                      Experience {designer[1].yearsofexperience} years
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="right">
            {designer && designer.length > 2 && (
              <div className="b_item">
                <div className="item">
                  <div className="b_img">
                    <img src="https://tinyurl.com/2774tvkx" alt="" />
                  </div>
                  <div className="info">
                    <p className="name">
                      {designer[2].first_name} {designer[2].last_name}
                    </p>
                    <p className="content">
                      Experience {designer[2].yearsofexperience} years
                    </p>
                  </div>
                </div>
              </div>
            )}
            {designer && designer.length > 3 && (
              <div className="b_item">
                <div className="item">
                  <div className="b_img">
                    <img src="https://tinyurl.com/2774tvkx" alt="" />
                  </div>
                  <div className="info">
                    <p className="name">
                      {designer[3].first_name} {designer[3].last_name}
                    </p>
                    <p className="content">
                      Experience {designer[3].yearsofexperience} years
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="b_2_sec5">
          <p className="title">The designers have many years of experience</p>
          <p className="discription">
            Designers with many years of experience bring professionalism and
            exceptional creativity to their work. With a deep understanding of
            trends, techniques, and the latest technologies, they have the
            ability to turn ideas into high-quality, practical products. Over
            time, they have learned how to listen to client needs while offering
            optimal solutions that balance aesthetics and functionality. Their
            extensive experience also allows them to anticipate potential
            issues, minimizing risks and ensuring the best possible outcomes for
            each project. This expertise makes them invaluable in delivering
            successful and innovative designs.
          </p>
          <Link className="link_tag" to={"/designer"}>
            <div className="b_btn">
              <p>Meet Them Now</p>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
