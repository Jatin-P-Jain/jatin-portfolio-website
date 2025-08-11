"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import Gate2021 from "@/assets/images/Gate-2021.png";
import IEOCertificate from "@/assets/images/ieocertificate.jpg";
import IOTCertificate from "@/assets/images/IoT.jpg";
import UdemyNext15 from "@/assets/images/Udemy-NextJs15.png";
import UdemyHTML from "@/assets/images/udemyhtml.jpg";
import CloudCertificate from "@/assets/images/cloudcertificate.jpg";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useBreakpoint } from "@/hooks/useBreakPoints";
import clsx from "clsx";

type Certification = {
  imageSrc: StaticImageData | string;
  caption: string;
  width?: number;
  height?: number;
};

const certifications: Certification[] = [
  {
    imageSrc: UdemyNext15,
    caption: "Udemy - Next.js 15 with Firebase",
    width: 300,
    height: 300,
  },
  {
    imageSrc: Gate2021,
    caption: "GATE 2021 Scorecard",
    width: 300,
    height: 300,
  },
  {
    imageSrc: IEOCertificate,
    caption: "Indian Engineering Olympiad (IEO) Certificate",
    width: 300,
    height: 300,
  },
  {
    imageSrc: IOTCertificate,
    caption: "Internet of Things (IoT) Certificate",
    width: 300,
    height: 300,
  },
  {
    imageSrc: UdemyHTML,
    caption: "Udemy - HTML5 & CSS3 with Responsive Design",
    width: 400,
    height: 300,
  },
  {
    imageSrc: CloudCertificate,
    caption: "NPTEL - Cloud Computing Certificate",
    width: 400,
    height: 300,
  },
];

export default function CertificationsList() {
  const {  isMobile } =
    useBreakpoint();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

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

  if (!hydrated) {
    // Optionally: return a loading state, null, or generic markup
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center px-8 mx-auto lg:px-16 xl:px-0 py-20 max-w-6xl gap-4">
      <h2 className="bg-gray-300 px-6 py-2 rounded-lg font-medium text-gray-800 mb-4">
        Certifications
      </h2>
      <div className=" text-justify text-gray-600">
        <p>
          These certifications reflect my commitment to continuous learning and
          staying updated with the latest technologies in software development.
        </p>
      </div>
      <Carousel
        orientation="horizontal"
        className="gap-6 flex flex-col w-full"
        setApi={setApi}
      >
        <CarouselContent className="py-2 px-1 w-80">
          {certifications.map((cert) => (
            <CarouselItem key={cert.caption} className="">
              <div className="bg-gray-default rounded-3xl p-4 border border-gray-200 shadow-md h-full flex flex-col justify-center gap-4">
                {/* image */}
                <div className="relative w-full flex justify-center items-center flex-col h-full">
                  <Image
                    src={cert.imageSrc}
                    alt={cert.caption}
                    width={cert.width}
                    height={cert.height}
                    className={clsx(
                      "object-contain rounded-lg shadow-md",
                      isMobile ? "w-full" : "w-72"
                    )}
                  />
                </div>

                {/* caption text */}
                <p className="text-center text-sm text-gray-600 mt-auto">
                  {cert.caption}
                </p>
              </div>
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
    </div>
  );
}
