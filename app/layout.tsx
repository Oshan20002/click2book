import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Click2Book',
  description: 'Services booking webapp',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}