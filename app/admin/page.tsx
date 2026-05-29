"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import QRCode from "qrcode";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {

  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const [deleteId, setDeleteId] = useState("");

  const [searchId, setSearchId] = useState("");
  const [lastCreatedId, setLastCreatedId] = useState("");

  const [form, setForm] = useState({
    certificate_id: "",
    model_name: "",
    brand: "",
    size: "",
    condition: "",
    verified_at: new Date().toISOString().split("T")[0],
    inspector: "",
    status: "",
    notes: "",
  });

  useEffect(() => {
    generateCertificateId();
  }, []);

  async function generateCertificateId() {

    const year = new Date().getFullYear();

    const { count } = await supabase
      .from("certificates")
      .select("*", {
        count: "exact",
        head: true,
      });

    const nextNumber = String((count || 0) + 1).padStart(6, "0");

    const generatedId =
      `VRA-SNK-${year}-${nextNumber}`;

    setForm((prev) => ({
      ...prev,
      certificate_id: generatedId,
    }));
  }

  async function uploadImages() {

    const uploadedUrls: string[] = [];

    for (const file of files) {

      const filePath =
        `${form.certificate_id}/${Date.now()}-${file.name}`;

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
if (!form.status) {
  alert("Please select status");
  return;
}

if (files.length === 0) {
  alert("Upload at least 1 image");
  return;
}
    setLoading(true);

    const uploadedImages = await uploadImages();
    const createdId = form.certificate_id;

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

setLastCreatedId(createdId);

generateCertificateId();
 }

  async function deleteCertificate() {

    if (!deleteId) {
      alert("Enter Certificate ID");
      return;
    }

    const confirmDelete = confirm(
      `Delete certificate ${deleteId}?`
    );

    if (!confirmDelete) return;

    setLoading(true);

    const { data: storageFiles } = await supabase.storage
      .from("certificate-images")
      .list(deleteId);

    if (storageFiles && storageFiles.length > 0) {

      const filePaths = storageFiles.map(
        (file) => `${deleteId}/${file.name}`
      );

      await supabase.storage
        .from("certificate-images")
        .remove(filePaths);
    }

    const { error } = await supabase
      .from("certificates")
      .delete()
      .eq("certificate_id", deleteId);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Certificate Deleted");
  }

  function openCertificate() {

    if (!searchId) {
      alert("Enter Certificate ID");
      return;
    }

    window.open(
      `/cert/${searchId}`,
      "_blank"
    );
  }
async function downloadQR() {

  if (!lastCreatedId) {
    alert("Create certificate first");
    return;
  }

  const url =
    `https://vraverify.com/cert/${lastCreatedId}`;

  const qrImage = await QRCode.toDataURL(url);

  const link = document.createElement("a");

  link.href = qrImage;
  link.download = `${lastCreatedId}.png`;

  link.click();
}
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-14">
          VRA ADMIN
        </h1>
<p className="text-red-500">
  LAST ID: {lastCreatedId}
</p>
        {/* SEARCH */}
        <div className="mb-16 border border-zinc-800 rounded-3xl p-6 bg-zinc-950">

          <h2 className="text-2xl font-bold mb-6">
            Search Certificate
          </h2>

          <div className="space-y-4">

            <input
              placeholder="Certificate ID"
              value={searchId}
              onChange={(e) =>
                setSearchId(e.target.value)
              }
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5"
            />

            <button
              onClick={openCertificate}
              className="w-full bg-blue-600 text-white rounded-2xl py-5 text-xl font-semibold"
            >
              Open Certificate
            </button>

          </div>

        </div>

        {/* CREATE */}
        <div className="space-y-6">

          <input
            value={form.certificate_id}
            readOnly
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-5 text-zinc-300"
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

          <select
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5"
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
          >

            <option value="">
              Select Status
            </option>

            <option value="AUTHENTIC">
              PASS
            </option>

            <option value="FAKE">
              NOT PASS
            </option>

            <option value="UNVERIFIED">
              UNVERIFIED
            </option>

          </select>

          <textarea
            placeholder="Authentication Notes"
            rows={6}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5"
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
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

          <input
            type="file"
            multiple
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5"
            onChange={(e) =>
              setFiles(Array.from(e.target.files || []))
            }
          />

          <p className="text-zinc-500 text-sm">
            {files.length} files selected
          </p>

          <button
            onClick={createCertificate}
            disabled={loading}
            className="w-full bg-white text-black rounded-2xl py-5 text-xl font-semibold"
          >
            {loading ? "Creating..." : "Create Certificate"}
          </button>

        </div>
{lastCreatedId && (
  <button
    onClick={downloadQR}
    className="w-full bg-green-600 text-white rounded-2xl py-5 text-xl font-semibold"
  >
    Download QR
  </button>
)}

        {/* DELETE */}
        <div className="mt-20 border-t border-zinc-800 pt-12">

          <h2 className="text-2xl font-bold mb-6 text-red-500">
            Delete Certificate
          </h2>

          <div className="space-y-4">

            <input
              placeholder="Certificate ID"
              value={deleteId}
              onChange={(e) =>
                setDeleteId(e.target.value)
              }
              className="w-full bg-zinc-900 border border-red-900 rounded-2xl px-6 py-5"
            />

            <button
              onClick={deleteCertificate}
              disabled={loading}
              className="w-full bg-red-600 text-white rounded-2xl py-5 text-xl font-semibold"
            >
              Delete Certificate
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}
