"use client";
import Image from "next/image";
import React from "@/icons/icon-react.svg";
import NextJs from "@/icons/icon-nextjs.svg";
import Typescript from "@/icons/icon-typescript.svg";
import TailwindCss from "@/icons/icon-tailwindcss.svg";
import JavaScript from "@/icons/icon-javscript.svg";
import Git from "@/icons/icon-git.svg";
import NodeJs from "@/icons/icon-nodejs.svg";
import PostgresSql from "@/icons/icon-postgresql.svg";
import FirebaseIcon from "@/icons/icon-firebase.svg";
import HTMLIcon from "@/icons/icon-html.svg";
import CSSIcon from "@/icons/icon-css.svg";
import AwsIcon from "@/icons/icon-aws.svg";

type Skill = {
  name: string;
  imageSrc: string;
  alt: string;
};

const skills: Skill[] = [
  {
    name: "Next.js",
    imageSrc: NextJs,
    alt: "Next.js Logo",
  },
  {
    name: "React",
    imageSrc: React,
    alt: "React Logo",
  },
  {
    name: "JavaScript",
    imageSrc: JavaScript,
    alt: "JavaScript Logo",
  },
  {
    name: "TypeScript",
    imageSrc: Typescript,
    alt: "TypeScript Logo",
  },
  {
    name: "Tailwind CSS",
    imageSrc: TailwindCss,
    alt: "Tailwind CSS Logo",
  },
  {
    name: "Firebase",
    imageSrc: FirebaseIcon,
    alt: "Firebase Logo",
  },
  {
    name: "HTML",
    imageSrc: HTMLIcon,
    alt: "HTML Logo",
  },
  {
    name: "CSS",
    imageSrc: CSSIcon,
    alt: "CSS Logo",
  },
  {
    name: "Git",
    imageSrc: Git,
    alt: "Git Logo",
  },
  {
    name: "Node.js",
    imageSrc: NodeJs,
    alt: "Node.js Logo",
  },
  {
    name: "AWS",
    imageSrc: AwsIcon,
    alt: "AWS Logo",
  },
  {
    name: "PostgreSQL",
    imageSrc: PostgresSql,
    alt: "PostgreSQL Logo",
  },
  // Add more skills as needed
];

export default function SkillsSection() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto py-20 gap-4 px-8 lg:px-16 xl:px-0 md:gap-12 max-w-6xl">
      <h2 className="bg-gray-300 px-6 py-2 rounded-lg font-medium text-gray-800">
        Skills
      </h2>
      <p className="text-center text-gray-600 md:text-lg">
        The skills, tools and technologies I am really good at:
      </p>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-center justify-center gap-6 md:gap-24 w-full">
        {skills.map((skill) => (
          <figure key={skill.name} className="flex flex-col gap-2 items-center">
            <div className="relative w-18 h-18">
              <Image
                src={skill.imageSrc}
                alt={skill.alt}
                fill
                className="object-contain"
              />
            </div>
            <figcaption className="text-sm md:text-base line-clamp-1 text-center">
              {skill.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
