"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteListeningPageProps {
  params: Promise<{ passageId: string }>;
}

export default function DeleteListeningPage({ params }: DeleteListeningPageProps) {
  const [passageId, setPassageId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  React.useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setPassageId(resolvedParams.passageId);
    })();
  }, [params]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/passage/${passageId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/dashboard/listening");
      } else {
        alert("Failed to delete listening test");
      }
    } catch (error) {
      alert("Error deleting listening test");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
      <div className="text-center">
        <Trash2 className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Listening Test</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete this listening test? This action cannot be undone.
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
