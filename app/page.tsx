import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center overflow-clip">
      <Header />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <footer className="w-full p-8 text-center text-gray-400 border-t border-white/[0.1]">
        <p>&copy; 2025 Your Name. All rights reserved.</p>
      </footer>
    </main>
  );
}
