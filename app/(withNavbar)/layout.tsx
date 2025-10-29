"use client";

// app/(withNavbar)/layout.tsx
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function WithNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar always visible */}
      <Navbar />

      {/* Main content fills remaining space */}
      <main className="flex-grow">{children}</main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}