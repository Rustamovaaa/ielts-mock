import { getPassageWithQuestions } from '@/lib/actions/passage-detail.action';
import { notFound } from 'next/navigation';
import React from 'react';
import QuestionsForm from "@/components/ui/questions-form";
import PassageVideoPlayer from '@/components/ui/PassageVideoPlayer';
import Image from 'next/image';

const ListeningViewPage = async ({ params }: RouteParams) => {
  const { listeningId } = await params;

  const passage = await getPassageWithQuestions(listeningId);
  
  if (!passage || passage.type !== 'listening') return notFound();

  let questions: Question[] = [];
  if (passage && passage.questions && typeof passage.questions[0] === 'object') {
    questions = passage.questions as Question[];
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[80vh] p-4">
      {/* Video/Audio Section */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 overflow-y-auto max-h-full border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-green-700">{passage.title}</h2>
        
        {/* Video Player */}
        {passage.videoUrl && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Video</h3>
            <PassageVideoPlayer url={passage.videoUrl} />
          </div>
        )}
        
        {/* Audio Player */}
        {passage.audioUrl && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Audio</h3>
            <audio controls className="w-full">
              <source src={passage.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        
        {/* Image */}
        {passage.imageUrl && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Reference Image</h3>
            <Image
              src={passage.imageUrl}
              alt="Listening test image"
              className="mb-4 max-h-60 rounded shadow"
              width={600}
              height={240}
            />
          </div>
        )}
        
        {/* Instructions/Content */}
        {passage.content && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Instructions</h3>
            <div className="prose max-w-none text-gray-800 whitespace-pre-line">{passage.content}</div>
          </div>
        )}
      </div>
      
      {/* Questions */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 overflow-y-auto max-h-full border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-purple-700">Questions</h3>
        {questions && questions.length > 0 ? (
          <QuestionsForm questions={questions} />
        ) : (
          <div className="text-gray-400 italic">No questions for this listening test.</div>
        )}
      </div>
    </div>
  );
};

export default ListeningViewPage;
