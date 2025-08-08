// src/data/work-experiences.ts

import Zapcom from "@/icons/zapcom.svg";
import Panorbit from "@/icons/panorbit.svg";
import Infosys from "@/icons/infosys.svg";
import React from "@/icons/icon-react.svg";
import Redux from "@/icons/icon-redux.svg";
import TypeScript from "@/icons/icon-typescript.svg";
import JavaScript from "@/icons/icon-javscript.svg";
import AWS from "@/icons/icon-aws.svg";
import Firebase from "@/icons/icon-firebase.svg";
import Angular from "@/icons/icon-angular.svg";
import Spring from "@/icons/icon-spring.svg";
import Java from "@/icons/icon-java.svg";
import WinnerGroup from "@/icons/hackathon-winner-group.jpeg";
import WinnerSingle from "@/icons/hackathon-winner-single.jpg";
import { StaticImageData } from "next/image";

export type Project = {
  title: string;
  keyResponsibilities: string[];
  keyAchievements?: string[];
};

export type WorkExperience = {
  organization: string;
  organizationLogo: string;
  role: string;
  timeline: string;
  description: string;
  techStack: { name: string; logo: string }[];
  scale?: number;
  projects?: Project[];
  winner?: {
    title: string;
    description: string;
    images: StaticImageData[];
  };
};

export const workExperiences: WorkExperience[] = [
  {
    organization: "Zapcom Solutions Pvt. Ltd.",
    organizationLogo: Zapcom,
    role: "Senior Frontend Developer",
    timeline: "Jun 2023 - Present | 2+ years",
    description:
      "Developed and maintained scalable web applications, collaborated with cross-functional teams, and optimized UI performance.",
    techStack: [
      { name: "React", logo: React },
      { name: "React Native", logo: React },
      { name: "JavaScript", logo: JavaScript },
      { name: "TypeScript", logo: TypeScript },
      { name: "AWS", logo: AWS },
      { name: "Firebase", logo: Firebase },
    ],
    projects: [
      {
        title: "Helpcenter Portal",
        keyResponsibilities: [
          "Led design phase and collaborated with stakeholders to define requirements.",
          "Managed frontend development using React JS with Vite.",
          "Coordinated frontend and backend integration.",
        ],
        keyAchievements: [
          "Successfully led the project, enhancing cross-team communication.",
        ],
      },
      {
        title: "Customer Loyalty SaaS Platform",
        keyResponsibilities: [
          "Built interactive React Native apps aligned with UX standards.",
          "Integrated RESTful APIs for seamless functionality.",
          "Deployed mobile apps to App Store and Play Store.",
          "Created serverless APIs with AWS Lambda for business use-cases.",
        ],
        keyAchievements: [
          "Learned AWS serverless architecture (Lambda, DynamoDB, Cognito).",
          "Managed end-to-end mobile app lifecycle independently.",
        ],
      },
    ],
    winner: {
      title: "Zapcom Hackathon Winner",
      description:
        "Yay! We won the Zapcom Hackathon 2025 on Agentic AI, collaborating as a team to build innovative AI-driven solutions that push technology boundaries—leveraging AI agents to deliver price-optimized solutions for the HoReCa industry.",
      images: [WinnerSingle, WinnerGroup],
    },
  },
  {
    organization: "Panorbit Services LLP.",
    organizationLogo: Panorbit,
    role: "Software Developer",
    timeline: "July 2022 - April 2023 | 9 months",
    description:
      "Began transitioning from Angular to React and React Native, gaining hands-on experience developing mobile apps for the first time. During this period, contributed to ODO World, building interactive multilingual word-game features that delivered a smooth user experience. Also improved stability and fixed critical bugs in the Changeway React Native app, enhancing overall performance and reliability. Applied modern React Native best practices to deliver efficient, scalable mobile solutions.",
    techStack: [
      { name: "React Native", logo: React },
      { name: "React", logo: React },
      { name: "JavaScript", logo: JavaScript },
      { name: "TypeScript", logo: TypeScript },
      { name: "Redux", logo: Redux },
    ],
    scale: 0.7,
  },
  {
    organization: "Infosys Pvt. Ltd.",
    organizationLogo: Infosys,
    role: "Systems Engineer",
    timeline: "March 2021 - June 2022 | 1 year 3 months",
    description:
      "Completed a 4-6 month Full Stack Web Development training at Infosys, focusing on AngularJS and Java Spring Boot. Post-training, contributed to internal projects by fixing bugs, building new components, and developing proof of concepts (POCs) for the Experience ICETS portal. This hands-on work enhanced my full stack skills and prepared me for live project challenges.",
    techStack: [
      { name: "Angular Js", logo: Angular },
      { name: "Spring Boot", logo: Spring },
      { name: "Java", logo: Java },
    ],
  },
];
