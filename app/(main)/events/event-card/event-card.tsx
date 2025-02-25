import { Event } from "@/types/event";
import Image from "next/image";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";

dayjs().format();

type EventCardProps = {
  event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="flex flex-col max-w-lg gap-2">
      <div className="relative w-full aspect-square">
        <Image
          src={event.imageUrl}
          alt={event.name}
          fill
          className="w-full h-full object-cover absolute inset-0"
        />
      </div>
      <span className="text-lg font-playfair line-clamp-2">{event.name}</span>
      <span>
        {dayjs(event.date).format("ddd, MMM D")} | {event.place}
      </span>
      <Button className="w-fit self-center">Details</Button>
    </div>
  );
};

export default EventCard;
