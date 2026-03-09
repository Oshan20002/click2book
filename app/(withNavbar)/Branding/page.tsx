// pages/services/branding.tsx
import React from "react";

export default function Branding() {
  return (
    <main className="w-full min-h-screen bg-base-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-4">Branding</h1>
        <p className="text-center text-gray-500 mb-12">
          Building a strong identity for your business
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
          <p className="text-gray-700 leading-relaxed">
            We help businesses create a clear and impactful brand identity through logo design, brand strategy, and consistent visual storytelling. Our goal is to make your brand memorable and recognizable.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Logo design and brand identity</li>
            <li>Brand strategy and guidelines</li>
            <li>Visual storytelling and messaging</li>
            <li>Marketing collateral design</li>
          </ul>
        </section>
      </div>
    </main>
  );
}