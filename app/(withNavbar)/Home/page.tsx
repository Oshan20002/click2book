import React from "react";

export default function Home() {
  return (
    <main className="bg-white">
      {/* Theam Topics */}
      <div className="bg-blue-200 w-full min-h-screen px-4 sm:px-6 lg:px-16 py-10 bg-base-100">
        <h1 className="text-6xl text-center font-bold mt-16">
          Book Any Service
        </h1>
        <h1 className="text-6xl text-center font-bold mt-5 text-slate-500">
          In One Place
        </h1>
        <h5 className="text-2xl text-center ml-56 w-2/3 mt-6">
          Connect with trusted service providers across Sri Lanka. From
          healthcare to home maintenance, find everything you need.
        </h5>

        {/* Search Bar Section */}
        <div className="flex justify-center w-full mt-12 px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 bg-base-300 rounded-2xl shadow-md p-6 w-full max-w-5xl">
            {/* Search Input */}
            <label className="input flex items-center gap-2 bg-white border border-slate-400 rounded-lg px-3 py-2 w-64">
              <svg
                className="h-5 w-5 text-slate-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"
                />
              </svg>
              <input
                type="search"
                placeholder="Search services..."
                className="w-full focus:outline-none"
              />
            </label>

            {/* Location Dropdown */}
            <div className="dropdown dropdown-start ">
              <div
                tabIndex={0}
                role="button"
                className="btn w-48 border border-slate-400 bg-white text-slate-700 font-medium hover:bg-slate-100 w-64"
              >
                📍 Location
              </div>
              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow-md"
              >
                <li>
                  <a>Colombo</a>
                </li>
                <li>
                  <a>Kandy</a>
                </li>
                <li>
                  <a>Galle</a>
                </li>
              </ul>
            </div>

            {/* Price Dropdown */}
            <details className="group relative rounded-lg border border-slate-400 bg-white shadow-sm w-64 h-11">
              <summary className="flex items-center justify-between p-2 text-slate-700 cursor-pointer">
                <span className="text-sm font-medium">💰 Price</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </summary>
              <div className="border-t border-gray-200 p-3 space-y-3 bg-white">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Max price is $600</span>
                  <button className="text-slate-600 underline hover:text-black">
                    Reset
                  </button>
                </div>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full border rounded-md p-1 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full border rounded-md p-1 text-sm"
                  />
                </div>
              </div>
            </details>

            {/* Search Button */}
            <button
              type="submit"
              className="btn bg-slate-600 hover:bg-slate-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              Search
            </button>
          </div>
        </div>

        {/* count */}
        <div className="flex gap-10">
          <div>
            <h1 className="text-5xl font-bold text-center mt-16 ml-64">
              1000+
            </h1>
            <p className="ml-64 mt-5">Services Booked</p>
          </div>
          <div>
            <h1 className="text-5xl font-bold text-center mt-16 ml-64">200+</h1>
            <p className="ml-64 mt-5">Trusted Providers</p>
          </div>
          <div>
            <h1 className="text-5xl font-bold text-center mt-16 ml-64">25</h1>
            <p className="ml-64 mt-5">Distric Covered</p>
          </div>
        </div>
      </div>

      <br />

      <div className="justify-center w-full mt-20 mb-10">
        <h2 className="text-center text-4xl font-bold">Browse by Category</h2>
        <p className="text-center mt-3">
          Find the perfect service provider for you needs across various
          categories
        </p>
      </div>

      <br />

      {/* categories */}
      <div className="ml-2 flex gap-10 mb-48 justify-center">
        <div className="card bg-base-100 w-96 shadow-sm ml-5 border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <figure>
            <img
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/helthcare.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvaGVsdGhjYXJlLmpwZyIsImlhdCI6MTc2MTI4OTc2MywiZXhwIjoxODQ3Njg5NzYzfQ.WwdqaHdjiC14uHeq8Lex7EZ_9NHOr6KnPq7nNLarxq4"
              alt="helthcare"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Health Care</h2>
            <p>Doctors, Nurses, physiotherapy</p>
            <p className="text-green-400">250+ services</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 w-96 shadow-sm ml-5 border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <figure>
            <img
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/education.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvZWR1Y2F0aW9uLmpwZyIsImlhdCI6MTc2MTI5MDEzMSwiZXhwIjoxNzkyODI2MTMxfQ.4868g02rfwRGp9oh-pJz1iBS2LwCsd4Fyv-d5dCECLY"
              alt="Education"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Education</h2>
            <p>Tutoring, Music, Languages</p>
            <p className="text-green-400">100+ services</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 w-96 shadow-sm ml-5 border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <figure>
            <img
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/saloon.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2Fsb29uLmpwZyIsImlhdCI6MTc2MTI5MDM4MiwiZXhwIjoxNzkyODI2MzgyfQ.Md4yFGP20W2bK1yTc9sY6JxixtTqb625-Q9Dk_fVdz8"
              alt="saloon"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Beauty & Wellness</h2>
            <p>Salons</p>
            <p className="text-green-400">250+ services</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-2 flex gap-10 mb-20 -mt-20 justify-center">
        <div className="card bg-base-100 w-96 shadow-sm ml-5 border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <figure>
            <img
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/homeservice.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvaG9tZXNlcnZpY2UuanBnIiwiaWF0IjoxNzYxMjkwOTYyLCJleHAiOjE3OTI4MjY5NjJ9.xwPueH2UnVuiBYPiTW9Evy0yB26Rx-ZYInwHmeKEaUg"
              alt="Home Services"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Home Services</h2>
            <p>Cleaning, Plumbing, Electrical</p>
            <p className="text-green-400">250+ services</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 w-96 shadow-sm ml-5 border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <figure>
            <img
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/taxi.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdGF4aS5qcGciLCJpYXQiOjE3NjEyOTExMjMsImV4cCI6MTc5MjgyNzEyM30.Dr3Rn9E1BShrymodkCEz5sdQd29IphOwfIheG_LQN7g"
              alt="Taxi"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Transportation</h2>
            <p>Taxi, Delivery</p>
            <p className="text-green-400">100+ services</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 w-96 shadow-sm ml-5 border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <figure>
            <img
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/tech.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdGVjaC5qcGciLCJpYXQiOjE3NjEyOTEyMTUsImV4cCI6MTc5MjgyNzIxNX0.D43Vo0-iFmL4SUS3rT1HQ4alKsLDBPkyYg1kzPbdkYI"
              alt="Technology"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Technology</h2>
            <p>IT Support, Repairs, Setup</p>
            <p className="text-green-400">250+ services</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="btn btn-wide mb-20 hover:scale-105 transition-transform">
          View All Categories
        </button>
      </div>

      {/* Featured Services */}

      <div className="flex w-full flex-col mb-20">
        <div className="card bg-base-300 rounded-box grid h-auto place-items-center bg-blue-200">
          <div className="justify-center w-full mt-20 mb-10">
            <h2 className="text-center text-4xl font-bold">
              Featured Services
            </h2>
            <p className="text-center mt-3">
              Top-rated services from trusted providers across Sri Lanka
            </p>
          </div>

          <div className="ml-2 flex gap-10 mb-48 justify-center">
            <div className="card bg-base-100 w-96 shadow-sm ml-5 border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
              <figure>
                <img
                  src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/helthcare.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvaGVsdGhjYXJlLmpwZyIsImlhdCI6MTc2MTI4OTc2MywiZXhwIjoxODQ3Njg5NzYzfQ.WwdqaHdjiC14uHeq8Lex7EZ_9NHOr6KnPq7nNLarxq4"
                  alt="helthcare"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Health Care</h2>
                <p>Doctors, Nurses, physiotherapy</p>
                <p className="text-green-400">250+ services</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 w-96 shadow-sm ml-5 border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
              <figure>
                <img
                  src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/education.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvZWR1Y2F0aW9uLmpwZyIsImlhdCI6MTc2MTI5MDEzMSwiZXhwIjoxNzkyODI2MTMxfQ.4868g02rfwRGp9oh-pJz1iBS2LwCsd4Fyv-d5dCECLY"
                  alt="Education"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Education</h2>
                <p>Tutoring, Music, Languages</p>
                <p className="text-green-400">100+ services</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 w-96 shadow-sm ml-5 border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
              <figure>
                <img
                  src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/saloon.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2Fsb29uLmpwZyIsImlhdCI6MTc2MTI5MDM4MiwiZXhwIjoxNzkyODI2MzgyfQ.Md4yFGP20W2bK1yTc9sY6JxixtTqb625-Q9Dk_fVdz8"
                  alt="saloon"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Beauty & Wellness</h2>
                <p>Salons</p>
                <p className="text-green-400">250+ services</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-2 flex gap-10 mb-20 -mt-20 justify-center">
            <div className="card bg-base-100 w-96 shadow-sm ml-5 border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
              <figure>
                <img
                  src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/homeservice.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvaG9tZXNlcnZpY2UuanBnIiwiaWF0IjoxNzYxMjkwOTYyLCJleHAiOjE3OTI4MjY5NjJ9.xwPueH2UnVuiBYPiTW9Evy0yB26Rx-ZYInwHmeKEaUg"
                  alt="Home Services"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Home Services</h2>
                <p>Cleaning, Plumbing, Electrical</p>
                <p className="text-green-400">250+ services</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 w-96 shadow-sm ml-5 border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
              <figure>
                <img
                  src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/taxi.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdGF4aS5qcGciLCJpYXQiOjE3NjEyOTExMjMsImV4cCI6MTc5MjgyNzEyM30.Dr3Rn9E1BShrymodkCEz5sdQd29IphOwfIheG_LQN7g"
                  alt="Taxi"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Transportation</h2>
                <p>Taxi, Delivery</p>
                <p className="text-green-400">100+ services</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 w-96 shadow-sm ml-5 border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
              <figure>
                <img
                  src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/tech.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdGVjaC5qcGciLCJpYXQiOjE3NjEyOTEyMTUsImV4cCI6MTc5MjgyNzIxNX0.D43Vo0-iFmL4SUS3rT1HQ4alKsLDBPkyYg1kzPbdkYI"
                  alt="Technology"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Technology</h2>
                <p>IT Support, Repairs, Setup</p>
                <p className="text-green-400">250+ services</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="btn btn-wide mb-20 hover:scale-105 transition-transform ">
              View All Services
            </button>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="justify-center w-full mt-20 mb-10">
        <h2 className="text-center text-4xl font-bold">How It Works</h2>
        <p className="text-center mt-3">
          Getting the service you need is simple and straightforward
        </p>
      </div>

      <div className="ml-2 flex gap-10 mb-48 justify-center">
        <div className="card bg-base-100 w-64 h-auto bg-blue-100 shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <img
              className="w-20"
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/search.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9zZWFyY2gucG5nIiwiaWF0IjoxNzYxMjk3ODI1LCJleHAiOjE3OTI4MzM4MjV9.0NI7GeA9GNtEpcOPG7KSdoDnBFcMEL5C4R_JatJwkAo"
              alt="search icon"
            />
            <p className="font-bold">Step 1</p>
            <h2 className="card-title">Search & Browse</h2>
            <p>
              Find the perfect service by searching or browsing through our
              categories. Filter by location, price, and ratings.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 w-64 h-auto bg-blue-100 shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <img
              className="w-20"
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/comparison.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9jb21wYXJpc29uLnBuZyIsImlhdCI6MTc2MTI5ODI0MiwiZXhwIjoxNzkyODM0MjQyfQ.kLB0O08YoBd_sf1lgEqug6tGi_L7Q-IkMlYpW2m34pM"
              alt="search icon"
            />
            <p className="font-bold">Step 2</p>
            <h2 className="card-title">Compare & Choose</h2>
            <p>
              Compare service providers, read reviews, check availability, and
              select the one that best fits your needs.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 w-64 h-auto bg-blue-100 shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <img
              className="w-20"
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/Pay.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9QYXkucG5nIiwiaWF0IjoxNzYxMjk4NTMxLCJleHAiOjE3OTI4MzQ1MzF9.QjWfgqeJ6sfUij4MtgdoAgt5XXhF5xKSmiPcCxp-a5Q"
              alt="search icon"
            />
            <p className="font-bold">Step 3</p>
            <h2 className="card-title">Book & Pay</h2>
            <p>
              Schedule your service at a convenient time and make secure
              payments through our platform.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 w-64 h-auto bg-blue-100 shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <img
              className="w-20"
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/rate.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9yYXRlLnBuZyIsImlhdCI6MTc2MTI5ODc0NCwiZXhwIjoxNzkyODM0NzQ0fQ.jURUQSwYazphLLQe_tWtXdPSXvG3ajOxBm5hq0sINE4"
              alt="search icon"
            />
            <p className="font-bold">Step 4</p>
            <h2 className="card-title">Enjoy Service</h2>
            <p>
              Relax while our verified professionals deliver quality service.
              Rate and review after completion.
            </p>
          </div>
        </div>
      </div>

      {/* banner */}
      <div className="ml-2 flex gap-10 mb-48 justify-center -mt-28 hover:scale-105 transition-transform">
        <div className="card bg-base-300 rounded-box grid h-20 place-items-center w-2/3 h-auto p-10 bg-blue-200">
          <h2 className="text-center text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-center mt-3">
            Join thousands of satisfied customers who trust Click2Book for all
            their service needs
          </p>
          <div className="flex justify-center gap-6 mt-8">
            <button className="btn btn-primary w-48">Find a Service</button>
            <button className="btn btn-outline btn-primary w-48">
              Primary
            </button>
          </div>
        </div>
      </div>

      
    </main>
  );
}
