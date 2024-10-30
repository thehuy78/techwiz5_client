import React, { useCallback, useEffect, useState } from 'react';
import { useLayout } from "../hooks/Layout/LayoutContext";
import "../style/FormBooking.scss";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import LoadingPage from '../component/LoadingPage';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../hooks/Api/Api';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import GetImageFirebase from '../function/GetImageFirebase';
export default function FormBooking() {
  const { setLayout } = useLayout();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(true)
  const { id } = useParams();
  const [designer, setDesigner] = useState();
  const [activeDays, setActiveDay] = useState([]);
  const [time, setTime] = useState('12:00');

  const [cookies,] = useCookies()

  const userData = jwtDecode(cookies.autherize)
  console.log(userData);
  // State mới để lưu trữ ngày được chọn
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    setLayout("main");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setLayout]);

  const fetchDesigner = useCallback(async () => {
    try {
      const res = await apiRequest('GET', `DesigneFE/GetById/${id}`);
      if (res && res.data && res.data.status === 200) {
        if (res.data.data === null) {
          navigate("/");
        } else {
          setDesigner(res.data.data);


        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchDesigner();
  }, [fetchDesigner]);

  const catChuoi = (str) => {
    if (!str) return;
    const arr = str.split('-');
    const daywork = arr.map(day => {
      switch (day) {
        case "Mon": return 1;
        case "Tue": return 2;
        case "Wed": return 3;
        case "Thu": return 4;
        case "Fri": return 5;
        case "Sat": return 6;
        case "Sun": return 0;
        default: return -1;
      }
    }).filter(day => day !== -1);
    setActiveDay(daywork);
  };

  useEffect(() => {
    if (designer) {
      catChuoi(designer.daywork);
    }
  }, [designer]);

  const disableDates = ({ date }) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();
    return date < today || !activeDays.includes(dayOfWeek);
  };

  const formatWeekday = (locale, date) => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[date.getDay()];
  };

  const handleChangeTime = (e) => {
    setTime(e.target.value);
  };

  // Hàm onChange để lưu giá trị ngày được chọn
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const convertToSqlDateTime = (date) => {
    const pad = (n) => (n < 10 ? '0' + n : n);


    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());


    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    // Tạo chuỗi theo định dạng YYYY-MM-DD HH:MM:SS
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const Booking = async (e) => {
    e.preventDefault();
    setIsloading(true)
    setNoti("a")
    const address = document.getElementById("address");
    const message = document.getElementById("message");
    if (!selectedDate) {
      setNoti("date")
      setIsloading(false)
      return;
    }
    if (address.value.trim() === "") {
      setNoti("address")
      setIsloading(false)
      return;
    }


    console.log(convertToSqlDateTime(selectedDate));
    const formData = new FormData()
    formData.append("user_id", parseInt(userData.id));
    formData.append("designer_id", parseInt(id));

    formData.append("scheduled_datetime", convertToSqlDateTime(selectedDate)); // kieu datetime
    formData.append("time", time.toString()); // kieu string
    formData.append("address", address.value.trim())
    formData.append("notes", message && message.value ? message.value : "note:none")


    var res = await axios.post("https://localhost:7229/api/BookingFE/CreateBooking", formData)
    console.log(res)
    if (res && res.data && res.data.status === 200) {

      createNotification("success")();
      setIsloading(false)
      setTimeout(() => {
        navigate("/customer/booking")
      }, 1000);
    }
    // alert('Booking confirmed!');
  }



  const [noti, setNoti] = useState("")
  const createNotification = (type) => {
    return () => {
      NotificationManager.removeAll();
      switch (type) {
        case 'success':
          NotificationManager.success('Booking succesfuly!', 'Success', 2000);
          break;
        case 'date':
          NotificationManager.error('Select the day you want!', 'Booking Fail', 2000, () => {
            alert('callback');
          });
          break;
        case 'address':
          NotificationManager.error('Input your address!', 'Booking fail', 2000, () => {
            alert('callback');
          });
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

  if (isLoading) return <LoadingPage isloading={isLoading} />;

  return designer && (
    <div className='form_booking_page'>
      <NotificationContainer />
      {/* <LoadingPage isloading={isloading} /> */}
      <section className='sec1'>
        <p className='title'>BOOK APPOINTMENT</p>
      </section>
      <section className='sec2'>
        <div className='b_sec2_form_booking_page'>
          <div className='left'>
            <div className='designer_item_CO'>
              <div className='b_item'>
                <div className='background_hie'></div>
                <div className='b_img'>
                  <img src={designer.avatar ? GetImageFirebase(designer.avatar) : "https://tinyurl.com/2774tvkx"} alt='' />
                </div>
                <div className='content_profile'>
                  <p className='name'>{designer.first_name} {designer.last_name}</p>
                  <p className='experience'><span>Experience</span> {designer.yearsofexperience} years</p>
                  <p className='expertise'><span>Expertise</span> {designer.specialization}</p>
                </div>
                <div>
                  <div>
                    <p>{designer.count_review}</p>
                    <p>Reviews</p>
                  </div>
                  <div>
                    <p>{designer.count_booking}</p>
                    <p>Bookings</p>
                  </div>
                  <div>
                    <p>{designer.count_blog}</p>
                    <p>Blogs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>
            <form onSubmit={Booking}>
              <p className='tilte_fo'>Information</p>
              <div className='form_group'>
                <label>Address:</label>
                <input type="text" id='address' />
              </div>
              <div className='form_group'>
                <label>Date:</label>
                <Calendar
                  tileDisabled={disableDates}
                  formatShortWeekday={formatWeekday}
                  onChange={handleDateChange}
                  value={selectedDate || null}

                />
                <input type='time' onChange={handleChangeTime} value={time} />
              </div>
              <div className='form_group'>
                <label>Message:</label>
                <textarea id='message' />
              </div>
              <div className='b_btn'>
                <input type='submit' value="Book" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
