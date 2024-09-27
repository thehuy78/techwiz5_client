import React from 'react';
import Navbar from "../../layout/Navbar"
import Footer from "../../layout/Footer"

const MainLayout = ({ children }) => {


    return (
        <div>
            <div>


                <Navbar />
            </div>
            <main>

                {children}
            </main>


            <Footer />
        </div>
    );
}

export default MainLayout;
