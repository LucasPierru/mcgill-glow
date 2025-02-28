"use client";

import { ProtectedEventTableRowActions } from "@/components/protected/event";
import { DataTableColumnHeader } from "@/components/protected/post/table/data-table-column-header";
import { Event } from "@/types/collection.types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

const ProtectedEventTableColumns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "place",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Place" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("place")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = format(new Date(row.getValue("date")), "MM/dd/yyyy");

      if (!row.getValue("date")) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{date}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const date = format(new Date(row.getValue("created_at")), "MM/dd/yyyy");

      if (!date) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{date}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ProtectedEventTableRowActions row={row} />,
    enableHiding: false,
    enableSorting: false,
  },
];

export default ProtectedEventTableColumns;
