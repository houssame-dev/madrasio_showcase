import { FaStar } from 'react-icons/fa6';

const REPEAT_COUNT = 8;

const bannerItems = Array.from({ length: REPEAT_COUNT }).map((_, index) => (
  <span key={index} className="flex items-center space-x-8">
    <span className="text-2xl font-black text-[#14213D] tracking-wide">
      First Month FREE
    </span>
    <FaStar className="text-[#14213D] text-2xl" aria-hidden="true" />
  </span>
));

export default function InfiniteBanner() {
  return (
    <div className="relative flex w-full overflow-hidden bg-[#FCA311] py-4 select-none">
      {/* First scrolling track */}
      <div className="flex shrink-0 animate-marquee items-center space-x-8 whitespace-nowrap pr-8">
        {bannerItems}
      </div>
      {/* Second duplicate scrolling track for zero-gap loop */}
      <div
        className="flex shrink-0 animate-marquee items-center space-x-8 whitespace-nowrap pr-8"
        aria-hidden="true"
      >
        {bannerItems}
      </div>
    </div>
  );
}
