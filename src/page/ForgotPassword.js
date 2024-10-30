import React, { useCallback, useEffect, useState } from 'react';
import { useLayout } from "../hooks/Layout/LayoutContext";
import "../style/ForgotPassword.scss"
import { Link, useNavigate } from 'react-router-dom';
import LoadingPage from '../component/LoadingPage';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
export default function ForgotPassword() {
    const { setLayout } = useLayout();
    const [isloading, setIsloading] = useState(true)
    const navigate = useNavigate()
    const createNotification = useCallback((type) => {
        return () => {
            NotificationManager.removeAll();
            switch (type) {
                case 'Success':
                    NotificationManager.success('Reset Password succesfuly!', 'Success', 2000);
                    break;
                case 'Error':
                    NotificationManager.error('Email not exist!', 'Fail', 2000, () => {
                        alert('callback');
                    });
                    break;

                default:
                    break;
            }
        };
    }, []);
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
        setIsloading(true)
        try {
            var formData = new FormData();
            formData.append("email", document.getElementById("email").value);
            const result = await axios.put("https://localhost:7229/api/AuthUser/ForgortPassword", formData);
            if (result && result.data) {
                if (result.data.status === 200) {
                    createNotification("Success")()
                    setTimeout(() => {
                        navigate("/login")
                    }, 500);
                } else {
                    createNotification("Error")()
                }

            }
            console.log(result)
        } catch (error) {
            createNotification("Error")()
        } finally {
            setTimeout(() => {
                setIsloading(false)
            }, 200);

        }
    }
    return (
        <div className='forgot_password_page'>
            <NotificationContainer />
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
                <i className="fa-solid fa-right-to-bracket"></i>
            </Link>
        </div>
    )
}
