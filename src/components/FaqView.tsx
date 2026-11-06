'use client';

import { useTranslation } from 'react-i18next';
import { faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocale } from './Providers';

export default function FaqView() {
  const { locale } = useLocale();

  const faqs = {
    fa: [
      { q: 'آیا Tiger VPN رایگان است؟', a: 'بله، تمام راهنماها و آموزش‌های Tiger VPN رایگان هستند و همیشه خواهند بود. برای دریافت سرویس پرسرعت می‌توانید از ربات تلگرام ما اشتراک تهیه کنید.' },
      { q: 'آیا خودتان سرویس VPN ارائه می‌دهید؟', a: 'بله! ما بهترین سرورها را با قیمت مناسب در ربات تلگرام خود ارائه می‌دهیم. همچنین راهنماهای این سایت به شما یاد می‌دهد چطور از سرویس ما استفاده کنید.' },
      { q: 'چه پلتفرم‌هایی پشتیبانی می‌شوند؟', a: 'اندروید، iOS، ویندوز، macOS و لینوکس. برای دیدن راهنماهای موجود، سیستم‌عامل خود را در صفحه اصلی انتخاب کنید.' }
    ],
    en: [
      { q: 'Is Tiger VPN free?', a: 'Yes, all guides and tutorials on Tiger VPN are free and always will be. To get our high-speed service, you can purchase a subscription through our Telegram bot.' },
      { q: 'Do you provide your own VPN service?', a: 'Yes! We offer the best servers at reasonable prices in our Telegram bot. Our site guides will also teach you how to use our service.' },
      { q: 'Which platforms are supported?', a: 'Android, iOS, Windows, macOS, and Linux. To view available guides, select your OS on the home page.' }
    ],
    ru: [
      { q: 'Tiger VPN бесплатен?', a: 'Да, все руководства на Tiger VPN бесплатны и всегда будут. Чтобы получить наш высокоскоростной сервис, вы можете приобрести подписку через нашего Telegram-бота.' },
      { q: 'Вы предоставляете собственный VPN-сервис?', a: 'Да! Мы предлагаем лучшие серверы по разумным ценам в нашем Telegram-боте. Наши руководства также научат вас пользоваться нашим сервисом.' },
      { q: 'Какие платформы поддерживаются?', a: 'Android, iOS, Windows, macOS и Linux. Чтобы просмотреть доступные руководства, выберите вашу ОС на главной странице.' }
    ]
  };

  const items = faqs[locale as keyof typeof faqs] || faqs.fa;
  const title = locale === 'fa' ? 'پرسش‌های متداول' : locale === 'ru' ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions';

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-start">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-gradient inline-block pb-2 w-full">
        {title}
      </h1>
      
      <dl className="space-y-5 mb-12">
        {items.map((item, i) => (
          <div key={i} className="rounded-[var(--radius)] glass p-6 transition-all hover:shadow-lg">
            <dt className="font-bold text-lg mb-2" style={{ color: 'var(--text)' }}>{item.q}</dt>
            <dd className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.a}</dd>
          </div>
        ))}
      </dl>

      {/* دکمه‌های ارتباطی */}
      <div className="text-center glass p-8 rounded-[var(--radius)] flex flex-col items-center justify-center gap-5 mt-10">
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
          {locale === 'fa' ? 'همین حالا به ما بپیوندید!' : locale === 'ru' ? 'Присоединяйтесь к нам прямо сейчас!' : 'Join us right now!'}
        </h2>
        
        {/* کلاس flex-col برای موبایل (زیر هم) و sm:flex-row برای دسکتاپ (کنار هم) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          
          {/* ۱. دکمه خرید (ربات) - بالا در موبایل، راست در دسکتاپ */}
          <a 
            href="https://t.me/TigerVPNBot" /* <--- آیدی ربات */
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-[#229ED9] px-5 py-2.5 text-sm text-white font-bold transition-all hover:bg-[#1e8dc2] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#229ED9]/30"
          >
            <FontAwesomeIcon icon={faTelegram} className="h-4 w-4" />
            {locale === 'fa' ? 'خرید اشتراک (ربات)' : 'Buy Subscription (Bot)'}
          </a>

          {/* ۲. دکمه اینستاگرام - وسط در موبایل و دسکتاپ */}
          <a 
            href="https://instagram.com/Tiger.VPN" /* <--- آیدی اینستاگرام */
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-5 py-2.5 text-sm text-white font-bold transition-all hover:opacity-90 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#E1306C]/30"
          >
            <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
            Instagram
          </a>

          {/* ۳. دکمه کانال - پایین در موبایل، چپ در دسکتاپ */}
          <a 
            href="https://t.me/TigerVPNChannel" /* <--- آیدی کانال */
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-[#0088cc] px-5 py-2.5 text-sm text-white font-bold transition-all hover:bg-[#007ab8] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0088cc]/30"
          >
            <FontAwesomeIcon icon={faTelegram} className="h-4 w-4" />
            {locale === 'fa' ? 'کانال اطلاع‌رسانی' : 'News Channel'}
          </a>

        </div>
      </div>
    </div>
  );
}
