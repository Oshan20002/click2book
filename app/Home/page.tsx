import React from "react";

export default function Home() {
  return (
    <main className="bg-gray-300 h-screen">

        {/* Navigation Bar */}
      <div className="navbar bg-base-100 shadow-sm p-3 pl-10 pr-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-bold">Click2Book</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-10 font-bold">
            <li>
              <a>Home</a>
            </li>
            <li>
              <details>
                <summary>Categories</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>How It Works</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-5">
          <a className="btn" href="Login">Login</a>
          <a className="btn bg-slate-600 text-white" href="SignUp">SignUp</a>
        </div>
      </div>

      {/* Theam Topics */}
      <h1 className="text-6xl text-center font-bold mt-16">Book Any Service</h1>
      <h1 className="text-6xl text-center font-bold mt-5 text-slate-500">In One Place</h1>
      <h5 className="text-2xl text-center ml-56 w-2/3 mt-6" >Connect with trusted service providers across Sri Lanka. From healthcare to home maintenance, find everything you need.</h5>

      <div className="flex w-full flex-col">
        <div className="card bg-base-300 rounded-box grid h-20 place-items-center w-2/3 ">content</div>
    </div>
    </main>
  );
}
