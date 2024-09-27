import React, { useEffect, useState } from "react";
import "../style/Customer.scss";
import Item from "../data/Customer.json";
import AccountComponent from "../component/AccountComponent";
import DeliveryInfomation from "../component/DeliveryInfomation";
import ListOrder from "../component/ListOrder";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useLayout } from "../hooks/Layout/LayoutContext";

import BookingItem from "../component/BookingItem";
import LoadingPage from "../component/LoadingPage";
import OrderReview from "../component/OrderReview";
import { jwtDecode } from "jwt-decode";
export default function Customer() {
  const [activeIndex, setActiveIndex] = useState(Item[0].id);
  const { setLayout } = useLayout();

  const [cookie, setCookie, removeCookie] = useCookies(["autherize"]);

  const [cookies] = useCookies();

  const userData = jwtDecode(cookies.autherize);
  console.log(userData);
  const [noti, setNoti] = useState("");
  const [isloading, setIsloading] = useState(true);
  const navigate = useNavigate();
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
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const LogOut = () => {
    // Remove the cookie by specifying the cookie's name
    removeCookie("autherize");

    // Optionally, you can set a notification for the logout event
    setNoti("logout");

    // Redirect the user after 1 second
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const createNotification = (type) => {
    return () => {
      switch (type) {
        case "logout":
          NotificationManager.success("Logout succesfuly!", "Success", 2000);
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
  return (
    <div className="customer">
      <NotificationContainer />
      <LoadingPage isloading={isloading} />
      <div className="b_customer">
        <div className="navigation_customer">
          <div className="b_navigation_customer">
            <div className="info_cus">
              <div className="b_img">
                <img src="https://tinyurl.com/2774tvkx" alt="" />
              </div>
              <div className="b_info">
                <p>
                  {userData && userData.first_name}{" "}
                  {userData && userData.last_name}
                </p>
                <p>
                  <i class="fa-regular fa-gem"></i> Silver
                </p>
              </div>
            </div>
            <div className="list_navigation_customer">
              {Item.map((items, index) => (
                <div
                  key={index}
                  className={
                    activeIndex === items.id ? "b_item b_item_choice" : "b_item"
                  }
                >
                  <div
                    className={`item ${
                      activeIndex === items.id ? "active" : ""
                    }`}
                    onClick={() => handleClick(items.id)}
                  >
                    <i class={items.icon}></i>
                    {items.name}
                  </div>
                </div>
              ))}
              <div className="b_item">
                <div
                  className={`item ${activeIndex === "logout" ? "active" : ""}`}
                  onClick={LogOut}
                >
                  <i class="fa-solid fa-right-to-bracket"></i>
                  Log Out
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mocup_customer">
          {(() => {
            switch (activeIndex) {
              case "account":
                return <AccountComponent />;

              case "booking":
                return <BookingItem />;
              case "order":
                return <ListOrder />;
              case "notification":
                return (
                  <div className="notification_component">Notification</div>
                );
              case "review":
                return <OrderReview />;
              case "bookmark":
                return <div className="support_component">Incomming...</div>;
              case "logout":
                return null;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
}
