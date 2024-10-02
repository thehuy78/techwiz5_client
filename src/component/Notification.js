import React, { useState } from 'react'
import "../style/Notification.scss"
import { Link } from 'react-router-dom'



export default function Notification() {
  const [typeNotification, setTypeNotification] = useState(1)

  const handleChangeType = (value) => {
    setTypeNotification(value)
  }


  return (
    <div className='notification_CO'>
      <div className='sec_1'>
        <div className='left'>
          <p onClick={() => handleChangeType(1)} className={typeNotification === 1 ? "item_choice" : ""}><i class="fa-solid fa-clock"></i></p>
          <p onClick={() => handleChangeType(2)} className={typeNotification === 2 ? "item_choice" : ""}><i class="fa-solid fa-clipboard"></i></p>
          <p onClick={() => handleChangeType(3)} className={typeNotification === 3 ? "item_choice" : ""}><i class="fa-solid fa-bolt"></i></p>
          <p onClick={() => handleChangeType(4)} className={typeNotification === 4 ? "item_choice" : ""}><i class="fa-solid fa-gift"></i></p>
        </div>
        <div className='right'>
          <p> <i class="fa-solid fa-ellipsis-vertical"></i></p>
        </div>
      </div>
      <div className='sec_2'>
        {Array(10).fill().map((index) => (
          <div className='item' key={index}>
            <p className='date_notification'>01/07/2024</p>
            <p className='icon_type'><i class="fa-solid fa-clock"></i></p>
            <div className='b_content'>
              <p className='content'>Giao thành công kiện hàng #401371440, hãy cho Tiki biết trải nghiệm của bạn! Gấu Bông Sanrio Hình Kuromi Melody CinnaNhiều Màu Dễ Thương Nhỏ Đẹp Vải Mềm Mịn 25cm Quà Tặng Đáng... </p>
              <Link>Chi tiết</Link>

            </div>
            <p className='action_notification'><i class="fa-solid fa-trash-can"></i></p>
          </div>
        ))}
      </div>
    </div>
  )
}
