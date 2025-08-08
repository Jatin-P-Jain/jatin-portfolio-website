"use client";
import { Card, CardFooter } from "@/components/ui/card";
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
  const { isSmallMobile, isMobile, isDesktop, isTablet, isLargeDesktop } =
    useBreakpoint();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
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
    <div className="flex flex-col items-center justify-center px-8 mx-auto lg:px-16 xl:px-0 py-12 z-1 max-w-5xl">
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
        className="flex flex-col justify-center items-center"
        setApi={setApi}
      >
        <CarouselContent
          className={clsx(" p-8", {
            "w-[180px]": isSmallMobile,
            "w-[310px]": isMobile,
            "w-[600px]": isTablet,
            "w-[840px]": isDesktop,
            "w-[1100px]": isLargeDesktop,
          })}
        >
          {certifications.map((cert, idx) => (
            <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3 hover:scale-105 transition-transform duration-300">
              <Card className="h-full w-full flex flex-col items-center justify-between p-4 bg-gray-default">
                {idx === 0 && (
                  <div className="text-xs font-semibold w-full text-right text-sky-900">
                    <span className="bg-sky-100 p-1 px-2 rounded-full">
                      🔵 Latest
                    </span>
                  </div>
                )}
                <Image
                  src={cert.imageSrc}
                  alt={cert.caption}
                  width={cert.width || 200}
                  height={cert.height || 100}
                  className="object-contain flex-1"
                />
                <CardFooter className="text-center text-gray-500">
                  {cert.caption}
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {(isDesktop || isTablet) && (
          <>
            <CarouselPrevious className="" />
            <CarouselNext className="" />
          </>
        )}
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                current === i + 1 ? "bg-sky-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
