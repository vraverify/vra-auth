import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden">
      <div className="text-center max-w-7xl">

        {/* LOGO */}
        <div className="flex justify-center mb-10">
          <Image
            src="/logo.png"
            alt="VRA Logo"
            width={420}
            height={420}
            className="object-contain opacity-95 w-[220px] md:w-[420px]"
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

        {/* BUTTON */}
        <div className="mt-16">
          <a
            href="/cert/UL-2026-000001"
            className="bg-white text-black px-10 py-5 rounded-full text-xl font-semibold hover:scale-105 transition duration-300"
          >
            View Certificate
          </a>
        </div>

      </div>
    </main>
  );
}