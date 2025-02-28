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
import { useEffect, useState } from "react";
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
import {
  PaperclipIcon,
  SparklesIcon,
  Loader2 as SpinnerIcon,
} from "lucide-react";
import slugify from "react-slugify";
import Uppy from "@uppy/core";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { DashboardModal } from "@uppy/react";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Tus from "@uppy/tus";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import SingleImageUploader from "../../single-image-uploader/single-image-uploader";
import SingleImagePlaceholder from "../../single-image-uploader/single-image-placeholder";

export const dynamic = "force-dynamic";

type EditorFormValues = z.infer<typeof eventEditFormSchema>;

interface EventFormProps {
  event: Event;
  imageFileName: string;
  imagePublicUrl: string;
}

const EventForm = ({
  event,
  imageFileName,
  imagePublicUrl,
}: EventFormProps) => {
  // States
  const [isSaving, setIsSaving] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState<boolean>(false);
  const [showCoverModal, setShowCoverModal] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  // Router
  const router = useRouter();

  const defaultValues: Partial<EditorFormValues> = {
    name: event.name ?? "Untitled",
    slug: event.slug ?? `post-${v4()}`,
    image: event.image ?? "",
    description: event.description ?? "Post description",
    about: event.about ?? protectedEventConfig.aboutPlaceholder,
    date: event.date ?? "",
    starttime: event.starttime ?? "",
    endtime: event.endtime ?? "",
    address: event.address ?? "",
    place: event.place ?? "",
    registrationlink: event.registrationlink ?? "",
  };

  const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
  const supabaseUploadURL = `https://${projectId}.supabase.co/storage/v1/upload/resumable`;

  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  const form = useForm<EditorFormValues>({
    resolver: zodResolver(eventEditFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: EditorFormValues) {
    setShowLoadingAlert(true);
    setIsSaving(true);

    const response = await UpdateEvent({
      id: event.id,
      name: data.name,
      slug: data.slug,
      image: data.image,
      description: data.description,
      about: data.about,
      date: data.date,
      starttime: data.starttime,
      endtime: data.endtime,
      address: data.address,
      place: data.place,
      registrationlink: data.registrationlink,
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

  const bucketNameCoverImage =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_EVENT_IMAGE ||
    "event-image";

  var uppyCover = new Uppy({
    id: "event-image",
    autoProceed: false,
    debug: false,
    allowMultipleUploadBatches: true,
    restrictions: {
      maxFileSize: 6000000,
      maxNumberOfFiles: 1,
    },
  }).use(Tus, {
    endpoint: supabaseUploadURL,
    headers: {
      authorization: `Bearer ${session?.access_token}`,
    },
    chunkSize: 6 * 1024 * 1024,
    allowedMetaFields: [
      "bucketName",
      "objectName",
      "contentType",
      "cacheControl",
    ],
  });

  uppyCover.on("file-added", (file) => {
    file.meta = {
      ...file.meta,
      bucketName: bucketNameCoverImage,
      objectName: `${event.id}/${file.name}`,
      contentType: file.type,
    };
  });

  uppyCover.on("complete", async (result) => {
    if (result.successful!.length > 0) {
      toast.success(protectedEventConfig.successMessageImageUpload);
      console.log(result.successful![0].meta.name);
      form.setValue("image", result.successful![0].meta.name);
      router.refresh();
    } else {
      toast.error(protectedEventConfig.errorMessageImageUpload);
    }
    setShowCoverModal(false);
  });

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
              {/* Place */}
              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedEventConfig.formPlace}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={protectedEventConfig.placeholderPlace}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedEventConfig.formDate}</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder={protectedEventConfig.placeholderDate}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Start time */}
              <FormField
                control={form.control}
                name="starttime"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedEventConfig.formStartTime}</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder={protectedEventConfig.placeholderStartTime}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End Time */}
              <FormField
                control={form.control}
                name="endtime"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedEventConfig.formEndTime}</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder={protectedEventConfig.placeholderEndTime}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* About */}
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedEventConfig.formAbout}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={protectedEventConfig.placeholderAbout}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* About */}
              <FormField
                control={form.control}
                name="registrationlink"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>
                      {protectedEventConfig.formRegistrationLink}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          protectedEventConfig.placeholderRegistrationLink
                        }
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
              <div className="flex w-full flex-col">
                <DashboardModal
                  uppy={uppyCover}
                  open={showCoverModal}
                  onRequestClose={() => setShowCoverModal(false)}
                  disablePageScrollWhenModalOpen={false}
                  showSelectedFiles
                  showRemoveButtonAfterComplete
                  note={protectedEventConfig.formImageNote}
                  proudlyDisplayPoweredByUppy={false}
                  showLinkToFileUploadResult
                />
                {imageFileName === "" && (
                  <div className="col-span-full">
                    <div className="mb-1 flex items-center gap-x-3">
                      <button
                        onClick={() => setShowCoverModal(!showCoverModal)}
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        <PaperclipIcon className="mr-1 h-4 w-4" />
                        <span className="">
                          {protectedEventConfig.formImageUploadFile}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {imageFileName !== "" ? (
                  <SingleImageUploader
                    bucketName="event-image"
                    path={event.id}
                    fileName={imageFileName}
                    imageUrl={imagePublicUrl}
                  />
                ) : (
                  <SingleImagePlaceholder />
                )}
              </div>
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
