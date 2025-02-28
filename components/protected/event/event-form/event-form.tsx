"use client";

import { UpdateEvent } from "@/actions/event/update-event";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { eventEditFormSchema } from "@/lib/validation/events";
import { Event } from "@/types/collection.types";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { protectedEventConfig } from "@/config/protected";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SparklesIcon, Loader2 as SpinnerIcon } from "lucide-react";
import slugify from "react-slugify";
import { DashboardModal } from "@uppy/react";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type EditorFormValues = z.infer<typeof eventEditFormSchema>;

interface EventFormProps {
  event: Event;
}

const EventForm = ({ event }: EventFormProps) => {
  // States
  const [isSaving, setIsSaving] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState<boolean>(false);
  // Router
  const router = useRouter();

  const defaultValues: Partial<EditorFormValues> = {
    name: event.name ?? "Untitled",
    slug: event.slug ?? `post-${v4()}`,
    image: event.image ?? "",
    description: event.description ?? "Post description",
    about: event.about ?? protectedEventConfig.aboutPlaceholder,
  };

  const form = useForm<EditorFormValues>({
    resolver: zodResolver(eventEditFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: EditorFormValues) {
    setShowLoadingAlert(true);
    setIsSaving(true);
    console.log({ data });
    console.log({ errors: form.formState.errors });

    const response = await UpdateEvent({
      id: event.id,
      name: data.name,
      slug: data.slug,
      image: data.image,
      description: data.description,
      about: data.about,
    });

    if (response) {
      toast.success(protectedEventConfig.successUpdate);
      router.push(`/admin/events?search=refresh`);
    } else {
      toast.error(protectedEventConfig.errorUpdate);
    }

    setIsSaving(false);
    setShowLoadingAlert(false);
  }

  return (
    <>
      <Form {...form}>
        {/* Title */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* General information */}
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>{protectedEventConfig.title}</CardTitle>
              <CardDescription>
                {protectedEventConfig.description}
              </CardDescription>
            </CardHeader>
            <Separator className="mb-8" />
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedEventConfig.formName}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={protectedEventConfig.placeholderName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedEventConfig.formSlug}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={protectedEventConfig.placeholderSlug}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() =>
                          field.onChange(slugify(form.getValues("name")))
                        }
                      >
                        <SparklesIcon className="mr-2 h-4 w-4" />
                        {protectedEventConfig.generateSlug}
                      </Button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedEventConfig.formAddress}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={protectedEventConfig.placeholderAddress}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>{protectedEventConfig.coverImageTitle}</CardTitle>
              <CardDescription>
                {protectedEventConfig.coverImageDescription}
              </CardDescription>
            </CardHeader>
            <Separator className="mb-8" />
            <CardContent className="space-y-4">
              {/* Image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full max-w-xl">
                    <FormControl>
                      <Input
                        placeholder={protectedEventConfig.placeholderImage}
                        {...field}
                        disabled={true}
                        className="hidden bg-gray-50"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* <div className="flex w-full flex-col">
                <DashboardModal
                  uppy={uppyCover}
                  open={showCoverModal}
                  onRequestClose={() => setShowCoverModal(false)}
                  disablePageScrollWhenModalOpen={false}
                  showSelectedFiles
                  showRemoveButtonAfterComplete
                  note={protectedEditorConfig.formImageNote}
                  proudlyDisplayPoweredByUppy={false}
                  showLinkToFileUploadResult
                />

                {coverImageFileName !== "" ? (
                  <EditorUploadCoverImageItem
                    userId={userId}
                    postId={post.id}
                    fileName={coverImageFileName}
                    imageUrl={coverImagePublicUrl}
                  />
                ) : (
                  <EditorUploadCoverImagePlaceHolder />
                )}
              </div> */}
            </CardContent>
          </Card>

          {/* Short Description */}
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>
                {protectedEventConfig.shortDescriptionTitle}
              </CardTitle>
              <CardDescription>
                {protectedEventConfig.shortDescriptionDescription}
              </CardDescription>
            </CardHeader>
            <Separator className="mb-8" />
            <CardContent className="space-y-4">
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder={
                          protectedEventConfig.placeholderDescription
                        }
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <div className="infline-flex flex items-center justify-start space-x-3">
            <Button
              type="submit"
              className="flex !bg-gray-900 px-10 !text-white hover:!bg-gray-800"
              disabled={isSaving}
            >
              {protectedEventConfig.submit}
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              className="flex !bg-gray-100 px-10 !text-gray-900 hover:!bg-gray-200"
              disabled={isSaving}
            >
              {protectedEventConfig.cancel}
            </Button>
          </div>
        </form>
      </Form>
      <AlertDialog open={showLoadingAlert} onOpenChange={setShowLoadingAlert}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {protectedEventConfig.pleaseWait}
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventForm;
