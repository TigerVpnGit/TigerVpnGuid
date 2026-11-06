'use client';

import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLocale, useTheme } from './Providers';
import LanguageSwitcher from './LanguageSwitcher';
import { localizePath, stripBasePath, stripLocaleFromPathname } from '@/lib/locale-paths';

const NAV = [
  { href: '/guides', key: 'nav.guides' },
  { href: '/faq', key: 'nav.faq' },
  { href: '/about', key: 'nav.about' },
] as const;

export default function Header() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const updatePath = () => setCurrentPath(stripLocaleFromPathname(stripBasePath(window.location.pathname)));
    updatePath();
    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  const isActive = (href: string) => currentPath === href || currentPath.startsWith(`${href}/`);

  return (
    <header 
      className="sticky top-0 z-40 border-b"
      style={{ 
        background: 'var(--header-bg)', 
        backdropFilter: 'blur(12px)', 
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'var(--border)' 
      }}
    >
      <div className="mx-auto flex h-[80px] max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        
        <Link href={localizePath('/', locale)} className="flex min-w-0 items-center gap-3">
          
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full overflow-hidden border-2 border-transparent bg-slate-900 shadow-lg bg-clip-padding" style={{ backgroundImage: 'linear-gradient(#0f172a, #0f172a), var(--gradient)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}>
            <Image 
              src="/tiger-logo.png" 
              alt="Tiger VPN" 
              fill
              className="object-cover p-0.5" 
            />
          </div>
          
          <span className="hidden sm:inline text-2xl tracking-widest text-gradient font-blackfuture pt-1 font-bold">
            TIGER VPN
          </span>
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={localizePath(item.href, locale)}
              onClick={() => setCurrentPath(item.href)}
              className={`tap-target text-sm font-semibold transition-opacity hover:opacity-100 ${
                isActive(item.href) ? 'opacity-100 text-[var(--accent)]' : 'opacity-80 text-[var(--text)]'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          {/* دکمه تغییر تم با افکت نئون */}
          <button
            type="button"
            className="tap-target rounded-full glass neon-glow transition-transform hover:-translate-y-0.5"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            style={{ color: 'var(--text)' }}
          >
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="h-4 w-4" aria-hidden="true" />
          </button>
          {/* دکمه منوی موبایل با افکت نئون */}
          <button
            type="button"
            className="tap-target rounded-full glass neon-glow transition-transform hover:-translate-y-0.5 md:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            style={{ color: 'var(--text)' }}
          >
            <FontAwesomeIcon icon={faBars} className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t px-4 py-4 md:hidden" style={{ borderColor: 'var(--border)', background: 'var(--header-bg)' }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={localizePath(item.href, locale)}
              onClick={() => {
                setCurrentPath(item.href);
                setOpen(false);
              }}
              className={`tap-target w-full justify-start rounded-xl px-4 mb-2 text-sm font-bold transition-colors ${
                isActive(item.href) ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}