import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <Navbar search={search} setSearch={setSearch} SearchBar={SearchBar}>
        <ProductList search={search} />
      </Navbar>
    </>
  );
};

export default Home;
