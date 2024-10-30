import React, { useCallback, useEffect, useState } from "react";
import { useLayout } from "../hooks/Layout/LayoutContext";
import "../style/ProductDetail.scss";
import { Link, useNavigate, useParams } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "../component/ProductItem";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Star from "../component/Star";
import Infomation from "../component/Infomation";
import Policy from "../component/Policy";
import { apiRequest } from "../hooks/Api/Api";
import LoadingPage from "../component/LoadingPage";
import GetImageFirebase from "../function/GetImageFirebase";
import {

  apiRequestAutherizeForm,
} from "../hooks/Api/ApiAuther";
import { useCookies } from "react-cookie";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import ListReview from "../component/ListReview";
import CompanyProfile from "../component/CompanyProfile";
export default function ProductDetail() {
  const { setLayout } = useLayout();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [nav_info, setNav_info] = useState(1);
  const [detail, setDetail] = useState({});
  const { id } = useParams();
  const [isloading, setIsloading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLayout("main");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [setLayout]);

  const [noti, setNoti] = useState("");
  const createNotification = (type) => {
    return () => {
      NotificationManager.removeAll();
      switch (type) {
        case "Add success":
          NotificationManager.success(
            "Add to cart succesfuly!",
            "Success",
            2000
          );
          break;
        case "Error Lg Pw":
          NotificationManager.error(
            "Add ro cart failed!",
            "Login Fail",
            2000,
            () => {
              alert("callback");
            }
          );
          break;

        default:
          break;
      }
    };
  };

  useEffect(() => {
    if (noti) {
      createNotification(noti)();
    }
  }, [noti]);

  const fetchProductDetail = useCallback(async () => {
    try {
      var res = await apiRequest("Get", `ProductFE/GetById/${id}`);

      if (res && res.data && res.data.status === 200) {
        setDetail(res.data.data);
        setTimeout(() => {
          setIsloading(false);
        }, 500);
      }
      // setLoading(false)
    } catch (error) {
      console.log("get product detail fails");
    }
  }, [id]);


  const [reviews, setReviews] = useState()
  const fetchReview = useCallback(async (idpro) => {
    try {
      var res = await apiRequest("Get", `ReviewFE/GetFeedBackProduct/${idpro}`)
      if (res && res.data && res.data.status === 200) {
        setReviews(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    if (detail && detail.id) {
      setTimeout(async () => {
        fetchReview(detail.id);
      }, 100);
    }

  }, [fetchReview, detail]);



  useEffect(() => {
    setTimeout(async () => {
      fetchProductDetail();
    }, 100);
  }, [fetchProductDetail]);

  const [variantDetail, setVariantDetail] = useState();
  const [chosenVariant, setChosenVariant] = useState([]);

  useEffect(() => {
    const variant = detail?.variants?.[0]?.variantattributes || [];
    //checkdo dai kieu variant
    var a = [
      variant?.[0]?.attributevalue || "",
      variant?.[1]?.attributevalue || "",
      variant?.[2]?.attributevalue || "",

    ];

    setChosenVariant(a);
  }, [detail]);

  const [variant, setVariant] = useState();

  useEffect(() => {
    const filterVariant = chosenVariant.filter((item) => item.length !== 0);

    if (variantDetail && filterVariant.length === variantDetail.length) {
      if (detail && detail.variants && detail.variants.length > 0) {
        for (let itemVariant of detail.variants) {
          let isOk = true;
          for (let i = 0; i < itemVariant.variantattributes.length; i++) {
            if (
              itemVariant.variantattributes[i].attributevalue !==
              filterVariant[i]
            ) {
              isOk = false;
              break;
            }
          }

          if (isOk === true) {
            setVariant(itemVariant);
          }
        }
      }
    }
  }, [chosenVariant]);

  useEffect(() => {
    console.log(variant);
  }, [variant]);

  useEffect(() => {
    var variantList = [];
    var list = [];
    if (detail && detail.variants && detail.variants.length > 0) {
      detail.variants[0].variantattributes.forEach((element) => {
        list.push(element.attributetype);
      });

      list.forEach((item) => {
        const valueList = [];
        for (let variant of detail.variants) {
          for (let attribute of variant.variantattributes) {
            if (
              attribute.attributetype === item &&
              !valueList.includes(attribute.attributevalue)
            ) {
              valueList.push(attribute.attributevalue);
            }
          }
        }

        variantList.push({
          type: item,
          list: valueList,
        });
      });

      setVariantDetail(variantList);

      // setVariantName(list)
    }
  }, [detail]);

  const [quantity, setQuantity] = useState(1);
  const [cookies, removeCookie] = useCookies();

  const addtocart = async () => {
    setNoti("a");
    if (cookies.autherize) {
      try {
        const formData = new FormData();
        formData.append("idVariant", variant.id);
        formData.append("quantity", quantity);
        formData.append("productid", id);
        console.log("haha");
        var res = await apiRequestAutherizeForm(
          "POST",
          "CartFE/add_cart",
          cookies.autherize,
          formData
        );
        if (res && res.data && res.data.status === 200) {
          setNoti("Add success");
        }
      } catch (error) {
        if (error && error.response && error.response.status === 403) {
          console.log(error);
          removeCookie("autherize");
        }
      }
    } else {
      console.log("no token");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  const displayText = (text) => {
    if (text.length < 50) {
      return text
    }
    return text.slice(0, 50) + '...';
  }

  const buynow = async () => {
    if (cookies.autherize) {
      try {
        const formData = new FormData();
        formData.append("idVariant", variant.id);
        formData.append("quantity", quantity);
        formData.append("productid", id);
        console.log("haha");
        var res = await apiRequestAutherizeForm(
          "POST",
          "CartFE/add_cart",
          cookies.autherize,
          formData
        );
        if (res && res.data && res.data.status === 200) {
          setNoti("Add success");
          setTimeout(() => {
            navigate("/cart");
          }, 500);
        }
      } catch (error) { }
    } else {
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  return (
    detail && (
      <div className="product_detail">
        <NotificationContainer />
        <LoadingPage isloading={isloading} />
        <section className="sec1">
          <div className="b_content">
            <p className="title_1">Design Your Home with the Experts</p>
            <p className="title_3">Decor with Designer</p>
          </div>
        </section>
        <section className="sec_brums">
          <div className="b_brums">
            <div className="b_link">
              <p>
                <Link
                  className="link_tag"
                  to={"/"}
                  style={{ color: "white", fontWeight: "700" }}
                >
                  Home
                </Link>
              </p>
              <p>&gt;</p>
              <p>
                <Link
                  className="link_tag"
                  to={"/product"}
                  style={{ color: "white", fontWeight: "700" }}
                >
                  Product
                </Link>
              </p>
              <p>&gt;</p>
              <p>{detail && detail.productName && displayText(detail.productName)}</p>
            </div>
          </div>
        </section>
        <section className="sec2">
          <div className="b_sec_detail">
            <div className="b_img_left">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined} // Add this check
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {detail.listimage &&
                  detail.listimage.length > 0 &&
                  detail.listimage.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="b_image" >
                        <img src={GetImageFirebase(item.imagename)} alt="" />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {detail.listimage &&
                  detail.listimage.length > 0 &&
                  detail.listimage.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="b_image" >
                        <img src={GetImageFirebase(item.imagename)} alt="" />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="b_info_right">
              <div className="row_brand_bookmark">
                <div className="brand">
                  <p>Brand:</p>
                  <p>{detail.brand}</p>
                </div>
                <div className="b_bookmark">
                  {/* <i className="fa-regular fa-bookmark"></i> */}
                </div>
              </div>
              <div className="name_details">
                <p>{detail.productName}</p>
              </div>
              <div className="b_star_cate">
                <div className="subcategories">
                  <div className="typeroom">
                    <p>DECOR VISTA</p>
                  </div>
                  <div>/</div>
                  <div className="funcitonaly">
                    <p>{detail.functionality_name}</p>
                  </div>
                </div>

                <div className="b_rate_prodetails">
                  <p>{detail.score ? detail.score.toFixed(1) : 0}</p>
                  <Star number={detail.score} />
                </div>
              </div>
              <div className="b_price">
                <p className="title">Price</p>
                <div className="b_price_container">
                  <p className="note">Price includes VAT</p>
                  <div>
                    <s>${variant?.saleprice && variant.saleprice}</s>
                    <p>$ {variant?.price && variant?.price}</p>
                  </div>
                </div>
              </div>
              <div className="property">
                {variantDetail &&
                  variantDetail.length > 0 &&
                  variantDetail.map((item, index) => (
                    <div className="variant" key={index}>
                      <p className="title">{item.type}</p>
                      <div>
                        {item.list &&
                          item.list.length > 0 &&
                          item.list.map((items, indexs) => (
                            <p
                              onClick={() =>
                                setChosenVariant((prev) => {
                                  prev[index] = items;
                                  return [...prev];
                                })
                              }
                              key={indexs}
                              className={
                                chosenVariant.includes(items) ? "choice" : ""
                              }
                            >
                              {items}
                            </p>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="add_stock">
                <p className="title">Quantity</p>
                <div className="b_change_stock">
                  <p
                    onClick={() => {
                      setQuantity((prev) => {
                        return prev > 1 ? (prev = prev - 1) : 1;
                      });
                    }}
                  >
                    -
                  </p>
                  <p>{quantity}</p>
                  <p
                    onClick={() => {
                      setQuantity((prev) => {
                        return (prev = prev + 1);
                      });
                    }}
                  >
                    +
                  </p>
                </div>
              </div>
              <div className="box_button">
                <Link className="link_tag">
                  <button onClick={addtocart} className="add_to_cart">
                    Add to Cart
                  </button>
                </Link>
                <Link className="link_tag">
                  <button onClick={buynow} className="buy_now">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="sec3">
          <div className="b_info_product">
            <div className="info_product">
              <div className="b_nav">
                <p
                  className={nav_info === 1 ? "nav_choice" : ""}
                  onClick={() => {
                    setNav_info(1);
                  }}
                >
                  Information
                </p>
                <p
                  className={nav_info === 2 ? "nav_choice" : ""}
                  onClick={() => {
                    setNav_info(2);
                  }}
                >
                  Review
                </p>
                <p
                  className={nav_info === 3 ? "nav_choice" : ""}
                  onClick={() => {
                    setNav_info(3);
                  }}
                >
                  Policy
                </p>
                <p
                  className={nav_info === 4 ? "nav_choice" : ""}
                  onClick={() => {
                    setNav_info(4);
                  }}
                >
                  Seller profile
                </p>
              </div>
              <div className="b_page">
                <div>
                  {(() => {
                    switch (nav_info) {
                      case 1:
                        return <Infomation item={detail.description} />;
                      case 2:
                        return reviews && <ListReview review={reviews} />;
                      case 3:
                        return <Policy />;
                      case 4:
                        return <CompanyProfile />;
                      default:
                        return null;
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sec4">
          <div className="b_sec4_suggest">
            <p className="title">Same collection</p>
            <div className="list_item">
              {/* <ProductItem  />
                        <ProductItem  />
                        <ProductItem  />
                        <ProductItem  /> */}
            </div>
          </div>
        </section>
      </div>
    )
  );
}
