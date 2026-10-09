import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GlobalEducation from '@/components/GlobalEducation';
import ValuePillars from '@/components/ValuePillars';
import Roles from '@/components/Roles';
import Security from '@/components/Security';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#000000]">
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
