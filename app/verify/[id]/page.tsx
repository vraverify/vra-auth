import Link from "next/link";

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">

        <div className="w-28 h-28 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center mx-auto mb-10 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-green-400" />
        </div>

        <p className="tracking-[0.4em] text-zinc-500 text-sm mb-6">
          VRA VERIFY SYSTEM
        </p>

        <h1 className="text-6xl md:text-7xl font-bold leading-none mb-8">
          Authenticity
          <br />
          Confirmed
        </h1>

        <p className="text-zinc-500 text-lg mb-12">
          This item has been successfully verified
          by VRA VERIFY authentication infrastructure.
        </p>

        <Link
          href={`/cert/${id}`}
          className="inline-flex items-center justify-center bg-white text-black px-10 py-5 rounded-full text-xl font-semibold hover:scale-105 transition duration-300"
        >
          View Full Certificate
        </Link>

      </div>
    </main>
  );
}