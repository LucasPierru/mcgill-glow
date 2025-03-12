"use client";

import { Textarea } from "@/components/ui/textarea";
import { PostComment } from "@/actions/comment/post-comment";
import { z } from "zod";
import { commentFormSchema } from "@/lib/validation/comment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type AddCommentProps = {
  postId: string;
};

const AddComment = ({ postId }: AddCommentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  type CommentFormValues = z.infer<typeof commentFormSchema>;

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: CommentFormValues) => {
    setIsLoading(true);
    await PostComment({ comment: data.comment, postId });
    form.reset();
    setIsLoading(false);
    router.refresh();
  };

  return (
    <Form {...form}>
      <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="min-h-0 h-16 focus:h-32 transition-[height] duration-300"
                  placeholder="Write a comment..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button size="lg" className="w-fit self-end mt-4">
          {!isLoading ? "Submit" : <LoaderCircleIcon className="h-6 w-6 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default AddComment;
