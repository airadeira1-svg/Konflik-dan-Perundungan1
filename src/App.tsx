import { useState } from 'react';
import { AssessmentView } from './components/AssessmentView';
import { ConceptGuide } from './components/ConceptGuide';
import { ResultsView } from './components/ResultsView';
import { Category, QUESTIONS } from './data/questions';

type AppView = 'guide' | 'assessment' | 'results';

export default function App() {
  const [view, setView] = useState<AppView>('guide');
  const [answers, setAnswers] = useState<Record<number, Category>>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = QUESTIONS.length;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAnswer = (questionId: number, category: Category) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: category,
    }));
  };

  const handleStartAssessment = () => {
    setView(isSubmitted ? 'results' : 'assessment');
    scrollToTop();
  };

  const handleSubmitAssessment = () => {
    if (Object.keys(answers).length < totalQuestions) return;
    setIsSubmitted(true);
    setView('results');
    scrollToTop();
  };

  const handleRetryQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setView('assessment');
    scrollToTop();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F9FB] text-slate-900">
      {/* Top Bar Contract: 1-row, 3 zones */}
      <header className="bg-white/95 backdrop-blur-xs border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => {
              setView('guide');
              scrollToTop();
            }}
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 text-left"
          >
            Kenali Bedanya!
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
            aria-label="Navigasi utama"
          >
            <button
              type="button"
              onClick={() => {
                setView('guide');
                scrollToTop();
              }}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                view === 'guide'
                  ? 'text-sky-800 border-sky-700 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Panduan Konsep
            </button>
            <button
              type="button"
              onClick={() => {
                setView('assessment');
                scrollToTop();
              }}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 tabular-nums ${
                view === 'assessment'
                  ? 'text-sky-800 border-sky-700 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Lembar Soal ({answeredCount}/{totalQuestions})
            </button>
            {isSubmitted && (
              <button
                type="button"
                onClick={() => {
                  setView('results');
                  scrollToTop();
                }}
                className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                  view === 'results'
                    ? 'text-sky-800 border-sky-700 font-semibold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Hasil &amp; Pembahasan
              </button>
            )}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            {isSubmitted || answeredCount > 0 ? (
              <button
                type="button"
                onClick={handleRetryQuiz}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Ulangi Kuis
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartAssessment}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Mulai Asesmen
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Secondary Navigation Strip (compact, single-line) */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-4 overflow-x-auto text-xs font-medium text-slate-600">
        <button
          type="button"
          onClick={() => setView('guide')}
          className={`whitespace-nowrap shrink-0 py-1 border-b-2 ${
            view === 'guide' ? 'text-sky-800 border-sky-700 font-semibold' : 'border-transparent'
          }`}
        >
          Panduan Konsep
        </button>
        <button
          type="button"
          onClick={() => setView('assessment')}
          className={`whitespace-nowrap shrink-0 py-1 border-b-2 tabular-nums ${
            view === 'assessment'
              ? 'text-sky-800 border-sky-700 font-semibold'
              : 'border-transparent'
          }`}
        >
          Lembar Soal ({answeredCount}/{totalQuestions})
        </button>
        {isSubmitted && (
          <button
            type="button"
            onClick={() => setView('results')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 ${
              view === 'results'
                ? 'text-sky-800 border-sky-700 font-semibold'
                : 'border-transparent'
            }`}
          >
            Hasil &amp; Pembahasan
          </button>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        {view === 'guide' && (
          <ConceptGuide
            onStartAssessment={handleStartAssessment}
            answeredCount={answeredCount}
          />
        )}

        {view === 'assessment' && !isSubmitted && (
          <AssessmentView
            answers={answers}
            currentIndex={currentIndex}
            onSelectAnswer={handleSelectAnswer}
            onChangeIndex={setCurrentIndex}
            onSubmit={handleSubmitAssessment}
            onOpenGuide={() => {
              setView('guide');
              scrollToTop();
            }}
          />
        )}

        {view === 'assessment' && isSubmitted && (
          <ResultsView
            answers={answers}
            onRetry={handleRetryQuiz}
            onOpenGuide={() => {
              setView('guide');
              scrollToTop();
            }}
          />
        )}

        {view === 'results' && (
          <ResultsView
            answers={answers}
            onRetry={handleRetryQuiz}
            onOpenGuide={() => {
              setView('guide');
              scrollToTop();
            }}
          />
        )}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white/80 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>Lembar Kerja Siswa: Kenali Bedanya! — Konflik, Kekerasan &amp; Perundungan</span>
          <span>Membangun budaya sekolah yang aman, ramah, dan damai.</span>
        </div>
      </footer>
    </div>
  );
}
