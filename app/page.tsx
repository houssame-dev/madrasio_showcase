import dynamic from 'next/dynamic';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ValuePillars from '@/components/ValuePillars';
import Roles from '@/components/Roles';
import Security from '@/components/Security';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Heavy below-the-fold sections are code-split so they don't inflate
// the initial JavaScript bundle (Core Web Vitals: faster LCP/TBT).
const GlobalEducation = dynamic(
  () => import('@/components/GlobalEducation'),
);
const Pricing = dynamic(() => import('@/components/Pricing'));
const FAQ = dynamic(() => import('@/components/FAQ'));

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      <Navbar />
      <Hero />
      <GlobalEducation />
      <ValuePillars />
      <Roles />
      <Security />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
