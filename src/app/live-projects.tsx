"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MonitorDotIcon } from "lucide-react";
import { useBreakpoint } from "@/hooks/useBreakPoints";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NextJs from "@/icons/icon-nextjs.svg";
import React from "@/icons/icon-react.svg";
import TailwindCss from "@/icons/icon-tailwindcss.svg";
import Firebase from "@/icons/icon-firebase.svg";
import Whatsapp from "@/icons/icon-whatsapp.svg";
import Vercel from "@/icons/icon-vercel.svg";
import ShadcnUI from "@/icons/icon-shadcn.svg";
import Google from "@/icons/icon-google.svg";
import MSCLogo from "@/assets/images/msc-logo.svg";
import LiveProjectCard from "@/components/custom-components/live-project-card";

const liveProjects = [
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
      {
        label: "Vercel",
        logo_url: Vercel,
      },
      {
        label: "Google One Tap",
        logo_url: Google,
      },
      {
        label: "WhatsApp API",
        logo_url: Whatsapp,
      },
    ],
    link: "https://meghasalescorporation.in/",
    demoVideo: "/videos/megha-sales-corporation.mp4",
  },
  {
    projectLogo: MSCLogo,
    name: "Hot Homes",
    description:
      "A modern real estate portal for Hot Homes that enables property listing, search, and virtual tours for home buyers and sellers. Focused on fast navigation, rich visuals, and easy lead management.",
    highlights: [
      "Real-time search and filter for properties",
      "Integrated Google Maps for locations",
      "Image galleries & virtual tour support",
      "Secure inquiry and contact forms",
    ],
    link: "https://hot-homes.jatinprakash.online/",
    demoVideo: "/videos/hot-homes-demo.mp4",
  },
];

export default function LiveProjectsDialog() {
  const [open, setOpen] = useState(false);
  const { isDesktop, isLargeDesktop } = useBreakpoint();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Shared project content
  const content = liveProjects.map((proj) => (
    <LiveProjectCard project={proj} key={proj.name} />
  ));

  return (
    <div>
      {/* Desktop Dialog */}
      {(isLargeDesktop || isDesktop) && (
        <div className="hidden lg:block">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="hover:scale-110 transition-all duration-500 font-semibold text-sky-800 hover:text-sky-700 cursor-pointer border-sky-700 shadow-lg shadow-gray-500 !bg-white ring-2 border-none md:ml-4"
                variant={"outline"}
                size={"sm"}
              >
                Live Projects <MonitorDotIcon className="size-5 ml-1" />
              </Button>
            </DialogTrigger>
            <DialogContent className="!max-w-4xl w-[80vw] gap-0">
              <DialogTitle className="">Recent Live Projects</DialogTitle>
              <Carousel
                orientation="horizontal"
                className="flex flex-col w-full"
                setApi={setApi}
              >
                <CarouselContent className="py-4 px-2">
                  {content.map((item, index) => (
                    <CarouselItem key={index}>{item}</CarouselItem>
                  ))}
                </CarouselContent>

                {/* Position nav buttons */}
                <div className="relative w-full ">
                  <CarouselPrevious className="absolute left-0 bottom-0 z-10" />
                  <div className="flex justify-center items-center gap-2 ">
                    {Array.from({ length: count }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          current === i + 1 ? "bg-sky-600" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <CarouselNext className="absolute right-0 bottom-0  z-10" />
                </div>

                {/* Dots */}
              </Carousel>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Mobile Drawer */}
      {!isDesktop && (
        <div className="lg:hidden">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button
                className="hover:scale-110 transition-all duration-500 font-semibold text-sky-800 hover:text-sky-700 cursor-pointer border-sky-700 shadow-lg shadow-gray-500 !bg-white ring-2 border-none md:ml-4"
                variant={"outline"}
                size={"sm"}
              >
                Live Projects <MonitorDotIcon className="size-5 ml-1" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4 pb-5 !min-h-fit flex items-start justify-between">
              <DrawerTitle className="">Recent Live Projects</DrawerTitle>
              <Carousel
                orientation="horizontal"
                className="gap-4 flex flex-col w-full"
                setApi={setApi}
              >
                <CarouselContent className="py-2 px-1">
                  {content.map((item, index) => (
                    <CarouselItem key={index} className="">
                      {item}
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Position nav buttons */}
                <div className="relative w-full ">
                  <CarouselPrevious className="absolute left-0 bottom-0 z-10" />
                  <div className="flex justify-center items-center gap-2 ">
                    {Array.from({ length: count }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          current === i + 1 ? "bg-sky-600" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <CarouselNext className="absolute right-0 bottom-0  z-10" />
                </div>

                {/* Dots */}
              </Carousel>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </div>
  );
}
