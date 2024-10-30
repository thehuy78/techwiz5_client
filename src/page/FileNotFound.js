import React, { useEffect } from 'react'
import { useLayout } from "../hooks/Layout/LayoutContext"
import { Link } from 'react-router-dom';
export default function FileNotFound() {
    const { setLayout } = useLayout();
    useEffect(() => {
        setLayout("auth");
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [setLayout]);
    return (
        <div style={{ backgroundColor: "#FBFBFB", width: "100%", justifyContent: "center", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", padding: "1rem" }}>
                <img src={require("../assets/images/main/404.gif")} alt='' />
                <div style={{
                    position: "absolute", width: "100%",
                    height: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    left: "0",
                    bottom: "12%"

                }}>
                    <p style={{ fontSize: "var(--fz_title)", fontWeight: "900", padding: "1rem 0" }}>Oops... page not found</p>
                    <Link to={"/"}>  <p>Return to the home page now</p></Link>
                </div>
            </div>

        </div>
    )
}

