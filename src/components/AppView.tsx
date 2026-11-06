'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { useLocale } from './Providers';
import { AppIcon, CategoryIcon, DownloadIcon, OsIcon, prettyApp, prettyOs, StoreIcon } from './icons';
import { localizePath } from '@/lib/locale-paths';
import type { AppGuides, Category } from '@/lib/types';
import { DEFAULT_LOCALE } from '@/lib/types';

function storeLabelKey(os: string) {
  if (os === 'android') return 'guide.googlePlay';
  if (os === 'ios' || os === 'macos') return 'guide.appStore';
  return 'guide.store';
}

export default function AppView({ app }: { app: AppGuides }) {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const firstGuide = app.guides[0];
  const primaryContent = firstGuide
    ? firstGuide.locales[locale] ?? firstGuide.locales[DEFAULT_LOCALE] ?? Object.values(firstGuide.locales)[0]
    : null;
  const primaryFm = primaryContent?.frontmatter;
  const directDownloadUrl = primaryFm?.directDownloadUrl ?? primaryFm?.downloadUrl;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 text-start">
      <nav className="mb-6 text-sm" style={{ color: 'var(--muted)' }}>
        <Link href={localizePath('/guides', locale)} className="hover:opacity-80 transition-opacity">{t('nav.guides')}</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="font-medium" style={{ color: 'var(--text)' }}>{prettyApp(app.app)}</span>
      </nav>

      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl glass" style={{ color: 'var(--accent)' }}>
            <AppIcon app={app.app} className="h-10 w-10" />
          </span>
          <div>
            <h1 className="text-3xl font-bold md:text-4xl" style={{ color: 'var(--text)' }}>
              {prettyApp(app.app)}
            </h1>
            <div className="mt-1.5 flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
              <OsIcon os={app.os} className="h-4 w-4" />
              {prettyOs(app.os)}
            </div>
          </div>
        </div>

        {(directDownloadUrl || primaryFm?.storeUrl) && (
          <div className="flex flex-wrap items-center gap-4">
            {directDownloadUrl && (
              <a
                href={directDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--gradient)' }}
              >
                <DownloadIcon className="h-4 w-4" />
                {t('guide.directDownload')}
              </a>
            )}
            {primaryFm?.storeUrl && (
              <a
                href={primaryFm.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full glass px-6 py-3 text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{ color: 'var(--text)' }}
              >
                <StoreIcon os={app.os} className="h-4 w-4" />
                {t(storeLabelKey(app.os))}
              </a>
            )}
          </div>
        )}
      </header>

      <section>
        <h2 className="mb-5 text-xl font-bold" style={{ color: 'var(--accent)' }}>{t('app.guides')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {app.guides.map((guide) => {
            const content =
              guide.locales[locale] ?? guide.locales[DEFAULT_LOCALE] ?? Object.values(guide.locales)[0];
            if (!content) return null;
            const fm = content.frontmatter;
            const cat = fm.category as Category | undefined;
            const categoryLabel = cat ? t(`categories.${cat}`) : null;

            return (
              <Link
                key={guide.guide}
                href={localizePath(`/guides/${app.os}/${app.app}/${guide.guide}`, locale)}
                className="group flex items-center justify-between gap-4 rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5" style={{ color: 'var(--accent)' }}>
                    <CategoryIcon category={cat ?? 'setup'} className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold truncate transition-opacity group-hover:opacity-80" style={{ color: 'var(--text)' }}>
                      {categoryLabel ?? fm.title}
                    </h3>
                    {fm.summary && (
                      <p className="mt-1 line-clamp-1 text-sm" style={{ color: 'var(--muted)' }}>
                        {fm.summary}
                      </p>
                    )}
                  </div>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full glass transition-colors group-hover:bg-[var(--accent)] group-hover:text-white" style={{ color: 'var(--muted)' }}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}