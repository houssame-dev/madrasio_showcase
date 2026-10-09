'use client';

import { useEffect, useState } from 'react';
import { FaArrowUp, FaWhatsapp } from 'react-icons/fa6';

const WHATSAPP_URL = 'https://wa.me/212607991544';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 end-6 z-50 flex flex-col items-center gap-3">
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex items-center justify-center rounded-full aspect-square p-4 h-12 w-12 bg-[#14213D] text-[#FFFFFF] shadow-lg hover:bg-[#FCA311] hover:text-[#000000] transition-all"
        >
          <FaArrowUp aria-hidden="true" />
        </button>
      )}

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Madrasio on WhatsApp"
        className="flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 rounded-full shrink-0 aspect-square bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform"
      >
        <FaWhatsapp className="h-6 w-6 text-white" aria-hidden="true" />
      </a>
    </div>
  );
}
