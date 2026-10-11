import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import QualityPromise from '@/components/sections/QualityPromise';
import BlogFilter from '@/components/blog/BlogFilter';
import { COMPANY_DATA } from '@/config/company';

export default function BlogPage() {

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="ambient-glow-orange -top-20 -left-20" />
      <div className="ambient-glow-red top-96 -right-20" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="ceramic-hero rounded-tile-xl p-8 sm:p-14 text-center space-y-4 relative overflow-hidden">
          <span className="eyebrow">
            <BookOpen className="w-3.5 h-3.5" />
            Ratgeber &amp; Fachwissen
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Fliesen-Ratgeber &amp; <span className="text-ceramic-gradient">Badsanierung Tipps</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Praxisnaher Fliesen-Ratgeber mit wertvollen Tipps rund um Badsanierung, Fliesenverlegung und DIN 18534 Verbundabdichtung – von Ihrem Fachbetrieb {COMPANY_DATA.legalName} aus {COMPANY_DATA.headquarters.city}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Link href="/kontakt" className="btn-primary px-7 py-3.5 text-xs">
              Projekt unverbindlich anfragen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/faq" className="btn-ghost px-7 py-3.5 text-xs">
              Häufige Fragen
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <BlogFilter />
      </div>

      <QualityPromise />
    </div>
  );
}
