import React from 'react'

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#d1e5ff] py-20 px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">About Click2Book</h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Connecting you with trusted service providers across Sri Lanka. 
          From healthcare to home maintenance, we make booking simple.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded with the goal of bridging the gap between service seekers and professionals, 
            Click2Book provides a seamless, secure, and reliable platform for all your needs.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you are a customer looking for quality work or a provider looking to grow 
            your business, we are here to support you every step of the way.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
    <img
      src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/aboutus(mission).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvYWJvdXR1cyhtaXNzaW9uKS5qcGciLCJpYXQiOjE3NzMwMDUyMDQsImV4cCI6MTgwNDU0MTIwNH0.XsJr8HYpd1mz7Ps_wnW78lAh-i-zwOKfwuI3_V24O7U"
      alt="Our Mission"
      className="w-full h-64 object-cover"
    />
  </div>
      </section>

      {/* Stats Section (Matches Homepage) */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">1000+</h3>
            <p className="text-gray-500 uppercase tracking-wide text-sm font-semibold">Services Booked</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">200+</h3>
            <p className="text-gray-500 uppercase tracking-wide text-sm font-semibold">Trusted Providers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">25</h3>
            <p className="text-gray-500 uppercase tracking-wide text-sm font-semibold">Districts Covered</p>
          </div>
        </div>
      </section>

      {/* Call to Action (Matches your Footer CTA) */}
      <section className="py-20 px-6 text-center">
        <div className="bg-[#d1e5ff] rounded-3xl p-12 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Better Service?</h2>
          <button className="bg-[#4e00ff] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
            Find a Service
          </button>
        </div>
      </section>
    </div>
  );
}