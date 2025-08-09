import AboutMe from "./sections/about-me";
import CertificationsList from "./sections/certifications";
import ContactSection from "./sections/contact";
import Hero from "./sections/hero";
import ProjectsSection from "./sections/personal-projects";
import SkillsSection from "./sections/skills";
import WorkExperienceSection from "./sections/work-experience";

export default function Home() {
  return (
    <main className=" flex flex-col items-center justify-center mt-20">
      <section className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 min-h-[92vh]">
        <Hero />
      </section>
      <section
        id="about"
        className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 bg-gray-100 relative"
      >
        <div
          id="about-offset"
          style={{ position: "absolute", top: "-20px", height: "20px" }}
        ></div>
        <AboutMe />
      </section>
      <section
        id="skills"
        className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12"
      >
        <SkillsSection />
      </section>
      <section
        id="experience"
        className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 bg-gray-100 relative"
      >
        <div
          id="experience-offset"
          style={{ position: "absolute", top: "-20px", height: "20px" }}
        ></div>
        <WorkExperienceSection />
      </section>
      <section
        id="projects"
        className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 relative"
      >
        <div
          id="projects-offset"
          style={{ position: "absolute", top: "-20px", height: "20px" }}
        ></div>
        <ProjectsSection />
      </section>
      <section
        id="certifications"
        className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 relative bg-gray-100"
      >
        <div
          id="certifications-offset"
          style={{ position: "absolute", top: "-20px", height: "20px" }}
        ></div>
        <CertificationsList />
      </section>
      <section
        id="contact"
        className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 relative"
      >
        <div
          id="contact-offset"
          style={{ position: "absolute", top: "-20px", height: "20px" }}
        ></div>
        <ContactSection />
      </section>
      <footer className="w-full flex flex-col md:flex-row items-center justify-center py-4 bg-gray-100 gap-1 px-8">
        <p className="text-gray-600 text-sm text-center w-full md:w-fit">
          Made with ❤️ and NextJS 15 | Shadcn UI | Tailwind CSS by Jatin Praksh
          Jain.
        </p>
        <span className="underline hover:scale-105 cursor-pointer transition-all duration-300">
          Leave a feedback?
        </span>
      </footer>
    </main>
  );
}
