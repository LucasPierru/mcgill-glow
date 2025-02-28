import { protectedEditorConfig } from "@/config/protected";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/types/collection.types";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import EventForm from "@/components/protected/event/event-form/event-form";

interface EventEditorPageProps {
  params: { eventId: string };
}

const EventPage = async ({ params }: EventEditorPageProps) => {
  async function getEvent(eventId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .match({ id: eventId })
      .single<Event>();

    if (error) {
      console.log("Error has occured while getting post data");
      console.log("Error message : ", error.message);
      return null;
    }

    return data ? data : null;
  }

  const event = await getEvent(params.eventId);

  if (!event) {
    return notFound;
  }

  return (
    <div className="max-w-5xl px-10">
      <div>
        <h3 className="text-lg font-medium">{protectedEditorConfig.title}</h3>
        <p className="py-2 text-sm text-muted-foreground">
          {protectedEditorConfig.description}
        </p>
      </div>
      <Separator className="mb-5 max-w-2xl" />
      <EventForm event={event} />
    </div>
  );
};

export default EventPage;
