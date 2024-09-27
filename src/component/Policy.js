import React from 'react';
// Import JSON data
import policyData from '../data/Policy.json';

export default function Policy() {
    return (
        <div className='policy_container' style={{ paddingBottom: "2rem" }}>
            <p className='bg' style={{ textAlign: "center", padding: "0.5rem 0", fontSize: "var(--fz_large)", fontWeight: "900", backgroundColor: "var(--cl_bg)", color: "white", borderTopLeftRadius: "5rem", borderBottomRightRadius: "5rem" }}>Privacy Policy</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1rem" }}>
                {policyData.map((policy, index) => (
                    <div key={index} className='policy_item'>

                        <p style={{ fontSize: "1rem", padding: "0.3rem 0.5rem", fontWeight: "800", color: "var(--white)" }}>{index + 1} : {policy.title}</p>

                        <div>
                            {policy.child.map((item, childIndex) => (
                                <div style={{ padding: " 0.2rem 1rem", display: "flex", gap: "0.4rem", alignItems: "start", width: "100%" }} key={childIndex}>
                                    <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", width: "25%" }}>

                                        <p style={{ width: "calc(100% - 10px)", fontWeight: "700", fontSize: "var(--fz_small)" }}>{item.key}:</p>
                                    </div>
                                    <div style={{ width: "75%", fontSize: "var(--fz_small)" }}>  {item.data}</div>

                                </div>
                            ))}
                        </div>
                    </div>
                ))
                }
            </div>
        </div >
    );
}
