import React, { useCallback, useEffect, useState } from "react";
import { useLayout } from "../hooks/Layout/LayoutContext";
import "../style/Auth.scss";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Company from "../data/Company.json";
import LoadingPage from "../component/LoadingPage";
import { useCookies } from "react-cookie";
import { apiRequest } from "../hooks/Api/Api";
// import axios from 'axios';
export default function Auth() {
  const { setLayout } = useLayout();
  const [form, setForm] = useState(true);
  const [hasClicked, setHasClicked] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const [showpassconfirm, setShowpassConfirm] = useState(false);
  const company = Company;
  const [, setCookie] = useCookies(["autherize"]);
  const navigate = useNavigate();

  const createNotification = useCallback((type) => {
    return () => {
      NotificationManager.removeAll();
      switch (type) {
        case "Success Lg":
          NotificationManager.success("Login succesfuly!", "Success", 2000);
          break;
        case "Error Lg Pw":
          NotificationManager.error(
            "Password wrong!",
            "Login Fail",
            2000,
            () => {
              alert("callback");
            }
          );
          break;
        case "Error Lg Email":
          NotificationManager.error(
            "Email not Exist!",
            "Login Fail",
            2000,
            () => {
              alert("callback");
            }
          );
          break;
        case "Success register":
          NotificationManager.success("Register succesfuly!", "Success", 2000);
          break;
        case "Error register":
          NotificationManager.error("Register invalid!", "Error", 2000, () => {
            alert("callback");
          });
          break;
        default:
          break;
      }
    };
  }, []);

  const validateForm = async (event) => {
    event.preventDefault();

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
    const errorSpans = document.querySelectorAll(".error");
    errorSpans.forEach((span) => (span.style.display = "none"));
    firstNameInput.style.border = "";
    lastNameInput.style.border = "";
    emailInput.style.border = "";
    passwordInput.style.border = "";
    passwordConfirmInput.style.border = "";
    let isValid = true;
    if (!firstName) {
      firstNameInput.style.border = "0.1rem solid red";
      firstNameInput.style.display = "block";
      isValid = false;
    }
    if (!lastName) {
      lastNameInput.style.border = "0.1rem solid red";
      lastNameInput.style.display = "block";
      isValid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      emailInput.style.border = "0.1rem solid red";
      err_email.style.display = "block";
      err_email.innerHTML = "* Invalid email format";
      isValid = false;
    }
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
    if (!password.match(passwordPattern)) {
      passwordInput.style.border = "0.1rem solid red";
      err_pw.style.display = "block";
      err_pw.innerHTML = "8-16 characters include letter, number";
      isValid = false;
    }
    if (password !== passwordConfirm || passwordConfirm === "") {
      passwordConfirmInput.style.border = "0.1rem solid red";
      err_pw_cf.style.display = "block";
      err_pw_cf.innerHTML = "* Password confirm not match";
      isValid = false;
    }
    if (isValid) {
      setIsloading(true);
      const formData = {
        email: email,
        password: password,
        userdetails: {
          first_name: firstName,
          last_name: lastName,
        },
      };
      try {
        const res = await apiRequest("post", "AuthUser/Register", formData);
        // const res = await axios.post('https://localhost:7229/api/', formData);
        setIsloading(false);
        if (res && res.data && res.data.status === 200) {
          setForm(true);
          createNotification("Success register")();
        }
      } catch (error) {
        console.log(error);
        setIsloading(false);
        createNotification("Error register")();
      }
      event.target.reset();
    }
  };
  const Checklogin = async (event) => {
    event.preventDefault();
    setIsloading(true);
    const emailInput = document.getElementById("email_lg");
    const passwordInput = document.getElementById("pw_lg");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    emailInput.style.border = "";
    passwordInput.style.border = "";
    const account = {
      email: email,
      password: password,
    };
    try {
      var res = await apiRequest("post", "AuthUser/Login", account);
      // const res = await axios.post('https://localhost:7229/api/AuthUser/Login', account);
      setIsloading(false);
      if (res && res.data && res.data.data && res.data.status === 200) {
        var exp = new Date();
        exp.setDate(exp.getDate() + 1);
        setCookie("autherize", res.data.data, {
          expires: exp,
          path: "/",
        });
        event.target.reset();
        createNotification("Success Lg")();

        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (error) {
      setIsloading(false);
      createNotification("Error Lg Email")();
    }
  };

  useEffect(() => {
    setLayout("auth");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [setLayout]);

  const handleChoiForm = () => {
    setForm((prev) => !prev);
    setHasClicked(true);
    setShowpass(false);
  };

  useEffect(() => {
    window.handleCredentialResponse = handleCredentialResponse;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    document.body.appendChild(script);
    return () => {
      delete window.handleCredentialResponse;
    };
  }, []);

  const handleCredentialResponse = async (response) => {
    var resp = jwtDecode(response.credential);
    console.log(resp);
    const formData = {
      email: resp.email,
      password: "gg",
      userdetails: {
        first_name: resp.given_name,
        last_name: resp.family_name,
      },
    };

    try {
      var res = await apiRequest("Post", "AuthUser/LoginGoogle", formData);
      if (res && res.data && res.data.data && res.data.status === 200) {
        var exp = new Date();
        exp.setDate(exp.getDate() + 1);
        setCookie("autherize", res.data.data, { expires: exp, path: "/" });
        createNotification("Success Lg")();

        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (error) {
      createNotification("Error Lg Email")();
    }
  };

  return (
    <section className="auth_container">
      <NotificationContainer />
      <LoadingPage isloading={isloading} />
      <Link to={"/"} className="back_to_home">
        <i className="fa-solid fa-right-to-bracket"></i>
      </Link>
      <div className="b_auth">
        <div
          className={`b_form_auth ${
            hasClicked ? (form ? "show-login" : "show-register") : ""
          }`}
        >
          <div className="b_login">
            <div className="b_1">
              <p>{company.name}</p>
              <select>
                <option>vi</option>
                <option>en</option>
              </select>
            </div>
            <div className="b_2">
              <div className="b_title">
                <p>Hi Friend</p>
                <p>Welcome to {company.name}</p>
              </div>
              <form className="b_form" onSubmit={(event) => Checklogin(event)}>
                <div className="form_group">
                  <label>Email</label>

                  <i className="fa-solid fa-user icon_lg_input"></i>
                  <input placeholder="Enter your email" id="email_lg"></input>
                </div>
                <div className="form_group">
                  <label>Password</label>
                  <i className="fa-solid fa-key icon_lg_input"></i>
                  <input
                    placeholder="Enter your password"
                    type={showpass ? "text" : "password"}
                    id="pw_lg"
                  ></input>
                  <i
                    className={`fa-regular ${
                      showpass ? "fa-eye-slash" : "fa-eye"
                    } show_password`}
                    onClick={() => {
                      setShowpass((prev) => !prev);
                    }}
                  ></i>
                </div>
                <div className="b_forgot">
                  <Link className="tag_link" to={"/forgot"}>
                    Forgot password?
                  </Link>
                </div>

                <div className="form_btn">
                  <input type="submit" value={"Login"} className="btn_login" />
                </div>

                <div className="b_decor">
                  <p className="or">
                    <span>or</span>
                  </p>
                </div>
              </form>
              <div className="b_btn_gmail">
                <div className="box_email_login">
                  <div
                    id="g_id_onload"
                    data-client_id="678669696146-eavok6hpljl2uvig7vkgnai0o2n4pk7f.apps.googleusercontent.com"
                    data-callback="handleCredentialResponse"
                  ></div>

                  <div
                    style={{ width: "100%" }}
                    className="g_id_signin custom"
                    data-type="standard"
                    // data-width="100%"
                    data-size="medium"
                    data-theme="filled_black"
                    data-text="continue_with"
                    data-shape="rectangular"
                    data-logo_alignment="center"
                  ></div>
                </div>
              </div>
              <div className="b_icon">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-github"></i>
                <i className="fa-brands fa-linkedin"></i>
              </div>
            </div>
          </div>
          <div className="b_register">
            <div className="b_1">
              <p>{company.name}</p>
              <select>
                <option>vi</option>
                <option>en</option>
              </select>
            </div>
            <div className="b_2">
              <div className="b_title">
                <p>REGISTER</p>
                <p>Welcome to {company.name}</p>
              </div>
              <form className="b_form" onSubmit={validateForm}>
                <div className="form_group_2c">
                  <i className="fa-solid fa-user icon_lg_input"></i>
                  <div className="b_input_name">
                    <div className="form_group">
                      <label>First name</label>
                      <input placeholder="First name" id="fn_re"></input>
                    </div>
                    <div className="form_group form_group_lastname">
                      <label>Last name</label>
                      <input placeholder="Last name" id="ln_re"></input>
                    </div>
                  </div>
                </div>
                <div className="form_group">
                  <label>Email</label>
                  <i className="fa-solid fa-envelope icon_lg_input"></i>
                  <input placeholder="Enter your email" id="email_re"></input>
                  <span className="error_email error"></span>
                </div>

                <div className="form_group">
                  <label>Password</label>
                  <i className="fa-solid fa-key icon_lg_input"></i>
                  <input
                    placeholder="Enter your password"
                    type={showpass ? "text" : "password"}
                    id="pw_re"
                  ></input>
                  <span className="error_password error"></span>
                  <i
                    className={`fa-regular ${
                      showpass ? "fa-eye-slash" : "fa-eye"
                    } show_password`}
                    onClick={() => {
                      setShowpass((prev) => !prev);
                    }}
                  ></i>
                </div>
                <div className="form_group">
                  <label>Password Confirm</label>
                  <i className="fa-solid fa-key icon_lg_input"></i>
                  <input
                    placeholder="Enter your password Confirm"
                    type={showpassconfirm ? "text" : "password"}
                    id="pw_cf_re"
                  ></input>
                  <span className="error_password_confirm error"></span>
                  <i
                    className={`fa-regular ${
                      showpassconfirm ? "fa-eye-slash" : "fa-eye"
                    } show_password`}
                    onClick={() => {
                      setShowpassConfirm((prev) => !prev);
                    }}
                  ></i>
                </div>

                <div className="form_btn">
                  <input
                    type="submit"
                    value={"Register"}
                    className="btn_login"
                  />
                </div>
              </form>

              <div className="b_icon">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-github"></i>
                <i className="fa-brands fa-linkedin"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="b_choice">
          <div>
            <p className="title">Welcome Back</p>
            <p>Enter personal details to your user account</p>
          </div>
          <div className="b_btn">
            <button onClick={handleChoiForm}>
              {!form ? "Sign In" : "Register"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
