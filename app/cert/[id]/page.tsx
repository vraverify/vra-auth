import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log("PARAM ID:", id);

  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("certificate_id", id)
    .single();

  console.log("DATA:", data);
  console.log("ERROR:", error);

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
          fontSize: "32px",
        }}
      >
        Certificate Not Found
      </main>
    );
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

      <p>{data.model_name}</p>

      <p>{data.size}</p>
    </main>
  );
}