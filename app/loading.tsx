export default function Loading() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="text-center">

        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 rounded-full border border-zinc-700 flex items-center justify-center animate-pulse">

            <div className="w-10 h-10 rounded-full bg-white" />

          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          VRA VERIFY
        </h1>

        <p className="text-zinc-500 tracking-[0.3em] text-sm">
          LOADING AUTHENTICATION INFRASTRUCTURE
        </p>

      </div>

    </main>
  );
}