import React, { useCallback, useEffect, useRef, useState } from "react";
import "../style/GalleryDetail.scss";
import { useLayout } from "../hooks/Layout/LayoutContext";
import { Link, useParams } from "react-router-dom";
import ProductItem from "../component/ProductItem";
import { apiRequest } from "../hooks/Api/Api";
import GetImageFirebase from "../function/GetImageFirebase";
import parse from "html-react-parser";
import Infomation from "../component/Infomation";
import LoadingPage from "../component/LoadingPage";
export default function GalleryDetail() {
  const sec3Ref = useRef(null);
  const { setLayout } = useLayout();
  const [isloading, setIsloading] = useState(true);
  const { id } = useParams();
  console.log(id);
  const handleScroll = () => {
    if (sec3Ref.current) {
      sec3Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    setLayout("main");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [setLayout]);

  const [detail, setDetail] = useState();
  const fetchGallaryDetail = useCallback(async () => {
    try {
      var res = await apiRequest("Get", `GalleryFE/GetById/${id}`);
      console.log(res);
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

  useEffect(() => {
    setTimeout(async () => {
      fetchGallaryDetail();
    }, 100);
  }, [fetchGallaryDetail]);

  const [listpro, setListPro] = useState();
  const fetchProduct = useCallback(async () => {
    try {
      var res = await apiRequest("Get", `ProductFE/GetByGallery/${id}`);
      console.log(res.data.data);
      if (res && res.data && res.data.status === 200) {
        setListPro(res.data.data);
      }
      // setLoading(false)
    } catch (error) {
      console.log("get product detail fails");
    }
  }, [id]);

  useEffect(() => {
    setTimeout(async () => {
      fetchProduct();
    }, 100);
  }, [fetchProduct]);

  const [listImage, setListImage] = useState([]);
  const parserImage = useCallback(() => {
    var stringImg = detail && detail.imageName ? detail.imageName : null;
    if (stringImg != null) {
      const items = stringImg.split("; ").filter((item) => item.trim() !== "");
      var list = [];
      items.forEach((element) => {
        element = GetImageFirebase(element);
        list.push(element);
      });

      setListImage(list);
    }
  }, [detail]);

  useEffect(() => {
    parserImage();
  }, [parserImage]);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;
  const totalPages =
    listpro && listpro.length > 0 && Math.ceil(listpro.length / ordersPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  //phân trang button_pagination_active
  const renderPagination = () => {
    const pagination = [];
    const maxVisibleButtons = 7;

    const addPage = (page) => {
      pagination.push(
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={
            currentPage === page ? "active button_pagination_active" : ""
          }
        >
          {page}
        </button>
      );
    };

    if (totalPages <= maxVisibleButtons) {
      for (let page = 1; page <= totalPages; page++) {
        addPage(page);
      }
    } else {
      const leftOffset = Math.max(1, currentPage - 2);
      const rightOffset = Math.min(totalPages, currentPage + 2);

      if (currentPage > 3) {
        pagination.push(
          <button key="first" onClick={() => handleClick(1)}>
            1
          </button>
        );
        pagination.push(<span key="ellipsis1">...</span>);
      }

      for (let page = leftOffset; page <= rightOffset; page++) {
        addPage(page);
      }

      if (currentPage < totalPages - 2) {
        pagination.push(<span key="ellipsis2">...</span>);
        pagination.push(
          <button key="last" onClick={() => handleClick(totalPages)}>
            {totalPages}
          </button>
        );
      }
    }

    return pagination;
  };

  const renderProducts = () => {
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders =
      listpro &&
      listpro.length > 0 &&
      listpro.slice(indexOfFirstOrder, indexOfLastOrder);

    return (
      currentOrders &&
      currentOrders.length > 0 &&
      currentOrders.map((item, index) => <ProductItem key={index} pro={item} />)
    );
  };
  return (
    detail && (
      <div className="gallery_detail_page">
        <LoadingPage isloading={isloading} />
        <section
          className="sec1_1"
          style={{
            backgroundImage: `url(${require("../assets/images/background/badrooom.jpg")})`,
          }}
        >
          <div className="content">
            <p className="t_1">Experience</p>
            <p className="name_type">VIRTUAL MUSEUM</p>
            <div className="b_discription">
              <p className="discription">
                Each painting is a work of art, harmoniously blending various
                design trends across different concepts.
              </p>
              <p className="btn_scroll" onClick={handleScroll}>
                <i className="fa-solid fa-angle-down"></i>
              </p>
            </div>
          </div>
        </section>
        <section className="sec_2">
          <div className="sec_2_container">
            <div className="top">
              <div></div>
              <div className="content">
                <p className="title">SMART OFFERS</p>
                <p className="date">Section 1.10.32 of</p>
                <p className="discription">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC
                </p>
                {/* <Link className='link_tag'> <button>Click Show More</button></Link> */}
              </div>
              <div className="b_img">
                <img alt="" src={listImage[0]} />
              </div>
              <div className="b_img">
                <img alt="" src={listImage[1]} />
              </div>
              <div></div>
            </div>
            <div className="bottom">
              <div></div>
              <div className="b_img">
                <img alt="" src={listImage[2]} />
              </div>
              <div className="b_img">
                <img alt="" src={listImage[3]} />
              </div>
              <div className="b_img">
                <img alt="" src={listImage[4]} />
              </div>
              <div></div>
            </div>
          </div>
        </section>
        <section className="sec_3">
          <div className="sec_3_container">
            <img src={listImage[3]} alt="" />
            <img src={listImage[4]} alt="" />
            <img src={listImage[2]} alt="" />
            <div className="content">
              <p className="title_">{detail.name}</p>
              <p className="descrip"> {parse(detail.description)}</p>
              <div className="list_ts">
                <div className="item">
                  <i className="fa-solid fa-bookmark"></i>
                  <p>{detail.subcribes} Bookmark</p>
                </div>
                <div className="item">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  <p>{detail.color_tone} Tone</p>
                </div>
                <div className="item">
                  <i className="fa-solid fa-clipboard"></i>
                  <p>{detail.product_count} Items</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sec5">
          <Infomation item={detail.description} />
        </section>
        <section className="sec4">
          <div className="sec_4_container">
            <p className="title_sec4_gallerydetail">Product In Gallery</p>
            <div className="list_product_gallery">
              {listpro && listpro.length > 0 ? (
                renderProducts()
              ) : (
                <p className="not_found">Not found</p>
              )}
            </div>
            <div className="pagination">
              <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {renderPagination()}
              <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  );
}
