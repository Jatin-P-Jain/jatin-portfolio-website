"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, DownloadIcon, Sun, Moon, MonitorDotIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  // Navigation links for reuse
  const navLinks = (
    <>
      <a
        href="#about"
        className="hover:text-gray-700 border-b-2 border-transparent hover:border-gray-500 px-2 py-1"
        onClick={() => setOpen(false)}
      >
        About
      </a>
      <a
        href="#work"
        className="hover:text-gray-700 border-b-2 border-transparent hover:border-gray-500 px-2 py-1"
        onClick={() => setOpen(false)}
      >
        Work
      </a>
      <a
        href="#testimonials"
        className="hover:text-gray-700 border-b-2 border-transparent hover:border-gray-500 px-2 py-1"
        onClick={() => setOpen(false)}
      >
        Testimonials
      </a>
      <a
        href="#contact"
        className="hover:text-gray-700 border-b-2 border-transparent hover:border-gray-500 px-2 py-1"
        onClick={() => setOpen(false)}
      >
        Contact
      </a>
    </>
  );

  return (
    <header className="flex items-center justify-between w-full mx-auto py-6 md:py-6 mb-8 fixed top-0 left-0 px-6 md:px-12 backdrop-blur z-50">
      <Button
        className=" font-semibold text-sky-800 hover:text-sky-700 cursor-pointer border-sky-700 shadow-lg shadow-gray-500 !bg-white ring-2 border-none"
        variant={"outline"}
        size={"sm"}
      >
        Live Projects <MonitorDotIcon className="size-5 ml-1" />
      </Button>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-4 justify-center">
        {navLinks}
        <div className="h-6 w-0.5 bg-gray-200 mx-2"></div>
        <Button className="px-5 py-2 font-medium">
          Download Resume <DownloadIcon className="w-4 h-4 ml-1" />
        </Button>
        <div className="h-6 w-0.5 bg-gray-200 mx-2"></div>
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          variant="ghost"
          className="flex items-center gap-1 !px-2 cursor-pointer flex-col justify-center"
        >
          {theme === "dark" ? (
            <>
              <Sun className="size-5" /> <span className="text-xs">Light</span>
            </>
          ) : (
            <>
              <Moon className="size-5" /> <span className="text-xs">Dark</span>
            </>
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
              <Button className="w-full mt-2" onClick={() => setOpen(false)}>
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
