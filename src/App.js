import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPwd from "./pages/ForgotPwd";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgotpassword" element={<ForgotPwd />} />
          <Route exact path="8" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
