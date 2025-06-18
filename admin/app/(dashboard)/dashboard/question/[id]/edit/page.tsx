"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Loader2, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";

const questionSchema = z.object({
  passage: z.string().regex(/^[a-f\d]{24}$/i),
  title: z.string().optional(),
  question: z.string(),
  type: z.enum(['matching', 'multiple_choice', 'fill_summary', 'fill_note']),
  imageUrl: z.string().optional(),
  order: z.number().optional(),
  options: z.array(z.object({ text: z.string(), isCorrect: z.boolean() })).optional(),
  pairs: z.array(z.object({ left: z.string(), right: z.string() })).optional(),
  correctAnswer: z.string().optional(),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

export default function QuestionEditPage({ params }: { params: { id: string } } | { params: Promise<{ id: string }> }) {
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [question, setQuestion] = useState<any>(null);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      let qid = params as any;
      if (typeof qid.then === "function") {
        qid = await qid;
      }
      setQuestionId(qid.id);
    })();
  }, [params]);

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      passage: "",
      title: "",
      question: "",
      type: "multiple_choice",
      imageUrl: "",
      order: 1,
      options: [{ text: "", isCorrect: false }],
      pairs: [{ left: "", right: "" }],
      correctAnswer: "",
    },
  });

  const { handleSubmit, control, formState: { isSubmitting, isSubmitSuccessful, errors }, setValue, watch } = form;
  const questionType = watch("type");

  useEffect(() => {
    if (questionId) {
      (async () => {
        const res = await fetch(`/api/question/${questionId}`);
        if (res.ok) {
          const data = await res.json();
          setQuestion(data);
          Object.keys(data).forEach((key) => {
            if (key in form.getValues()) {
              setValue(key as any, data[key]);
            }
          });
        }
      })();
    }
  }, [questionId, setValue]);

  const onSubmit = async (data: QuestionFormValues) => {
    const res = await fetch(`/api/question/${questionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push(`/dashboard/listening/${data.passage}/questions`);
    }
  };

  if (!question) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl ml-0 md:ml-12 py-10">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/dashboard/listening/${question.passage}/questions`}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Questions
          </Link>
        </Button>
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600 tracking-tight">
          Edit Question
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
          <FormField name="title" control={control} render={({ field }) => (
            <FormItem>
              <FormLabel>Title (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Question title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />          <FormField name="question" control={control} render={({ field }) => (
            <FormItem>
              <FormLabel>Question Text</FormLabel>
              <FormControl>
                <textarea 
                  {...field} 
                  placeholder="Enter your question text here..." 
                  rows={6}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="type" control={control} render={({ field }) => (
            <FormItem>
              <FormLabel>Question Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                  <SelectItem value="matching">Matching</SelectItem>
                  <SelectItem value="fill_summary">Fill Summary</SelectItem>
                  <SelectItem value="fill_note">Fill Note</SelectItem>
                </SelectContent>
              </Select>
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
                  />
                  {field.value && (
                    <div className="mt-3">
                      <Image
                        src={field.value}
                        alt="Question image"
                        width={80}
                        height={80}
                        className="w-32 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="order" control={control} render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="1" onChange={(e) => field.onChange(parseInt(e.target.value) || 1)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Question Type Specific Fields */}
          {questionType === 'multiple_choice' && (
            <div className="space-y-4">
              <FormLabel>Options</FormLabel>
              {watch("options")?.map((_, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <FormField name={`options.${index}.text`} control={control} render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} placeholder={`Option ${index + 1}`} />
                      </FormControl>
                    </FormItem>
                  )} />
                  <FormField name={`options.${index}.isCorrect`} control={control} render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input type="checkbox" checked={field.value} onChange={field.onChange} className="w-4 h-4" />
                      </FormControl>
                    </FormItem>
                  )} />
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => {
                const currentOptions = watch("options") || [];
                setValue("options", [...currentOptions, { text: "", isCorrect: false }]);
              }}>
                <Plus className="w-4 h-4 mr-1" /> Add Option
              </Button>
            </div>
          )}

          {questionType === 'matching' && (
            <div className="space-y-4">
              <FormLabel>Matching Pairs</FormLabel>
              {watch("pairs")?.map((_, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <FormField name={`pairs.${index}.left`} control={control} render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} placeholder="Left side" />
                      </FormControl>
                    </FormItem>
                  )} />
                  <FormField name={`pairs.${index}.right`} control={control} render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} placeholder="Right side" />
                      </FormControl>
                    </FormItem>
                  )} />
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => {
                const currentPairs = watch("pairs") || [];
                setValue("pairs", [...currentPairs, { left: "", right: "" }]);
              }}>
                <Plus className="w-4 h-4 mr-1" /> Add Pair
              </Button>
            </div>
          )}

          {(questionType === 'fill_summary' || questionType === 'fill_note') && (
            <FormField name="correctAnswer" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter the correct answer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          )}

          {isSubmitSuccessful && <div className="text-green-600 text-sm font-medium bg-green-50 border border-green-200 rounded p-2">Question updated successfully!</div>}
          {Object.keys(errors).length > 0 && <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded p-2">Please fix the errors above.</div>}

          <Button type="submit" className="w-full h-11 text-base font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
            Update Question
          </Button>
        </form>
      </Form>
    </div>
  );
}
