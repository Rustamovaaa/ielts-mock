import React from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

async function getPassageWithQuestions(passageId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/passage/${passageId}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const passage = await res.json();

  const questionsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/question?passage=${passageId}`,
    { cache: "no-store" }
  );
  const questions = questionsRes.ok ? await questionsRes.json() : [];
  return { ...passage, questions };
}

export default async function ListeningQuestionsPage({
  params,
}: RouteParams) {
  const { passageId } = await params;

  const passage = await getPassageWithQuestions(passageId);
  if (!passage || passage.type !== 'listening') return notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-1 flex items-center gap-2">
            <span className="inline-block bg-gradient-to-r from-green-500 to-blue-600 text-transparent bg-clip-text">
              Questions
            </span>
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-200">
              {passage.questions?.length || 0}
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Manage questions for: <span className="font-semibold">{passage.title}</span>
          </p>
        </div>
        <Button
          asChild
          className="h-11 px-6 text-base font-semibold bg-gradient-to-r from-green-600 to-blue-700 hover:from-green-700 hover:to-blue-800 shadow-md"
        >
          <Link href={`/dashboard/question/create?passage=${passageId}`}>
            <Plus className="mr-2 h-5 w-5" /> Add Question
          </Link>
        </Button>
      </div>

      <Separator />

      <div className="overflow-x-auto">
        <div className="rounded-xl shadow-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
                  Question
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
                  Type
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">
                  Order
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200 font-semibold text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!passage.questions || passage.questions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-10 text-gray-400 dark:text-gray-500 text-lg"
                  >
                    No questions found. Click{' '}
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      Add Question
                    </span>{' '}
                    to add your first one!
                  </TableCell>
                </TableRow>
              ) : (
                passage.questions.map((q: any) => (
                  <TableRow
                    key={q._id}
                    className="hover:bg-green-50/60 dark:hover:bg-green-900/30 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-white max-w-[300px] truncate">
                      {q.question || (
                        <span className="italic text-gray-400">No question text</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="inline-block rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 px-2 py-0.5 text-xs font-semibold">
                        {q.type?.replace('_', ' ') || 'Unknown'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 dark:text-gray-400">{q.order || 'N/A'}</span>
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="group border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/40"
                      >
                        <Link href={`/dashboard/question/${q._id}/edit`} className="flex items-center gap-1">
                          <span>Edit</span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="destructive"
                        className="group hover:bg-red-100 dark:hover:bg-red-900/40"
                      >
                        <Link href={`/dashboard/question/${q._id}/delete`} className="flex items-center gap-1">
                          <span>Delete</span>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
