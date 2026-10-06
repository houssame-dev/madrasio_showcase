import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from 'react-icons/fa6';

const QUICK_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Roles', href: '#roles' },
  { label: 'Security', href: '#security' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#000000] border-t-2 border-[#14213D]">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        {/* Left Side */}
        <div className="text-left">
          <p className="text-2xl font-bold tracking-tight text-[#FFFFFF] justify-normal flex items-center">
            <img
              src="/madrasio-logo-colored.png"
              alt="Madrasio Logo"
              className="w-12 h-12 object-contain inline-block mr-2"
            />
            <span className="font-bold text-2xl tracking-tight">
              <span className="text-[#FCA311]">Madr</span>
              <span className="text-[#FFFFFF]">asio</span>
            </span>
          </p>
          <p className="text-sm text-[#E5E5E5] mt-1 max-w-sm">
            The all-in-one school management platform for modern global
            education.
          </p>
          <p className="text-xs text-[#FCA311] font-semibold mt-4">
            A product by Gemistra Tech
          </p>
          <div className="flex gap-4 mt-14 text-[#E5E5E5] justify-center md:justify-start">
            <a
              href="https://www.linkedin.com/showcase/madrasio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Madrasio on LinkedIn"
              className="text-[#E5E5E5] hover:text-[#FCA311] transition-colors p-2 text-xl"
            >
              <FaLinkedin className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.facebook.com/Madrasio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Madrasio on Facebook"
              className="text-[#E5E5E5] hover:text-[#FCA311] transition-colors p-2 text-xl"
            >
              <FaFacebook className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://x.com/madrasio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Madrasio on X"
              className="text-[#E5E5E5] hover:text-[#FCA311] transition-colors p-2 text-xl"
            >
              <FaXTwitter className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/madrasio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Madrasio on Instagram"
              className="text-[#E5E5E5] hover:text-[#FCA311] transition-colors p-2 text-xl"
            >
              <FaInstagram className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Right Side */}
        <nav
          aria-label="Footer navigation"
          className="flex gap-12 text-sm text-[#E5E5E5]"
        >
          <div>
            <p className="font-bold text-[#FFFFFF] mb-4">Quick Links</p>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-semibold hover:text-[#FCA311] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold text-[#FFFFFF] mb-4">Contact</p>
            <ul className="space-y-3 text-[#E5E5E5]">
              <li>
                <p className="font-semibold">+212 60 79 91 55 44</p>
              </li>
              <li>
                <p className="font-semibold">contact@madrasio.com</p>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-8 border-t border-[#14213D] flex flex-col sm:flex-row justify-between items-center text-xs text-[#E5E5E5]/70 gap-4">
        <p>© 2026 Madrasio. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[#FCA311] animate-pulse"
          />
          <span>V1 is Live</span>
        </p>
      </div>
    </footer>
  );
}
