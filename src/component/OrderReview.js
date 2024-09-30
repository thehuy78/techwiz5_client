import React, { useCallback, useEffect, useState } from 'react'
import "../style/OrderReview.scss"
import { Link } from 'react-router-dom'
import { apiRequest } from '../hooks/Api/Api'
import { useCookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'
import { formatDate } from '../function/FormatDate'




export default function OrderReview() {
  const [orderReview, setOrderReview] = useState()
  const [allOrder, setAllOrder] = useState()
  const [cookies] = useCookies();
  const userdata = jwtDecode(cookies.autherize);
  useEffect(() => {
    if (allOrder) {
      const completedTasks = allOrder.filter(task => task.status === "completed");
      console.log(completedTasks);
      setOrderReview(completedTasks)
    }


  }, [allOrder]);


  const fetchOrder = useCallback(async () => {
    try {
      var res = await apiRequest('Get', `OrderFE/GetOrder/${userdata.id}`)
      console.log(res);
      if (res && res.data && res.data.status === 200) {
        const list = res.data.data;
        setAllOrder(list);
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




  return (
    <div className='list_order_review'>
      <p className='title_order_review'>Review Order</p>
      <p>Rate the product so we can improve it</p>
      {orderReview && orderReview.length > 0 ?
        (
          <div className='list_order_item'>
            {orderReview && orderReview.length > 0 && orderReview.map((item, index) => (
              <div className='item'>
                <p className='code_id'>{item.id}</p>
                <p className='date'>{formatDate(item.created_date)}</p>
                <p className='status'>Status: {item.status}</p>
                <Link to={`/reviewproduct/${item.id}`}><button>Review now</button></Link>
              </div>
            ))}
          </div>
        ) : (<p style={{ textAlign: "center", color: "orange", padding: "3rem 0" }}>Not data</p>)
      }
    </div>
  )
}
