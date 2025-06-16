"use client";

import React, { useState } from 'react';

interface QuestionsFormProps {
  questions: Question[];
}

const QuestionsForm: React.FC<QuestionsFormProps> = ({ questions }) => {  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [results, setResults] = useState<{ [key: string]: boolean }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };
  const handleMultipleChoiceChange = (questionId: string, optionText: string, isChecked: boolean, maxSelections: number) => {
    const key = `${questionId}_choice`;
    setAnswers(prev => {
      const currentAnswers = Array.isArray(prev[key]) ? prev[key] as string[] : [];
      
      if (isChecked) {
        if (currentAnswers.length >= maxSelections) {
          return prev; 
        }
        return { ...prev, [key]: [...currentAnswers, optionText] };
      } else {
        return { ...prev, [key]: currentAnswers.filter(answer => answer !== optionText) };
      }
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newResults: { [key: string]: boolean } = {};
    
    questions.forEach(q => {      if (q.type === 'multiple_choice' && q.options) {
        const key = `${q._id}_choice`;
        const correctOptions = q.options.filter(opt => opt.isCorrect);
        const correctCount = correctOptions.length;
        
        if (correctCount === 1) {
          // Single choice - radio button logic
          const userAnswer = typeof answers[key] === 'string' ? answers[key] as string : '';
          const correctOption = correctOptions[0];
          newResults[key] = userAnswer === correctOption.text;
        } else {
          // Multiple choice - checkbox logic
          const userAnswers = Array.isArray(answers[key]) ? answers[key] as string[] : [];
          const correctTexts = correctOptions.map(opt => opt.text);
          
          // Check if user selected exactly the correct answers
          const isCorrect = correctTexts.length === userAnswers.length && 
                           correctTexts.every(correct => userAnswers.includes(correct));
          newResults[key] = isCorrect;
        }
      }
      
      if (q.type === 'matching' && q.pairs) {
        q.pairs.forEach((pair, idx) => {
          const key = `${q._id}_matching_${idx}`;
          const userAnswer = typeof answers[key] === 'string' ? (answers[key] as string).trim().toLowerCase() : '';
          const correct = (pair.right || '').trim().toLowerCase();
          newResults[key] = userAnswer === correct;
        });
      }
      
      if (q.type === 'fill_summary' && q.pairs) {
        q.pairs.forEach((pair, idx) => {
          const key = `${q._id}_fill_${idx}`;
          const userAnswer = typeof answers[key] === 'string' ? (answers[key] as string).trim().toLowerCase() : '';
          const correct = (pair.right || '').trim().toLowerCase();
          newResults[key] = userAnswer === correct;
        });
      }
      
      if (q.type === 'fill_note') {
        const key = `${q._id}_note`;
        const userAnswer = typeof answers[key] === 'string' ? (answers[key] as string).trim().toLowerCase() : '';
        const correct = (q.correctAnswer || '').trim().toLowerCase();
        newResults[key] = userAnswer === correct;
      }
    });
    
    setResults(newResults);
    setSubmitted(true);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((q, idx) => (
        <div key={q._id} className="bg-white rounded-xl shadow p-6 border border-gray-100">
          {/* Question Header */}
          <div className="mb-2 text-sm text-gray-400">
            {q.type === 'multiple_choice' && `Multiple Choice ${idx + 1}`}
            {q.type === 'matching' && `Matching ${idx + 1}`}
            {q.type === 'fill_summary' && `Fill Summary ${idx + 1}`}
            {q.type === 'fill_note' && `Fill Note ${idx + 1}`}
          </div>
          
          {/* Question Title */}
          {q.title && (
            <h4 className="text-lg font-medium mb-2 text-gray-800">{q.title}</h4>
          )}
          
          {/* Question Image */}
          {q.imageUrl && (
            <img src={q.imageUrl} alt="question" className="mb-4 max-h-48 rounded" />
          )}
          
          {/* Question Text */}
          <div className="mb-4 text-gray-700 whitespace-pre-line">
            {q.question}
          </div>          {/* Multiple Choice Questions */}
          {q.type === 'multiple_choice' && q.options && (
            <div className="space-y-3">
              {(() => {
                const correctCount = q.options.filter(opt => opt.isCorrect).length;
                const isSingleChoice = correctCount === 1;
                return (
                  <>                    <div className="text-sm text-gray-600 mb-3">
                      {isSingleChoice ? 'Select the correct answer:' : (
                        <div>
                          <div>Select {correctCount} correct answers:</div>
                          <div className="mt-1 text-xs text-blue-600">
                            {(() => {
                              const questionKey = `${q._id}_choice`;
                              const selectedAnswers = Array.isArray(answers[questionKey]) ? answers[questionKey] as string[] : [];
                              return `${selectedAnswers.length}/${correctCount} selected`;
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                    {q.options.map((option, optIdx) => {
                      const key = `${q._id}_choice`;
                      if (isSingleChoice) {
                        // Radio button for single choice
                        const isSelected = typeof answers[key] === 'string' && answers[key] === option.text;
                        return (
                          <div key={optIdx} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              id={`${q._id}_option_${optIdx}`}
                              name={key}
                              value={option.text}
                              checked={isSelected}
                              onChange={(e) => handleChange(key, e.target.value)}
                              disabled={submitted}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <label 
                              htmlFor={`${q._id}_option_${optIdx}`}
                              className="flex-1 text-gray-700 cursor-pointer"
                            >
                              {option.text}
                            </label>
                            {submitted && isSelected && option.isCorrect && (
                              <span className="text-green-600 font-medium">✓ Correct</span>
                            )}
                            {submitted && isSelected && !option.isCorrect && (
                              <span className="text-red-600 font-medium">✗ Incorrect</span>
                            )}
                            {submitted && !isSelected && option.isCorrect && (
                              <span className="text-orange-600 font-medium">○ Missed</span>
                            )}
                          </div>
                        );                      } else {
                        // Checkbox for multiple choice
                        const selectedAnswers = Array.isArray(answers[key]) ? answers[key] as string[] : [];
                        const isSelected = selectedAnswers.includes(option.text);
                        const isDisabled = submitted || (!isSelected && selectedAnswers.length >= correctCount);
                        
                        return (
                          <div key={optIdx} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id={`${q._id}_option_${optIdx}`}
                              checked={isSelected}
                              onChange={(e) => handleMultipleChoiceChange(q._id, option.text, e.target.checked, correctCount)}
                              disabled={isDisabled}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                            />
                            <label 
                              htmlFor={`${q._id}_option_${optIdx}`}
                              className={`flex-1 cursor-pointer ${isDisabled && !isSelected ? 'text-gray-400' : 'text-gray-700'}`}
                            >
                              {option.text}
                            </label>
                            {submitted && isSelected && option.isCorrect && (
                              <span className="text-green-600 font-medium">✓ Correct</span>
                            )}
                            {submitted && isSelected && !option.isCorrect && (
                              <span className="text-red-600 font-medium">✗ Incorrect</span>
                            )}
                            {submitted && !isSelected && option.isCorrect && (
                              <span className="text-orange-600 font-medium">○ Missed</span>
                            )}
                          </div>
                        );
                      }
                    })}
                  </>
                );
              })()}
              {submitted && (                <div className="mt-3 p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Correct answer{q.options.filter(opt => opt.isCorrect).length > 1 ? 's' : ''}:</strong>
                  </div>
                  <div className="space-y-1">
                    {q.options.filter(opt => opt.isCorrect).map((option, idx) => (
                      <div key={idx} className="text-sm font-semibold text-green-600">
                        ✓ {option.text}
                      </div>
                    ))}
                  </div>                  <div className="mt-2 text-sm">
                    <span className="text-gray-600">Your score for this question: </span>
                    <span className={`font-semibold ${results[`${q._id}_choice`] ? 'text-green-600' : 'text-red-600'}`}>
                      {results[`${q._id}_choice`] ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Matching Questions */}
          {q.type === 'matching' && q.pairs && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-3">
                Match the items on the left with the correct answers:
              </div>
              {q.pairs.map((pair, pairIdx) => {
                const key = `${q._id}_matching_${pairIdx}`;
                return (
                  <div key={pairIdx} className="flex items-center space-x-4">
                    <div className="flex-1 bg-gray-50 p-3 rounded font-medium">
                      {pair.left}
                    </div>
                    <span className="text-gray-400">→</span>                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Your answer"
                      value={typeof answers[key] === 'string' ? answers[key] as string : ''}
                      onChange={(e) => handleChange(key, e.target.value)}
                      disabled={submitted}
                    />
                    {submitted && results[key] === true && (
                      <span className="text-green-600 font-medium">✓</span>
                    )}
                    {submitted && results[key] === false && (
                      <span className="text-red-600 font-medium">✗</span>
                    )}
                  </div>
                );
              })}
              {submitted && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 font-medium mb-2">Correct answers:</div>
                  {q.pairs.map((pair, pairIdx) => (
                    <div key={pairIdx} className="text-sm">
                      <span className="font-medium">{pair.left}</span> → 
                      <span className="text-green-600 font-semibold ml-1">{pair.right}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Fill Summary Questions */}
          {q.type === 'fill_summary' && q.pairs && (
            <div className="space-y-4">
              {q.pairs.map((pair, pairIdx) => {
                const key = `${q._id}_fill_${pairIdx}`;
                return (
                  <div key={pairIdx}>                    <input
                      type="text"
                      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base w-full"
                      placeholder={`Answer ${pairIdx + 1}`}
                      value={typeof answers[key] === 'string' ? answers[key] as string : ''}
                      onChange={(e) => handleChange(key, e.target.value)}
                      disabled={submitted}
                    />
                    {submitted && results[key] === true && (
                      <div className="text-green-600 font-medium mt-2">✓ Correct!</div>
                    )}
                    {submitted && results[key] === false && (
                      <div className="text-red-600 font-medium mt-2">
                        ✗ Incorrect. Correct answer: <span className='font-semibold text-green-600'>{pair.right}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Fill Note Questions */}
          {q.type === 'fill_note' && (
            <div>              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base w-full"
                placeholder="Write your note here..."
                value={typeof answers[`${q._id}_note`] === 'string' ? answers[`${q._id}_note`] as string : ''}
                onChange={(e) => handleChange(`${q._id}_note`, e.target.value)}
                disabled={submitted}
              />
              {submitted && results[`${q._id}_note`] === true && (
                <div className="text-green-600 font-medium mt-2">✓ Correct!</div>
              )}
              {submitted && results[`${q._id}_note`] === false && (
                <div className="text-red-600 font-medium mt-2">
                  ✗ Incorrect. Correct answer: <span className='font-semibold text-green-600'>{q.correctAnswer}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      
      {questions.length > 0 && (
        <button
          type="submit"
          className="bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition text-lg px-6 py-3 w-full"
          disabled={submitted}
        >
          {submitted ? 'Submitted' : 'Submit All Answers'}
        </button>
      )}
      
      {submitted && questions.length > 0 && (
        <div className="text-center text-xl font-bold mt-6 p-4 bg-blue-50 rounded-lg">
          Final Score: <span className="text-blue-600">
            {Object.values(results).filter(Boolean).length} / {Object.keys(results).length}
          </span>
        </div>
      )}
    </form>
  );
};

export default QuestionsForm;