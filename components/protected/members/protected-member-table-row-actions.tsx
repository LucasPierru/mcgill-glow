"use client";

import { ProtectedMemberViewButton } from "@/components/protected/members";
import { Row } from "@tanstack/react-table";

interface ProtectedMemberTableRowActionsProps<TData> {
  row: Row<TData>;
}

export default function ProtectedMemberTableRowActions<TData>({ row }: ProtectedMemberTableRowActionsProps<TData>) {
  return (
    <div className="inline-flex items-center space-x-2">
      {/* @ts-ignore */}
      <ProtectedMemberViewButton slug={row.original.id} />
      {/* @ts-ignore */}
    </div>
  );
}
