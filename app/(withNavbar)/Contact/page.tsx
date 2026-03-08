import React from "react";
import { Phone, MapPin, Clock } from "lucide-react"; // Optional: lucide-react for icons

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decorative Wave (Simplified) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-orange-600 -translate-y-1/2 rounded-[100%] scale-150 z-0 opacity-90"></div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row shadow-2xl rounded-xl overflow-hidden bg-white">
        
        {/* Left Side: Contact Information */}
        <div className="w-full lg:w-1/2 p-12 bg-white">
          <div className="space-y-10">
            {/* Call Us */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 uppercase tracking-wide">Call Us</h3>
                <p className="text-gray-600 mt-1 text-sm">1 (234) 567-891, 1 (234) 987-654</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 uppercase tracking-wide">Location</h3>
                <p className="text-gray-600 mt-1 text-sm">
                  121 Rock Street, 21 Avenue,<br />
                  New York, NY 92103-9000
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 uppercase tracking-wide">Business Hours</h3>
                <p className="text-gray-600 mt-1 text-sm">
                  Mon – Fri ...... 10 am – 8 pm<br />
                  Sat, Sun ...... Closed
                </p>
              </div>
            </div>
          </div>
          
          <p className="mt-16 text-xs text-gray-400 italic">
            Image from <span className="underline cursor-pointer text-gray-500">Freepik</span>
          </p>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full lg:w-1/2 p-12 bg-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 uppercase tracking-widest">
            Contact Us
          </h2>
          
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Enter your Name" 
              className="w-full p-4 rounded-md border-none focus:ring-2 focus:ring-orange-500 outline-none text-gray-700"
            />
            <input 
              type="email" 
              placeholder="Enter a valid email address" 
              className="w-full p-4 rounded-md border-none focus:ring-2 focus:ring-orange-500 outline-none text-gray-700"
            />
            <textarea 
              placeholder="Enter your message" 
           rows={5}
              className="w-full p-4 rounded-md border-none focus:ring-2 focus:ring-orange-500 outline-none text-gray-700 resize-none"
            ></textarea>
            
            <button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-full transition duration-300 uppercase tracking-widest mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      
      {/* Bottom Wave (Optional aesthetic) */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-600 rounded-full translate-x-1/2 translate-y-1/2 opacity-80 z-0"></div>
    </main>
  );
}