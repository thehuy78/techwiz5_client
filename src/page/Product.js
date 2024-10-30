import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLayout } from "../hooks/Layout/LayoutContext";
import RangeSlider from "../component/RangeSlider";
import "../style/ProductPage.scss";

import ProductItem from "../component/ProductItem";
import Star from "../component/Star";
import { Link } from "react-router-dom";
import { apiRequest } from "../hooks/Api/Api";
import LoadingPage from "../component/LoadingPage";

export default function Product() {
  const { setLayout } = useLayout();
  const [priceRange, setPriceRange] = useState([0, 500]);
  const sec3Ref = useRef(null);
  const [isloading, setIsloading] = useState(true);
  const [product, setProduct] = useState([]);
  const [productSave, setProductSave] = useState([]);
  const [funtionality, setFunctionality] = useState();
  const [valueFilter, setValueFilter] = useState({
    button: "",
    rate: 0,
    Functionality: "All",
    search: "",
  });

  const handelClearFilterValue = () => {
    setValueFilter({
      button: "",
      rate: 0,
      Functionality: "All",
      search: "",
    });
  };

  const handleCheckboxChange = (star) => {
    setValueFilter((prev) => {
      if (prev.rate === star) {
        return { ...prev, rate: 0 };
      } else {
        return { ...prev, rate: star };
      }
    });
  };

  useEffect(() => {
    console.log(valueFilter);
  }, [valueFilter]);

  useEffect(() => {
    setLayout("main");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [setLayout]);

  const handleRangeChange = (values) => {
    setPriceRange(values);
  };
  const handleScroll = () => {
    if (sec3Ref.current) {
      sec3Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchProduct = useCallback(async () => {
    try {
      var res = await apiRequest("GET", `ProductFE`);
      console.log(res);
      setTimeout(() => {
        setIsloading(false);
      }, 500);
      if (res && res.data && res.data.status === 200) {
        const products = res.data.data;
        setProduct(products);
        setProductSave(products);
      }

      // setLoadingcomponent(false)
    } catch (error) {
      setTimeout(() => {
        setIsloading(false);
      }, 500);
    }
  }, []);

  const fetchFunctionality = useCallback(async () => {
    try {
      var res = await apiRequest("GET", `FunctionalityFE`);
      console.log(res);
      if (res && res.data && res.data.status === 200) {
        const functionalitys = res.data.data;

        setFunctionality(functionalitys);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      fetchProduct();
      fetchFunctionality();
    }, 100);
  }, [fetchProduct, fetchFunctionality]);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;
  const totalPages =
    product && product.length > 0 && Math.ceil(product.length / ordersPerPage);

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
      product &&
      product.length > 0 &&
      product.slice(indexOfFirstOrder, indexOfLastOrder);

    return (
      currentOrders &&
      currentOrders.length > 0 &&
      currentOrders.map((item, index) => <ProductItem key={index} pro={item} />)
    );
  };

  const [totalProduct, setTotalProduct] = useState();
  useEffect(() => {
    if (funtionality && funtionality.length > 0) {
      var i = 0;
      funtionality.forEach((element) => {
        i += element.productCount;
      });
      setTotalProduct(i);
    }
  }, [productSave, funtionality]);

  const changeSearch = () => {
    var searchInput = document.getElementById("search_product");
    var searchValue = searchInput.value.trim();
    setValueFilter((prevState) => ({
      ...prevState,
      search: searchValue, // Thay thế giá trị mới của search
    }));
  };
  //filter product
  useEffect(() => {
    let filteredProducts = [...productSave];

    if (valueFilter.search !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.productName
          .toLowerCase()
          .includes(valueFilter.search.toLowerCase())
      );
    }

    if (valueFilter.Functionality !== "All") {
      filteredProducts = filteredProducts.filter(
        (p) => p.functionality_name === valueFilter.Functionality
      );
    }

    // // Filter by price range
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // // Filter by rate
    if (valueFilter.rate !== 0) {
      filteredProducts = filteredProducts.filter((p) => {
        const score = p.score ? p.score : 0;
        return score >= valueFilter.rate && score < valueFilter.rate + 1;
      });
    }

    if (valueFilter.button === "New Arrival") {
      filteredProducts = filteredProducts.sort(
        (a, b) => new Date(b.create_date) - new Date(a.create_date)
      );
    }

    if (valueFilter.button === "Best Seller") {
      filteredProducts = filteredProducts.sort(
        (a, b) => b.sale_count - a.sale_count
      );
    }

    setProduct(filteredProducts);
  }, [valueFilter, productSave, priceRange, totalPages, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [valueFilter, priceRange]);

  return (
    <div className="product_page">
      <LoadingPage isloading={isloading} />
      <section
        className="sec1"
        style={{
          backgroundImage: `url(${require("../assets/images/background/badrooom.jpg")})`,
        }}
      >
        <div className="content">
          <p className="t_1">Explore variety artistic inerior</p>
          <p className="name_type">PRODUCT</p>
          <div className="b_discription">
            <p className="discription">
              We offer a diverse catalog of highly artistic furniture products,
              categorized into room types, functionality, concepts, and styles,
              perfectly suited to meet any of your desires.
            </p>
            <p className="btn_scroll" onClick={handleScroll}>
              <i ref={sec3Ref} className="fa-solid fa-angle-down"></i>
            </p>
          </div>
        </div>
      </section>

      <section className="sec2">
        <div className="b_sec2">
          <div className="left">
            <div className="filter_cate">
              <p className="title">Categories</p>

              <div className="list_function">
                <div
                  onClick={() => {
                    setValueFilter((prev) => {
                      if (prev.Functionality === "All") {
                        return { ...prev, Functionality: "All" };
                      } else {
                        return { ...prev, Functionality: "All" };
                      }
                    });
                  }}
                  className={
                    valueFilter.Functionality === "All"
                      ? "title_list_function title_list_function_all"
                      : "title_list_function"
                  }
                >
                  <p>All Functionality</p>
                  <p>{totalProduct && totalProduct}</p>
                </div>
                <div className="list_item">
                  {funtionality &&
                    funtionality.length > 0 &&
                    funtionality.map((item, index) => (
                      <div
                        key={index}
                        className={
                          valueFilter.Functionality === item.name
                            ? "item item_choice"
                            : "item"
                        }
                        onClick={() => {
                          setValueFilter((prev) => {
                            if (prev.Functionality === item.name) {
                              return { ...prev, Functionality: "All" };
                            } else {
                              return { ...prev, Functionality: item.name };
                            }
                          });
                        }}
                      >
                        <p className="name_function">{item.name} </p>
                        <p>{item.productCount}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="filter_price">
              <p className="title">Filter by</p>
              <RangeSlider
                min={0}
                max={500}
                step={1}
                onChange={handleRangeChange}
              />
            </div>
            <div className="rating_product_filter">
              <p className="title">Rating</p>
              <div className="list_option">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div className="item" key={star}>
                    <div className="box1_">
                      <input
                        type="checkbox"
                        checked={valueFilter.rate === star}
                        onChange={() => handleCheckboxChange(star)}
                      />
                      <p className="number">{star} Star</p>
                    </div>
                    <Star number={star} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="top_filter">
              <div className="b_1">
                <p className="title">Sort by:</p>
                <div className="b_search">
                  <i className="fa-solid fa-magnifying-glass"></i>

                  <input
                    type="search"
                    defaultValue={""}
                    id="search_product"
                    onChange={changeSearch}
                  />
                </div>
                <button
                  className={
                    valueFilter.button === "Best Seller" ? "button_active" : ""
                  }
                  onClick={() => {
                    setValueFilter((prev) => {
                      if (prev.button === "Best Seller") {
                        return { ...prev, button: "" };
                      } else {
                        return { ...prev, button: "Best Seller" };
                      }
                    });
                  }}
                >
                  Best seller
                </button>
                <button
                  className={
                    valueFilter.button === "New Arrival" ? "button_active" : ""
                  }
                  onClick={() => {
                    setValueFilter((prev) => {
                      if (prev.button === "New Arrival") {
                        return { ...prev, button: "" };
                      } else {
                        return { ...prev, button: "New Arrival" };
                      }
                    });
                  }}
                >
                  New arrival
                </button>
              </div>
              <div className="b_2">
                <div className="b_show_page">
                  <div className="number">
                    <span>Page:</span>
                    {currentPage}/{totalPages}
                  </div>
                </div>
              </div>
            </div>
            <div className="current_filter">
              <div className="left_current_filter">
                <p className="title">Current filter:</p>
                <div className="list_filter">
                  {valueFilter.button !== "" && (
                    <button>{valueFilter.button}</button>
                  )}
                  {valueFilter.Functionality !== "All" && (
                    <button>{valueFilter.Functionality}</button>
                  )}
                  {valueFilter.rate !== 0 && (
                    <button>{valueFilter.rate} Star</button>
                  )}
                </div>
              </div>
              <div className="right_current_filter">
                <button onClick={handelClearFilterValue}>Clear</button>
              </div>
            </div>
            <div
              className={
                product && product.length > 0
                  ? "list_product_container"
                  : "list_product_container notfound_list"
              }
            >
              {product && product.length > 0 ? (
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
        </div>
      </section>
    </div>
  );
}
