import axios from "axios";

export const getAllProducts = async (page) => {
  const response = await axios.get(`http://localhost:8080/products?_page=${page}&_limit=10`);
  const totalProduct = response.headers["x-total-count"];
  return {data:response.data,currentPage:page,totalProduct};
};
export const updateProduct = async ( product ) => {
  const { data } = await axios.patch(
    `http://localhost:8080/products/${product.id}`,
    {
      ...product,
    }
  );
  return product;
};
export const deleteProduct = async (productId) => {
  const { data } = await axios.delete(
    `http://localhost:8080/products/${productId}`
  );
  return productId;
};
export const addProduct = async (product) => {
  const { data } = await axios.post(`http://localhost:8080/products`, {
    ...product,
  });
  return data;
};

export const searchProduct = async (searchTerm) => {
  const { data } = await axios.get(`http://localhost:8080/products`);

  const filteredProducts = data.filter((obj) =>
    Object.values(obj).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  return filteredProducts;
};
export const getProductById = async (productId) => {
  const { data } = await axios.get(`http://localhost:8080/products/${productId}`);
  return data;
};
