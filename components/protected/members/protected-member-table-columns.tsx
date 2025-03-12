"use client";

import { DataTableColumnHeader } from "@/components/protected/post/table/data-table-column-header";
import { Member } from "@/types/collection.types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import ProtectedMemberTableRowActions from "./protected-member-table-row-actions";

const ProtectedMemberTableColumns: ColumnDef<Member>[] = [
  {
    accessorKey: "full_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{row.getValue("full_name")}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("email")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
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
    cell: ({ row }) => <ProtectedMemberTableRowActions row={row} />,
    enableHiding: false,
    enableSorting: false,
  },
];

export default ProtectedMemberTableColumns;
