import { Route, Routes, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import { LayoutProvider } from "./hooks/Layout/LayoutContext";
import LayoutSwitch from "./hooks/Layout/LayoutSwitch";
import Home from "./page/Home";
import Auth from "./page/Auth";
import "../src/style/Main.scss";
import ProductDetail from "./page/ProductDetail";
import Customer from "./page/Customer";
import ForgotPassword from "./page/ForgotPassword";
import Contact from "./page/Contact";
import RoomType from "./page/RoomType";
import Collection from "./page/Collection";
import Designer from "./page/Designer";
import Product from "./page/Product";
import Cart from "./page/Cart";
import ReviewProduct from "./page/ReviewProduct";
import ReviewBooking from "./page/ReviewBooking";
import DesignerPortfolio from "./page/DesignerPortfolio";
import FormBooking from "./page/FormBooking";
import GalleryDetail from "./page/GalleryDetail";
import OrderDetails from "./page/OrderDetails";
import Blogs from "./page/Blogs";
import { useCookies } from "react-cookie";
import Aboutus from "./page/Aboutus";
import AccessReset from "./page/AccessReset";
import BlogDetail from "./page/BlogDetail";
import FileNotFound from "./page/FileNotFound";
function App() {
  const [cookies] = useCookies();

  return (
    <LayoutProvider>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutSwitch>
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            </LayoutSwitch>
          }
        ></Route>
        <Route
          path="/detail/:id"
          element={
            <LayoutSwitch>
              <ProductDetail />
            </LayoutSwitch>
          }
        ></Route>
        <Route
          path="/customer/:id"
          element={
            cookies && cookies.autherize ? (
              <LayoutSwitch>
                <Customer />
              </LayoutSwitch>
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/login"
          element={
            cookies && cookies.autherize ? (
              <Navigate to="/customer/account" />
            ) : (
              <LayoutSwitch>
                <Auth />
              </LayoutSwitch>
            )
          }
        ></Route>
        <Route
          path="/forgot"
          element={
            cookies && cookies.autherize ? (
              <Navigate to="/customer/account" />
            ) : (
              <LayoutSwitch>
                <ForgotPassword />
              </LayoutSwitch>
            )
          }
        ></Route>
        <Route
          path="/forgotpassword/:token"
          element={
            <LayoutSwitch>
              <AccessReset />
            </LayoutSwitch>
          }
        ></Route>
        <Route
          path="/contact"
          element={
            <LayoutSwitch>
              <Contact />
            </LayoutSwitch>
          }
        ></Route>

        <Route
          path="/reviewbooking"
          element={
            cookies && cookies.autherize ? (
              <LayoutSwitch>
                {" "}
                <ReviewBooking />
              </LayoutSwitch>
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>

        <Route
          path="/reviewproduct/:id"
          element={
            cookies && cookies.autherize ? (
              <LayoutSwitch>
                {" "}
                <ReviewProduct />
              </LayoutSwitch>
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>

        <Route
          path="/roomconcept/:name"
          element={
            <LayoutSwitch>
              <RoomType />
            </LayoutSwitch>
          }
        ></Route>
        <Route
          path="/collection"
          element={
            <LayoutSwitch>
              <Collection />
            </LayoutSwitch>
          }
        ></Route>
        <Route
          path="/designer"
          element={
            <LayoutSwitch>
              <Designer />
            </LayoutSwitch>
          }
        ></Route>
        <Route
          path="/product"
          element={
            <LayoutSwitch>
              <Product />
            </LayoutSwitch>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            cookies && cookies.autherize ? (
              <LayoutSwitch>
                {" "}
                <Cart />
              </LayoutSwitch>
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/designer/portfolio/:id"
          element={
            <LayoutSwitch>
              <DesignerPortfolio />
            </LayoutSwitch>
          }
        ></Route>

        <Route
          path="/booking/designer/:id"
          element={
            cookies && cookies.autherize ? (
              <LayoutSwitch>
                {" "}
                <FormBooking />
              </LayoutSwitch>
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>

        <Route
          path="/gallerydetail/:id"
          element={
            <LayoutSwitch>
              <GalleryDetail />
            </LayoutSwitch>
          }
        ></Route>

        <Route
          path="/orderdetails/:id"
          element={
            cookies && cookies.autherize ? (
              <LayoutSwitch>
                <OrderDetails />
              </LayoutSwitch>
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>

        <Route
          path="/blog"
          element={
            <LayoutSwitch>
              <Blogs />
            </LayoutSwitch>
          }
        ></Route>
        <Route
          path="/blogdetail/:id"
          element={
            <LayoutSwitch>
              <BlogDetail />
            </LayoutSwitch>
          }
        ></Route>

        <Route
          path="/aboutus"
          element={
            <LayoutSwitch>
              <Aboutus />
            </LayoutSwitch>
          }
        ></Route>

        <Route
          path="*"
          element={
            <LayoutSwitch>
              <FileNotFound />
            </LayoutSwitch>
          }
        ></Route>
      </Routes>
    </LayoutProvider>
  );
}

export default App;
