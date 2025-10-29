import React from "react";

export default function HowItWorks() {
  return (
    <main className=" w-full min-h-screen bg-base-100">
      {/* Theam Topics */}

      <div className="">
        <div className="card bg-base-300 rounded-box grid h-auto place-items-center bg-blue-600 text-white">
          <h1 className="text-6xl text-center font-bold mt-16">
            How Click2Book Works
          </h1>
          <h5 className="text-2xl text-center w-2/3 mt-6 mb-16">
            Getting the service you need is simple, secure, and straightforward.
            Follow these 4 easy steps to connect with trusted professionals.
          </h5>
        </div>
      </div>

      <div className="justify-center w-full mt-20 mb-10 text-center">
        <h2 className="text-4xl font-bold">Simple 4-Step Process</h2>
        <br />
        <p className="text-xl">
          From finding the right service to enjoying quality results
        </p>
      </div>

      {/* Step 01 */}
      <div className="flex w-full flex-col lg:flex-row mt-20 m-10">
        <div className="card rounded-box grid h-auto grow p-11 w-full mr-16">
          <div className="flex gap-3 mb-5">
            <img
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/search.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9zZWFyY2gucG5nIiwiaWF0IjoxNzYxNjU1MTgxLCJleHAiOjE3OTMxOTExODF9.tHDpSmb5TJXsRVZ0uNLEs6PEjUyBeWPr9hw0ZZEX2OM"
              alt="Search"
              className="w-10 h-10"
            />
            <h2 className="text-2xl text-blue-400">STEP 1</h2>
          </div>
          <h1 className="font-bold text-4xl mb-6">Search & Browse</h1>
          <p>
            Find the perfect service by searching or browsing through our
            categories. Filter by location, price, and ratings to find exactly
            what you need.
          </p>
          <br />
          <div>
            <ul className="ml-5 list-disc">
              <li className="pt-2">Browse 8+ service categories</li>
              <li className="pt-2">Search by location</li>
              <li className="pt-2">Filter by price range and ratings</li>
              <li className="pt-2">View detailed service descriptions</li>
            </ul>
          </div>
        </div>
        <div className="card rounded-box grid h-auto grow p-11 w-full mr-16">
          <img
            className="rounded-box"
            src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/search.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2VhcmNoLmpwZyIsImlhdCI6MTc2MTY1NjA2NCwiZXhwIjoxNzkzMTkyMDY0fQ.dJeQ3kIz3MfGgsEDi4wX63FDd1WKAuDy7dqvi-HbIEM"
            alt="search"
          />
        </div>
      </div>

      {/* Step 02 */}
      <div className="flex w-full flex-col lg:flex-row mt-20 m-10">
        <div className="card rounded-box grid h-auto grow p-11 w-full mr-16">
          <img
            className="rounded-box"
            src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/compare.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvY29tcGFyZS5qcGciLCJpYXQiOjE3NjE2NTY3MTksImV4cCI6MTc5MzE5MjcxOX0.2WsG2SjeK2r6gCglYvELT3iAm-TE5qGb_u2vYmA3xGM"
            alt="compare"
          />
        </div>

        <div className="card rounded-box grid h-auto grow p-11 w-full mr-16">
          <div className="flex gap-3 mb-5">
            <img
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/comparison.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9jb21wYXJpc29uLnBuZyIsImlhdCI6MTc2MTY1NjgyMywiZXhwIjoxNzkzMTkyODIzfQ.t9H07VExsm9V_K4qSekXh-QnRoncUA7pQzSl3s_SxP0"
              alt="Search"
              className="w-10 h-10"
            />
            <h2 className="text-2xl text-blue-400">STEP 2</h2>
          </div>
          <h1 className="font-bold text-4xl mb-6">Compare & Choose</h1>
          <p>
            Compare service providers, read authentic reviews, check
            availability, and select the one that best fits your needs and
            budget.
          </p>
          <br />
          <div>
            <ul className="ml-5 list-disc">
              <li className="pt-2">Compare prices and services</li>
              <li className="pt-2">Read verified customer reviews</li>
              <li className="pt-2">Check provider ratings and badges</li>
              <li className="pt-2">View portfolio and past work</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step 03 */}
      <div className="flex w-full flex-col lg:flex-row mt-20 m-10">
        <div className="card rounded-box grid h-auto grow p-11 w-full mr-16">
          <div className="flex gap-3 mb-5">
            <img
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/Pay.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9QYXkucG5nIiwiaWF0IjoxNzYxNjU3OTU1LCJleHAiOjE3OTMxOTM5NTV9.q9CqlRniH9SOIVwtjpaRhKEmilRxMRaYoT0e3dERKfM"
              alt="Search"
              className="w-10 h-10"
            />
            <h2 className="text-2xl text-blue-400">STEP 3</h2>
          </div>
          <h1 className="font-bold text-4xl mb-6">Book & Pay</h1>
          <p>
            Schedule your service at a convenient time and make secure payments
            through our platform with multiple payment options.
          </p>
          <br />
          <div>
            <ul className="ml-5 list-disc">
              <li className="pt-2">Choose convenient time slots</li>
              <li className="pt-2">Secure online payment system</li>
              <li className="pt-2">Multiple payment methods</li>
              <li className="pt-2">Instant booking confirmation</li>
            </ul>
          </div>
        </div>
        <div className="card rounded-box grid h-auto grow p-11 w-full mr-16">
          <img
            className="rounded-box"
            src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/BookandPay.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvQm9va2FuZFBheS5qcGciLCJpYXQiOjE3NjE2NTc5OTksImV4cCI6MTc5MzE5Mzk5OX0.24uaHO760DUZH6jbBw0AGx5U-Ji2zGSN7WsekpZ32r4"
            alt="search"
          />
        </div>
      </div>

      {/* Step 04 */}
      <div className="flex w-full flex-col lg:flex-row mt-20 m-10">
        <div className="card rounded-box grid h-auto grow p-11 w-full mr-16">
          <img
            className="rounded-box"
            src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/enjoy.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvZW5qb3kuanBnIiwiaWF0IjoxNzYxNzMzODIzLCJleHAiOjE3OTMyNjk4MjN9.YQMTRz2vt6ejOqvc-c8AX17pmKe80QLWSD4eDTJbZ9A"
            alt="compare"
          />
        </div>

        <div className="card rounded-box grid h-auto grow p-11 w-full mr-16">
          <div className="flex gap-3 mb-5">
            <img
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/rate.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9yYXRlLnBuZyIsImlhdCI6MTc2MTczMzg5NywiZXhwIjoxNzkzMjY5ODk3fQ.LCff8ZCbSaV-1Jyhqs_20qiDcwlns8oi-MMI7-07WmE"
              alt="Search"
              className="w-10 h-10"
            />
            <h2 className="text-2xl text-blue-400">STEP 4</h2>
          </div>
          <h1 className="font-bold text-4xl mb-6">Enjoy Service</h1>
          <p>
            Relax while our verified professionals deliver quality service. Rate
            and review after completion to help others.
          </p>
          <br />
          <div>
            <ul className="ml-5 list-disc">
              <li className="pt-2">Verified professional providers</li>
              <li className="pt-2">Quality service guarantee</li>
              <li className="pt-2">Real-time service updates</li>
              <li className="pt-2">Post-service rating system</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Why Choose Click2Book? */}
      <div className="justify-center w-full mt-20 mb-10">
        <h2 className="text-center text-4xl font-bold">Why Choose Click2Book?</h2>
        <p className="text-center mt-3">
          We provide peace of mind with every booking
        </p>
      </div>

      <div className="ml-2 flex gap-10 mb-48 justify-center">
        <div className="card bg-base-100 w-64 h-auto bg-blue-100 shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <img
              className="w-20"
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/shield%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9zaGllbGQgKDEpLnBuZyIsImlhdCI6MTc2MTczOTI1MCwiZXhwIjoxNzkzMjc1MjUwfQ.Qf6Ae9vAoByn_kqQ-lWxTL9DsIgM7fdmGMCEGfhEGZs"
              alt="shiled icon"
            />
            <br />
            <h2 className="card-title">Vefified Providers</h2>
            <p>
              All service providers are 
              thoroughly vetted and verified for quality and reliability
            </p>
          </div>
        </div>

        <div className="card bg-base-100 w-64 h-auto bg-blue-100 shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <img
              className="w-20"
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/credit-card.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9jcmVkaXQtY2FyZC5wbmciLCJpYXQiOjE3NjE3MzkzNjcsImV4cCI6MTc5MzI3NTM2N30.CH3sIliWU-wmW4oagtIcf9KvApbFNUZRIlNoaw3YuCY"
              alt="star icon"
            />
            <br />
            <h2 className="card-title">Secure Payments</h2>
            <p>
              Secure payment processing with multiple 
              payment options and buyer protection.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 w-64 h-auto bg-blue-100 shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <img
              className="w-20"
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/24-hours.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy8yNC1ob3Vycy5wbmciLCJpYXQiOjE3NjE3MzkxNTgsImV4cCI6MTc5MzI3NTE1OH0.ZlNxPN8Z2RBTBqVu9VUmAa_-2yrw5d9_vO16E_206e8"
              alt="Skip icon"
            />
            <br />
            <h2 className="card-title">24/7 Support</h2>
            <p>
              Round-the-clock customer support to help you with any questions or concerns.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 w-64 h-auto bg-blue-100 shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <img
              className="w-20"
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/quality-assurance.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9xdWFsaXR5LWFzc3VyYW5jZS5wbmciLCJpYXQiOjE3NjE3MzkzMjAsImV4cCI6MTc5MzI3NTMyMH0.yRU9I2Pv0mBzh7JVwUjC36LqS5qxjyC0ZTxs3r0eAf4"
              alt="hart icon"
            />
            <br />
            <h2 className="card-title">Quality Guarantee</h2>
            <p>
              Money-back guarantee if youre not 
              satisfied with the service quality.
            </p>
          </div>
        </div>
      </div>

      {/* banner */}
      <div className="ml-2 flex gap-10 mb-20 justify-center -mt-28 hover:scale-105 transition-transform">
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

      {/* footer */}
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 bg-blue-200">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4 bg-blue-200">
        <aside className="grid-flow-col items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </main>
  );
}
