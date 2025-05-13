import React from 'react'
import QuestionCreateForm from '@/components/forms/question-create.form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';


const CreateQuestion = async({ params }: RouteParams) => {
  const { passageId } = await params;
  return (
    <div className="w-full max-w-4xl ml-0 md:ml-12 py-10">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/dashboard/reading/${passageId}/questions`}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Questions
          </Link>
        </Button>
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 tracking-tight">
          Create Question
        </h1>
      </div>
      <p className="text-gray-500 mb-8 text-base max-w-2xl">Fill out the form below to add a new question to this passage.</p>
      <div className="w-full max-w-2xl">
        <QuestionCreateForm passageId={passageId} />
      </div>
    </div>
  );
};

export default CreateQuestion;