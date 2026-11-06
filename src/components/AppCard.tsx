'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { useLocale } from './Providers';
import { AppIcon, OsIcon, prettyApp, prettyOs } from './icons';
import { localizePath } from '@/lib/locale-paths';
import type { AppSummary } from '@/lib/types';
import { DEFAULT_LOCALE } from '@/lib/types';

export default function AppCard({ app }: { app: AppSummary }) {
  const { locale } = useLocale();
  const { t } = useTranslation();
  const fm = app.primary[locale] ?? app.primary[DEFAULT_LOCALE] ?? Object.values(app.primary)[0];

  return (
    <Link
      href={localizePath(`/guides/${app.os}/${app.app}`, locale)}
      className="group flex items-center gap-4 rounded-[var(--radius)] glass neon-glow p-5 transition-transform hover:-translate-y-1"
    >
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 shadow-sm" style={{ color: 'var(--accent)' }}>
        <AppIcon app={app.app} className="h-6 w-6" />
        <span className="absolute -bottom-1 -end-1 flex h-5 w-5 items-center justify-center rounded-full glass !border-none shadow-sm" style={{ color: 'var(--text)' }}>
          <OsIcon os={app.os} className="h-3 w-3" />
        </span>
      </span>
      <span className="min-w-0 flex-1 text-start">
        <span className="block text-lg font-bold transition-colors group-hover:opacity-80" style={{ color: 'var(--accent)' }}>
          {prettyApp(app.app)}
        </span>
        <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
          {prettyOs(app.os)}
        </span>
        {fm?.summary ? (
          <span className="mt-1 block line-clamp-2 text-sm" style={{ color: 'var(--muted)' }}>
            {fm.summary}
          </span>
        ) : (
          <span className="mt-1 block text-sm" style={{ color: 'var(--muted)' }}>
            {t('app.guidesAvailable')}
          </span>
        )}
      </span>
    </Link>
  );
}