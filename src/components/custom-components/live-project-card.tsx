"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type Tech = {
  logo_url: string;
  label: string;
};

type Project = {
  name: string;
  projectLogo: string;
  description: string;
  highlights: string[];
  techStack?: Tech[];
  demoVideo: string;
  link: string;
};

type LiveProjectCardProps = {
  project: Project;
};

const LiveProjectCard: React.FC<LiveProjectCardProps> = ({ project }) => {
  const [videoLoading, setVideoLoading] = useState(true);

  // refs for scrollable detection
  const descRef = useRef<HTMLDivElement>(null!);
  const featuresRef = useRef<HTMLDivElement>(null!);
  const techRef = useRef<HTMLDivElement>(null!);

  const [scrollFlags, setScrollFlags] = useState({
    desc: false,
    descEnd: false,
    features: false,
    featuresEnd: false,
    tech: false,
    techEnd: false,
  });

  useEffect(() => {
    const checkScrollable = (ref: React.RefObject<HTMLDivElement>) =>
      ref.current ? ref.current.scrollHeight > ref.current.clientHeight : false;
    const handleScroll = (
      ref: React.RefObject<HTMLDivElement>,
      key: keyof typeof scrollFlags
    ) => {
      if (!ref.current) return;
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      // Check if user reached end (allowing 2px leeway)
      if (scrollTop + clientHeight >= scrollHeight - 2) {
        setScrollFlags((prev) => ({ ...prev, [`${key}End`]: true }));
      } else {
        setScrollFlags((prev) => ({ ...prev, [`${key}End`]: false }));
      }
    };

    [descRef, featuresRef, techRef].forEach((ref, idx) => {
      const key = ["desc", "features", "tech"][idx] as keyof typeof scrollFlags;
      if (ref.current) {
        ref.current.onscroll = () => handleScroll(ref, key);
      }
    });

    setScrollFlags({
      desc: checkScrollable(descRef),
      features: checkScrollable(featuresRef),
      tech: checkScrollable(techRef),
      descEnd: false,
      featuresEnd: false,
      techEnd: false,
    });
  }, [project]); // re-check whenever project changes

  return (
    <div
      key={project.name}
      className="bg-gray-50 rounded-3xl p-4 border border-gray-200 shadow-md md:min-w-[90%] h-full flex flex-col"
    >
      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold mb-2 flex flex-row justify-start items-center gap-4">
        <div className="relative w-8 h-8">
          <Image
            src={project.projectLogo}
            alt="Project Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="flex h-full justify-center items-center">{project.name}</span>
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-400">About the Project</p>
      <div
        ref={descRef}
        className="flex max-h-[150px] flex-col gap-2 overflow-auto mt-1 px-4 text-justify"
      >
        <p className="text-gray-600 text-sm">{project.description}</p>
      </div>
      <span className="text-[8px] text-gray-400 italic px-4 text-center">
        {" "}
        {scrollFlags.desc
          ? scrollFlags.descEnd
            ? "--End--"
            : "Scroll to see more ↓"
          : ""}
      </span>

      {/* Features */}
      <p className="text-xs text-gray-400 mt-2">Key Features</p>
      <div
        ref={featuresRef}
        className="flex gap-1 overflow-auto mt-1 text-justify px-4 max-h-25 md:max-h-40 flex-col no-scrollbar"
      >
        <ul className="list-disc list-inside flex flex-col gap-0 md:gap-1 text-sm">
          {project.highlights.map((h, i) => (
            <li key={i} className="text-gray-600">
              {h}
            </li>
          ))}
        </ul>
      </div>
      <span className="text-[8px] text-gray-400 italic px-4 text-center">
        {" "}
        {scrollFlags.features
          ? scrollFlags.featuresEnd
            ? "--End--"
            : "Scroll to see more ↓"
          : ""}
      </span>

      {/* Tech Stack */}
      <p className="text-xs text-gray-400 mt-2">Tech Stack</p>
      <div
        ref={techRef}
        className="flex gap-2 overflow-auto mt-1 text-justify px-3 text-gray-600 flex-wrap py-2 max-h-25 md:max-h-40 no-scrollbar mb-auto"
      >
        {project.techStack?.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-gray-200 px-4 py-1 rounded-full text-sm shadow-md"
          >
            <div className="w-5 h-5 relative">
              <Image
                src={tech.logo_url}
                alt="Tech Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xs">{tech.label}</span>
          </div>
        ))}
      </div>
      <span className="text-[8px] text-gray-400 italic px-4 text-center mb-3">
        {" "}
        {scrollFlags.tech
          ? scrollFlags.techEnd
            ? "--End--"
            : "Scroll to see more ↓"
          : ""}
      </span>

      {/* Video */}
      <div className="relative w-full h-fit flex justify-center items-center mb-2 md:mb-4">
        {videoLoading && (
          <div className="flex items-center justify-center flex-col gap-2 absolute">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
            <span className="ml-2 text-gray-600 text-xs">
              Loading demo video...
            </span>
          </div>
        )}
        <div className="flex w-60 md:w-80 h-fit max-w-90 rounded-md overflow-hidden border-2 ring-2">
          <video
            src={project.demoVideo}
            autoPlay
            muted
            loop
            playsInline
            className="object-fill"
            preload="auto"
            onLoadedData={() => setVideoLoading(false)}
          />
        </div>
      </div>

      {/* CTA */}
      <Button asChild className="mt-auto">
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          Explore Project <ExternalLink className="inline w-4 h-4 ml-1" />
        </a>
      </Button>
    </div>
  );
};

export default LiveProjectCard;
