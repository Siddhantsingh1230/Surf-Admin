import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAsync, updateOrderAsync } from "../slices/OrderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [editOrderId, setOrderId] = useState(-1);
  useEffect(() => {
    dispatch(getOrdersAsync());
  }, [dispatch]);
  const updateOrder = (order) => {
    setOrderId(-1);
    dispatch(updateOrderAsync(order));
  };
  const colorStatus = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-900";
      case "cancelled":
        return "bg-red-200 text-red-900";
      case "shipped":
        return "bg-green-200 text-green-900";
    }
  };
  return (
    <>
      <div className="mx-auto w-full px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-medium text-2xl  text-gray-700">Orders</h2>
            <span className="text-xs text-gray-500">
              View and Manage orders of registered Surf users
            </span>
          </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Order #</th>
                  <th className="px-5 py-3">Products</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Address</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{order.id}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        {order.cart.length > 0 ? (
                          order.cart.map((item) => (
                            <div className="flex items-center">
                              <div>
                                <p className="whitespace-no-wrap">
                                  {item.title} <span>x {item.quantity}</span>
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>Empty</p>
                        )}
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          ₹ {order.totalAmount}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {order.billingaddress}
                        </p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        {editOrderId == order.id ? (
                          <select
                            onChange={(e) =>
                              updateOrder({ ...order, status: e.target.value })
                            }
                          >
                            <option value="">Select</option>
                            <option value="shipped">Shipped</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`rounded-full  px-3 py-1 text-xs font-semibold ${colorStatus(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="cursor-pointer  hover:text-blue-500 border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        {editOrderId != order.id ? (
                          <svg
                            onClick={() => setOrderId(order.id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        ) : (
                          <svg
                          onClick={()=>setOrderId(-1)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>Empty</p>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm">
              {" "}
              Showing 1 to 5 of 12 Entries{" "}
            </span>
            <div className="mt-2 inline-flex sm:mt-0">
              <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Prev
              </button>
              <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
