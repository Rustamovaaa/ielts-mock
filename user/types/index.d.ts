interface RouteParams {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string>>;
}

type PassageType = "reading" | "listening";
type QuestionType = 'matching' | 'multiple_choice' | 'fill_summary' | 'fill_note';

interface Passage {
    _id: string;
    type: PassageType;
    questions: string[];
    imageUrl?: string;
    videoUrl?: string;
    title?: string;
    description?: string;
    content?: string;
    audioUrl?: string;
}

interface Question {
    _id: string;
    passage: string;
    type: QuestionType;
    question: string;
    title?: string;
    imageUrl?: string;
    videoUrl?: string;
    order?: number;
    options?: { text: string; isCorrect: boolean }[];
    pairs?: { left: string; right: string }[];
    correctAnswer?: string;
}