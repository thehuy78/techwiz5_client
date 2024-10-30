import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLayout } from "../hooks/Layout/LayoutContext";
import "../style/Designer.scss"
import Slider from "react-slick";
import DesignerItem from '../component/DesignerItem';
import { apiRequest } from '../hooks/Api/Api';
import LoadingPage from '../component/LoadingPage';
export default function Designer() {
    const { setLayout } = useLayout();
    const sec3Ref = useRef(null);
    const [isloading, setIsloading] = useState(true)
    useEffect(() => {
        setLayout("main");

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [setLayout])
    const handleScroll = () => {
        if (sec3Ref.current) {
            sec3Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [designer, setDesigner] = useState()
    const fetchDesigner = useCallback(async () => {
        try {
            var res = await apiRequest('GET', `DesigneFE`)
            console.log(res);
            if (res && res.data && res.data.status === 200) {
                const list = res.data.data;
                setDesigner(list);
                setTimeout(() => {
                    setIsloading(false)
                }, 500);
            }
            // setLoadingcomponent(false)
        } catch (error) {
            setTimeout(() => {
                setIsloading(false)
            }, 500);
        }
    }, [])

    useEffect(() => {
        setTimeout(async () => {
            fetchDesigner()

        }, 100);


    }, [fetchDesigner]);


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,

                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className='designer_page'>
            <LoadingPage isloading={isloading} />
            <section className='sec1' style={{ backgroundImage: `url(${require('../assets/images/livingroom/z5844676589251_a725b837344bd37a6da6537c50c78195.jpg')})` }}>
                <div className='content'>
                    <p className='t_1'>Schedule a consultation</p>
                    <p className='name_type'>DESIGNER</p>
                    <div className='b_discription'>
                        <p className='discription'>Meet with a designer who perfectly aligns with your style, and together, create an artistic living space that embodies contemporary elegance. Collaborate to bring your vision to life, ensuring your home reflects both your personality and the latest design trends.</p>
                        <p className='btn_scroll' onClick={handleScroll}><i className="fa-solid fa-angle-down"></i></p>
                    </div>
                </div>
            </section>
            <section className='sec2' ref={sec3Ref}>
                <div className='b_sec21'>
                    <div className='content'>
                        <div className='left'>
                            <p>DECOR VISTA</p>
                            <p>Meet with a designer who perfectly aligns with your style, and together, create an artistic living space that embodies contemporary elegance. Collaborate to bring your vision to life, ensuring your home reflects both your personality and the latest design trends.</p>
                        </div>
                        <div className='right'></div>
                        <div className='title'>EXPERIENCED DESIGNER</div>
                    </div>
                    <div className='list_designer'>
                        <Slider {...settings}>

                            {designer && designer.length > 0 && designer.map((item, index) => (
                                <DesignerItem key={index} item={item} />
                            ))}
                        </Slider>

                    </div>
                </div>
            </section>
            <section className='sec3'>
                <div className='item'>
                    <div className='left'>
                        <p className='title'>Research & Analyze</p>
                        <p className='discription'>Designers gather information on client needs, market trends, and target audiences to lay a solid foundation for the project.</p>
                    </div>
                    <div className='right'>
                        <p>01</p>
                    </div>
                </div>
                <div className='item'>
                    <div className='left'>
                        <p className='title'>Concept & Sketch</p>
                        <p className='discription'>Ideas are brainstormed and preliminary sketches are created to visualize the design direction and align with the client's vision.</p>
                    </div>
                    <div className='right'>
                        <p>02</p>
                    </div>
                </div>
                <div className='item'>
                    <div className='left'>
                        <p className='title'>Design & Brand</p>
                        <p className='discription'>Chosen concepts are refined into detailed designs, focusing on branding elements and materials to create a cohesive identity.</p>
                    </div>
                    <div className='right'>
                        <p>03</p>
                    </div>
                </div>
                <div className='item'>
                    <div className='left'>
                        <p className='title'>Market & Advertise</p>
                        <p className='discription'>Designs are promoted through targeted marketing strategies, showcasing the unique value to attract potential clients and generate interest.</p>
                    </div>
                    <div className='right'>
                        <p>04</p>
                    </div>
                </div>
            </section>

        </div>
    )
}
