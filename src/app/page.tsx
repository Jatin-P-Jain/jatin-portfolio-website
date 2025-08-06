import AboutMe from "./sections/about-me";
import Hero from "./sections/hero";
import SkillsSection from "./sections/skills";

export default function Home() {
  return (
    <main className=" flex flex-col items-center justify-center mt-20">
      <section className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 min-h-[90vh] pb-12 pt-8">
        <Hero />
      </section>
      <section
        id="about"
        className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 bg-gray-100"
      >
        <AboutMe />
      </section>
      <section
        id="skills"
        className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12"
      >
        <SkillsSection />
      </section>
    </main>
  );
}
