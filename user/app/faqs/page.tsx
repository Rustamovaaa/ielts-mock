"use client";

import { useState } from 'react';
import { ChevronDown } from "lucide-react";

// FAQ Item component with accordion functionality
const FAQItem = ({ question, answer }: { question: string; answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 last:border-0">
      <button
        className="flex w-full justify-between items-center py-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <div className="text-slate-600 dark:text-slate-300 space-y-2">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: "What is IELTS?",
      answer: (
        <>
          <p>
            IELTS (International English Language Testing System) is a standardized test designed to assess the English language proficiency of non-native speakers. The test is required for study, work, and migration purposes in many English-speaking countries.
          </p>
          <p>
            There are two main versions of the test: IELTS Academic (for studying at university or higher education) and IELTS General Training (for work or migration purposes).
          </p>
        </>
      ),
    },
    {
      question: "What sections are included in the IELTS test?",
      answer: (
        <>
          <p>The IELTS test consists of four sections:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Listening (30 minutes + 10 minutes transfer time)</li>
            <li>Reading (60 minutes)</li>
            <li>Writing (60 minutes)</li>
            <li>Speaking (11-14 minutes)</li>
          </ul>
          <p className="mt-2">
            Our platform currently focuses on providing practice for the Listening and Reading sections.
          </p>
        </>
      ),
    },
    {
      question: "How does the IELTS band scoring system work?",
      answer: (
        <>
          <p>
            IELTS results are reported as band scores on a scale from 1 (the lowest) to 9 (the highest). You can also receive half band scores (e.g., 6.5, 7.5).
          </p>
          <p className="mt-2">The band score descriptions are:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Band 9: Expert user</li>
            <li>Band 8: Very good user</li>
            <li>Band 7: Good user</li>
            <li>Band 6: Competent user</li>
            <li>Band 5: Modest user</li>
            <li>Band 4: Limited user</li>
            <li>Band 3: Extremely limited user</li>
            <li>Band 2: Intermittent user</li>
            <li>Band 1: Non-user</li>
            <li>Band 0: Did not attempt the test</li>
          </ul>
        </>
      ),
    },
    {
      question: "How accurately do your mock tests reflect the real IELTS exam?",
      answer: (
        <p>
          Our mock tests are designed to closely simulate the real IELTS exam in terms of format, difficulty, and timing. They are created by experienced IELTS teachers and former examiners who understand the test requirements thoroughly. While we strive for authenticity, remember that the official IELTS test is controlled by the official examining bodies (British Council, IDP, Cambridge Assessment).
        </p>
      ),
    },
    {
      question: "How should I prepare for the IELTS Reading section?",
      answer: (
        <>
          <p>
            To prepare effectively for the IELTS Reading section:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Practice reading a variety of English texts (academic articles, newspapers, magazines)</li>
            <li>Improve your skimming and scanning techniques to locate information quickly</li>
            <li>Learn to identify main ideas, supporting details, and author's opinions</li>
            <li>Practice all question types (multiple choice, matching headings, true/false/not given, etc.)</li>
            <li>Time yourself to ensure you can complete all questions within 60 minutes</li>
            <li>Analyze your mistakes to understand your weaknesses</li>
          </ul>
          <p className="mt-2">
            Our platform provides realistic practice tests specifically designed to build these skills.
          </p>
        </>
      ),
    },
    {
      question: "How should I prepare for the IELTS Listening section?",
      answer: (
        <>
          <p>
            To prepare effectively for the IELTS Listening section:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Listen regularly to English content (podcasts, news, documentaries, lectures)</li>
            <li>Practice note-taking while listening</li>
            <li>Become familiar with different accents (British, American, Australian, etc.)</li>
            <li>Work on your spelling, as spelling mistakes are marked incorrect</li>
            <li>Practice prediction before listening to each section</li>
            <li>Read instructions carefully and understand the requirements of each question type</li>
          </ul>
          <p className="mt-2">
            Our listening practice tests simulate the real exam experience, helping you build confidence and skills.
          </p>
        </>
      ),
    },
    {
      question: "How often should I take practice tests?",
      answer: (
        <p>
          We recommend taking full practice tests once a week, with more targeted practice of specific sections in between. This provides a good balance between comprehensive review and focused improvement. In the final 2-3 weeks before your actual test, you may want to increase to 2-3 full practice tests per week to build stamina and confidence. Always take time to review your mistakes and understand where you need to improve.
        </p>
      ),
    },
    {
      question: "Do I need to register to use your platform?",
      answer: (
        <p>
          No, our platform does not require registration for basic test access. You can immediately start practicing with our Reading and Listening tests without creating an account. This aligns with our mission of making quality IELTS practice materials accessible to everyone. Only administrators need to log in to manage test content.
        </p>
      ),
    },
    {
      question: "Are your practice tests free?",
      answer: (
        <p>
          Yes, all our practice tests are completely free to use. We believe in making quality IELTS preparation resources accessible to everyone, regardless of their financial situation. Our platform is supported by minimal advertising and donations from users who find our resources valuable.
        </p>
      ),
    },
    {
      question: "Do you offer feedback on Writing and Speaking sections?",
      answer: (
        <p>
          Currently, our platform specializes in Reading and Listening practice tests only. We've chosen to focus on these sections to provide the highest quality practice experience possible. For Writing and Speaking practice, we recommend working with a qualified IELTS tutor who can provide personalized feedback on your performance.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">FAQ</span>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Find answers to common questions about IELTS preparation and our platform
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-700">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              If you couldn't find the answer you were looking for, feel free to reach out to us directly.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
