import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">

      <div className="text-center max-w-2xl">

        <p className="tracking-[0.4em] text-white/40 text-sm mb-4">
          VRA VERIFY
        </p>

        <h1 className="text-7xl font-semibold leading-none mb-6">
          Luxury Authentication Infrastructure
        </h1>

        <p className="text-white/50 text-lg mb-10">
          Premium verification system for rare sneakers,
          luxury fashion, and collectible assets.
        </p>

        <Link
          href="/cert/UL-2026-000001"
          className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium"
        >
          View Certificate
        </Link>

      </div>

    </main>
  );
}