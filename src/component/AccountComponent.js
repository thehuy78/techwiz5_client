import React, { useState } from 'react'
import UserInfoCO from './UserInfoCO'
import UpdatePassword from './UpdatePassword'

export default function AccountComponent() {
    const [nav_info, setNav_info] = useState(1)

    return (

        <div className='account_component'>
            <div className='b_choice'>
                <p className={nav_info === 1 ? "nav_choice" : ""} onClick={() => { setNav_info(1) }}>Update Infomation</p>
                <p className={nav_info === 2 ? "nav_choice" : ""} onClick={() => { setNav_info(2) }}>Update Password</p>

            </div>

            <div className='mocup_account_component'>
                {(() => {
                    switch (nav_info) {
                        case 1:
                            return <UserInfoCO />;
                        case 2:

                            return <UpdatePassword />;


                        default:
                            break;
                    }
                })()}
            </div>
        </div>

    )
}
