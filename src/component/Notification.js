import React, { useCallback, useEffect, useState } from 'react'
import "../style/Notification.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'
import { apiRequest } from '../hooks/Api/Api'
import LoadingPage from './LoadingPage'
import { formatDate, formatDateNotTime } from '../function/FormatDate'


export default function Notification() {
  const [typeNotification, setTypeNotification] = useState("all")
  const [cookies] = useCookies()
  const navigate = useNavigate()
  const handleChangeType = (value) => {
    setTypeNotification(value)
  }






  const [isloading, setIsloading] = useState(true)
  const [notification, setNotification] = useState()
  const [notificationSave, setNotificationSave] = useState()
  const fetchNotification = useCallback(async () => {
    try {
      var user = jwtDecode(cookies.autherize)
      console.log(user);
      var rs = await apiRequest("Get", `NotificationFE/Get/${user.id}`)
      console.log(rs);
      if (rs && rs.data && rs.data.status === 200) {
        setNotification(rs.data.data)
        setNotificationSave(rs.data.data)
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsloading(false)
    }
  }, [cookies.autherize])


  useEffect(() => {
    if (notificationSave) {
      var filternoti = [...notificationSave]
      if (typeNotification !== "all") {
        filternoti = filternoti.filter((p) => p.type === typeNotification)
      }
      setNotification(filternoti)
    }
  }, [typeNotification, notificationSave]);

  useEffect(() => {
    setTimeout(() => {
      fetchNotification()
    }, 300);
  }, [fetchNotification]);


  const handleDetailNoti = async (id, url) => {
    try {
      var rs = await apiRequest("get", `NotificationFE/ReadAction/${id}`)
      if (rs && rs.data && rs.data.status === 200) {
        navigate(url)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRead = async (id, type, url) => {
    try {
      var rs = await apiRequest("get", `NotificationFE/ReadAction/${id}`)
      if (rs && rs.data && rs.data.status === 200) {
        if (type.includes("admin")) {
          fetchNotification()
        } else {
          navigate(url)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteNotification = async (id) => {
    try {
      var rs = await apiRequest("get", `NotificationFE/Deleted/${id}`)
      if (rs && rs.data && rs.data.status === 200) {
        fetchNotification()
      }
    } catch (error) {
      console.log(error);
    }
  }



  const [countIsreadNoti, setCountIsreadNoti] = useState({
    all: 0,
    main: 0,
    booking: 0,
    order: 0
  });

  useEffect(() => {
    if (notificationSave) {
      let allCount = 0;
      let mainCount = 0;
      let bookingCount = 0;
      let orderCount = 0;

      notificationSave.forEach(item => {
        if (!item.is_read) {
          allCount++;
          if (item.type === "customer:admin") {
            mainCount++;
          } else if (item.type === "customer:order") {
            orderCount++;
          } else if (item.type === "customer:booking") {
            bookingCount++;
          }
        }
      });

      setCountIsreadNoti({
        all: allCount,
        main: mainCount,
        booking: bookingCount,
        order: orderCount
      });
    }
  }, [notificationSave]);



  return (
    <div className='notification_CO'>
      <LoadingPage isloading={isloading} />
      <div className='sec_1'>
        <div className='left'>
          <p onClick={() => handleChangeType("all")} className={typeNotification === "all" ? "item_choice" : ""}><i class="fa-solid fa-clock"></i>{countIsreadNoti.all > 0 && (<span></span>)}</p>
          <p onClick={() => handleChangeType("customer:order")} className={typeNotification === "customer:order" ? "item_choice" : ""}><i class="fa-solid fa-basket-shopping"></i>{countIsreadNoti.order > 0 && (<span></span>)}</p>
          <p onClick={() => handleChangeType("customer:booking")} className={typeNotification === "customer:booking" ? "item_choice" : ""}><i class="fa-regular fa-calendar-days"></i>{countIsreadNoti.booking > 0 && (<span></span>)}</p>
          <p onClick={() => handleChangeType("customer:admin")} className={typeNotification === "customer:admin" ? "item_choice" : ""}><i class="fa-solid fa-gear"></i>{countIsreadNoti.main > 0 && (<span></span>)}</p>
        </div>
        <div className='right'>
          <p> <i class="fa-solid fa-ellipsis-vertical"></i></p>
        </div>
      </div>
      <div className='sec_2'>
        {/* <div className='item_action'>

          <p>Type</p>
          <p>Message</p>
          <p>Action</p>
        </div> */}
        <div className='list_item'>
          {notification && notification.length > 0 && notification.map((item, index) => (
            <div className="item" key={index} >

              <p className='icon_type'>{item.type.includes("order")
                ? (<i class="fa-solid fa-basket-shopping"></i>) : item.type.includes("booking")
                  ? (<i class="fa-regular fa-calendar-days"></i>) : item.type.includes("admin")
                    ? (<i class="fa-solid fa-gear"></i>) : (<i class="fa-solid fa-gear"></i>)}
                {!item.is_read && (
                  <span className='over_play_isread_notification'></span>
                )}
              </p>
              <div className='b_content'>
                <p className='content' onClick={() => handleRead(item.id, item.type, item.url)}>{item.message}</p>
                {!item.type.includes("admin") && (
                  <p className='link_tag' onClick={() => handleDetailNoti(item.id, item.url)} >Detail</p>
                )}
                <p className='date_notification'>{formatDate(item.created_date)}</p>

              </div>
              <p className='action_notification'><i class="fa-solid fa-trash-can" onClick={() => deleteNotification(item.id)}></i></p>
            </div>

          ))}
        </div>
      </div>
    </div >
  )
}
