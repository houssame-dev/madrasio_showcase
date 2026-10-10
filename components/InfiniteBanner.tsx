'use client';

import { FaStar } from 'react-icons/fa6';

import { useLanguage } from '@/components/LanguageProvider';

const REPEAT_COUNT = 8;

export default function InfiniteBanner() {
  // The banner is pinned to LTR (English copy, leftward loop) regardless
  // of page direction, so it always uses the standard marquee keyframes.
  const { t } = useLanguage();
  const bannerItems = Array.from({ length: REPEAT_COUNT }).map((_, index) => (
    <span key={index} className="flex items-center gap-x-8 pe-8">
      <span className="text-2xl font-black text-[#14213D] tracking-wide uppercase">
        {t('banner.freeMonth')}
      </span>
      <FaStar className="text-[#14213D] text-2xl" aria-hidden="true" />
    </span>
  ));

  return (
    <div
      dir="ltr"
      className="relative flex w-full overflow-hidden bg-[#FCA311] py-4 select-none"
    >
      {/* First scrolling track */}
      <div className="flex shrink-0 animate-marquee items-center whitespace-nowrap">
        {bannerItems}
      </div>
      {/* Second duplicate scrolling track for zero-gap loop */}
      <div
        className="flex shrink-0 animate-marquee items-center whitespace-nowrap"
        aria-hidden="true"
      >
        {bannerItems}
      </div>
    </div>
  );
}
