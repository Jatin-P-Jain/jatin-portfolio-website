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

import React from "@/icons/icon-react.svg";

import LiveProjectCard from "@/components/custom-components/live-project-card";
import ShinyText from "@/components/ShinyText";
import { LIVE_PROJECTS } from "@/data/live-projects";

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
  const content = LIVE_PROJECTS.map((proj) => (
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
                <ShinyText
                  text="Live Projects"
                  speed={1}
                  className="text-sky-800"
                />
                <MonitorDotIcon className="size-5 ml-1" />
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
