import React, { useCallback, useEffect, useState } from 'react'
import { useLayout } from "../hooks/Layout/LayoutContext";
import "../style/Blogs.scss"
import { Link } from 'react-router-dom';
import { apiRequest } from '../hooks/Api/Api';
import LoadingPage from '../component/LoadingPage';
import Infomation from '../component/Infomation';
import { formatDate } from '../function/FormatDate';
import GetImageFirebase from '../function/GetImageFirebase';
export default function Blogs() {
    const { setLayout } = useLayout();
    const [isloading, setIsloading] = useState(true)

    useEffect(() => {
        setLayout("main");

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [setLayout]);


    const [blogs, setBlogs] = useState()
    const [blogSave, setBlogSave] = useState()
    const fetchBlogs = useCallback(async () => {
        try {
            var res = await apiRequest('GET', `BlogsFE`)

            console.log(res);
            if (res && res.data && res.data.status === 200) {
                const list = res.data.data;
                setBlogSave(list);
                setBlogs(list);
                setTimeout(() => {
                    setIsloading(false)
                }, 500);

            }
        } catch (error) {
            setTimeout(() => {
                setIsloading(false)
            }, 500);
        }
    }, [])

    useEffect(() => {
        setTimeout(async () => {
            fetchBlogs()

        }, 100);


    }, [fetchBlogs]);




    useEffect(() => {
        console.log(blogs);
    }, [blogs]);

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 9;
    const totalPages =
        blogs &&
        blogs.length > 0 &&
        Math.ceil(blogs.length / ordersPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    //phân trang button_pagination_active
    const renderPagination = () => {
        const pagination = [];
        const maxVisibleButtons = 7;

        const addPage = (page) => {
            pagination.push(
                <button
                    key={page}
                    onClick={() => handleClick(page)}
                    className={
                        currentPage === page ? "active button_pagination_active" : ""
                    }
                >
                    {page}
                </button>
            );
        };

        if (totalPages <= maxVisibleButtons) {
            for (let page = 1; page <= totalPages; page++) {
                addPage(page);
            }
        } else {
            const leftOffset = Math.max(1, currentPage - 2);
            const rightOffset = Math.min(totalPages, currentPage + 2);

            if (currentPage > 3) {
                pagination.push(
                    <button key="first" onClick={() => handleClick(1)}>
                        1
                    </button>
                );
                pagination.push(<span key="ellipsis1">...</span>);
            }

            for (let page = leftOffset; page <= rightOffset; page++) {
                addPage(page);
            }

            if (currentPage < totalPages - 2) {
                pagination.push(<span key="ellipsis2">...</span>);
                pagination.push(
                    <button key="last" onClick={() => handleClick(totalPages)}>
                        {totalPages}
                    </button>
                );
            }
        }

        return pagination;
    };

    const renderProducts = () => {
        const indexOfLastOrder = currentPage * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
        const currentOrders =
            blogs &&
            blogs.length > 0 &&
            blogs.slice(indexOfFirstOrder, indexOfLastOrder);

        return (
            currentOrders &&
            currentOrders.length > 0 &&
            currentOrders.map((item, index) => (

                <div className='Item' key={index}>
                    <div className='b_item'>
                        <img src={GetImageFirebase(item.imageavatar)} alt='' />
                        <div className='news_content'>
                            <Link className='link_tag' to={`/blogdetail/${item.id}`}> <p className='title'>{item.title}</p>  </Link>
                            <p className='date'>{formatDate(item.create_at)}</p>
                            <div className='discriber'><Infomation item={item.content} /></div>
                            <p className='author'>Author: {item.author}</p>

                        </div>
                    </div>

                </div>

            ))
        );
    };




    const onChangeSearch = () => {
        var searchInput = document.getElementById("search_blogs");
        var searchValue = searchInput.value.trim();

        let filteredBlogs = [...blogSave];

        if (searchValue !== "") {
            filteredBlogs = filteredBlogs.filter((blogs) =>
                blogs.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                blogs.author
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            );
        }
        setBlogs(filteredBlogs)
    }





    return (
        <div className='blog_page'>
            <LoadingPage isloading={isloading} />
            <section className='sec1' style={{ backgroundImage: `url(${require('../assets/images/office/z5844677826345_a60e53bfd92236136bee3009ee5025ac.jpg')})` }}>
                <div className='content'>
                    <p className='t_1'>Interior through confidence of Designer</p>
                    <p className='name_type'>Furniture Article</p>
                    <div className='b_discription'>
                        <p className='discription'>Explore modern interior design trends that optimize living spaces, bringing elegance and comfort to your home with stylish and functional solutions</p>
                        <p className='btn_scroll' ><i className="fa-solid fa-angle-down"></i></p>
                    </div>
                </div>
            </section>
            <div className='sec3'>
                <div className='sec3_container'>
                    <div className='left'>
                        <p className='author'>AWWARD WINNING</p>
                        <p className='title'>Lorem Ipsum is simply dummy text</p>
                        <p className='discriber'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                        <p className='date'>Date create: 23/32/2109</p>
                        <Link className="link_tag"><button>See More</button></Link>
                    </div>
                    <div className='right'>
                        <img src={require("../assets/images/livingroom/z5844676588182_bf1ec8d5b85cccf981e706067602dc5e.jpg")} alt='' />
                    </div>
                </div>
            </div>
            <p className='title_page_blog_list_blog'>List of articles</p>
            <section className='sec2'>
                <div className='sec2_container'>
                    <div className='filter'>
                        <div className='b_search'>
                            <input type='search' onChange={onChangeSearch} id='search_blogs' />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        {/* <div className='btn_latest'>Latest</div>
                        <div className='btn_oldest'>Oldest</div> */}
                    </div>
                    <div className='list_blogs'>
                        {blogs && blogs.length > 0 &&
                            renderProducts()
                        }
                    </div>
                    <div className="pagination">
                        <button
                            onClick={() => handleClick(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        {renderPagination()}
                        <button
                            onClick={() => handleClick(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
