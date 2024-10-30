import React from 'react'
import "../style/ProductItem.scss"
import Star from './Star'
import { Link } from 'react-router-dom'
import GetImageFirebase from '../function/GetImageFirebase';
export default function ProductItem({ pro }) {

    return pro && (
        <div className='productItem_CO'>
            <div className='b_img_pro'>
                <img src={pro.imageName ? GetImageFirebase(pro.imageName) : null} alt='' />
            </div>
            <div className='content_pro'>
                <div className='b_1_content'>
                    <div className='b_typeroom_content'>
                        <p className='type_room'>{pro.functionality_name} </p>
                        {/* <i className="fa-regular fa-bookmark"></i> */}
                    </div>

                    <Link className="link_tag" to={`/detail/${pro.id}`}><p className='name_pro'>{pro.productName}</p></Link>
                    <div className='b_price'>
                        <p>$ {pro.price}</p>
                        <p>{pro.brand}</p>
                    </div>
                </div>
                <div className='b_2_content'>

                    <Link className='link_tag' to={`/detail/${pro.id}`}> <p className='add_to_cart_box'>  <i className="fa-solid fa-cart-shopping"></i></p></Link>
                    <div>
                        <Star number={pro.score} />
                    </div>
                </div>
            </div>

        </div>
    )
}
