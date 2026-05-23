import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Props = {
  params: {
    id: string
  }
}

export default async function CertificatePage({ params }: Props) {
  const { data } = await supabase
    .from("certificates")
    .select("*")
    .eq("certificate_id", params.id)
    .single()

  if (!data) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "black",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Certificate Not Found
      </main>
    )
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        padding: "40px",
      }}
    >
      <h1>VRA VERIFY</h1>

      <h2>{data.certificate_id}</h2>

      <p>{data.brand}</p>

      <p>{data.model}</p>
    </main>
  )
}