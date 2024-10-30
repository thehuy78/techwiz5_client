import React, { memo } from 'react'

function Star({ number }) {

    const numbers = number ? number : 0;
    return (

        <span>
            {Array(5).fill().map((_, index) => (
                <i key={index} className={numbers >= index + 1 ? `fa-solid fa-star` : `fa-regular fa-star`} style={{ color: numbers >= index + 1 ? "orange" : "orange" }}></i>
            ))}
        </span>
    )
}
export default memo(Star)
