"use client";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

import { workExperiences } from "@/data/work-experiences";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";

export default function WorkExperienceSection() {
  const [loading, setLoading] = React.useState(true);
  return (
    <div className="flex flex-col items-center justify-center px-8 mx-auto lg:px-16 xl:px-0 py-20 z-1 max-w-5xl md:gap-8">
      <h2 className="bg-gray-300 px-6 py-2 rounded-lg font-medium text-gray-800">
        Work Experience
      </h2>
      <p className="text-gray-600 text-justify md:text-lg py-4 md:py-0">
        Here’s a quick look at my recent and relevant professional journey,
        along with select projects where I made an impact.
      </p>
      <ul className="w-full flex flex-col gap-6 md:gap-8 justify-center items-center md:px-8">
        {workExperiences.map((exp, idx) => (
          <li key={idx} className="w-full">
            <Card className="bg-gray-50 text-white rounded-lg shadow-gray-300 shadow-md p-2 py-6 md:p-8 transition-all duration-300 hover:scale-105 gap-0">
              <CardTitle className="text-gray-800 text-lg md:text-xl lg:text-2xl font-bold flex gap-2 justify-start items-center px-4">
                <div className="relative w-20 h-12 md:w-20 md:h-20">
                  <Image
                    src={exp.organizationLogo}
                    alt={`${exp.organization} Logo`}
                    fill
                    sizes="128px"
                    className="object-contain"
                    style={{ transform: `scale(${exp.scale || 1})` }}
                  />
                </div>

                {exp.organization}
              </CardTitle>
              <CardContent className="text-gray-600 gap-1 flex flex-col">
                <p className="text-md font-medium mb-2 flex items-start gap-2 w-full justify-between flex-col md:flex-row">
                  {exp.role}
                  <span className="italic">{exp.timeline}</span>
                </p>
                <p className="mb-3 text-sm md:text-base">{exp.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <h4 className="font-semibold">
                    Tech Stack worked upon –
                  </h4>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {exp.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className=" px-4 py-1 rounded-full text-sm font-semibold shadow-md bg-gray-300 dark:border-1 flex justify-center items-center gap-1"
                      >
                        <div className="relative w-4 h-4 mr-1">
                          <Image
                            src={tech.logo}
                            alt={tech.name}
                            fill
                            sizes="32px"
                            className="object-contain"
                          />
                        </div>

                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {exp.projects && exp.projects.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">
                      Projects Worked On –
                    </h4>
                    <div className="flex flex-wrap flex-col-reverse lg:flex-row gap-4">
                      {exp.projects.map((project, pIdx) => (
                        <Card
                          key={pIdx}
                          className="border-1 px-8 shadow-lg gap-2 lg:w-[48%] w-full"
                        >
                          <h5
                            className={clsx(
                              "font-semibold text-base text-gray-600",
                              project.title ===
                                "Customer Loyalty SaaS Platform" &&
                                "text-gray-800"
                            )}
                          >
                            {project.title}{" "}
                          </h5>
                          <div className="">
                            <span className="font-medium text-sm">
                              Key Responsibilities:
                            </span>
                            <ul className="list-disc ml-6 mt-1 text-sm">
                              {project.keyResponsibilities.map((resp, rIdx) => (
                                <li key={rIdx}>{resp}</li>
                              ))}
                            </ul>
                          </div>
                          {project.keyAchievements &&
                            project.keyAchievements.length > 0 && (
                              <div>
                                <span className="font-medium text-sm">
                                  Key Achievements:
                                </span>
                                <ul className="list-disc ml-6 mt-1 text-sm">
                                  {project.keyAchievements.map((ach, aIdx) => (
                                    <li key={aIdx}>{ach}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col justify-start items-start gap-4">
                {exp.winner && (
                  <div className="max-w-2xl mx-auto p-6 bg-yellow-50 rounded-lg shadow-md text-center flex flex-col gap-4 mt-8 text-sm md:text-base">
                    <h3 className="text-base md:text-xl lg:text-2xl font-bold text-yellow-800">
                      {exp.winner?.title} 🎉
                    </h3>
                    <p className="text-yellow-900">{exp.winner?.description}</p>
                    <div className="flex justify-center gap-4 md:gap-16 items-center flex-row">
                      {exp.winner?.images.map((image, idx) => (
                        <div
                          className="flex md:w-36 md:h-36 w-24 h-24 relative"
                          key={idx}
                        >
                          {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
                            </div>
                          )}
                          <Dialog>
                            <DialogTrigger className="w-full h-full flex">
                              <Image
                                key={idx}
                                src={image}
                                alt={`Logo ${idx + 1}`}
                                fill
                                sizes="1024px"
                                className="rounded-lg object-cover hover:scale-200 transition-transform duration-300 hover:z-10 border-3 border-yellow-50 ring-2 bg-sky-900
                            ring-gray-600"
                                onLoad={() => setLoading(false)}
                              />
                            </DialogTrigger>

                            {/* image */}

                            <DialogContent className="flex flex-col">
                              <DialogTitle className="mb-4">
                                {exp.winner?.title}
                              </DialogTitle>
                              {/* <div className=" h-full w-full bg-black"></div> */}
                              {loading && (
                                <div className="flex justify-center items-center h-96 w-full">
                                  <div className="animate-spin rounded-full h-16 w-16 border-r-2 border-b-2 border-gray-900"></div>
                                </div>
                              )}
                              <div className="relative min-h-[40vh] w-full">
                                <Image
                                  key={idx}
                                  src={image}
                                  alt={`Logo ${idx + 1}`}
                                  fill
                                  sizes="1024px"
                                  className="rounded-lg object-contain"
                                  onLoad={() => setLoading(false)}
                                />
                              </div>
                            </DialogContent>

                            {/* caption text */}
                          </Dialog>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
