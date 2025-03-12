"use client";

import { UpdateMember } from "@/actions/member/update-member";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { eventEditFormSchema } from "@/lib/validation/events";
import { Member } from "@/types/collection.types";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { protectedMemberConfig } from "@/config/protected";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 as SpinnerIcon } from "lucide-react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { memberEditFormSchema } from "@/lib/validation/member";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const dynamic = "force-dynamic";

type MemberFormValues = z.infer<typeof memberEditFormSchema>;

interface MemberFormProps {
  member: Member;
}

const MemberForm = ({ member }: MemberFormProps) => {
  // States
  const [isSaving, setIsSaving] = useState(false);
  const [showLoadingAlert, setShowLoadingAlert] = useState<boolean>(false);
  // Router
  const router = useRouter();

  const defaultValues: Partial<MemberFormValues> = {
    full_name: member.full_name ?? "Untitled",
    email: member.email ?? `Untitled`,
    description: member.description ?? "Member description",
    is_approved: member.is_approved ?? false,
    is_active: member.is_active ?? false,
  };

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberEditFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: MemberFormValues) {
    console.log({ data });
    setShowLoadingAlert(true);
    setIsSaving(true);

    const response = await UpdateMember({
      id: member.id,
      full_name: data.full_name,
      email: data.email,
      description: data.description,
      is_approved: data.is_approved,
      is_active: data.is_active,
    });

    if (response) {
      toast.success(protectedMemberConfig.successUpdate);
      router.push(`/admin/members?search=refresh`);
    } else {
      toast.error(protectedMemberConfig.errorUpdate);
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
              <CardTitle>{protectedMemberConfig.title}</CardTitle>
              <CardDescription>{protectedMemberConfig.description}</CardDescription>
            </CardHeader>
            <Separator className="mb-8" />
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedMemberConfig.formName}</FormLabel>
                    <FormControl>
                      <Input placeholder={protectedMemberConfig.placeholderName} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedMemberConfig.formEmail}</FormLabel>
                    <FormControl>
                      <Input placeholder={protectedMemberConfig.placeholderEmail} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedMemberConfig.formDescription}</FormLabel>
                    <FormControl>
                      <Input placeholder={protectedMemberConfig.placeholderDescription} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Is Approved */}
              <FormField
                control={form.control}
                name="is_approved"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedMemberConfig.formApproved}</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value === "true")}
                      defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Is Active */}
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="w-full max-w-md">
                    <FormLabel>{protectedMemberConfig.formActive}</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value === "true")}
                      defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
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
              disabled={isSaving}>
              {protectedMemberConfig.submit}
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              className="flex !bg-gray-100 px-10 !text-gray-900 hover:!bg-gray-200"
              disabled={isSaving}>
              {protectedMemberConfig.cancel}
            </Button>
          </div>
        </form>
      </Form>
      <AlertDialog open={showLoadingAlert} onOpenChange={setShowLoadingAlert}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">{protectedMemberConfig.pleaseWait}</AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MemberForm;
