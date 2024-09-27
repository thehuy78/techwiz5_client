import React, { useEffect, useState } from 'react';
import { useLayout } from "../hooks/Layout/LayoutContext";
import "../style/ForgotPassword.scss"
import { Link } from 'react-router-dom';
import LoadingPage from '../component/LoadingPage';
import axios from 'axios';
export default function ForgotPassword() {
    const { setLayout } = useLayout();
    const [isloading, setIsloading] = useState(true)
    useEffect(() => {
        setLayout("auth");

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        setTimeout(() => {
            setIsloading(false)
        }, 500);
    }, [setLayout]);

    const handleForgotPassword = async () => {
        try {
            var formData = new FormData();
            formData.append("email", document.getElementById("email").value);
            const result = await axios.put("https://localhost:7229/api/AuthUser/ForgortPassword", formData);
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='forgot_password_page'>
            <LoadingPage isloading={isloading} />
            <form>
                <p className='title_1'>Forgot</p>
                <p className='title_2'>Your Password</p>
                <div className='form_group'>
                    <label>Email address:</label>
                    <input id="email" type='email' placeholder='Input email reset password' />
                </div>
                <div className='form_btn'>
                    <input type='button' value={"Reset Password"} onClick={handleForgotPassword} />
                </div>
            </form>
            <Link to={"/login"} className='back_to_home'>
                <i class="fa-solid fa-right-to-bracket"></i>
            </Link>
        </div>
    )
}
