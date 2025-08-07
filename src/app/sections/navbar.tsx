"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, DownloadIcon, Sun, Moon, MonitorDotIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  // Ensure theme is set to 'light' if not already defined
  useEffect(() => {
    if (!theme) {
      setTheme("light");
    }
  }, [theme, setTheme]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Optionally: return a loading state, null, or generic markup
    return null;
  }

  // Navigation links for reuse
  const navLinks = (
    <div className="flex items-start gap-4 lg:gap-2 xl:gap-6 flex-col lg:flex-row w-full justify-center">
      <a
        href="#about-offset"
        className="hover:text-gray-700 border-b-2 border-transparent hover:border-gray-500 px-2 py-1"
        onClick={() => setOpen(false)}
      >
        About
      </a>
      <a
        href="#experience-offset"
        className="hover:text-gray-700 border-b-2 border-transparent hover:border-gray-500 px-2 py-1"
        onClick={() => setOpen(false)}
      >
        Experience
      </a>
      <a
        href="#work-offset"
        className="hover:text-gray-700 border-b-2 border-transparent hover:border-gray-500 px-2 py-1"
        onClick={() => setOpen(false)}
      >
        Personal Projects
      </a>
      <a
        href="#contact-offset"
        className="hover:text-gray-700 border-b-2 border-transparent hover:border-gray-500 px-2 py-1"
        onClick={() => setOpen(false)}
      >
        Contact
      </a>
    </div>
  );

  return (
    <header className="flex items-center justify-between w-full mx-auto py-6 md:py-6 mb-8 fixed top-0 left-0 px-6 md:px-4 backdrop-blur-lg z-20">
      <Button
        className="hover:scale-110 transition-all duration-500 font-semibold text-sky-800 hover:text-sky-700 cursor-pointer border-sky-700 shadow-lg shadow-gray-500 !bg-white ring-2 border-none md:ml-4"
        variant={"outline"}
        size={"sm"}
      >
        Live Projects <MonitorDotIcon className="size-5 ml-1" />
      </Button>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-1 xl:gap-4 justify-center">
        {navLinks}
        <div className="h-6 w-0.5 bg-gray-200 mx-2"></div>
        <Button className="px-5 py-2 font-medium cursor-pointer">
          Download Resume <DownloadIcon className="w-4 h-4 ml-1" />
        </Button>
        <div className="h-6 w-0.5 bg-gray-200 mx-2"></div>
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          variant="ghost"
          className="flex items-center gap-1 !p-2 cursor-pointer flex-col justify-center"
        >
          {theme === "dark" ? (
            <div className="flex items-center gap-2 flex-col justify-center ">
              {/* Use Sun icon for light theme */}
              <Sun className="size-5" />{" "}
              <span className="text-xs">Switch to Light</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-col justify-center">
              <Moon className="size-5" />{" "}
              <span className="text-xs">Switch to Dark</span>
            </div>
          )}
        </Button>
      </nav>

      {/* Mobile Nav: Hamburger + Drawer */}
      <div className="lg:hidden flex items-center">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-6">
            <div className="flex flex-col gap-2 items-start">
              <DrawerTitle className="text-xl font-bold mb-2 text-gray-700">
                Menu
              </DrawerTitle>
              {navLinks}
              <Separator />
              <Button
                className="w-full cursor-pointer mt-4"
                onClick={() => setOpen(false)}
              >
                Download Resume <DownloadIcon className="w-4 h-4 ml-1" />
              </Button>
              <Button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  setOpen(false);
                }}
                variant="ghost"
                className="flex items-center gap-2 w-full mt-2"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="size-5" />
                    <span>Switch to Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="size-5" />
                    <span>Switch to Dark</span>
                  </>
                )}
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
