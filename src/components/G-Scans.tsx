"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";

export default function ScanPage() {
  const [image, setImage] = useState<File | null>(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  // Fix common OCR issues
  const correctOcrErrors = (text: string): string => {
    const corrections: Record<string, string> = {
      "ight": "light",
      "ior": "mirror",
      "al": "all",
      "t ray": "t-ray",
      "incidet": "incident",
      "relected": "reflected",
      "deident": "deviated",
      "bes": "beam",
      "mms": "mirrors",
      "ox": "or",
      "\/": "/",
      "6,=6,": "θ = θ",
    };

    let fixedText = text;
    for (const [wrong, right] of Object.entries(corrections)) {
      const regex = new RegExp(`\\b${wrong}\\b`, "gi");
      fixedText = fixedText.replace(regex, right);
    }

    return fixedText;
  };

  const summarizeText = async (text: string) => {
    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    return data.summary || "Failed to summarize.";
  };

  const handleScan = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const { data } = await Tesseract.recognize(image, "eng");
      const rawText = data.text;
      const correctedText = correctOcrErrors(rawText);
      const summarized = await summarizeText(correctedText);
      setOcrText(summarized);
    } catch (err) {
      console.error("OCR or summary failed", err);
      alert("OCR or AI summarization failed.");
    } finally {
      setLoading(false);
    }
  };

  const parseText = (text: string | undefined) => {
    if (!text) return { title: "AI Notes", tag: "Summary", content: "No content available." };
    const lines = text.split("\n").filter(Boolean);
    return {
      title: lines[0] || "AI Notes",
      tag: "Summary",
      content: lines.slice(1).join(" ") || text,
    };
  };

  const note = ocrText ? parseText(ocrText) : null;

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Image to AI Note</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      <button
        onClick={handleScan}
        disabled={!image || loading}
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Scan & Summarize"}
      </button>

      {note && (
        <div className="mt-6 p-4 bg-gray-800 rounded-xl shadow-md w-fit">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <span className="text-purple-400 ml-2 rounded-full px-3 py-1 text-sm bg-purple-700">
              {note.tag}
            </span>
          </div>
          <p className="text-sm mt-2 whitespace-pre-line">{note.content}</p>
          <p className="text-xs text-gray-400 mt-3">{new Date().toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
