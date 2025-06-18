"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { passageSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
import Image from "next/image";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type PassageFormValues = z.infer<typeof passageSchema>;

export default function ListeningCreateForm() {
  const router = useRouter();
  const form = useForm<PassageFormValues>({
    resolver: zodResolver(passageSchema),
    defaultValues: {
        title: "",
        description: "",
        type: "listening", // Auto-select listening
        imageUrl: "",
        videoUrl: "",
        content: "",
        audioUrl: "",
    },
  });
  const { handleSubmit, control, formState: { isSubmitting, isSubmitSuccessful, errors } } = form;

  const onSubmit = async (data: PassageFormValues) => {
    const res = await fetch("/api/passage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setTimeout(() => {
        router.push("/dashboard/listening");
      }, 1000);
    }
  };

  return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800 ml-0 md:ml-8">
          <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">Create New Listening Test</h2>
          <Separator />
          <div className="grid grid-cols-1 gap-5">
            <FormField name="title" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Listening test title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="description" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Short description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="videoUrl" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL (YouTube/Direct Link)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://www.youtube.com/watch?v=..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="audioUrl" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Audio URL (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="imageUrl" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Image (Optional)</FormLabel>
                <FormControl>
                  <div className="flex flex-col items-start justify-between w-full">
                  <UploadButton<OurFileRouter, "imageUploader">
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]?.ufsUrl) {
                        field.onChange(res[0].ufsUrl);  
                      }
                    }}
                    onUploadError={(error) => {
                      alert(`Upload failed: ${error.message}`);
                    }}
                    appearance={{
                      button:
                        "flex items-center gap-2 px-4 py-2 rounded-lg border border-green-700 bg-gradient-to-r from-green-700 to-blue-700 text-white font-semibold shadow hover:from-green-800 hover:to-blue-800 transition-all duration-150",
                      container: "",
                      allowedContent: "text-xs text-gray-400 mt-1",
                    }}
                    content={{
                      button({ isUploading }) {
                        return (
                          <span className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                              />
                            </svg>
                            {isUploading ? "Yuklanmoqda..." : "Rasm yuklash"}
                          </span>
                        );
                      },
                    }}
                  />
                  {field.value && (
                    <div className="mt-3">
                      <Image
                        src={field.value}
                        alt="Listening test preview"
                        width={80}
                        height={80}
                        className="w-32 h-32 object-cover rounded border border-white/20"
                      />
                    </div>
                  )}
                </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="content" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions/Content (Optional)</FormLabel>
                <FormControl>
                  <MDEditor
                    value={field.value}
                    onChange={field.onChange}
                    height={200}
                    preview="edit"
                    className="bg-white dark:bg-gray-900 rounded"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          {isSubmitSuccessful && <div className="text-green-600 text-sm font-medium bg-green-50 border border-green-200 rounded p-2">Listening test created successfully!</div>}
          {Object.keys(errors).length > 0 && <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded p-2">Please fix the errors above.</div>}
          <Button type="submit" className="w-full h-11 text-base font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
            Create Listening Test
          </Button>
        </form>
      </Form>
  );
}
