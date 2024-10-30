import React, { useCallback, useEffect, useState } from 'react'


import { Link } from 'react-router-dom';
import { apiRequest } from '../hooks/Api/Api';
import LoadingPage from './LoadingPage';
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { formatDate } from "../function/FormatDate"




export default function ListOrder() {
    const [cookies] = useCookies();
    const userdata = jwtDecode(cookies.autherize);

    const [orders, setOrders] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 7;
    const totalPages =
        orders &&
        orders.length > 0 &&
        Math.ceil(orders.length / ordersPerPage);
    const [isloading, setIsloading] = useState(true)
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
            orders &&
            orders.length > 0 &&
            orders.slice(indexOfFirstOrder, indexOfLastOrder);
        console.log(currentOrders)
        return (
            currentOrders &&
            currentOrders.length > 0 &&
            currentOrders.map((item, index) => (
                <div className='item_order' key={item.id}>
                    <p>{index + 1}</p>
                    <p className='code_order'>{item.id}</p>
                    <p className='created'>{formatDate(item.created_date)}</p>
                    <p>{item.scount_item}</p>
                    <p className='total'>{item.total}</p>
                    <p>{item.status}</p>
                    <Link className='link_tag' to={`/orderdetails/${item.id}`}> <div className='b_btn'><button>Detail</button></div></Link>

                </div>
            ))
        );
    };



    const fetchOrder = useCallback(async () => {
        try {
            var res = await apiRequest('Get', `OrderFE/GetOrder/${userdata.id}`)
            console.log(res);
            if (res && res.data && res.data.status === 200) {
                const list = res.data.data;
                setOrders(list);

                setTimeout(() => {
                    setIsloading(false)
                }, 500);

            }

            // setLoadingcomponent(false)
        } catch (error) {
            console.log(error)
        }
    }, [userdata.id])

    useEffect(() => {
        setTimeout(async () => {
            fetchOrder()

        }, 300);

    }, [fetchOrder])

    useEffect(() => {
        console.log(orders);
    }, [orders]);




    return (
        <div className='list_order'>
            <LoadingPage isloading={isloading} />
            {/* <div className='b_1'>

                <div className='b_search_id'>

                    <input type='search' placeholder='Search id order' />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className='b_search_date'>
                    <span> From </span>
                    <input type='date' />
                    <span> to </span>
                    <input type='date' />
                </div>
                <div className='select_status'>
                    <p>Status</p>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[optionStatus[0]]}
                        options={optionStatus}
                        styles={customStyles} // Áp dụng tùy chỉnh
                    />
                </div>
            </div> */}
            <div className='b_2'>
                <div className='list_title'>
                    <p>#</p>
                    <p>ID Order</p>
                    <p>Created</p>
                    <p>Item</p>
                    <p>Total</p>
                    <p>Status</p>
                    <p>Action</p>
                </div>
                {orders && orders.length > 0 ? (
                    <>
                        <div className='list_order_container'>
                            {renderProducts()}
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
                    </>
                )
                    : (
                        <p style={{ textAlign: "center", color: "orange", padding: "2rem 0" }}>Data not found</p>
                    )
                }


            </div>
        </div>
    )
}
