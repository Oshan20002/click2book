"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToSignup() {
  const router = useRouter();

  useEffect(() => {
    router.push("/Home"); 
  }, [router]);

  return null; 
}
