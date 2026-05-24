"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {

  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const [form, setForm] = useState({
    certificate_id: "",
    model_name: "",
    brand: "",
    size: "",
    condition: "",
    verified_at: "",
    inspector: "",
  });

  async function uploadImages() {

    const uploadedUrls: string[] = [];

    for (const file of files) {

      const filePath = `${form.certificate_id}/${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("certificate-images")
        .upload(filePath, file);

      if (error) {
        alert(error.message);
        continue;
      }

      const { data } = supabase.storage
        .from("certificate-images")
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  }

  async function createCertificate() {

    setLoading(true);

    const uploadedImages = await uploadImages();

    const { error } = await supabase
      .from("certificates")
      .insert([
        {
          ...form,
          images: uploadedImages,
          image_url: uploadedImages[0] || "",
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Certificate Created");

    window.open(
      `/cert/${form.certificate_id}`,
      "_blank"
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-14">
          VRA ADMIN
        </h1>

        <div className="space-y-6">

          <input
            placeholder="Certificate ID"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5"
            onChange={(e) =>
              setForm({
                ...form,
                certificate_id: e.target.value,
              })
            }
          />

          <input
            placeholder="Model Name"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5"
            onChange={(e) =>
              setForm({
                ...form,
                model_name: e.target.value,
              })
            }
          />

          <input
            placeholder="Brand"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5"
            onChange={(e) =>
              setForm({
                ...form,
                brand: e.target.value,
              })
            }
          />

          <input
            placeholder="Size"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5"
            onChange={(e) =>
              setForm({
                ...form,
                size: e.target.value,
              })
            }
          />

          <input
            placeholder="Condition"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5"
            onChange={(e) =>
              setForm({
                ...form,
                condition: e.target.value,
              })
            }
          />

          <input
            placeholder="Verified Date"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5"
            onChange={(e) =>
              setForm({
                ...form,
                verified_at: e.target.value,
              })
            }
          />

          <input
            placeholder="Inspector"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5"
            onChange={(e) =>
              setForm({
                ...form,
                inspector: e.target.value,
              })
            }
          />

          {/* MULTIPLE IMAGE UPLOAD */}
          <input
            type="file"
            multiple
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5"
            onChange={(e) =>
              setFiles(Array.from(e.target.files || []))
            }
          />

          <button
            onClick={createCertificate}
            disabled={loading}
            className="w-full bg-white text-black rounded-2xl py-5 text-xl font-semibold"
          >
            {loading ? "Creating..." : "Create Certificate"}
          </button>

        </div>

      </div>

    </main>
  );
}