import clsx from "clsx";
import { Package, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type SidebarProps = {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
};

const links = [
  { href: "/products", icon: Package, label: "Products" },
  { href: "/carts", icon: ShoppingCart, label: "Carts" },
];

export default function Sidebar({ openSidebar, setOpenSidebar }: SidebarProps) {
  const pathName = usePathname();

  return (
    <aside
      id="sidebar"
      aria-label="Sidebar"
      className={clsx(
        "fixed top-0 left-0 z-20",
        "flex flex-col flex-shrink-0",
        "h-full pt-16 font-normal duration-300 lg:flex transition-width",
        openSidebar ? "w-64" : "w-0 lg:w-64"
      )}
    >
      <div
        className={clsx(
          "relative flex flex-col flex-1 min-h-0 pt-0",
          "bg-white dark:bg-gray-800",
          "border-r border-gray-200 dark:border-gray-700"
        )}
      >
        <div
          className={clsx(
            "flex flex-col flex-1 pt-5 pb-4 overflow-y-auto",
            !openSidebar && "hidden lg:block"
          )}
        >
          <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            <ul className="pb-2 space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "flex items-center p-2 rounded-lg",
                      "text-base text-gray-900 dark:text-gray-200",
                      "hover:bg-gray-100 dark:hover:bg-gray-700",
                      pathName === link.href && "bg-gray-100 dark:bg-gray-700"
                    )}
                    onClick={() => setOpenSidebar(false)}
                  >
                    <link.icon className="w-6 h-6" />
                    <span className="ml-3">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
