"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema } from "@/lib/validation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

type QuestionFormValues = z.infer<typeof questionSchema>;

export default function QuestionEditPage({ params }: { params: { passageId: string, questionId: string } } | { params: Promise<{ passageId: string, questionId: string }> }) {
  const [ids, setIds] = useState<{ passageId: string, questionId: string } | null>(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      let p = params as any;
      if (typeof p.then === "function") p = await p;
      setIds({ passageId: p.passageId, questionId: p.questionId });
    })();
  }, [params]);

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: async () => {
      if (!ids) return {} as QuestionFormValues;
      const res = await fetch(`/api/question/${ids.questionId}`);
      if (!res.ok) return {} as QuestionFormValues;
      return await res.json();
    },
  });
  const { handleSubmit, control, formState: { isSubmitting, isSubmitSuccessful, errors }, setValue } = form;

  useEffect(() => {
    if (!ids) return;
    (async () => {
      const res = await fetch(`/api/question/${ids.questionId}`);
      if (res.ok) {
        const data = await res.json();
        Object.keys(data).forEach((key) => setValue(key as any, data[key]));
      }
    })();
  }, [ids, setValue]);

  const onSubmit = async (data: QuestionFormValues) => {
    if (!ids) return;
    const res = await fetch(`/api/question/${ids.questionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push(`/dashboard/reading/${ids.passageId}/questions/${ids.questionId}`);
    }
  };

  if (!ids) return <div className="p-8">Loading...</div>;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800 mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">Edit Question</h2>
      <div className="grid grid-cols-1 gap-5">
        <label>Title</label>
        <Input {...form.register("title")} placeholder="Question title" />        <label>Question</label>
        <textarea 
          {...form.register("question")} 
          placeholder="Enter your question text here..." 
          rows={4}
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
        />
        {/* Add more fields as needed */}
      </div>
      {isSubmitSuccessful && <div className="text-green-600 text-sm font-medium bg-green-50 border border-green-200 rounded p-2">Question updated successfully!</div>}
      {Object.keys(errors).length > 0 && <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded p-2">Please fix the errors above.</div>}
      <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
        Save Changes
      </Button>
    </form>
  );
}
