"use client";

import Link from "next/link";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpDown, Eye   } from "lucide-react";

export type Product = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
};

export type Cart = {
  id: number;
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  products: Product[];
};

function ButtonSort({
  column,
  children,
}: {
  column: Column<Cart, unknown>;
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

export const columns: ColumnDef<Cart>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ButtonSort column={column}>Id</ButtonSort>;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return <ButtonSort column={column}>Total</ButtonSort>;
    },
  },
  {
    accessorKey: "discountedTotal",
    header: ({ column }) => {
      return <ButtonSort column={column}>Discounted Total</ButtonSort>;
    },
  },
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return <ButtonSort column={column}>Id User</ButtonSort>;
    },
  },
  {
    accessorKey: "totalProducts",
    header: ({ column }) => {
      return <ButtonSort column={column}>Total Products</ButtonSort>;
    },
  },
  {
    accessorKey: "totalQuantity",
    header: ({ column }) => {
      return <ButtonSort column={column}>Total Quantity</ButtonSort>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const Cart = row.original;

      return (
        <Link
          href={`/carts/${Cart.id}`}
          className={cn(buttonVariants({ size: "sm" }))}
        >
          <Eye className="mr-2 h-4 w-4" />
          Details
        </Link>
      );
    },
  },
];
