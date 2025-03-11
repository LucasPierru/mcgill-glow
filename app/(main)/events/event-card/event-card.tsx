import { Event } from "@/types/collection.types";
import Image from "next/image";
import dayjs from "dayjs";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

dayjs().format();

type EventCardProps = {
  event: Pick<Event, "id" | "name" | "slug" | "image" | "date" | "place">;
};

async function getPublicImageUrl(path: string, fileName: string) {
  const supabase = await createClient();
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_EVENT_IMAGE || "event-image";
  const { data } = supabase.storage.from(bucketName).getPublicUrl(`${path}/${fileName}`);

  if (data && data.publicUrl) return data.publicUrl;

  return "/images/not-found.jpg";
}

const EventCard = async ({ event }: EventCardProps) => {
  return (
    <div className="flex flex-col w-full max-w-lg gap-2">
      <div className="relative w-full aspect-square">
        <Image
          src={await getPublicImageUrl(event.id, event.image!)}
          alt={event.name!}
          fill
          className="w-full h-full object-cover absolute inset-0"
        />
      </div>
      <span className="text-lg font-playfair line-clamp-2">{event.name}</span>
      <span>
        {dayjs(event.date).format("ddd, MMM D")} | {event.place}
      </span>
      <Link href={`/events/${event.slug}`} className="w-fit self-center bg-primary text-secondary px-4 py-3">
        Details
      </Link>
    </div>
  );
};

export default EventCard;
