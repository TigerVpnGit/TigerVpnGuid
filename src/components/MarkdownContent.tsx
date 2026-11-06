'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function MarkdownContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // ۱. اصلاح مسیر تصاویر (اضافه کردن نام مخزن به ابتدای آدرس)
    const images = Array.from(root.querySelectorAll('img'));
    for (const img of images) {
      const src = img.getAttribute('src');
      if (src && src.startsWith('/') && !src.startsWith('/TigerVpnGuid')) {
        img.setAttribute('src', `/TigerVpnGuid${src}`);
      }
    }

    // ۲. اضافه کردن دکمه کپی به کدها
    const blocks = Array.from(root.querySelectorAll('pre'));
    const cleanups: Array<() => void> = [];

    for (const pre of blocks) {
      if (pre.dataset.enhanced) continue;
      pre.dataset.enhanced = 'true';
      pre.classList.add('group', 'relative');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = t('copy.idle');
      btn.className =
        'absolute end-2 top-2 rounded bg-white/10 px-2 py-1 text-xs font-medium text-white ' +
        'opacity-0 transition-opacity hover:bg-white/20 focus:opacity-100 group-hover:opacity-100';

      const onClick = async () => {
        const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
        try {
          await navigator.clipboard.writeText(code);
          btn.textContent = t('copy.copied');
        } catch {
          btn.textContent = t('copy.failed');
        }
        setTimeout(() => (btn.textContent = t('copy.idle')), 2000);
      };

      btn.addEventListener('click', onClick);
      pre.appendChild(btn);
      cleanups.push(() => {
        btn.removeEventListener('click', onClick);
        btn.remove();
        delete pre.dataset.enhanced;
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [html, t]);

  return (
    <div
      ref={ref}
      className="prose prose-ultimateguide max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
