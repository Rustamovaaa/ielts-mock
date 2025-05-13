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

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type PassageFormValues = z.infer<typeof passageSchema>;

export default function PassageCreateForm() {
  const router = useRouter();
  const form = useForm<PassageFormValues>({
    resolver: zodResolver(passageSchema),
    defaultValues: {
        title: "",
        description: "",
        type: "reading",
        passage_image: "",
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
        router.push("/dashboard/reading");
      }, 1000);
    }
  };

  return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800 ml-0 md:ml-8">
          <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">Create New Passage</h2>
          <Separator />
          <div className="grid grid-cols-1 gap-5">
            <FormField name="title" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Passage title" />
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
            <FormField name="passage_image" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="content" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <MDEditor
                    value={field.value}
                    onChange={field.onChange}
                    height={250}
                    preview="edit"
                    className="bg-white dark:bg-gray-900 rounded"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          {isSubmitSuccessful && <div className="text-green-600 text-sm font-medium bg-green-50 border border-green-200 rounded p-2">Passage created successfully!</div>}
          {Object.keys(errors).length > 0 && <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded p-2">Please fix the errors above.</div>}
          <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
            Create Passage
          </Button>
        </form>
      </Form>
  );
}
