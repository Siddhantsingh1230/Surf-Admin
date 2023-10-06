import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategories, getAllBrands } from "../api/Category_Brand";
const initialState = {
  categories: [],
  brands: [],
  status: "idle",
};

export const getAllCategoriesAsync = createAsyncThunk(
  "CB/getCategories",
  async () => {
    const data = await getAllCategories();
    return data;
  }
);
export const getAllBrandsAsync = createAsyncThunk("CB/getBrands", async () => {
  const data = await getAllBrands();
  return data;
});

export const CategoryBrandSlice = createSlice({
  name: "CB",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(getAllCategoriesAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(getAllBrandsAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

// export const { increment } = authSlice.actions;

export default CategoryBrandSlice.reducer;
