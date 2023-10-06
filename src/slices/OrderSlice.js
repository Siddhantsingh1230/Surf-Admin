import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllOrders, updateOrder } from "../api/Orders_api";

const initialState = {
  orders: [],
  status: "idle",
  totalItems:0,
};

export const getOrdersAsync = createAsyncThunk("Orders/get", async (page) => {
  const data = await getAllOrders(page);
  return data;
});
export const updateOrderAsync = createAsyncThunk(
  "Orders/update",
  async (order) => {
    const data = await updateOrder(order);
    return data;
  }
);

export const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.data;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getOrdersAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const updatedArray = state.orders.map((obj) => {
          if (obj.id === action.payload.id) {
            return { ...action.payload };
          } else {
            return obj;
          }
        });
        state.orders = updatedArray;
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

// export const { increment } = ordersSlice.actions;

export default ordersSlice.reducer;
