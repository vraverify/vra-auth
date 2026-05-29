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
    .eq("certificate_id", id)
    .single();

  if (error || !cert) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Certificate Not Found
        </h1>
      </main>
    );
  }

  const images =
    Array.isArray(cert.images) && cert.images.length > 0
      ? cert.images
      : cert.image_url
      ? [cert.image_url]
      : [];

  return (
    <main className="min-h-screen bg-black text-white px-4 md:px-6 py-10 md:py-20 flex items-center justify-center">

      <div className="w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-[32px] overflow-hidden shadow-2xl">

        {/* CONTENT */}
        <div className="p-6 md:p-14">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">

            <p className="text-zinc-500 tracking-[0.3em] text-xs md:text-sm">
              VRA CERTIFICATE
            </p>

            <div className="bg-white text-black px-4 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide">
              VERIFIED
            </div>

          </div>

          {/* TITLE */}
          <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-10">
            {cert.model_name || "Unknown Product"}
          </h1>

          {/* METADATA */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-zinc-300">

            <div>
              <p className="text-zinc-500 mb-2 text-xs md:text-sm">
                BRAND
              </p>

              <p className="text-lg md:text-xl font-semibold">
                {cert.brand || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 mb-2 text-xs md:text-sm">
                SIZE
              </p>

              <p className="text-lg md:text-xl font-semibold">
                {cert.size || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 mb-2 text-xs md:text-sm">
                CONDITION
              </p>

              <p className="text-lg md:text-xl font-semibold">
                {cert.condition || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 mb-2 text-xs md:text-sm">
                VERIFIED
              </p>

              <p className="text-lg md:text-xl font-semibold">
                {cert.verified_at || "-"}
              </p>
            </div>

          </div>

          {/* NOTES */}
          {cert.notes && (
            <div className="mt-12 p-6 border border-zinc-800 rounded-3xl bg-black">

              <p className="text-zinc-500 text-xs md:text-sm mb-4 tracking-[0.2em]">
                AUTHENTICATION NOTES
              </p>

              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {cert.notes}
              </p>

            </div>
          )}

          {/* CERTIFICATE ID */}
          <div className="mt-12 p-6 border border-zinc-800 rounded-3xl bg-black">

            <p className="text-zinc-500 text-xs md:text-sm mb-2 tracking-[0.2em]">
              CERTIFICATE ID
            </p>

            <p className="text-2xl md:text-3xl font-bold break-all">
              {cert.certificate_id}
            </p>

          </div>

          {/* FOOTER */}
          <div className="mt-12 pt-8 border-t border-zinc-800 flex items-center justify-between">

            <div>
              <p className="text-zinc-500 text-xs md:text-sm">
                VERIFIED BY
              </p>

              <p className="font-semibold text-sm md:text-base">
                {cert.inspector || "VRA VERIFY"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-zinc-500 text-xs md:text-sm">
                STATUS
              </p>

              <span
  className={
    cert.status === "AUTHENTIC"
      ? "text-green-400 font-bold text-lg md:text-2xl"
      : cert.status === "FAKE"
      ? "text-red-500 font-bold text-lg md:text-2xl"
      : "text-yellow-400 font-bold text-lg md:text-2xl"
  }
>
                {cert.status === "AUTHENTIC"
                  ? "PASS"
                  : cert.status === "FAKE"
                  ? "NOT PASS"
                  : "UNVERIFIED"}
              </span>

            </div>

          </div>

        </div>

        {/* IMAGE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-black">

          {images.map((image: string, index: number) => (
            <div
              key={index}
              className="relative aspect-square w-full rounded-3xl overflow-hidden bg-zinc-900"
            >

              <Image
                src={image}
                alt={`Product Image ${index + 1}`}
                fill
                className="object-cover"
              />

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}