"use client";
import Image from "next/image";
import { MapPin, DotIcon } from "lucide-react";
import LinkedIn from "@/icons/linkedin.svg";
import Github from "@/icons/github.svg";
import { useBreakpoint } from "@/hooks/useBreakPoints";
import HeroProfile from "@/components/custom-components/hero-profile";
import CallAnimated from "@/icons/call-animated.gif";

import clsx from "clsx";

export default function Hero() {
  const { isMobile } = useBreakpoint();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full px-8 py-8 pb-12 lg:px-16 xl:px-0 max-w-6xl h-full mx-auto gap-12 my-auto">
      <div className="flex flex-col items-start justify-center text-left gap-8 md:gap-8">
        <h1 className="text-3xl lg:text-4xl font-bold flex items-center gap-2 w-full">
          Hi, I&apos;m Jatin 👋
        </h1>
        {isMobile && <HeroProfile />}
        <p className="md:text-md lg:text-lg text-gray-600 text-justify">
          I&apos;m a frontend & mobile developer with 4+ years of experience
          building modern, responsive apps using the latest technology. My go-to
          stack for web is Next.js with Firebase—fully leveraging its backend
          and storage features for scalable, enterprise-level PWA solutions. I
          love integrating tech like Google Maps, OTP-based authentication, and
          more to deliver robust products. For mobile, I build seamless apps
          with React Native and the best modern tools. I&apos;m passionate about
          turning ideas into smooth, user-friendly experiences and always
          excited to solve new challenges. Check out my recent live projects, or
          reach out if you&apos;re ready to build something awesome together!
        </p>
        <div className="flex items-center gap-4 flex-col">
          <span className="text-sm flex items-start gap-2 justify-start text-gray-600 font-medium w-full">
            <MapPin className="w-5 h-5 text-gray-600" /> Bangalore, India
          </span>
          <span className="text-sm font-medium text-gray-600 flex items-center gap-2 justify-center w-full">
            <DotIcon className="w-5 h-5 scale-380 text-green-600 animate-pulse" />{" "}
            Available for new projects
          </span>
        </div>
        <div className="flex gap-6 w-full flex-wrap">
          <a
            href="https://www.linkedin.com/in/jatin-prakash-jain/"
            aria-label="LinkedIn"
            className="flex items-center gap-2 hover:text-blue-900"
          >
            <Image src={LinkedIn} alt="LinkedIn" width={40} height={40} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/Jatin-P-Jain?tab=repositories"
            aria-label="Github"
            className="flex items-center gap-2"
          >
            <Image
              src={Github}
              alt="Github"
              width={35}
              height={35}
              className="bg-white rounded-full"
            />
            <span>Github</span>
          </a>
          <a
            href="#contact-offset"
            aria-label="Github"
            className="bg-gradient-to-br from-amber-400 via-amber-300 to-amber-400 md:ml-auto flex items-center gap-2 rounded-lg px-2 md:px-3 md:py-1.5 border-2 border-amber-300/40 hover:bg-amber-300/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 dark:shadow-gray-400"
          >
            <div className={clsx("relative w-8 h-8")}>
              <Image
                src={CallAnimated}
                alt="Connect with me"
                fill
                sizes="150px"
              />
            </div>
            <span className="font-semibold text-black/90">
              Contact / Hire Me
            </span>
          </a>
        </div>
      </div>
      {!isMobile && <HeroProfile />}
    </div>
  );
}
