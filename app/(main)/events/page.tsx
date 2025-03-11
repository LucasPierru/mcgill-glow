import Image from "next/image";
import EventCard from "./event-card/event-card";
import { createClient } from "@/utils/supabase/server";

const Events = async () => {
  const supabase = await createClient();
  const { data: events, error } = await supabase.from("events").select("id, name, slug, image, date, place");

  console.log({ events });

  return (
    <div>
      <section className="grid lg:grid-cols-2 lg:min-h-[60vh] max-h-screen bg-black/5">
        <div className="relative min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hero"
            fill
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-white/80 w-full lg:hidden" />
          <div className="lg:hidden relative h-fit max-w-lg m-auto text-center p-4 ">
            <h2 className="text-xl font-playfair mb-4">Thank you for your interest in our events!</h2>
            <p className="text-center">
              McGill GLOW hosts multiple events throughout the year. These include beauty webinars, fundraisers, and
              other socials to meet friends and uplift fellow women. Additionally, McGill GLOW will invite different
              guest speakers and professionals in the field to provide more insight on healthy self-care routines,
              including skincare and makeup tips, and much more! <br />
              We&apos;re always looking for new and fun ideas. If there&apos;s an event you would like to see happen,
              feel free to shoot us an email and we will try our best to accommodate!
            </p>
          </div>
        </div>
        <div className="hidden lg:block relative  max-w-lg m-auto text-center p-4 ">
          <h2 className="text-xl font-playfair mb-4">Thank you for your interest in our events!</h2>
          <p className="text-center">
            McGill GLOW hosts multiple events throughout the year. These include beauty webinars, fundraisers, and other
            socials to meet friends and uplift fellow women. Additionally, McGill GLOW will invite different guest
            speakers and professionals in the field to provide more insight on healthy self-care routines, including
            skincare and makeup tips, and much more! <br />
            We&apos;re always looking for new and fun ideas. If there&apos;s an event you would like to see happen, feel
            free to shoot us an email and we will try our best to accommodate!
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto text-center p-4 lg:p-8">
        <h1 className="text-2xl font-playfair mb-4">Upcoming Events</h1>
        <div className="flex flex-wrap justify-center gap-12">
          {events?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;
1;
