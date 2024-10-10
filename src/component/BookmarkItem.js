import React, { useCallback, useEffect, useState } from 'react'
import GetImageFirebase from '../function/GetImageFirebase';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { apiRequest } from '../hooks/Api/Api';

export default function BookmarkItem({ item, fncallback }) {
    const [listImage, setListImage] = useState([])
    const parserImage = useCallback(() => {
        var stringImg = item && item.imageName ? item.imageName : null;
        if (stringImg != null) {
            const items = stringImg.split('; ').filter(item => item.trim() !== "");
            var list = [];
            items.forEach(element => {
                element = GetImageFirebase(element);
                list.push(element)
            });

            setListImage(list);
        }
    }, [item]);

    useEffect(() => {
        parserImage();
    }, [parserImage]);

    console.log(item)
    const navigate = useNavigate()
    const [cookies] = useCookies();
    const handleBookmark = async (id) => {
        try {
            if (!cookies.autherize) {
                navigate("/login")
            }
            if (window.confirm("Are you sure?")) {
                const userdata = jwtDecode(cookies.autherize);
                console.log(userdata)
                const bookmarkres = {
                    id_user: userdata.id,
                    id_gallery: id
                }
                var res = await apiRequest("post", "BookmarkFE/SaveBookmark", bookmarkres)
                console.log(res)
                if (res.data.status === 200) {
                    fncallback()

                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    return item && (
        <div className='bookmark_item_component'>
            <div className='galleryItem_bookmark'>

                <div className='b_info'>
                    <div className='b_1'>
                        <p className='name_company'>DECOR VISTA</p>
                        <i className={"fa-solid fa-bookmark"} onClick={() => handleBookmark(item.id)}></i>
                    </div>
                    <p className='name_gallery'>{item.gallery_name}</p>

                    <div className='list_data'>
                        <div className='item'>
                            <p className='number'>{item.color_tone}</p>
                            <p className='title'>Tone</p>
                        </div>
                        {/* <div className='item'>
                            <p className='number'>25</p>
                            <p className='title'>Items</p>
                        </div> */}
                        <div className='item'>
                            <p className='number'>{item.view_count}</p>
                            <p className='title'>View</p>
                        </div>



                    </div>
                    <div className='b_btn'>
                        <Link className='link_tag' to={`/gallerydetail/${item.id}`}><div className='b_btn'><p>Go to gallery</p><i className="fa-solid fa-arrow-right"></i></div></Link>

                    </div>

                </div>
                <div className='b_list_img'>

                    <div className='row'>
                        <div className='b_img_right_top' style={{ backgroundImage: `url(${listImage[1]})` }}></div>
                        <div className='column'>
                            <div className='b_img' style={{ backgroundImage: `url(${listImage[2]})` }}></div>
                            <div className='b_img' style={{ backgroundImage: `url(${listImage[0]})` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
