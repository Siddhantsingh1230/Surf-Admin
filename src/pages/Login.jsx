import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../slices/AuthSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.admin);
  return (
    <>
    {admin && <Navigate to="/" replace={true} />}
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
            dispatch(loginAsync(data));
            reset();
        })}
        className="flex justify-center items-center h-full w-full"
      >
        <div className="flex w-96 flex-col space-y-5 rounded-lg sm:border py-10 px-5 sm:shadow-xl mx-auto">
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-center text-3xl font-bold text-gray-700">
              Surf Admin
            </h1>
            <p className="text-gray-500">Login to access your account</p>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="email"
                {...register("email", {
                  required: "Enter email",
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "Enter valid email",
                  },
                })}
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                {" "}
                Enter Email{" "}
              </label>
            </div>
            {errors.email && (
              <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="password"
                id="password"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                {...register("password", {
                  required: "Enter password",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message: `at least 8 characters,
                    must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                    and Can contain special characters`,
                  },
                })}
              />
              <label
                htmlFor="password"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                {" "}
                Enter Password
              </label>
            </div>
            {errors.password && (
              <p className="inline-flex items-center rounded-md  px-2 py-0 text-xs font-medium text-red-700 ">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="hover:bg-blue-500 cursor-pointer rounded-lg bg-blue-600 py-3 font-bold text-white"
          >
            Login
          </button>
          <Link
            className="font-medium text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
            to="/forgotpassword"
          >
            Forgot Pasword?
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
