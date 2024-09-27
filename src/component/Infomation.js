import React from 'react'
import parse from 'html-react-parser';
export default function Infomation({ item }) {

    return (
        <div className='info_mation' style={{ padding: "1rem 0" }}>
            {item ? parse(item) : ""}
        </div>
    )
}
