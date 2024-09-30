
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiRequest } from '../hooks/Api/Api';



export default function AccessReset() {
  const { token } = useParams()
  const navigate = useNavigate();
  console.log(token);


  const decodeBase64 = (encoded) => {
    return atob(encoded);
  };

  useEffect(() => {
    var e = decodeBase64(token)
    parseString(e)

    console.log(e);
  }, [token]);

  const [id, setId] = useState()
  const [uid, setUid] = useState()
  const [timestamp, setTimestamp] = useState()
  const parseString = (str) => {
    const parts = str.split('|');
    if (parts.length === 3) {
      console.log(parts[0]);
      console.log(parts[1]);
      console.log(parts[2]);
      setId(parts[0]);
      setTimestamp(parts[1]);
      setUid(parts[2]);
    }
  };


  const updatepassword = async () => {
    try {
      var res = await apiRequest("get", `AuthUser/ResetPassword?userId=${id}&newPassword=
    ${uid}`)
      if (res && res.data && res.data.status === 200) {
        navigate("/login")
      } else {
        navigate("/")
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (id && uid) {
      updatepassword()
    }

  }, [id, uid]);



  return (
    <div>

    </div>
  )
}
