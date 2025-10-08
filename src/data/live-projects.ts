import TailwindCss from "@/icons/icon-tailwindcss.svg";
import Firebase from "@/icons/icon-firebase.svg";
import Whatsapp from "@/icons/icon-whatsapp.svg";
import Vercel from "@/icons/icon-vercel.svg";
import ShadcnUI from "@/icons/icon-shadcn.svg";
import Google from "@/icons/icon-google.svg";
import MSCLogo from "@/assets/images/msc-logo.svg";
import HotHomesLogo from "@/assets/images/hot-homes-logo.svg";
import NextJs from "@/icons/icon-nextjs.svg";
import React from "@/icons/icon-react.svg";
export const LIVE_PROJECTS = [
  {
    projectLogo: MSCLogo,
    name: "Megha Sales Corporation",
    description:
      "An enterprise-level PWA built for an autoparts wholesaler managing 9–10 leading brands. The platform streamlines product cataloging and online ordering, replacing the traditional manual process with a fully digital, real-time solution.",
    highlights: [
      "Fully responsive and installable Progressive Web App (PWA)",
      "Role-based access with separate Admin and User interfaces",
      "Google One Tap sign-in for seamless authentication",
      "WhatsApp notifications for instant order updates",
      "Instant search and filtering for quick product discovery",
      "Secure user session management with persistent login",
    ],
    techStack: [
      {
        label: "Next.js 15",
        logo_url: NextJs,
      },
      {
        label: "React",
        logo_url: React,
      },
      {
        label: "Shadcn/UI",
        logo_url: ShadcnUI,
      },
      {
        label: "Tailwind CSS",
        logo_url: TailwindCss,
      },
      {
        label: "Firebase",
        logo_url: Firebase,
      },
      {
        label: "Google One Tap",
        logo_url: Google,
      },
      {
        label: "WhatsApp API",
        logo_url: Whatsapp,
      },
      {
        label: "Vercel",
        logo_url: Vercel,
      },
    ],
    link: "https://meghasalescorporation.in/",
    demoVideo: "/videos/megha-sales-corporation.mp4",
  },
  {
    projectLogo: HotHomesLogo,
    name: "Hot Homes",
    description:
      "A learning project built to explore Next.js with Firebase, where the app catalogs homes for sale with prices, addresses, and amenities. Users can browse and filter properties, while admins manage listings via a separate role-based interface.",
    highlights: [
      "Users can favourite homes for quick access",
      "Login with Google for easy authentication",
      "Google Maps integration for property locations",
    ],
    techStack: [
      {
        label: "Next.js",
        logo_url: NextJs,
      },
      {
        label: "React",
        logo_url: React,
      },
      {
        label: "shadcn/ui",
        logo_url: ShadcnUI,
      },
      {
        label: "Tailwind CSS",
        logo_url: TailwindCss,
      },
      {
        label: "Firebase",
        logo_url: Firebase,
      },
    ],
    link: "https://hot-homes.jatinprakash.online/",
    demoVideo: "/videos/hot-homes-demo.mp4",
  },
];
