import axios from "axios";

export const notifyUser = async (Data) => {
  const { data } = await axios.post("http://localhost:8080/notifications/", {
    ...Data,
  });
  return data;
};

export const notifyAll = async (msg) => {
  const date = new Date();
  const simpleDate = String(
    `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`
  );
  const { data } = await axios.get("http://localhost:8080/users/");
  const IDarray = data.map((obj) => obj.id);
  IDarray.forEach(async (id) => {
    const NotiObj = {
      msg: msg,
      date: simpleDate,
      read: false,
      userId: id,
    };
    await axios.post("http://localhost:8080/notifications/", {
      ...NotiObj,
    });
  });
};
