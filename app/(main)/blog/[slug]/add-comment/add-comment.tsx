import { Textarea } from "@/components/ui/textarea";

const AddComment = () => {
  return (
    <Textarea className="min-h-0 h-16 focus:h-32 transition-[height] duration-300" placeholder="Write a comment..." />
  );
};

export default AddComment;
