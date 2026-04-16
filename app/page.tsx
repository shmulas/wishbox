import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Leadership from '@/components/Leadership';
import Services from '@/components/Services';
import Covenant from '@/components/Covenant';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Leadership />
      <Services />
      <Covenant />
      <Contact />
      <Footer />
    </main>
  );
}
