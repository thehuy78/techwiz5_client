import React, { useCallback, useEffect, useState } from 'react'
import "../style/BookingItem.scss"
import apiRequestForm, { apiRequest } from '../hooks/Api/Api';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { formatDateNotTime } from '../function/FormatDate';
import LoadingPage from './LoadingPage';
import StarRate from './StarRate';
import GetImageFirebase from "../function/GetImageFirebase"
export default function BookingItem() {
  const [listBooking, setListBooking] = useState()
  const [listBookingSave, setListBookingSave] = useState()
  const [cookies] = useCookies()
  const [isloading, setIsloading] = useState(true)

  const fetchBooking = useCallback(async () => {

    try {
      const user = jwtDecode(cookies.autherize)
      var res = await apiRequest("Get", `BookingFE/ListBooking/${user.id}`);
      setTimeout(() => {
        setIsloading(false)
      }, 500);

      console.log(res.data.data);
      if (res && res.data && res.data.status === 200) {
        setListBooking(res.data.data);
        setListBookingSave(res.data.data)

      }
      // setLoading(false)
    } catch (error) {
      console.log("get product detail fails");
    }
  }, [cookies]);

  useEffect(() => {
    setTimeout(async () => {
      fetchBooking();
    }, 100);
  }, [fetchBooking]);

  const changeSelect = (e) => {
    setFilterState((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };
  const [filterState, setFilterState] = useState({
    status: "all",
    search: ""
  })

  const changeInputSearch = (e) => {
    setFilterState((prev) => ({
      ...prev,
      search: e.target.value.trim(),
    }));
  }


  useEffect(() => {
    if (listBookingSave) {
      let filteredBooking = [...listBookingSave];
      filteredBooking = filteredBooking.filter((booking) =>
        booking.first_name
          .toLowerCase()
          .includes(filterState.search.toLowerCase())
        ||
        booking.last_name
          .toLowerCase()
          .includes(filterState.search.toLowerCase())
      );

      if (filterState.status !== "all") {
        filteredBooking = filteredBooking.filter(
          (p) => p.status === filterState.status
        );
      }
      setListBooking(filteredBooking);
    }
  }, [filterState, listBookingSave]);



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
    const formData = new FormData();
    var message = document.getElementById("message").value
    const user = jwtDecode(cookies.autherize)
    try {
      formData.append("user_id", user.id);
      formData.append("score", star);
      formData.append("id_booking", currentreview.id);
      formData.append("comment", message.trim());

      const response = await apiRequestForm("post",
        "ReviewFE/SendFeedBackConsultation",
        formData
      );
      fetchBooking()
      setIsModalOpen(false);
    } catch (error) {
      message.error("Error Form : " + error);
      return;
    }
  }


  return (
    <div className='booking_item_CO'>
      <LoadingPage isloading={isloading} />
      <div className='booking_item_CO_container'>
        <div className='b_filter'>
          <div className='b_search'>
            <input type='search' id='search_booking_item' onChange={changeInputSearch} />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className='select_status'>
            <select onChange={changeSelect}>
              <option value={"all"}>All</option>
              <option value={"pending"}>Pending</option>
              <option value={"accepted"}>Accepted</option>
              <option value={"finished"}>Finished</option>
              <option value={"denied"}>Denied</option>
            </select>
          </div>
          <div className='filter_date'>
            {/* <p>Filter Date: </p>
            <i className="fa-solid fa-arrow-up-wide-short"></i>
            <i className="fa-solid fa-arrow-down-wide-short"></i> */}
          </div>

        </div>
        <div className='b_list_booking'>
          {listBooking && listBooking.length > 0 ? listBooking.map((item, index) => (
            <div className='booking_item_container' key={index}>
              <img alt='' src={GetImageFirebase(item.avatar)} />
              <div className='content'>
                <div className='name'>
                  <p>Designer:</p>
                  <p className='fullname_box'>{item.first_name} {item.last_name}</p>
                </div>
                <div className='date_booking'>
                  <p>Date:</p>
                  <p>{formatDateNotTime(item.scheduled_date)} - {item.scheduled_time}</p>
                </div>
                <div className='status'>
                  <p>Contact:</p>
                  <p>{item.contact_number}</p>
                </div>
                <div className='status'>
                  <p>Status:</p>
                  <p className={item.status === "pending" ? "pending" : item.status === "accepted" ? "accepted" : item.status === "denied" ? "denied" : "finished"}>{item.status}</p>
                </div>

              </div>
              {
                item.status === "finished" && !item.review && (
                  <p className='btn_rate_overlay' onClick={() => openModal(item)}>Rating</p>
                )
              }

            </div>
          )) : (
            <p>Not found</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close-button' onClick={closeModal}>&times;</span>
            <div className='b_modals'>
              <div className='item'>

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
