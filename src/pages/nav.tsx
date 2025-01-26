import { useState } from "react";
import Cookies from "js-cookie";
import ar from "../imgs/ar-removedbg.png";


export default function Nav() {
  const getCookie = Cookies.get("Login");


  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false)
  }
  const openMenu = () => {
    setIsOpen(true)
  }
  return (
    <header className="bg-gray-900">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img className="h-10 w-auto" src={ar} alt="Logo" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={openMenu}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        {/* <div className="hidden lg:flex lg:gap-x-12">
          <a href="/product" className="text-sm/6 font-semibold text-white">
            Product
          </a>
          <a href="/about" className="text-sm/6 font-semibold text-white">
            About
          </a>
          <a href="/contact" className="text-sm/6 font-semibold text-white">
            Contact Us
          </a>
        </div> */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {getCookie ? (
            <a href="/account" className="text-sm/6 font-semibold text-white">
              Account  
            </a>
          ) : (
            <a href="/login" className="text-sm/6 font-semibold text-white">
              Log in  
            </a>
          )}
          <span aria-hidden="true" className="text-sm/6 font-semibold text-white"> &rarr;</span>
        </div>
      </nav>
      {/* <!-- Mobile menu --> */}
      {isOpen && (
      <div className="block" role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={ar} alt="Logo" />
            </a>
            <button
              type="button"
              onClick={closeMenu}
              className="closed -m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                <a
                  href="/product"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800"
                >
                  Product
                </a>
                <a
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800"
                >
                  Contact us
                </a>
              </div>
              <div className="py-6">
                {getCookie ? (
                  <a
                    href="/account"
                    className="text-sm/6 font-semibold text-white"
                  >
                    Account{" "}
                  </a>
                ) : (
                  <a
                    href="/login"
                    className="text-sm/6 font-semibold text-white"
                  >
                    Log in{" "}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </header>
  );
}
