"use client";

import clsx from "clsx";
import ButtonTheme from "./navbar/ButtonTheme";
import { ButtonUser } from "./navbar/ButtonUser";
import { Button, buttonVariants } from "./ui/button";
import { Github, LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { Separator } from "./ui/separator";

type NavbarProps = {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ openSidebar, setOpenSidebar }: NavbarProps) {
  return (
    <header
      className={clsx(
        "fixed z-30 w-full",
        "transition-background duration-300",
        "bg-white dark:bg-gray-800",
        "border-b border-gray-200 dark:border-gray-700"
      )}
    >
      <div className="px-3 py-4 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              aria-expanded={true}
              aria-controls="sidebar"
              className="lg:hidden"
              size="icon"
              variant="outline"
              onClick={() => setOpenSidebar((curr) => !curr)}
            >
              <Menu
                className={clsx(
                  "h-[1.2rem] w-[1.2rem]",
                  openSidebar && "hidden"
                )}
              />
              <X
                className={clsx(
                  "h-[1.2rem] w-[1.2rem]",
                  !openSidebar && "hidden"
                )}
              />
            </Button>
            <Link
              href="/"
              className={clsx(
                "rounded border-none ml-2",
                "flex items-center space-x-3",
                buttonVariants({ variant: "custom", size: "custom" })
              )}
            >
              <div
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "rounded-full"
                )}
              >
                <LayoutDashboard className="h-[1.2rem] w-[1.2rem]" />
              </div>
              <span className="font-semibold text-xl sm:text-2xl whitespace-nowrap">
                Dashboard
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            >
              <span className="sr-only">Github Source Code</span>
              <Github className="h-6 w-6" />
            </Link>
            <ButtonTheme />
            <ButtonUser />
          </div>
        </div>
      </div>
    </header>
  );
}
