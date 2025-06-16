"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";

const questionCreateSchema = z.object({
  passage: z.string().regex(/^[a-f\d]{24}$/i),
  title: z.string().optional(),
  question: z.string(),
  type: z.enum(["matching", "multiple_choice", "fill_summary", "fill_note"]),
  imageUrl: z.string().optional(),
  order: z.number().optional(),
  options: z.array(z.object({ text: z.string(), isCorrect: z.boolean() })).optional(),
  pairs: z.array(z.object({ left: z.string(), right: z.string() })).optional(),
  correctAnswer: z.string().optional(),
});
type QuestionFormValues = z.infer<typeof questionCreateSchema>;

export default function QuestionCreateForm({ passageId }: { passageId: string }) {
  const router = useRouter();
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionCreateSchema),
    defaultValues: {
      passage: passageId,
      title: "",
      question: "",
      type: "multiple_choice",
      imageUrl: "",
      order: undefined,
      options: [{ text: "", isCorrect: false }, { text: "", isCorrect: false }],
      pairs: [{ left: "", right: "" }],
      correctAnswer: "",
    },
  });
  const { handleSubmit, control, formState: { isSubmitting, isSubmitSuccessful, errors }, watch } = form;
  const optionsField = useFieldArray({ control, name: "options" });
  const pairsField = useFieldArray({ control, name: "pairs" });
  const type = watch("type");

  const onSubmit = async (data: QuestionFormValues) => {
    const res = await fetch("/api/question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setTimeout(() => {
        router.push(`/dashboard/reading/${passageId}/questions`);
      }, 1000);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800 ml-0 md:ml-8">
        <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">Create New Question</h2>
        <Separator />
        <div className="grid grid-cols-1 gap-5">
          <FormField name="title" control={control} render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Question title (optional)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          {type !== "fill_summary" && (
            <FormField name="question" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Question text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          )}
          <FormField name="type" control={control} render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                    <SelectItem value="matching">Matching</SelectItem>
                    <SelectItem value="fill_summary">Fill Summary</SelectItem>
                    <SelectItem value="fill_note">Fill Note</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          {type === "fill_summary" && (
            <>
              <FormField name="question" control={control} render={({ field }) => {
                const [mdValue, setMdValue] = useState(field.value || "");
                useEffect(() => {
                  field.onChange(mdValue);
                  // eslint-disable-next-line
                }, [mdValue]);
                return (
                  <FormItem>
                    <FormLabel>Passage (Rich Text, Markdown Supported)</FormLabel>
                    <FormControl>
                      <div data-color-mode="light">
                        <MDEditor
                          value={mdValue}
                          onChange={val => setMdValue(val || "")}
                          height={200}
                          preview="edit"
                          textareaProps={{ placeholder: "Write or paste the passage here..." }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }} />
              <FormField name="imageUrl" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Image (optional)</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-start gap-2 w-full">
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
                            "flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-700 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold shadow hover:from-blue-800 hover:to-indigo-800 transition-all duration-150",
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
                        <div className="mt-2">
                          <Image
                            src={field.value}
                            alt="Question image preview"
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
              <div className="space-y-4 mt-4">
                <FormLabel>Answers (Fill in the blanks)</FormLabel>
                {pairsField.fields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    {/* Hidden left field for backend compatibility */}
                    <FormField name={`pairs.${idx}.left`} control={control} render={({ field }) => (
                      <input type="hidden" {...field} value="" />
                    )} />
                    <FormField name={`pairs.${idx}.right`} control={control} render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder={`Correct answer ${idx + 1}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {pairsField.fields.length > 1 && (
                      <Button type="button" size="icon" variant="ghost" onClick={() => pairsField.remove(idx)}><Trash2 className="h-4 w-4" /></Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => pairsField.append({ left: "", right: "" })}>
                  <Plus className="h-4 w-4 mr-1" /> Add Answer
                </Button>
              </div>
            </>
          )}
          {type === "multiple_choice" && (
            <div className="space-y-4">
              <FormLabel>Options</FormLabel>
              {optionsField.fields.map((field, idx) => (
                <div key={field.id} className="flex items-center gap-2 mb-2">
                  <FormField name={`options.${idx}.text`} control={control} render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} placeholder={`Option ${idx + 1}`} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name={`options.${idx}.isCorrect`} control={control} render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input type="checkbox" checked={field.value} onChange={e => field.onChange(e.target.checked)} className="mr-1" />
                      </FormControl>
                      <FormLabel>Correct</FormLabel>
                    </FormItem>
                  )} />
                  {optionsField.fields.length > 2 && (
                    <Button type="button" size="icon" variant="ghost" onClick={() => optionsField.remove(idx)}><Trash2 className="h-4 w-4" /></Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => optionsField.append({ text: "", isCorrect: false })}>
                <Plus className="h-4 w-4 mr-1" /> Add Option
              </Button>
            </div>
          )}
          {type === "matching" && (
            <div className="space-y-4">
              <FormLabel>Pairs</FormLabel>
              {pairsField.fields.map((field, idx) => (
                <div key={field.id} className="flex items-center gap-2 mb-2">
                  <FormField name={`pairs.${idx}.left`} control={control} render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} placeholder={`Left ${idx + 1}`} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <span className="font-bold">-</span>
                  <FormField name={`pairs.${idx}.right`} control={control} render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} placeholder={`Right ${idx + 1}`} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  {pairsField.fields.length > 1 && (
                    <Button type="button" size="icon" variant="ghost" onClick={() => pairsField.remove(idx)}><Trash2 className="h-4 w-4" /></Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => pairsField.append({ left: "", right: "" })}>
                <Plus className="h-4 w-4 mr-1" /> Add Pair
              </Button>
            </div>
          )}
          {type === "fill_note" && (
            <FormField name="correctAnswer" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Note Answer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Correct answer for note (user will type this)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          )}
        </div>
        {isSubmitSuccessful && <div className="text-green-600 text-sm font-medium bg-green-50 border border-green-200 rounded p-2">Question created successfully!</div>}
        {Object.keys(errors).length > 0 && <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded p-2">Please fix the errors above.</div>}
        <div className="flex flex-col gap-2 items-center">
          <Button type="submit" className="w-full text-lg font-semibold" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
            Create Question
          </Button>
        </div>
      </form>
    </Form>
  );
}
