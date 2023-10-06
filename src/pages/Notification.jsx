import React, { useState } from "react";
import { getUserId } from "../api/Auth_api";
import { notifyAll, notifyUser } from "../api/Notification_api";
import { toast } from "react-toastify";

const Notification = () => {
  const [selectedOption, setSelectedOption] = useState("radioDefault01");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.id);
  };

  const [formData, setFormData] = useState({
    notificationMessage: "", // Initialize with empty values
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const date = new Date();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedOption === "radioDefault02") {
      if (formData.notificationMessage.trim() === "") {
        alert("Textarea cannot be empty"); // You can display an alert or handle it as you prefer
        return; // Return early to prevent further processing
      }
      try {
        const userId = await getUserId(formData.email);
        const notificationData = {
          msg: formData.notificationMessage,
          date: String(
            `${String(date.getDate()).padStart(2, "0")}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}-${date.getFullYear()}`
          ),
          read: false,
          userId: userId[0].id,
        };
        const response = await notifyUser(notificationData);
        setFormData({
          notificationMessage: "",
          email: "",
        });
        setSelectedOption("radioDefault01");
        toast.success(`Notified ${formData.email}`, { pauseOnHover: false, theme: "dark" });
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    }
    if (selectedOption === "radioDefault01") {
      try {
        await notifyAll(formData.notificationMessage);
        setFormData({
          notificationMessage: "",
          email: "",
        });
        setSelectedOption("radioDefault01");
        toast.success("Notified All !!", { pauseOnHover: false, theme: "dark" });
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    }
  };

  return (
    <div>
      <form
        className="flex justify-center items-center h-full w-full"
        onSubmit={handleFormSubmit}
      >
        <div className="flex w-96 flex-col space-y-5 rounded-lg sm:border py-5 px-5 my-16 sm:shadow-xl mx-auto">
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-center text-3xl font-bold text-gray-700">
              Notification Pannel
            </h1>
            <p className="text-gray-500">Notify users </p>
          </div>

          <div>
            <div className="relative m-0 w-full">
              <textarea
                type="text"
                id="Notimsg"
                name="notificationMessage"
                value={formData.notificationMessage}
                required
                onChange={handleInputChange}
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 overflow-scroll resize-none"
                placeholder=" "
                rows="3"
              />
              <label
                htmlFor="Notimsg"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                {" "}
                Notification message{" "}
              </label>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className=" m-0 mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="radio"
                name="flexRadioDefault"
                id="radioDefault01"
                checked={selectedOption === "radioDefault01"} // Check if this radio button is selected
                onChange={handleRadioChange}
              />
              <label
                className=" inline-block pl-[0.15rem] text-xs hover:cursor-pointer"
                htmlFor="radioDefault01"
              >
                Notify All
              </label>
            </div>
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                className="relative float-left -ml-[1.5rem] mr-1 mt-2    h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="radio"
                name="flexRadioDefault"
                id="radioDefault02"
                checked={selectedOption === "radioDefault02"} // Check if this radio button is selected
                onChange={handleRadioChange}
              />
              <label
                className="mt-2.5 inline-block pl-[0.15rem] text-xs hover:cursor-pointer"
                htmlFor="radioDefault02"
              >
                Notify one
              </label>
            </div>
          </div>
          <div
            className={`${
              selectedOption === "radioDefault02" ? "" : "hidden"
            } relative mt-2 w-full`}
          >
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
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
          <button
            type="submit"
            className="hover:bg-blue-500 cursor-pointer rounded-lg bg-blue-600 py-3 font-bold text-white"
          >
            Send Notification
          </button>
        </div>
      </form>
    </div>
  );
};

export default Notification;
