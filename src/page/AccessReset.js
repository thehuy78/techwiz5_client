import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../hooks/Api/Api";
import { useLayout } from "../hooks/Layout/LayoutContext";
export default function AccessReset() {
  const { token } = useParams();
  const navigate = useNavigate();
  console.log(token);

  const decodeBase64 = (encoded) => {
    return atob(encoded);
  };

  useEffect(() => {
    var e = decodeBase64(token);
    parseString(e);

    console.log(e);
  }, [token]);

  const [id, setId] = useState();
  const [uid, setUid] = useState();
  const [timestamp, setTimestamp] = useState();
  const parseString = (str) => {
    const parts = str.split("|");
    if (parts.length === 3) {
      console.log(parts[0]);
      console.log(parts[1]);
      console.log(parts[2]);
      setId(parts[0]);
      setTimestamp(parts[1]);
      setUid(parts[2]);
    }
  };

  const [resetMess, setResetMess] = useState("");
  const updatepassword = async () => {
    try {
      var res = await apiRequest(
        "get",
        `AuthUser/ResetPassword?userId=${id}&newPassword=
    ${uid}`
      );
      if (res && res.data && res.data.status === 200) {
        // window.close();
        setResetMess("Reset password success");
      } else {
        setResetMess("Reset password fail");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && uid) {
      updatepassword();
    }
  }, [id, uid]);

  return (
    <div
      style={{
        color: "var(--cl_2)",
        padding: "10rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "var(--cl_bg)",
      }}
    >
      <p style={{ fontSize: "var(--fz_max)", padding: "1rem", color: "white" }}>
        {resetMess && resetMess}
      </p>
      <Link className="link_tag" to={"/login"}>
        <button
          style={{
            backgroundColor: "orange",
            padding: "0.5rem 3rem",
            outline: "none",
            border: "none",
          }}
        >
          Back to Login Page
        </button>
      </Link>
    </div>
  );
}
