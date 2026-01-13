// components/Footer.tsx
"use client"; // only needed if you’re using App Router and plan to include client hooks

import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
          <div className="w-32 h-32 flex flex-col items-center justify-center">
            <img
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Logo/Logo%20No%20background.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMb2dvL0xvZ28gTm8gYmFja2dyb3VuZC5wbmciLCJpYXQiOjE3NjgzMjcwMzQsImV4cCI6MTc5OTg2MzAzNH0.GMugnPI1_2zV3M0kiKpS865CAFtzH_B6V1kbWvn2Y6I"
              alt=""
            />
            <p><b>Click 2 Book</b></p>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>

      <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <p>© 2026. All rights reserved. Click 2 Book</p>
          <div className="w-24 h-24 flex items-center justify-center">
            <img
              src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Logo/Logo%20No%20background.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMb2dvL0xvZ28gTm8gYmFja2dyb3VuZC5wbmciLCJpYXQiOjE3NjgzMjcwMzQsImV4cCI6MTc5OTg2MzAzNH0.GMugnPI1_2zV3M0kiKpS865CAFtzH_B6V1kbWvn2Y6I"
              alt=""
            />
          </div>
          </div>
      </footer>
    </>
  );
};

export default Footer;
