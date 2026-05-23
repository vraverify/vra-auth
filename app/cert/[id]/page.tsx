import { supabase } from "@/lib/supabase"
import QRCode from "react-qr-code"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

export default async function CertPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: cert } = await supabase
    .from("certificates")
    .select("*")
    .eq("cert_number", id)
    .single()

  if (!cert) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        CERTIFICATE NOT FOUND
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-10">
      <div className="w-full max-w-md bg-[#07070a] border border-white/10 rounded-[40px] p-6">

        <p className="text-xs tracking-[0.3em] text-white/40 mb-2">
          AUTHENTICATION STATUS
        </p>

        <h1 className="text-5xl font-bold mb-10">
          VERIFIED
        </h1>

        {/* IMAGE SLIDER */}
        <div className="mb-8">
          <Swiper
            spaceBetween={12}
            slidesPerView={1}
          >
            {cert.image_urls?.map((url: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  className="w-full rounded-3xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="space-y-8">

          <div>
            <p className="text-white/40 text-sm">
              CERTIFICATE ID
            </p>

            <p className="mt-1 text-3xl font-semibold">
              {cert.cert_number}
            </p>
          </div>

          <div>
            <p className="text-white/40 text-sm">
              MODEL
            </p>

            <p className="mt-1 text-xl">
              {cert.model_name}
            </p>
          </div>

          <div>
            <p className="text-white/40 text-sm">
              SIZE
            </p>

            <p className="mt-1 text-xl">
              US {cert.size}
            </p>
          </div>

          <div>
            <p className="text-white/40 text-sm">
              VERIFIED DATE
            </p>

            <p className="mt-1 text-lg">
              {cert.verify_date}
            </p>
          </div>

        </div>

        {/* QR CODE */}
        <div className="mt-10 flex justify-center">
          <div className="bg-white p-4 rounded-3xl">
            <QRCode
              value={`https://vra-auth-qshe.vercel.app/cert/${cert.cert_number}`}
              size={120}
            />
          </div>
        </div>

      </div>
    </main>
  )
}