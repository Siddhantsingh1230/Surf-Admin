import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPwd from "./pages/ForgotPwd";
import PageNotFound from "./pages/PageNotFound";
import Protected from "./components/Protected";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./pages/AddProduct";
import Notification from "./pages/Notification";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            exact
            path="/addproduct"
            element={
              <Protected>
                <AddProduct />
              </Protected>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgotpassword" element={<ForgotPwd />} />
          <Route
            exact
            path="/notification"
            element={
              <Protected>
                <Notification />
              </Protected>
            }
          />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer style={{ fontSize: "0.85rem" }} />
      </Router>
    </>
  );
};

export default App;
