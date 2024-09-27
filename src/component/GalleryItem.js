import React, { useCallback, useEffect, useState } from 'react'
import "../style/GalleryItem.scss"
import { Link } from 'react-router-dom'
import GetImageFirebase from '../function/GetImageFirebase';
import parse from 'html-react-parser';
export default function GalleryItem({ item }) {

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


    console.log(item);

    return (
        <div className='galleryItem_CO'>
            <div className='b_info'>
                <p className='name_company'>DECOR VISTA</p>
                <p className='name_gallery'>{item ? item.name : ""}</p>
                <p className='discription'> {item ? parse(item.description) : ""}</p>
                <div className='list_data'>
                    <div className='item'>
                        <p className='number'>+{item ? item.subcribes : ""}</p>
                        <p className='title'>Bookmarks</p>
                    </div>
                    <div className='item'>
                        <p className='number'>25</p>
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
                    <Link className='link_tag' to={`/gallerydetail/${item.id}`}><div className='b_btn'><p>Go to gallery</p><i class="fa-solid fa-arrow-right"></i></div></Link>

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




export const GalleryItemComlumn = ({ item }) => {


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
    return item && (
        <div className='galleryItem_CO_column'>
            <div className='b_info'>
                <p className='name_company'>DECOR VISTA</p>
                <p className='name_gallery'>{item.name}</p>
                <p className='discription'>{parse(item.description)}</p>
                <div className='list_data'>
                    <div className='item'>
                        <p className='number'>{item.subcribes}</p>
                        <p className='title'>Bookmarks</p>
                    </div>
                    <div className='item'>
                        <p className='number'>25</p>
                        <p className='title'>Items</p>
                    </div>
                    <div className='b_btn'>
                        <Link className='link_tag' to={`/gallerydetail/${item.id}`}><div className='b_btn'><p>Go to gallery</p><i class="fa-solid fa-arrow-right"></i></div></Link>

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
