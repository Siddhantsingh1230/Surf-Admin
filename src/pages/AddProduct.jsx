import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getAllBrandsAsync,
  getAllCategoriesAsync,
} from "../slices/CategoryBrandSlice";
import { addProductAsync } from "../slices/ProductSlice";
import {useNavigate} from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const brands = useSelector((state) => state.cab.brands);
  const categories = useSelector((state) => state.cab.categories);
  useEffect(() => {
    dispatch(getAllCategoriesAsync());
    dispatch(getAllBrandsAsync());
  }, [dispatch]);
  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        const Product = {
          title: data.title,
          description: data.description,
          price: +data.price,
          discountPercentage: +data.discountPercentage,
          rating: +data.rating,
          stock: +data.stock,
          brand: data.brand,
          category: data.category,
          thumbnail: data.thumbnail,
          images: [data.img1, data.img2, data.img3, data.img4, data.img5],
        };
        dispatch(addProductAsync(Product));
        navigate("/");
        reset();
      })}
      className="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto"
    >
      <div className="flex flex-col py-4 sm:flex-row sm:items-start">
        <div className="shrink-0 mr-auto sm:py-3">
          <p className="font-medium text-2xl">Product Detail</p>
          <p className="text-sm text-gray-600">Add new product into Surf</p>
        </div>
        <button
          onClick={() => reset()}
          className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700"
        >
          Save
        </button>
      </div>
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Title</p>
        <input
          placeholder="Name"
          {...register("title", {
            required: "Enter Product Title",
            pattern: {
              value: /[\S\s]+[\S]+/,
              message: "Enter valid Product Title",
            },
          })}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
      {errors.title && (
        <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
          {errors.title.message}
        </p>
      )}
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Description</p>
        <input
          placeholder="Description"
          {...register("description", {
            required: "Enter Product Description",
            pattern: {
              value: /[\S\s]+[\S]+/,
              message: "Enter valid Product Description",
            },
          })}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
      {errors.description && (
        <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
          {errors.description.message}
        </p>
      )}
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Price</p>
        <input
          type="number"
          placeholder="Price ₹"
          {...register("price", { required: "Enter Product Price" })}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
      {errors.price && (
        <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
          {errors.price.message}
        </p>
      )}
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Discount</p>
        <input
          type="number"
          placeholder="Percentage"
          {...register("discountPercentage", {
            required: "Enter Discount Percentage",
          })}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
      {errors.discountPercentage && (
        <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
          {errors.discountPercentage.message}
        </p>
      )}
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Stock</p>
        <input
          type="number"
          placeholder="Stock"
          {...register("stock", { required: "Enter Stock" })}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
      {errors.stock && (
        <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
          {errors.stock.message}
        </p>
      )}
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Rating</p>
        <input
          type="number"
          placeholder="Rating"
          {...register("rating", { required: "Enter Rating" })}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
      {errors.rating && (
        <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
          {errors.rating.message}
        </p>
      )}
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Thumbnail</p>
        <input
          type="text"
          placeholder="URL"
          {...register("thumbnail", {
            required: "Enter Product Thumbnail",
            pattern: {
              value: /[\S\s]+[\S]+/,
              message: "Enter valid Product Thumbnail",
            },
          })}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
      {errors.thumbnail && (
        <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
          {errors.thumbnail.message}
        </p>
      )}
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Image 1</p>
        <input
          type="text"
          placeholder="URL"
          {...register("img1", {
            required: "Enter Product Image",
            pattern: {
              value: /[\S\s]+[\S]+/,
              message: "Enter valid Product image",
            },
          })}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
      {errors.img1 && (
        <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
          {errors.img1.message}
        </p>
      )}
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Image 2</p>
        <input
          type="text"
          placeholder="URL"
          {...register("img2", {
            required: "Enter Product Image",
            pattern: {
              value: /[\S\s]+[\S]+/,
              message: "Enter valid Product image",
            },
          })}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
      {errors.img2 && (
        <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
          {errors.img2.message}
        </p>
      )}
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Image 3</p>
        <input
          type="text"
          placeholder="URL"
          {...register("img3", {
            required: "Enter Product Image",
            pattern: {
              value: /[\S\s]+[\S]+/,
              message: "Enter valid Product image",
            },
          })}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
      {errors.img3 && (
        <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
          {errors.img3.message}
        </p>
      )}
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Image 4</p>
        <input
          type="text"
          placeholder="URL"
          {...register("img4", {
            required: "Enter Product Image",
            pattern: {
              value: /[\S\s]+[\S]+/,
              message: "Enter valid Product image",
            },
          })}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
      {errors.img4 && (
        <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
          {errors.img4.message}
        </p>
      )}
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Image 5</p>
        <input
          type="text"
          placeholder="URL"
          {...register("img5", {
            required: "Enter Product Image",
            pattern: {
              value: /[\S\s]+[\S]+/,
              message: "Enter valid Product image",
            },
          })}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
      {errors.img5 && (
        <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
          {errors.img5.message}
        </p>
      )}
      <div className="flex flex-col gap-4 py-4 sm:flex-row">
        <div>
          <p className="shrink-0 w-32 font-medium">Brand</p>
          <select {...register("brand", { required: "Enter Product Brand" })}>
            <option value="">Brand</option>
            {brands.length > 0
              ? brands.map((item, idx) => (
                  <>
                    <option key={idx} value={item.value}>
                      {item.label}
                    </option>
                  </>
                ))
              : null}
          </select>
          {errors.brand && (
            <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
              {errors.brand.message}
            </p>
          )}
        </div>
        <div>
          <p className="shrink-0 w-32 font-medium">Category</p>
          <select
            {...register("category", { required: "Enter Product Category" })}
          >
            <option value="">Category</option>
            {categories.length > 0
              ? categories.map((item, idx) => (
                  <>
                    <option key={idx} value={item.value}>
                      {item.label}
                    </option>
                  </>
                ))
              : null}
          </select>
          {errors.category && (
            <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end py-4 sm:hidden">
        <button className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200">
          Clear
        </button>
        <button className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700">
          Save
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
