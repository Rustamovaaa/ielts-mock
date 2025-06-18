import { getPassageWithQuestions } from '@/lib/actions/passage-detail.action';
import { notFound } from 'next/navigation';
import React from 'react';
import QuestionsForm from "@/components/ui/questions-form";
import PassageVideoPlayer from '@/components/ui/PassageVideoPlayer';
import Image from 'next/image';

const ReadingViewPage = async ({ params }: RouteParams) => {
  const { readingId } = await params;

  const passage = await getPassageWithQuestions(readingId);
  console.log('Passage data:', passage);
  
  if (!passage) return notFound();

  let questions: Question[] = [];
  if (passage && passage.questions && typeof passage.questions[0] === 'object') {
    questions = passage.questions as Question[];
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[80vh] p-4">
      {/* Passage text */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 overflow-y-auto max-h-full border border-gray-200">        <h2 className="text-2xl font-bold mb-4 text-blue-700">{passage.title}</h2>        {passage.imageUrl && (
          <Image src={passage.imageUrl} alt="Passage image" className="mb-4 max-h-60 rounded shadow" width={600} height={240} />
        )}
        {passage.videoUrl && <PassageVideoPlayer url={passage.videoUrl} />}
        <div className="prose max-w-none text-gray-800 whitespace-pre-line">{passage.content}</div>
      </div>
      {/* Questions */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 overflow-y-auto max-h-full border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-purple-700">Questions</h3>
        {questions && questions.length > 0 ? (
          <QuestionsForm questions={questions} />
        ) : (
          <div className="text-gray-400 italic">No questions for this passage.</div>
        )}
      </div>
    </div>
  );
};

export default ReadingViewPage;