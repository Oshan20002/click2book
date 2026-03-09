// pages/jobs.tsx
import React from "react";

export default function Jobs() {
    return (
        <main className="w-full min-h-screen bg-base-100">
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-4xl font-bold text-center mb-4">Join Our Team</h1>
                <p className="text-center text-gray-500 mb-12">
                    Explore career opportunities at Click2Book
                </p>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">1. Current Openings</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We’re always looking for talented individuals to join our team. Current positions include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Frontend Developer (React/Next.js)</li>
                        <li>Backend Developer (Node.js / API)</li>
                        <li>Mobile App Developer (React Native / Flutter)</li>
                        <li>UI/UX Designer</li>
                        <li>Marketing Specialist</li>
                        <li>Customer Support Representative</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">2. Why Work With Us</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Collaborative and inclusive work environment</li>
                        <li>Opportunities for personal and professional growth</li>
                        <li>Innovative projects and cutting-edge technology</li>
                        <li>Flexible working hours and remote options</li>
                        <li>Competitive compensation and benefits</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">3. How to Apply</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Interested candidates can submit their CV and portfolio to our HR team via email:
                        <br />
                        <a href="mailto:careers@click2book.com" className="text-blue-500">careers@click2book.com</a>
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        Make sure to include your resume, relevant experience, and a short message explaining why you’d be a great fit for Click2Book.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">4. Our Culture</h2>
                    <p className="text-gray-700 leading-relaxed">
                        At Click2Book, we value innovation, teamwork, and integrity. Our goal is to create a positive environment where every team member can thrive and contribute to our mission of making service booking simple and seamless.
                    </p>
                </section>
            </div>
        </main>
    );
}