"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { statuses } from "./data/data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterName?: string;
}

export function DataTableToolbar<TData>({ table, filterName }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          value={(table.getColumn(filterName ? filterName : "title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            console.log(event.target.value);
            table.getColumn(filterName ? filterName : "title")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("published") && (
          <DataTableFacetedFilter column={table.getColumn("published")} title="Status" options={statuses} />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
