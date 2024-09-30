import React, { useEffect, useRef, useState } from 'react';
import emailjs from "@emailjs/browser";
import { useLayout } from "../hooks/Layout/LayoutContext";
import "../style/Contactus.scss"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import LoadingPage from '../component/LoadingPage';
export default function Contact() {
    const form = useRef();
    const [noti, setNoti] = useState("")
    const { setLayout } = useLayout();
    const [isloading, setIsloading] = useState(true)
    useEffect(() => {
        setLayout("main");

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        setTimeout(() => {
            setIsloading(false)
        }, 500);
    }, [setLayout]);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_xyvd78s', 'template_g4nb4up', form.current, 'PPB36x1bm1gtVZqjk')
            .then((result) => {
                setNoti("Success");

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                form.current.reset();
            }, (error) => {
                setNoti("Error");
            });
    };


    const createNotification = (type) => {
        return () => {
            switch (type) {
                case 'Success':
                    NotificationManager.success('Send email successfully!', 'Success', 2000);
                    break;
                case 'Error':
                    NotificationManager.error('Send mail contact fail!', 'Error', 2000, () => {
                        alert('callback');
                    });
                    break;

                default:
                    break;
            }
        };
    };

    useEffect(() => {
        if (noti) {
            createNotification(noti)();
        }
    }, [noti]);

    return (
        <div className='contact_us'>
            <LoadingPage isloading={isloading} />
            <section className='b_0'>
                <div className='content'>
                    <p className='t_1'>DECOR VISTA</p>
                    <p className='name_type'>CONTACT US</p>
                    <div className='b_discription'>
                        <p className='discription'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
                        <p className='btn_scroll'><i className="fa-solid fa-angle-down"></i></p>
                    </div>
                </div>
            </section>
            <section className='b_1'>
                <div className='child'>
                    <div className='b_img'>
                        <img src={require("../assets/images/main/ht.jpg")} alt='' />
                    </div>
                    <div className='content'>
                        <p className='title'>Respect and Collaboration</p>
                        <p className='description'>We value individual opinions and encourage collaboration in all our work.</p>
                    </div>
                </div>
                <div className='child'>
                    <div className='b_img'>
                        <img src={require("../assets/images/main/st.jpg")} alt='' />
                    </div>
                    <div className='content'>
                        <p className='title'>Creativity and Innovation</p>
                        <p className='description'>Creativity and innovation are key drivers of our continuous growth.</p>
                    </div>
                </div>
                <div className='child'>
                    <div className='b_img'>
                        <img src={require("../assets/images/main/tn.jpg")} alt='' />
                    </div>
                    <div className='content'>
                        <p className='title'>Quality and Responsibility</p>
                        <p className='description'>We are committed to delivering top quality and always prioritize responsibility.</p>
                    </div>
                </div>
            </section>
            <section className='b_2'>
                <div className='info_company'>
                    <p className='title_info'>Get In Touch</p>
                    <p className='discription'>
                        Have any questions or partnership inquiries? Fill out the form below and we’ll get back to you shortly. Thank you!
                    </p>
                    <div className='box_img'></div>
                    <div className='list_contact'>
                        <div className='item'>
                            <i className="fa-solid fa-phone"></i>
                            <div className='b_ac'>
                                <p className='title'>Phone</p>
                                <p>(+84)098 098 788</p>
                            </div>
                        </div>
                        <div className='item'>
                            <i className="fa-solid fa-envelope"></i>
                            <div className='b_ac'>
                                <p className='title'>Email</p>
                                <p>techwiz@gmail.com</p>
                            </div>
                        </div>
                        <div className='item'>
                            <i className="fa-solid fa-location-dot"></i>
                            <div className='b_ac'>
                                <p className='title'>Address</p>
                                <p>590 CMT8,Q3,HCM</p>
                            </div>
                        </div>
                        <div className='item'>
                            <i className="fa-solid fa-earth-asia"></i>
                            <div className='b_ac'>
                                <p className='title'>Nation</p>
                                <p>Việt Nam</p>
                            </div>
                        </div>
                    </div>

                    <div className='social_media'>
                        <p className='title'>Social Media:</p>
                        <div className='list_social_contact'>
                            <Link className='link_tag'><i className="fa-brands fa-facebook"></i></Link>
                            <Link className='link_tag'><i className="fa-brands fa-youtube"></i></Link>
                            <Link className='link_tag'><i className="fa-brands fa-github"></i></Link>
                        </div>
                    </div>
                </div>
                <div className='b_form_contact'>
                    <form ref={form} onSubmit={sendEmail}>
                        <p className='title'>Contact support</p>
                        <div className='form_group'>
                            <label>Name</label>
                            <input type='text' placeholder='Name of unit/ Contact person' required name="user_name" maxLength={30} />
                        </div>
                        <div className='form_group'>
                            <label>Email</label>
                            <input type='email' placeholder='Input your Email' required name="user_email" />                        </div>
                        <div className='form_group'>
                            <label>Phone</label>
                            <input type='number' placeholder='Input your Phone' required name="user_phone" />                        </div>
                        <div className='form_group'>
                            <label>Message</label>
                            <textarea placeholder='Message' required name="message" />
                        </div>
                        <div className='form_btn'>
                            <input type='reset' value='Reset' />
                            <input type='submit' value='Send' />
                        </div>





                    </form>
                </div>

            </section>
            <section className='b_3'>
                <iframe title='map' className='item_map_if' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.325247631209!2d106.66371671091673!3d10.78638225896504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed23c80767d%3A0x5a981a5efee9fd7d!2zNTkwIMSQLiBDw6FjaCBN4bqhbmcgVGjDoW5nIDgsIFBoxrDhu51uZyAxMSwgUXXhuq1uIDMsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1726496565800!5m2!1svi!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>
            <NotificationContainer />


        </div>
    );
}
