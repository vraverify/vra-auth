"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [certNumber, setCertNumber] = useState("")
  const [modelName, setModelName] = useState("")
  const [size, setSize] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)

  async function createCert() {
    try {
      if (!files || files.length === 0) {
        alert("PLEASE SELECT FILES")
        return
      }

      const imageUrls: string[] = []

      for (const file of Array.from(files)) {
        const filePath = `${certNumber}/${Date.now()}-${file.name}`

        const { error: uploadError } = await supabase.storage
          .from("certificate-images")
          .upload(filePath, file)

        if (uploadError) {
          console.log(uploadError)
          alert(JSON.stringify(uploadError))
          return
        }

        const { data } = supabase.storage
          .from("certificate-images")
          .getPublicUrl(filePath)

        imageUrls.push(data.publicUrl)
      }

      const { error: insertError } = await supabase
        .from("certificates")
        .insert([
          {
            cert_number: certNumber,
            model_name: modelName,
            size: size,
            verify_date: new Date().toDateString(),
            image_urls: imageUrls,
          },
        ])

      if (insertError) {
        console.log(insertError)
        alert(JSON.stringify(insertError))
        return
      }

      alert("CERT CREATED")

      window.location.href = `/cert/${certNumber}`

    } catch (err) {
      console.log(err)
      alert(JSON.stringify(err))
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-bold mb-10">
          VRA ADMIN
        </h1>

        <div className="grid gap-5">

          <input
            placeholder="CERT NUMBER"
            className="bg-zinc-900 p-5 rounded-2xl"
            value={certNumber}
            onChange={(e) =>
              setCertNumber(e.target.value)
            }
          />

          <input
            placeholder="MODEL NAME"
            className="bg-zinc-900 p-5 rounded-2xl"
            value={modelName}
            onChange={(e) =>
              setModelName(e.target.value)
            }
          />

          <input
            placeholder="SIZE"
            className="bg-zinc-900 p-5 rounded-2xl"
            value={size}
            onChange={(e) =>
              setSize(e.target.value)
            }
          />

          <input
            type="file"
            multiple
            onChange={(e) =>
              setFiles(e.target.files)
            }
          />

          <button
            onClick={createCert}
            className="bg-white text-black p-5 rounded-2xl text-2xl font-bold"
          >
            CREATE CERT
          </button>

        </div>
      </div>
    </main>
  )
}