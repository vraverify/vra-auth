export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'

export default async function CertPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const { data: cert } = await supabase
    .from('certificates')
    .select('*')
    .eq('cert_number', id)
    .single()

  if (!cert) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        CERTIFICATE NOT FOUND
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-6">

        <div className="border border-zinc-800 rounded-3xl p-8 w-full max-w-md bg-zinc-950">

          <p className="text-zinc-500 text-xs tracking-[0.3em]">
            AUTHENTICATION STATUS
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            {cert.verify_status}
          </h1>

          <div className="mt-10 space-y-6">

            <div>
              <p className="text-zinc-500 text-xs">
                CERTIFICATE ID
              </p>

              <p className="mt-1 text-lg">
                {cert.cert_number}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-xs">
                MODEL
              </p>

              <p className="mt-1 text-lg">
                {cert.model_name}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-xs">
                SIZE
              </p>

              <p className="mt-1 text-lg">
                {cert.size}
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-xs">
                VERIFIED DATE
              </p>

              <p className="mt-1 text-lg">
                {cert.verify_date}
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  )
}