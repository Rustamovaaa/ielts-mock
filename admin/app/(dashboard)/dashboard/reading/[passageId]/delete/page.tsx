"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PassageDeletePage({ params }: { params: { passageId: string } } | { params: Promise<{ passageId: string }> }) {
  // Next.js migration: params may be a Promise in future
  const [passageId, setPassageId] = React.useState<string | null>(null);
  React.useEffect(() => {
    (async () => {
      let pid = params as any;
      if (typeof pid.then === "function") {
        pid = await pid;
      }
      setPassageId(pid.passageId);
    })();
  }, [params]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/passage/${passageId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/dashboard/reading");
    } else {
      setError("Failed to delete passage.");
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto mt-10 bg-white rounded-xl shadow border border-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Delete Passage</h1>
      <p className="mb-6">Are you sure you want to delete this passage? This action cannot be undone.</p>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="flex gap-4">
        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Yes, Delete"}
        </Button>
        <Button variant="outline" onClick={() => router.push(`/dashboard/reading/${passageId}/view`)} disabled={loading}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
