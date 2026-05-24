export default function Loading() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="text-center">

        <div className="w-28 h-28 rounded-full border border-green-500/20 bg-green-500/10 flex items-center justify-center mx-auto mb-10 animate-pulse">

          <div className="w-10 h-10 rounded-full bg-green-400" />

        </div>

        <p className="tracking-[0.4em] text-zinc-500 text-sm mb-6">
          VRA VERIFY SYSTEM
        </p>

        <h1 className="text-5xl md:text-6xl font-bold">
          Verifying
        </h1>

      </div>

    </main>
  );
}