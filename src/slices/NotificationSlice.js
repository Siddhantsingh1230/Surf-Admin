import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notifyUser,notifyAll } from "../api/Notification_api";

const initialState = {
    status : "idle",
};

export const notifyUserAsync = createAsyncThunk(
    "Notification/notifyUser",
    async (notification) =>{
        const data = await notifyUser(notification);
        return data;
    } 
);

export const notifyAllAsync = createAsyncThunk(
    "Notification/notifyAll",
    async (notification) =>{
        const data = await notifyAll(notification);
        return data;
    } 
);

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers : (builder)=>{
        builder.addCase(notifyAllAsync.pending, (state) =>{
            state.status = "loading";
        })
        .addCase(notifyAllAsync.fulfilled, (state) =>{
            state.status = "idle";
            console.log(action.payload);
        })
        .addCase(notifyAllAsync.rejected, (state) =>{
            state.status = "idle";
        })
        .addCase(notifyUserAsync.pending, (state) =>{
            state.status = "loading";
        })
        .addCase(notifyUserAsync.fulfilled, (state) =>{
            state.status = "idle";
            console.log(action.payload);
        })
        .addCase(notifyUserAsync.rejected, (state) =>{
            state.status = "idle";
        })
    }
    });

    export default notificationSlice.reducer;