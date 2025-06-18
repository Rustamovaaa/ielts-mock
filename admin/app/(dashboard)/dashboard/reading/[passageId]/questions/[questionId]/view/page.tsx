import React from "react";
import { notFound } from "next/navigation";

async function getQuestion(questionId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/question/${questionId}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function QuestionViewPage({ params }: RouteParams) {
  const { questionId } = await params;
  const question = await getQuestion(questionId);
  if (!question) return notFound();
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{question.title || 'Question'}</h1>
      <div className="mb-2 text-gray-500">Type: {question.type}</div>
      <div className="mb-4">{question.question}</div>
      {/* Show options/answers for all types */}
      {question.type === "multiple_choice" && question.options && (
        <div className="mb-4">
          <div className="font-semibold mb-1">Options:</div>
          <ul className="list-disc pl-6">
            {question.options.map((opt: any, idx: number) => (
              <li key={idx} className={opt.isCorrect ? "text-green-700 font-bold" : ""}>
                {opt.text} {opt.isCorrect && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Correct</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {question.type === "matching" && question.pairs && (
        <div className="mb-4">
          <div className="font-semibold mb-1">Pairs:</div>
          <ul className="pl-2">
            {question.pairs.map((pair: any, idx: number) => (
              <li key={idx} className="mb-1">
                <span className="font-medium">{pair.left}</span> <span className="mx-2">-</span> <span className="font-medium">{pair.right}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {(question.type === "fill_summary" || question.type === "fill_note") && question.correctAnswer && (
        <div className="mb-4">
          <div className="font-semibold mb-1">Correct Answer:</div>
          <div className="bg-gray-100 rounded px-3 py-2 inline-block">{question.correctAnswer}</div>
        </div>
      )}
    </div>
  );
}
