'use client';

import { useTranslation } from 'react-i18next';
import { useLocale } from './Providers';

export default function AboutView() {
  const { locale } = useLocale();

  const texts = {
    fa: {
      title: 'درباره Tiger VPN',
      body: 'Tiger VPN یک سرویس اتصال امن و پرسرعت است که با هدف ارائه بهترین تجربه کاربری و دور زدن محدودیت‌ها طراحی شده است. ما با به‌روزترین تکنولوژی‌ها، امنیت و حریم خصوصی شما را تضمین می‌کنیم. تمام راهنماهای موجود در این سایت به صورت گام‌به‌گام و کاملاً رایگان تهیه شده‌اند تا در کوتاه‌ترین زمان ممکن به اینترنت آزاد متصل شوید.',
    },
    en: {
      title: 'About Tiger VPN',
      body: 'Tiger VPN is a fast and secure connection service designed to provide the best user experience and bypass restrictions. We guarantee your security and privacy using the latest technologies. All the guides on this site are provided step-by-step and completely free of charge so you can connect to the free internet in the shortest time possible.',
    },
    ru: {
      title: 'О Tiger VPN',
      body: 'Tiger VPN — это быстрый и безопасный сервис подключения, созданный для обеспечения наилучшего пользовательского опыта и обхода ограничений. Мы гарантируем вашу безопасность и конфиденциальность, используя новейшие технологии. Все руководства на этом сайте представлены пошагово и абсолютно бесплатно, чтобы вы могли подключиться к свободному интернету в кратчайшие сроки.',
    }
  };

  const current = texts[locale as keyof typeof texts] || texts.en;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-start">
      {/* کلاس font-blackfuture برای استفاده از فونت اختصاصی شما */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gradient font-blackfuture inline-block pb-2 tracking-wider">
        {current.title}
      </h1>
      <div className="glass p-6 md:p-8 rounded-[var(--radius)]">
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text)' }}>
          {current.body}
        </p>
      </div>
    </div>
  );
}