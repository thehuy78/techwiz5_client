import React from 'react'
import "../style/CompanyProfile.scss"
export default function CompanyProfile() {
  return (
    <div className='company_profile'>

      <div className='left'>
        <img src={require("../assets/images/main/com.jpg")} alt='' />
        <div className='b_content__'>
          <div className='content_'>
            <p>Decor Vista</p>
            <p>Phone number: 0987654321</p>
            <p>Email: techwiz5@gmail.com</p>
            <p>Address: 590 CMT8 Q3 HCM</p>
          </div>
        </div>
      </div>
      <div className='right'>
        <div className='b_right'>
          <div className='b_1'>
            <p>Welcome to</p>
            <img src={require("../assets/images/logo/logo-05.png")} alt='' />

          </div>
          <div className='b_2'>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div>
          <div className='b_3'>
            <div className='item'>
              <div className='b_img'>
                <img alt='' src={require("../assets/images/icon/chinhhangwhite.png")} />
              </div>
              <div className='content'>
                <p>Lorem Ipsum is simply dummy</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>
            <div className='item'>
              <div className='b_img'>
                <img alt='' src={require("../assets/images/icon/thanthienwhite.png")} />
              </div>
              <div className='content'>
                <p>Lorem Ipsum is simply dummy</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>
            <div className='item'>
              <div className='b_img'>
                <img alt='' src={require("../assets/images/icon/sangtaowhite.png")} />
              </div>
              <div className='content'>
                <p>Lorem Ipsum is simply dummy</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>
          </div>
          <div className='b_4'>
            <img alt='' src={require("../assets/images/main/chuky.png")} />
            <p>CEO FOUNDER DERCOR VISTA</p>
          </div>
        </div>
      </div>
    </div>
  )
}
