import { ArrowRight, BookOpen, Check } from 'lucide-react';
import { CATEGORIES, CATEGORY_INFO } from '../data/questions';
import { CategoryIcon } from './CategoryIcon';

interface ConceptGuideProps {
  onStartAssessment: () => void;
  answeredCount: number;
}

export function ConceptGuide({ onStartAssessment, answeredCount }: ConceptGuideProps) {
  return (
    <section className="space-y-10" aria-labelledby="guide-heading">
      {/* Hero Split: Balanced 2-Column Intro */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-medium text-sky-700 tracking-wide">
                Pendidikan Karakter &amp; Iklim Sekolah Aman · 25 Studi Kasus
              </p>
              <h1
                id="guide-heading"
                className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight [text-wrap:balance]"
              >
                Lembar Kerja Siswa: Kenali Bedanya!
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Tidak semua pertengkaran di sekolah adalah perundungan, dan tidak semua perbedaan
                pendapat berujung kekerasan. Pelajari ciri khas masing-masing sebelum menganalisis
                25 peristiwa sehari-hari di lingkungan sekolah.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStartAssessment}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <span>{answeredCount > 0 ? 'Lanjutkan Lembar Kerja' : 'Mulai Asesmen 25 Soal'}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="text-sm text-slate-500 tabular-nums">
                {answeredCount > 0
                  ? `Progres tersimpan: ${answeredCount} / 25 soal terjawab`
                  : 'Estimasi waktu pengerjaan: 10–15 menit'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-full bg-gradient-to-br from-sky-50 via-teal-50 to-slate-100">
            <img
              src="/src/assets/images/hero_peaceful_school_1795140344625.jpg"
              alt="Ilustrasi siswa SMP berdiskusi dan bekerja sama dengan damai di taman sekolah yang cerah"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover lg:absolute lg:inset-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="sr-only">
              Suasana belajar yang damai dan saling menghargai di lingkungan sekolah.
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Concept Comparison */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Membedakan Konflik, Kekerasan, dan Perundungan
            </h2>
            <p className="text-sm text-slate-600">
              Perhatikan tiga kata kunci pembeda: posisi kuasa, pola pengulangan, dan niat menyakiti.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <BookOpen className="w-4 h-4 text-sky-700" aria-hidden="true" />
            <span>Panduan Analisis Cerita</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const info = CATEGORY_INFO[cat];
            return (
              <article
                key={cat}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${info.softSurface} ${info.accentText}`}
                    >
                      <CategoryIcon category={cat} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{info.label}</h3>
                      <p className="text-xs text-slate-500">{info.shortCue}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">{info.definition}</p>
                </div>

                <ul className="space-y-2.5 pt-3 border-t border-slate-100">
                  {info.traits.map((trait) => (
                    <li key={trait} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${info.accentText}`}
                        aria-hidden="true"
                      />
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
