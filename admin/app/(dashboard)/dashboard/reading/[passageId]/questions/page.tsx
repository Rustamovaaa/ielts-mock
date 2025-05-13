import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';

async function getQuestions(passageId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/question?passage=${passageId}`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function QuestionPage({ params }: RouteParams) {
  const { passageId } = await params;
  const questions = await getQuestions(passageId);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Questions</h1>
        <Button asChild>
          <Link href={`/dashboard/reading/${passageId}/questions/create`}>
            <Plus className="mr-2 h-4 w-4" /> New Question
          </Link>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Text</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-gray-400 text-lg">
                  No questions found. Click <span className="font-semibold text-blue-600">New Question</span> to add your first one!
                </TableCell>
              </TableRow>
            ) : (
              questions.map((q: any) => (
                <TableRow key={q._id}>
                  <TableCell>{q.title || <span className="italic text-gray-400">No title</span>}</TableCell>
                  <TableCell>{q.type}</TableCell>
                  <TableCell>{q.text}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button asChild size="sm" variant="secondary">
                      <Link href={`/dashboard/reading/${passageId}/questions/${q._id}/view`}><Eye className="h-4 w-4 mr-1" />View</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/dashboard/reading/${passageId}/questions/${q._id}/edit`}><Pencil className="h-4 w-4 mr-1" />Edit</Link>
                    </Button>
                    <Button asChild size="sm" variant="destructive">
                      <Link href={`/dashboard/reading/${passageId}/questions/${q._id}/delete`}><Trash2 className="h-4 w-4 mr-1" />Delete</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}