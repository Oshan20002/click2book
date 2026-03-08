import React from "react";

export default function Contact() {
    return (
        <main className="w-full min-h-screen bg-base-100">
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
                <p className="text-center text-gray-500 mb-12">We’d love to hear from you!</p>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">1. Our Contact Information</h2>
                    <p className="text-gray-700 leading-relaxed">
                        You can reach Click2Book via the following methods:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Email: <a href="mailto:support@click2book.com" className="text-blue-500">support@click2book.com</a></li>
                        <li>Phone: <a href="tel:+94123456789" className="text-blue-500">+94 123 456 789</a></li>
                        <li>Address: 308/E  Pallansena Road, Negombo, Sri Lanka</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">2. Contact Form</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Fill out the form below and our team will get back to you as soon as possible.
                    </p>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            className="w-full border border-gray-300 rounded p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
}