"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {

  const [certificateId, setCertificateId] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!certificateId.trim()) return;

    router.push(`/cert/${certificateId.trim()}`);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden">
      <div className="text-center max-w-7xl">

        <div className="absolute top-8 right-8 flex gap-8 text-sm">

  <a href="/about">
    About
  </a>

  <a href="/process">
    Process
  </a>

  <a href="/contact">
    Contact
  </a>

</div>

        {/* LOGO */}
        <div className="flex justify-center mb-10">
          <Image
            src="/logo.png"
            alt="VRA Logo"
            width={420}
            height={420}
            className="object-contain opacity-95 w-[300px] md:w-[550px]"
            priority
          />
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-[140px] font-bold leading-[0.9] tracking-tight text-center">
          Luxury
          <br />
          Authentication
          <br />
          Infrastructure
        </h1>
<div className="mt-16 flex flex-col items-center gap-4">

  <input
    type="text"
    placeholder="Enter Certificate ID"
    value={certificateId}
    onChange={(e) => setCertificateId(e.target.value)}
    className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-full px-8 py-5 text-center text-white"
  />

  <button
    onClick={handleSearch}
    className="bg-white text-black px-10 py-5 rounded-full text-xl font-semibold hover:scale-105 transition duration-300"
  >
    Search Certificate
  </button>

</div>
      </div>
    </main>
  );
}