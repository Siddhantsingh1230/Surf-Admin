import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAsync,
  getAllProductsAsync,
  getProductByIdAsync,
  searchProductAsync,
} from "../slices/ProductSlice";
import SkeletonCard from "./SkeletonCard";
import DeleteProductModal from "./DeleteProductModal";
import EditProductModal from "./EditProductModal";

const ProductList = ({ search }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const currentProduct = useSelector(
    (state) => state.productList.currentProduct
  );
  const [selectedProductId, setSelectedProductId] = useState();
  const products = useSelector((state) => state.productList.products);
  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);
  useEffect(() => {
    if (search) {
      dispatch(searchProductAsync(search));
    } else {
      dispatch(getAllProductsAsync());
    }
  }, [search]);
  const deleteProduct = (id) => {
    dispatch(deleteProductAsync(id));
  };
  return (
    <>
      {products.length > 0 ? (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.length > 0 &&
                products.map((product) => (
                  <div key={product.id} className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={product.thumbnail}
                        alt={""}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.title}
                    </h3>
                    <div className="flex justify-between">
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        ₹ {product.price}
                      </p>
                      <div className="flex justify-between gap-3">
                        <button
                          onClick={() => {
                            dispatch(getProductByIdAsync(product.id));
                            setOpenEdit(true);
                          }}
                          className="px-3 rounded-md text-xs font-medium bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
                        >
                          <i className="ri-pencil-fill"></i>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProductId(product.id);
                            setOpen(true);
                          }}
                          className="px-3 rounded-md text-xs font-medium bg-red-500 text-white hover:bg-red-400 cursor-pointer"
                        >
                          <i className="ri-delete-bin-4-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <SkeletonCard />
      )}
      <DeleteProductModal
        open={open}
        deleteProduct={deleteProduct}
        selectedProductId={selectedProductId}
        setOpen={setOpen}
      />
      <EditProductModal
        openEdit={openEdit}
        currentProduct={currentProduct}
        setOpenEdit={setOpenEdit}
      />
    </>
  );
};

export default ProductList;
