import React from 'react'
import "../style/LoadingPage.scss"
export default function LoadingPage({ isloading }) {

  return isloading && (
    <div className='b_loading_page'>
      <div className="spinner"></div>
    </div>

  )
}
