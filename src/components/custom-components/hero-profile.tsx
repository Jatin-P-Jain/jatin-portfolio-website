"use client";
import { useBreakpoint } from "@/hooks/useBreakPoints";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroProfile() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Optionally: return a loading state, null, or generic markup
    return null;
  }

  return (
    <div className="relative flex-shrink-0 mx-auto">
      <div className="md:rounded-lg overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
          </div>
        )}
        <Image
          src="/profile.jpg"
          alt="Jatin's Profile Picture"
          width={isMobile ? 250 : isTablet ? 250 : isDesktop ? 350 : 400}
          height={isMobile ? 250 : isTablet ? 250 : isDesktop ? 350 : 400}
          className="object-cover md:rounded-lg align-middle border-8 border-gray-default"
          priority
          onLoad={() => setLoading(false)}
        />
      </div>
      {/* Offset shadow effect */}
      <div className="md:rounded-br-lg absolute top-13 -left-3 md:top-10 md:left-10 md:w-[225px] md:h-[225px] lg:w-[325px] lg:h-[320px] lg:top-12 lg:left-10 xl:top-12 xl:left-12 w-[275px] h-[210px] xl:w-[325px] xl:h-[325px] bg-gray-300 -z-10 shadow-lg"></div>
    </div>
  );
}
