import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-5xl">

        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="VRA Logo"
            width={90}
            height={90}
            className="object-contain opacity-90"
          />
        </div>

        {/* BRAND */}
        <p className="tracking-[0.5em] text-zinc-500 mb-6 text-sm">
          VRA VERIFY
        </p>

        {/* TITLE */}
        <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tight">
          Luxury
          <br />
          Authentication
          <br />
          Infrastructure
        </h1>

        {/* SUBTEXT */}
        <p className="text-zinc-500 text-lg mt-10 max-w-3xl mx-auto">
          Premium verification system for rare sneakers,
          luxury fashion, and collectible assets.
        </p>

        {/* BUTTON */}
        <div className="mt-14">
          <a
            href="/cert/UL-2026-000001"
            className="bg-white text-black px-10 py-5 rounded-full text-xl font-semibold hover:scale-105 transition"
          >
            View Certificate
          </a>
        </div>

      </div>
    </main>
  );
}