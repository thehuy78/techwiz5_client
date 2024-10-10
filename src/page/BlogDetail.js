import React, { useCallback, useEffect, useState } from 'react'
import { useLayout } from "../hooks/Layout/LayoutContext";
import { apiRequest } from '../hooks/Api/Api';
import { useParams } from 'react-router-dom';
import LoadingPage from '../component/LoadingPage';
import { formatDateBlogDetail } from "../function/FormatDate"
import "../style/BlogDetail.scss"
import GetImageFirebase from '../function/GetImageFirebase';
import Infomation from '../component/Infomation';
export default function BlogDetail() {
    const { setLayout } = useLayout();
    const [isloading, setIsloading] = useState(true)
    const { id } = useParams()
    useEffect(() => {
        setLayout("main");
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [setLayout]);

    const [blog, setBlog] = useState()

    const fetchBlogs = useCallback(async () => {
        try {
            var res = await apiRequest('GET', `BlogsFE/GetById/${id}`)
            console.log(res);
            if (res && res.data && res.data.status === 200) {
                const blog = res.data.data;
                setBlog(blog);
                setTimeout(() => {
                    setIsloading(false)
                }, 500);
            }
        } catch (error) {
            setTimeout(() => {
                setIsloading(false)
            }, 500);
        }
    }, [id])

    useEffect(() => {
        setTimeout(async () => {
            fetchBlogs()
        }, 100);
    }, [fetchBlogs]);

    return blog && (
        <div className='blog_detail_page'>
            <LoadingPage isloading={isloading} />
            <section className='sec1' style={{ backgroundImage: `url(${require('../assets/images/office/z5844677826345_a60e53bfd92236136bee3009ee5025ac.jpg')})` }}>
                <div className='content'>
                    <p className='t_1'>{blog.title && blog.title}</p>
                    <p className='name_type'>{blog.interior_designer && blog.interior_designer.first_name} {blog.interior_designer && blog.interior_designer.last_name}</p>
                    <div className='b_discription'>
                        <p className='discription'>Explore modern interior design trends that optimize living spaces, bringing elegance and comfort to your home with stylish and functional solutions</p>
                        <p className='btn_scroll' ><i className="fa-solid fa-angle-down"></i></p>
                    </div>
                </div>
            </section>
            <section className='sec2'>
                <div className='left'>
                    <p className='title'>{blog.title}</p>
                    <p className='date'>{formatDateBlogDetail(blog.createdDate)}</p>
                    <img src={GetImageFirebase(blog.images)} alt='images' />
                    <div className='content'>
                        <Infomation item={blog.content} />
                    </div>
                </div>
                <div className='right'>
                    <div className='container_r'>
                        <img src={blog.interior_designer.avatar ? GetImageFirebase(blog.interior_designer.avatar) : "https://tinyurl.com/2774tvkx"} alt='avatar' />
                        <div className='b_name'>
                            <p className='f_name'>{blog.interior_designer.first_name ? blog.interior_designer.first_name : "Decor"}</p>
                            <p className='l_name'>{blog.interior_designer.last_name ? blog.interior_designer.last_name : "Vista"}</p>
                        </div>

                        <p className='phone_contact'>Contact Number: <span>{blog.interior_designer.contact_number ? blog.interior_designer.contact_number : ""}</span></p>
                        {blog.interior_designer.specialization && (
                            <p className='specialization'>Specialization: <span>{blog.interior_designer.specialization}</span></p>
                        )}

                        {blog.interior_designer.yearsofexperience && (
                            <p className='experience'>Experience: <span>{blog.interior_designer.yearsofexperience}</span></p>
                        )}

                    </div>
                </div>
            </section>
        </div>
    )
}
