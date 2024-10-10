import React, { useCallback, useEffect, useRef, useState } from "react";
import "../style/RoomType.scss";
import GalleryItem from "../component/GalleryItem";
import Slider from "react-slick";
import { useLayout } from "../hooks/Layout/LayoutContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

import living from "../assets/images/backgroundHor/livingroom.jpg";
import bedroom from "../assets/images/backgroundHor/bedroom.jpg";
import bathroom from "../assets/images/backgroundHor/bathroom.jpg";
import kitchen from "../assets/images/backgroundHor/kitchen.jpg";
import office from "../assets/images/backgroundHor/office.jpg";
import outdoor from "../assets/images/backgroundHor/outdoor.jpg";
import { apiRequest } from "../hooks/Api/Api";
import GetImageFirebase from "../function/GetImageFirebase";
import LoadingPage from "../component/LoadingPage";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export default function RoomType() {
  const sec2Ref = useRef(null);
  const [isloading, setIsloading] = useState(true);
  let sliderRef = useRef(null);
  const [bgimg, setBgimg] = useState();
  const { setLayout } = useLayout();
  const [animateClass, setAnimateClass] = useState(""); // To control animation
  // const [fadeBg, setFadeBg] = useState(false); // Flag to control background animation
  const [gallery, setGallery] = useState();
  const [galleryNew, setGalleryNew] = useState();
  const { name } = useParams();
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const [typeRoom, setTypeRoom] = useState(name);

  useEffect(() => {
    setLayout("main");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [setLayout]);


  useEffect(() => {


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [typeRoom]);

  const [listImage, setListImage] = useState([]);
  const parserImage = useCallback(() => {
    var stringImg =
      galleryNew && galleryNew.imageName ? galleryNew.imageName : null;
    if (stringImg != null) {
      const items = stringImg.split("; ").filter((item) => item.trim() !== "");
      var list = [];
      items.forEach((element) => {
        element = GetImageFirebase(element);
        list.push(element);
      });

      setListImage(list);
    }
  }, [galleryNew]);

  useEffect(() => {
    parserImage();
  }, [parserImage]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    easing: "ease-in-out",
  };

  const handleScroll = () => {
    if (sec2Ref.current) {
      sec2Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {

    setAnimateClass("fade-out");


    const timeoutId = setTimeout(() => {
      switch (typeRoom) {
        case "livingroom":
          setBgimg(living);
          break;
        case "bedroom":
          setBgimg(bedroom);
          break;
        case "bathroom":
          setBgimg(bathroom);
          break;
        case "kitchen":
          setBgimg(kitchen);
          break;
        case "office":
          setBgimg(office);
          break;
        case "outdoor":
          setBgimg(outdoor);
          break;
        default:
          setBgimg(living);
          break;
      }

      setAnimateClass("fade-in");

    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [typeRoom]);

  const fetchGallery = useCallback(async (url) => {
    try {
      var res = await apiRequest("GET", `GalleryFE/GetByRoomTypeUrl/${url}`);
      console.log(res)
      if (res && res.data && res.data.status === 200) {
        const gallery = res.data.data;
        setGallery(gallery);
        setTimeout(() => {
          setIsloading(false);
        }, 500);
      }

    } catch (error) {
      setTimeout(() => {
        setIsloading(false);
      }, 500);
    }
  }, []);

  const fetchGalleryNew = useCallback(async (url) => {
    try {
      var res = await apiRequest("GET", `GalleryFE/GetNewestByRoomType/${url}`);
      console.log(res);
      if (res && res.data && res.data.status === 200) {
        const gallerynew = res.data.data;
        setGalleryNew(gallerynew);
      }

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    switch (name) {
      case "livingroom":
        setTimeout(async () => {
          fetchGallery("livingroom");
          fetchGalleryNew("livingroom");
        }, 100);
        break;
      case "bedroom":
        setTimeout(async () => {
          fetchGallery("bedroom");
          fetchGalleryNew("bedroom");
        }, 100);
        break;
      case "bathroom":
        setTimeout(async () => {
          fetchGallery("bathroom");
          fetchGalleryNew("bathroom");
        }, 100);
        break;
      case "kitchen":
        setTimeout(async () => {
          fetchGallery("kitchen");
          fetchGalleryNew("kitchen");
        }, 100);
        break;
      case "office":
        setTimeout(async () => {
          fetchGallery("office");
          fetchGalleryNew("office");
        }, 100);
        break;
      case "outdoor":
        setTimeout(async () => {
          fetchGallery("outdoor");
          fetchGalleryNew("outdoor");
        }, 100);
        break;
      default:
        setTimeout(async () => {
          fetchGallery("livingroom");
          fetchGalleryNew("livingroom");
        }, 100);
        break;
    }
  }, [name, fetchGallery, fetchGalleryNew]);




  const navigate = useNavigate()
  const [cookies] = useCookies();
  const [bookmark, setBookmark] = useState([])
  const fetchbookmark = useCallback(async () => {
    try {
      if (!cookies.autherize) {
        // navigate("/login")
        return
      }
      const userdata = jwtDecode(cookies.autherize);
      var res = await apiRequest("Get", `BookmarkFE/Getall/${userdata.id}`)
      console.log(res)
      if (res && res.data && res.data.status === 200) {
        setBookmark(res.data.data)
      }

    } catch (error) {

    }
  }, [cookies.autherize])

  useEffect(() => {
    setTimeout(() => {
      fetchbookmark()
    }, 200);
  }, [fetchbookmark])

  return (
    <div className="room_type_page">
      <LoadingPage isloading={isloading} />
      <section className={`sec1`} style={{ backgroundImage: `url(${bgimg})` }}>
        <div className="content">
          <p className="t_1">CONCEPT OF</p>
          <p
            className={
              animateClass === "fade-out"
                ? "name_type name_type_design"
                : "name_type"
            }
          >
            {typeRoom}
          </p>
          <div className="b_discription">
            <p className="discription">
              Experience tailored art concepts for each room and product samples
              to help personalize your space.
            </p>
            <p className="btn_scroll" onClick={handleScroll}>
              <i className="fa-solid fa-angle-down"></i>
            </p>
          </div>
        </div>
        <div className="choice_room_type_sec1">
          <Link className="link_tag" to={"/roomconcept/livingroom"}>
            <div
              className={
                typeRoom === "livingroom" ? "item item_choice" : "item"
              }
              onClick={() => {
                setTypeRoom("livingroom");
              }}
            >
              <div className="b_icon">
                <img
                  alt=""
                  src={require("../assets/images/typeroom/livingroom.png")}
                />
              </div>
              <p className="name">Living Room</p>
            </div>
          </Link>
          <Link className="link_tag" to={"/roomconcept/bedroom"}>
            {" "}
            <div
              className={typeRoom === "bedroom" ? "item item_choice" : "item"}
              onClick={() => {
                setTypeRoom("bedroom");
              }}
            >
              <div className="b_icon">
                <img
                  alt=""
                  src={require("../assets/images/typeroom/bedroom.png")}
                />
              </div>
              <p className="name">Bedrooms</p>
            </div>
          </Link>
          <Link className="link_tag" to={"/roomconcept/bathroom"}>
            {" "}
            <div
              className={typeRoom === "bathroom" ? "item item_choice" : "item"}
              onClick={() => {
                setTypeRoom("bathroom");
              }}
            >
              <div className="b_icon">
                <img
                  alt=""
                  src={require("../assets/images/typeroom/bathroom.png")}
                />
              </div>
              <p className="name">Bathrooms</p>
            </div>
          </Link>
          <Link className="link_tag" to={"/roomconcept/kitchen"}>
            {" "}
            <div
              className={typeRoom === "kitchen" ? "item item_choice" : "item"}
              onClick={() => {
                setTypeRoom("kitchen");
              }}
            >
              <div className="b_icon">
                <img
                  alt=""
                  src={require("../assets/images/typeroom/kitchen.png")}
                />
              </div>
              <p className="name">Kitchen</p>
            </div>
          </Link>
          <Link className="link_tag" to={"/roomconcept/office"}>
            <div
              className={typeRoom === "office" ? "item item_choice" : "item"}
              onClick={() => {
                setTypeRoom("office");
              }}
            >
              <div className="b_icon">
                <img
                  alt=""
                  src={require("../assets/images/typeroom/office.png")}
                />
              </div>
              <p className="name">Office</p>
            </div>
          </Link>
          <Link className="link_tag" to={"/roomconcept/outdoor"}>
            {" "}
            <div
              className={typeRoom === "outdoor" ? "item item_choice" : "item"}
              onClick={() => {
                setTypeRoom("outdoor");
              }}
            >
              <div className="b_icon">
                <img
                  alt=""
                  src={require("../assets/images/typeroom/outdoor.png")}
                />
              </div>
              <p className="name">Outdoor Spaces</p>
            </div>
          </Link>
        </div>
      </section>
      <section className="sec2" ref={sec2Ref}>
        <div className="left">
          <div className="box_item">
            <div
              className="b_img"
              style={{
                backgroundImage: `url(${require("../assets/images/kitchen/classics.jpg")})`,
              }}
            >
              <div className="name_type_design">Classic</div>
            </div>
          </div>
          <div className="box_item">
            <div
              className="b_img"
              style={{
                backgroundImage: `url(${require("../assets/images/kitchen/modern.jpg")})`,
              }}
            >
              <div className="name_type_design">Modern</div>
            </div>
          </div>
          <div className="box_item">
            <div
              className="b_img"
              style={{
                backgroundImage: `url(${require("../assets/images/kitchen/Contemporary.jpg")})`,
              }}
            >
              <div className="name_type_design">Contemporary</div>
            </div>
          </div>
        </div>
        <div className="right">
          <p>Design style</p>
          <p>
            Design style refers to the distinctive visual elements, techniques,
            and aesthetics that characterize a particular approach to creating
            functional or artistic works. It can range from classic, modern, and
            minimalist to eclectic, industrial, or contemporary. Each style
            emphasizes different aspects like form, function, materials, and
            color to create a unique environment or product that reflects
            personal or cultural expression.
          </p>
        </div>
      </section>
      <section className="sec3">
        <div className="list_logo_brand">
          {Array.from({ length: 6 }, (_, index) => (
            <div className="b_logo_brand" key={index}>
              <img
                src={require("../assets/images/brand/brand.png")}
                alt="Brand Logo"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="sec4">
        <div className="b_title">
          <p className="title_sec4">VIEW GALLERY</p>
          <div style={{ textAlign: "center" }} className="box_btn">
            <p className="btn_scroll" onClick={previous}>
              <i className="fa-solid fa-angle-down"></i>
            </p>

            <p className="btn_scroll" onClick={next}>
              <i className="fa-solid fa-angle-down"></i>
            </p>
          </div>
        </div>

        <div className="slider-container">
          {gallery && gallery.length > 0 && (
            <Slider
              ref={(slider) => {
                sliderRef = slider;
              }}
              {...settings}
            >
              {gallery.map((gallery, index) => (
                <GalleryItem item={gallery} bookmark={bookmark} callbackfn={fetchbookmark} key={index} />
              ))}
            </Slider>
          )}
        </div>
      </section>

      <section className="sec5">
        <div className="left">
          <div
            className="b_img"
            style={{ backgroundImage: `url(${listImage[0]})` }}
          ></div>
          <div
            className="b_img"
            style={{ backgroundImage: `url(${listImage[1]})` }}
          ></div>
          <div
            className="b_img"
            style={{ backgroundImage: `url(${listImage[2]})` }}
          ></div>
        </div>
        <div className="right">
          <p className="name_gallery">
            {galleryNew ? galleryNew.gallery_name : ""}
          </p>
          <div className="text_decor">
            <p>New</p>
            <p>GALLERY</p>
          </div>
          <p className="discription">
            {galleryNew ? parse(galleryNew.description) : ""}
          </p>
          <div className="b_btn">
            <Link
              className="link_tag"
              to={`/gallerydetail/${galleryNew && galleryNew.id}`}
            >
              <div className="b_btn">
                <p>See more</p>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
