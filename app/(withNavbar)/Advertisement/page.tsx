// pages/services/advertisement.tsx
import React from "react";

export default function Advertisement() {
  return (
    <main className="w-full min-h-screen bg-base-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-4">Advertisement</h1>
        <p className="text-center text-gray-500 mb-12">
          Reaching your audience with impactful campaigns
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
          <p className="text-gray-700 leading-relaxed">
            We design and manage advertising campaigns to ensure your products or services reach the right audience. Our strategies combine analytics, creativity, and targeting to maximize ROI.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Online paid campaigns (Google, Facebook, Instagram)</li>
            <li>Display & video ads</li>
            <li>Targeted audience segmentation</li>
            <li>Ad performance analysis & optimization</li>
          </ul>
        </section>
      </div>
    </main>
  );
}