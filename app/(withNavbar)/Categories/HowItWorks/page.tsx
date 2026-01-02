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

      
    </main>
  );
}
