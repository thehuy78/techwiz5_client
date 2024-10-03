import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import LoadingPage from '../component/LoadingPage';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useNavigate } from "react-router-dom";

import { InvalidPassword } from "../function/CheckInputFormat"
export default function UpdatePassword() {
  const [showpassold, setShowpassold] = useState(false);
  const [showpassnew, setShowpassnew] = useState(false);
  const [showpassconfirm, setShowpassconfirm] = useState(false);
  const [cookies] = useCookies();
  const [isloading, setIsloading] = useState(false)
  const navigate = useNavigate();
  const refForm = useRef()
  console.log(jwtDecode(cookies.autherize).email);




  const createNotification = (type) => {
    return () => {
      NotificationManager.removeAll();
      switch (type) {
        case 'Success':
          NotificationManager.success('Update succesfuly!', 'Success', 2000);
          break;
        case 'Error':
          NotificationManager.error('Old Password not correct!', 'Fail', 2000, () => {
            alert('callback');
          });
          break;
        case 'pw':
          NotificationManager.error('Password must be 8-16 characters!', 'Fail', 2000, () => {
            alert('callback');
          });
          break;
        case 'pwcf':
          NotificationManager.error('Password confirm not match!', 'Fail', 2000, () => {
            alert('callback');
          });
          break;
        case 'op':
          NotificationManager.error('Password old cannot be left blank!', 'Fail', 2000, () => {
            alert('callback');
          });
          break;

        default:
          break;
      }
    };
  };



  const handleUpdatePassword = async () => {
    try {
      if (!InvalidPassword(document.getElementById("newPass").value.trim())) {
        createNotification("pw")();
        return
      }
      if (document.getElementById("newPass").value.trim() !== document.getElementById("confirmPass").value.trim()) {
        createNotification("pwcf")();
        return
      }
      if (!document.getElementById("oldPass").value.trim() || document.getElementById("oldPass").value.trim() === "") {
        createNotification("op")();
        return
      }


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
      const res = await axios.put(
        "https://localhost:7229/api/UserFE/UpdatePassword",
        formData
      );
      console.log(res)
      if (res && res.data && res.data.status === 200) {
        createNotification("Success")();
      } else {
        createNotification("Error")();
      }


      setTimeout(() => {
        refForm.current.reset();
      }, 500);

    } catch (error) {
      console.log("loi")
      console.log(error)
      createNotification("Error")();
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
