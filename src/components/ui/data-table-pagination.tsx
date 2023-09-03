import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Button } from "./button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { PaginationType } from "@/lib/productsData";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  paginationData: PaginationType;
  pageLimits: number[];
}

export function DataTablePagination<TData>({
  table,
  paginationData,
  pageLimits,
}: DataTablePaginationProps<TData>) {
  /* ======== handle manipulating query params on url ======== */
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  /* ======== handle pagination ======== */
  const { total, limit } = paginationData;
  const handlePaginationLimit = (value: string) => {
    table.resetPagination();
    table.setPageSize(Number(value));

    const params = new URLSearchParams(searchParams);
    params.delete("skip");
    params.set("limit", value);
    const url = pathName + "?" + params.toString();

    router.push(url, {
      scroll: false,
    });
  };
  const handlePaginationPage = (value: number) => {
    table.setPageCount(
      Math.ceil(
        (table.getState().pagination.pageSize / total) * 10 +
          (table.getState().pagination.pageIndex + 1)
      )
    );
    const params = new URLSearchParams(searchParams);
    params.set("skip", value.toString());
    const url = pathName + "?" + params.toString();

    router.push(url, {
      scroll: false,
    });
  };

  return (
    <div className="md:flex justify-between items-center space-y-4">
      {/* ======== limit data ======== */}
      <div className="flex justify-between items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${
            table.getState().pagination.pageSize > 10
              ? table.getState().pagination.pageSize
              : 10
          }`}
          onValueChange={handlePaginationLimit}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageLimits.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* ======== next & prev page ======== */}
      <div className="flex justify-between items-center gap-x-4">
        <p className="text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0);
              handlePaginationPage(0);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.previousPage();
              handlePaginationPage(
                (table.getState().pagination.pageIndex - 1) *
                  table.getState().pagination.pageSize
              );
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.nextPage();
              handlePaginationPage(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize
              );
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
              handlePaginationPage(
                table.getState().pagination.pageSize *
                  (table.getPageCount() - 1)
              );
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
