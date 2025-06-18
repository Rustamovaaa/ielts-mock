"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passageSchema } from "@/lib/validation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
type PassageFormValues = z.infer<typeof passageSchema>;

interface ListeningEditPageProps {
  params: Promise<{ passageId: string }>;
}

export default function ListeningEditPage({ params }: ListeningEditPageProps) {
  // Next.js migration: params may be a Promise in future
  const [passageId, setPassageId] = React.useState<string | null>(null);
  React.useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setPassageId(resolvedParams.passageId);
    })();
  }, [params]);

  const router = useRouter();
  const form = useForm<PassageFormValues>({
    resolver: zodResolver(passageSchema),
    defaultValues: async () => {
      const res = await fetch(`/api/passage/${passageId}`);
      if (!res.ok) return {} as PassageFormValues;
      return await res.json();
    },
  });
  const { handleSubmit, control, formState: { isSubmitting, isSubmitSuccessful, errors }, setValue } = form;

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/passage/${passageId}`);
      if (res.ok) {
        const data = await res.json();
        const fields = ["title", "description", "type", "imageUrl", "videoUrl", "content", "audioUrl"];
        fields.forEach((key) => setValue(key as any, data[key]));
      }
    })();
  }, [passageId, setValue]);

  const onSubmit = async (data: PassageFormValues) => {
    const res = await fetch(`/api/passage/${passageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push(`/dashboard/listening/${passageId}/view`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800 mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">Edit Listening Test</h2>
      <div className="grid grid-cols-1 gap-5">
        <label>Title</label>
        <Input {...form.register("title")} placeholder="Listening test title" />
        <label>Description</label>
        <Input {...form.register("description")} placeholder="Short description" />
        <label>Video URL</label>
        <Input {...form.register("videoUrl")} placeholder="https://www.youtube.com/watch?v=..." />
        <label>Audio URL</label>
        <Input {...form.register("audioUrl")} placeholder="https://..." />
        <label>Image URL</label>
        <Input {...form.register("imageUrl")} placeholder="https://..." />
        <label>Instructions/Content</label>
        <MDEditor value={form.watch("content") || ""} onChange={val => form.setValue("content", val || "")} height={250} preview="edit" className="bg-white dark:bg-gray-900 rounded" />
      </div>
      {isSubmitSuccessful && <div className="text-green-600 text-sm font-medium bg-green-50 border border-green-200 rounded p-2">Listening test updated successfully!</div>}
      {Object.keys(errors).length > 0 && <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded p-2">Please fix the errors above.</div>}
      <Button type="submit" className="w-full h-11 text-base font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
        Save Changes
      </Button>
    </form>
  );
};
