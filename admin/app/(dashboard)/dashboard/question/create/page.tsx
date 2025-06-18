import React from 'react'
import QuestionCreateForm from '@/components/forms/question-create.form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';


const CreateQuestionPage = async ({ searchParams }: RouteParams) => {
  const { passageId } = await searchParams;
  
  if (!passageId) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Passage ID is required to create a question.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl ml-0 md:ml-12 py-10">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/dashboard/listening/${passageId}/questions`}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Questions
          </Link>
        </Button>
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600 tracking-tight">
          Create Question
        </h1>
      </div>
      <p className="text-gray-500 mb-8 text-base max-w-2xl">Fill out the form below to add a new question to this listening test.</p>
      <div className="w-full max-w-2xl">
        <QuestionCreateForm passageId={passageId} />
      </div>
    </div>
  );
};

export default CreateQuestionPage;
