import { protectedMemberConfig } from "@/config/protected";
import { Separator } from "@/components/ui/separator";
import { Member } from "@/types/collection.types";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import EventForm from "@/components/protected/event/event-form/event-form";
import MemberForm from "@/components/protected/members/member-form/member-form";

interface MemberEditorPageProps {
  params: { memberId: string };
}

const MemberPage = async ({ params }: MemberEditorPageProps) => {
  async function getMember(memberId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("members").select("*").match({ id: memberId }).single<Member>();

    if (error) {
      console.log("Error has occured while getting post data");
      console.log("Error message : ", error.message);
      return null;
    }

    return data ? data : null;
  }

  const member = await getMember(params.memberId);

  if (!member) {
    return notFound;
  }

  return (
    <div className="max-w-5xl px-10">
      <div>
        <h3 className="text-lg font-medium">{protectedMemberConfig.title}</h3>
        <p className="py-2 text-sm text-muted-foreground">{protectedMemberConfig.description}</p>
      </div>
      <Separator className="mb-5 max-w-2xl" />
      <MemberForm member={member} />
    </div>
  );
};

export default MemberPage;
