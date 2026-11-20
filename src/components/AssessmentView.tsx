import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  List,
  Maximize2,
  Send,
} from 'lucide-react';
import { CATEGORIES, CATEGORY_INFO, Category, QUESTIONS } from '../data/questions';
import { CategoryIcon } from './CategoryIcon';

interface AssessmentViewProps {
  answers: Record<number, Category>;
  currentIndex: number;
  onSelectAnswer: (questionId: number, category: Category) => void;
  onChangeIndex: (index: number) => void;
  onSubmit: () => void;
  onOpenGuide: () => void;
}

type ViewMode = 'focus' | 'list';

export function AssessmentView({
  answers,
  currentIndex,
  onSelectAnswer,
  onChangeIndex,
  onSubmit,
  onOpenGuide,
}: AssessmentViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('focus');
  const [showQuickCue, setShowQuickCue] = useState<boolean>(false);

  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === totalQuestions;
  const currentQuestion = QUESTIONS[currentIndex];
  const firstUnansweredIndex = QUESTIONS.findIndex((q) => !answers[q.id]);

  // Keyboard shortcuts in focus mode: 1/2/3 to pick category, Left/Right arrows to navigate
  useEffect(() => {
    if (viewMode !== 'focus') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === '1') {
        onSelectAnswer(currentQuestion.id, 'Konflik');
      } else if (e.key === '2') {
        onSelectAnswer(currentQuestion.id, 'Kekerasan');
      } else if (e.key === '3') {
        onSelectAnswer(currentQuestion.id, 'Perundungan');
      } else if (e.key === 'ArrowRight' && currentIndex < totalQuestions - 1) {
        onChangeIndex(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onChangeIndex(currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, currentIndex, currentQuestion.id, totalQuestions, onSelectAnswer, onChangeIndex]);

  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  const handleJumpToUnanswered = () => {
    if (firstUnansweredIndex !== -1) {
      onChangeIndex(firstUnansweredIndex);
      if (viewMode === 'list') {
        const el = document.getElementById(`soal-${QUESTIONS[firstUnansweredIndex].id}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <section className="space-y-6" aria-labelledby="worksheet-heading">
      {/* Worksheet Header & Mode Switcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-3xl">
          <h1 id="worksheet-heading" className="text-2xl md:text-3xl font-bold text-slate-900">
            Lembar Kerja Siswa: Kenali Bedanya!
          </h1>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            Petunjuk: Bacalah setiap cerita di bawah ini dengan saksama, lalu kelompokkan apakah
            peristiwa tersebut termasuk <strong className="font-semibold text-slate-800">Konflik</strong>,{' '}
            <strong className="font-semibold text-slate-800">Kekerasan</strong>, atau{' '}
            <strong className="font-semibold text-slate-800">Perundungan</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div
            className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200"
            role="group"
            aria-label="Mode tampilan soal"
          >
            <button
              type="button"
              onClick={() => setViewMode('focus')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'focus'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Mode Fokus</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Semua 25 Soal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Zone Assessment Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Stage (65%): Active Story Card or Full 25-Question Worksheet */}
        <div className="lg:col-span-8 space-y-6">
          {viewMode === 'focus' ? (
            <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-7">
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="font-mono tabular-nums text-sky-700 font-semibold">
                    Soal {String(currentQuestion.id).padStart(2, '0')} / {totalQuestions}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {answers[currentQuestion.id]
                      ? `Pilihanmu: ${answers[currentQuestion.id]}`
                      : 'Belum dijawab'}
                  </span>
                </div>

                <span className="text-xs text-slate-400 hidden sm:inline">
                  Pintasan keyboard: 1–3 pilih kategori, ←/→ pindah soal
                </span>
              </div>

              {/* Story Body */}
              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                  {currentQuestion.id}. {currentQuestion.title}
                </h2>
                <p className="text-base md:text-[17px] text-slate-700 leading-[1.75] max-w-[68ch]">
                  {currentQuestion.story}
                </p>
              </div>

              {/* 3 Category Choices */}
              <div className="space-y-3 pt-2">
                <p className="text-sm font-semibold text-slate-800">
                  Pilih kategori yang paling tepat:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {CATEGORIES.map((category, idx) => {
                    const meta = CATEGORY_INFO[category];
                    const isSelected = answers[currentQuestion.id] === category;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => onSelectAnswer(currentQuestion.id, category)}
                        aria-pressed={isSelected}
                        className={`group text-left rounded-xl p-4 border transition-all duration-150 flex flex-col justify-between gap-3 min-h-[104px] ${
                          isSelected
                            ? `${meta.softSurface} ${meta.accentBorder} ring-2 ${meta.activeRing}`
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 w-full">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? `${meta.accentBg} text-white`
                                  : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                              }`}
                            >
                              <CategoryIcon category={category} className="w-4 h-4" />
                            </span>
                            <span className="font-bold text-base text-slate-900">{meta.label}</span>
                          </div>
                          <span className="font-mono text-xs text-slate-400 tabular-nums">
                            {idx + 1}
                          </span>
                        </div>

                        <span className="text-xs text-slate-600 leading-snug">
                          {meta.shortCue}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer Controls */}
              <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onChangeIndex(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Sebelumnya</span>
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  {currentIndex < totalQuestions - 1 ? (
                    <button
                      type="button"
                      onClick={() => onChangeIndex(currentIndex + 1)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Selanjutnya</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  ) : isAllAnswered ? (
                    <button
                      type="button"
                      onClick={onSubmit}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Selesai &amp; Lihat Nilai</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleJumpToUnanswered}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>
                        Lengkapi Soal No. {QUESTIONS[firstUnansweredIndex]?.id}
                      </span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* List Mode: All 25 Questions */
            <div className="space-y-4">
              {QUESTIONS.map((q) => {
                const selected = answers[q.id];
                return (
                  <article
                    key={q.id}
                    id={`soal-${q.id}`}
                    className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-mono tabular-nums font-semibold text-sky-700">
                            Soal {String(q.id).padStart(2, '0')}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{selected ? `Terpilih: ${selected}` : 'Belum dipilih'}</span>
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">
                          {q.id}. {q.title}
                        </h2>
                      </div>
                      {selected && (
                        <CheckCircle2
                          className="w-5 h-5 text-emerald-600 shrink-0 mt-1"
                          aria-label="Sudah dijawab"
                        />
                      )}
                    </div>

                    <p className="text-[15px] text-slate-700 leading-relaxed max-w-[70ch]">
                      {q.story}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      {CATEGORIES.map((category) => {
                        const meta = CATEGORY_INFO[category];
                        const isSelected = selected === category;
                        return (
                          <button
                            key={category}
                            type="button"
                            onClick={() => onSelectAnswer(q.id, category)}
                            aria-pressed={isSelected}
                            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors whitespace-nowrap ${
                              isSelected
                                ? `${meta.softSurface} ${meta.accentBorder} ${meta.accentText} ring-1 ${meta.activeRing}`
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <CategoryIcon category={category} className="w-4 h-4" />
                            <span>{meta.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </article>
                );
              })}

              {/* Bottom Submit Bar in List Mode */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-sm text-slate-700">
                  {isAllAnswered ? (
                    <span className="font-semibold text-emerald-700">
                      Semua 25 soal telah terjawab. Siap melihat hasil asesmen!
                    </span>
                  ) : (
                    <span>
                      Masih ada{' '}
                      <strong className="font-semibold tabular-nums">
                        {totalQuestions - answeredCount}
                      </strong>{' '}
                      soal yang belum dijawab.
                    </span>
                  )}
                </div>
                {isAllAnswered ? (
                  <button
                    type="button"
                    onClick={onSubmit}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Selesai &amp; Lihat Nilai</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleJumpToUnanswered}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Ke Soal No. {QUESTIONS[firstUnansweredIndex]?.id}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Zone (35%): Progress & 5x5 Question Navigator */}
        <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            {/* Progress Header */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-900">Progres Pengerjaan</span>
                <span className="font-mono font-semibold text-sky-700 tabular-nums">
                  {answeredCount} / {totalQuestions}
                </span>
              </div>
              <div
                className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={answeredCount}
                aria-valuemin={0}
                aria-valuemax={totalQuestions}
              >
                <div
                  className="h-full bg-sky-600 transition-all duration-200"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">
                {isAllAnswered
                  ? 'Seluruh soal sudah dijawab. Kamu dapat memeriksa kembali atau langsung lihat nilai.'
                  : `Jawab seluruh ${totalQuestions} soal untuk melihat nilai dan pembahasannya.`}
              </p>
            </div>

            {/* 5x5 Navigator Grid */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">Navigasi Nomor Soal</span>
                <span>Klik nomor untuk melompat</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {QUESTIONS.map((q, idx) => {
                  const isAnswered = Boolean(answers[q.id]);
                  const isCurrent = viewMode === 'focus' && idx === currentIndex;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        onChangeIndex(idx);
                        if (viewMode === 'list') {
                          const el = document.getElementById(`soal-${q.id}`);
                          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      aria-label={`Soal ${q.id}${isAnswered ? ', sudah dijawab' : ', belum dijawab'}`}
                      className={`h-10 rounded-lg font-mono text-xs font-semibold tabular-nums border flex items-center justify-center gap-1 transition-all ${
                        isCurrent
                          ? 'border-sky-700 ring-2 ring-sky-600 ring-offset-1 bg-sky-50 text-sky-900'
                          : isAnswered
                            ? 'bg-sky-700 border-sky-700 text-white hover:bg-sky-800'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-sky-400 hover:bg-slate-50'
                      }`}
                    >
                      <span>{String(q.id).padStart(2, '0')}</span>
                      {isAnswered && !isCurrent && (
                        <Check className="w-3 h-3 shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit / Next Unanswered Action */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              {isAllAnswered ? (
                <button
                  type="button"
                  onClick={onSubmit}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition-colors"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Selesai &amp; Lihat Nilai</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleJumpToUnanswered}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-900 text-sm font-semibold transition-colors"
                >
                  <span>
                    Lompat ke Soal Belum Dijawab (No. {QUESTIONS[firstUnansweredIndex]?.id})
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Toggleable Quick Concept Cue */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowQuickCue((prev) => !prev)}
                className="flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-sky-700 transition-colors text-left"
                aria-expanded={showQuickCue}
              >
                <BookOpen className="w-4 h-4 text-sky-700 shrink-0" aria-hidden="true" />
                <span>{showQuickCue ? 'Tutup Ringkasan Konsep' : 'Buka Ringkasan Konsep'}</span>
              </button>
              <button
                type="button"
                onClick={onOpenGuide}
                className="text-xs font-medium text-sky-700 hover:underline whitespace-nowrap shrink-0"
              >
                Panduan Penuh
              </button>
            </div>

            {showQuickCue && (
              <div className="space-y-3 pt-2 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                {CATEGORIES.map((cat) => (
                  <div key={cat} className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                      <CategoryIcon
                        category={cat}
                        className={`w-3.5 h-3.5 ${CATEGORY_INFO[cat].accentText}`}
                      />
                      <span>{cat}</span>
                    </div>
                    <p>{CATEGORY_INFO[cat].shortCue}.</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
