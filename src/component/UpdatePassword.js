import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import LoadingPage from '../component/LoadingPage';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useNavigate } from "react-router-dom";
export default function UpdatePassword() {
  const [showpassold, setShowpassold] = useState(false);
  const [showpassnew, setShowpassnew] = useState(false);
  const [showpassconfirm, setShowpassconfirm] = useState(false);
  const [cookies] = useCookies();
  const [isloading, setIsloading] = useState(false)
  const navigate = useNavigate();
  const refForm = useRef()
  console.log(jwtDecode(cookies.autherize).email);



  const [noti, setNoti] = useState("")
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case 'Success':
          NotificationManager.success('Update succesfuly!', 'Success', 2000);
          break;
        case 'Error':
          NotificationManager.error('Update fail!', 'Fail', 2000, () => {
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

  const handleUpdatePassword = () => {
    try {

      setNoti("a")
      const formData = new FormData();
      formData.append("email", jwtDecode(cookies.autherize).email);
      formData.append(
        "oldPassword",
        document.getElementById("oldPass").value.trim()
      );
      formData.append(
        "newPassword",
        document.getElementById("newPass").value.trim()
      );
      formData.append(
        "confirmPassowrd",
        document.getElementById("confirmPass").value.trim()
      );
      const response = axios.put(
        "https://localhost:7229/api/UserFE/UpdatePassword",
        formData
      );
      setNoti("Success")
      setTimeout(() => {
        refForm.current.reset();
      }, 500);

    } catch (error) {
      setNoti("Error")

    }
  };

  return (
    <div className="update_password">
      <NotificationContainer />
      <LoadingPage isloading={isloading} />
      <form ref={refForm}>
        <p className="title">Change Passsword</p>
        <div className="form_group">
          <label>Old Password</label>
          <i className="fa-solid fa-key icon_lg_input"></i>
          <input
            placeholder="Enter your password old"
            type={showpassold ? "text" : "password"}
            id="oldPass"
          ></input>
          <i
            className={`fa-regular ${showpassold ? "fa-eye-slash" : "fa-eye"
              } show_password`}
            onClick={() => {
              setShowpassold((prev) => !prev);
            }}
          ></i>
        </div>
        <div className="form_group">
          <label>New Password</label>
          <i className="fa-solid fa-key icon_lg_input"></i>
          <input
            placeholder="Enter your password new"
            type={showpassnew ? "text" : "password"}
            id="newPass"
          ></input>
          <i
            className={`fa-regular ${showpassnew ? "fa-eye-slash" : "fa-eye"
              } show_password`}
            onClick={() => {
              setShowpassnew((prev) => !prev);
            }}
          ></i>
        </div>
        <div className="form_group">
          <label>Password Confirm</label>
          <i className="fa-solid fa-key icon_lg_input"></i>
          <input
            placeholder="Enter your password confirm"
            type={showpassconfirm ? "text" : "password"}
            id="confirmPass"
          ></input>
          <i
            className={`fa-regular ${showpassconfirm ? "fa-eye-slash" : "fa-eye"
              } show_password`}
            onClick={() => {
              setShowpassconfirm((prev) => !prev);
            }}
          ></i>
        </div>
        <div className="form_btn">
          <input type="reset" value={"Reset"} className="reset_btn" />
          <input
            type="button"
            value={"Update"}
            className="submit_btn"
            onClick={handleUpdatePassword}
          />
        </div>
      </form>
    </div>
  );
}
