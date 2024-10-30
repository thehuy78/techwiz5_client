import React, { useCallback, useEffect, useRef, useState } from 'react'
import "../style/Collection.scss"

import { GalleryItemComlumn } from '../component/GalleryItem'
import Slider from "react-slick";
import { useLayout } from "../hooks/Layout/LayoutContext";


import { apiRequest } from '../hooks/Api/Api';
import LoadingPage from '../component/LoadingPage';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
export default function Collection() {
    let sliderRef = useRef(null);
    let sliderRef1 = useRef(null);
    const sec3Ref = useRef(null);
    const { setLayout } = useLayout();
    const [isloading, setIsloading] = useState(true)

    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };

    const next1 = () => {
        sliderRef1.slickNext();
    };
    const previous1 = () => {
        sliderRef1.slickPrev();
    };

    const [roomtypeActive, setRoomtypeActive] = useState("livingroom")
    const [gallery, setGallery] = useState()
    const [gallerysave, setGallerySave] = useState()
    const [roomtype, setRoomType] = useState()





    const fetchGallery = useCallback(async () => {
        try {
            var res = await apiRequest('GET', `GalleryFE`)


            if (res && res.data && res.data.status === 200) {
                const gallery = res.data.data;
                setGallery(gallery);
                setGallerySave(gallery)
                setTimeout(() => {
                    setIsloading(false)
                }, 500);
            }

            // setLoadingcomponent(false)
        } catch (error) {
            console.log(error)
            setTimeout(() => {
                setIsloading(false)
            }, 500);
        }
    }, [])


    const fetchRoomType = useCallback(async () => {
        try {
            var res = await apiRequest('GET', `RoomTypeFE`)
            if (res && res.data && res.data.status === 200) {
                const roomtype = res.data.data;

                setRoomType(roomtype);
            }

            // setLoadingcomponent(false)
        } catch (error) {
            console.log(error)
        }
    }, [])


    useEffect(() => {
        setTimeout(async () => {
            fetchGallery()

            fetchRoomType()
        }, 100);


    }, [fetchGallery, fetchRoomType]);


    useEffect(() => {
        const filteredList = gallerysave && gallerysave.length > 0 && gallerysave.filter((gallery) =>
            roomtypeActive ? gallery.stringurl === roomtypeActive : true
        );
        setGallery(filteredList)
        console.log(filteredList);
    }, [roomtypeActive, gallerysave]);


    useEffect(() => {
        setLayout("main");

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });



    }, [setLayout]);


    const handleScroll = () => {
        if (sec3Ref.current) {
            sec3Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        easing: "ease-in-out"
    };
    const settings1 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        easing: "ease-in-out"
    };






    const navigate = useNavigate()
    const [cookies] = useCookies();
    const [bookmark, setBookmark] = useState([])
    const fetchbookmark = useCallback(async () => {
        try {
            if (!cookies.autherize) {

                return
            }
            const userdata = jwtDecode(cookies.autherize);
            var res = await apiRequest("Get", `BookmarkFE/Getall/${userdata.id}`)
            console.log(res)

            if (res && res.data && res.data.status === 200) {
                setBookmark(res.data.data)
            }

        } catch (error) {

        }
    }, [cookies.autherize])

    useEffect(() => {
        setTimeout(() => {
            fetchbookmark()
        }, 200);
    }, [fetchbookmark])



    var kitchen = `url(${require("../assets/images/kitchen/z5844678842798_e549c4a061b0389dfcc45b04ba368bbe.jpg")})`;
    var bedroom = `url(${require("../assets/images/bedroom/z5844680924585_b5d3a930edc20f8b55f0fd27e847c1e9.jpg")})`;
    var livingroom = `url(${require("../assets/images/livingroom/z5844676588843_5038f03bf0ecd2f0c6bc4b075fad7788.jpg")})`;
    var bathroom = `url(${require("../assets/images/bathroom/z5844677192960_eea356a86888843b14ff66810a006609.jpg")})`;
    var office = `url(${require("../assets/images/office/z5844677832083_72c20258926550dafc0c0b28da77673d.jpg")})`;
    var outdoor = `url(${require("../assets/images/outdoor/z5844677410057_f821c5624029f9fabb1f82b438a02913.jpg")})`;


    return (
        <div className='collection_page' >
            <LoadingPage isloading={isloading} />
            <section className='sec1' style={{ backgroundImage: `url(${require('../assets/images/background/kitchen1.jpg')})` }}>
                <div className='content'>
                    <p className='t_1'>INSPIRATION</p>
                    <p className='name_type'>GALLERY</p>
                    <div className='b_discription'>
                        <p className='discription'>Gallery is where Decor Vista proudly refers to as a virtual museum showcasing a collection of artistic works in interior design and living spaces. The Inspiration Gallery will provide our customers with a wealth of artistic inspiration, helping them to shape their style and desires.</p>
                        <p className='btn_scroll' onClick={handleScroll}><i className="fa-solid fa-angle-down"></i></p>
                    </div>
                </div>
            </section>
            <section className='sec2'>
                <div className='left'>
                    <p className='title'>STYLISH & FUNCTIONAL SPACE DESIGN</p>
                    <p className='discription'>Creating a stylish and functional space design is essential for enhancing both aesthetics and practicality in any home. A well-designed space harmonizes beauty with usability, ensuring that every element serves a purpose while reflecting personal style. From choosing the right furniture that complements the overall decor to optimizing layouts for maximum efficiency, each decision contributes to a cohesive environment. Whether it's an inviting living room, a productive home office, or a serene bedroom, the goal is to create spaces that not only look good but also foster comfort and functionality, ultimately improving the quality of life for those who inhabit them.</p>
                    <p className='btn_scroll'><i className="fa-solid fa-angle-down"></i></p>

                </div>
                <div className='right'>
                    <div></div>
                    <div></div>
                </div>
            </section>
            <section className='sec3'>
                <div className='title_sec3'>WHAT WE DO</div>
                <div className='body_sec3'>
                    <div className='left'>
                        <div className='item'>
                            <p>+999</p>
                            <p>Collection is for sale</p>
                        </div>
                        <div className='item'>
                            <p>+599</p>
                            <p>Loyal customers</p>
                        </div>
                        <div className='item'>
                            <p>+99</p>
                            <p>Furniture collection</p>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='b_1'>
                            <div className='border'></div>
                            <div className='item'>
                                <p className='title'>Make your dream come true</p>
                                <p className='discription'>
                                    Decor Vista is known for turning dream homes into reality, with hundreds of curated collections tailored to reflect each customer's vision and lifestyle.</p>
                            </div>
                        </div>
                        <div className='b_2' >
                            <div className='border'></div>
                            <div className='item'>
                                <p className='title' >Loyal Customer Network</p>
                                <p className='discription' ref={sec3Ref}>Customers provide positive feedback after each collaboration and consistently return to Decor Vista for their next needs. Thousands have become our loyal companions—what about you?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='sec4' >
                <div className='list_type_room'>
                    <p className='title'>TYPE ROOM</p>
                    {roomtype && roomtype.length > 0 && roomtype.map((item, index) => (
                        <div
                            onClick={() => {
                                setRoomtypeActive(item.url)
                            }}
                            className={roomtypeActive === item.url ? "item itemchoice" : "item"}
                            key={index}
                            style={{ backgroundImage: item.url === "livingroom" ? livingroom : item.url === "bedroom" ? bedroom : item.url === "bathroom" ? bathroom : item.url === "kitchen" ? kitchen : item.url === "office" ? office : outdoor }}
                        >
                            {item.name.toUpperCase()}
                        </div>
                    ))}
                </div>
                <div className='list_gallery_show'>
                    <div className='b_title'>
                        <p className='title_sec4'>VIEW GALLERY</p>
                        <div style={{ textAlign: "center" }} className='box_btn'>

                            <p className='btn_scroll' onClick={previous}><i className="fa-solid fa-angle-down"></i></p>

                            <p className='btn_scroll' onClick={next}><i className="fa-solid fa-angle-down"></i></p>
                        </div>
                    </div>

                    <div className="slider-container">
                        {gallery && gallery.length > 0 && (
                            <Slider
                                ref={slider => {
                                    sliderRef = slider;
                                }}
                                {...settings}
                            >{
                                    gallery && gallery.length > 0 && gallery.map((items, index) => (
                                        <GalleryItemComlumn item={items} bookmark={bookmark} callbackfn={fetchbookmark} key={index} />
                                    ))
                                }
                            </Slider>
                        )}

                    </div>
                </div>

            </section>
            <section className='sec5'>
                <div className='b_sec5'>
                    <div className='b_title'>

                        <div className='box_btn'>

                            <p className='btn_scroll' onClick={previous1}><i className="fa-solid fa-angle-down"></i></p>

                            <p className='btn_scroll' onClick={next1}><i className="fa-solid fa-angle-down"></i></p>
                        </div>
                    </div>

                    <div className="slider-container">
                        <Slider
                            ref={slider1 => {
                                sliderRef1 = slider1;
                            }}
                            {...settings1}
                        >
                            <div className='b_img' >
                                <img alt='' src={require("../assets/images/background/kitchen.jpg")} />
                            </div>
                            <div className='b_img'>
                                <img alt='' src={require("../assets/images/background/kitchen1.jpg")} />
                            </div>
                            <div className='b_img'>
                                <img alt='' src={require("../assets/images/background/badrooom.jpg")} />
                            </div>

                        </Slider>

                    </div>
                </div>
            </section>
        </div>
    )
}
