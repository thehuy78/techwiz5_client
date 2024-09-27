import React, { useEffect, useState } from 'react'
import { useLayout } from "../hooks/Layout/LayoutContext"
import "../style/Auth.scss"
import { Link, useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Company from "../data/Company.json"
import { apiRequest } from '../hooks/Api/Api';
import { jwtDecode } from "jwt-decode"; // Correct import
import { useCookies } from 'react-cookie';
import axios from 'axios';
export default function Auth() {
  const { setLayout } = useLayout();
  const [form, setForm] = useState(true);
  const [hasClicked, setHasClicked] = useState(false);

  const [showpass, setShowpass] = useState(false)
  const [showpassconfirm, setShowpassConfirm] = useState(false)
  const company = Company;
  const [, setCookie] = useCookies(['autherize']);
  const navigate = useNavigate();
  const [noti, setNoti] = useState("")
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case 'Success Lg':
          NotificationManager.success('Login succesfuly!', 'Success', 2000);
          break;
        case 'Error Lg Pw':
          NotificationManager.error('Password wrong!', 'Login Fail', 2000, () => {
            alert('callback');
          });
          break;
        case 'Error Lg Email':
          NotificationManager.error('Email not Exist!', 'Login Fail', 2000, () => {
            alert('callback');
          });
          break;
        case 'Success register':
          NotificationManager.success('Register succesfuly!', 'Success', 2000);
          break;
        case 'Error register':
          NotificationManager.error('Register invalid!', 'Error', 2000, () => {
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


  const validateForm = async (event) => {
    event.preventDefault();
    setNoti("")
    const firstNameInput = document.getElementById("fn_re");
    const lastNameInput = document.getElementById("ln_re");
    const emailInput = document.getElementById("email_re");
    const passwordInput = document.getElementById("pw_re");
    const passwordConfirmInput = document.getElementById("pw_cf_re");
    const err_email = document.querySelector(".error_email");
    const err_pw = document.querySelector(".error_password");
    const err_pw_cf = document.querySelector(".error_password_confirm");
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordConfirm = passwordConfirmInput.value.trim();
    const errorSpans = document.querySelectorAll('.error');
    errorSpans.forEach(span => span.style.display = 'none');
    firstNameInput.style.border = '';
    lastNameInput.style.border = '';
    emailInput.style.border = '';
    passwordInput.style.border = '';
    passwordConfirmInput.style.border = '';
    let isValid = true;
    if (!firstName) {
      firstNameInput.style.border = '0.1rem solid red';
      firstNameInput.style.display = 'block';
      isValid = false;
    }
    if (!lastName) {
      lastNameInput.style.border = '0.1rem solid red';
      lastNameInput.style.display = 'block';
      isValid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      emailInput.style.border = '0.1rem solid red';
      err_email.style.display = 'block';
      err_email.innerHTML = "* Invalid email format"
      isValid = false;
    }
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
    if (!password.match(passwordPattern)) {
      passwordInput.style.border = '0.1rem solid red';
      err_pw.style.display = 'block';
      err_pw.innerHTML = "* Password must be 8-16 characters"
      isValid = false;
    }
    if (password !== passwordConfirm || passwordConfirm === "") {
      passwordConfirmInput.style.border = '0.1rem solid red';
      err_pw_cf.style.display = 'block';
      err_pw_cf.innerHTML = "* Password confirm not match"
      isValid = false;
    }
    if (isValid) {
      const formData = {
        email: email,
        password: password,
        userdetails: {
          first_name: firstName,
          last_name: lastName
        }
      }
      try {
        // const res = await apiRequest('post', 'AuthUser/Register', formData)
        const res = await axios.post('https://localhost:7229/api/AuthUser/Register', formData);

        if (res && res.data && res.data.status === 200) {

          setNoti("Success register")
        }
      } catch (error) {
        console.log(error);
        setNoti("Error register")
      }
      event.target.reset();

    }
  }
  const Checklogin = async (event) => {
    event.preventDefault();
    const emailInput = document.getElementById("email_lg")
    const passwordInput = document.getElementById("pw_lg")
    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()
    emailInput.style.border = '';
    passwordInput.style.border = '';
    const account = {
      email: email,
      password: password
    }
    var notiLogin = ""
    try {
      // var res = await apiRequest('post', 'AuthUser/Login', account)
      const res = await axios.post('https://localhost:7229/api/AuthUser/Login', account);
      console.log(res);
      if (res && res.data && res.data.data && res.data.status === 200) {
        const jwttoken = jwtDecode(res.data.data)
        var exp = new Date()
        exp.setHours(exp.getHours() + 1);
        setCookie("autherize", res.data.data, { expires: exp })

        event.target.reset();
        notiLogin = "Success Lg"
        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    } catch (error) {
      notiLogin = "Error Lg Email"
    }
    setNoti(notiLogin)
  }




  useEffect(() => {
    setLayout("auth");
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [setLayout]);

  const handleChoiForm = () => {
    setForm(prev => !prev);
    setHasClicked(true);
    setShowpass(false)
  };



  return (
    <section className='auth_container'>
      <NotificationContainer />
      <Link to={"/"} className='back_to_home'>
        <i class="fa-solid fa-right-to-bracket"></i>
      </Link>
      <div className='b_auth'>
        <div className={`b_form_auth ${hasClicked ? (form ? 'show-login' : 'show-register') : ''}`}>
          <div className='b_login'>
            <div className='b_1'>
              <p>{company.name}</p>
              <select>
                <option>vi</option>
                <option>en</option>
              </select>
            </div>
            <div className='b_2'>
              <div className='b_title'>
                <p>Hi Friend</p>
                <p>Welcome to {company.name}</p>
              </div>
              <form className='b_form' onSubmit={(event) => Checklogin(event)}>
                <div className='form_group'>
                  <label>Email</label>

                  <i className="fa-solid fa-user icon_lg_input"></i>
                  <input placeholder='Enter your email' id='email_lg'></input>
                </div>
                <div className='form_group'>
                  <label>Password</label>
                  <i className="fa-solid fa-key icon_lg_input"></i>
                  <input placeholder='Enter your password' type={showpass ? "text" : "password"} id='pw_lg'></input>
                  <i class={`fa-regular ${showpass ? 'fa-eye-slash' : 'fa-eye'} show_password`} onClick={() => {
                    setShowpass(prev => !prev)
                  }}></i>
                </div>
                <div className='b_forgot'><Link className='tag_link' to={"/forgot"}>Forgot password?</Link></div>

                <div className='form_btn'>
                  <input type='submit' value={"Login"} className='btn_login' />
                </div>

                <div className='b_decor'><p className='or'><span>or</span></p></div>
              </form>
              <div className='b_btn_gmail'>
                <input type='submit' value={"Login with Email"} className='btn_email' />
              </div>
              <div className='b_icon'>
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-github"></i>
                <i class="fa-brands fa-linkedin"></i>
              </div>

            </div>
          </div>
          <div className='b_register'>
            <div className='b_1'>
              <p>{company.name}</p>
              <select>
                <option>vi</option>
                <option>en</option>
              </select>
            </div>
            <div className='b_2'>
              <div className='b_title'>
                <p>REGISTER</p>
                <p>Welcome to {company.name}</p>
              </div>
              <form className='b_form' onSubmit={validateForm}>
                <div className='form_group_2c'>
                  <i className="fa-solid fa-user icon_lg_input"></i>
                  <div className='b_input_name'>
                    <div className='form_group'>
                      <label>First name</label>
                      <input placeholder='First name' id='fn_re'></input>

                    </div>
                    <div className='form_group form_group_lastname'>
                      <label>Last name</label>
                      <input placeholder='Last name' id='ln_re'></input>

                    </div>
                  </div>
                </div>
                <div className='form_group'>
                  <label>Email</label>
                  <i className="fa-solid fa-envelope icon_lg_input"></i>
                  <input placeholder='Enter your email' id='email_re'></input>
                  <span className='error_email error'></span>
                </div>

                <div className='form_group'>
                  <label>Password</label>
                  <i className="fa-solid fa-key icon_lg_input"></i>
                  <input placeholder='Enter your password' type={showpass ? "text" : "password"} id='pw_re'></input>
                  <span className='error_password error'></span>
                  <i class={`fa-regular ${showpass ? 'fa-eye-slash' : 'fa-eye'} show_password`} onClick={() => {
                    setShowpass(prev => !prev)
                  }}></i>
                </div>
                <div className='form_group'>
                  <label>Password Confirm</label>
                  <i className="fa-solid fa-key icon_lg_input"></i>
                  <input placeholder='Enter your password Confirm' type={showpassconfirm ? "text" : "password"} id='pw_cf_re'></input>
                  <span className='error_password_confirm error'></span>
                  <i class={`fa-regular ${showpassconfirm ? 'fa-eye-slash' : 'fa-eye'} show_password`} onClick={() => {
                    setShowpassConfirm(prev => !prev)
                  }}></i>
                </div>

                <div className='form_btn'>
                  <input type='submit' value={"Register"} className='btn_login' />
                </div>
              </form>

              <div className='b_icon'>
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-github"></i>
                <i class="fa-brands fa-linkedin"></i>
              </div>

            </div>
          </div>
        </div>
        <div className='b_choice'>
          <div>
            <p className='title'>Welcome Back</p>
            <p>
              Enter personal details to your user account
            </p>
          </div>
          <div className='b_btn'>
            <button onClick={handleChoiForm}>{!form ? "Sign In" : "Register"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
