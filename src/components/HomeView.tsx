'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppCard from './AppCard';
import { useLocale } from './Providers';
import { OsIcon, prettyOs } from './icons';
import { localizePath } from '@/lib/locale-paths';
import type { AppSummary } from '@/lib/types';
import Typewriter from './Typewriter';
import TiltCard from './TiltCard';

export default function HomeView({ apps }: { apps: AppSummary[] }) {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const [selectedOs, setSelectedOs] = useState<string | null>(null);

  const byOs = new Map<string, AppSummary[]>();
  for (const a of apps) {
    if (!byOs.has(a.os)) byOs.set(a.os, []);
    byOs.get(a.os)!.push(a);
  }
  const osList = [...byOs.keys()];
  const filteredApps = selectedOs ? byOs.get(selectedOs) ?? [] : [];

  return (
    <div className="mx-auto max-w-[800px] px-4 text-center">
      <section className="py-16 md:py-24">
        {/* خط زیر (leading و pb) مشکل بریده شدن نقطه‌های حروف فارسی را حل می‌کند */}
        <h1 className="mx-auto max-w-3xl text-3xl md:text-5xl font-extrabold mb-4 text-gradient min-h-[5rem] leading-[1.4] pb-4 flex items-center justify-center">
          <Typewriter text={t('home.heroTitle')} speed={40} />
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl mt-4" style={{ color: 'var(--muted)' }}>
          {t('home.heroSubtitle')}
        </p>
      </section>

      <section className="mb-14">
        <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--accent)' }}>
          {t('home.chooseOs')}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {osList.map((os) => {
            const active = os === selectedOs;
            return (
              <TiltCard key={os} className="w-[118px] h-[110px]">
                <button
                  type="button"
                  onClick={() => setSelectedOs(active ? null : os)}
                  className={`w-full h-full flex flex-col items-center justify-center gap-3 rounded-2xl glass ${
                    active ? 'os-card selected !shadow-[0_0_25px_rgba(168,85,247,0.7)] !border-[var(--accent)]' : ''
                  }`}
                  style={{ color: active ? '#ffffff' : 'var(--text)' }}
                >
                  <OsIcon os={os} className="h-10 w-10" />
                  <span className="font-semibold text-sm">{prettyOs(os)}</span>
                </button>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {selectedOs && (
        <section className="mb-12 text-start animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold" style={{ color: 'var(--accent)' }}>
              {t('home.chooseApp', { os: prettyOs(selectedOs) })}
            </h2>
            <button
              type="button"
              onClick={() => setSelectedOs(null)}
              className="text-sm font-semibold hover:opacity-70 transition-opacity"
              style={{ color: 'var(--muted)' }}
            >
              {t('home.changeOs')}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredApps.map((a) => (
              <AppCard key={`${a.os}/${a.app}`} app={a} />
            ))}
          </div>
        </section>
      )}

      <section className="pb-16 pt-4">
        <Link
          href={localizePath('/guides', locale)}
          className="inline-flex items-center justify-center rounded-full glass px-8 py-3 text-sm font-bold transition-transform hover:-translate-y-1"
          style={{ color: 'var(--text)' }}
        >
          {t('home.browseGuides')}
        </Link>
      </section>
    </div>
  );
}