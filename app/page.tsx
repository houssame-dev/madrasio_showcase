import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import ValuePillars from '@/components/ValuePillars';
import Roles from '@/components/Roles';
import Security from '@/components/Security';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      <Navbar />
      <Hero />
      <TrustBar />
      <ValuePillars />
      <Roles />
      <Security />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
