import axios from "axios";

export const login = async (userInput) => {
  const { data } = await axios.get(
    `http://localhost:8080/admin?email=${userInput.email}&password=${userInput.password}`
  );
  if (data.length != 0) {
    return data[0];
  }
  return Promise.reject("Login Failed");
};