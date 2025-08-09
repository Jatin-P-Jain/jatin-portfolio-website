"use client";

import { useBreakpoint } from "@/hooks/useBreakPoints";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutMe() {
  const { isDesktop, isLargeDesktop } = useBreakpoint();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Optionally: return a loading state, null, or generic markup
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center px-8 mx-auto lg:px-16 xl:px-0 py-12 z-1 max-w-6xl">
      <h2 className="bg-gray-300 px-6 py-2 rounded-lg font-medium text-gray-800">
        About Me
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto py-8 gap-12">
        {(isDesktop || isLargeDesktop) && (
          <div className="relative">
            <Image
              src="/profile-long.jpeg"
              alt="Jatin's Profile Picture"
              width={350}
              height={350}
              className="object-cover md:rounded-lg align-middle border-8 border-gray-100"
              priority
            />
            <div className="absolute bg-gray-300 top-20 -z-12 -left-4 w-[225px] h-[380px] shadow-lg rounded-bl-lg"></div>
          </div>
        )}
        {/* Right: Textual About Me */}
        <div className="text-base text-gray-600 text-justify w-full flex flex-col gap-4">
          <h2 className="text-3xl text-gray-950 font-semibold">
            Curious about me? Here you have it:
          </h2>
          <p className="">
            Hey there! I&apos;m Jatin Prakash Jain—a frontend & mobile developer
            and tech explorer from Udaipur, Rajasthan, aged 27.
          </p>
          <p className="">
            For over 4 years, I&apos;ve transformed ideas into user-focused apps
            using modern tech. My favorite web stack is Next.js integrated with
            Firebase, enabling scalable backends, seamless authentication, and
            real-time features. From Google Maps to OTP-auth, I build robust
            Progressive Web Apps for enterprise clients.
          </p>
          <p className="">
            On mobile, I create polished, performant apps with React Native for
            a smooth experience across devices.
          </p>
          <p>
            What sets me apart? I leverage AI tools throughout my
            workflow—enhancing code quality, boosting productivity, and
            delivering projects faster without sacrificing quality.
          </p>
          <p>
            I&apos;m driven by solving real problems, writing maintainable code,
            and crafting user experiences that work. I enjoy collaborating,
            learning, and staying curious about new tech.
          </p>
          <p>Some highlights about me:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside text-sm text-left">
            <li>B.E. in Computer Science Engineering</li>
            <li>GATE-2021 qualified | AIR 1958 (604 score)</li>
            <li>4+ years of experience in web and mobile development</li>
            <li>Passionate about building user-friendly, accessible apps</li>
          </ul>
          <p>
            AI at my side: From copy refinement and code generation to
            exploratory research and rapid prototyping, I use advanced AI tools
            every day. These help me brainstorm better features, fix bugs
            faster, and keep projects moving at top speed—so my clients benefit
            from both creative thinking and cutting-edge technology.
          </p>
          <p className="italic">
            <a className="underline" href="#contact-offset">Let&apos;s connect!</a> Whether you have a
            big project or just want to chat tech, I&apos;m all ears—and always
            up for building something awesome together. 😊
          </p>
        </div>
      </div>
    </div>
  );
}
