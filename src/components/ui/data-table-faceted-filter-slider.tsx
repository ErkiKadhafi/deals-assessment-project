import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Separator } from "./separator";
import { Badge } from "./badge";

import { Slider } from "./slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  label: "max" | "min";
  options: {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
  };
  formatLabel?: (value: string) => string;
  onChange: (value: number) => void;
}

export function DataTableFacetedFilterSlider<TData, TValue>({
  column,
  title,
  label,
  options,
  formatLabel,
  onChange,
}: DataTableFacetedFilter<TData, TValue>) {
  /* ======== handle manipulating query params on url ======== */
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  /* ======== handling slider state management ======== */
  const { min, max, step, defaultValue } = options;
  const [range, setRange] = React.useState(defaultValue);

  /* ======== handle reset all the state and query url ======== */
  const selectedRange = column?.getFilterValue();
  React.useEffect(() => {
    if (!selectedRange) {
      setRange(defaultValue);
    }
  }, [selectedRange]);

  /* ======== handle column filter state from query params ======== */
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const query = params.get(label as string);
    if (query) {
      setRange(parseInt(query));
      onChange(parseInt(query));
    }
  }, [searchParams]);
  const [timer, setTimer] = React.useState<NodeJS.Timeout>();
  const handleFilterQuery = (value: number[]) => {
    /* ======== manage state for table ======== */
    setRange(value[0]);

    /* ======== add query to url ======== */
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set(label, value[0].toString());
      const url = pathName + "?" + params.toString();

      router.push(url, {
        scroll: false,
      });
    }, 500);
    setTimer(newTimer);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" size="sm" className="h-8">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedRange !== undefined &&
            (selectedRange as [number | undefined, number | undefined])[
              label === "min" ? 0 : 1
            ] !== undefined && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {formatLabel ? formatLabel(range.toString()) : range}
                </Badge>
              </>
            )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-4 space-y-3" align="start">
        <h4 className="flex justify-between font-medium">
          <span>{title}:</span>{" "}
          <span>{formatLabel ? formatLabel(range.toString()) : range}</span>
        </h4>
        <div className="flex text-xs text-muted-foreground justify-between">
          <p>{formatLabel ? formatLabel(min.toString()) : min}</p>
          <p>{formatLabel ? formatLabel(max.toString()) : max}</p>
        </div>
        <Slider
          defaultValue={[defaultValue]}
          min={min}
          max={max}
          step={step}
          value={[range]}
          onValueChange={handleFilterQuery}
        />
      </PopoverContent>
    </Popover>
  );
}
