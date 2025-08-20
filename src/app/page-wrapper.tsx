"use client";
import React, { useEffect, useRef, useState } from "react";
import Hero from "./sections/hero";
import AboutMe from "./sections/about-me";
import SkillsSection from "./sections/skills";
import WorkExperienceSection from "./sections/work-experience";
import ProjectsSection from "./sections/personal-projects";
import CertificationsList from "./sections/certifications";
import ContactSection from "./sections/contact";
import { ChevronsUp } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import CallAnimated from "@/icons/call-animated.gif";
import { useBreakpoint } from "@/hooks/useBreakPoints";

export default function PageWrapper() {
  const { isMobile } = useBreakpoint();
  const [isFloating, setIsFloating] = useState(false);
  const [isContactSection, setIsContactSection] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => setCollapsed(true), 5000);
      return () => clearTimeout(timer);
    } else {
      setCollapsed(false); // reset if any condition changes
    }
  }, [isMobile]);

  useEffect(() => {
    if (!hydrated) return;

    // Set up observer for hero section
    let heroObserver: IntersectionObserver | undefined;
    if (heroRef.current) {
      heroObserver = new IntersectionObserver(
        ([entry]) => setIsFloating(!entry.isIntersecting),
        { threshold: 0 }
      );
      heroObserver.observe(heroRef.current);
    }

    // Set up observer for contact section
    let contactObserver: IntersectionObserver | undefined;
    if (contactRef.current) {
      contactObserver = new IntersectionObserver(
        ([entry]) => setIsContactSection(entry.isIntersecting),
        { threshold: 0 }
      );
      contactObserver.observe(contactRef.current);
    }

    // Cleanup both
    return () => {
      if (heroObserver && heroRef.current) heroObserver.disconnect();
      if (contactObserver && contactRef.current) contactObserver.disconnect();
    };
  }, [hydrated]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div
      className={
        "flex w-full flex-col items-center justify-start antialiased mx-auto"
      }
    >
      <div
        className={
          "flex flex-col gap-3 md:gap-4 fixed bottom-8 right-8 md:right-16 z-50 justify-end items-end opacity-0 transition-all duration-300 -translate-y-10" +
          (isFloating ? " opacity-100 translate-y-0" : "")
        }
      >
        <div
          className="text-sm flex w-fit p-1 px-4 justify-center items-center text-gray-600 bg-gray-100 border-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronsUp className="size-5" />
          <span
            className={clsx(
              "transition-all duration-300",
              isMobile && collapsed
                ? "opacity-0 max-w-0 max-h-0 overflow-hidden"
                : "opacity-100 ml-2"
            )}
          >
            Scroll to Top
          </span>
          {/* Scroll to top */}
        </div>
        <a
          href="#contact-offset"
          aria-label="Github"
          className={clsx(
            "bg-gradient-to-br from-amber-400 via-amber-300 to-amber-400 flex items-center rounded-lg px-3 py-1 border-2 border-amber-300/40 shadow-lg hover:shadow-xl hover:scale-105 dark:shadow-gray-400 transition-all duration-300",
            isContactSection
              ? "opacity-0 pointer-events-none translate-y-4"
              : "opacity-100 pointer-events-auto translate-y-0",
            isMobile && collapsed
              ? "" // compact for icon only
              : "w-auto"
          )}
        >
          <div className="relative w-7 h-7">
            <Image
              src={CallAnimated}
              alt="Connect with me"
              fill
              sizes="150px"
            />
          </div>
          <span
            className={clsx(
              "font-semibold text-black/90 ml-0 transition-all duration-300",
              isMobile && collapsed
                ? "opacity-0 max-w-0 max-h-0 overflow-hidden"
                : "opacity-100 ml-2"
            )}
          >
            Contact / Hire Me
          </span>
        </a>
      </div>
      <section
        className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 min-h-[92vh]"
        ref={heroRef}
      >
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
        ref={contactRef}
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
    </div>
  );
}
