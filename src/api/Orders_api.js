import axios from "axios";

export const getAllOrders = async (page) => {
    // changed from http://localhost:8080/orders?_page=${page}&_limit=10
    const response = await axios.get(`http://localhost:8080/orders/all?_page=${page}&_limit=10`);
    const totalItems = response.headers["x-total-count"];
    return {data:response.data,totalItems:totalItems};
};

export const updateOrder = async (order) => {
    const {data} = await axios.patch("http://localhost:8080/orders/"+order.id,{
        ...order
    });
    return order;
};
