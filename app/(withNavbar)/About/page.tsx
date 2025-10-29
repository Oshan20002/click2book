import React from "react";

export default function About() {
  return (
    <main className=" w-full min-h-screen bg-base-100">
      {/* Theam Topics */}

      <div className="">
        <div className="card bg-base-300 rounded-box grid h-auto place-items-center bg-blue-600 text-white">
          <h1 className="text-6xl text-center font-bold mt-16">
            About Click2Book
          </h1>
          <h5 className="text-2xl text-center w-2/3 mt-6 mb-16">
            Connecting Sri Lanka s finest service providers with customers who
            need reliable, professional services. We are building the future of
            local service discovery
          </h5>
        </div>
      </div>

      {/* Our Mission */}
      <div className="flex w-full flex-col lg:flex-row mt-20 m-10">
        <div className="card rounded-box grid h-auto grow p-11">
          <h1 className="font-bold text-4xl mb-6">Our Mission</h1>
          <p>
            To revolutionize how Sri Lankans find and book local services by
            creating a trusted, transparent marketplace that benefits both
            service providers and customers.
          </p>
          <br />
          <p>
            We believe everyone deserves access to quality services at fair
            prices, and every service provider deserves the opportunity to grow
            their business.
          </p>
          <br />
          <div className="flex gap-24 m-7">
            <div className="stats shadow bg-blue-100 p-5">
              <div className="stat">
                <div className="stat-value text-blue-500">1000 +</div>
                <br />
                <div className="stat-desc">Happy Customers</div>
              </div>
            </div>

            <div className="stats shadow bg-green-100 p-5">
              <div className="stat">
                <div className="stat-value text-green-500">200 +</div>
                <br />
                <div className="stat-desc">Service Providers</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card rounded-box grid h-auto grow p-11 w-full mr-16">
          <img
            className="rounded-box"
            src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/mission.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvbWlzc2lvbi5qcGciLCJpYXQiOjE3NjE1NjIwMzUsImV4cCI6MTc5MzA5ODAzNX0.P9O_bFPeXNbBTjF0E8NN-qeaCRkjfPiwOhiIaSAn0Os"
            alt=""
          />
        </div>
      </div>

      {/* Our story */}
      <div className="">
        <div className="card bg-base-300 rounded-box grid h-auto place-items-center bg-blue-100">
          <h1 className="text-4xl text-center font-bold mt-16">Our Story</h1>
          <h5 className="text-xl text-center w-2/3 mt-6 mb-16">
            Founded in 2025, Click2Book started with a simple idea: make it
            easier for Sri Lankans to find reliable local services.
          </h5>

          <div className="ml-2 flex gap-20 mb-20 justify-center">
            <div className="card bg-base-100 w-80 h-auto bg-white shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
              <div className="card-body items-center text-center">
                <img
                  className="w-20"
                  src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/lightbulb.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9saWdodGJ1bGIucG5nIiwiaWF0IjoxNzYxNTYzNTA5LCJleHAiOjE3OTMwOTk1MDl9.w2i1pQGvpk8bqyGSFrDhSQQmmEgfHbClHyA20s-JPpg"
                  alt="bulb icon"
                />
                <p className="font-bold">The Idea</p>
                <p>
                  Frustrated by the difficulty of finding reliable service providers, our founders decided to create a platform that would solve this problem for everyone.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 w-80 h-auto bg-white shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
              <div className="card-body items-center text-center">
                <img
                  className="w-20"
                  src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/rocket.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9yb2NrZXQucG5nIiwiaWF0IjoxNzYxNTYzNjg3LCJleHAiOjE3OTMwOTk2ODd9.mS8HJbOOTTAQMw-_OD03O49W4ohYUmt2MM8Hy5ByDcg"
                  alt="rockert icon"
                />
                <p className="font-bold">The Launch</p>
                <p>
                  Starting with just 50 service providers in Colombo, we quickly expanded across Sri Lanka as word spread about our reliable platform.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 w-80 h-auto bg-white shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
              <div className="card-body items-center text-center">
                <img
                  className="w-20"
                  src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/cup.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9jdXAucG5nIiwiaWF0IjoxNzYxNTYzNzk4LCJleHAiOjE3OTMwOTk3OTh9.RkJjXqwS20M3MfKnPJmdCZUyplljQknKeGTbci0Bwt0"
                  alt="search icon"
                />
                <p className="font-bold">Today</p>
                <p>
                  We are now Sri Lanka s leading service marketplace, connecting thousands of service providers with customers every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="justify-center w-full mt-20 mb-10">
        <h2 className="text-center text-4xl font-bold">Our Values</h2>
        <p className="text-center mt-3">
          These core values guide everything we do and shape our platform s culture.
        </p>
      </div>

      <div className="ml-2 flex gap-10 mb-48 justify-center">
        <div className="card bg-base-100 w-64 h-auto bg-blue-100 shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <img
              className="w-20"
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/shield.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9zaGllbGQucG5nIiwiaWF0IjoxNzYxNTY0MDg1LCJleHAiOjE3OTMxMDAwODV9.xTzdjifEEMMh6tdxfbgZYdXjIVS2FvfobuIxi-Y2TzA"
              alt="shiled icon"
            />
            <br />
            <h2 className="card-title">Trust</h2>
            <p>
              We verify all service providers and maintain transparent reviews to build trust.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 w-64 h-auto bg-blue-100 shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <img
              className="w-20"
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/star%20(1).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9zdGFyICgxKS5wbmciLCJpYXQiOjE3NjE1NjQzNTQsImV4cCI6MTc5MzEwMDM1NH0.TRwhCAVgfA1ORmB_F2XCjIT9sWtBR9-r8i6DKMO2nag"
              alt="star icon"
            />
            <br />
            <h2 className="card-title">Quality</h2>
            <p>
              We maintain high standards and only work with skilled, professional service providers.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 w-64 h-auto bg-blue-100 shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <img
              className="w-20"
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/right-arrow.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9yaWdodC1hcnJvdy5wbmciLCJpYXQiOjE3NjE1NjQ1ODUsImV4cCI6MTc5MzEwMDU4NX0.yJFRce_wCpmCtX8ulTQpKC5Ev2s6nfSnKiVg-jKyAV4"
              alt="Skip icon"
            />
            <br />
            <h2 className="card-title">Efficiency</h2>
            <p>
              We make booking services quick and easy, saving time for both customers and providers.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 w-64 h-auto bg-blue-100 shadow-sm border-b-4 border-r-4 border-2 border-slate-500 hover:scale-105 transition-transform">
          <div className="card-body items-center text-center">
            <img
              className="w-20"
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/icons/heart.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9oZWFydC5wbmciLCJpYXQiOjE3NjE1NjQ3MjEsImV4cCI6MTc5MzEwMDcyMX0.G91vt7NzUv9vHA3MnMOnqp2742NdGNjh_Fp4Gf4OaN4"
              alt="hart icon"
            />
            <br />
            <h2 className="card-title">Community</h2>
            <p>
              We support local businesses and strengthen Sri Lankan communities.
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
