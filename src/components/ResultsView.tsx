import { useState } from 'react';
import { Award, BookOpen, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { CATEGORIES, CATEGORY_INFO, Category, QUESTIONS } from '../data/questions';
import { CategoryIcon } from './CategoryIcon';

interface ResultsViewProps {
  answers: Record<number, Category>;
  onRetry: () => void;
  onOpenGuide: () => void;
}

type ReviewFilter = 'all' | 'incorrect' | 'correct';

export function ResultsView({ answers, onRetry, onOpenGuide }: ResultsViewProps) {
  const [filter, setFilter] = useState<ReviewFilter>('all');

  const totalQuestions = QUESTIONS.length;
  const correctCount = QUESTIONS.filter(
    (q) => answers[q.id] === q.correctCategory
  ).length;
  const incorrectCount = totalQuestions - correctCount;
  const isPerfectScore = correctCount === totalQuestions;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const filteredQuestions = QUESTIONS.filter((q) => {
    const isCorrect = answers[q.id] === q.correctCategory;
    if (filter === 'incorrect') return !isCorrect;
    if (filter === 'correct') return isCorrect;
    return true;
  });

  return (
    <section className="space-y-8" aria-labelledby="results-heading">
      {/* Score & Feedback Hero Banner */}
      <div
        className={`rounded-2xl border overflow-hidden shadow-xs ${
          isPerfectScore
            ? 'bg-gradient-to-br from-emerald-50 via-sky-50 to-white border-emerald-200'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div
            className={`${
              isPerfectScore ? 'lg:col-span-8' : 'lg:col-span-12'
            } p-8 md:p-10 space-y-6`}
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600">
              <span>Hasil Asesmen</span>
              <span aria-hidden="true">·</span>
              <span>Lembar Kerja Siswa: Kenali Bedanya!</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">Akurasi {percentage}%</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-600">Nilai Kamu</p>
                <div className="flex items-baseline gap-2">
                  <span
                    id="results-heading"
                    className={`text-5xl md:text-6xl font-extrabold font-mono tabular-nums tracking-tight ${
                      isPerfectScore ? 'text-emerald-700' : 'text-sky-800'
                    }`}
                  >
                    {correctCount}
                  </span>
                  <span className="text-2xl md:text-3xl font-bold font-mono tabular-nums text-slate-400">
                    / {totalQuestions}
                  </span>
                </div>
              </div>

              <div className="sm:pb-1.5">
                <p className="text-sm text-slate-600">
                  Jawaban benar{' '}
                  <strong className="font-semibold text-slate-900 tabular-nums">
                    {correctCount}
                  </strong>{' '}
                  dari{' '}
                  <strong className="font-semibold text-slate-900 tabular-nums">
                    {totalQuestions}
                  </strong>{' '}
                  soal keseluruhan.
                </p>
              </div>
            </div>

            {/* Required Exact Feedback Message */}
            <div
              className={`rounded-xl p-5 border ${
                isPerfectScore
                  ? 'bg-white/90 border-emerald-200 text-emerald-950'
                  : 'bg-sky-50 border-sky-200 text-slate-900'
              }`}
            >
              {isPerfectScore ? (
                <div className="flex items-start gap-3.5">
                  <Award
                    className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1.5">
                    <h2 className="text-xl md:text-2xl font-bold text-emerald-900 [text-wrap:balance]">
                      Selamat, kamu berhasil. Jadilah agen perdamaian dan pencegah perundungan!
                    </h2>
                    <p className="text-sm text-emerald-800 leading-relaxed">
                      Kamu mampu membedakan konflik sehari-hari, tindakan kekerasan, dan pola
                      perundungan dengan tepat pada seluruh 25 kasus cerita.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                    Yuk, berlatih lagi!
                  </h2>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Masih ada{' '}
                    <strong className="font-semibold tabular-nums">{incorrectCount}</strong> soal
                    yang perlu dicermati kembali. Baca poin diskusi pada pembahasan di bawah ini,
                    lalu ulangi kuis untuk meraih skor sempurna{' '}
                    <span className="font-mono tabular-nums">25 / 25</span>.
                  </p>
                </div>
              )}
            </div>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Ulangi Kuis</span>
              </button>
              <button
                type="button"
                onClick={onOpenGuide}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>Pelajari Konsep Lagi</span>
              </button>
            </div>
          </div>

          {isPerfectScore && (
            <div className="lg:col-span-4 relative min-h-[240px] lg:min-h-full bg-gradient-to-br from-sky-50 to-emerald-50 border-t lg:border-t-0 lg:border-l border-emerald-200">
              <img
                src="/src/assets/images/badge_peace_agent_1795140344706.jpg"
                alt="Ilustrasi merpati putih membawa ranting zaitun sebagai simbol agen perdamaian"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover lg:absolute lg:inset-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES.map((category) => {
          const catQuestions = QUESTIONS.filter((q) => q.correctCategory === category);
          const catCorrect = catQuestions.filter((q) => answers[q.id] === category).length;
          const info = CATEGORY_INFO[category];

          return (
            <div
              key={category}
              className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${info.softSurface} ${info.accentText}`}
                >
                  <CategoryIcon category={category} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{category}</h3>
                  <p className="text-xs text-slate-500">Ketepatan kategori</p>
                </div>
              </div>
              <span className="font-mono text-lg font-bold text-slate-900 tabular-nums">
                {catCorrect} / {catQuestions.length}
              </span>
            </div>
          );
        })}
      </div>

      {/* Pembahasan & Poin Diskusi */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Pembahasan &amp; Poin Diskusi Siswa
            </h2>
            <p className="text-sm text-slate-600">
              Pelajari alasan di balik pengelompokan tiap kasus untuk memperdalam pemahamanmu.
            </p>
          </div>

          <div
            className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 shrink-0"
            role="group"
            aria-label="Filter pembahasan soal"
          >
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({totalQuestions})
            </button>
            <button
              type="button"
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                filter === 'incorrect'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kurang Tepat ({incorrectCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                filter === 'correct'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Benar ({correctCount})
            </button>
          </div>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-2">
            <p className="text-base font-semibold text-slate-900">
              Tidak ada soal pada filter ini.
            </p>
            <p className="text-sm text-slate-600">
              {filter === 'incorrect'
                ? 'Hebat! Tidak ada jawaban yang keliru.'
                : 'Belum ada jawaban yang benar. Coba pelajari pembahasan semua soal terlebih dahulu.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctCategory;
              const keyMeta = CATEGORY_INFO[q.correctCategory];

              return (
                <article
                  key={q.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="space-y-1">
                      <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums">
                        Soal {String(q.id).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">
                        {q.id}. {q.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                          <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Benar</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700">
                          <XCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Kurang Tepat</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[15px] text-slate-700 leading-relaxed max-w-[75ch]">
                    {q.story}
                  </p>

                  {/* Answer Comparison Row (clean text + icon, zero pill badges) */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Jawabanmu:</span>
                      <span
                        className={`inline-flex items-center gap-1.5 font-semibold ${
                          isCorrect ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        <CategoryIcon category={userAnswer} className="w-4 h-4" />
                        <span>{userAnswer}</span>
                      </span>
                    </div>

                    {!isCorrect && (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Kunci Jawaban:</span>
                        <span
                          className={`inline-flex items-center gap-1.5 font-semibold ${keyMeta.accentText}`}
                        >
                          <CategoryIcon category={q.correctCategory} className="w-4 h-4" />
                          <span>{q.correctCategory}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Discussion Explanation */}
                  <div className="rounded-lg bg-[#F4F9FB] border border-slate-200 p-4 text-sm text-slate-700 leading-relaxed">
                    <span className="font-semibold text-slate-900">Poin Diskusi: </span>
                    {q.explanation}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
