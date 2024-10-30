import React, { useCallback, useEffect, useState } from 'react'
import "../style/OrderReview.scss"
import { Link } from 'react-router-dom'
import apiRequestForm, { apiRequest } from '../hooks/Api/Api'
import { useCookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'
import { formatDate } from '../function/FormatDate'
import GetImageFirebase from '../function/GetImageFirebase'
import StarRate from "../component/StarRate";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import LoadingPage from './LoadingPage';

export default function OrderReview() {
  const [orderReview, setOrderReview] = useState()

  const [cookies] = useCookies();
  const userdata = jwtDecode(cookies.autherize);

  const createNotification = useCallback((type) => {
    return () => {
      NotificationManager.removeAll();
      switch (type) {
        case 'Success':
          NotificationManager.success('Review succesfuly!', 'Success', 2000);
          break;
        case 'Error':
          NotificationManager.error('Review fails!', 'Fail', 2000, () => {
            alert('callback');
          });
          break;

        default:
          break;
      }
    };
  }, []);


  const fetchOrder = useCallback(async () => {
    try {
      var res = await apiRequest('Get', `ReviewFE/GetOrderReview/${userdata.id}`)
      console.log(res);
      if (res && res.data && res.data.status === 200) {
        const list = res.data.data;
        setOrderReview(list);
      }

      // setLoadingcomponent(false)
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setIsloading(false)
      }, 500);
    }
  }, [userdata.id])
  useEffect(() => {
    setTimeout(async () => {
      fetchOrder()

    }, 300);

  }, [fetchOrder])





  //modal render 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentreview, setCurrentReview] = useState(null);
  const openModal = (item) => {
    setCurrentReview(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentReview(null);
  };


  const [star, setStar] = useState(5);
  const handleRateStar = (value) => {
    console.log(value);
    setStar(value);
  };

  const handleSendFeedback = async () => {
    setIsloading(true)
    const formData = new FormData();
    var message = document.getElementById("message").value

    try {
      formData.append("user_id", currentreview.user_id);
      formData.append("comment", message && message.trim() !== "" ? message.trim() : "");
      formData.append("product_id", currentreview.product_id);
      formData.append("score", star);
      formData.append("orderId", currentreview.idOrder);
      formData.append("orderdetailId", currentreview.id_orderdetail);
      const response = await apiRequestForm("post",
        "ReviewFE/SendFeedBackProduct",
        formData
      );
      if (response && response.data && response.data.status === 200) {
        createNotification("Success")();
      }
      fetchOrder()
      setIsModalOpen(false);
    } catch (error) {
      message.error("Error Form : " + error);
      createNotification("Error")();
      return;
    } finally {
      setIsloading(false)
    }
  }
  const [isloading, setIsloading] = useState(true)
  return (
    <div className='list_order_review'>
      <LoadingPage isloading={isloading} />
      <NotificationContainer />
      <p className='title_order_review'>Review Order</p>
      <p>Rate the product so we can improve it</p>
      {orderReview && orderReview.length > 0 ?
        (
          <div className='list_order_item'>
            {orderReview && orderReview.length > 0 && orderReview.map((item, index) => (
              <div className='item' key={index}>
                <img className='img_pro' alt='' src={GetImageFirebase(item.image)} />
                <div className='info_product'>
                  <p className='name'>{item.name}</p>
                  <div className='list_varriant'>
                    {item.variants && item.variants.length > 0 && item.variants.map((items, index) => (
                      <p key={index} className='varriant_items'>{items.attributevalue}</p>
                    ))}
                  </div>

                </div>
                {/* <p className='date'>{formatDate(item.create_at)}</p> */}

                <button onClick={() => openModal(item)}>Review now</button>
              </div>
            ))}
          </div>
        ) : (<p style={{ textAlign: "center", color: "orange", padding: "3rem 0" }}>Not data</p>)
      }

      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close-button' onClick={closeModal}>&times;</span>
            <div className='b_modals'>
              <div className='item'>
                <img className='img_pro' alt='' src={GetImageFirebase(currentreview.image)} />
                <div className='info_product'>
                  <p className='name'>{currentreview.name}</p>
                  <div className='list_varriant'>
                    {currentreview.variants && currentreview.variants.length > 0 && currentreview.variants.map((items, index) => (
                      <p key={index} className='varriant_items'>{items.attributevalue}</p>
                    ))}
                  </div>

                </div>
                <StarRate
                  style={{ padding: "1rem 0" }}
                  handleRateStar={(value) => handleRateStar(value)}
                  initialRating={star || 5}
                />

                {/* <Link to={`/reviewproduct/${item.id}`}><button>Review now</button></Link> */}
              </div>
              <div className='b__cmt'>

                <textarea className='b_input' id="message" placeholder='Input you message...'></textarea>
                <button className='btn_send_feedback' onClick={handleSendFeedback}>Send Feedback</button>
              </div>
            </div>


          </div>
        </div>
      )}
    </div>
  )
}
