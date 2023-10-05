import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <>
      <Navbar>
        <ProductList />
      </Navbar>
    </>
  );
};

export default Home;
