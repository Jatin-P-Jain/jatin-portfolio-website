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
import { MonitorDotIcon, ExternalLink } from "lucide-react";
import { useBreakpoint } from "@/hooks/useBreakPoints";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const liveProjects = [
  {
    name: "Megha Sales Corporation",
    description:
      "A scalable web platform for Megha Sales Corporation to manage orders, inventory, and customer relationships efficiently. Enables real-time reporting and streamlined business workflows for a modern B2B experience.",
    highlights: [
      "Mobile-friendly UI/UX for field agents and managers",
      "Live inventory and order tracking",
      "Role-based dashboard with analytics",
      "Integrations with payment gateways and SMS/email notifications",
    ],
    link: "https://meghasalescorporation.in/",
    demoVideo: "/videos/megha-sales-corporation.mp4",
  },
  {
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
    <div
      key={proj.name}
      className="bg-gray-50 rounded-3xl p-4 border border-gray-200 shadow-md md:min-w-[90%] h-full flex flex-col"
    >
      <h3 className="text-lg md:text-xl font-bold mb-2">{proj.name}</h3>
      <p className="text-xs text-gray-400">About the Project</p>
      <div className="flex max-h-[150px] flex-col gap-2 overflow-auto mb-4 px-4 text-justify">
        <p className="text-gray-600 text-sm">{proj.description}</p>
        <ul className="list-disc list-inside flex flex-col gap-1 text-sm">
          {proj.highlights.map((h, i) => (
            <li key={i} className="text-gray-700">
              {h}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-gray-400">Technologies Used</p>
      <div className="flex  gap-2 overflow-auto mb-4 text-justify px-4">
        <ul className="list-disc list-inside flex flex-col gap-1 text-sm">
          {proj.highlights.map((h, i) => (
            <li key={i} className="text-gray-700">
              {h}
            </li>
          ))}
        </ul>
      </div>
      {/* ---- Insert video or GIF here ---- */}
      <div className="w-full flex justify-center items-center mb-4">
        {/* MP4 video (recommended for fast load and control) */}
        <video
          src={proj.demoVideo} // proj.demoVideo should be the URL/path to your small video or GIF
          autoPlay
          muted
          loop
          playsInline
          className="rounded-md shadow w-full max-w-[400px] object-contain"
          preload="auto"
          //   poster={proj.demoPoster} // optional poster image
        />
      </div>
      <Button asChild className="mt-auto">
        <a href={proj.link} target="_blank" rel="noopener noreferrer">
          Explore Project <ExternalLink className="inline w-4 h-4 ml-1" />
        </a>
      </Button>
    </div>
  ));

  return (
    <div>
      {/* Desktop Dialog */}
      {(isDesktop || isLargeDesktop) && (
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
            <DialogContent className=" max-w-3xl">
              <DialogTitle className="">Recent Live Projects</DialogTitle>
              <Carousel
                orientation="horizontal"
                className="gap-6 flex flex-col w-full"
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
      {(!isDesktop || !isLargeDesktop) && (
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
            <DrawerContent className="p-4 pb-6 !min-h-fit flex items-start justify-between">
              <DrawerTitle className="">Recent Live Projects</DrawerTitle>
              <Carousel
                orientation="horizontal"
                className="gap-6 flex flex-col w-full"
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
