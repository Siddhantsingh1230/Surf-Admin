import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CubeIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAsync } from "../slices/ProductSlice";

const EditProductModal = ({
  openEdit,
  setOpenEdit,
  currentProduct,
}) => {
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState();
  useEffect(() => {
    if (currentProduct) {
      setTitle(currentProduct.title);
      setPrice(currentProduct.price);
      setDescription(currentProduct.description);
      setDiscountPercentage(currentProduct.discountPercentage);
    }
  }, [currentProduct]);
  return (
    <Transition.Root show={openEdit} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 "
        initialFocus={cancelButtonRef}
        onClose={setOpenEdit}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="h-full w-full relative" >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-2 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <CubeIcon
                          className="h-6 w-6 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Edit Product #{currentProduct?.id}
                        </Dialog.Title>
                        {currentProduct && (
                          <div className="mt-2 ">
                            <label
                              htmlFor="title"
                              className="m-2 mb-3 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 w-60 sm:w-96 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                              <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Product Title"
                                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                              />

                              <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Title
                              </span>
                            </label>

                            <label
                              htmlFor="price"
                              className="m-2 mb-3 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 w-60 sm:w-96 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                              <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                              />

                              <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Price
                              </span>
                            </label>

                            <label
                              htmlFor="description"
                              className="m-2 mb-3 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 w-60 sm:w-96 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                              <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                              />

                              <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Description
                              </span>
                            </label>

                            <label
                              htmlFor="discountPercentage"
                              className="m-2 mb-3 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 w-60 sm:w-96 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                              <input
                                type="number"
                                id="discountPercentage"
                                value={discountPercentage}
                                onChange={(e) =>
                                  setDiscountPercentage(e.target.value)
                                }
                                placeholder="Discount"
                                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                              />

                              <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Discount
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={() => {
                        if(price && discountPercentage && title.trim().length!=0 && description.trim().length!=0 ){
                            dispatch(
                                updateProductAsync({
                                  ...currentProduct,
                                  title,
                                  description,
                                  price,
                                  discountPercentage,
                                })
                              );
                              setOpenEdit(false);
                        }
                      }}
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpenEdit(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditProductModal;
