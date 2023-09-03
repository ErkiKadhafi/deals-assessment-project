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
  paginationData: PaginationType;
}

export default function TableCarts<TData, TValue>({
  columns,
  data,
  paginationData,
}: DataTableProps<TData, TValue>) {
  /* ======== handle table state ======== */
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex:
      (paginationData.limit + paginationData.skip) / paginationData.limit - 1,
    pageSize: paginationData.limit,
  });

  /* ======== initiate table instance ======== */
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    /* ======== for pagination ======== */
    manualPagination: true,
    pageCount: Math.ceil(paginationData.total / paginationData.limit),
    onPaginationChange: setPagination,
    /* ======== for sorting ======== */
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    /* ======== for filtering ======== */
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      pagination,
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-5">
      <DataTable table={table} />
      <DataTablePagination
        table={table}
        paginationData={paginationData}
        pageLimits={[10, 20]}
      />
    </div>
  );
}
