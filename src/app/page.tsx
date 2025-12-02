import Navbar from "@/components/navigation/navbar";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Hero from "@/components/sections/hero";
import Skills from "@/components/sections/skills";

export default function Home() {
  return (
    <div className="relative flex flex-col">
      <Navbar />
      <div className="w-full flex justify-center items-center">
        <Hero />
      </div>
      <div className="w-full mt-10">
        <About />
      </div>
      <Skills />
      <Contact />
    </div>
  );
}
