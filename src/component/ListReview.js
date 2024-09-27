import React from 'react'
import { formatDate } from "../function/FormatDate"
import Star from './Star';
import "../style/ListReview.scss"
import Infomation from "./Infomation"
export default function ListReview({ review }) {
  console.log(review);
  return review && review.length > 0 && (
    <div className='listReview'>
      {/* {review && review.length > 0 && review.map((item, index) => (
        <div className='item_review'>
          <div className='b____1'>  <p>{item.user.userdetails.last_name} {item.user.userdetails.first_name}</p>
            <p><Star number={item.score} /></p></div>

          <p className='date____'>{formatDate(item.create_at)}</p>
          <p><Infomation item={item.comment} /></p>
        </div>
      ))} */}
    </div>
  )
}
