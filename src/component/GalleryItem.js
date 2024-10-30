import React, { useCallback, useEffect, useState } from 'react'
import "../style/GalleryItem.scss"
import { Link, useNavigate } from 'react-router-dom'
import GetImageFirebase from '../function/GetImageFirebase';
import parse from 'html-react-parser';
import { apiRequest } from '../hooks/Api/Api';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

export default function GalleryItem({ item, callbackfn, bookmark }) {



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


    const [cookies] = useCookies();
    const navigate = useNavigate()

    const handleBookmark = async (id) => {
        try {
            if (!cookies.autherize) {
                navigate("/login")
            }
            const userdata = jwtDecode(cookies.autherize);
            console.log(userdata)
            const bookmarkres = {
                id_user: userdata.id,
                id_gallery: id
            }
            var res = await apiRequest("post", "BookmarkFE/SaveBookmark", bookmarkres)
            console.log(res)
            if (res.data.status === 200) {



                callbackfn()
            } else {
                alert("no")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkbookmark = (id) => {
        console.log(bookmark.some(item => item.gallery_id === id))
        return bookmark.some(item => item.gallery_id === id);
    }
    return (
        <div className='galleryItem_CO'>

            <div className='b_info'>
                <div className='b_1'>
                    <p className='name_company'>DECOR VISTA</p>
                    <i className={checkbookmark(item.id) ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"} onClick={() => handleBookmark(item.id)}></i>
                </div>

                <p className='name_gallery'>{item ? item.name : ""}</p>
                <p className='discription'> {item ? parse(item.description) : ""}</p>
                <div className='list_data'>
                    <div className='item'>
                        <p className='number'>+{item ? item.subcribes : ""}</p>
                        <p className='title'>Bookmarks</p>
                    </div>
                    <div className='item'>
                        <p className='number'>{item.product_count}</p>
                        <p className='title'>Items</p>
                    </div>
                    <div className='item'>
                        <p className='number'>{item ? item.color_tone : ""}</p>
                        <p className='title'>Tone</p>
                    </div>
                    <div className='item'>
                        <p className='number'>{item ? item.view_count : ""}</p>
                        <p className='title'>View</p>
                    </div>
                </div>
                <div className='b_btn'>
                    <Link className='link_tag' to={`/gallerydetail/${item.id}`}><div className='b_btn'><p>Go to gallery</p><i className="fa-solid fa-arrow-right"></i></div></Link>

                </div>
            </div>
            <div className='b_list_img'>
                <div className='b_img_left' style={{ backgroundImage: `url(${listImage[0]})` }}>
                </div>
                <div className='row'>
                    <div className='b_img_right_top' style={{ backgroundImage: `url(${listImage[1]})` }}></div>
                    <div className='column'>
                        <div className='b_img' style={{ backgroundImage: `url(${listImage[3]})` }}></div>
                        <div className='b_img' style={{ backgroundImage: `url(${listImage[4]})` }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export const GalleryItemComlumn = ({ item, callbackfn, bookmark }) => {


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


    const [cookies] = useCookies();
    const navigate = useNavigate()

    const handleBookmark = async (id) => {
        try {
            if (!cookies.autherize) {
                navigate("/login")
            }
            const userdata = jwtDecode(cookies.autherize);
            console.log(userdata)
            const bookmarkres = {
                id_user: userdata.id,
                id_gallery: id
            }
            var res = await apiRequest("post", "BookmarkFE/SaveBookmark", bookmarkres)
            console.log(res)
            if (res.data.status === 200) {

                callbackfn()
            } else {
                alert("no")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkbookmark = (id) => {
        console.log(bookmark.some(item => item.gallery_id === id))
        return bookmark.some(item => item.gallery_id === id);
    }
    return item && (
        <div className='galleryItem_CO_column'>

            <div className='b_info'>
                <div className='b_1'>
                    <p className='name_company'>DECOR VISTA</p>
                    <i className={checkbookmark(item.id) ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"} onClick={() => handleBookmark(item.id)}></i>
                </div>
                <p className='name_gallery'>{item.name}</p>
                <p className='discription'>{parse(item.description)}</p>
                <div className='list_data'>
                    <div className='item'>
                        <p className='number'>{item.subcribes}</p>
                        <p className='title'>Bookmarks</p>
                    </div>
                    <div className='item'>
                        <p className='number'>{item.product_count}</p>
                        <p className='title'>Items</p>
                    </div>
                    <div className='b_btn'>
                        <Link className='link_tag' to={`/gallerydetail/${item.id}`}><div className='b_btn'><p>Go to gallery</p><i className="fa-solid fa-arrow-right"></i></div></Link>

                    </div>

                </div>

            </div>
            <div className='b_list_img'>
                <div className='b_img_left' style={{ backgroundImage: `url(${listImage[0]})` }}>
                </div>
                <div className='row'>
                    <div className='b_img_right_top' style={{ backgroundImage: `url(${listImage[1]})` }}></div>
                    <div className='column'>
                        <div className='b_img' style={{ backgroundImage: `url(${listImage[2]})` }}></div>
                        <div className='b_img' style={{ backgroundImage: `url(${listImage[3]})` }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
