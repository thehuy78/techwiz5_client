import React from 'react'
import "../style/DesignerItem.scss"
import { Link } from 'react-router-dom'
import GetImageFirebase from '../function/GetImageFirebase';
export default function DesignerItem({ item }) {

    return item && (
        <div className='designer_item_CO'>
            <div className='b_item'>
                <div className='background_hie'></div>
                <div className='b_img'>
                    <img src={item.avatar ? GetImageFirebase(item.avatar) : "https://tinyurl.com/2774tvkx"} alt='' />

                </div>
                <div className='content_profile'>
                    <p className='name'>{item.first_name} {item.last_name}</p>
                    <p className='experience'><span>Experience</span>{item.yearsofexperience} years</p>

                    <p className='expertise'>{item.specialization}</p>
                    <div className='b_btn'>
                        <Link className='link_tag' to={`/designer/portfolio/${item.id}`}><button>Portfolio</button></Link>
                        <Link className='link_tag' to={`/booking/designer/${item.id}`}>  <button>Booking</button></Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
