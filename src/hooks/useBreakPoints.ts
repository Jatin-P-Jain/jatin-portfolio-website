"use client";
import { useEffect, useState } from "react";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useBreakpoint() {
  // Ensure this runs only on the client
  const [width, setWidth] = useState<number | undefined>(
    typeof window !== "undefined" ? window.innerWidth : undefined
  );

  useEffect(() => {
    // Handler updates state
    function handleResize() {
      setWidth(window.innerWidth);
    }
    // Set once on mount, if not already set
    if (typeof window !== "undefined" && width === undefined) {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // width is not a dep (to avoid infinite loop)
    // eslint-disable-next-line
  }, []);

  return {
    isMobile: width !== undefined && width < breakpoints.sm,
    isTablet:
      width !== undefined && width >= breakpoints.sm && width < breakpoints.lg,
    isDesktop: width !== undefined && width >= breakpoints.lg,
    isLargeDesktop: width !== undefined && width >= breakpoints.xl,
    width,
  };
}
