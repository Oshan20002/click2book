// pages/services/design.tsx
import React from "react";

export default function Design() {
  return (
    <main className="w-full min-h-screen bg-base-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-4">Design</h1>
        <p className="text-center text-gray-500 mb-12">
          Creating user-friendly and visually appealing experiences
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
          <p className="text-gray-700 leading-relaxed">
            We focus on designing intuitive and visually attractive user interfaces for web and mobile applications. Our design process combines creativity with usability to enhance user engagement.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>UI/UX design for web & mobile apps</li>
            <li>Wireframes & prototypes</li>
            <li>Graphic & visual design</li>
            <li>Design audits and usability testing</li>
          </ul>
        </section>
      </div>
    </main>
  );
}