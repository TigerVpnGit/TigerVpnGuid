'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // تشخیص اینکه کاربر با موبایل/تبلت وارد شده یا کامپیوتر
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // قفل کردن اسکرول پس‌زمینه وقتی پنجره موبایل باز است
  useEffect(() => {
    if (isMobileSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileSheetOpen]);

  const byOs = new Map<string, AppSummary[]>();
  for (const a of apps) {
    if (!byOs.has(a.os)) byOs.set(a.os, []);
    byOs.get(a.os)!.push(a);
  }
  const osList = [...byOs.keys()];
  const filteredApps = selectedOs ? byOs.get(selectedOs) ?? [] : [];

  const handleOsSelect = (os: string) => {
    if (selectedOs === os) {
      setSelectedOs(null);
      setIsMobileSheetOpen(false);
    } else {
      setSelectedOs(os);
      if (isMobile) {
        setIsMobileSheetOpen(true);
      }
    }
  };

  return (
    <div className="mx-auto max-w-[800px] px-4 text-center">
      <section className="py-16 md:py-24">
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
                  onClick={() => handleOsSelect(os)}
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

      {/* لیست برنامه‌ها برای کامپیوتر (دسکتاپ) */}
      {selectedOs && !isMobile && (
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

      {/* پنجره کشویی پایین صفحه (فقط برای موبایل و تبلت) */}
      {isMobile && selectedOs && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* پس‌زمینه تاریک */}
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              isMobileSheetOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMobileSheetOpen(false)}
          />
          
          {/* بدنه پنجره */}
          <div
            className={`relative w-full max-w-lg rounded-t-3xl glass p-6 pb-12 transition-transform duration-300 ease-out ${
              isMobileSheetOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
            style={{ background: 'var(--bg-1)', borderBottom: 'none', borderTop: '1px solid var(--border)' }}
          >
            {/* دستگیره بالای پنجره */}
            <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-[var(--muted)] opacity-30" />

            <div className="mb-6 flex items-center justify-between text-start">
              <h2 className="text-xl font-bold" style={{ color: 'var(--accent)' }}>
                {t('home.chooseApp', { os: prettyOs(selectedOs) })}
              </h2>
              <button
                onClick={() => setIsMobileSheetOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full glass"
                style={{ color: 'var(--text)' }}
              >
                <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 text-start max-h-[60vh] overflow-y-auto pb-4">
              {filteredApps.map((a) => (
                <AppCard key={`${a.os}/${a.app}`} app={a} />
              ))}
            </div>
          </div>
        </div>
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
