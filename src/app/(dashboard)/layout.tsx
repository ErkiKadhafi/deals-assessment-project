"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="relative w-full overflow-y-auto overflow-x-hidden bg-gray-50 lg:ml-64 dark:bg-gray-900 pt-16">
          {children}
        </div>
      </div>
    </>
  );
}
