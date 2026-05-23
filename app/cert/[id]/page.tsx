type Props = {
  params: {
    id: string
  }
}

export default function CertificatePage({ params }: Props) {
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

      <p>Certificate ID:</p>

      <h2>{params.id}</h2>
    </main>
  )
}