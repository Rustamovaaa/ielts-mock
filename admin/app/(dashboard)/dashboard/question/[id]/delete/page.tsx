"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

export default function DeleteQuestionPage({ params }: { params: { id: string } } | { params: Promise<{ id: string }> }) {
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [question, setQuestion] = useState<any>(null);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      let qid = params as any;
      if (typeof qid.then === "function") {
        qid = await qid;
      }
      setQuestionId(qid.id);
      
      // Fetch question details
      const res = await fetch(`/api/question/${qid.id}`);
      if (res.ok) {
        const data = await res.json();
        setQuestion(data);
      }
    })();
  }, [params]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/question/${questionId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push(`/dashboard/listening/${question.passage}/questions`);
      } else {
        alert("Failed to delete question");
      }
    } catch (error) {
      alert("Error deleting question");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!question) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
      <div className="text-center">
        <Trash2 className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Question</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Are you sure you want to delete this question?
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
            "{question.question}"
          </p>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => router.back()}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
