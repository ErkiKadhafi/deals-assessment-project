"use client";

import { FormEvent, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import clsx from "clsx";

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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DataTablePagination } from "../ui/data-table-pagination";
import { DataTableFacetedFilterSelect } from "../ui/data-table-faceted-filter-select";
import { DataTableFacetedFilterSlider } from "../ui/data-table-faceted-filter-slider";

import {
  PaginationType,
  brandColumnValues,
  categoryColumnValues,
  formatCurrency,
} from "@/lib/productsData";

import { Search, X } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationData: PaginationType;
}

export default function TableProducts<TData, TValue>({
  columns,
  data,
  paginationData,
}: DataTableProps<TData, TValue>) {
  /* ======== handle manipulating query params on url ======== */
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  /* ======== handle table state ======== */
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex:
      (paginationData.limit + paginationData.skip) / paginationData.limit - 1,
    pageSize: paginationData.limit,
  });

  /* ======== handle search product ======== */
  const [searchProduct, setSearchProduct] = useState(
    typeof searchParams.get("search") === "string"
      ? searchParams.get("search")?.toString()
      : ""
  );
  const handleSearchProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    table.resetColumnFilters();
    table.resetPagination();

    const params = new URLSearchParams(searchParams);
    params.delete("limit");
    params.delete("skip");

    if (searchProduct === "") params.delete("search");
    else {
      if (searchProduct !== undefined) params.set("search", searchProduct);
    }

    const url = pathName + "?" + params.toString();

    router.push(url, {
      scroll: false,
    });
  };

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

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 justify-between">
        <form
          onSubmit={handleSearchProduct}
          className="flex items-center space-x-2"
        >
          <Input
            aria-label="Search products."
            placeholder="Search products ..."
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            className="h-8 w-full"
          />
          <Button variant="default" size="sm">
            <Search className="h-4 w-4 mr-2" />
            <span>Search</span>
          </Button>
        </form>
        <div
          className={clsx(
            "grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {table.getColumn("category") && (
            <DataTableFacetedFilterSelect
              column={table.getColumn("category")}
              title="category"
              options={categoryColumnValues}
            />
          )}
          {table.getColumn("brand") && (
            <DataTableFacetedFilterSelect
              column={table.getColumn("brand")}
              title="brand"
              options={brandColumnValues}
            />
          )}
          {table.getColumn("price") && (
            <DataTableFacetedFilterSlider
              column={table.getColumn("price")}
              title="Price Min"
              label="min"
              options={{
                min: 100,
                max: 1499,
                step: 100,
                defaultValue: 500,
              }}
              formatLabel={(value: string) => formatCurrency(value)}
              onChange={(value: number) => {
                table
                  .getColumn("price")
                  ?.setFilterValue((old: [number, number]) => [
                    value,
                    old?.[1],
                  ]);
              }}
            />
          )}
          {table.getColumn("price") && (
            <DataTableFacetedFilterSlider
              column={table.getColumn("price")}
              title="Price Max"
              label="max"
              options={{
                min: 100,
                max: 1499,
                step: 100,
                defaultValue: 500,
              }}
              formatLabel={(value: string) => formatCurrency(value)}
              onChange={(value: number) => {
                table
                  .getColumn("price")
                  ?.setFilterValue((old: [number, number]) => [
                    old?.[0],
                    value,
                  ]);
              }}
            />
          )}
          {isFiltered && (
            <Button
              variant="outline"
              onClick={() => {
                table.resetColumnFilters();
                router.push(pathName, {
                  scroll: false,
                });
              }}
              className="h-8 px-2 lg:px-3 sm:col-span-2 xl:col-span-4"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <DataTable table={table} />
      <DataTablePagination
        table={table}
        paginationData={paginationData}
        pageLimits={[10, 25, 50]}
      />
    </div>
  );
}
