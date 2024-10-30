import React, { memo, useEffect, useState } from 'react';
import "../style/Navbar.scss";
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {  // Giả sử chiều cao 50px là chiều cao của navbar
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener khi component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const [cookies,] = useCookies()
    const [user, setUser] = useState()
    useEffect(() => {
        if (cookies && cookies.autherize) {
            console.log(jwtDecode(cookies.autherize));
            setUser(jwtDecode(cookies.autherize))
        } else {
            setUser(null)
        }

    }, [cookies]);

    return (
        <div className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className='header_left'>
                <div className='b_img'>
                    <Link to={"/"}> <img src={require("../assets/images/logo/logo-11.png")} alt='' /></Link>
                </div>
                <div className='list_router'>
                    <Link className='link_tag' to={"/product"}><p>Product</p></Link>
                    <Link className='link_tag' to={"/roomconcept/livingroom"}><p>Room Concept</p></Link>
                    <Link className='link_tag' to={"/collection"}><p>Gallery</p></Link>
                    <Link className='link_tag' to={"/designer"}><p>Designer</p></Link>
                    <Link className='link_tag' to={"/blog"}><p>Blogs</p></Link>
                </div>
            </div>
            <div className='header_right'>
                {/* <div className='b_search_navbar'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input />
                </div> */}
                <Link to={"/customer/notification"}><i className="fa-solid fa-bell"></i></Link>
                <Link to={"/cart"}><i className="fa-solid fa-basket-shopping"></i></Link>
                <div className='b_login_btn_nav'>
                    <Link className='link_tag' to={user ? "/customer/account" : "/login"}><button className='login'>{user && user.last_name ? user.last_name : "Login"}</button></Link>
                </div>
            </div>
        </div>
    );
}

export default memo(Navbar);
