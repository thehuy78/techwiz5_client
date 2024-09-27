import React, { useCallback, useEffect, useState } from "react";
import "../style/OrderDetails.scss";
import { useLayout } from "../hooks/Layout/LayoutContext";
import LoadingPage from "../component/LoadingPage";
import { useParams } from "react-router-dom";
import { apiRequest } from "../hooks/Api/Api";
import { formatDate } from "../function/FormatDate";

export default function OrderDetails() {
  const { setLayout } = useLayout();

  const [isloading, setIsloading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLayout("main");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setIsloading(false);
    }, 500);
  }, [setLayout]);
  const [detailOrder, setDetailOrder] = useState();
  const fetchOrderDetail = useCallback(async () => {
    try {
      var res = await apiRequest(
        "Get",
        `OrderDetailFE/GetOrderDetailByOrderId/${id}`
      );

      console.log(res.data.data);
      if (res && res.data && res.data.status === 200) {
        setDetailOrder(res.data.data);
        setTimeout(() => {
          setIsloading(false);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    setTimeout(async () => {
      fetchOrderDetail();
    }, 100);
  }, [fetchOrderDetail]);

  useEffect(() => {
    console.log(detailOrder);
  }, [detailOrder]);
  return (
    detailOrder &&
    detailOrder.length > 0 && (
      <div className="order_detail_page">
        <LoadingPage isloading={isloading} />
        <section className="sec1">
          <div className="brums_orderdetail">
            <i class="fa-solid fa-arrow-left"></i>
            <div className="li_brums">
              <p className="id_order">Order #{detailOrder[0].idorder}</p>
              <p className="date_created_order">
                Comfirmed {formatDate(detailOrder[0].create_at)}
              </p>
            </div>
          </div>
        </section>
        <section className="sec2">
          <div className="info_order">
            <div className="update_status">
              <p className="t1">
                Expected {formatDate(detailOrder[0].create_at)}
              </p>
              <div className="box_status">
                <i class="fa-solid fa-truck-fast"></i>
                <div>
                  <p>Out for delivery</p>
                  <p>Update {formatDate(detailOrder[0].create_at)}</p>
                </div>
              </div>
            </div>
            <div className="info_delivery">
              <p className="t1">Delivery Infomation</p>
              <div className="b_list_item">
                <div className="item">
                  <p>Fullname</p>
                  <p>{detailOrder[0].fullname}</p>
                </div>
                <div className="item">
                  <p>Phone</p>
                  <p>{detailOrder[0].phone}</p>
                </div>
                <div className="item">
                  <p>Emaill</p>
                  <p>techwiz@gmail.com</p>
                </div>
                <div className="item">
                  <p>Address</p>
                  <p>{detailOrder[0].address}</p>
                </div>
                <div className="item">
                  <p>Paid Method</p>
                  <p>COD</p>
                </div>
              </div>
            </div>
            <div className="b_sup">
              <i class="fa-solid fa-headset"></i>
              <p>
                If you have any questions, please contact hotline 09989887 or
                email techwiz@gmail.com for support.
              </p>
            </div>
          </div>
          <div className="list_product_order">
            <div className="list_pro_orderdetail">
              {detailOrder.map((item, index) => (
                <div className="item" key={index}>
                  <img
                    src={require("../assets/images/product/p2.webp")}
                    alt=""
                  />
                  <div className="pro_info_detail">
                    <p className="name_pro">{item.productname}</p>
                    <div className="list_variant">
                      {item.variantattributes.map((items, index) => (
                        <p key={index}>{items.attributevalue}</p>
                      ))}
                    </div>
                  </div>
                  <div className="b_quatity">
                    <p>SL</p>
                    <p>{item.quantity}</p>
                  </div>
                  <p className="b_price_">$ {item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="caculator_order">
              <div className="Total_Price">
                <p>Total Price</p>
                <p>$ {detailOrder[0].totalprice - 10}</p>
              </div>

              <div className="Fee_Shipping">
                <p>Fee Shipping</p>
                <p>$ 10.0</p>
              </div>
              <div className="Total">
                <p>Total</p>
                <p>$ {detailOrder[0].totalprice}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
}
