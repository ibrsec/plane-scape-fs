import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"; 

import { PiBookmarkSimpleDuotone } from "react-icons/pi"; 
import useBookingServices from "../../services/useBookingServices"; 

const DeleteModal = ({ open, setOpen, id }) => {
  // while deleting a booking, this modal asks to user that 'are you sure?'
  const { deleteBookingApi } = useBookingServices();

  //delete a booking confirm handle
  const handleSubmit = (e) => {
    e.preventDefault();

    deleteBookingApi(id);

    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-auto scroll-smooth rounded-lg bg-gradient-to-r to-home-bg from-box-bg text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8  data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 pb-10"
            // sm:w-full sm:max-w-lg
          >
            <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4  ">
              <div className="sm:flex sm:items-start   ">
                <div className="sm:flex sm:items-start w-full  h-full  ">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-transparent sm:mx-0 sm:h-10 sm:w-10 ">
                    <PiBookmarkSimpleDuotone
                      className="text-primary-color"
                      size="45px"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full h-full ">
                    <DialogTitle
                      as="h3"
                      className="text-xl font-bold  leading-6 text-primary-color translate-y-2"
                    >
                      Delete the booking
                    </DialogTitle>

                    <div className="mt-10 w-full h-full px-5 ">
                      <form
                        className="my-5 flex items-center justify-center flex-col gap-1  "
                        onSubmit={handleSubmit}
                      >
                        <p className="text-slate-500 my-4">Are you sure? You are deleting a booked flight!</p>

                            {/* modal buttons */}
                            <div className="mt-3 mb-5 justify-center flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => { 
                                  setOpen(false);
                                }}
                                className="btn-primary w-[150px] bg-home-bg text-primary-color hover:bg-primary-color hover:text-home-bg"
                              >
                                Cancel
                              </button>
                              <button
                                className="btn-primary w-[150px]"
                                type="submit"
                              >
                                Delete
                              </button>
                            </div> 
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
