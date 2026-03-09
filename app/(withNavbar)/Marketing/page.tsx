
// pages/services/marketing.tsx
import React from "react";

export default function Marketing() {
  return (
    <main className="w-full min-h-screen bg-base-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-4">Marketing</h1>
        <p className="text-center text-gray-500 mb-12">
          Helping your business reach the right audience
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
          <p className="text-gray-700 leading-relaxed">
            We create and implement digital marketing strategies to help your business grow. From social media management to SEO and content marketing, we ensure your brand reaches the right audience effectively.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Social media strategy & management</li>
            <li>Search engine optimization (SEO)</li>
            <li>Content creation & marketing</li>
            <li>Email marketing campaigns</li>
          </ul>
        </section>
      </div>
    </main>
  );
}