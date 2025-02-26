import {
  PencilIcon as DraftIcon,
  CheckIcon as PublishedIcon,
} from "lucide-react";

export const statuses = [
  {
    value: "true",
    label: "Published",
    icon: PublishedIcon,
  },
  {
    value: "false",
    label: "Draft",
    icon: DraftIcon,
  },
];
