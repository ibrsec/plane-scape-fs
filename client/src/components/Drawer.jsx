

const Drawer = ({
  openState,
  setOpenState,
  header,
  headerIcon,
  contentComponent = <div></div>,
}) => {


  return (
    <>
      {/* drawer component */}
      <div 
        id="drawer-example"
        className={
          "fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-home-bg w-80 shadow-2xl " +
          (openState ? " translate-x-0" : " translate-x-96")
        }
        //  -translate-x-full
        tabIndex={-1}
        aria-labelledby="drawer-label"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center gap-2 mb-4 text-base font-semibold text-gray-500  "
        >
          {/* icon */}
          {/* <MdOutlineFilterAlt size='20'/> */}
          {headerIcon}
          {header}
        </h5>

        {/* close button */}
        <button
          type="button"
          data-drawer-hide="drawer-example"
          aria-controls="drawer-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => setOpenState(false)}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        {/* <Filters /> */}
        {contentComponent}
      </div>
    </>
  );
};

export default Drawer;
