"use client";

import {
  ProtectedEventDeleteButton,
  ProtectedEventViewButton,
} from "@/components/protected/event";
import { Row } from "@tanstack/react-table";

interface ProtectedEventTableRowActionsProps<TData> {
  row: Row<TData>;
}

export default function ProtectedEventTableRowActions<TData>({
  row,
}: ProtectedEventTableRowActionsProps<TData>) {
  return (
    <div className="inline-flex items-center space-x-2">
      {/* @ts-ignore */}
      <ProtectedEventViewButton slug={row.original.id} />
      {/* @ts-ignore */}
      <ProtectedEventDeleteButton id={row.original.id} />
    </div>
  );
}
