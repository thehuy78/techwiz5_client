import { jwtDecode } from 'jwt-decode';
import React, { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../hooks/Api/Api';
import LoadingPage from './LoadingPage';
import BookmarkItem from './BookmarkItem';
import "../style/Bookmark.scss"

export default function BookmarkCO() {
    const navigate = useNavigate()
    const [cookies] = useCookies();
    const [bookmark, setBookmark] = useState([])
    const [isloading, setIsloading] = useState(true)
    console.log("haha")
    const fetchbookmark = useCallback(async () => {
        //setIsloading(true);
        try {
            if (!cookies.autherize) {
                navigate("/login");
            }
            const userdata = jwtDecode(cookies.autherize);
            const res = await apiRequest("Get", `BookmarkFE/Getall/${userdata.id}`);
            console.log(res);
            if (res && res.data && res.data.status === 200) {
                setBookmark(res.data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsloading(false)
            }, 500);

        }
    }, [cookies.autherize, navigate]);


    useEffect(() => {

        fetchbookmark()

    }, [fetchbookmark])








    return (
        <div className='bookmark_CO'>
            <LoadingPage isloading={isloading} />
            <p className='title_bm'>My Bookmark</p>
            {bookmark && bookmark.length > 0 ? (
                <div className='bookmark_CO_container'>
                    {bookmark && bookmark.length > 0 && bookmark.map((item, index) => (
                        <BookmarkItem item={item.gallery} fncallback={fetchbookmark} key={index} />
                    ))
                    }

                </div>
            )
                : (
                    <p style={{ textAlign: "center", color: "orange" }}>Data not found</p>
                )
            }


        </div>
    )
}
