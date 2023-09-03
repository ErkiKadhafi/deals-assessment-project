"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type Product = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
};

function ButtonSort({
  column,
  children,
}: {
  column: Column<Product, unknown>;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      size="custom"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="rounded-sm"
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <ButtonSort column={column}>Title</ButtonSort>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <ButtonSort column={column}>Price</ButtonSort>;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return <ButtonSort column={column}>Quantity</ButtonSort>;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return <ButtonSort column={column}>Total Price</ButtonSort>;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "discountPercentage",
    header: ({ column }) => {
      return <ButtonSort column={column}>Discount</ButtonSort>;
    },
    cell: ({ row }) => `${row.getValue("discountPercentage")}%`,
  },
  {
    accessorKey: "discountedPrice",
    header: ({ column }) => {
      return <ButtonSort column={column}>Final Price</ButtonSort>;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("discountedPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="">{formatted}</div>;
    },
  },
];
