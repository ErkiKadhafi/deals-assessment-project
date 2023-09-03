"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ModalDetailProduct from "@/components/products/ModalDetailProduct";
import { Dialog } from "@/components/ui/dialog";
import type { Metadata } from "next";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

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
