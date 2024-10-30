import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import {
  InvalidPhoneNumber,
  InvalidString,
} from "../function/CheckInputFormat";
import GetImageFirebase from "../function/GetImageFirebase";
export default function UserInfoCO() {
  const [cookies, setCookie] = useCookies();
  const userdata = jwtDecode(cookies.autherize);
  const userAvatar =
    userdata && userdata.avatar !== "" ? GetImageFirebase(userdata.avatar) : "";
  const [previewImage, setPreviewImage] = useState(userAvatar); // Hình mặc định
  const [userData, setUserData] = useState([]);

  const createNotification = (type) => {
    return () => {
      NotificationManager.removeAll();
      switch (type) {
        case "Success":
          NotificationManager.success("Update succesfuly!", "Success", 2000);
          break;
        case "Error":
          NotificationManager.error("Update fail!", "Fail", 2000, () => {
            alert("callback");
          });
          break;
        case "fn":
          NotificationManager.error(
            "First name invalid!",
            "Update Fail",
            3000,
            () => {}
          );
          break;
        case "ln":
          NotificationManager.error(
            "Last name invalid!",
            "Update Fail",
            3000,
            () => {}
          );
          break;
        case "phone":
          NotificationManager.error(
            "Phone number invalid!",
            "Update Fail",
            3000,
            () => {}
          );
          break;

        case "":
          break;

        default:
          break;
      }
    };
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://localhost:7229/api/UserFE/GetByEmail/" + userdata.email
      );

      console.log(response);
      var data = response.data.data;
      setUserData(data);
    } catch (error) {
    } finally {
    }
  }, [userdata.email]);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 200);
  }, [fetchData]);

  const [avatar, setAvater] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setAvater(file);
    const fileUrl = URL.createObjectURL(file);
    setPreviewImage(fileUrl);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Chỉ cho phép hình ảnh
  });
  const handleUpdateUser = async () => {
    try {
      if (!InvalidString(document.getElementById("firstName").value.trim())) {
        createNotification("fn")();

        return;
      }
      if (!InvalidString(document.getElementById("lastName").value.trim())) {
        createNotification("ln")();

        return;
      }
      if (!InvalidPhoneNumber(document.getElementById("phone").value.trim())) {
        createNotification("phone")();

        return;
      }
      const fData = new FormData();
      fData.append("user_id", userdata.id);
      fData.append(
        "first_name",
        document.getElementById("firstName").value.trim()
      );
      fData.append(
        "last_name",
        document.getElementById("lastName").value.trim()
      );
      if (avatar) {
        fData.append("uploadImage", avatar);
      }
      fData.append("phone", document.getElementById("phone").value.trim());
      //   fData.append("email", document.getElementById("phone").value.trim());
      const res = await axios.put(
        "https://localhost:7229/api/UserFE/UpdateProfile",
        fData
      );

      if (res && res.data && res.data.data && res.data.status === 200) {
        var exp = new Date();
        exp.setHours(exp.getHours() + 1);
        setCookie("autherize", res.data.data, {
          expires: exp,
          path: "/",
        });
        createNotification("Success")();
      }
    } catch (err) {
      createNotification("Error")();
    }
  };

  return (
    <div className="User_InfoCO">
      <NotificationContainer />
      <div className="b_form">
        <form>
          <div className="b_left">
            <div className="b_img">
              <img src={previewImage} alt="Preview" />
            </div>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <button type="button" className="custom-file-button">
                Choose File
              </button>
            </div>
          </div>
          <div className="b_right">
            <p className="title">My Profile</p>
            <div className="b_row">
              <div className="form_group">
                <label>FIRST NAME</label>
                <input
                  id="firstName"
                  defaultValue={userData?.first_name}
                ></input>
              </div>
              <div className="form_group">
                <label>LAST NAME</label>
                <input id="lastName" defaultValue={userData?.last_name}></input>
              </div>
            </div>
            <div className="b_row">
              <div className="form_group">
                <label>PHONE</label>
                <input
                  id="phone"
                  defaultValue={userData?.contact_number}
                ></input>
              </div>
            </div>
            <div className="form_group">
              <label>EMAIL</label>
              <input readOnly defaultValue={userdata?.email}></input>
            </div>
            <div className="form_btn">
              <input
                type="button"
                onClick={handleUpdateUser}
                value={"Update"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
