import logo from "../assets/logo.webp";
function Header() {
  return (
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-sky-100 text-sm mb-3 sticky top-0 z-50">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <a
            className="flex-none text-xl font-semibold dark:text-white focus:outline-none focus:opacity-80"
            href="#"
            aria-label="Brand"
          >
            <img src={logo} alt="Logo" height="80px" width="120px" />
          </a>
        </div>
        <div
          id="hs-navbar-example"
          className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
          aria-labelledby="hs-navbar-example-collapse"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <a
              className="font-medium text-blue-500 focus:outline-none"
              href="#"
              aria-current="page"
            >
              Home
            </a>
            <a
              className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
              href="#"
            >
              Trips
            </a>
            <a
              className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
              href="#"
            >
              Check-In
            </a>
            <a
              className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
              href="#"
            >
              6E-Rewards
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
