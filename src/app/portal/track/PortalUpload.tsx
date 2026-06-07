"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface PortalUploadProps {
  readonly applicationId: string;
}

export default function PortalUpload({ applicationId }: PortalUploadProps): React.JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are permitted.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("applicationId", applicationId);

      const res = await fetch("/api/apply/document", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as { success: boolean; message?: string };
      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Upload pipeline failed.");
      }

      setSuccess(true);
      setFile(null);
      
      const fileInput = document.getElementById("file-upload") as HTMLInputElement | null;
      if (fileInput) {
        fileInput.value = "";
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload document.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 bg-slate-950/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ba5f9]/5 rounded-full blur-3xl pointer-events-none" />
      <h3 className="font-display font-semibold text-lg text-white mb-2">
        Upload Missing Financials
      </h3>
      <p className="text-slate-400 text-xs mb-4">
        Append any missing tax documents, bank statements, or merchant reports. Only secure `.pdf` documents are accepted.
      </p>

      <form onSubmit={handleUpload} className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700/60 rounded-xl p-6 hover:border-[#0ba5f9]/50 transition-smooth cursor-pointer relative bg-slate-950/50">
          <input
            type="file"
            id="file-upload"
            accept=".pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <svg className="h-8 w-8 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-bold text-slate-300">
            {file ? file.name : "Select or drag file here"}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">
            Max upload limit 10MB (PDF format)
          </span>
        </div>

        {error && (
          <div className="text-xs text-rose-450 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3.5 py-2">
            {error}
          </div>
        )}

        {success && (
          <div className="text-xs text-emerald-450 bg-emerald-500/10 border border-emerald-500/25 rounded-lg px-3.5 py-2">
            Document submitted and secured successfully.
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || !file}
          className={`w-full text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-smooth flex items-center justify-center gap-2 ${
            uploading || !file
              ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
              : "bg-[#0ba5f9] hover:bg-[#008ee3] text-white shadow-lg shadow-[#0ba5f9]/15"
          }`}
        >
          {uploading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Securing File...
            </>
          ) : (
            "Upload Document"
          )}
        </button>
      </form>
    </div>
  );
}
