import {
  PencilIcon as DraftIcon,
  CheckIcon as PublishedIcon,
} from "lucide-react";

export const statuses = [
  {
    value: "published",
    label: "Published",
    icon: PublishedIcon,
  },
  {
    value: "draft",
    label: "Draft",
    icon: DraftIcon,
  },
];
