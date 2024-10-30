import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLayout } from "../hooks/Layout/LayoutContext";
import "../style/DesignerPortfolio.scss";
import { Link, useParams } from "react-router-dom";
import Infomation from "../component/Infomation";
import Slider from "react-slick";
import "../style/BlogItem.scss";
import Star from "../component/Star";
import BlogsItem from "../component/BlogsItem";
import { apiRequest } from "../hooks/Api/Api";
import LoadingPage from "../component/LoadingPage";
import GetImageFirebase from "../function/GetImageFirebase";
import { formatDateBlogDetail } from "../function/FormatDate";
export default function DesignerPortfolio() {
  const { setLayout } = useLayout();
  const [paddingTop, setPaddingTop] = useState(0);
  const [isloading, setIsloading] = useState(true);
  let sliderRef = useRef(null);

  useEffect(() => {
    setLayout("main");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const b1Element = document.querySelector(".b_1");
    if (b1Element) {
      const b1Height = b1Element.offsetHeight;
      const remValue = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const paddingValue = b1Height - 3 * remValue;
      setPaddingTop(paddingValue);
    }
  }, [setLayout]);

  const { id } = useParams();

  const [review, setReview] = useState();
  const [designer, setDesigner] = useState();
  const fetchDesigner = useCallback(async () => {
    try {
      var res = await apiRequest("GET", `DesigneFE/GetById/${id}`);
      console.log(res.data.data);
      if (res && res.data && res.data.status === 200) {
        if (res.data.data === null) {
          navigator("/");
        }
        setTimeout(() => {
          setIsloading(false);
        }, 500);
        const list = res.data.data;
        setDesigner(list);
      }
      // setLoadingcomponent(false)
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const fetchReviewDesigner = useCallback(async () => {
    try {
      var res = await apiRequest(
        "GET",
        `ReviewFE/GetFeedBackConsultation/${id}`
      );
      console.log(res.data.data);
      if (res && res.data && res.data.status === 200) {
        const list = res.data.data;
        setReview(list);
      }
      // setLoadingcomponent(false)
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    if (designer) {
      setTimeout(() => {
        fetchReviewDesigner();
      }, 300);
    }
  }, [fetchReviewDesigner, designer]);

  const [listCertificate, setListCertificate] = useState([]);
  const parserImage = useCallback(() => {
    var stringImg =
      designer && designer.certificate ? designer.certificate : null;
    if (stringImg != null) {
      const items = stringImg.split("; ").filter((item) => item.trim() !== "");
      var list = [];
      items.forEach((element) => {
        element = GetImageFirebase(element);
        list.push(element);
      });

      setListCertificate(list);
    }
  }, [designer]);

  const parserImageStory = useCallback((itemImg) => {
    let list = [];

    if (itemImg) {
      const items = itemImg.split("; ").filter((item) => item.trim() !== "");
      list = items.map((element) => GetImageFirebase(element));
    }
    const maxImagesToShow = 4;
    const extraImagesCount = list.length - maxImagesToShow;

    return (
      <>
        <div
          className={
            list.length === 1
              ? "b_1img"
              : list.length === 2
              ? "b_2img"
              : list.length === 3
              ? "b_3img"
              : list.length > 3
              ? "b_maximg"
              : "b_1img"
          }
        >
          {list.slice(0, maxImagesToShow).map((item, index) => (
            <div
              className="b_____img"
              onClick={() => {
                setListimgstoryCurrent(list);
                openModalStory(index);
              }}
            >
              <img key={index} alt="" src={item} />
              {index === maxImagesToShow - 1 && extraImagesCount > 0 && (
                <div className="overlay">+{extraImagesCount}</div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  }, []);

  //modal render img story
  const [listimgstoryCurrent, setListimgstoryCurrent] = useState();
  const [isModalOpenStory, setIsModalOpenStory] = useState(false);
  const [currentImageStory, setCurrentImageStory] = useState(null);
  const openModalStory = (image) => {
    setCurrentImageStory(image);
    setIsModalOpenStory(true);
  };

  const closeModalStory = () => {
    setIsModalOpenStory(false);
    setCurrentImageStory(null);
  };

  const prevModalStory = () => {
    if (currentImageStory > 0) {
      setCurrentImageStory((prev) => prev - 1);
    }
  };

  const nextModalStory = () => {
    if (currentImageStory < listimgstoryCurrent.length - 1) {
      setCurrentImageStory((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (designer) {
      parserImage();
    }
  }, [designer, parserImage]);

  useEffect(() => {
    setTimeout(async () => {
      fetchDesigner();
    }, 100);
  }, [fetchDesigner]);

  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: false,
    easing: "ease-in-out",
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    // fade: true,
    // easing: "ease-in-out",
  };

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = (text) => {
    if (text.length < 100) {
      return text;
    }
    return isExpanded ? text : text.slice(0, 100) + "...";
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  //modal render
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const openModal = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  const prevModal = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  const nextModal = () => {
    if (currentImage < listCertificate.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const maxImagesToShow = 9;
  const extraImagesCount = listCertificate.length - maxImagesToShow;
  return (
    designer && (
      <div className="designer_portfolio_page">
        <LoadingPage isloading={isloading} />
        <section className="sec1">
          <div className="b_content">
            <p className="title_1">Design for your home</p>
            <p className="title_2">
              Designer with experience in the furniture industry
            </p>
            <p className="title_3">Decor with Designer</p>
            <p className="btn_scroll">
              <i className="fa-solid fa-angles-down"></i>
            </p>
          </div>
        </section>
        <section className="sec2">
          <div className="b_sec">
            <div className="b_1">
              <div className="left">
                <div className="top">
                  <p className="name_web">DECOR VISTA</p>
                  <p>
                    Design is not just about creating beauty, but about solving
                    problems with limitless creativity.
                  </p>
                </div>
                <div className="bottom">
                  <div className="item">
                    <p>{designer.yearsofexperience}+</p>
                    <p>Experience</p>
                  </div>
                  <div className="item">
                    <p>{designer.count_booking}+</p>
                    <p>Booking</p>
                  </div>
                  <div className="item">
                    <p>{review && review.length}+</p>
                    <p>Reivew</p>
                  </div>
                  <div className="item">
                    <p>{designer.specialization}</p>
                    <p>Design style</p>
                  </div>
                  <div className="item">
                    <p>{designer.daywork}</p>
                    <p>Day Work</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <img alt="" src={require("../assets/images/main/tn.jpg")} />
              </div>
            </div>
            <div className="b_2" style={{ paddingTop: `${paddingTop}px` }}>
              <img alt="" src={GetImageFirebase(designer.avatar)} />
              <div className="content">
                <p className="title">DESIGNER</p>
                <p className="name_designer">
                  Hello, I'am{" "}
                  <span>
                    {designer.first_name} {designer.last_name}
                  </span>
                </p>
                <div className="b_contact">
                  <div className="contact_phone">
                    <p>Phone Number: </p>
                    <p>{designer.contact_number}</p>
                  </div>
                  <div className="contact_daywork">
                    <p className="title_daywork">Day work: </p>
                    <div className="list_day">
                      <p>{designer.daywork}</p>
                    </div>
                  </div>
                  <div className="button">
                    <Link
                      className="link_tag"
                      to={`/booking/designer/${designer.id}`}
                    >
                      {" "}
                      <p>Book appointment</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sec4">
          <div className="left">
            <p>Why choose me</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.{" "}
            </p>
          </div>
          <div className="right">
            <div className="b_item_">
              <img src={require("../assets/images/main/ht.jpg")} alt="" />
              <div className="content_">
                <p className="title_">Fast Building</p>
                <p className="discription">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type.
                </p>
              </div>
            </div>
            <div className="b_item_">
              <img src={require("../assets/images/main/ht.jpg")} alt="" />
              <div className="content_">
                <p className="title_">Fast Building</p>
                <p className="discription">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type.
                </p>
              </div>
            </div>
            <div className="b_item_">
              <img src={require("../assets/images/main/ht.jpg")} alt="" />
              <div className="content_">
                <p className="title_">Fast Building</p>
                <p className="discription">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type.
                </p>
              </div>
            </div>
            <div className="b_item_">
              <img src={require("../assets/images/main/ht.jpg")} alt="" />
              <div className="content_">
                <p className="title_">Fast Building</p>
                <p className="discription">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec8">
          <div className="left">
            <div className="f_1">
              <p className="title__">Degree</p>
              <Link className="link_tag">
                <p>See all</p>
              </Link>
            </div>

            <div className="list_img">
              {listCertificate.slice(0, maxImagesToShow).map((item, index) => (
                <div
                  className="box_img_certificate"
                  key={index}
                  onClick={() => openModal(index)}
                >
                  <img src={item} alt="" />
                  {index === maxImagesToShow - 1 && extraImagesCount > 0 && (
                    <div className="overlay">+{extraImagesCount}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="right">
            <div className="r_1">
              <p className="r_1_title">Article</p>
              <div className="r_1_filter">
                {/* <input type='date' />
              <input type='date' /> */}
              </div>
            </div>
            <div className="time_line">
              {designer && designer.stories && designer.stories.length > 0 ? (
                designer.stories.map((item, index) => (
                  <div className="item_story" key={index}>
                    <div className="info_item">
                      <img alt="" src={GetImageFirebase(designer.avatar)} />
                      <div className="name_date">
                        <p className="name">
                          {designer.first_name} {designer.last_name}
                        </p>
                        <p className="create_date">
                          {formatDateBlogDetail(item.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="b_content">
                      <div className="box_des">
                        <p className="content">
                          {displayText(item.content)}
                          {item.content && item.content.length > 100 && (
                            <span className="btn___" onClick={handleToggle}>
                              {isExpanded ? "Collapse" : "See more"}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="gallary_story">
                        {parserImageStory(item.image)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Not data</p>
              )}
            </div>
          </div>
        </section>
        <section className="sec3">
          <div className="b_sec3">
            <p className="title_portfolio_info">Portfolio Information</p>

            <div className="list_show">
              <Infomation item={designer.portfolio} />
            </div>
          </div>
        </section>
        {review && review.length > 0 && (
          <section className="sec7">
            <div className="sec7_container">
              <Slider {...settings}>
                {review.map((item, index) => (
                  <div key={index} className="b_review_item">
                    <div className="container_item">
                      <img
                        src={
                          item.avatar !== ""
                            ? GetImageFirebase(item.avatar)
                            : "https://tinyurl.com/2774tvkx"
                        }
                        alt=""
                      />
                      <div className="box_content">
                        <p className="name_user">
                          {item.first_name} {item.last_name}
                        </p>
                        <p className="date_create">
                          {formatDateBlogDetail(item.create_at)}
                        </p>
                        <p className="cmt">{item.comment}</p>
                        <div className="box_rare">
                          <Star number={item.score} key={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </section>
        )}

        <section className="sec5">
          <div className="b_sec5">
            <div className="item_sec5">
              <p>DECOR VISTA</p>
              <p>BEDROOM CONCEPT</p>
              <p>Find your insight</p>
            </div>
            <div className="item_sec5">
              <p>DECOR VISTA</p>
              <p>KITCHEN CONCEPT</p>
              <p>Find your insight</p>
            </div>
            <div className="item_sec5">
              <p>DECOR VISTA</p>
              <p>BATHROOM CONCEPT</p>
              <p>Find your insight</p>
            </div>
            <div className="item_sec5">
              <p>DECOR VISTA</p>
              <p>OFFICE CONCEPT</p>
              <p>Find your insight</p>
            </div>
          </div>
        </section>
        {designer && designer.blogs && designer.blogs.length > 0 && (
          <section className="sec6">
            <div className="b_sec6">
              <div className="title_sec6_">
                <p>DECOR VISTA</p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className="list_blogs">
                {designer && designer.blogs && designer.blogs.length > 3 ? (
                  <Slider
                    ref={(slider) => {
                      sliderRef = slider;
                    }}
                    {...settings1}
                  >
                    {designer &&
                      designer.blogs &&
                      designer.blogs.length > 0 &&
                      designer.blogs.map((item, index) => (
                        <BlogsItem item={item} key={index} />
                      ))}
                  </Slider>
                ) : (
                  <div className="lisst_blog_down3">
                    {designer &&
                      designer.blogs &&
                      designer.blogs.length > 0 &&
                      designer.blogs.map((item, index) => (
                        <BlogsItem item={item} key={index} />
                      ))}
                  </div>
                )}
              </div>
              {designer && designer.blogs && designer.blogs.length > 3 && (
                <div style={{ textAlign: "center" }} className="box_btn">
                  <p className="btn_scroll" onClick={previous}>
                    <i className="fa-solid fa-angle-down"></i>
                  </p>

                  <p className="btn_scroll" onClick={next}>
                    <i className="fa-solid fa-angle-down"></i>
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="page" onClick={closeModal}>
                {currentImage + 1}/{listCertificate.length}
              </span>
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
              <div className="container_modal">
                <p
                  className={
                    currentImage === 0
                      ? "btn_scroll_disable btn_scroll"
                      : "btn_scroll"
                  }
                  onClick={prevModal}
                >
                  <i class="fa-solid fa-angle-left"></i>
                </p>
                <div className="b_img_modal">
                  <img
                    src={listCertificate[currentImage]}
                    alt=""
                    className="modal-image"
                  />
                </div>

                <p
                  className={
                    listCertificate &&
                    currentImage === listCertificate.length - 1
                      ? "btn_scroll_disable btn_scroll"
                      : "btn_scroll"
                  }
                  onClick={nextModal}
                >
                  <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
            </div>
          </div>
        )}

        {isModalOpenStory && (
          <div className="modal">
            <div className="modal-content">
              <span className="page" onClick={closeModalStory}>
                {currentImageStory + 1}/{listimgstoryCurrent.length}
              </span>
              <span className="close-button" onClick={closeModalStory}>
                &times;
              </span>
              <div className="container_modal">
                <p
                  className={
                    currentImageStory === 0
                      ? "btn_scroll_disable btn_scroll"
                      : "btn_scroll"
                  }
                  onClick={prevModalStory}
                >
                  <i class="fa-solid fa-angle-left"></i>
                </p>
                <div className="b_img_modal">
                  <img
                    src={listimgstoryCurrent[currentImageStory]}
                    alt=""
                    className="modal-image"
                  />
                </div>

                <p
                  className={
                    listimgstoryCurrent &&
                    currentImageStory === listimgstoryCurrent.length - 1
                      ? "btn_scroll_disable btn_scroll"
                      : "btn_scroll"
                  }
                  onClick={nextModalStory}
                >
                  <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}
