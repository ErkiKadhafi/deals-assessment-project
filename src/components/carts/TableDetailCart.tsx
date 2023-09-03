"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import DataTable from "../ui/data-table";
import { DataTablePagination } from "../ui/data-table-pagination";

import { PaginationType } from "@/lib/cartData";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function TableCartDetails<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  /* ======== handle table state ======== */
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  /* ======== initiate table instance ======== */
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    /* ======== for sorting ======== */
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    /* ======== for filtering ======== */
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-5">
      <DataTable table={table} />
    </div>
  );
}
