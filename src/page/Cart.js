import React, { useCallback, useEffect, useState } from 'react'
import "../style/Cart.scss"
import { useLayout } from "../hooks/Layout/LayoutContext";
import LoadingPage from '../component/LoadingPage';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { apiRequestAutherize } from '../hooks/Api/ApiAuther';
import GetImageFirebase from '../function/GetImageFirebase';

import { InvalidPhoneNumber } from "../function/CheckInputFormat"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Cart() {
    const [cart, setCart] = useState();
    const { setLayout } = useLayout();
    const [isloading, setIsloading] = useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        setLayout("main");

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setTimeout(() => {
            setIsloading(false)
        }, 500);

    }, [setLayout]);



    const [cookies,] = useCookies()
    const [, setUser] = useState()
    const userData = jwtDecode(cookies.autherize)


    const fetchCart = useCallback(async () => {
        try {

            var res = await apiRequestAutherize("Get", `CartFE/get_list_cart`, cookies.autherize)
            console.log(res)
            if (res && res.data && res.data.status === 200) {
                setCart(res.data.data)
                setTimeout(() => {
                    setIsloading(false)
                }, 500);
            }
            // setLoading(false)
        } catch (error) {
            console.log(error)
        }


    }, [cookies.autherize])

    useEffect(() => {
        setTimeout(async () => {
            fetchCart()
        }, 100);
    }, [fetchCart])

    useEffect(() => {
        if (cookies.autherize) {
            setUser(jwtDecode(cookies.autherize))
        }
    }, [cookies.autherize]);

    const onDeleteCart = async (id) => {

        var res = await apiRequestAutherize("Get", `CartFE/remove_cart/${id}`, cookies.autherize)

        if (res && res.data && res.data.status === 200) {
            createNotification("del")()

            fetchCart()

        }

    }

    const [cartCheck, setCartCheck] = useState([]);
    const handleCheckItem = (item) => {
        // Kiểm tra xem item đã tồn tại trong mảng cartCheck hay chưa
        const isItemChecked = cartCheck.some(cartItem => cartItem.id === item.id);

        if (isItemChecked) {
            // Nếu đã có, remove item khỏi cartCheck
            setCartCheck(prevState => prevState.filter(cartItem => cartItem.id !== item.id));
        } else {
            // Nếu chưa có, thêm item vào cartCheck
            setCartCheck(prevState => [...prevState, item]);
        }
    };

    useEffect(() => {
        console.log(cartCheck);

    }, [cartCheck]);

    const [totalPrices, setTotalPrices] = useState()

    const totalPrice = () => {
        var total = 0;
        cartCheck.forEach(element => {
            total += element.price * element.quantity
        });
        total === 0 ? setTotal(0) : setTotal(total + 10)

        return total;
    }



    const [total, setTotal] = useState()



    useEffect(() => {
        setTotalPrices(totalPrice)

    }, [cartCheck]);

    const handleOrder = async () => {

        setIsloading(true)
        try {
            var fullnameOrder = document.getElementById("fullnameOrder").value;
            var phoneOrder = document.getElementById("phoneOrder").value;
            var address = document.getElementById("addressOrder").value;
            if (fullnameOrder === undefined || fullnameOrder === null || fullnameOrder === "") {

                createNotification("name")()
                setIsloading(false)
                return;
            }
            if (phoneOrder === undefined || phoneOrder === null || phoneOrder === "") {

                createNotification("phone")()
                setIsloading(false)
                return;
            }
            if (!InvalidPhoneNumber(phoneOrder.trim())) {
                createNotification("phoneinvalid")()
                setIsloading(false)
                return;
            }

            if (address === undefined || address === null || address === "") {
                createNotification("address")();

                setIsloading(false)
                return;
            }
            const formdata = new FormData();
            formdata.append("user_Id", userData.id);
            formdata.append("address", address);
            formdata.append("phone", phoneOrder);
            formdata.append("fullname", fullnameOrder);

            cartCheck.forEach(e => {
                formdata.append("cartIds", e.id)
            })

            const response = await axios.post("https://localhost:7229/api/OrderFE/CreateOrder", formdata)
            console.log(response)
            setIsloading(false)
            fetchCart()
            createNotification("ok")();

            setTotalPrices(0)
            setTotal(0)
            setCartCheck([])
            setTimeout(() => {
                navigate('/customer/order');
            }, 1000);
        }

        catch (err) {
            console.log(err)
        }


    }




    const createNotification = (type) => {
        return () => {
            NotificationManager.removeAll();
            switch (type) {
                case 'ok':
                    NotificationManager.success('Order succesfuly!', 'Success', 2000);
                    break;
                case 'name':
                    NotificationManager.error('Input your name!', 'Error', 2000);
                    break;
                case 'address':
                    NotificationManager.error('Input your address!', 'Error', 2000);
                    break;
                case 'phone':
                    NotificationManager.error('Input your phone!', 'Error', 2000);
                    break;
                case 'del':
                    NotificationManager.success('Delete success!', 'Success', 2000);
                    break;
                case 'phoneinvalid':
                    NotificationManager.error('Phone number Invalid!', 'Error', 2000);
                    break;


                default:
                    break;
            }
        };
    };




    return (
        <div className='cart_page'>
            <NotificationContainer />
            <LoadingPage isloading={isloading} />
            <section className='sec_1_cart'>
                <div className='sec_1_cart_container'>
                    <div className='b_left'>
                        <p className='title'>Shopping Cart</p>
                        <div className='list_item'>
                            <div className='list_title'>
                                <p></p>
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Total Price</p>
                                <p>Action</p>
                            </div>
                            <div className='list_item_cart'>
                                {cart && cart.length > 0 && cart.map((item, index) => (
                                    <div className='item' key={index}>
                                        <input
                                            type='checkbox'
                                            onChange={() => handleCheckItem(item)} // Chuyển item trực tiếp vào hàm
                                            checked={cartCheck.some(cartItem => cartItem.id === item.id)} // Kiểm tra xem item đã được check chưa
                                        />
                                        <div className='product_info_cart'>
                                            <div className='b_img'>
                                                <img src={GetImageFirebase(item.image)} alt='' />
                                            </div>
                                            <div className='product_info'>
                                                <p className='name'>{item.name}</p>
                                                <div className='list_variant'>
                                                    {item.attribute.length > 0 && item.attribute.map((itemAttribute, index) => (
                                                        <p className='property' key={index}>{itemAttribute.attributevalue}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='quantity'>
                                            <p>{item.quantity}</p>
                                        </div>
                                        <div className='price'>
                                            <p>${(item.quantity * item.price)?.toFixed(2)}</p>
                                        </div>
                                        <div className='action'>
                                            <i className="fa-solid fa-trash-can" onClick={() => onDeleteCart(item.id)}></i>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        </div>
                    </div>
                    <div className='b_right'>
                        <form>
                            <p className='title_b'>Payment Infomation</p>

                            <p className='title_form'>Delivery Infomation</p>
                            <div className='form_group'>
                                <label>Fullname</label>
                                <input id='fullnameOrder' placeholder='Input your name' />
                            </div>
                            <div className='form_group'>
                                <label>Phone</label>
                                <input id='phoneOrder' placeholder='Input your phone' />
                            </div>
                            <div className='form_group'>
                                <label>Address</label>
                                <input id='addressOrder' placeholder='Input your address' />
                            </div>

                        </form>
                        <div className='caculator_checkout'>
                            <p className='title_form'>Payment</p>
                            <div className='list_pay'>
                                <div className='total_price'>
                                    <p>Total Price</p>
                                    <p>$ {totalPrices?.toFixed(2)}</p>
                                </div>

                                <div className='delivery_fee'>
                                    <p>Delivery Fee</p>
                                    <p>$ {cartCheck && cartCheck.length > 0 ? 10 : 0}</p>
                                </div>
                                <div className='total'>
                                    <p>Total</p>
                                    <p>$ {total?.toFixed(2)}</p>
                                </div>
                                <div className="box_btn_checkout">
                                    <button onClick={handleOrder} disabled={cartCheck && cartCheck.length > 0 ? false : true}>Check out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
