import React, { memo } from 'react'
import "../style/Footer.scss"
import footerjson from "../data/Footer.json"
import { Link } from 'react-router-dom'
function Footer() {

    return (
        <div className='footer'>
            <div className='container_footer'>
                <div className='b_1'>
                    <div className='b_image'>
                        <img src={require("../assets/images/logo/logo-06.png")} alt='' />
                    </div>
                    <div className='b_icon'>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-github"></i>
                        <i className="fa-brands fa-youtube"></i>
                        <i className="fa-brands fa-google"></i>
                    </div>
                </div>
                {footerjson.map((footer, index) => (
                    <div className='b_2' key={index}>
                        <p className='title' >{footer.title}</p>
                        <div className='list_child'>
                            {footer.child.map((child, indexs) => (
                                <Link to={child.path} key={indexs} className='link_tag'><p>{child.name}</p></Link>
                            ))}
                        </div>
                    </div>
                ))}
                <div className='b_3'>
                    <p className='title'>
                        <i className="fa-solid fa-envelope"></i>
                        <span>Subscribe for Updates! Enter your email to get the latest news.</span>
                    </p>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        <div className='form_group'>
                            <input type='email' placeholder='Enter your e-mail address'></input>
                        </div>
                        <div className='form_btn'>
                            <input type='submit' value={"Subscribe"} />
                        </div>
                    </form>
                </div>
            </div>
        </div >

    )
}
export default memo(Footer)
