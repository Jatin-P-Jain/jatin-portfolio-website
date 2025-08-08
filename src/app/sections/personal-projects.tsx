import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Project = {
  title: string;
  description: string;
  source: string;
};

const projects: Project[] = [
  {
    title: "Versatile Sentiment Analyzer",
    description:
      "A standalone Machine Learning GUI application that allows users to analyze the sentiment of any given sentence. The tool classifies the input text as positive, negative, or neutral, and provides respective confidence scores for each classification. Built using Python, it features an intuitive graphical interface to make sentiment analysis accessible to users without technical expertise, enabling quick and reliable text interpretation.",
    source: "https://github.com/Jatin-P-Jain/Sentiment-Analyzer",
  },
  {
    title: "Corona Updates",
    description:
      "A Python-based web scraping project designed to fetch real-time Coronavirus statistics from a reputed global statistics website. This application automatically scrapes the latest COVID-19 data and sends timely text message alerts with relevant statistics directly to users’ mobile phones. It helps keep users informed about the pandemic situation efficiently.",
    source: "https://github.com/Jatin-P-Jain/Corona-Updates",
  },
  {
    title: "Chatbot",
    description:
      "A standalone chatbot application that interacts with users by answering queries through a dictionary-based approach. It processes user inputs and provides relevant responses by matching keywords and phrases. This project focuses on natural language understanding and provides an intelligent conversation experience, useful for basic question-answering tasks.",
    source: "https://github.com/Jatin-P-Jain/Chat-Bot",
  },
  {
    title: "Online Food Delivery System",
    description:
      "A mini-project built using database management principles that facilitates placing food orders online. The application features a user-friendly interface crafted with HTML5 and CSS3 for web-based interactions, while backend data storage and processing are handled by PHP and MySQL. This system enables users to browse menus, place orders, and manage transactions efficiently through the web.",
    source: "https://github.com/Jatin-P-Jain/Web-Development",
  },
];

export default function ProjectsSection() {
  return (
    <div className="flex flex-col items-center justify-center px-8 mx-auto lg:px-16 xl:px-0 py-12 z-1 max-w-6xl md:gap-8">
      <h2 className="bg-gray-300 px-6 py-2 rounded-lg font-medium text-gray-800">
        Personal Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-gray-600 text-justify md:text-lg py-4 md:py-0">
        {projects.map((project) => (
          <Card key={project.title} className="p-4 md:p-6 lg:p-8 hover:scale-105 transition-transform duration-300 gap-4 md:gap-8">
            <CardTitle className="">{project.title}</CardTitle>
            <CardDescription className="flex-1">{project.description}</CardDescription>
            <CardFooter className="flex items-end w-full justify-end !p-0 text-sm text-sky-600 hover:text-sky-800 justify-self-end">
              <Link
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                View Source Code on GitHub{" "}
                <ExternalLinkIcon className="ml-2 w-4 h-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
