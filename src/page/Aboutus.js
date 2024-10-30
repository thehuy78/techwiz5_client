import React, { useEffect, useState } from 'react'

import LoadingPage from '../component/LoadingPage'
import { useLayout } from "../hooks/Layout/LayoutContext";
import "../style/Aboutus.scss"
export default function Aboutus() {
  const [isloading, setIsloading] = useState(true)
  const { setLayout } = useLayout();
  useEffect(() => {
    setLayout("main");

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setTimeout(() => {
      setIsloading(false)
    }, 500);



  }, [setLayout]);

  return (
    <div className='about_us'>
      <LoadingPage isloading={isloading} />
      <section className='sec1'>
        <div className='b_content'>
          <p className='title_1'>ABOUT US</p>
          <p className='title_2'>Style Your House</p>
          <p className='title_3'>Style Your Life</p>

        </div>
      </section>
      <section className='sec2__'>
        <div className='b_sec'>
          <div className='left'>
            <p className='company_name'>ABOUT US</p>
            <p className='title'>Welcome to DecorVista, your ultimate destination for transforming living spaces into personalized havens of style and comfort.</p>
            <p className='discription'> Born from a passion for interior design and powered by cutting-edge technology, DecorVista bridges the gap between homeowners and professional interior designers, making exceptional design accessible to everyone.</p>
          </div>
          <div className='right'>
            <div></div>
            <div></div>
          </div>
        </div>
      </section>
      <section className='sec3__'>
        <div className='left_member'>
          <p className='title_sec3_'>Team Member</p>
          <p className='description'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Inte</p>
        </div>
        <div className='list_team'>
          <div className='top_row'>
            <div>


            </div>
            <div className='_b_avt_team_member linh_m'>DINH HOANG KHANH LINH</div>
            <div className='_b_avt_team_member giu_m'>PHAN VAN GIU</div>
            <div className='_b_avt_team_member mai_m'>NGUYEN THI NGOC MAI</div>
            <div></div>
          </div>
          <div className='bottom_row'>
            <div className='_b_avt_team_member tan_m'>NGO DINH TAN</div>
            <div className='_b_avt_team_member huy_m'>NGUYEN THE HUY</div>
            <div className='_b_avt_team_member viet_m'>TRAN QUOC VIET</div>
            <div className='_b_avt_team_member nhan_m'>NGUYEN THANH NHAN</div>
          </div>


        </div>



      </section>
      <section className='sec4'>
        <div className='top_b'>
          <p className='title'>Our Mission</p>
          <p className='description'>At DecorVista, our mission is to simplify the interior design process by providing a comprehensive, user-friendly platform that caters to both individuals seeking to beautify their homes and professionals aiming to showcase their expertise. We strive to inspire creativity, foster collaboration, and deliver high-quality design solutions tailored to diverse tastes and budgets.
          </p>
        </div>
        <div className='bottom_b'>
          <div className='item'>
            <img alt='' src={require("../assets/images/icon/sangtao.png")} />
            <p className='title'>Professional Consultations</p>
            <p className='description'>Connect with experienced interior designers through our seamless booking system. View designer profiles, schedule consultations, and receive personalized advice to bring your design ideas to life.</p>
          </div>
          <i className="fa-solid fa-arrow-right"></i>
          <div className='item'>
            <img alt='' src={require("../assets/images/icon/thanthien.png")} />
            <p className='title'>User-Friendly Dashboard</p>
            <p className='description'>Manage your saved designs, track your activities, and stay updated with the latest trends and product updates—all from your personalized dashboard</p>
          </div>
          <i className="fa-solid fa-arrow-right"></i>
          <div className='item'>
            <img alt='' src={require("../assets/images/icon/tuvan.png")} />
            <p className='title'>Community and Reviews</p>
            <p className='description'>Share your design journey, save favorite items, and provide feedback on products and designers to help others make informed decisions.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
