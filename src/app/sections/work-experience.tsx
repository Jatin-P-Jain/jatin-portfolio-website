"use client";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

import { workExperiences } from "@/data/work-experiences";

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
            <Card className="bg-white rounded-lg shadow-gray-300 shadow-md p-2 py-6 md:p-8 transition-all duration-300 hover:scale-105 gap-0">
              <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold flex gap-2 text-black/90 justify-start items-center px-4">
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
              <CardContent className="text-gray-600 gap-0">
                <p className="text-md font-medium mb-2 text-black/80 flex items-start gap-2 w-full justify-between flex-col md:flex-row">
                  {exp.role}
                  <span className="italic">{exp.timeline}</span>
                </p>
                <p className="mb-3 text-sm md:text-base">{exp.description}</p>

                {exp.projects && exp.projects.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-black/90">
                      Projects Worked On –
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {exp.projects.map((project, pIdx) => (
                        <Card
                          key={pIdx}
                          className="border-none bg-black/5 p-4 text-black/70 shadow-md gap-2"
                        >
                          <h5 className="font-semibold text-base text-gray-600">
                            {project.title}
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
                <div className="flex flex-wrap gap-4">
                  <h4 className="font-semibold text-black/90">
                    Tech Stack worked upon –
                  </h4>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {exp.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-black/80 px-4 py-1 rounded-full text-sm font-semibold shadow-md bg-black/5 flex justify-center items-center gap-1"
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
                {exp.winner && (
                  <div className="max-w-2xl mx-auto p-6 bg-yellow-50 rounded-lg shadow-md text-center flex flex-col gap-4 mt-4 text-sm md:text-base">
                    <h3 className="text-base md:text-xl lg:text-2xl font-bold text-yellow-800">
                      {exp.winner?.title} 🎉
                    </h3>
                    <p className="text-yellow-900">{exp.winner?.description}</p>
                    <div className="flex justify-center gap-4 md:gap-16 items-center flex-row">
                      {exp.winner?.images.map((image, idx) => (
                        <div className="flex md:w-36 md:h-36 w-24 h-24 relative" key={idx}>
                          {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
                            </div>
                          )}
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
