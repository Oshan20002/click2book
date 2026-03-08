// pages/about-us.tsx
import React from "react";

export default function AboutUs() {
    return (
        <main className="w-full min-h-screen bg-base-100">
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
                <p className="text-center text-gray-500 mb-12">Learn more about Click2Book</p>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">1. Our Mission</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Click2Book’s mission is to make booking services easy, fast, and secure for everyone.
                        We aim to provide a seamless platform where users can discover, book, and enjoy
                        services with confidence.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">2. Our Vision</h2>
                    <p className="text-gray-700 leading-relaxed">
                        We envision a world where planning activities, trips, and services is effortless,
                        personalized, and enjoyable. Our platform strives to connect users with services
                        they love.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">3. Our Values</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Customer-Centric: Prioritizing user satisfaction in every feature we build.</li>
                        <li>Innovation: Continuously improving our platform with the latest technologies.</li>
                        <li>Integrity: Operating with transparency and respect for privacy.</li>
                        <li>Reliability: Ensuring that our services are safe, consistent, and trustworthy.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">4. Our Story</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Click2Book started in 2023 with a simple idea: simplify the way people book
                        services online. From small beginnings, we have grown into a trusted platform
                        used by thousands of users to discover and book their favorite services.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">5. Meet the Team</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Our team is composed of passionate professionals from tech, marketing, and
                        customer support backgrounds, all working together to provide the best booking
                        experience possible.
                    </p>
                </section>
            </div>
        </main>
    );
}