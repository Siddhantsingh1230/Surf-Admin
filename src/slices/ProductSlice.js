import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  searchProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  addProduct,
} from "../api/Product_api";

const initialState = {
  products: [],
  currentProduct: null,
  status: "idle",
};

export const getAllProductsAsync = createAsyncThunk(
  "Products/getAll",
  async () => {
    const data = await getAllProducts();
    return data;
  }
);
export const addProductAsync = createAsyncThunk("Products/add", async (product) => {
  const data = await addProduct(product);
  return data;
});
export const getProductByIdAsync = createAsyncThunk(
  "Products/getById",
  async (productId) => {
    const data = await getProductById(productId);
    return data;
  }
);

export const searchProductAsync = createAsyncThunk(
  "Products/search",
  async (searchterm) => {
    const data = await searchProduct(searchterm);
    return data;
  }
);
export const deleteProductAsync = createAsyncThunk(
  "Products/delete",
  async (productId) => {
    const data = await deleteProduct(productId);
    return data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "Products/update",
  async (product) => {
    const data = await updateProduct(product);
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(searchProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(searchProductAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const filteredArray = state.products.filter(
          (obj) => obj.id !== action.payload
        );
        state.products = filteredArray;
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const updatedArray = state.products.map((obj) => {
          if (obj.id === action.payload.id) {
            return { ...obj, ...action.payload };
          } else {
            return obj;
          }
        });
        state.products = updatedArray;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentProduct = action.payload;
      })
      .addCase(getProductByIdAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
        console.log(action.payload)
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

// export const { increment } = authSlice.actions;

export default authSlice.reducer;
