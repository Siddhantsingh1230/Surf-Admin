import axios from "axios";

export const getAllCategories = async () => {
  const { data } = await axios.get("http://localhost:8080/category");
  return data;
};
export const getAllBrands = async () => {
  const { data } = await axios.get("http://localhost:8080/brands");
  return data;
};
