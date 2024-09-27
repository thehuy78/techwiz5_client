import React from 'react'
import "../style/BlogItem.scss"
export default function BlogsItem() {
  return (
    <div className='blogs_item_column_CO'>
      <div className='blogs_item_column_CO_container'>
        <div className='blog_info_item'>
          <p className='title_blogs_item'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <p className='date_create_blogs'>19/08/2024 14:50</p>
          <p className='discription_blogs'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
        </div>
        <div className='b_img'>
          <img alt='' src={require("../assets/images/livingroom/z5844676588843_5038f03bf0ecd2f0c6bc4b075fad7788.jpg")} />
        </div>
      </div>
    </div>
  )
}
