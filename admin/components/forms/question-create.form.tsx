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

const questionCreateSchema = z.object({
  passage: z.string().regex(/^[a-f\d]{24}$/i),
  title: z.string().optional(),
  question: z.string(),
  type: z.enum(["matching", "multiple_choice", "fill_summary", "fill_note"]),
  image: z.string().optional(),
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
      image: "",
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
          <FormField name="question" control={control} render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Question text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
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
          <FormField name="image" control={control} render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://... (optional)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="order" control={control} render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <FormControl>
                <Input type="string" {...field} placeholder="Order (optional)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
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
          {(type === "fill_summary" || type === "fill_note") && (
            <FormField name="correctAnswer" control={control} render={({ field }) => (
              <FormItem>
                <FormLabel>Correct Answer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Correct answer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          )}
        </div>
        {isSubmitSuccessful && <div className="text-green-600 text-sm font-medium bg-green-50 border border-green-200 rounded p-2">Question created successfully!</div>}
        {Object.keys(errors).length > 0 && <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded p-2">Please fix the errors above.</div>}
        <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
          Create Question
        </Button>
      </form>
    </Form>
  );
}
