"use client";

import localFont from "next/font/local";
import Sidebar from "@/components/shared/Sidebar";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {useRouter} from 'next/navigation'
import CloseIcon from "@mui/icons-material/Close";
import { useOnClickOutside } from "usehooks-ts";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useOnClickOutside(sidebarRef,closeSidebar)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false); 
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <html lang="en" >
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextUIProvider navigate={router.push}>
          <AppProvider>
            <div className="flex h-screen w-screen">
              {!isSidebarOpen && (
                <div className="lg:hidden px-4 py-2 fixed z-50">
                  <button
                    onClick={toggleSidebar}
                    aria-label="Open Sidebar"
                    className="text-xl"
                  >
                    <MenuOpenIcon className="ms-4"/>
                  </button>
                </div>
              )}
              <div
              ref={sidebarRef}
                className={`fixed  z-10 bg-content1 h-full transition-transform ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 w-64`}
              >
                {isSidebarOpen && (
                  <button
                    onClick={closeSidebar}
                    aria-label="Close Sidebar"
                    className="absolute top-2 right-2 z-50 text-xl"
                  >
                    <CloseIcon />
                  </button>
                )}
                <Sidebar />
              </div>
              <div
                className={` max-w-full bg-gray-50 dark:bg-black max-h-full transition-all w-full overflow-auto z-[9] ${
                  isSidebarOpen ? "lg:ml-64" : "lg:ml-52"
                }`}
              >
                {children}
              </div>
            </div>
          </AppProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
