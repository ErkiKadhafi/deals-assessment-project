"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  brand: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
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
    accessorKey: "category",
    header: ({ column }) => {
      return <ButtonSort column={column}>Category</ButtonSort>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return <ButtonSort column={column}>Brand</ButtonSort>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return <ButtonSort column={column}>Stock</ButtonSort>;
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
    accessorKey: "discountPercentage",
    header: ({ column }) => {
      return <ButtonSort column={column}>Discount</ButtonSort>;
    },
    cell: ({ row }) => `${row.getValue("discountPercentage")}%`,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const Products = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Details
            </Button>
          </DialogTrigger>
          <DialogContent className="md:grid md:grid-cols-2 gap-3 max-w-[750px] w-[90vw] p-8 lg:p-6">
            <div className="min-h-[200px] bg-primary rounded-md flex items-center">
              <div className="relative h-full lg:h-[200px] w-full lg:aspect-video">
                <Image src={Products.thumbnail} fill alt={Products.title} />
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-3 mr-1">
              <div className="space-y-3">
                <DialogHeader>
                  <DialogTitle>{Products.title}</DialogTitle>
                </DialogHeader>
                <p className="">
                  Brand: {Products.brand} | Category: {Products.category}
                </p>
                <p className="text-base text-foreground">
                  {Products.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 text-lg text-foreground font-semibold">
                    <span className="text-red-500">
                      $
                      {Math.round(
                        (Products.price * (100 - Products.discountPercentage)) /
                          100
                      ).toFixed(2)}
                    </span>
                    <span className="line-through">${Products.price}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-base">
                    <Star className="text-foreground h-4 w-4" />
                    <span className="text-foreground">{Products.rating}/5</span>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-auto flex justify-start gap-2">
                <Button disabled>Edit</Button>
                <Button disabled variant="destructive">
                  Delete
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
