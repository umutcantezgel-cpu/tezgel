"use client";
import React from 'react';
import { Award, Star, ArrowRight, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { values, COMPANY_DATA } from '@/config/company';
import { RATING_SUMMARY } from '@/config/reviews';
import CompanyHistory from '@/components/sections/CompanyHistory';
import QualityPromise from '@/components/sections/QualityPromise';

export default function AboutPage() {
  const { legalName, owner, authority, headquarters, business, contact, motto } = COMPANY_DATA;
  const google = RATING_SUMMARY.google;
  const trustlocal = RATING_SUMMARY.trustlocal;

  const stats = [
    { value: String(business.establishmentYear), label: `Betriebsgründung in ${headquarters.city}` },
    { value: 'HWK', label: `Eingetragener Meisterbetrieb (${authority.name})` },
    { value: google.displayRating, label: `${google.count} ${google.label}`, stars: true },
    { value: trustlocal.displayRating, label: `${trustlocal.count} ${trustlocal.label}` }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Hero */}
      <div className="ceramic-band py-16 px-4 relative overflow-hidden">
        <div className="ambient-glow-mint -top-24 -left-24 opacity-70" />
        <div className="ambient-glow-sky -bottom-24 -right-24 opacity-60" />
        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <span className="eyebrow">
            <Award className="w-3.5 h-3.5" />
            Gegründet {business.establishmentYear} &middot; {authority.shortName}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900">
            Über <span className="text-ceramic-gradient">{legalName}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Ihr Meisterbetrieb für {business.industryType} – mit Firmensitz in {headquarters.city} und im Einsatz in Wetzlar, Gießen und ganz Mittelhessen.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <span className="eyebrow eyebrow-sky mb-4">Unser Betrieb</span>
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
              Handwerkliche Präzision aus {headquarters.city}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                Seit der Gründung im Jahr {business.establishmentYear} steht <strong className="text-slate-900">{legalName}</strong> für handwerkliche Präzision in Mittelhessen – als {authority.certification}.
              </p>
              <p>
                Unter der Führung von Inhaber &amp; Handwerksmeister <strong className="text-slate-900">{owner.fullName}</strong> liegt unser Schwerpunkt auf Badsanierungen und barrierefreien Walk-In-Duschen, fugenarmen XXL-Großformaten, Wohnbereichen, Balkonen und Terrassen sowie der normgerechten Verbundabdichtung nach DIN 18534.
              </p>
              <p>
                Von unserem Firmensitz in der {headquarters.street}, {headquarters.postalCode} {headquarters.city} aus beraten wir Sie persönlich, transparent und mit verbindlichem Festpreisangebot.
              </p>
            </div>
            <figure className="glass-surface rounded-2xl px-5 py-4 mt-6">
              <blockquote className="text-sm italic text-slate-800">„{motto}“</blockquote>
              <figcaption className="mt-1 text-xs font-bold text-emerald-800">— {owner.fullName}, {owner.title}</figcaption>
            </figure>
          </div>

          <dl className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-surface p-6 rounded-3xl text-center flex flex-col-reverse justify-end gap-1 hover:-translate-y-0.5 hover:border-emerald-500/80 transition-all duration-300"
              >
                <dt className="text-xs text-slate-600 font-semibold">{stat.label}</dt>
                <dd className="font-display text-3xl font-black text-slate-900 tabular-nums">
                  {stat.value}
                  {stat.stars && (
                    <span className="flex items-center justify-center gap-0.5 mt-1 text-amber-500" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Values */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="eyebrow mb-4">Wofür wir stehen</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Unsere Werte im Handwerk</h2>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <li
                key={value.title}
                className="group glass-surface rounded-3xl p-6 hover:-translate-y-0.5 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300"
              >
                <span className="icon-chip w-11 h-11 mb-4">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-base font-black text-slate-900 mb-1 group-hover:text-emerald-800 transition-colors">{value.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{value.description}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/kontakt" className="btn-primary w-full sm:w-auto">
            Vor-Ort-Aufmaß vereinbaren
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a href={`tel:${contact.phoneLink}`} className="btn-ghost w-full sm:w-auto">
            <Phone className="w-4 h-4 text-emerald-700" />
            {contact.phone}
          </a>
          <a
            href={headquarters.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full sm:w-auto"
          >
            <MapPin className="w-4 h-4 text-emerald-700" />
            {headquarters.street}, {headquarters.city}
          </a>
        </div>
      </div>

      <CompanyHistory />
      <QualityPromise />
    </div>
  );
}
