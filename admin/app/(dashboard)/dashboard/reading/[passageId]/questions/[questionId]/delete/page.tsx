"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface QuestionDeletePageProps {
  params: Promise<{ passageId: string, questionId: string }>;
}

export default function QuestionDeletePage({ params }: QuestionDeletePageProps) {
  const [ids, setIds] = useState<{ passageId: string, questionId: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState<any>(null);
  const router = useRouter();  useEffect(() => {
    (async () => {      const resolvedParams = await params;
      setIds({ passageId: resolvedParams.passageId, questionId: resolvedParams.questionId });
      const res = await fetch(`/api/question/${resolvedParams.questionId}`);
      if (res.ok) {
        setQuestion(await res.json());
      }
    })();
  }, [params]);

  const handleDelete = async () => {
    if (!ids) return;
    setLoading(true);
    setError("");
    const res = await fetch(`/api/question/${ids.questionId}`, { method: "DELETE" });
    if (res.ok) {
      router.push(`/dashboard/reading/${ids.passageId}/questions`);
    } else {
      setError("Failed to delete question.");
      setLoading(false);
    }
  };

  if (!ids) return <div className="p-8">Loading...</div>;
  return (
    <div className="p-8 max-w-xl mx-auto mt-10 bg-white rounded-xl shadow border border-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Delete Question</h1>
      {question && (
        <div className="mb-6">
          <div className="text-gray-700 mb-1"><span className="font-semibold">Type:</span> {question.type}</div>
          <div className="font-medium text-lg">{question.title || question.question}</div>
        </div>
      )}
      <p className="mb-6">Are you sure you want to delete this question? This action cannot be undone.</p>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="flex gap-4">
        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Yes, Delete"}
        </Button>
        <Button variant="outline" onClick={() => router.push(`/dashboard/reading/${ids.passageId}/questions/${ids.questionId}`)} disabled={loading}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
