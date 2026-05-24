import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: cert, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("cert_number", id)
    .single();

  if (error || !cert) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Certificate Not Found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-[40px] overflow-hidden shadow-2xl">

        {/* PRODUCT IMAGE */}
        <div className="relative w-full h-[420px] bg-black">

          {cert.image_url ? (
            <Image
              src={cert.image_url}
              alt={cert.model_name || "Product"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500">
              No Image
            </div>
          )}

          {/* VERIFIED BADGE */}
          <div className="absolute top-6 right-6 bg-white text-black px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
            VERIFIED
          </div>

        </div>

        {/* CONTENT */}
        <div className="p-10 md:p-14">

          <p className="text-zinc-500 tracking-[0.3em] text-sm mb-4">
            VRA CERTIFICATE
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-10">
            {cert.model_name || "Unknown Product"}
          </h1>

          {/* METADATA */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-zinc-300">

            <div>
              <p className="text-zinc-500 mb-2 text-sm">
                BRAND
              </p>
              <p className="text-xl font-semibold">
                {cert.brand || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 mb-2 text-sm">
                SIZE
              </p>
              <p className="text-xl font-semibold">
                {cert.size || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 mb-2 text-sm">
                CONDITION
              </p>
              <p className="text-xl font-semibold">
                {cert.condition || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 mb-2 text-sm">
                VERIFIED
              </p>
              <p className="text-xl font-semibold">
                {cert.verified_at || "-"}
              </p>
            </div>

          </div>

          {/* CERT NUMBER */}
          <div className="mt-14 p-6 border border-zinc-800 rounded-3xl bg-black">

            <p className="text-zinc-500 text-sm mb-2 tracking-[0.2em]">
              CERTIFICATE NUMBER
            </p>

            <p className="text-2xl md:text-3xl font-bold">
              {cert.cert_number}
            </p>

          </div>

          {/* FOOTER */}
          <div className="mt-14 pt-8 border-t border-zinc-800 flex items-center justify-between">

            <div>
              <p className="text-zinc-500 text-sm">
                VERIFIED BY
              </p>

              <p className="font-semibold">
                {cert.inspector || "VRA VERIFY"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-zinc-500 text-sm">
                STATUS
              </p>

              <p className="text-green-400 font-semibold">
                AUTHENTIC
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}