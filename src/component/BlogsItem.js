import React from 'react'
import "../style/BlogItem.scss"
import Infomation from './Infomation';
import parse from 'html-react-parser';
import GetImageFirebase from '../function/GetImageFirebase';
import { formatDateBlogDetail } from "../function/FormatDate"
import { Link } from 'react-router-dom';
export default function BlogsItem({ item }) {

  return item && (
    <div className='blogs_item_column_CO'>
      <div className='blogs_item_column_CO_container'>
        <div className='blog_info_item'>
          <Link style={{ textDecoration: "none" }} to={`/blogdetail/${item.id}`}><p className='title_blogs_item'>{item.title}</p></Link>
          <p className='date_create_blogs'>{formatDateBlogDetail(item.createdDate)}</p>
          {/* <p className='discription_blogs'>{parse(item.content)}</p> */}
        </div>
        <div className='b_img'>
          <img alt='' src={GetImageFirebase(item.images)} />
        </div>
      </div>
    </div>
  )
}
