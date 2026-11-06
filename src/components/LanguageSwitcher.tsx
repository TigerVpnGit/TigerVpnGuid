'use client';

import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

import { useLocale } from './Providers';
import { localizePath, stripBasePath, withBasePath } from '@/lib/locale-paths';
import { LOCALES, type Locale } from '@/lib/types';

const LANGUAGE_LABELS: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  fa: 'فارسی',
};

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();

  const handleChange = (next: Locale) => {
    setLocale(next);
    let currentPath = stripBasePath(window.location.pathname);
    
    // پاک کردن اسلش اضافی از انتهای مسیر فعلی
    if (currentPath !== '/') {
       currentPath = currentPath.replace(/\/$/, '');
    }
    
    let newPath = withBasePath(localizePath(currentPath, next));
    
    // اضافه کردن اجباری اسلش به انتها برای جلوگیری از خطای 404
    if (!newPath.endsWith('/')) {
      newPath += '/';
    }
    
    window.location.assign(newPath);
  };

  return (
    <label className="relative flex min-h-touch items-center rounded glass text-[var(--text)] transition-colors focus-within:ring-2 focus-within:ring-[var(--accent)]/40">
      <span className="pointer-events-none absolute start-3 flex items-center text-sm" aria-hidden="true">
        <FontAwesomeIcon icon={faLanguage} className="h-4 w-4" />
      </span>
      <span className="sr-only">{t('language.label')}</span>
      <select
        value={locale}
        dir={locale === 'fa' ? 'rtl' : 'ltr'}
        onChange={(event) => handleChange(event.target.value as Locale)}
        className="min-h-touch w-[7.75rem] appearance-none rounded bg-transparent py-2 pe-7 ps-9 text-sm font-semibold outline-none sm:w-36 cursor-pointer"
      >
        {LOCALES.map((code: Locale) => (
          <option key={code} value={code} dir={code === 'fa' ? 'rtl' : 'ltr'} className="text-black">
            {LANGUAGE_LABELS[code]}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute end-3 text-[0.65rem] opacity-70" aria-hidden="true">
        ▼
      </span>
    </label>
  );
}
