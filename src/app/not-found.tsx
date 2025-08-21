// app/not-found.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF9F6] px-4 text-center">
      <h1 className="text-7xl font-bold text-[#1B1B1B]">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-[#1B1B1B]">
        Page Not Found
      </h2>

      <p className="mt-2 max-w-md text-[#4B4B4B]">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link href="/" className="mt-6">
        <Button className="bg-[#A3E3AF] hover:bg-[#8BD59C] text-black font-semibold px-6 py-2 rounded-xl flex items-center gap-2 shadow-md">
          <ArrowLeft size={18} />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}

