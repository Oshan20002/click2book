// pages/presskit.tsx
import React from "react";

export default function PressKit() {
  return (
    <main className="w-full min-h-screen bg-base-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-4">Press Kit</h1>
        <p className="text-center text-gray-500 mb-12">
          Resources for media, partners, and press inquiries
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">1. Brand Assets</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our brand assets include logos, color palettes, and official images for use in articles,
            publications, or presentations. Please follow our guidelines when using them.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a href="/assets/logo.png" className="text-blue-500" target="_blank" rel="noreferrer">
                Click2Book Logo (PNG)
              </a>
            </li>
            <li>
              <a href="/assets/logo.svg" className="text-blue-500" target="_blank" rel="noreferrer">
                Click2Book Logo (SVG)
              </a>
            </li>
            <li>
              <a href="/assets/brand-guidelines.pdf" className="text-blue-500" target="_blank" rel="noreferrer">
                Brand Guidelines (PDF)
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">2. Media Kit</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our media kit provides press releases, company info, and official photos for journalists and partners.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a href="/assets/press-release.pdf" className="text-blue-500" target="_blank" rel="noreferrer">
                Latest Press Release (PDF)
              </a>
            </li>
            <li>
              <a href="/assets/company-factsheet.pdf" className="text-blue-500" target="_blank" rel="noreferrer">
                Company Factsheet (PDF)
              </a>
            </li>
            <li>
              <a href="/assets/press-photos.zip" className="text-blue-500" target="_blank" rel="noreferrer">
                Press Photos (ZIP)
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">3. Contact for Press</h2>
          <p className="text-gray-700 leading-relaxed">
            For media inquiries, interviews, or partnership opportunities, please contact our PR team:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
            <li>Email: <a href="mailto:press@click2book.com" className="text-blue-500">press@click2book.com</a></li>
            <li>Phone: <a href="tel:+94123456789" className="text-blue-500">+94 123 456 789</a></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">4. Guidelines</h2>
          <p className="text-gray-700 leading-relaxed">
            When using Click2Book assets, please follow these guidelines:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
            <li>Do not modify logos or brand materials.</li>
            <li>Do not use assets in a misleading or inappropriate context.</li>
            <li>Always credit Click2Book when using our materials publicly.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}