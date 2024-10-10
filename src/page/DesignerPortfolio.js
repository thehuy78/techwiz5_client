import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLayout } from "../hooks/Layout/LayoutContext";
import "../style/DesignerPortfolio.scss"
import { Link, useParams } from 'react-router-dom';
import Infomation from '../component/Infomation';
import Slider from "react-slick";
import "../style/BlogItem.scss"
import Star from '../component/Star';
import BlogsItem from '../component/BlogsItem';
import { apiRequest } from '../hooks/Api/Api';
import LoadingPage from '../component/LoadingPage';
import GetImageFirebase from '../function/GetImageFirebase';
export default function DesignerPortfolio() {
  const { setLayout } = useLayout();
  const [paddingTop, setPaddingTop] = useState(0);
  const [isloading, setIsloading] = useState(true)
  let sliderRef = useRef(null);

  useEffect(() => {
    setLayout("main");
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const b1Element = document.querySelector('.b_1');
    if (b1Element) {
      const b1Height = b1Element.offsetHeight;
      const remValue = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const paddingValue = b1Height - (3 * remValue);
      setPaddingTop(paddingValue);
    }
  }, [setLayout]);

  const { id } = useParams();

  const [designer, setDesigner] = useState()
  const fetchDesigner = useCallback(async () => {
    try {
      var res = await apiRequest('GET', `DesigneFE/GetById/${id}`)
      console.log(res.data.data)
      if (res && res.data && res.data.status === 200) {
        if (res.data.data === null) {
          navigator("/")
        }
        setTimeout(() => {
          setIsloading(false)
        }, 500);
        const list = res.data.data;
        setDesigner(list);
      }
      // setLoadingcomponent(false)
    } catch (error) {
      console.log(error)
    }
  }, [id])

  useEffect(() => {
    setTimeout(async () => {
      fetchDesigner()
    }, 100);
  }, [fetchDesigner]);

  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    fade: false,
    easing: "ease-in-out"
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    fade: true,
    easing: "ease-in-out"

  };


  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };



  const [isExpanded, setIsExpanded] = useState(false);
  const text = "Today I'm sharing the second leg of my recent 12-day road trip around northern Spain with my friend Becky: the beautiful province of La Rioja, just over an hour's drive south of our starting point Bilbao on the other side of the Sierra Cantabria mountain range. La Rioja is world-famous for its high-quality wines and contains three separate wine-making regions"
  const displayText = (text) => {
    return isExpanded ? text : text.slice(0, 100) + '...';
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };


  //modal render 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const openModal = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };



  return designer && (
    <div className='designer_portfolio_page'>
      <LoadingPage isloading={isloading} />
      <section className='sec1'>
        <div className='b_content'>
          <p className='title_1'>Design for your home</p>
          <p className='title_2'>Designer with experience in the furniture industry</p>
          <p className='title_3'>Decor with Designer</p>
          <p className='btn_scroll'><i className="fa-solid fa-angles-down"></i></p>
        </div>
      </section>
      <section className='sec2'>
        <div className='b_sec'>
          <div className='b_1'>
            <div className='left'>
              <div className='top'>
                <p className='name_web'>DECOR VISTA</p>
                <p>Design is not just about creating beauty, but about solving problems with limitless creativity.</p>
              </div>
              <div className='bottom'>
                <div className='item'>
                  <p>{designer.yearsofexperience}+</p>
                  <p>Experience</p>
                </div>
                <div className='item'>
                  <p>{designer.count_booking}+</p>
                  <p>Booking</p>
                </div>
                <div className='item'>
                  <p>{designer.count_review}+</p>
                  <p>Reivew</p>
                </div>
                <div className='item'>
                  <p>{designer.specialization}</p>
                  <p>Design style</p>
                </div>
                <div className='item'>
                  <p>{designer.daywork}</p>
                  <p>Day Work</p>
                </div>
              </div>
            </div>
            <div className='right'>
              <img alt='' src={require("../assets/images/main/tn.jpg")} />
            </div>
          </div>
          <div className='b_2' style={{ paddingTop: `${paddingTop}px` }}>
            <img alt='' src={GetImageFirebase(designer.avatar)} />
            <div className='content'>
              <p className='title'>DESIGNER</p>
              <p className='name_designer'>Hello, I'am <span>{designer.first_name} {designer.last_name}</span></p>
              <div className='b_contact'>
                <div className='contact_phone'>
                  <p>Phone Number: </p>
                  <p>{designer.contact_number}</p>
                </div>
                <div className='contact_daywork'>
                  <p className='title_daywork'>Day work: </p>
                  <div className='list_day'>
                    <p>{designer.daywork}</p>

                  </div>

                </div>
                <div className='button'>
                  <Link className='link_tag' to={`/booking/designer/${designer.id}`}> <p>Book appointment</p></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='sec4'>
        <div className='left'>
          <p>Why choose me</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
        </div>
        <div className='right'>
          <div className='b_item_'>
            <img src={require("../assets/images/main/ht.jpg")} alt='' />
            <div className='content_'>
              <p className='title_'>Fast Building</p>
              <p className='discription'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
            </div>
          </div>
          <div className='b_item_'>
            <img src={require("../assets/images/main/ht.jpg")} alt='' />
            <div className='content_'>
              <p className='title_'>Fast Building</p>
              <p className='discription'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
            </div>
          </div>
          <div className='b_item_'>
            <img src={require("../assets/images/main/ht.jpg")} alt='' />
            <div className='content_'>
              <p className='title_'>Fast Building</p>
              <p className='discription'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
            </div>
          </div>
          <div className='b_item_'>
            <img src={require("../assets/images/main/ht.jpg")} alt='' />
            <div className='content_'>
              <p className='title_'>Fast Building</p>
              <p className='discription'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
            </div>
          </div>
        </div>
      </section>

      <section className='sec8'>
        <div className='left'>
          <div className='f_1'>
            <p className='title__'>Degree</p>
            <Link className='link_tag'>
              <p>See all</p>
            </Link>
          </div>

          <div className='list_img'>
            {Array(6).fill().map((index) => (
              <img src={require("../assets/images/background/des.png")}
                onClick={() => openModal(require("../assets/images/background/des.png"))}
                key={index} alt='' />
            ))}
          </div>
        </div>
        <div className='right'>
          <div className='r_1'>
            <p className='r_1_title'>Article</p>
            <div className='r_1_filter'>
              <input type='date' />
              <input type='date' />
            </div>
          </div>
          <div className='time_line'>
            <div className='item_story'>
              <div className='info_item'>
                <img alt='' src={GetImageFirebase(designer.avatar)} />
                <div className='name_date'>
                  <p className='name'>Nguyen the huy</p>
                  <p className='create_date'>12/12/1222</p>
                </div>
              </div>
              <div className='b_content'>

                <div className='box_des'>
                  <p className="content">{displayText(text)}
                    <span className='btn___' onClick={handleToggle}>
                      {isExpanded ? 'Collapse' : 'See more'}</span>
                  </p>

                </div>

                <div className='gallary_story'>
                  <div className='b_1img'>
                    <img alt='' src={require("../assets/images/background/kitchen.jpg")} />
                  </div>
                </div>
              </div>

            </div>

            <div className='item_story'>
              <div className='info_item'>
                <img alt='' src={GetImageFirebase(designer.avatar)} />
                <div className='name_date'>
                  <p className='name'>Nguyen the huy</p>
                  <p className='create_date'>12/12/1222</p>
                </div>
              </div>
              <div className='b_content'>

                <div className='box_des'>
                  <p className="content">{displayText(text)}
                    <span className='btn___' onClick={handleToggle}>
                      {isExpanded ? 'Collapse' : 'See more'}</span>
                  </p>

                </div>

                <div className='gallary_story'>
                  <div className='b_3img'>
                    <img alt='' src={require("../assets/images/background/kitchen.jpg")} />

                    <img alt='' src={require("../assets/images/background/kitchen.jpg")} />

                    <img alt='' src={require("../assets/images/background/kitchen.jpg")} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className='sec3'>
        <div className='b_sec3'>

          <p className='title_portfolio_info'>Portfolio Information</p>

          <div className='list_show'>
            <Infomation item={designer.portfolio} />
          </div>
        </div>

      </section>
      <section className='sec7'>
        <div className='sec7_container'>
          <Slider {...settings}>
            {Array(6).fill().map((index) => (
              <div key={index} className='b_review_item' >
                <div className='container_item'>
                  <img src="https://tinyurl.com/2774tvkx" alt='' />
                  <div className='box_content'>
                    <p className='name_user'>Nguyen The Huy</p>
                    <p className='date_create'>19/09/2024 13:23</p>
                    <p className='cmt'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <div className='box_rare'>
                      <Star number={5} key={1} />

                    </div>
                  </div>
                </div>
              </div>
            ))}

          </Slider>
        </div>
      </section>
      <section className='sec5'>
        <div className='b_sec5'>
          <div className='item_sec5'>
            <p>DECOR VISTA</p>
            <p>BEDROOM CONCEPT</p>
            <p>Find your insight</p>
          </div>
          <div className='item_sec5'>
            <p>DECOR VISTA</p>
            <p>KITCHEN CONCEPT</p>
            <p>Find your insight</p>
          </div>
          <div className='item_sec5'>
            <p>DECOR VISTA</p>
            <p>BATHROOM CONCEPT</p>
            <p>Find your insight</p>
          </div>
          <div className='item_sec5'>
            <p>DECOR VISTA</p>
            <p>OFFICE CONCEPT</p>
            <p>Find your insight</p>
          </div>
        </div>
      </section>
      <section className='sec6'>
        <div className='b_sec6'>
          <div className='title_sec6_'>
            <p>DECOR VISTA</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
          <div className='list_blogs'>
            <Slider
              ref={slider => {
                sliderRef = slider;
              }}
              {...settings1}
            >
              {Array(5).fill().map((index) => (
                <BlogsItem key={index} />
              ))}
            </Slider>

          </div>
          <div style={{ textAlign: "center" }} className='box_btn'>

            <p className='btn_scroll' onClick={previous}><i className="fa-solid fa-angle-down"></i></p>

            <p className='btn_scroll' onClick={next}><i className="fa-solid fa-angle-down"></i></p>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close-button' onClick={closeModal}>&times;</span>
            <img src={currentImage} alt='' className='modal-image' />
          </div>
        </div>
      )}
    </div>
  );
}
