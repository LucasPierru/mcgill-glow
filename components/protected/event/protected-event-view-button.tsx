import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ProtectedEventViewButtonProps {
  slug?: string;
}

const ProtectedEventViewButton: FC<ProtectedEventViewButtonProps> = ({
  slug,
}) => {
  return (
    <Link
      href={`/admin/events/${slug}`}
      className="rounded-md border bg-gray-50 px-3 py-2 text-gray-900 hover:bg-gray-100"
    >
      <EyeIcon className="h-4 w-4" />
    </Link>
  );
};

export default ProtectedEventViewButton;
