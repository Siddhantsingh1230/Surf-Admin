import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {notifyUser,notifyAll} from "../api/Notification_api";

const initialState ={
    state: "idle",
}

export const notifyAllAsync = createAsyncThunk(
    "Notifications/notifyAll",
    async (notification) =>{
        const data = await notifyAll(notification);
        return data;
    });

export const notifyUserAsync = createAsyncThunk(
        "Notifications/notifyUser",
        async (notification) =>{
            const data = await notifyUser(notification);
            return data;
        });

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(notifyAllAsync.pending,(state) =>{
            state.status = "loading";
        })
        builder.addCase(notifyAllAsync.fulfilled,(state,action) =>{
            state.status = "idle";
            console.log(action.payload);
        })
        builder.addCase(notifyAllAsync.rejected,(state) =>{
            state.status = "idle";
        })

        .addCase(notifyUserAsync.pending,(state) =>{
            state.status = "loading";
        })
        builder.addCase(notifyUserAsync.fulfilled,(state,action) =>{
            state.status = "idle";
            console.log(action.payload);
        })
        builder.addCase(notifyUserAsync.rejected,(state) =>{
            state.status = "idle";
        })
    }
});

export default notificationSlice.reducer;