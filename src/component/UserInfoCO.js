import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
export default function UserInfoCO() {
  const [previewImage, setPreviewImage] = useState(
    "https://tinyurl.com/2774tvkx"
  ); // Hình mặc định
  const [userData, setUserData] = useState([]);
  const [cookies] = useCookies();
  const userdata = jwtDecode(cookies.autherize);

  const [noti, setNoti] = useState("");
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case "Success":
          NotificationManager.success("Update succesfuly!", "Success", 2000);
          break;
        case "Error":
          NotificationManager.error("Update fail!", "Fail", 2000, () => {
            alert("callback");
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

  useEffect(() => {
    console.log(previewImage);
  }, [previewImage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7229/api/User/GetByEmail/" + userdata.email
        );

        console.log(response.data.data);
        var data = response.data.data;
        setUserData(data);
      } catch (error) {
      } finally {
      }
    };
    fetchData();
  }, []);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setPreviewImage(fileUrl);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Chỉ cho phép hình ảnh
  });
  const handleUpdateUser = async () => {
    try {
      const fData = new FormData();
      fData.append("user_id", 1);
      fData.append(
        "first_name",
        document.getElementById("firstName").value.trim()
      );
      fData.append(
        "last_name",
        document.getElementById("lastName").value.trim()
      );
      fData.append("phone", document.getElementById("phone").value.trim());
      //   fData.append("email", document.getElementById("phone").value.trim());
      const response11 = await axios.put(
        "https://localhost:7229/api/UserFE/UpdateProfile",
        fData
      );
      setNoti("Success");

      //   const formData = new FormData();
      //   console.log(userData.id);
      //   formData.append("id", parseInt(userdata.id));
      //   formData.append("user_id", parseInt(userdata.user_id));
      //   formData.append("role", userdata.role);
      //   formData.append("first_name", document.getElementById("firstName").value);
      //   formData.append("last_name", document.getElementById("lastName").value);
      //   formData.append("contact_number", document.getElementById("phone").value);
      //   formData.append("address", userData.address);
      //   formData.append("avatar", "1234");
      //   console.log(document.getElementById("phone").value);
      //   const response = await axios.put(
      //     "https://localhost:7229/api/User/UpdateProfile",
      //     formData
      //   );
    } catch (err) {
      setNoti("Error");
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
