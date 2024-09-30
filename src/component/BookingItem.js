import React, { useCallback, useEffect, useState } from 'react'
import "../style/BookingItem.scss"
import { apiRequest } from '../hooks/Api/Api';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { formatDateNotTime } from '../function/FormatDate';
import LoadingPage from './LoadingPage';
export default function BookingItem() {
  const [listBooking, setListBooking] = useState()
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




  return (
    <div className='booking_item_CO'>
      <LoadingPage isloading={isloading} />
      <div className='booking_item_CO_container'>
        <div className='b_filter'>
          <div className='b_search'>
            <input />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className='select_status'>
            <select>
              <option>All</option>
              <option>Pending</option>
              <option>Accept</option>
              <option>Cancel</option>
            </select>
          </div>
          <div className='filter_date'>
            <p>Filter Date: </p>
            <i className="fa-solid fa-arrow-up-wide-short"></i>
            <i className="fa-solid fa-arrow-down-wide-short"></i>
          </div>

        </div>
        <div className='b_list_booking'>
          {listBooking && listBooking.length > 0 ? listBooking.map((item, index) => (
            <div className='booking_item_container' key={index}>
              <img alt='' src="https://tinyurl.com/2774tvkx" />
              <div className='content'>
                <div className='name'>
                  <p>Designer:</p>
                  <p>{item.first_name} {item.last_name}</p>
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
                  <p>{item.status}</p>
                </div>

              </div>
            </div>
          )) : (
            <p>Not found</p>
          )}
        </div>
      </div>
    </div>
  )
}
