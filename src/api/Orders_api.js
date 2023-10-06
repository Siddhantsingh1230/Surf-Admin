import axios from "axios";

export const getAllOrders = async () => {
    const {data} = await axios.get("http://localhost:8080/orders");
    return data;
};

export const updateOrder = async (order) => {
    const {data} = await axios.patch("http://localhost:8080/orders/"+order.id,{
        ...order
    });
    return order;
};
