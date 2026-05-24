import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function CertificatePage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await supabase
    .from("certificates")
    .select("*")
    .eq("cert_number", params.id)
    .single();

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">Certificate Not Found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full border border-zinc-800 bg-zinc-950 rounded-3xl p-10 shadow-2xl">
        <div className="space-y-6">
          <div>
            <p className="text-zinc-500 text-sm tracking-[0.3em]">
              VRA VERIFY
            </p>

            <h1 className="text-5xl font-bold mt-2">
              {data.cert_number}
            </h1>
          </div>

          <div className="border-t border-zinc-800 pt-6 space-y-4">
            <div>
              <p className="text-zinc-500 text-sm">Model</p>
              <p className="text-2xl font-semibold">
                {data.model_name}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm">Size</p>
              <p className="text-xl">{data.size}</p>
            </div>

            <div>
              <p className="text-zinc-500 text-sm">Authentication Status</p>

              <div className="inline-flex items-center gap-2 mt-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Verified Authentic
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}