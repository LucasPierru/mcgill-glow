import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

dayjs().format();

type EventPageProps = {
  params: { slug: string };
};

async function getPublicImageUrl(path: string, fileName: string) {
  const supabase = await createClient();
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_EVENT_IMAGE || "event-image";
  const { data } = supabase.storage.from(bucketName).getPublicUrl(`${path}/${fileName}`);

  if (data && data.publicUrl) return data.publicUrl;

  return "/images/not-found.jpg";
}

function formatAMPM(time: string) {
  const hours = Number(time.split(":")[0]);
  const minutes = time.split(":")[1];
  const pmOrAm = hours > 11 ? "pm" : "am";
  const realHour = hours === 0 ? 12 : hours;
  return hours > 12 ? `${realHour - 12}:${minutes}${pmOrAm}` : `${realHour}:${minutes}${pmOrAm}`;
}

export default async function PostPage({ params }: EventPageProps) {
  const supabase = await createClient();
  const bucketNameCoverImage = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_EVENT_IMAGE!;
  const { data: event, error } = await supabase
    .from("events")
    .select(
      "id, name, slug, description, slug, about, image, date, starttime, endtime, place, address, registrationlink"
    )
    .eq("slug", params.slug)
    .single();

  if (!event) {
    return notFound;
  }

  return (
    <>
      <div className="absolute h-[var(--page-size)] w-full top-0 left-0 bg-black/5 -z-20"></div>
      <div className="relative flex flex-col gap-8 max-w-5xl items-center mx-auto p-8 font-playfair">
        <h1 className="text-3xl font-semibold text-center">{event.name}</h1>
        <span className="text-center text-lg">
          {dayjs(event.date).format("ddd, MMM D")} | {event.place}
        </span>
        <p className="py-2 text-muted-foreground text-base">{event.description}</p>
        <div className="flex flex-col py-4 px-6 items-center text-base text-white bg-[#8B2F2F] hover:bg-[#6F2525] transition-[background]">
          {event.registrationlink ? (
            <a href={event.registrationlink}>Register here</a>
          ) : (
            <>
              <span>Tickets are not on sale</span>
              <Link href="/events" className="underline">
                See other events
              </Link>
            </>
          )}
        </div>
        <div className="relative w-full aspect-video">
          <Image
            src={await getPublicImageUrl(event.id, event.image!)}
            alt={event.name!}
            fill
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>
        <div className="self-start">
          <h2 className="text-2xl">Time & Location</h2>
          <span className="text-lg">
            {dayjs(event.date).format("MMM D, YYYY")}, {formatAMPM(event.starttime!)} - {formatAMPM(event.endtime!)}
          </span>
          <br />
          <span className="text-lg">
            {event.place}, {event.address}
          </span>
        </div>
        <div className="self-start">
          <h2 className="text-2xl">About the event</h2>
          <span className="text-lg">{event.about}</span>
        </div>
        <iframe
          style={{ border: 0, width: "100%", height: "24rem" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    &q=${event.address}`}></iframe>
        {/* Content */}
      </div>
    </>
  );
}
